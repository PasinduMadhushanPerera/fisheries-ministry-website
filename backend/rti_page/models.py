import uuid
from django.db import models
from django.utils.text import slugify
from common.models import TimeStampedModel

# ==========================================================
# Choice Definitions
# ==========================================================
OFFICER_TYPE_CHOICES = [
    ("Designated Officer", "Designated Officer (තොරතුරු නිලධාරී / நியமிக்கப்பட்ட அதிகாரி)"),
    ("Information Officer", "Information Officer (තොරතුරු ලබාදෙන නිලධාරී / தகவல் அதிகாரி)"),
]

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document (.pdf)"),
    ("XLSX", "Excel Spreadsheet (.xlsx)"),
    ("XLS", "Excel 97-2003 (.xls)"),
    ("CSV", "CSV Data File (.csv)"),
    ("DOCX", "Word Document (.docx)"),
    ("DOC", "Word Document (.doc)"),
    ("PPTX", "PowerPoint Presentation (.pptx)"),
    ("ZIP", "Compressed Archive (.zip)"),
]

CATEGORY_ICON_CHOICES = [
    ("forms", "RTI Forms & Requests (FileCheck)"),
    ("biannual-reports", "Biannual & Statutory Reports (FolderSearch)"),
    ("decisions-policies", "Decisions & Policies (ShieldCheck)"),
    ("budget", "Budget & Financial Disclosures (DollarSign)"),
    ("projects", "Projects & Progress Reports (Briefcase)"),
    ("procurement", "Procurement & Tenders (FileCode)"),
    ("other-reports", "General Reports (FolderOpen)"),
    ("document", "Standard Document (FileText)"),
    ("scale", "Legal / Legislation (Scale)"),
    ("building", "Institutional / Department (Building)"),
]


# ==========================================================
# 01. Designated & Information Officers
# ==========================================================
class RtiOfficer(TimeStampedModel):
    officer_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique officer key (e.g. 'designated-officer', 'information-officer'). Auto-generated if blank.",
    )
    officer_type = models.CharField(
        max_length=50,
        choices=OFFICER_TYPE_CHOICES,
        default="Information Officer",
        help_text="Role role type under the RTI Act",
    )

    # 🇬🇧 English Details
    name_en = models.CharField(
        max_length=255,
        default="",
        verbose_name="Officer Name (English)",
    )
    designation_en = models.CharField(
        max_length=255,
        default="",
        verbose_name="Designation (English)",
    )
    organization_en = models.CharField(
        max_length=255,
        default="Ministry of Fisheries, Aquatic and Ocean Resources",
        verbose_name="Organization / Ministry (English)",
    )

    # 🇱🇰 Sinhala Details (සිංහල)
    name_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Officer Name (සිංහල)",
    )
    designation_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Designation (සිංහල)",
    )
    organization_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය",
        verbose_name="Organization / Ministry (සිංහල)",
    )

    # 🇱🇰 Tamil Details (தமிழ்)
    name_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Officer Name (தமிழ்)",
    )
    designation_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Designation (தமிழ்)",
    )
    organization_ta = models.CharField(
        max_length=255,
        blank=True,
        default="கடற்றொழில், நீரியல் மற்றும் கடல் வளங்கள் அமைச்சு",
        verbose_name="Organization / Ministry (தமிழ்)",
    )

    # Contact Info
    telephone = models.CharField(
        max_length=100,
        default="",
        help_text="Official Telephone number(s) (e.g. '+94 112 327 060')",
    )
    fax = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Official Fax number (e.g. '+94 112 541 184')",
    )
    emails = models.TextField(
        default="",
        help_text="Official Email address(es), separated by commas (e.g. 'secfisherieslk@gmail.com, secretary@fisheries.gov.lk')",
    )

    # Portrait Image
    image = models.ImageField(
        upload_to="rti/officers/%Y/",
        blank=True,
        null=True,
        help_text="Official portrait photograph",
    )
    image_fallback = models.CharField(
        max_length=500,
        blank=True,
        default="/images/leadership/secretary.jpg",
        help_text="Fallback static image path",
    )
    image_alt_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Image Alt Text (English)",
    )

    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order sequence",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display officer on live RTI website",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "01. Designated & Information Officer"
        verbose_name_plural = "01. Designated & Information Officers"

    def save(self, *args, **kwargs):
        if not self.officer_id or not str(self.officer_id).strip():
            base = slugify(self.name_en) if self.name_en else f"officer-{uuid.uuid4().hex[:6]}"
            slug = base
            count = 1
            while RtiOfficer.objects.filter(officer_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.officer_id = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. [{self.officer_type}] {self.name_en}"


# ==========================================================
# 02. RTI Legislation & Regulations
# ==========================================================
class RtiLegalDocument(TimeStampedModel):
    document_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique key (e.g. 'rti-act-2016', 'rti-regulations'). Auto-generated if blank.",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="",
        verbose_name="Legislation / Rule Title (English)",
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
        verbose_name="Legislation / Rule Title (සිංහල)",
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
        verbose_name="Legislation / Rule Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Overview / Summary (தமிழ்)",
    )

    # File Format & Document
    file_type = models.CharField(
        max_length=20,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
        help_text="Document file format",
    )
    document_file = models.FileField(
        upload_to="rti/legal/%Y/",
        blank=True,
        null=True,
        help_text="Upload official PDF / Word copy of the Act or Gazette",
    )
    file_url_fallback = models.CharField(
        max_length=500,
        blank=True,
        default="#",
        help_text="External URL or static file fallback path",
    )
    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="120 KB",
        help_text="File size (e.g. '114 KB', '1.5 MB'). Auto-calculated on upload.",
    )

    published_date = models.DateField(
        null=True,
        blank=True,
        help_text="Official Enactment / Gazetted Date",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Formatted date text (e.g. '04 August 2016')",
    )

    order = models.PositiveIntegerField(
        default=1,
        help_text="Display priority sequence",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "02. RTI Legislation & Regulation"
        verbose_name_plural = "02. RTI Legislation & Regulations"

    def save(self, *args, **kwargs):
        if not self.document_id or not str(self.document_id).strip():
            base = slugify(self.title_en) if self.title_en else f"legal-{uuid.uuid4().hex[:6]}"
            slug = base
            count = 1
            while RtiLegalDocument.objects.filter(document_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.document_id = slug

        if not self.display_date and self.published_date:
            if hasattr(self.published_date, "strftime"):
                self.display_date = self.published_date.strftime("%d %B %Y")
            else:
                self.display_date = str(self.published_date)

        if self.document_file and (not self.file_size or self.file_size == "120 KB"):
            try:
                size_bytes = self.document_file.size
                if size_bytes < 1024 * 1024:
                    self.file_size = f"{round(size_bytes / 1024)} KB"
                else:
                    self.file_size = f"{round(size_bytes / (1024 * 1024), 1)} MB"
            except Exception:
                pass

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.file_type})"


# ==========================================================
# 03. RTI Information Categories (7 Core Sections)
# ==========================================================
class RtiCategory(TimeStampedModel):
    category_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique category identifier (e.g. 'forms', 'biannual-reports', 'decisions-policies'). Auto-generated if blank.",
    )

    # 🇬🇧 English
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

    # 🇱🇰 Sinhala (සිංහල)
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

    # 🇱🇰 Tamil (தமிழ்)
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
        max_length=30,
        choices=CATEGORY_ICON_CHOICES,
        default="document",
        help_text="Visual icon for accordion/pill",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Sort order sequence",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display category on live website",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "03. RTI Information Category"
        verbose_name_plural = "03. RTI Information Categories"

    def save(self, *args, **kwargs):
        if not self.category_id or not str(self.category_id).strip():
            base = slugify(self.title_en) if self.title_en else f"cat-{uuid.uuid4().hex[:6]}"
            slug = base
            count = 1
            while RtiCategory.objects.filter(category_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.category_id = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.category_id})"


# ==========================================================
# 04. RTI Documents, Forms & Proactive Disclosures
# ==========================================================
class RtiDocumentItem(TimeStampedModel):
    item_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique item slug (e.g. 'form-rti-01', 'biannual-2024'). Auto-generated if blank.",
    )
    category = models.ForeignKey(
        RtiCategory,
        on_delete=models.CASCADE,
        related_name="documents",
        help_text="Parent Information Category",
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

    # File Format & Upload
    file_type = models.CharField(
        max_length=20,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
        help_text="Document format",
    )
    document_file = models.FileField(
        upload_to="rti/documents/%Y/",
        blank=True,
        null=True,
        help_text="Upload official document file (PDF, Excel, Word, etc.)",
    )
    file_url_fallback = models.CharField(
        max_length=500,
        blank=True,
        default="#",
        help_text="Direct fallback link or external host URL",
    )
    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="150 KB",
        help_text="File size (e.g. '1.42 MB', '185 KB'). Auto-calculated on upload if empty.",
    )

    published_date = models.DateField(
        null=True,
        blank=True,
        help_text="Official publication / gazetted date",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Formatted date text (e.g. '01 January 2024')",
    )

    is_featured = models.BooleanField(
        default=False,
        help_text="Feature this document prominently",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order sequence",
    )

    class Meta:
        ordering = ["category__order", "order", "id"]
        verbose_name = "04. RTI Document / Form / Report"
        verbose_name_plural = "04. RTI Documents, Forms & Reports"

    def save(self, *args, **kwargs):
        if not self.item_id or not str(self.item_id).strip():
            base = slugify(self.title_en) if self.title_en else f"item-{uuid.uuid4().hex[:6]}"
            slug = base
            count = 1
            while RtiDocumentItem.objects.filter(item_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.item_id = slug

        if not self.display_date and self.published_date:
            if hasattr(self.published_date, "strftime"):
                self.display_date = self.published_date.strftime("%d %B %Y")
            else:
                self.display_date = str(self.published_date)

        if self.document_file and (not self.file_size or self.file_size == "150 KB"):
            try:
                size_bytes = self.document_file.size
                if size_bytes < 1024 * 1024:
                    self.file_size = f"{round(size_bytes / 1024)} KB"
                else:
                    self.file_size = f"{round(size_bytes / (1024 * 1024), 1)} MB"
            except Exception:
                pass

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"[{self.category.category_id}] {self.title_en} ({self.file_type})"
