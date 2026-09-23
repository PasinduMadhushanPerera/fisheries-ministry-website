import uuid
from django.db import models
from django.utils.text import slugify
from common.models import TimeStampedModel

# ==========================================================
# Choice Definitions
# ==========================================================
FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document (.pdf)"),
    ("XLSX", "Excel Spreadsheet (.xlsx)"),
    ("XLS", "Excel 97-2003 (.xls)"),
    ("DOCX", "Word Document (.docx)"),
    ("DOC", "Word Document (.doc)"),
    ("CSV", "CSV Data Sheet (.csv)"),
    ("PPTX", "PowerPoint Presentation (.pptx)"),
    ("PPT", "PowerPoint 97-2003 (.ppt)"),
    ("ZIP", "Compressed Archive (.zip)"),
    ("PNG", "PNG Graphic (.png)"),
    ("JPG", "JPEG Image (.jpg)"),
]

LANGUAGE_CHOICES = [
    ("English", "English"),
    ("Sinhala", "Sinhala (සිංහල)"),
    ("Tamil", "Tamil (தமிழ்)"),
    ("Bilingual", "Bilingual (සිංහල / English)"),
    ("Trilingual", "Trilingual (සිංහල / தமிழ் / English)"),
]

CATEGORY_ICON_CHOICES = [
    ("project-disclosures", "Project Disclosures (ShieldCheck)"),
    ("sdg14", "SDG 14 Regional Symposium (Globe)"),
    ("hr-development", "HR Development Plan (Users)"),
    ("citizen-charter", "Citizen Charter (Award)"),
    ("policy-strategy", "Policy & Strategy (FileCode / Shield)"),
    ("performance-report", "Performance Report (BookOpen)"),
    ("mega-project-progress", "Mega Projects Progress (Building)"),
    ("progress-report", "Progress Report (Briefcase)"),
    ("physical-financial-progress", "Physical & Financial Progress (LineChart)"),
    ("annual-statistics", "Annual Statistics (FileSpreadsheet)"),
    ("action-plan", "Action Plan (Calendar)"),
    ("fishery-articles", "Fishery Related Articles (Layers)"),
    ("document", "Standard Document (FileText)"),
    ("folder", "General Folder (FolderOpen)"),
]


# ==========================================================
# 01. Download Categories (12 Core Document Categories)
# ==========================================================
class DownloadCategory(TimeStampedModel):
    category_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique category identifier (e.g. 'project-disclosures', 'citizen-charter'). Auto-generated if blank.",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="",
        verbose_name="Category Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="",
        verbose_name="Description (English)",
    )

    # 🇱🇰 Sinhala Details (සිංහල)
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Category Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Description (සිංහල)",
    )

    # 🇱🇰 Tamil Details (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Category Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Description (தமிழ்)",
    )

    icon_type = models.CharField(
        max_length=40,
        choices=CATEGORY_ICON_CHOICES,
        default="document",
        help_text="Visual icon for accordion header and category filter",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order sequence",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display category on live Downloads page",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "01. Download Category"
        verbose_name_plural = "01. Download Categories"

    def save(self, *args, **kwargs):
        if not self.category_id or not str(self.category_id).strip():
            base = slugify(self.title_en) if self.title_en else f"cat-{uuid.uuid4().hex[:6]}"
            slug = base
            count = 1
            while DownloadCategory.objects.filter(category_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.category_id = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.category_id})"


# ==========================================================
# 02. Download Document Items
# ==========================================================
class DownloadDocumentItem(TimeStampedModel):
    item_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique item identifier (e.g. 'project-escp-2025'). Auto-generated if blank.",
    )
    category = models.ForeignKey(
        DownloadCategory,
        on_delete=models.CASCADE,
        related_name="documents",
        help_text="Parent Download Category",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="",
        verbose_name="Document Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="",
        verbose_name="Overview / Summary (English)",
    )

    # 🇱🇰 Sinhala Details (සිංහල)
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Document Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Overview / Summary (සිංහල)",
    )

    # 🇱🇰 Tamil Details (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Document Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Overview / Summary (தமிழ்)",
    )

    year = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Reference Year (e.g. 2026, 2025, 2024)",
    )

    # File Format & Media
    file_type = models.CharField(
        max_length=20,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
        help_text="Document file format",
    )

    # 🇬🇧 English File Upload (Optional)
    document_file_en = models.FileField(
        upload_to="downloads/%Y/",
        blank=True,
        null=True,
        verbose_name="Official File (English)",
        help_text="Upload official English version of document (PDF, Word, Excel, PowerPoint, ZIP)",
    )

    # 🇱🇰 Sinhala File Upload (සිංහල - Optional)
    document_file_si = models.FileField(
        upload_to="downloads/%Y/",
        blank=True,
        null=True,
        verbose_name="Official File (සිංහල)",
        help_text="Upload official Sinhala version of document (PDF, Word, Excel, PowerPoint, ZIP)",
    )

    # 🇱🇰 Tamil File Upload (தமிழ் - Optional)
    document_file_ta = models.FileField(
        upload_to="downloads/%Y/",
        blank=True,
        null=True,
        verbose_name="Official File (தமிழ்)",
        help_text="Upload official Tamil version of document (PDF, Word, Excel, PowerPoint, ZIP)",
    )

    # Legacy / General File fallback
    document_file = models.FileField(
        upload_to="downloads/%Y/",
        blank=True,
        null=True,
        verbose_name="General / Default File",
        help_text="Upload general document file if language-specific files are not separate",
    )
    file_url_fallback = models.CharField(
        max_length=500,
        blank=True,
        default="#",
        help_text="Direct link or external download fallback URL",
    )
    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="500 KB",
        help_text="File size (e.g. '521 KB', '1.4 MB'). Auto-calculated on upload if empty.",
    )

    published_date = models.DateField(
        null=True,
        blank=True,
        help_text="Official publication date",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Formatted date text (e.g. '15 February 2025')",
    )

    language = models.CharField(
        max_length=50,
        choices=LANGUAGE_CHOICES,
        default="English",
        help_text="Document language version",
    )

    is_featured = models.BooleanField(
        default=False,
        help_text="Feature this document in the top 'Featured Publications' highlight banner",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live Downloads page",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order sequence",
    )

    class Meta:
        ordering = ["category__order", "order", "id"]
        verbose_name = "02. Download Document / File"
        verbose_name_plural = "02. Download Documents & Files"

    def get_file_for_lang(self, lang="en"):
        if lang == "si" and self.document_file_si:
            return self.document_file_si
        if lang == "ta" and self.document_file_ta:
            return self.document_file_ta
        if lang == "en" and self.document_file_en:
            return self.document_file_en
        # Fallbacks: try English -> Sinhala -> Tamil -> Default file
        return self.document_file_en or self.document_file_si or self.document_file_ta or self.document_file

    def save(self, *args, **kwargs):
        if not self.item_id or not str(self.item_id).strip():
            base = slugify(self.title_en) if self.title_en else f"doc-{uuid.uuid4().hex[:6]}"
            slug = base
            count = 1
            while DownloadDocumentItem.objects.filter(item_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.item_id = slug

        if not self.display_date and self.published_date:
            if hasattr(self.published_date, "strftime"):
                self.display_date = self.published_date.strftime("%d %B %Y")
            else:
                self.display_date = str(self.published_date)

        active_file = self.document_file_en or self.document_file_si or self.document_file_ta or self.document_file
        if active_file and (not self.file_size or self.file_size == "500 KB"):
            try:
                size_bytes = active_file.size
                if size_bytes < 1024 * 1024:
                    self.file_size = f"{round(size_bytes / 1024)} KB"
                else:
                    self.file_size = f"{round(size_bytes / (1024 * 1024), 1)} MB"
            except Exception:
                pass

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"[{self.category.category_id}] {self.title_en} ({self.file_type})"
