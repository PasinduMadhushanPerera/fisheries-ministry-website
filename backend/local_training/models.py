from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def local_training_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"local_training/{timezone.now():%Y/%m}/{safe_filename}"


CATEGORY_CHOICES = [
    ("language", "🌐 Language Courses"),
    ("professional-development", "🎯 Professional Development"),
    ("administration", "📑 Administration & Public Sector"),
    ("finance", "💰 Finance & Accounting"),
    ("procurement", "📋 Procurement & Contract Management"),
    ("technology", "💻 Technology & Digital Skills"),
    ("management", "📊 Management & Leadership"),
    ("other", "📌 Other Special Courses"),
]

STATUS_CHOICES = [
    ("Open", "🟢 Open for Applications"),
    ("Closing Soon", "🟡 Closing Soon"),
    ("Upcoming", "🔵 Upcoming Programme"),
    ("Closed", "🔴 Applications Closed"),
    ("Archived", "⚪ Archived"),
]

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document"),
    ("DOCX", "Word Document (DOCX)"),
    ("XLSX", "Excel Spreadsheet (XLSX)"),
    ("ZIP", "ZIP Archive"),
    ("JPG", "JPEG Image"),
    ("PNG", "PNG Image"),
]


# ==========================================================
# 01. Local Training Page Header & Intro (Multilingual)
# ==========================================================
class LocalTrainingPageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(max_length=100, default="Capacity Building & Skills Development", verbose_name="Badge (English)")
    title_en = models.CharField(max_length=255, default="Local Training Opportunities", verbose_name="Title (English)")
    description_en = models.TextField(
        default="Empowering fisheries professionals, public sector officers and community stakeholders with technical qualifications, language courses, and specialized vocational programmes across Sri Lanka.",
        verbose_name="Description (English)"
    )
    featured_badge_en = models.CharField(max_length=150, default="Featured 2026 Opportunities", verbose_name="Featured Section Badge (English)")
    catalogue_badge_en = models.CharField(max_length=150, default="Programme Catalogue", verbose_name="Library Section Badge (English)")
    library_title_en = models.CharField(max_length=255, default="Training Programme Library", verbose_name="Library Section Title (English)")

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(max_length=100, blank=True, default="ධාරිතා වර්ධනය සහ කුසලතා සංවර්ධනය", verbose_name="Badge (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="දේශීය පුහුණු අවස්ථා", verbose_name="Title (සිංහල)")
    description_si = models.TextField(
        blank=True,
        default="ශ්‍රී ලංකාව පුරා ධීවර වෘත්තිකයන්, රාජ්‍ය අංශයේ නිලධාරීන් සහ ප්‍රජා පාර්ශවකරුවන් සඳහා තාක්ෂණික සුදුසුකම්, භාෂා පාඨමාලා සහ විශේෂිත වෘත්තීය පුහුණු වැඩසටහන්.",
        verbose_name="Description (සිංහල)"
    )
    featured_badge_si = models.CharField(max_length=150, blank=True, default="2026 විශේෂ අවස්ථා", verbose_name="Featured Section Badge (සිංහල)")
    catalogue_badge_si = models.CharField(max_length=150, blank=True, default="වැඩසටහන් නාමාවලිය", verbose_name="Library Section Badge (සිංහල)")
    library_title_si = models.CharField(max_length=255, blank=True, default="පුහුණු වැඩසටහන් පුස්තකාලය", verbose_name="Library Section Title (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(max_length=100, blank=True, default="திறன் மேம்பாடு மற்றும் பயிற்சிகள்", verbose_name="Badge (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="உள்ளூர் பயிற்சி வாய்ப்புகள்", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(
        blank=True,
        default="இலங்கை முழுவதும் உள்ள மீன்பிடி தொழில் வல்லுநர்கள், பொதுத்துறை அதிகாரிகள் மற்றும் மீனவ சமூகத்தினருக்கான தொழினுட்ப தகைமைகள், மொழிப் பயிற்சிகள் மற்றும் தொழில்சார் செயலமர்வுகள்.",
        verbose_name="Description (தமிழ்)"
    )
    featured_badge_ta = models.CharField(max_length=150, blank=True, default="2026 இன் விசேட வாய்ப்புகள்", verbose_name="Featured Section Badge (தமிழ்)")
    catalogue_badge_ta = models.CharField(max_length=150, blank=True, default="திட்ட பட்டியல்", verbose_name="Library Section Badge (தமிழ்)")
    library_title_ta = models.CharField(max_length=255, blank=True, default="பயிற்சித் திட்ட நூலகம்", verbose_name="Library Section Title (தமிழ்)")

    class Meta:
        verbose_name = "01. Local Training Page Header & Section Titles"
        verbose_name_plural = "01. Local Training Page Header & Section Titles"

    def __str__(self) -> str:
        return f"Header: {self.title_en}"


# ==========================================================
# 02. Local Training Programmes & Courses (Multilingual)
# ==========================================================
class LocalTrainingProgramme(TimeStampedModel):
    order = models.PositiveIntegerField(default=1, help_text="Display priority sequence")
    slug = models.SlugField(max_length=150, unique=True, help_text="Unique identifier slug (e.g. english-courses-2026)")
    year = models.IntegerField(default=2026, help_text="Academic / Programme Year (e.g. 2026, 2025, 2024)")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="professional-development")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="Open")
    featured = models.BooleanField(default=False, help_text="Check to display in top 'Featured Opportunities' section")
    is_active = models.BooleanField(default=True, help_text="Display on live website")

    # 🇬🇧 English Content
    title_en = models.CharField(max_length=255, verbose_name="Course Title (English)")
    provider_en = models.CharField(max_length=255, verbose_name="Training Provider / Institute (English)")
    description_en = models.TextField(verbose_name="Course Description (English)")
    category_label_en = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (English)")

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Course Title (සිංහල)")
    provider_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Training Provider (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Course Description (සිංහල)")
    category_label_si = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (සිංහල)")

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Course Title (தமிழ்)")
    provider_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Training Provider (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Course Description (தமிழ்)")
    category_label_ta = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (தமிழ்)")

    # Dates & Metadata
    published_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-01-15'")
    application_deadline = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-03-31'")

    # Media & Downloads
    image = models.ImageField(upload_to=local_training_upload_path, blank=True, null=True, help_text="Upload 16:9 banner image")
    image_fallback = models.CharField(max_length=255, blank=True, default="/images/services/local-training.jpg", help_text="Default static image path")
    document_file = models.FileField(upload_to=local_training_upload_path, blank=True, null=True, help_text="Upload PDF / DOCX application / syllabus")
    file_url = models.CharField(max_length=500, blank=True, default="#", help_text="Direct link or external document URL")
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    file_size = models.CharField(max_length=50, default="1 MB", help_text="e.g. '794 KB' or '1.2 MB'")

    def save(self, *args, **kwargs):
        display_label = self.get_category_display()
        clean_label = display_label.split(" ", 1)[1] if (" " in display_label and not display_label[0].isalnum()) else display_label

        standard_labels = {choice[1] for choice in CATEGORY_CHOICES}
        standard_labels_clean = {c.split(" ", 1)[1] if (" " in c and not c[0].isalnum()) else c for c in standard_labels}
        all_standard = standard_labels | standard_labels_clean

        if not self.category_label_en or self.category_label_en in all_standard:
            self.category_label_en = clean_label

        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-year", "order", "-id"]
        verbose_name = "02. Local Training Programme"
        verbose_name_plural = "02. Local Training Programmes"

    def __str__(self) -> str:
        return f"[{self.year}] {self.title_en} ({self.status})"
