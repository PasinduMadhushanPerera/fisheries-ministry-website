from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def gallery_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"gallery/{timezone.now():%Y/%m}/{safe_filename}"


CATEGORY_CHOICES = [
    ("official_events", "Official Events & Ceremonies"),
    ("fisheries", "Fisheries & Marine Operations"),
    ("aquaculture", "Aquaculture & Inland Farming"),
    ("community", "Community & Fisher Welfare"),
    ("conservation", "Marine Conservation & Ecology"),
    ("general", "General Collections"),
]

CATEGORY_LABELS_MAP = {
    "official_events": ("Official Events", "නිල උත්සව සහ සමුළු", "உத்தியோகபூர்வ நிகழ்வுகள்"),
    "fisheries": ("Fisheries & Marine", "ධීවර හා සාගර මෙහෙයුම්", "கடற்றொழில் மற்றும் கடல்சார்"),
    "aquaculture": ("Aquaculture & Inland", "ජලජීවී හා මිරිදිය වගා", "நீரியல் வளர்ப்பு"),
    "community": ("Community & Welfare", "ප්‍රජා සහ සුබසාධනය", "சமூக மேம்பாடு"),
    "conservation": ("Conservation & Ecology", "සාගර පරිසර සංරක්ෂණය", "சுற்றாடல் பாதுகாப்பு"),
    "general": ("General Collections", "පොදු ඡායාරූප", "பொது புகைப்படங்கள்"),
}


# ==========================================================
# 01. Gallery Page Section Titles & Badges
# ==========================================================
class GalleryPageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Official Visual Archive",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Photo Gallery &",
        verbose_name="Title (English)",
    )
    highlighted_title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Media Collections",
        verbose_name="Highlighted Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Browse official high-resolution photo galleries from the Ministry of Fisheries, including fisheries development programmes, aquaculture projects, community initiatives, harbour infrastructure, and official state events.",
        verbose_name="Description (English)",
    )
    featured_badge_en = models.CharField(
        max_length=150,
        default="Featured Collection",
        verbose_name="Featured Section Badge (English)",
    )
    catalogue_badge_en = models.CharField(
        max_length=150,
        default="Photo Albums",
        verbose_name="Library Section Badge (English)",
    )
    library_title_en = models.CharField(
        max_length=255,
        default="All Photo Collections & State Albums",
        verbose_name="Library Section Title (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="නිල ඡායාරූප ලේඛනාගාරය",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="ඡායාරූප ගැලරිය සහ",
        verbose_name="Title (සිංහල)",
    )
    highlighted_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="මාධ්‍ය එකතු",
        verbose_name="Highlighted Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ධීවර අමාත්‍යාංශයේ නිල සංවර්ධන වැඩසටහන්, ජලජීවී වගා ව්‍යාපෘති, ප්‍රජා සත්කාරක ඉසව්, වරාය යටිතල පහසුකම් සහ රාජ්‍ය උත්සව පිළිබඳ උසස් තත්ත්වයේ ඡායාරූප එකතුව මෙතැනින් නරඹන්න.",
        verbose_name="Description (සිංහල)",
    )
    featured_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="විශේෂ ඡායාරූප එකතුව",
        verbose_name="Featured Section Badge (සිංහල)",
    )
    catalogue_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="ඡායාරූප ඇල්බම",
        verbose_name="Library Section Badge (සිංහල)",
    )
    library_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="සියලු ඡායාරූප එකතු සහ ඇල්බම",
        verbose_name="Library Section Title (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="உத்தியோகபூர்வ புகைப்படக் காப்பகம்",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="புகைப்பட தொகுப்பு &",
        verbose_name="Title (தமிழ்)",
    )
    highlighted_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="ஊடக ஆவணங்கள்",
        verbose_name="Highlighted Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="கடற்றොழில் அமைச்சின் உத்தியோகபூர்வ அபிவிருத்தி திட்டங்கள், நீரியல் வளர்ப்பு திட்டங்கள், சமூக நலன்புரி நிகழ்வுகள் மற்றும் துறைமுக உட்கட்டமைப்பு புகைப்படங்கள்.",
        verbose_name="Description (தமிழ்)",
    )
    featured_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="முக்கிய புகைப்பட தொகுப்பு",
        verbose_name="Featured Section Badge (தமிழ்)",
    )
    catalogue_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="புகைப்பட ஆல்பங்கள்",
        verbose_name="Library Section Badge (தமிழ்)",
    )
    library_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அனைத்து உத்தியோகபூர்வ புகைப்பட தொகுப்புகள்",
        verbose_name="Library Section Title (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Gallery Page Titles & Badges"
        verbose_name_plural = "01. Gallery Page Titles & Badges"

    def __str__(self) -> str:
        return f"Gallery Header: {self.library_title_en}"


# ==========================================================
# 02. Gallery Albums (Multilingual)
# ==========================================================
class GalleryAlbum(TimeStampedModel):
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display priority sequence",
    )
    slug = models.SlugField(
        max_length=150,
        unique=True,
        help_text="Unique URL identifier (e.g. national-fisheries-development-programme)",
    )
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="official_events",
        help_text="Select album category",
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Check to highlight in top 'Featured Collection' section",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )

    # 🇬🇧 English Content
    title_en = models.CharField(
        max_length=255,
        verbose_name="Album Title (English)",
    )
    category_label_en = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (English - Auto-Synced)",
    )
    description_en = models.TextField(
        verbose_name="Album Description (English)",
    )
    location_en = models.CharField(
        max_length=150,
        default="Colombo, Sri Lanka",
        verbose_name="Location / District (English)",
    )

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Album Title (සිංහල)",
    )
    category_label_si = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (සිංහල - Auto-Synced)",
    )
    description_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Album Description (සිංහල)",
    )
    location_si = models.CharField(
        max_length=150,
        blank=True,
        default="කොළඹ",
        verbose_name="Location / District (සිංහල)",
    )

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Album Title (தமிழ்)",
    )
    category_label_ta = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (தமிழ் - Auto-Synced)",
    )
    description_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Album Description (தமிழ்)",
    )
    location_ta = models.CharField(
        max_length=150,
        blank=True,
        default="கொழும்பு",
        verbose_name="Location / District (தமிழ்)",
    )

    # Event Date
    event_date = models.CharField(
        max_length=50,
        blank=True,
        default="",
        help_text="Event Date (e.g. '2026-07-20')",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Display Date (e.g. '20 July 2026')",
    )

    # Cover Image
    cover_image = models.ImageField(
        upload_to=gallery_upload_path,
        blank=True,
        null=True,
        help_text="Upload album cover photo (high-res)",
    )
    cover_image_url_fallback = models.CharField(
        max_length=255,
        blank=True,
        default="/images/home/hero-fishing-harbour.jpg",
        help_text="Default image fallback",
    )
    cover_image_alt = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry Photo Album Cover",
    )

    class Meta:
        ordering = ["-created_at", "-id"]
        verbose_name = "02. Photo Album"
        verbose_name_plural = "02. Photo Albums"

    def save(self, *args, **kwargs):
        # Auto-generate slug
        if not self.slug or not str(self.slug).strip():
            from django.utils.text import slugify
            base_slug = slugify(self.title_en) if self.title_en else "album"
            self.slug = f"{base_slug}-{uuid4().hex[:6]}"

        # Auto-fill display date if empty
        if not self.display_date and self.event_date:
            self.display_date = self.event_date

        # Auto-sync category labels
        if self.category in CATEGORY_LABELS_MAP:
            en_val, si_val, ta_val = CATEGORY_LABELS_MAP[self.category]
            self.category_label_en = en_val
            self.category_label_si = si_val
            self.category_label_ta = ta_val

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.title_en} ({self.get_category_display()})"


# ==========================================================
# 03. Individual Gallery Images
# ==========================================================
class GalleryImage(TimeStampedModel):
    album = models.ForeignKey(
        GalleryAlbum,
        on_delete=models.CASCADE,
        related_name="images",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Image order within the album",
    )
    image = models.ImageField(
        upload_to=gallery_upload_path,
        blank=True,
        null=True,
        help_text="Upload high-resolution image",
    )
    image_url_fallback = models.CharField(
        max_length=255,
        blank=True,
        default="/images/home/hero-fishing-harbour.jpg",
    )
    alt_text = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry gallery photo",
    )

    # Multilingual Captions
    caption_en = models.CharField(
        max_length=500,
        blank=True,
        default="",
        verbose_name="Photo Caption (English)",
    )
    caption_si = models.CharField(
        max_length=500,
        blank=True,
        default="",
        verbose_name="Photo Caption (සිංහල)",
    )
    caption_ta = models.CharField(
        max_length=500,
        blank=True,
        default="",
        verbose_name="Photo Caption (தமிழ்)",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "03. Album Photo"
        verbose_name_plural = "03. Album Photos"

    def __str__(self) -> str:
        return f"Photo {self.order} in {self.album.title_en}"
