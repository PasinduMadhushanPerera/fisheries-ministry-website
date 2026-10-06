from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from common.models import TimeStampedModel


def local_training_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"local_training/{timezone.now():%Y/%m}/{safe_filename}"


def format_file_size(size_bytes: int) -> str:
    if not size_bytes or size_bytes <= 0:
        return ""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        kb = round(size_bytes / 1024, 1)
        return f"{int(kb) if kb.is_integer() else kb} KB"
    else:
        mb = round(size_bytes / (1024 * 1024), 1)
        return f"{int(mb) if mb.is_integer() else mb} MB"



CATEGORY_ICON_CHOICES = [
    ("graduation-cap", "🎓 Graduation Cap / Education"),
    ("book-open", "📖 Book / Course Material"),
    ("anchor", "⚓ Anchor / Maritime & Nautical"),
    ("fish", "🐟 Fish / Aquaculture"),
    ("award", "🏆 Award / Certification"),
    ("briefcase", "💼 Briefcase / Professional"),
    ("users", "👥 Users / Community"),
    ("shield-check", "🛡️ Shield / Safety & Compliance"),
    ("file-text", "📄 Document / Circular"),
    ("globe", "🌐 Language & Global Skills"),
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
# 02. Local Training Categories (Dynamic Sections)
# ==========================================================
class LocalTrainingCategory(TimeStampedModel):
    category_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique identifier slug (e.g. 'language-courses', 'maritime-skills', 'aquaculture-training'). Auto-generated if blank.",
    )
    title_en = models.CharField(max_length=255, verbose_name="Category Title (English)")
    description_en = models.TextField(blank=True, default="", verbose_name="Description (English)")

    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Category Title (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Description (සිංහල)")

    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Category Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Description (தமிழ்)")

    icon_type = models.CharField(
        max_length=30,
        choices=CATEGORY_ICON_CHOICES,
        default="graduation-cap",
        help_text="Visual icon for category tab / header",
    )
    order = models.PositiveIntegerField(default=1, help_text="Sort order sequence")
    is_active = models.BooleanField(default=True, help_text="Display category on live website")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "02. Local Training Category"
        verbose_name_plural = "02. Local Training Categories"

    def save(self, *args, **kwargs):
        if not self.category_id or not str(self.category_id).strip():
            base = slugify(self.title_en) if self.title_en else f"cat-{uuid4().hex[:6]}"
            slug = base
            count = 1
            while LocalTrainingCategory.objects.filter(category_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.category_id = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.category_id})"


# ==========================================================
# 03. Local Training Programmes & Course Files (Multilingual)
# ==========================================================
class LocalTrainingProgramme(TimeStampedModel):
    category = models.ForeignKey(
        LocalTrainingCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="programmes",
        verbose_name="Training Category",
        help_text="Select training category section",
    )
    order = models.PositiveIntegerField(default=1, help_text="Display priority sequence")
    slug = models.SlugField(max_length=150, unique=True, blank=True, help_text="Unique identifier slug")
    year = models.IntegerField(default=2026, help_text="Academic / Programme Year")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="Open")
    featured = models.BooleanField(default=False, help_text="Check to display in top 'Featured Opportunities' section")
    is_active = models.BooleanField(default=True, help_text="Display on live website")

    # Topic / Sub-heading Grouping (Multilingual)
    subheading_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Topic / Sub-heading (English)",
        help_text="Topic grouping inside category (e.g. 'Spoken English & Communication', 'Nautical Safety')",
    )
    subheading_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Topic / Sub-heading (සිංහල)",
    )
    subheading_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Topic / Sub-heading (தமிழ்)",
    )

    # 🇬🇧 English Content
    title_en = models.CharField(max_length=255, verbose_name="Course Title (English)")
    provider_en = models.CharField(max_length=255, blank=True, default="Ministry of Fisheries", verbose_name="Training Provider / Institute (English)")
    description_en = models.TextField(blank=True, default="", verbose_name="Course Description (English)")
    category_label_en = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label Override (English)")

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Course Title (සිංහල)")
    provider_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Training Provider (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Course Description (සිංහල)")
    category_label_si = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label Override (සිංහල)")

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Course Title (தமிழ்)")
    provider_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Training Provider (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Course Description (தமிழ்)")
    category_label_ta = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label Override (தமிழ்)")

    # Dates & Metadata
    published_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-01-15'")
    application_deadline = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-03-31'")

    # Media & Multilingual File Uploads
    image = models.ImageField(upload_to=local_training_upload_path, blank=True, null=True, help_text="Upload banner image")
    image_fallback = models.CharField(max_length=255, blank=True, default="/images/services/local-training.jpg", help_text="Default static image path")
    
    document_file_en = models.FileField(upload_to=local_training_upload_path, blank=True, null=True, verbose_name="Official Application / File (English)")
    document_file_si = models.FileField(upload_to=local_training_upload_path, blank=True, null=True, verbose_name="Official Application / File (සිංහල)")
    document_file_ta = models.FileField(upload_to=local_training_upload_path, blank=True, null=True, verbose_name="Official Application / File (தமிழ்)")
    
    file_url = models.CharField(max_length=500, blank=True, default="", help_text="Direct link or external URL")
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    file_size = models.CharField(max_length=50, blank=True, default="", help_text="Auto-calculated from uploaded file (e.g. '794 KB'), or enter manually")

    def save(self, *args, **kwargs):
        # 1. Auto-generate slug if missing or empty
        if not self.slug or not str(self.slug).strip():
            base = slugify(self.title_en) if self.title_en else f"prog-{uuid4().hex[:6]}"
            slug = base
            count = 1
            while LocalTrainingProgramme.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.slug = slug

        # 2. Auto-calculate file size & file type from uploaded document file if uploaded
        doc_file = self.document_file_en or self.document_file_si or self.document_file_ta
        if doc_file:
            try:
                if hasattr(doc_file, "size") and doc_file.size:
                    calc_size = format_file_size(doc_file.size)
                    if calc_size:
                        self.file_size = calc_size
            except Exception:
                pass

            try:
                file_name = getattr(doc_file, "name", "")
                if file_name:
                    ext = Path(file_name).suffix.lower()
                    type_map = {
                        ".pdf": "PDF",
                        ".doc": "DOCX",
                        ".docx": "DOCX",
                        ".xls": "XLSX",
                        ".xlsx": "XLSX",
                        ".zip": "ZIP",
                        ".rar": "ZIP",
                        ".jpg": "JPG",
                        ".jpeg": "JPG",
                        ".png": "PNG",
                    }
                    if ext in type_map:
                        self.file_type = type_map[ext]
            except Exception:
                pass

        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-year", "order", "-id"]
        verbose_name = "03. Local Training Programme & Course File"
        verbose_name_plural = "03. Local Training Programmes & Course Files"

    def __str__(self) -> str:
        return f"[{self.year}] {self.title_en} ({self.status})"
