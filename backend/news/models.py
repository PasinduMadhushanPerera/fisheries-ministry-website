from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def news_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"news/{timezone.now():%Y/%m}/{safe_filename}"


news_image_upload_path = news_upload_path
news_attachment_upload_path = news_upload_path


def validate_upload_size(value):
    pass


CATEGORY_CHOICES = [
    ("ministry", "Ministry News"),
    ("development", "Sector Development"),
    ("community", "Fisher Community & Welfare"),
    ("aquaculture", "Aquaculture & Inland"),
    ("ocean", "Ocean Resources & Marine"),
    ("events", "Events & Ceremonies"),
    ("other", "General News"),
]

CATEGORY_LABELS_MAP = {
    "ministry": ("Ministry News", "අමාත්‍යාංශ පුවත්", "அமைச்சுச் செய்திகள்"),
    "development": ("Sector Development", "ක්ෂේත්‍ර සංවර්ධනය", "துறைசார் அபிවிருத்தி"),
    "community": ("Fisher Community & Welfare", "ධීවර ප්‍රජාව සහ සුබසාධනය", "மீனவ சமூகம் & நலன்பුரி"),
    "aquaculture": ("Aquaculture & Inland", "ජලජීවී සහ මිරිදිය වගාව", "நீரியல் மற்றும் நன்னீர் வளர்ப்பு"),
    "ocean": ("Ocean Resources & Marine", "සාගර සම්පත් සහ සංරක්ෂණය", "கடல்சார் வளங்கள் & பாதுகாப்பு"),
    "events": ("Events & Ceremonies", "විශේෂ සිදුවීම් සහ උත්සව", "நிகழ்வுகள் & வைபවங்கள்"),
    "other": ("General News", "පොදු පුවත්", "பொதுச் செய்திகள்"),
}

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document"),
    ("DOCX", "Word Document (DOCX)"),
    ("XLSX", "Excel Spreadsheet (XLSX)"),
    ("ZIP", "ZIP Archive"),
]


# ==========================================================
# 01. News Section Titles & Badges (Multilingual)
# ==========================================================
class NewsPageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Ministry Newsroom",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Latest News &",
        verbose_name="Title (English)",
    )
    highlighted_title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry Updates",
        verbose_name="Highlighted Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Read the latest fisheries news, development updates, community welfare programmes, and official events from across Sri Lanka.",
        verbose_name="Description (English)",
    )
    featured_badge_en = models.CharField(
        max_length=150,
        default="Latest Featured News",
        verbose_name="Featured Section Badge (English)",
    )
    catalogue_badge_en = models.CharField(
        max_length=150,
        default="Official News Feed",
        verbose_name="Library Section Badge (English)",
    )
    library_title_en = models.CharField(
        max_length=255,
        default="All News & Press Updates",
        verbose_name="Library Section Title (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="අමාත්‍යාංශ ප්‍රවෘත්ති කාමරය",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="නවතම පුවත් සහ",
        verbose_name="Title (සිංහල)",
    )
    highlighted_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="අමාත්‍යාංශ තොරතුරු",
        verbose_name="Highlighted Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ශ්‍රී ලංකාව පුරා ධීවර පුවත්, සංවර්ධන තොරතුරු, ප්‍රජා සුබසාධන වැඩසටහන් සහ නිල නිවේදන පිළිබඳව දැනුවත් වන්න.",
        verbose_name="Description (සිංහල)",
    )
    featured_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="විශේෂ ප්‍රමුඛ පුවත",
        verbose_name="Featured Section Badge (සිංහල)",
    )
    catalogue_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="නිල පුවත් එකතුව",
        verbose_name="Library Section Badge (සිංහල)",
    )
    library_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="සියලු පුවත් සහ මාධ්‍ය නිවේදන",
        verbose_name="Library Section Title (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="அமைச்சு செய்திப் பிரிவு",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="சமீபத்திய செய்திகள் &",
        verbose_name="Title (தமிழ்)",
    )
    highlighted_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அமைச்சு புதுப்பிப்புகள்",
        verbose_name="Highlighted Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="இலங்கை முழுவதும் உள்ள கடற்றொழில் செய்திகள், துறைசார் அபிவிருத்திகள், மீனவ சமூக நலத்திட்டங்கள் மற்றும் நிகழ்வுகள்.",
        verbose_name="Description (தமிழ்)",
    )
    featured_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="சிறப்பு முக்கியச் செய்தி",
        verbose_name="Featured Section Badge (தமிழ்)",
    )
    catalogue_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="உத்தியோகபூர்வ செய்தித் தொகுப்பு",
        verbose_name="Library Section Badge (தமிழ்)",
    )
    library_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அனைத்து செய்திகள் மற்றும் ஊடக வெளியீடுகள்",
        verbose_name="Library Section Title (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. News Section Titles & Badges"
        verbose_name_plural = "01. News Section Titles & Badges"

    def __str__(self) -> str:
        return f"Section Titles: {self.library_title_en}"


# ==========================================================
# 02. News Articles & Media Updates (Multilingual)
# ==========================================================
class NewsArticleItem(TimeStampedModel):
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display priority sequence",
    )
    slug = models.SlugField(
        max_length=150,
        unique=True,
        help_text="Unique identifier slug (e.g. mirissa-anchorage-development-2026)",
    )
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="ministry",
        help_text="Select article category (automatically sets English, Sinhala & Tamil badges)",
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Check to highlight in top 'Featured News' section",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )

    # 🇬🇧 English Content
    title_en = models.CharField(
        max_length=255,
        verbose_name="Article Title (English)",
    )
    publisher_en = models.CharField(
        max_length=255,
        default="Ministry Media Unit",
        verbose_name="Publisher / Division (English)",
    )
    category_label_en = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (English - Auto-Synced from Category)",
    )
    summary_en = models.TextField(
        blank=True,
        default="",
        verbose_name="Short Summary (English)",
    )
    content_en = models.TextField(
        blank=True,
        default="",
        verbose_name="Full Article Content (English - Supports HTML / paragraphs)",
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
        verbose_name="Article Title (සිංහල)",
    )
    publisher_si = models.CharField(
        max_length=255,
        blank=True,
        default="අමාත්‍යාංශ මාධ්‍ය අංශය",
        verbose_name="Publisher (සිංහල)",
    )
    category_label_si = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (සිංහල - Auto-Synced from Category)",
    )
    summary_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Short Summary (සිංහල)",
    )
    content_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Full Article Content (සිංහල)",
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
        verbose_name="Article Title (தமிழ்)",
    )
    publisher_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அமைச்சு ஊடகப் பிரிவு",
        verbose_name="Publisher (தமிழ்)",
    )
    category_label_ta = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (தமிழ் - Auto-Synced from Category)",
    )
    summary_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Short Summary (தமிழ்)",
    )
    content_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Full Article Content (தமிழ்)",
    )
    attachment_title_ta = models.CharField(
        max_length=200,
        blank=True,
        default="",
        verbose_name="Attachment Document Title (தமிழ்)",
    )

    # Dates & Metadata
    published_date = models.CharField(
        max_length=50,
        blank=True,
        default="",
        help_text="e.g. '2026-03-15' or '15 March 2026' (Auto-filled with today's date if empty)",
    )

    # Media & Downloads
    image = models.ImageField(
        upload_to=news_upload_path,
        blank=True,
        null=True,
        help_text="Upload news cover image (16:9 recommended)",
    )
    image_url_fallback = models.CharField(
        max_length=255,
        blank=True,
        default="/images/home/hero-fishing-harbour.jpg",
        help_text="Default static image path if no image uploaded",
    )
    image_alt = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry news illustration",
    )

    document_file = models.FileField(
        upload_to=news_upload_path,
        blank=True,
        null=True,
        help_text="Upload optional PDF / DOCX press release or circular",
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
        verbose_name = "02. News Article Item"
        verbose_name_plural = "02. News Article Items"

    def save(self, *args, **kwargs):
        # Auto-fill published_date if empty
        if not self.published_date or not str(self.published_date).strip():
            self.published_date = timezone.now().strftime("%Y-%m-%d")

        # Auto-generate unique slug if empty
        if not self.slug or not str(self.slug).strip():
            from django.utils.text import slugify
            base_slug = slugify(self.title_en) if self.title_en else "news-article"
            self.slug = f"{base_slug}-{uuid4().hex[:6]}"

        # Auto-sync multilingual category labels whenever category is selected
        if self.category in CATEGORY_LABELS_MAP:
            en_val, si_val, ta_val = CATEGORY_LABELS_MAP[self.category]
            self.category_label_en = en_val
            self.category_label_si = si_val
            self.category_label_ta = ta_val

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.title_en} [{self.get_category_display()}]"