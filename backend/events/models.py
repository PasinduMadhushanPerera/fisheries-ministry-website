from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def event_image_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"events/{timezone.now():%Y/%m}/{safe_filename}"


CATEGORY_CHOICES = [
    ("symposiums_conferences", "Symposiums & Conferences"),
    ("workshops_training", "Workshops & Training"),
    ("stakeholder_forums", "Stakeholder Forums"),
    ("community_outreach", "Community Outreach"),
    ("general", "General Ministry Events"),
]

CATEGORY_LABELS_MAP = {
    "symposiums_conferences": ("Symposiums & Conferences", "සම්මන්ත්‍රණ සහ සමුළු", "கருத்தரங்குகள் & மாநாடுகள்"),
    "workshops_training": ("Workshops & Training", "වැඩමුළු සහ පුහුණු", "பட்டறைகள் & பயிற்சிகள்"),
    "stakeholder_forums": ("Stakeholder Forums", "පාර්ශ්වකරුවන්ගේ සංසද", "பங்குதாரர் மன்றங்கள்"),
    "community_outreach": ("Community Outreach", "ප්‍රජා සත්කාරක වැඩසටහන්", "சமூக மேம்பாட்டு நிகழ்வுகள்"),
    "general": ("General Events", "පොදු වැඩසටහන්", "பொது நிகழ்வுகள்"),
}

STATUS_CHOICES = [
    ("Upcoming", "Upcoming"),
    ("Ongoing", "Ongoing"),
    ("Completed", "Completed"),
]


# ==========================================================
# 01. Event Page Section Titles & Badges
# ==========================================================
class EventPageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Official Gatherings",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Events &",
        verbose_name="Title (English)",
    )
    highlighted_title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry Programmes",
        verbose_name="Highlighted Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Explore official symposiums, workshops, coastal fisher safety training, aquaculture conferences, and public outreach programmes organized by the Ministry of Fisheries.",
        verbose_name="Description (English)",
    )
    catalogue_badge_en = models.CharField(
        max_length=150,
        default="Events Library",
        verbose_name="Library Section Badge (English)",
    )
    library_title_en = models.CharField(
        max_length=255,
        default="All Ministry Events & Programmes",
        verbose_name="Library Section Title (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="නිල වැඩසටහන් සහ සමුළු",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="වැඩසටහන් සහ",
        verbose_name="Title (සිංහල)",
    )
    highlighted_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="අමාත්‍යාංශ ඉසව්",
        verbose_name="Highlighted Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ධීවර අමාත්‍යාංශය මඟින් සංවිධානය කරනු ලබන නිල සම්මන්ත්‍රණ, පුහුණු වැඩමුළු, ප්‍රජා සත්කාරක වැඩසටහන් සහ ක්ෂේත්‍ර සමුළු පිළිබඳ විස්තර මෙතැනින් ලබාගන්න.",
        verbose_name="Description (සිංහල)",
    )
    catalogue_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="වැඩසටහන් නාමාවලිය",
        verbose_name="Library Section Badge (සිංහල)",
    )
    library_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="සියලු අමාත්‍යාංශ වැඩසටහන් සහ සම්මන්ත්‍රණ",
        verbose_name="Library Section Title (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="உத்தியோகபூர்வ நிகழ்வுகள்",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="நிகழ்வுகள் &",
        verbose_name="Title (தமிழ்)",
    )
    highlighted_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அமைச்சு திட்டங்கள்",
        verbose_name="Highlighted Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="கடற்றொழில் அமைச்சு ஒழுங்குசெய்யும் உத்தியோகபூர்வ மாநாடுகள், பட்டறைகள், மீனவ பாதுகாப்பு பயிற்சிகள் மற்றும் சமூக மேம்பாட்டு திட்டங்கள்.",
        verbose_name="Description (தமிழ்)",
    )
    catalogue_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="நிகழ்வுகள் ஆவணம்",
        verbose_name="Library Section Badge (தமிழ்)",
    )
    library_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அனைத்து அமைச்சு நிகழ்வுகள் மற்றும் திட்டங்கள்",
        verbose_name="Library Section Title (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Event Page Titles & Badges"
        verbose_name_plural = "01. Event Page Titles & Badges"

    def __str__(self) -> str:
        return f"Event Page Header: {self.library_title_en}"


# ==========================================================
# 02. Event Items (Multilingual)
# ==========================================================
class EventItem(TimeStampedModel):
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display priority sequence",
    )
    slug = models.SlugField(
        max_length=150,
        unique=True,
        help_text="Unique URL identifier (e.g. national-fisheries-symposium-2026)",
    )
    reference_number = models.CharField(
        max_length=100,
        blank=True,
        default="MFAR/EV/2026/001",
        help_text="Official Event Reference (e.g. 'MFAR/EV/2026/001')",
        verbose_name="Event Reference Number",
    )
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="symposiums_conferences",
        help_text="Select event category",
    )
    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="Upcoming",
        help_text="Event Status (Upcoming, Ongoing, Completed)",
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Check to highlight this event",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )

    # 🇬🇧 English Content
    title_en = models.CharField(
        max_length=255,
        verbose_name="Event Title (English)",
    )
    summary_en = models.TextField(
        verbose_name="Summary / Excerpt (English)",
    )
    description_en = models.TextField(
        verbose_name="Full Description / Paragraphs (English - separated by newlines or HTML)",
    )
    venue_en = models.CharField(
        max_length=255,
        default="BMICH Main Auditorium, Colombo 07",
        verbose_name="Venue (English)",
    )
    location_en = models.CharField(
        max_length=100,
        default="Colombo",
        verbose_name="Location / District (English)",
    )
    organizer_en = models.CharField(
        max_length=255,
        default="Ministry of Fisheries & NARA",
        verbose_name="Organizer (English)",
    )
    category_label_en = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (English - Auto-Synced)",
    )

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Event Title (සිංහල)",
    )
    summary_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Summary (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Full Description (සිංහල)",
    )
    venue_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Venue (සිංහල)",
    )
    location_si = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Location / District (සිංහල)",
    )
    organizer_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර අමාත්‍යාංශය",
        verbose_name="Organizer (සිංහල)",
    )
    category_label_si = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (සිංහල - Auto-Synced)",
    )

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Event Title (தமிழ்)",
    )
    summary_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Summary (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Full Description (தமிழ்)",
    )
    venue_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Venue (தமிழ்)",
    )
    location_ta = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Location / District (தமிழ்)",
    )
    organizer_ta = models.CharField(
        max_length=255,
        blank=True,
        default="கடற்றொழில் அமைச்சு",
        verbose_name="Organizer (தமிழ்)",
    )
    category_label_ta = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (தமிழ் - Auto-Synced)",
    )

    # Date, Time & Contacts
    date = models.CharField(
        max_length=50,
        blank=True,
        default="",
        help_text="Event Date (e.g. '2026-06-20')",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Formatted Display Date (e.g. '20 June 2026')",
    )
    time = models.CharField(
        max_length=100,
        default="09:00 AM - 04:30 PM",
        help_text="Event Time (e.g. '09:00 AM - 04:30 PM')",
    )
    contact_email = models.EmailField(
        blank=True,
        default="events@fisheries.gov.lk",
    )
    contact_phone = models.CharField(
        max_length=50,
        blank=True,
        default="+94 11 244 6183",
    )

    # Program Schedule / Agenda (JSON List of {time, topic})
    agenda = models.JSONField(
        blank=True,
        default=list,
        help_text="List of timeline agenda items (e.g. [{'time': '09:00 AM', 'topic': 'Registration'}])",
    )

    # Media
    image = models.ImageField(
        upload_to=event_image_upload_path,
        blank=True,
        null=True,
        help_text="Upload event banner/photo",
    )
    image_url_fallback = models.CharField(
        max_length=255,
        blank=True,
        default="/images/home/hero-fishing-harbour.jpg",
    )
    image_alt = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry of Fisheries Event",
    )

    class Meta:
        ordering = ["-created_at", "-id"]
        verbose_name = "02. Event Item"
        verbose_name_plural = "02. Event Items"

    def save(self, *args, **kwargs):
        # Auto-generate slug
        if not self.slug or not str(self.slug).strip():
            from django.utils.text import slugify
            base_slug = slugify(self.title_en) if self.title_en else "event"
            self.slug = f"{base_slug}-{uuid4().hex[:6]}"

        # Auto-fill display date if empty
        if not self.display_date and self.date:
            self.display_date = self.date

        # Auto-sync multilingual category labels
        if self.category in CATEGORY_LABELS_MAP:
            en_val, si_val, ta_val = CATEGORY_LABELS_MAP[self.category]
            self.category_label_en = en_val
            self.category_label_si = si_val
            self.category_label_ta = ta_val

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"[{self.reference_number}] {self.title_en}"
