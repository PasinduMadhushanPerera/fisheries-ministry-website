from django.db import models
from common.models import TimeStampedModel

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document (.pdf)"),
    ("XLSX", "Excel Spreadsheet (.xlsx)"),
    ("XLS", "Excel Spreadsheet (.xls)"),
    ("DOCX", "Word Document (.docx)"),
    ("DOC", "Word Document (.doc)"),
    ("CSV", "Comma Separated Values (.csv)"),
    ("PPTX", "PowerPoint Presentation (.pptx)"),
    ("PPT", "PowerPoint Presentation (.ppt)"),
    ("ZIP", "Compressed ZIP Archive (.zip)"),
]


# ==========================================================
# 01. Annual Statistics Page Header & Badges
# ==========================================================
class AnnualStatisticsHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Official Statistical Archive",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Annual Statistics Reports & Datasets",
        verbose_name="Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Browse and download official annual fisheries statistical bulletins, comprehensive sector performance metrics, supporting spreadsheets, raw datasets, and executive presentations published by the Ministry.",
        verbose_name="Description (English)",
    )
    featured_badge_en = models.CharField(
        max_length=100,
        blank=True,
        default="Featured Annual Report",
        verbose_name="Featured Badge (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="නිල සංඛ්‍යාලේඛන ලේඛනාගාරය",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="වාර්ෂික සංඛ්‍යාලේඛන වාර්තා සහ දත්ත කට්ටල",
        verbose_name="Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ධීවර අමාත්‍යාංශය විසින් ප්‍රකාශයට පත් කරන ලද නිල වාර්ෂික ධීවර සංඛ්‍යාලේඛන ප්‍රකාශන, ක්ෂේත්‍ර කාර්යසාධන වාර්තා සහ දත්ත කට්ටල මෙතැනින් බාගත කරගන්න.",
        verbose_name="Description (සිංහල)",
    )
    featured_badge_si = models.CharField(
        max_length=100,
        blank=True,
        default="විශේෂ වාර්ෂික වාර්තාව",
        verbose_name="Featured Badge (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="உத்தியோகபூர்வ புள்ளிவிவரக் காப்பகம்",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="வருடாந்த புள்ளிவிவர அறிக்கைகள் மற்றும் தரவுத் தொகுப்புகள்",
        verbose_name="Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="கடற்றொழில் அமைச்சினால் வெளியிடப்பட்ட உத்தியோகபூர்வ வருடாந்த மீன்பிடி புள்ளிவிவர அறிக்கைகள் மற்றும் தரவுத்தொகுப்புகளைப் பதிவிறக்குங்கள்.",
        verbose_name="Description (தமிழ்)",
    )
    featured_badge_ta = models.CharField(
        max_length=100,
        blank=True,
        default="முக்கிய வருடாந்த அறிக்கை",
        verbose_name="Featured Badge (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Page Title & Description"
        verbose_name_plural = "01. Page Title & Description"

    def __str__(self) -> str:
        return f"Annual Statistics Header: {self.title_en}"



# ==========================================================
# 02. Annual Categories / Year Accordion Headers
# ==========================================================
class AnnualStatisticsYearCategory(TimeStampedModel):
    """
    Manages custom multilingual titles, descriptions, and badge labels for each
    annual fisheries statistics report accordion group (e.g. 2024, 2023).
    """
    year = models.PositiveIntegerField(
        unique=True,
        default=2024,
        help_text="Reporting Year (e.g. 2024, 2023)",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Title (English)",
        help_text="Group header title (e.g. '2024 Annual Statistics Reports & Datasets'). Auto-filled if left blank.",
    )
    description_en = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (English)",
        help_text="Group subtitle (e.g. 'Official annual statistical bulletins and sector publications compiled for 2024'). Auto-filled if left blank.",
    )
    badge_singular_en = models.CharField(
        max_length=50,
        default="Report",
        blank=True,
        verbose_name="Singular Badge (English)",
        help_text="e.g. 'Report' for 1 item",
    )
    badge_plural_en = models.CharField(
        max_length=50,
        default="Annual Reports",
        blank=True,
        verbose_name="Plural Badge (English)",
        help_text="e.g. 'Annual Reports' for multiple items",
    )

    # 🇱🇰 Sinhala Details (සිංහල)
    title_si = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Title (සිංහල)",
        help_text="සිංහල මාතෘකාව (උදා: '2024 වාර්ෂික සංඛ්‍යාලේඛන වාර්තා සහ දත්ත කට්ටල')",
    )
    description_si = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (සිංහල)",
        help_text="සිංහල විස්තරය (උදා: '2024 වසර සඳහා සකස් කරන ලද නිල වාර්ෂික සංඛ්‍යාලේඛන ප්‍රකාශන සහ ක්ෂේත්‍ර වාර්තා')",
    )
    badge_singular_si = models.CharField(
        max_length=50,
        default="වාර්තාව",
        blank=True,
        verbose_name="Singular Badge (සිංහල)",
        help_text="උදා: 'වාර්තාව'",
    )
    badge_plural_si = models.CharField(
        max_length=50,
        default="වාර්ෂික වාර්තා",
        blank=True,
        verbose_name="Plural Badge (සිංහල)",
        help_text="උදා: 'වාර්ෂික වාර්තා'",
    )

    # 🇱🇰 Tamil Details (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Title (தமிழ்)",
        help_text="தமிழ் தலைப்பு (எ.கா: '2024 வருடாந்த புள்ளிவிவர அறிக்கைகள் மற்றும் தரவுத் தொகுப்புகள்')",
    )
    description_ta = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (தமிழ்)",
        help_text="தமிழ் விளக்கம் (எ.கா: '2024 ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ வருடாந்த புள்ளிவிவர அறிக்கைகள் மற்றும் துறைசார் வெளியீடுகள்')",
    )
    badge_singular_ta = models.CharField(
        max_length=50,
        default="அறிக்கை",
        blank=True,
        verbose_name="Singular Badge (தமிழ்)",
        help_text="எ.கா: 'அறிக்கை'",
    )
    badge_plural_ta = models.CharField(
        max_length=50,
        default="வருடாந்த அறிக்கைகள்",
        blank=True,
        verbose_name="Plural Badge (தமிழ்)",
        help_text="எ.கா: 'வருடாந்த அறிக்கைகள்'",
    )

    is_active = models.BooleanField(
        default=True,
        help_text="Display this year category section on live website",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Sort order",
    )

    class Meta:
        ordering = ["-year", "order"]
        verbose_name = "02. Annual Category / Year Header (වාර්ෂික ප්‍රවර්ග)"
        verbose_name_plural = "02. Annual Categories / Year Headers (වාර්ෂික ප්‍රවර්ග)"

    def save(self, *args, **kwargs):
        if not self.title_en:
            self.title_en = f"{self.year} Annual Statistics Reports & Datasets"
        if not self.description_en:
            self.description_en = f"Official annual statistical bulletins and sector publications compiled for {self.year}"
        if not self.title_si:
            self.title_si = f"{self.year} වාර්ෂික සංඛ්‍යාලේඛන වාර්තා සහ දත්ත කට්ටල"
        if not self.description_si:
            self.description_si = f"{self.year} වසර සඳහා සකස් කරන ලද නිල වාර්ෂික සංඛ්‍යාලේඛන ප්‍රකාශන සහ ක්ෂේත්‍ර වාර්තා"
        if not self.title_ta:
            self.title_ta = f"{self.year} வருடாந்த புள்ளிவிவர அறிக்கைகள் மற்றும் தரவுத் தொகுப்புகள்"
        if not self.description_ta:
            self.description_ta = f"{self.year} ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ வருடாந்த புள்ளிவிவர அறிக்கைகள் மற்றும் துறைசார் வெளியீடுகள்"
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.year} - {self.title_en}"


# ==========================================================
# 03. Annual Statistics Report Documents & Datasets
# ==========================================================
class AnnualStatisticsReport(TimeStampedModel):
    report_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="🔒 Auto-generated unique report ID (Created automatically from year & title upon saving)",
    )
    year = models.PositiveIntegerField(
        default=2024,
        help_text="Reporting Year (e.g. 2024, 2023, 2022)",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="Annual Fisheries Statistical Bulletin",
        verbose_name="Report Title (English)",
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
        verbose_name="Report Title (සිංහල)",
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
        verbose_name="Report Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Overview / Summary (தமிழ்)",
    )

    # Document File
    file_type = models.CharField(
        max_length=20,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
        help_text="Document format",
    )
    document_file = models.FileField(
        upload_to="annual_statistics/files/%Y/",
        blank=True,
        null=True,
        help_text="Upload official PDF, Excel, Word, CSV, PowerPoint, or ZIP document",
    )
    file_url_fallback = models.CharField(
        max_length=500,
        blank=True,
        default="#",
        help_text="Direct URL fallback if document is hosted externally or static",
    )
    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="500 KB",
        help_text="Document file size (e.g. '548 KB', '18.5 MB'). Auto-calculated on upload if empty.",
    )
    languages_text = models.CharField(
        max_length=150,
        blank=True,
        default="English / Sinhala / Tamil",
        help_text="Language availability (e.g. 'English / Sinhala / Tamil', 'English')",
    )

    published_date = models.DateField(
        help_text="Official publication date",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Formatted date text (e.g. '30 June 2025')",
    )

    is_featured = models.BooleanField(
        default=False,
        help_text="Highlight as primary featured report banner at top of library",
        verbose_name="Featured Annual Report",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Sort priority sequence",
    )

    class Meta:
        ordering = ["-is_featured", "-year", "order", "id"]
        verbose_name = "03. Annual Statistics Report"
        verbose_name_plural = "03. Annual Statistics Reports"

    def save(self, *args, **kwargs):
        # Auto-generate report_id if empty
        if not self.report_id or not str(self.report_id).strip():
            from uuid import uuid4
            from django.utils.text import slugify
            title_slug = slugify(self.title_en) if self.title_en else "annual-report"
            candidate_id = f"annual-{self.year}-{title_slug[:30]}"
            while AnnualStatisticsReport.objects.filter(report_id=candidate_id).exclude(pk=self.pk).exists():
                candidate_id = f"annual-{self.year}-{uuid4().hex[:6]}"
            self.report_id = candidate_id

        # Auto-format display date if empty
        if not self.display_date and self.published_date:
            self.display_date = self.published_date.strftime("%d %B %Y")

        # Auto-calculate file size if uploaded
        if self.document_file and (not self.file_size or self.file_size == "500 KB"):
            try:
                size_bytes = self.document_file.size
                if size_bytes < 1024 * 1024:
                    self.file_size = f"{round(size_bytes / 1024)} KB"
                else:
                    self.file_size = f"{round(size_bytes / (1024 * 1024), 1)} MB"
            except Exception:
                pass

        # Auto-ensure AnnualStatisticsYearCategory exists for this report's year
        if self.year:
            try:
                AnnualStatisticsYearCategory.objects.get_or_create(
                    year=self.year,
                    defaults={
                        "title_en": f"{self.year} Annual Statistics Reports & Datasets",
                        "title_si": f"{self.year} වාර්ෂික සංඛ්‍යාලේඛන වාර්තා සහ දත්ත කට්ටල",
                        "title_ta": f"{self.year} வருடாந்த புள்ளிவிவர அறிக்கைகள் மற்றும் தரவுத் தொகுப்புகள்",
                        "description_en": f"Official annual statistical bulletins and sector publications compiled for {self.year}",
                        "description_si": f"{self.year} වසර සඳහා සකස් කරන ලද නිල වාර්ෂික සංඛ්‍යාලේඛන ප්‍රකාශන සහ ක්ෂේත්‍ර වාර්තා",
                        "description_ta": f"{self.year} ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ வருடாந்த புள்ளிவிவர அறிக்கைகள் மற்றும் துறைசார் வெளியீடுகள்",
                        "badge_singular_en": "Report",
                        "badge_plural_en": "Annual Reports",
                        "badge_singular_si": "වාර්තාව",
                        "badge_plural_si": "වාර්ෂික වාර්තා",
                        "badge_singular_ta": "அறிக்கை",
                        "badge_plural_ta": "வருடாந்த அறிக்கைகள்",
                    }
                )
            except Exception:
                pass

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.year} - {self.title_en} ({self.file_type})"
