from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def press_release_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"press_releases/{timezone.now():%Y/%m}/{safe_filename}"


press_release_image_upload_path = press_release_upload_path
press_release_attachment_upload_path = press_release_upload_path


CATEGORY_CHOICES = [
    ("ministerial_statement", "Ministerial Statement"),
    ("sector_progress", "Sector & Export Progress"),
    ("fisher_welfare", "Fisher Community & Relief"),
    ("ocean_conservation", "Ocean Conservation & Ecology"),
    ("bilateral_cooperation", "Bilateral & International Relations"),
    ("emergency_alert", "Emergency Response & Maritime Safety"),
    ("general", "General Media Release"),
]

CATEGORY_LABELS_MAP = {
    "ministerial_statement": ("Ministerial Statement", "අමාත්‍ය ප්‍රකාශය", "அமைச்சரின் உத்தியோகபூர்வ அறிக்கை"),
    "sector_progress": ("Sector & Export Progress", "ක්ෂේත්‍ර හා අපනයන ප්‍රගතිය", "துறைசார் மற்றும் ஏற்றுமதி முன்னேற்றம்"),
    "fisher_welfare": ("Fisher Community & Relief", "ධීවර ප්‍රජා සුබසාධනය", "மீனவ சமூக நலன்புரி மற்றும் நிவாரணம்"),
    "ocean_conservation": ("Ocean Conservation & Ecology", "සාගර සංරක්ෂණය සහ පරිසරය", "கடல்சார் பாதுகாப்பு மற்றும் சுற்றாடல்"),
    "bilateral_cooperation": ("Bilateral Cooperation", "ද්විපාර්ශ්වික සහයෝගීතාව", "இருதரப்பு சர்வதேச ஒத்துழைப்பு"),
    "emergency_alert": ("Maritime Safety & Alert", "මුහුදු ආරක්ෂණ නිවේදනය", "கடல்சார் பாதுகாப்பு எச்சரிக்கை"),
    "general": ("General Media Release", "පොදු මාධ්‍ය නිවේදනය", "பொது ஊடக வெளியீடு"),
}

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document"),
    ("DOCX", "Word Document (DOCX)"),
    ("XLSX", "Excel Spreadsheet (XLSX)"),
    ("ZIP", "ZIP Archive"),
]


# ==========================================================
# 01. Press Release Page Section Titles & Badges
# ==========================================================
class PressReleasePageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Official Statements",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Press Releases &",
        verbose_name="Title (English)",
    )
    highlighted_title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Official Statements",
        verbose_name="Highlighted Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Read official statements, policy declarations, sector progress briefings, and verified media announcements issued by the Ministry of Fisheries.",
        verbose_name="Description (English)",
    )
    featured_badge_en = models.CharField(
        max_length=150,
        default="Lead Press Briefing",
        verbose_name="Featured Section Badge (English)",
    )
    catalogue_badge_en = models.CharField(
        max_length=150,
        default="Press Room Archive",
        verbose_name="Library Section Badge (English)",
    )
    library_title_en = models.CharField(
        max_length=255,
        default="All Official Press Releases & Media Briefings",
        verbose_name="Library Section Title (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="නිල මාධ්‍ය ප්‍රකාශ",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="මාධ්‍ය නිවේදන සහ",
        verbose_name="Title (සිංහල)",
    )
    highlighted_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="නිල ප්‍රකාශන",
        verbose_name="Highlighted Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ධීවර අමාත්‍යාංශය මඟින් නිකුත් කරනු ලබන නිල මාධ්‍ය නිවේදන, ප්‍රතිපත්ති ප්‍රකාශන, ක්ෂේත්‍ර ප්‍රගති වාර්තා සහ විශේෂ නිවේදන මෙතැනින් ලබාගන්න.",
        verbose_name="Description (සිංහල)",
    )
    featured_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="ප්‍රධාන මාධ්‍ය නිවේදනය",
        verbose_name="Featured Section Badge (සිංහල)",
    )
    catalogue_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="මාධ්‍ය ලේඛනාගාරය",
        verbose_name="Library Section Badge (සිංහල)",
    )
    library_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="සියලු නිල මාධ්‍ය නිවේදන සහ ප්‍රකාශ එකතුව",
        verbose_name="Library Section Title (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="உத்தியோகபூர்வ ஊடக அறிக்கைகள்",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="ஊடக வெளியீடுகள் &",
        verbose_name="Title (தமிழ்)",
    )
    highlighted_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="உத்தியோகபூர்வ அறிக்கைகள்",
        verbose_name="Highlighted Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="கடற்றொழில் அமைச்சு வெளியிடும் உத்தியோகபூர்வ ஊடக வெளியீடுகள், கொள்கை விளக்கங்கள், துறைசார் முன்னேற்ற அறிக்கைகள் மற்றும் சிறப்பு அறிவித்தல்கள்.",
        verbose_name="Description (தமிழ்)",
    )
    featured_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="முக்கிய ஊடக அறிக்கை",
        verbose_name="Featured Section Badge (தமிழ்)",
    )
    catalogue_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="ஊடக ஆவணக் காப்பகம்",
        verbose_name="Library Section Badge (தமிழ்)",
    )
    library_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அனைத்து உத்தியோகபூர்வ ஊடக வெளியீடுகள் மற்றும் அறிக்கைகள்",
        verbose_name="Library Section Title (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Press Release Page Titles & Badges"
        verbose_name_plural = "01. Press Release Page Titles & Badges"

    def __str__(self) -> str:
        return f"Page Header: {self.library_title_en}"


# ==========================================================
# 02. Press Release Items (Multilingual)
# ==========================================================
class PressReleaseItem(TimeStampedModel):
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display priority sequence",
    )
    slug = models.SlugField(
        max_length=150,
        unique=True,
        help_text="Unique URL identifier (e.g. tuna-export-agreement-2026)",
    )
    release_number = models.CharField(
        max_length=100,
        blank=True,
        default="MF/PR/2026/01",
        help_text="Official Press Release Reference (e.g. 'MF/PR/2026/04')",
        verbose_name="Press Release Reference Number",
    )
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="general",
        help_text="Select press release category",
    )
    location = models.CharField(
        max_length=100,
        default="Colombo, Sri Lanka",
        help_text="Dateline Location (e.g. 'Colombo', 'Galle', 'Trincomalee')",
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Check to highlight in top 'Lead Press Briefing' section",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )

    # 🇬🇧 English Content
    title_en = models.CharField(
        max_length=255,
        verbose_name="Release Headline / Title (English)",
    )
    publisher_en = models.CharField(
        max_length=255,
        default="Ministry Media & Communication Unit",
        verbose_name="Issuing Division / Spokesperson (English)",
    )
    category_label_en = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (English - Auto-Synced)",
    )
    summary_en = models.TextField(
        verbose_name="Executive Summary / Lead Paragraph (English)",
    )
    content_en = models.TextField(
        verbose_name="Full Press Release Statement (English - Supports HTML / paragraphs)",
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
        verbose_name="Release Headline (සිංහල)",
    )
    publisher_si = models.CharField(
        max_length=255,
        blank=True,
        default="අමාත්‍යාංශ මාධ්‍ය හා ප්‍රවෘත්ති අංශය",
        verbose_name="Issuing Division (සිංහල)",
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
        verbose_name="Executive Summary (සිංහල)",
    )
    content_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Full Press Release Statement (සිංහල)",
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
        verbose_name="Release Headline (தமிழ்)",
    )
    publisher_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அமைச்சு ஊடகப் பிரிவு",
        verbose_name="Issuing Division (தமிழ்)",
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
        verbose_name="Executive Summary (தமிழ்)",
    )
    content_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Full Press Release Statement (தமிழ்)",
    )
    attachment_title_ta = models.CharField(
        max_length=200,
        blank=True,
        default="",
        verbose_name="Attachment Document Title (தமிழ்)",
    )

    # Date
    published_date = models.CharField(
        max_length=50,
        blank=True,
        default="",
        help_text="Release Date (e.g. '2026-03-15' or '15 March 2026')",
    )

    # Media & Downloads
    image = models.ImageField(
        upload_to=press_release_upload_path,
        blank=True,
        null=True,
        help_text="Upload official press photo or briefing illustration",
    )
    image_url_fallback = models.CharField(
        max_length=255,
        blank=True,
        default="/images/home/hero-fishing-harbour.jpg",
        help_text="Default image fallback",
    )
    image_alt = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry press release photo",
    )

    document_file = models.FileField(
        upload_to=press_release_upload_path,
        blank=True,
        null=True,
        help_text="Upload official signed PDF / DOCX press release statement",
    )
    file_url = models.CharField(
        max_length=500,
        blank=True,
        default="",
        help_text="Direct link or external document URL",
    )
    file_type = models.CharField(
        max_length=10,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
    )
    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="1.2 MB",
        help_text="e.g. '1.2 MB' or '850 KB'",
    )

    class Meta:
        ordering = ["-created_at", "-id"]
        verbose_name = "02. Press Release Item"
        verbose_name_plural = "02. Press Release Items"

    def save(self, *args, **kwargs):
        # Auto-fill published_date if empty
        if not self.published_date or not str(self.published_date).strip():
            self.published_date = timezone.now().strftime("%Y-%m-%d")

        # Auto-generate unique slug if empty
        if not self.slug or not str(self.slug).strip():
            from django.utils.text import slugify
            base_slug = slugify(self.title_en) if self.title_en else "press-release"
            self.slug = f"{base_slug}-{uuid4().hex[:6]}"

        # Auto-sync multilingual category labels
        if self.category in CATEGORY_LABELS_MAP:
            en_val, si_val, ta_val = CATEGORY_LABELS_MAP[self.category]
            self.category_label_en = en_val
            self.category_label_si = si_val
            self.category_label_ta = ta_val

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"[{self.release_number}] {self.title_en}"
