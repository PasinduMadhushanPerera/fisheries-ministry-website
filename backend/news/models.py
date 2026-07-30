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


def news_image_upload_path(
    instance: "News",
    filename: str,
) -> str:
    """
    Generate a unique storage path for a news cover image.

    Example:
    news/images/2026/07/a1b2c3d4.jpg
    """
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"

    return (
        f"news/images/"
        f"{timezone.now():%Y/%m}/"
        f"{safe_filename}"
    )


def news_attachment_upload_path(
    instance: "NewsAttachment",
    filename: str,
) -> str:
    """
    Generate a unique storage path for a news attachment.
    """
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"

    return (
        f"news/attachments/"
        f"{timezone.now():%Y/%m}/"
        f"{safe_filename}"
    )


def validate_upload_size(uploaded_file) -> None:
    """
    Prevent uploaded files larger than the configured maximum.
    """
    if uploaded_file.size > MAX_UPLOAD_SIZE:
        maximum_size_mb = MAX_UPLOAD_SIZE // (1024 * 1024)

        raise ValidationError(
            f"The uploaded file must not exceed "
            f"{maximum_size_mb} MB."
        )


class NewsCategory(TimeStampedModel):
    """
    Category used to organise news articles.
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
        verbose_name = "News category"
        verbose_name_plural = "News categories"

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            base_slug = slugify(self.name)[:100]

            if not base_slug:
                base_slug = "news-category"

            slug = base_slug
            counter = 1

            while (
                NewsCategory.objects.filter(slug=slug)
                .exclude(pk=self.pk)
                .exists()
            ):
                counter += 1
                slug = f"{base_slug}-{counter}"

            self.slug = slug

        self.full_clean()
        super().save(*args, **kwargs)


class News(TimeStampedModel):
    """
    Stores language-independent news information.

    Translated title, summary and article content are stored in
    NewsTranslation.
    """

    category = models.ForeignKey(
        NewsCategory,
        on_delete=models.PROTECT,
        related_name="news_articles",
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
            "Featured news may be highlighted on the homepage "
            "and news listing page."
        ),
    )

    hero_image = models.ImageField(
        upload_to=news_image_upload_path,
        validators=[
            FileExtensionValidator(
                allowed_extensions=[
                    "jpg",
                    "jpeg",
                    "png",
                    "webp",
                ]
            ),
            validate_upload_size,
        ],
        max_length=500,
        blank=True,
        null=True,
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
            "Optional. After this date, the news article will "
            "no longer appear as current public news."
        ),
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="news_articles_created",
    )

    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="news_articles_updated",
    )

    class Meta:
        ordering = [
            "-published_at",
            "-created_at",
        ]

        indexes = [
            models.Index(
                fields=["status", "-published_at"],
                name="news_status_pub_idx",
            ),
            models.Index(
                fields=["priority", "-published_at"],
                name="news_priority_pub_idx",
            ),
            models.Index(
                fields=["is_featured", "-published_at"],
                name="news_featured_pub_idx",
            ),
        ]

        permissions = [
            (
                "submit_news_for_review",
                "Can submit news for review",
            ),
            (
                "approve_news",
                "Can approve news",
            ),
            (
                "publish_news",
                "Can publish news",
            ),
            (
                "archive_news",
                "Can archive news",
            ),
        ]

        verbose_name = "News article"
        verbose_name_plural = "News articles"

    def __str__(self) -> str:
        if not self.pk:
            return "New news article"

        english_translation = self.translations.filter(
            language=Language.ENGLISH,
        ).first()

        if english_translation:
            return english_translation.title

        first_translation = self.translations.first()

        if first_translation:
            return first_translation.title

        return f"News article #{self.pk}"

    def available_languages(self) -> set[str]:
        if not self.pk:
            return set()

        return set(
            self.translations.values_list(
                "language",
                flat=True,
            )
        )

    def missing_languages(self) -> list[str]:
        available = self.available_languages()

        return [
            language
            for language in SUPPORTED_LANGUAGES
            if language not in available
        ]

    @property
    def has_all_translations(self) -> bool:
        return not self.missing_languages()

    @property
    def is_current(self) -> bool:
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
    ) -> "NewsTranslation | None":
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


class NewsTranslation(TimeStampedModel):
    """
    Stores translated news article content.
    """

    news = models.ForeignKey(
        News,
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
            "A short translated summary displayed on cards "
            "and listing pages."
        ),
    )

    content = models.TextField(
        help_text="Enter the complete translated news article.",
    )

    image_alt_text = models.CharField(
        max_length=250,
        blank=True,
        help_text=(
            "Accessible translated description of the news image."
        ),
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
            "news",
            "language",
        ]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "news",
                    "language",
                ],
                name="unique_news_language",
            ),
            models.UniqueConstraint(
                fields=[
                    "language",
                    "slug",
                ],
                name="unique_news_slug_language",
            ),
        ]

        indexes = [
            models.Index(
                fields=[
                    "language",
                    "slug",
                ],
                name="news_trans_lang_slug_idx",
            ),
            models.Index(
                fields=[
                    "language",
                    "title",
                ],
                name="news_trans_lang_title_idx",
            ),
        ]

        verbose_name = "News translation"
        verbose_name_plural = "News translations"

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
        self.image_alt_text = self.image_alt_text.strip()

        errors = {}

        if not self.title:
            errors["title"] = (
                "The translated title is required."
            )

        if not self.summary:
            errors["summary"] = (
                "The translated summary is required."
            )

        if not self.content:
            errors["content"] = (
                "The translated news content is required."
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
        base_slug = slugify(
            self.title,
            allow_unicode=True,
        )[:240]

        if not base_slug:
            news_identifier = self.news_id or "new"

            base_slug = (
                f"news-{news_identifier}-"
                f"{self.language}"
            )

        slug = base_slug
        counter = 1

        while (
            NewsTranslation.objects.filter(
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


class NewsAttachment(TimeStampedModel):
    """
    Stores documents attached to a news article.
    """

    news = models.ForeignKey(
        News,
        on_delete=models.CASCADE,
        related_name="attachments",
    )

    title = models.CharField(
        max_length=200,
    )

    file = models.FileField(
        upload_to=news_attachment_upload_path,
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
            validate_upload_size,
        ],
        max_length=500,
    )

    is_public = models.BooleanField(
        default=True,
        db_index=True,
    )

    sort_order = models.PositiveIntegerField(
        default=0,
    )

    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="news_attachments_uploaded",
    )

    class Meta:
        ordering = [
            "sort_order",
            "created_at",
        ]

        indexes = [
            models.Index(
                fields=[
                    "news",
                    "is_public",
                    "sort_order",
                ],
                name="news_attachment_pub_idx",
            ),
        ]

        verbose_name = "News attachment"
        verbose_name_plural = "News attachments"

    def __str__(self) -> str:
        return f"{self.news} — {self.title}"

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
                    "title": (
                        "The attachment title is required."
                    ),
                }
            )

    def save(self, *args, **kwargs) -> None:
        self.full_clean()
        super().save(*args, **kwargs)