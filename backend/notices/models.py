from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def notice_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"notices/{timezone.now():%Y/%m}/{safe_filename}"


notice_image_upload_path = notice_upload_path
notice_attachment_upload_path = notice_upload_path


def validate_attachment_size(uploaded_file):
    pass


validate_upload_size = validate_attachment_size


CATEGORY_CHOICES = [
    ("general", "General Notice"),
    ("circular", "Ministry Circular"),
    ("procurement", "Tender & Procurement"),
    ("recruitment", "Recruitment & Vacancies"),
    ("licensing", "Licensing & Fisher Registration"),
    ("public_consultation", "Public Consultation & Regulations"),
]

CATEGORY_LABELS_MAP = {
    "general": ("General Notice", "පොදු නිවේදනය", "பொது அறிவித்தல்"),
    "circular": ("Ministry Circular", "අමාත්‍යාංශ චක්‍රලේඛය", "அமைச்சு சுற்றறிக்கை"),
    "procurement": ("Tender & Procurement", "ටෙන්ඩර් සහ ප්‍රසම්පාදන", "டெண்டர் மற்றும் கொள்முதல்"),
    "recruitment": ("Recruitment & Vacancies", "බඳවාගැනීම් සහ පුරප්පාඩු", "ஆட்சேர்ப்பு மற்றும் காலியிடங்கள்"),
    "licensing": ("Licensing & Registration", "බලපත්‍ර සහ ලියාපදිංචි කිරීම්", "உரிமம் மற்றும் பதிவுசெய்தல்"),
    "public_consultation": ("Public Consultation", "මහජන අදහස් විමසීම්", "பொதுமக்கள் கலந்தாய்வு"),
}

PRIORITY_CHOICES = [
    ("normal", "Normal Priority"),
    ("high", "High Priority"),
    ("urgent", "Urgent Announcement"),
]

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document"),
    ("DOCX", "Word Document (DOCX)"),
    ("XLSX", "Excel Spreadsheet (XLSX)"),
    ("ZIP", "ZIP Archive"),
]


# ==========================================================
# 01. Notice Section Titles & Badges (Multilingual)
# ==========================================================
class NoticePageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Official Announcements",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Official Notices &",
        verbose_name="Title (English)",
    )
    highlighted_title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry Circulars",
        verbose_name="Highlighted Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Access official public notices, administrative circulars, gazette announcements, licensing instructions, and public consultations issued by the Ministry of Fisheries.",
        verbose_name="Description (English)",
    )
    featured_badge_en = models.CharField(
        max_length=150,
        default="Urgent / Important Notice",
        verbose_name="Featured Section Badge (English)",
    )
    catalogue_badge_en = models.CharField(
        max_length=150,
        default="Notice Board Directory",
        verbose_name="Library Section Badge (English)",
    )
    library_title_en = models.CharField(
        max_length=255,
        default="All Official Notices & Public Gazettes",
        verbose_name="Library Section Title (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="නිල නිවේදන සහ චක්‍රලේඛ",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="නිල නිවේදන සහ",
        verbose_name="Title (සිංහල)",
    )
    highlighted_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="අමාත්‍යාංශ චක්‍රලේඛ",
        verbose_name="Highlighted Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ධීවර අමාත්‍යාංශය මඟින් නිකුත් කරන ලද නිල මහජන නිවේදන, චක්‍රලේඛ, ගැසට් පත්‍රිකා, බලපත්‍ර උපදෙස් සහ මහජන අදහස් විමසීම් මෙතැනින් ලබාගන්න.",
        verbose_name="Description (සිංහල)",
    )
    featured_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="විශේෂ / හදිසි නිවේදනය",
        verbose_name="Featured Section Badge (සිංහල)",
    )
    catalogue_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="නිවේදන නාමාවලිය",
        verbose_name="Library Section Badge (සිංහල)",
    )
    library_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="සියලු නිල නිවේදන සහ චක්‍රලේඛ එකතුව",
        verbose_name="Library Section Title (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="உத்தியோகபூர்வ அறிவித்தல்கள்",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="உத்தியோகபூர்வ அறிவித்தல்கள் &",
        verbose_name="Title (தமிழ்)",
    )
    highlighted_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அமைச்சு சுற்றறிக்கைகள்",
        verbose_name="Highlighted Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="கடற்றொழில் அமைச்சு வெளியிடும் உத்தியோகபூர்வ பொது அறிவித்தல்கள், நிர்வாக சுற்றறிக்கைகள், வர்த்தமானி அறிவித்தல்கள் மற்றும் பொதுமக்கள் கருத்துக்கேட்புகள்.",
        verbose_name="Description (தமிழ்)",
    )
    featured_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="முக்கிய / அவசர அறிவித்தல்",
        verbose_name="Featured Section Badge (தமிழ்)",
    )
    catalogue_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="அறிவித்தல் பலகை விபரம்",
        verbose_name="Library Section Badge (தமிழ்)",
    )
    library_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அனைத்து உத்தியோகபூர்வ அறிவித்தல்கள் & சுற்றறிக்கைகள்",
        verbose_name="Library Section Title (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Notice Section Titles & Badges"
        verbose_name_plural = "01. Notice Section Titles & Badges"

    def __str__(self) -> str:
        return f"Section Titles: {self.library_title_en}"


# ==========================================================
# 02. Official Notices & Circulars (Multilingual)
# ==========================================================
class NoticeItem(TimeStampedModel):
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display priority sequence",
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        help_text="Unique URL identifier (e.g. fuel-subsidy-circular-2026)",
    )
    notice_number = models.CharField(
        max_length=100,
        blank=True,
        default="MF/NOT/2026/01",
        help_text="Official Reference or Circular No (e.g. 'MF/CIR/2026/04' or 'DFAR/NOT/2026/12')",
        verbose_name="Notice / Circular Reference No",
    )
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="general",
        help_text="Select notice category",
    )
    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default="normal",
    )
    is_urgent = models.BooleanField(
        default=False,
        help_text="Check if this is an urgent / time-sensitive announcement",
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Check to highlight in top 'Featured Notice' banner",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )

    # 🇬🇧 English Content
    title_en = models.CharField(
        max_length=255,
        verbose_name="Notice Title (English)",
    )
    department_en = models.CharField(
        max_length=255,
        default="Ministry of Fisheries - Head Office",
        verbose_name="Issuing Department / Division (English)",
    )
    category_label_en = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (English - Auto-Synced)",
    )
    summary_en = models.TextField(
        verbose_name="Short Summary / Key Highlights (English)",
    )
    content_en = models.TextField(
        verbose_name="Full Notice Content (English - Supports HTML / instructions)",
    )
    attachment_title_en = models.CharField(
        max_length=200,
        blank=True,
        default="",
        verbose_name="Attachment Document Title (English)",
    )

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Notice Title (සිංහල)",
    )
    department_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර අමාත්‍යාංශය - ප්‍රධාන කාර්යාලය",
        verbose_name="Issuing Department (සිංහල)",
    )
    category_label_si = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (සිංහල - Auto-Synced)",
    )
    summary_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Short Summary (සිංහල)",
    )
    content_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Full Notice Content (සිංහල)",
    )
    attachment_title_si = models.CharField(
        max_length=200,
        blank=True,
        default="",
        verbose_name="Attachment Document Title (සිංහල)",
    )

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Notice Title (தமிழ்)",
    )
    department_ta = models.CharField(
        max_length=255,
        blank=True,
        default="கடற்றொழில் அமைச்சு - பிரதான காரியாலயம்",
        verbose_name="Issuing Department (தமிழ்)",
    )
    category_label_ta = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (தமிழ் - Auto-Synced)",
    )
    summary_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Short Summary (தமிழ்)",
    )
    content_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Full Notice Content (தமிழ்)",
    )
    attachment_title_ta = models.CharField(
        max_length=200,
        blank=True,
        default="",
        verbose_name="Attachment Document Title (தமிழ்)",
    )

    # Dates & Deadlines
    published_date = models.CharField(
        max_length=50,
        blank=True,
        default="",
        help_text="Issue Date (e.g. '2026-03-15' or '15 March 2026')",
    )
    expiry_date = models.CharField(
        max_length=50,
        blank=True,
        default="",
        help_text="Closing Date / Deadline (e.g. '2026-04-30' or 'Open / Ongoing')",
    )

    # Document & Download Attachments
    document_file = models.FileField(
        upload_to=notice_upload_path,
        blank=True,
        null=True,
        help_text="Upload official PDF / DOCX circular or gazette notice",
    )
    file_url = models.CharField(
        max_length=500,
        blank=True,
        default="",
        help_text="External URL or direct link if document is hosted externally",
    )
    file_type = models.CharField(
        max_length=10,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
    )
    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="1.5 MB",
        help_text="e.g. '1.5 MB' or '450 KB'",
    )

    class Meta:
        ordering = ["-created_at", "-id"]
        verbose_name = "02. Official Notice Item"
        verbose_name_plural = "02. Official Notice Items"

    def save(self, *args, **kwargs):
        # Auto-fill published_date if empty
        if not self.published_date or not str(self.published_date).strip():
            self.published_date = timezone.now().strftime("%Y-%m-%d")

        # Auto-generate unique slug if empty or format properly
        if not self.slug or not str(self.slug).strip():
            from django.utils.text import slugify
            base_slug = slugify(self.title_en) if self.title_en else "official-notice"
            base_slug = base_slug[:200].rstrip('-')
            self.slug = f"{base_slug}-{uuid4().hex[:6]}"
        else:
            from django.utils.text import slugify
            clean_slug = slugify(self.slug)
            if clean_slug:
                self.slug = clean_slug[:255].rstrip('-')
            else:
                self.slug = str(self.slug)[:255]

        # Auto-sync multilingual category labels whenever category is selected
        if self.category in CATEGORY_LABELS_MAP:
            en_val, si_val, ta_val = CATEGORY_LABELS_MAP[self.category]
            self.category_label_en = en_val
            self.category_label_si = si_val
            self.category_label_ta = ta_val

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"[{self.notice_number}] {self.title_en}"