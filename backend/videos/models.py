from pathlib import Path
from uuid import uuid4
import re
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def video_thumbnail_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"videos/thumbnails/{timezone.now():%Y/%m}/{safe_filename}"


def video_file_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"videos/files/{timezone.now():%Y/%m}/{safe_filename}"


CATEGORY_CHOICES = [
    ("official_events", "Official Events & Ceremonies"),
    ("fisheries", "Fisheries & Marine Operations"),
    ("aquaculture", "Aquaculture & Inland Farming"),
    ("community", "Community & Fisher Welfare"),
    ("conservation", "Marine Conservation & Ecology"),
    ("general", "General Videos"),
]

CATEGORY_LABELS_MAP = {
    "official_events": ("Official Events", "නිල උත්සව සහ සමුළු", "உத்தியோகபூர்வ நிகழ்வுகள்"),
    "fisheries": ("Fisheries & Marine", "ධීවර හා සාගර මෙහෙයුම්", "கடற்றொழில் மற்றும் கடல்சார்"),
    "aquaculture": ("Aquaculture & Inland", "ජලජීවී හා මිරිදිය වගා", "நீரியல் வளர்ப்பு"),
    "community": ("Community & Welfare", "ප්‍රජා සහ සුබසාධනය", "சமூக மேம்பாடு"),
    "conservation": ("Conservation & Ecology", "සාගර පරිසර සංරක්ෂණය", "சுற்றாடல் பாதுகாப்பு"),
    "general": ("General Videos", "පොදු වීඩියෝ", "பொது வீடியோக்கள்"),
}


# ==========================================================
# 01. Video Page Section Titles & Badges
# ==========================================================
class VideoPageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Official Video Archive",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Official Videos &",
        verbose_name="Title (English)",
    )
    highlighted_title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Documentary Library",
        verbose_name="Highlighted Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Watch official video documentaries, project updates, fisher training sessions, and media briefings from the Ministry of Fisheries, Sri Lanka.",
        verbose_name="Description (English)",
    )
    featured_badge_en = models.CharField(
        max_length=150,
        default="Featured Official Video",
        verbose_name="Featured Section Badge (English)",
    )
    catalogue_badge_en = models.CharField(
        max_length=150,
        default="Video Directory",
        verbose_name="Library Section Badge (English)",
    )
    library_title_en = models.CharField(
        max_length=255,
        default="All Official Videos & Documentaries",
        verbose_name="Library Section Title (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="නිල වීඩියෝ ලේඛනාගාරය",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="නිල වීඩියෝ සහ",
        verbose_name="Title (සිංහල)",
    )
    highlighted_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="වාර්තා වැඩසටහන්",
        verbose_name="Highlighted Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ධීවර අමාත්‍යාංශයේ නිල සංවර්ධන වැඩසටහන්, පුහුණු සැසි, ජලජීවී ව්‍යාපෘති සහ විශේෂ මාධ්‍ය සාකච්ඡා පිළිබඳ වීඩියෝ මෙතැනින් නරඹන්න.",
        verbose_name="Description (සිංහල)",
    )
    featured_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="විශේෂ වීඩියෝව",
        verbose_name="Featured Section Badge (සිංහල)",
    )
    catalogue_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="වීඩියෝ නාමාවලිය",
        verbose_name="Library Section Badge (සිංහල)",
    )
    library_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="සියලු නිල වීඩියෝ සහ වාර්තා වැඩසටහන්",
        verbose_name="Library Section Title (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="உத்தியோகபூர்வ வீடியோ காப்பகம்",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="உத்தியோகபூர்வ வீடியோக்கள் &",
        verbose_name="Title (தமிழ்)",
    )
    highlighted_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="ஆவணப் படங்கள்",
        verbose_name="Highlighted Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="கடற்றොழில் அமைச்சின் உத்தியோகபூர்வ அபிவிருத்தி திட்டங்கள், பயிற்சி பட்டறைகள் மற்றும் ஆவணப்படங்களை பார்வையிடுங்கள்.",
        verbose_name="Description (தமிழ்)",
    )
    featured_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="முக்கிய வீடியோ",
        verbose_name="Featured Section Badge (தமிழ்)",
    )
    catalogue_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="வீடியோ ஆவணம்",
        verbose_name="Library Section Badge (தமிழ்)",
    )
    library_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அனைத்து உத்தியோகபூர்வ வீடியோக்கள் மற்றும் ஆவணப்படங்கள்",
        verbose_name="Library Section Title (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Video Page Titles & Badges"
        verbose_name_plural = "01. Video Page Titles & Badges"

    def __str__(self) -> str:
        return f"Video Page Header: {self.library_title_en}"


def extract_youtube_id(value: str) -> str:
    if not value:
        return ""
    val = str(value).strip()
    if len(val) == 11 and re.match(r"^[a-zA-Z0-9_-]{11}$", val):
        return val
    patterns = [
        r"(?:v=|\/embed\/|youtu\.be\/|\/v\/|\/shorts\/|\/live\/)([a-zA-Z0-9_-]{11})",
        r"[?&]v=([a-zA-Z0-9_-]{11})",
    ]
    for pat in patterns:
        m = re.search(pat, val)
        if m:
            return m.group(1)
    return ""


# ==========================================================
# 02. Video Items (Multilingual & Upload / YouTube Support)
# ==========================================================
class VideoItem(TimeStampedModel):
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display priority sequence",
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        help_text="Unique URL identifier (e.g. national-fisheries-development-programme)",
    )
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="official_events",
        help_text="Select video category",
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Check to highlight in top 'Featured Official Video' section",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )

    # 🇬🇧 English Content
    title_en = models.CharField(
        max_length=255,
        verbose_name="Video Title (English)",
    )
    category_label_en = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (English - Auto-Synced)",
    )
    description_en = models.TextField(
        verbose_name="Video Summary / Description (English)",
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
        verbose_name="Video Title (සිංහල)",
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
        verbose_name="Video Summary (සිංහල)",
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
        verbose_name="Video Title (தமிழ்)",
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
        verbose_name="Video Summary (தமிழ்)",
    )
    location_ta = models.CharField(
        max_length=150,
        blank=True,
        default="கொழும்பு",
        verbose_name="Location / District (தமிழ்)",
    )

    # Video Metadata
    duration = models.CharField(
        max_length=50,
        default="4:28",
        help_text="e.g. '4:28' or '12:45'",
    )
    published_date = models.CharField(
        max_length=50,
        blank=True,
        default="",
        help_text="Release Date (e.g. '2026-07-20')",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Formatted Display Date (e.g. '20 July 2026')",
    )

    # Direct Video Upload or YouTube / External URL
    video_file = models.FileField(
        upload_to=video_file_upload_path,
        blank=True,
        null=True,
        help_text="Upload MP4/WebM video file directly OR provide YouTube / External video link below",
        verbose_name="Direct Video File Upload (MP4 / WebM)",
    )
    video_url = models.CharField(
        max_length=500,
        blank=True,
        default="",
        help_text="YouTube URL or external video link (used if direct video file is not uploaded)",
        verbose_name="YouTube or External Video URL",
    )
    youtube_id = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="YouTube Video ID (auto-extracted from video_url if left blank)",
    )

    # Thumbnail
    thumbnail = models.ImageField(
        upload_to=video_thumbnail_upload_path,
        blank=True,
        null=True,
        help_text="Upload custom high-res video thumbnail",
    )
    thumbnail_url_fallback = models.CharField(
        max_length=255,
        blank=True,
        default="/images/home/hero-fishing-harbour.jpg",
        help_text="Default thumbnail fallback",
    )
    thumbnail_alt = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry official video thumbnail",
    )

    class Meta:
        ordering = ["-created_at", "-id"]
        verbose_name = "02. Official Video"
        verbose_name_plural = "02. Official Videos"

    def save(self, *args, **kwargs):
        # Auto-generate slug if empty or format properly
        if not self.slug or not str(self.slug).strip():
            from django.utils.text import slugify
            base_slug = slugify(self.title_en) if self.title_en else "video"
            base_slug = base_slug[:200].rstrip('-')
            self.slug = f"{base_slug}-{uuid4().hex[:6]}"
        else:
            from django.utils.text import slugify
            clean_slug = slugify(self.slug)
            if clean_slug:
                self.slug = clean_slug[:255].rstrip('-')
            else:
                self.slug = str(self.slug)[:255]

        # Auto-fill display date if empty
        if not self.display_date and self.published_date:
            self.display_date = self.published_date

        # Auto-extract and clean YouTube ID from video_url or youtube_id
        if self.video_url:
            extracted = extract_youtube_id(self.video_url)
            if extracted:
                self.youtube_id = extracted
        elif self.youtube_id:
            extracted = extract_youtube_id(self.youtube_id)
            if extracted:
                self.youtube_id = extracted

        # Auto-sync category labels
        if self.category in CATEGORY_LABELS_MAP:
            en_val, si_val, ta_val = CATEGORY_LABELS_MAP[self.category]
            self.category_label_en = en_val
            self.category_label_si = si_val
            self.category_label_ta = ta_val

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.title_en} ({self.duration})"
