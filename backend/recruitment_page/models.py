from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from common.models import TimeStampedModel


def recruitment_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"recruitment/{timezone.now():%Y/%m}/{safe_filename}"


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


CATEGORY_CHOICES = [
    ("technical", "🛠️ Technical & Extension"),
    ("administrative", "📑 Administrative & Management"),
    ("research", "🔬 Scientific Research"),
    ("inspection", "⚓ Inspection & Compliance"),
    ("other", "📌 Other Public Service Vacancies"),
]

STATUS_CHOICES = [
    ("Open", "🟢 Open for Applications"),
    ("Closing Soon", "🟡 Closing Soon"),
    ("Closed", "🔴 Applications Closed"),
]

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document"),
    ("DOCX", "Word Document (DOCX)"),
    ("XLSX", "Excel Spreadsheet (XLSX)"),
    ("ZIP", "ZIP Archive"),
]

CATEGORY_ICON_CHOICES = [
    ("briefcase", "Careers & Jobs (Briefcase)"),
    ("building", "Ministry & Departments (Building)"),
    ("file-text", "Gazette & Legal Notices (FileText)"),
    ("award", "Scientific & Research (Award)"),
    ("shield-check", "Inspection & Compliance (ShieldCheck)"),
    ("user-check", "Technical & Extension (UserCheck)"),
    ("document", "Standard Document (Document)"),
]


# ==========================================================
# 01. Recruitment Page Header & Intro (Multilingual)
# ==========================================================
class RecruitmentPageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(max_length=100, default="Join Our Dedicated Public Service", verbose_name="Badge (English)")
    title_en = models.CharField(max_length=255, default="Recruitment & Careers Portal", verbose_name="Title (English)")
    description_en = models.TextField(
        default="Explore official public service career opportunities, research scientist fellowships, marine inspector vacancies, and technical positions across the Ministry and statutory agencies.",
        verbose_name="Description (English)"
    )
    featured_badge_en = models.CharField(max_length=150, default="Featured Public Service Vacancies", verbose_name="Featured Section Badge (English)")
    catalogue_badge_en = models.CharField(max_length=150, default="Official Vacancies Catalogue", verbose_name="Library Section Badge (English)")
    library_title_en = models.CharField(max_length=255, default="Public Service Recruitment Library", verbose_name="Library Section Title (English)")

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(max_length=100, blank=True, default="අපගේ රාජ්‍ය සේවයට එක්වන්න", verbose_name="Badge (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="බඳවා ගැනීම් සහ වෘත්තීය ද්වාරය", verbose_name="Title (සිංහල)")
    description_si = models.TextField(
        blank=True,
        default="ධීවර අමාත්‍යාංශය සහ අනුබද්ධ ව්‍යවස්ථාපිත ආයතනවල නිල රාජ්‍ය සේවා වෘත්තීය අවස්ථා, පර්යේෂණ විද්‍යාඥ තනතුරු, සමුද්‍ර පරීක්ෂක පුරප්පාඩු සහ තාක්ෂණික තනතුරු ගවේෂණය කරන්න.",
        verbose_name="Description (සිංහල)"
    )
    featured_badge_si = models.CharField(max_length=150, blank=True, default="විශේෂ රාජ්‍ය සේවා පුරප්පාඩු", verbose_name="Featured Section Badge (සිංහල)")
    catalogue_badge_si = models.CharField(max_length=150, blank=True, default="නිල පුරප්පාඩු නාමාවලිය", verbose_name="Library Section Badge (සිංහල)")
    library_title_si = models.CharField(max_length=255, blank=True, default="රාජ්‍ය සේවා බඳවා ගැනීමේ එකතුව", verbose_name="Library Section Title (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(max_length=100, blank=True, default="எமது பொதுச் சேவையில் இணையுங்கள்", verbose_name="Badge (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="ஆட்சேர்ப்பு மற்றும் தொழில் வாய்ப்புகள் போர்டல்", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(
        blank=True,
        default="கடற்றொழில் அமைச்சு மற்றும் அதன் கீழ் உள்ள சட்டரீதியான நிறுவனங்களில் உத்தியோகபூர்வ பொது சேவை தொழில் வாய்ப்புகள், ஆராய்ச்சி விஞ்ஞானி பணியிடங்கள் மற்றும் கடல்சார் ஆய்வாளர் வெற்றிடங்கள்.",
        verbose_name="Description (தமிழ்)"
    )
    featured_badge_ta = models.CharField(max_length=150, blank=True, default="சிறப்பு பொது சேவை வெற்றிடங்கள்", verbose_name="Featured Section Badge (தமிழ்)")
    catalogue_badge_ta = models.CharField(max_length=150, blank=True, default="உத்தியோகபூர்வ வெற்றிடங்களின் பட்டியல்", verbose_name="Library Section Badge (தமிழ்)")
    library_title_ta = models.CharField(max_length=255, blank=True, default="பொது சேவை ஆட்சேர்ப்பு நூலகம்", verbose_name="Library Section Title (தமிழ்)")

    class Meta:
        verbose_name = "01. Recruitment Page Header & Section Titles"
        verbose_name_plural = "01. Recruitment Page Header & Section Titles"

    def __str__(self) -> str:
        return f"Header: {self.title_en}"


# ==========================================================
# 02. Recruitment Categories (Multilingual)
# ==========================================================
class RecruitmentCategory(TimeStampedModel):
    category_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique category identifier (e.g. 'gazette-notices', 'technical', 'administrative'). Auto-generated if blank.",
    )

    # 🇬🇧 English
    title_en = models.CharField(max_length=255, default="", verbose_name="Category Title (English)")
    description_en = models.TextField(blank=True, default="", verbose_name="Description (English)")

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Category Title (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Category Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Description (தமிழ்)")

    icon_type = models.CharField(
        max_length=30,
        choices=CATEGORY_ICON_CHOICES,
        default="briefcase",
        help_text="Visual icon for accordion",
    )
    order = models.PositiveIntegerField(default=1, help_text="Sort order sequence")
    is_active = models.BooleanField(default=True, help_text="Display category on live website")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "02. Recruitment Category"
        verbose_name_plural = "02. Recruitment Categories"

    def save(self, *args, **kwargs):
        if not self.category_id or not str(self.category_id).strip():
            base = slugify(self.title_en) if self.title_en else f"cat-{uuid4().hex[:6]}"
            slug = base
            count = 1
            while RecruitmentCategory.objects.filter(category_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.category_id = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.category_id})"


# ==========================================================
# 03. Career Vacancies & Job Notices (Multilingual)
# ==========================================================
class RecruitmentVacancyItem(TimeStampedModel):
    order = models.PositiveIntegerField(default=1, help_text="Display priority sequence")
    slug = models.SlugField(max_length=150, unique=True, blank=True, help_text="Unique identifier slug (auto-generated if left blank)")
    ref_number = models.CharField(max_length=100, blank=True, default="", verbose_name="Gazette / Notice Ref No (e.g. MOF/REC/2026/01)")
    year = models.IntegerField(default=2026, help_text="Recruitment Year (e.g. 2026, 2025, 2024)")
    category_ref = models.ForeignKey(
        RecruitmentCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="vacancies",
        verbose_name="Parent Category",
    )
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, blank=True, default="technical")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="Open")
    featured = models.BooleanField(default=False, help_text="Check to display in top 'Featured Vacancies' section")
    is_active = models.BooleanField(default=True, help_text="Display on live website")

    # 🇬🇧 English Content
    title_en = models.CharField(max_length=255, verbose_name="Position Title (English)")
    subheading_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Sub-heading / Department Group (English e.g. 'NARA Research Division')")
    institution_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Institution / Agency (English)")
    department_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Division / Directorate (English)")
    description_en = models.TextField(blank=True, default="", verbose_name="Job Summary & Role Overview (English)")
    category_label_en = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (English)")
    qualifications_en = models.TextField(blank=True, default="", verbose_name="Qualifications & Criteria (English - One per line)")
    salary_scale_en = models.CharField(max_length=200, blank=True, default="", verbose_name="Salary Scale (English)")
    age_limit_en = models.CharField(max_length=150, blank=True, default="", verbose_name="Age Limit (English)")
    doc_button_label_en = models.CharField(max_length=255, blank=True, default="Document can be downloaded from here", verbose_name="Doc Download Label (English)")

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Position Title (සිංහල)")
    subheading_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Sub-heading / Department Group (සිංහල)")
    institution_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Institution (සිංහල)")
    department_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Division (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Job Summary (සිංහල)")
    category_label_si = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (සිංහල)")
    qualifications_si = models.TextField(blank=True, default="", verbose_name="Qualifications (සිංහල - එක් පේළියකට එකක්)")
    salary_scale_si = models.CharField(max_length=200, blank=True, default="", verbose_name="Salary Scale (සිංහල)")
    age_limit_si = models.CharField(max_length=150, blank=True, default="", verbose_name="Age Limit (සිංහල)")
    doc_button_label_si = models.CharField(max_length=255, blank=True, default="ලේඛනය මෙතැනින් බාගත හැකිය", verbose_name="Doc Download Label (සිංහල)")

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Position Title (தமிழ்)")
    subheading_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Sub-heading / Department Group (தமிழ்)")
    institution_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Institution (தமிழ்)")
    department_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Division (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Job Summary (தமிழ்)")
    category_label_ta = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (தமிழ்)")
    qualifications_ta = models.TextField(blank=True, default="", verbose_name="Qualifications (தமிழ் - ஒரு வரியில் ஒன்று)")
    salary_scale_ta = models.CharField(max_length=200, blank=True, default="", verbose_name="Salary Scale (தமிழ்)")
    age_limit_ta = models.CharField(max_length=150, blank=True, default="", verbose_name="Age Limit (தமிழ்)")
    doc_button_label_ta = models.CharField(max_length=255, blank=True, default="ஆவணத்தை இங்கிருந்து பதிவிறக்கம் செய்யலாம்", verbose_name="Doc Download Label (தமிழ்)")

    # Dates & Metadata
    published_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-01-20'")
    closing_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-03-25'")

    # Primary Document & Downloads
    document_file_en = models.FileField(upload_to=recruitment_upload_path, blank=True, null=True, verbose_name="English Application / Gazette PDF")
    document_file_si = models.FileField(upload_to=recruitment_upload_path, blank=True, null=True, verbose_name="Sinhala Application / Gazette PDF")
    document_file_ta = models.FileField(upload_to=recruitment_upload_path, blank=True, null=True, verbose_name="Tamil Application / Gazette PDF")
    document_file = models.FileField(upload_to=recruitment_upload_path, blank=True, null=True, verbose_name="General Document File")

    file_url = models.CharField(max_length=500, blank=True, default="#", help_text="Direct link or external career portal URL")
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    file_size = models.CharField(max_length=50, blank=True, default="", help_text="Auto-calculated if blank, or enter e.g. '1.1 MB'")

    # Secondary Document
    second_document_label_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Secondary Doc Label (English e.g. 'Application Form')")
    second_document_label_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Secondary Doc Label (සිංහල)")
    second_document_label_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Secondary Doc Label (தமிழ்)")
    second_document_file = models.FileField(upload_to=recruitment_upload_path, blank=True, null=True)
    second_file_url = models.CharField(max_length=500, blank=True, default="")
    second_file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    second_file_size = models.CharField(max_length=50, blank=True, default="")

    def save(self, *args, **kwargs):
        if not self.slug or not str(self.slug).strip():
            base = slugify(self.title_en[:100]) if self.title_en else f"rec-{uuid4().hex[:6]}"
            slug = base
            count = 1
            while RecruitmentVacancyItem.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.slug = slug

        active_file = self.document_file_en or self.document_file_si or self.document_file_ta or self.document_file
        if active_file and (not self.file_size or not str(self.file_size).strip()):
            try:
                if hasattr(active_file, "size") and active_file.size:
                    calc_size = format_file_size(active_file.size)
                    if calc_size:
                        self.file_size = calc_size
            except Exception:
                pass

        if self.second_document_file and (not self.second_file_size or not str(self.second_file_size).strip()):
            try:
                if hasattr(self.second_document_file, "size") and self.second_document_file.size:
                    calc_size = format_file_size(self.second_document_file.size)
                    if calc_size:
                        self.second_file_size = calc_size
            except Exception:
                pass

        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-year", "order", "-id"]
        verbose_name = "03. Career Vacancy Item"
        verbose_name_plural = "03. Career Vacancy Items"

    def __str__(self) -> str:
        return f"[{self.ref_number or 'Notice'}] {self.title_en} ({self.status})"


# ==========================================================
# 04. Additional Vacancy Documents (Dynamic Inline)
# ==========================================================
class RecruitmentVacancyDocument(TimeStampedModel):
    vacancy = models.ForeignKey(
        RecruitmentVacancyItem,
        on_delete=models.CASCADE,
        related_name="additional_documents",
        verbose_name="Recruitment Vacancy"
    )
    order = models.PositiveIntegerField(default=1, help_text="Display priority order")

    label_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Doc Download Label (English e.g. 'Application Form' or 'Gazette Notice')")
    label_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Doc Download Label (සිංහල)")
    label_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Doc Download Label (தமிழ்)")

    document_file = models.FileField(upload_to=recruitment_upload_path, blank=True, null=True)
    file_url = models.CharField(max_length=500, blank=True, default="")
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    file_size = models.CharField(max_length=50, blank=True, default="")

    def save(self, *args, **kwargs):
        if self.document_file and (not self.file_size or not str(self.file_size).strip()):
            try:
                if hasattr(self.document_file, "size") and self.document_file.size:
                    calc_size = format_file_size(self.document_file.size)
                    if calc_size:
                        self.file_size = calc_size
            except Exception:
                pass
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "04. Additional Vacancy Document"
        verbose_name_plural = "04. Additional Vacancy Documents"

    def __str__(self) -> str:
        return f"Doc: {self.label_en or 'Document'} ({self.file_type})"
