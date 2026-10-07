from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from common.models import TimeStampedModel


def foreign_training_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"foreign_training/{timezone.now():%Y/%m}/{safe_filename}"


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
    ("globe", "🌐 Globe / International Partnerships"),
    ("graduation-cap", "🎓 Graduation Cap / Scholarships"),
    ("anchor", "⚓ Anchor / Maritime & High-Seas"),
    ("fish", "🐟 Fish / Sustainable Fisheries"),
    ("award", "🏆 Award / Fellowships & Grants"),
    ("briefcase", "💼 Briefcase / Governance & Policy"),
    ("shield-check", "🛡️ Shield / Safety & Compliance"),
    ("book-open", "📖 Book / Course Material"),
]

STATUS_CHOICES = [
    ("Open", "🟢 Open for Applications"),
    ("Closing Soon", "🟡 Closing Soon"),
    ("Upcoming", "🔵 Upcoming Intake"),
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
# 01. Foreign Training Page Header & Intro (Multilingual)
# ==========================================================
class ForeignTrainingPageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(max_length=100, default="International Partnerships & Fellowships", verbose_name="Badge (English)")
    title_en = models.CharField(max_length=255, default="Foreign Training & Overseas Fellowships", verbose_name="Title (English)")
    description_en = models.TextField(
        default="Access international oceanography courses, overseas post-graduate scholarships, bilateral technical seminars, and global ocean science fellowships through Ministry partnerships.",
        verbose_name="Description (English)"
    )
    featured_badge_en = models.CharField(max_length=150, default="Featured Overseas Fellowships", verbose_name="Featured Section Badge (English)")
    catalogue_badge_en = models.CharField(max_length=150, default="Scholarship Catalogue", verbose_name="Library Section Badge (English)")
    library_title_en = models.CharField(max_length=255, default="Foreign Training & Fellowships Library", verbose_name="Library Section Title (English)")

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(max_length=100, blank=True, default="ජාත්‍යන්තර හවුල්කාරිත්ව සහ ශිෂ්‍යත්ව", verbose_name="Badge (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="විදේශීය පුහුණු සහ අධිශිෂ්‍යත්ව අවස්ථා", verbose_name="Title (සිංහල)")
    description_si = models.TextField(
        blank=True,
        default="අමාත්‍යාංශයේ ජාත්‍යන්තර හවුල්කාරිත්වයන් හරහා ජාත්‍යන්තර සාගර විද්‍යා පාඨමාලා, විදේශීය පශ්චාත් උපාධි ශිෂ්‍යත්ව, ද්විපාර්ශ්වික තාක්ෂණික සම්මන්ත්‍රණ සහ ගෝලීය සාගර පර්යේෂණ අවස්ථා.",
        verbose_name="Description (සිංහල)"
    )
    featured_badge_si = models.CharField(max_length=150, blank=True, default="විශේෂ විදේශීය අධිශිෂ්‍යත්ව", verbose_name="Featured Section Badge (සිංහල)")
    catalogue_badge_si = models.CharField(max_length=150, blank=True, default="ශිෂ්‍යත්ව නාමාවලිය", verbose_name="Library Section Badge (සිංහල)")
    library_title_si = models.CharField(max_length=255, blank=True, default="විදේශීය පුහුණු සහ අධිශිෂ්‍යත්ව එකතුව", verbose_name="Library Section Title (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(max_length=100, blank=True, default="சர்வதேச கூட்டாண்மைகள் மற்றும் புலமைப்பரிசில்கள்", verbose_name="Badge (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="வெளிநாட்டுப் பயிற்சி மற்றும் வெளிநாட்டு புலமைப்பரிசில்கள்", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(
        blank=True,
        default="அமைச்சின் சர்வதேச கூட்டாண்மைகள் ஊடாக சர்வதேச சமுத்திரவியல் படிப்புகள், வெளிநாட்டு புலமைப்பரிசில்கள், இருதரப்பு தொழினுட்ப கருத்தரங்குகள் மற்றும் உலகளாவிய கடல்சார் ஆய்வுகள்.",
        verbose_name="Description (தமிழ்)"
    )
    featured_badge_ta = models.CharField(max_length=150, blank=True, default="சிறப்பு வெளிநாட்டு புலமைப்பரிசில்கள்", verbose_name="Featured Section Badge (தமிழ்)")
    catalogue_badge_ta = models.CharField(max_length=150, blank=True, default="புலமைப்பரிசில் பட்டியல்", verbose_name="Library Section Badge (தமிழ்)")
    library_title_ta = models.CharField(max_length=255, blank=True, default="வெளிநாட்டுப் பயிற்சி மற்றும் புலமைப்பரிசில் நூலகம்", verbose_name="Library Section Title (தமிழ்)")

    class Meta:
        verbose_name = "01. Foreign Training Page Header & Section Titles"
        verbose_name_plural = "01. Foreign Training Page Header & Section Titles"

    def __str__(self) -> str:
        return f"Header: {self.title_en}"


# ==========================================================
# 02. Foreign Training Categories (Dynamic Sections)
# ==========================================================
class ForeignTrainingCategory(TimeStampedModel):
    category_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique identifier slug (e.g. 'scholarships', 'high-seas', 'blue-economy'). Auto-generated if blank.",
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
        default="globe",
        help_text="Visual icon for category tab / header",
    )
    order = models.PositiveIntegerField(default=1, help_text="Sort order sequence")
    is_active = models.BooleanField(default=True, help_text="Display category on live website")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "02. Foreign Training Category"
        verbose_name_plural = "02. Foreign Training Categories"

    def save(self, *args, **kwargs):
        if not self.category_id or not str(self.category_id).strip():
            base = slugify(self.title_en) if self.title_en else f"cat-{uuid4().hex[:6]}"
            slug = base
            count = 1
            while ForeignTrainingCategory.objects.filter(category_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.category_id = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.category_id})"


# ==========================================================
# 03. Foreign Training Programmes & Fellowships (Multilingual)
# ==========================================================
class ForeignTrainingProgramme(TimeStampedModel):
    category = models.ForeignKey(
        ForeignTrainingCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="programmes",
        verbose_name="Scholarship Category",
        help_text="Select scholarship category section",
    )
    order = models.PositiveIntegerField(default=1, help_text="Display priority sequence")
    slug = models.SlugField(max_length=150, unique=True, blank=True, help_text="Unique identifier slug (auto-generated if left blank)")
    year = models.IntegerField(default=2026, help_text="Academic / Programme Year (e.g. 2026, 2025, 2024)")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="Open")
    featured = models.BooleanField(default=False, help_text="Check to display in top 'Featured Overseas Fellowships' section")
    is_active = models.BooleanField(default=True, help_text="Display on live website")

    # Topic / Sub-heading Grouping (Multilingual)
    subheading_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Topic / Sub-heading (English)",
        help_text="Topic grouping inside category (e.g. 'Post-Graduate Fellowships', 'Satellite VMS & IUU')",
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

    # Host Country (Multilingual)
    country_en = models.CharField(max_length=100, blank=True, default="", verbose_name="Host Country (English)")
    country_si = models.CharField(max_length=100, blank=True, default="", verbose_name="Host Country (සිංහල)")
    country_ta = models.CharField(max_length=100, blank=True, default="", verbose_name="Host Country (தமிழ்)")

    # 🇬🇧 English Content
    title_en = models.CharField(max_length=255, verbose_name="Programme Title (English)")
    institution_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Host Institution / Donor Agency (English)")
    description_en = models.TextField(blank=True, default="", verbose_name="Programme Description (English)")
    category_label_en = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label Override (English)")

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Programme Title (සිංහල)")
    institution_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Host Institution (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Programme Description (සිංහල)")
    category_label_si = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label Override (සිංහල)")

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Programme Title (தமிழ்)")
    institution_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Host Institution (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Programme Description (தமிழ்)")
    category_label_ta = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label Override (தமிழ்)")

    # Dates & Metadata
    published_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-01-10'")
    application_deadline = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-04-15'")

    # Media & Multilingual File Uploads
    image = models.ImageField(upload_to=foreign_training_upload_path, blank=True, null=True, help_text="Upload 16:9 banner image")
    image_fallback = models.CharField(max_length=255, blank=True, default="/images/services/foreign-training.jpg", help_text="Default static image path")
    
    document_file = models.FileField(upload_to=foreign_training_upload_path, blank=True, null=True, help_text="Upload PDF / DOCX application / prospectus")
    document_file_en = models.FileField(upload_to=foreign_training_upload_path, blank=True, null=True, verbose_name="Official Application / Prospectus (English)")
    document_file_si = models.FileField(upload_to=foreign_training_upload_path, blank=True, null=True, verbose_name="Official Application / Prospectus (සිංහල)")
    document_file_ta = models.FileField(upload_to=foreign_training_upload_path, blank=True, null=True, verbose_name="Official Application / Prospectus (தமிழ்)")

    file_url = models.CharField(max_length=500, blank=True, default="#", help_text="Direct link or external donor URL")
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    file_size = models.CharField(max_length=50, blank=True, default="", help_text="Auto-calculated from uploaded document, or enter e.g. '1.4 MB'")

    def save(self, *args, **kwargs):
        # 1. Auto-generate slug if missing or empty
        if not self.slug or not str(self.slug).strip():
            base = slugify(self.title_en) if self.title_en else f"foreign-{uuid4().hex[:6]}"
            slug = base
            count = 1
            while ForeignTrainingProgramme.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.slug = slug

        # 2. Auto-calculate file size & file type from uploaded document file if uploaded
        doc_file = self.document_file_en or self.document_file_si or self.document_file_ta or self.document_file
        if doc_file:
            if not self.file_size or not str(self.file_size).strip():
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
        verbose_name = "03. Foreign Training Programme & Fellowship"
        verbose_name_plural = "03. Foreign Training Programmes & Fellowships"

    def __str__(self) -> str:
        return f"[{self.year}] [{self.country_en}] {self.title_en} ({self.status})"
