from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def foreign_training_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"foreign_training/{timezone.now():%Y/%m}/{safe_filename}"


CATEGORY_CHOICES = [
    ("scholarships", "🎓 Scholarships & Fellowships"),
    ("technical-seminars", "🔬 Technical Seminars & Workshops"),
    ("oceanography", "🌊 Oceanography & Marine Science"),
    ("high-seas", "🚢 High-Seas Fisheries & VMS"),
    ("blue-economy", "💎 Blue Economy & Governance"),
    ("other", "📌 Other Bilateral Opportunities"),
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
# 02. Foreign Training Programmes & Fellowships (Multilingual)
# ==========================================================
class ForeignTrainingProgramme(TimeStampedModel):
    order = models.PositiveIntegerField(default=1, help_text="Display priority sequence")
    slug = models.SlugField(max_length=150, unique=True, help_text="Unique identifier slug (e.g. jica-fisheries-fellowship-2026)")
    year = models.IntegerField(default=2026, help_text="Academic / Programme Year (e.g. 2026, 2025, 2024)")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="scholarships")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="Open")
    featured = models.BooleanField(default=False, help_text="Check to display in top 'Featured Overseas Fellowships' section")
    is_active = models.BooleanField(default=True, help_text="Display on live website")

    # Host Country (Multilingual)
    country_en = models.CharField(max_length=100, default="Japan", verbose_name="Host Country (English)")
    country_si = models.CharField(max_length=100, blank=True, default="ජපානය", verbose_name="Host Country (සිංහල)")
    country_ta = models.CharField(max_length=100, blank=True, default="ஜப்பான்", verbose_name="Host Country (தமிழ்)")

    # 🇬🇧 English Content
    title_en = models.CharField(max_length=255, verbose_name="Programme Title (English)")
    institution_en = models.CharField(max_length=255, verbose_name="Host Institution / Donor Agency (English)")
    description_en = models.TextField(verbose_name="Programme Description (English)")
    category_label_en = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (English)")

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Programme Title (සිංහල)")
    institution_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Host Institution (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Programme Description (සිංහල)")
    category_label_si = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (සිංහල)")

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Programme Title (தமிழ்)")
    institution_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Host Institution (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Programme Description (தமிழ்)")
    category_label_ta = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (தமிழ்)")

    # Dates & Metadata
    published_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-01-10'")
    application_deadline = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-04-15'")

    # Media & Downloads
    image = models.ImageField(upload_to=foreign_training_upload_path, blank=True, null=True, help_text="Upload 16:9 banner image")
    image_fallback = models.CharField(max_length=255, blank=True, default="/images/services/foreign-training.jpg", help_text="Default static image path")
    document_file = models.FileField(upload_to=foreign_training_upload_path, blank=True, null=True, help_text="Upload PDF / DOCX application / prospectus")
    file_url = models.CharField(max_length=500, blank=True, default="#", help_text="Direct link or external donor URL")
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    file_size = models.CharField(max_length=50, default="1.4 MB", help_text="e.g. '1.4 MB' or '920 KB'")

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
        verbose_name = "02. Foreign Training Programme"
        verbose_name_plural = "02. Foreign Training Programmes"

    def __str__(self) -> str:
        return f"[{self.year}] [{self.country_en}] {self.title_en} ({self.status})"
