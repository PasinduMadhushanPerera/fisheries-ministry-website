from pathlib import Path
from uuid import uuid4

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils import timezone
from django.utils.text import slugify

from common.choices import Language, Priority, PublishStatus
from common.constants import MAX_UPLOAD_SIZE, SUPPORTED_LANGUAGES
from common.models import TimeStampedModel


def notice_attachment_upload_path(
    instance: "NoticeAttachment",
    filename: str,
) -> str:
    """
    Generate a secure and unique path for notice attachments.

    Example:
    notices/attachments/2026/07/a1b2c3d4.pdf
    """
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"

    return (
        f"notices/attachments/"
        f"{timezone.now():%Y/%m}/"
        f"{safe_filename}"
    )


def validate_attachment_size(uploaded_file) -> None:
    """
    Prevent files larger than the configured maximum upload size.
    """
    if uploaded_file.size > MAX_UPLOAD_SIZE:
        maximum_size_mb = MAX_UPLOAD_SIZE // (1024 * 1024)

        raise ValidationError(
            f"The uploaded file must not exceed "
            f"{maximum_size_mb} MB."
        )


class NoticeCategory(TimeStampedModel):
    """
    Category used to organize notices.

    Examples:
    - General Notices
    - Procurement Notices
    - Recruitment Notices
    - Public Announcements
    """

    name = models.CharField(
        max_length=100,
        unique=True,
    )

    slug = models.SlugField(
        max_length=120,
        unique=True,
        blank=True,
    )

    description = models.TextField(
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
        db_index=True,
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "Notice category"
        verbose_name_plural = "Notice categories"

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            base_slug = slugify(self.name)[:100]

            if not base_slug:
                base_slug = "notice-category"

            slug = base_slug
            counter = 1

            while (
                NoticeCategory.objects.filter(slug=slug)
                .exclude(pk=self.pk)
                .exists()
            ):
                counter += 1
                slug = f"{base_slug}-{counter}"

            self.slug = slug

        self.full_clean()
        super().save(*args, **kwargs)


class Notice(TimeStampedModel):
    """
    Stores language-independent notice information.

    Translated content such as title, summary and content is stored
    separately in NoticeTranslation.
    """

    category = models.ForeignKey(
        NoticeCategory,
        on_delete=models.PROTECT,
        related_name="notices",
    )

    status = models.CharField(
        max_length=20,
        choices=PublishStatus.choices,
        default=PublishStatus.DRAFT,
        db_index=True,
    )

    priority = models.CharField(
        max_length=20,
        choices=Priority.choices,
        default=Priority.NORMAL,
        db_index=True,
    )

    is_featured = models.BooleanField(
        default=False,
        db_index=True,
        help_text=(
            "Featured notices may be highlighted "
            "on the public website."
        ),
    )

    published_at = models.DateTimeField(
        null=True,
        blank=True,
        db_index=True,
    )

    expires_at = models.DateTimeField(
        null=True,
        blank=True,
        db_index=True,
        help_text=(
            "Optional. After this date, the notice "
            "will no longer be treated as current."
        ),
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="notices_created",
    )

    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="notices_updated",
    )

    class Meta:
        ordering = [
            "-published_at",
            "-created_at",
        ]

        indexes = [
            models.Index(
                fields=["status", "-published_at"],
                name="notice_status_pub_idx",
            ),
            models.Index(
                fields=["priority", "-published_at"],
                name="notice_priority_pub_idx",
            ),
            models.Index(
                fields=["is_featured", "-published_at"],
                name="notice_featured_pub_idx",
            ),
        ]

        permissions = [
            (
                "submit_notice_for_review",
                "Can submit notice for review",
            ),
            (
                "approve_notice",
                "Can approve notice",
            ),
            (
                "publish_notice",
                "Can publish notice",
            ),
            (
                "archive_notice",
                "Can archive notice",
            ),
        ]

    def __str__(self) -> str:
        if not self.pk:
            return "New notice"

        english_translation = self.translations.filter(
            language=Language.ENGLISH,
        ).first()

        if english_translation:
            return english_translation.title

        first_translation = self.translations.first()

        if first_translation:
            return first_translation.title

        return f"Notice #{self.pk}"

    def available_languages(self) -> set[str]:
        """
        Return the language codes currently available for this notice.
        """
        if not self.pk:
            return set()

        return set(
            self.translations.values_list(
                "language",
                flat=True,
            )
        )

    def missing_languages(self) -> list[str]:
        """
        Return required language codes that are still missing.
        """
        available = self.available_languages()

        return [
            language
            for language in SUPPORTED_LANGUAGES
            if language not in available
        ]

    @property
    def has_all_translations(self) -> bool:
        """
        Check whether English, Sinhala and Tamil translations exist.
        """
        return not self.missing_languages()

    @property
    def is_current(self) -> bool:
        """
        Check whether the notice is currently visible publicly.
        """
        now = timezone.now()

        return (
            self.status == PublishStatus.PUBLISHED
            and self.published_at is not None
            and self.published_at <= now
            and (
                self.expires_at is None
                or self.expires_at > now
            )
        )

    def get_translation(
        self,
        language: str,
    ) -> "NoticeTranslation | None":
        """
        Return the requested translation.

        English is used as the fallback language when the requested
        translation does not exist.
        """
        translation = self.translations.filter(
            language=language,
        ).first()

        if translation:
            return translation

        return self.translations.filter(
            language=Language.ENGLISH,
        ).first()

    def clean(self) -> None:
        super().clean()

        errors = {}

        if (
            self.expires_at
            and self.published_at
            and self.expires_at <= self.published_at
        ):
            errors["expires_at"] = (
                "The expiry date must be later than "
                "the publication date."
            )
            
        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs) -> None:
        if (
            self.status == PublishStatus.PUBLISHED
            and not self.published_at
        ):
            self.published_at = timezone.now()

        self.full_clean()
        super().save(*args, **kwargs)


class NoticeTranslation(TimeStampedModel):
    """
    Stores translated notice content.

    Each notice may have only one translation for each language.
    """

    notice = models.ForeignKey(
        Notice,
        on_delete=models.CASCADE,
        related_name="translations",
    )

    language = models.CharField(
        max_length=2,
        choices=Language.choices,
        db_index=True,
    )

    title = models.CharField(
        max_length=250,
    )

    slug = models.SlugField(
        max_length=280,
        allow_unicode=True,
        blank=True,
    )

    summary = models.TextField(
        max_length=500,
        help_text=(
            "A short translated description displayed "
            "on listing pages."
        ),
    )

    content = models.TextField(
        help_text="Enter the complete translated notice content.",
    )

    seo_title = models.CharField(
        max_length=70,
        blank=True,
    )

    seo_description = models.CharField(
        max_length=160,
        blank=True,
    )

    class Meta:
        ordering = [
            "notice",
            "language",
        ]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "notice",
                    "language",
                ],
                name="unique_notice_language",
            ),
            models.UniqueConstraint(
                fields=[
                    "language",
                    "slug",
                ],
                name="unique_notice_slug_language",
            ),
        ]

        indexes = [
            models.Index(
                fields=[
                    "language",
                    "slug",
                ],
                name="notice_trans_lang_slug_idx",
            ),
            models.Index(
                fields=[
                    "language",
                    "title",
                ],
                name="notice_trans_lang_title_idx",
            ),
        ]

        verbose_name = "Notice translation"
        verbose_name_plural = "Notice translations"

    def __str__(self) -> str:
        return (
            f"{self.get_language_display()} — "
            f"{self.title}"
        )

    def clean(self) -> None:
        super().clean()

        self.title = self.title.strip()
        self.summary = self.summary.strip()
        self.content = self.content.strip()

        errors = {}

        if not self.title:
            errors["title"] = "The translated title is required."

        if not self.summary:
            errors["summary"] = (
                "The translated summary is required."
            )

        if not self.content:
            errors["content"] = (
                "The translated notice content is required."
            )

        if self.seo_title:
            self.seo_title = self.seo_title.strip()

        if self.seo_description:
            self.seo_description = (
                self.seo_description.strip()
            )

        if errors:
            raise ValidationError(errors)

    def generate_unique_slug(self) -> str:
        """
        Generate a unique slug within the selected language.
        """
        base_slug = slugify(
            self.title,
            allow_unicode=True,
        )[:240]

        if not base_slug:
            notice_identifier = self.notice_id or "new"

            base_slug = (
                f"notice-{notice_identifier}-"
                f"{self.language}"
            )

        slug = base_slug
        counter = 1

        while (
            NoticeTranslation.objects.filter(
                language=self.language,
                slug=slug,
            )
            .exclude(pk=self.pk)
            .exists()
        ):
            counter += 1

            counter_suffix = f"-{counter}"
            maximum_base_length = 280 - len(counter_suffix)

            slug = (
                f"{base_slug[:maximum_base_length]}"
                f"{counter_suffix}"
            )

        return slug

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = self.generate_unique_slug()

        self.full_clean()
        super().save(*args, **kwargs)


class NoticeAttachment(TimeStampedModel):
    """
    Stores documents attached to a notice.
    """

    notice = models.ForeignKey(
        Notice,
        on_delete=models.CASCADE,
        related_name="attachments",
    )

    title = models.CharField(
        max_length=200,
    )

    file = models.FileField(
        upload_to=notice_attachment_upload_path,
        validators=[
            FileExtensionValidator(
                allowed_extensions=[
                    "pdf",
                    "doc",
                    "docx",
                    "xls",
                    "xlsx",
                    "csv",
                ]
            ),
            validate_attachment_size,
        ],
        max_length=500,
    )

    is_public = models.BooleanField(
        default=True,
        db_index=True,
        help_text=(
            "Only public attachments will be exposed "
            "through the public API."
        ),
    )

    sort_order = models.PositiveIntegerField(
        default=0,
    )

    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="notice_attachments_uploaded",
    )

    class Meta:
        ordering = [
            "sort_order",
            "created_at",
        ]

        indexes = [
            models.Index(
                fields=[
                    "notice",
                    "is_public",
                    "sort_order",
                ],
                name="notice_attachment_pub_idx",
            ),
        ]

    def __str__(self) -> str:
        return f"{self.notice} — {self.title}"

    @property
    def file_extension(self) -> str:
        return (
            Path(self.file.name)
            .suffix
            .upper()
            .lstrip(".")
        )

    def clean(self) -> None:
        super().clean()

        self.title = self.title.strip()

        if not self.title:
            raise ValidationError(
                {
                    "title": "The attachment title is required.",
                }
            )

    def save(self, *args, **kwargs) -> None:
        self.full_clean()
        super().save(*args, **kwargs)