from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def recruitment_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"recruitment/{timezone.now():%Y/%m}/{safe_filename}"


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
    ("ZIP", "ZIP Archive"),
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
# 02. Career Vacancies & Job Notices (Multilingual)
# ==========================================================
class RecruitmentVacancyItem(TimeStampedModel):
    order = models.PositiveIntegerField(default=1, help_text="Display priority sequence")
    slug = models.SlugField(max_length=150, unique=True, help_text="Unique identifier slug (e.g. marine-fisheries-inspector-2026)")
    ref_number = models.CharField(max_length=100, verbose_name="Gazette / Notice Ref No (e.g. MOF/REC/2026/01)")
    year = models.IntegerField(default=2026, help_text="Recruitment Year (e.g. 2026, 2025, 2024)")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="technical")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="Open")
    featured = models.BooleanField(default=False, help_text="Check to display in top 'Featured Vacancies' section")
    is_active = models.BooleanField(default=True, help_text="Display on live website")

    # 🇬🇧 English Content
    title_en = models.CharField(max_length=255, verbose_name="Position Title (English)")
    institution_en = models.CharField(max_length=255, verbose_name="Institution / Agency (English)")
    department_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Division / Directorate (English)")
    description_en = models.TextField(verbose_name="Job Summary & Role Overview (English)")
    category_label_en = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (English)")
    qualifications_en = models.TextField(blank=True, default="", verbose_name="Qualifications & Criteria (English - One per line)")
    salary_scale_en = models.CharField(max_length=200, blank=True, default="", verbose_name="Salary Scale (English)")
    age_limit_en = models.CharField(max_length=150, blank=True, default="", verbose_name="Age Limit (English)")

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Position Title (සිංහල)")
    institution_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Institution (සිංහල)")
    department_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Division (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Job Summary (සිංහල)")
    category_label_si = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (සිංහල)")
    qualifications_si = models.TextField(blank=True, default="", verbose_name="Qualifications (සිංහල - එක් පේළියකට එකක්)")
    salary_scale_si = models.CharField(max_length=200, blank=True, default="", verbose_name="Salary Scale (සිංහල)")
    age_limit_si = models.CharField(max_length=150, blank=True, default="", verbose_name="Age Limit (සිංහල)")

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Position Title (தமிழ்)")
    institution_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Institution (தமிழ்)")
    department_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Division (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Job Summary (தமிழ்)")
    category_label_ta = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (தமிழ்)")
    qualifications_ta = models.TextField(blank=True, default="", verbose_name="Qualifications (தமிழ் - ஒரு வரியில் ஒன்று)")
    salary_scale_ta = models.CharField(max_length=200, blank=True, default="", verbose_name="Salary Scale (தமிழ்)")
    age_limit_ta = models.CharField(max_length=150, blank=True, default="", verbose_name="Age Limit (தமிழ்)")

    # Dates & Metadata
    published_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-01-20'")
    closing_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-03-25'")

    # Media & Downloads
    document_file = models.FileField(upload_to=recruitment_upload_path, blank=True, null=True, help_text="Upload PDF / DOCX Application Form / Gazette")
    file_url = models.CharField(max_length=500, blank=True, default="#", help_text="Direct link or external career portal URL")
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    file_size = models.CharField(max_length=50, default="1.1 MB", help_text="e.g. '1.1 MB' or '850 KB'")

    class Meta:
        ordering = ["-year", "order", "-id"]
        verbose_name = "02. Career Vacancy Item"
        verbose_name_plural = "02. Career Vacancy Items"

    def __str__(self) -> str:
        return f"[{self.ref_number}] {self.title_en} ({self.status})"
