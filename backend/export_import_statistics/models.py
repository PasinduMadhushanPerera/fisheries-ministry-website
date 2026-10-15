from django.db import models
from common.models import TimeStampedModel

MONTH_CHOICES = [
    ("January", "January (ජනවාරි / ஜனவரி)"),
    ("February", "February (පෙබරවාරි / பெப்ரவரி)"),
    ("March", "March (මාර්තු / மார்ச்)"),
    ("April", "April (අප්‍රේල් / ஏப்ரல்)"),
    ("May", "May (මැයි / மே)"),
    ("June", "June (ජූනි / ஜூன்)"),
    ("July", "July (ජූලි / ஜூலை)"),
    ("August", "August (අගෝස්තු / ஆகஸ்ட்)"),
    ("September", "September (සැප්තැම්බර් / செப்டம்பர்)"),
    ("October", "October (ඔක්තෝබර් / அக்டோபர்)"),
    ("November", "November (නොවැම්බර් / நவம்பர்)"),
    ("December", "December (දෙසැම්බර් / டிசம்பர்)"),
]

MONTH_MAP = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12,
}

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document (.pdf)"),
    ("XLSX", "Excel Spreadsheet (.xlsx)"),
    ("XLS", "Excel Spreadsheet (.xls)"),
    ("CSV", "Comma Separated Values (.csv)"),
    ("DOCX", "Word Document (.docx)"),
    ("ZIP", "Compressed ZIP Archive (.zip)"),
]

METRIC_ICON_CHOICES = [
    ("export-val", "Trending Up (Export Value)"),
    ("import-val", "Trending Down (Import Value)"),
    ("balance", "Scale Balance (Trade Surplus/Deficit)"),
    ("export-qty", "Cargo Ship (Export Volume)"),
    ("import-qty", "Freight Container (Import Volume)"),
    ("latest-month", "Calendar (Latest Release)"),
]


# ==========================================================
# 01. Export & Import Page Header & Badges
# ==========================================================
class ExportImportHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Trade & Commerce Statistics",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Export and Import of Fish and Fishery Products",
        verbose_name="Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Official monthly statistics on fish exports, imports, trade values, customs volume reconciliations, and balance of trade compiled by the Ministry of Fisheries.",
        verbose_name="Description (English)",
    )
    summary_heading_en = models.CharField(
        max_length=255,
        blank=True,
        default="Fisheries Trade Key Performance Highlights",
        verbose_name="Summary Heading (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="වෙළඳ සහ වාණිජ සංඛ්‍යාලේඛන",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="මත්ස්‍ය සහ ධීවර නිෂ්පාදන අපනයන සහ ආනයන දත්ත",
        verbose_name="Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ධීවර අමාත්‍යාංශය විසින් සකස් කරන ලද මත්ස්‍ය අපනයන, ආනයන, වෙළඳ වටිනාකම් සහ වෙළඳ ශේෂය පිළිබඳ නිල මාසික සංඛ්‍යාලේඛන.",
        verbose_name="Description (සිංහල)",
    )
    summary_heading_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර වෙළඳ ප්‍රධාන කාර්යසාධන විශේෂාංග",
        verbose_name="Summary Heading (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="வர்த்தகம் மற்றும் வணிக புள்ளிவிவரங்கள்",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="மீன் மற்றும் மீன்பிடிப் பொருட்களின் ஏற்றுமதி மற்றும் இறக்குமதி",
        verbose_name="Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="கடற்றொழில் அமைச்சினால் தொகுக்கப்பட்ட மீன் ஏற்றுமதி, இறக்குமதி, வர்த்தக மதிப்புகள் மற்றும் வர்த்தக சமநிலை பற்றிய உத்தியோகபூர்வ மாதாந்த புள்ளிவிவரங்கள்.",
        verbose_name="Description (தமிழ்)",
    )
    summary_heading_ta = models.CharField(
        max_length=255,
        blank=True,
        default="மீன்பிடி வர்த்தக முக்கிய செயல்திறன் சிறப்பம்சங்கள்",
        verbose_name="Summary Heading (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Page Title & Description"
        verbose_name_plural = "01. Page Title & Description"

    def __str__(self) -> str:
        return f"Export & Import Header: {self.title_en}"


# ==========================================================
# 02. Trade Summary Metrics (6 High-impact KPI Cards)
# ==========================================================
class ExportImportSummaryMetric(TimeStampedModel):
    metric_id = models.CharField(
        max_length=50,
        unique=True,
        help_text="Unique key (e.g. 'export-val', 'import-val', 'trade-balance', 'export-qty', 'import-qty', 'latest-month')",
    )

    # 🇬🇧 English
    title_en = models.CharField(
        max_length=100,
        default="Export Value",
        verbose_name="Title (English)",
    )
    value_en = models.CharField(
        max_length=50,
        default="LKR 78.4",
        verbose_name="Value (English)",
    )
    unit_en = models.CharField(
        max_length=50,
        default="Billion",
        verbose_name="Unit (English)",
    )
    period_en = models.CharField(
        max_length=100,
        default="2026 YTD",
        verbose_name="Period (English)",
    )
    trend_en = models.CharField(
        max_length=100,
        blank=True,
        default="+12.4% YoY",
        verbose_name="Trend Tag (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(
        max_length=100,
        blank=True,
        default="අපනයන වටිනාකම",
        verbose_name="Title (සිංහල)",
    )
    value_si = models.CharField(
        max_length=50,
        blank=True,
        default="රුපියල් බිලියන 78.4",
        verbose_name="Value (සිංහල)",
    )
    unit_si = models.CharField(
        max_length=50,
        blank=True,
        default="බිලියන",
        verbose_name="Unit (සිංහල)",
    )
    period_si = models.CharField(
        max_length=100,
        blank=True,
        default="2026 වසරේ මේ දක්වා",
        verbose_name="Period (සිංහල)",
    )
    trend_si = models.CharField(
        max_length=100,
        blank=True,
        default="+12.4% වාර්ෂික වර්ධනය",
        verbose_name="Trend Tag (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(
        max_length=100,
        blank=True,
        default="ஏற்றுமதி மதிப்பு",
        verbose_name="Title (தமிழ்)",
    )
    value_ta = models.CharField(
        max_length=50,
        blank=True,
        default="ரூ. 78.4 பில்லியன்",
        verbose_name="Value (தமிழ்)",
    )
    unit_ta = models.CharField(
        max_length=50,
        blank=True,
        default="பில்லியன்",
        verbose_name="Unit (தமிழ்)",
    )
    period_ta = models.CharField(
        max_length=100,
        blank=True,
        default="2026 இதுவரையான காலம்",
        verbose_name="Period (தமிழ்)",
    )
    trend_ta = models.CharField(
        max_length=100,
        blank=True,
        default="+12.4% வருடாந்த வளர்ச்சி",
        verbose_name="Trend Tag (தமிழ்)",
    )

    icon_type = models.CharField(
        max_length=30,
        choices=METRIC_ICON_CHOICES,
        default="export-val",
        help_text="Card visual theme and icon style",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order sequence",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display metric card on live website",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "02. Trade Summary Metric"
        verbose_name_plural = "02. Trade Summary Metrics"

    def __str__(self) -> str:
        return f"{self.title_en}: {self.value_en} {self.unit_en}"


# ==========================================================
# 03. Annual Categories / Year Accordion Headers
# ==========================================================
class ExportImportYearCategory(TimeStampedModel):
    """
    Manages custom multilingual titles, descriptions, and badge labels for each
    annual trade report accordion group (e.g. 2026, 2025).
    """
    year = models.PositiveIntegerField(
        unique=True,
        default=2026,
        help_text="Reporting Year (e.g. 2026, 2025)",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Title (English)",
        help_text="Group header title (e.g. '2026 Export & Import Trade Reports'). Auto-filled if left blank.",
    )
    description_en = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (English)",
        help_text="Group subtitle (e.g. 'Official monthly fish export and import customs trade datasets compiled for 2026'). Auto-filled if left blank.",
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
        default="Monthly Reports",
        blank=True,
        verbose_name="Plural Badge (English)",
        help_text="e.g. 'Monthly Reports' for multiple items",
    )

    # 🇱🇰 Sinhala Details (සිංහල)
    title_si = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Title (සිංහල)",
        help_text="සිංහල මාතෘකාව (උදා: '2026 මත්ස්‍ය අපනයන සහ ආනයන වෙළඳ වාර්තා')",
    )
    description_si = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (සිංහල)",
        help_text="සිංහල විස්තරය (උදා: '2026 වසර සඳහා සකස් කරන ලද නිල මාසික මත්ස්‍ය අපනයන සහ ආනයන රේගු වෙළඳ දත්ත වාර්තා')",
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
        default="මාසික වාර්තා",
        blank=True,
        verbose_name="Plural Badge (සිංහල)",
        help_text="උදා: 'මාසික වාර්තා'",
    )

    # 🇱🇰 Tamil Details (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Title (தமிழ்)",
        help_text="தமிழ் தலைப்பு (எ.கா: '2026 மீன் ஏற்றுமதி மற்றும் இறக்குமதி வர்த்தக அறிக்கைகள்')",
    )
    description_ta = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (தமிழ்)",
        help_text="தமிழ் விளக்கம் (எ.கா: '2026 ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ மாதாந்த மீன் ஏற்றுமதி மற்றும் இறக்குமதி சுங்க வர்த்தக தரவுத்தொகுப்புகள்')",
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
        default="மாதாந்த அறிக்கைகள்",
        blank=True,
        verbose_name="Plural Badge (தமிழ்)",
        help_text="எ.கா: 'மாதாந்த அறிக்கைகள்'",
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
        verbose_name = "03. Annual Category / Year Header (වාර්ෂික ප්‍රවර්ග)"
        verbose_name_plural = "03. Annual Categories / Year Headers (වාර්ෂික ප්‍රවර්ග)"

    def save(self, *args, **kwargs):
        if not self.title_en:
            self.title_en = f"{self.year} Export & Import Trade Reports"
        if not self.description_en:
            self.description_en = f"Official monthly fish export and import customs trade datasets compiled for {self.year}"
        if not self.title_si:
            self.title_si = f"{self.year} මත්ස්‍ය අපනයන සහ ආනයන වෙළඳ වාර්තා"
        if not self.description_si:
            self.description_si = f"{self.year} වසර සඳහා සකස් කරන ලද නිල මාසික මත්ස්‍ය අපනයන සහ ආනයන රේගු වෙළඳ දත්ත වාර්තා"
        if not self.title_ta:
            self.title_ta = f"{self.year} மீன் ஏற்றுமதி மற்றும் இறக்குமதி வர்த்தக அறிக்கைகள்"
        if not self.description_ta:
            self.description_ta = f"{self.year} ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ மாதாந்த மீன் ஏற்றுமதி மற்றும் இறக்குமதி சுங்க வர்த்தக தரவுத்தொகுப்புகள்"
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.year} - {self.title_en}"


# ==========================================================
# 04. Export / Import Monthly Reports & Spreadsheets
# ==========================================================
class ExportImportReport(TimeStampedModel):
    report_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="🔒 Auto-generated unique report ID (Created automatically from year & month upon saving)",
    )
    year = models.PositiveIntegerField(
        default=2026,
        help_text="Reporting Year (e.g. 2026, 2025)",
    )
    month = models.CharField(
        max_length=30,
        choices=MONTH_CHOICES,
        default="May",
        help_text="Reporting Month",
    )
    month_number = models.PositiveSmallIntegerField(
        default=5,
        help_text="Month integer (1 to 12). Auto-synced from Month selection.",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="Export and Import of Fish",
        verbose_name="Report Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Official monthly statistics on fish exports, imports and trade performance.",
        verbose_name="Overview / Summary (English)",
    )

    # 🇱🇰 Sinhala Details (සිංහල)
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="මත්ස්‍ය අපනයන සහ ආනයන වාර්තාව",
        verbose_name="Report Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="මත්ස්‍ය අපනයන, ආනයන සහ වෙළඳ කාර්යසාධනය පිළිබඳ නිල මාසික සංඛ්‍යාලේඛන.",
        verbose_name="Overview / Summary (සිංහල)",
    )

    # 🇱🇰 Tamil Details (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="மீன் ஏற்றுமதி மற்றும் இறக்குமதி அறிக்கை",
        verbose_name="Report Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="மீன் ஏற்றுமதி, இறக்குமதி மற்றும் வர்த்தக செயல்திறன் பற்றிய உத்தியோகபூர்வ மாதாந்த புள்ளிவிவரங்கள்.",
        verbose_name="Overview / Summary (தமிழ்)",
    )

    # Document File
    file_type = models.CharField(
        max_length=20,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
        help_text="Document or spreadsheet format",
    )
    document_file = models.FileField(
        upload_to="export_import/files/%Y/%m/",
        blank=True,
        null=True,
        help_text="Upload official PDF or Excel spreadsheet document",
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
        default="250 KB",
        help_text="Document file size (e.g. '258 KB', '1.2 MB'). Auto-calculated on upload if empty.",
    )

    published_date = models.DateField(
        help_text="Official publication date",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Formatted date text (e.g. '31 May 2026')",
    )

    is_active = models.BooleanField(
        default=True,
        help_text="Display report on live website",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Sort priority sequence",
    )

    class Meta:
        ordering = ["-year", "-month_number", "order"]
        verbose_name = "04. Export / Import Monthly Report"
        verbose_name_plural = "04. Export / Import Monthly Reports"

    def save(self, *args, **kwargs):
        # Auto-sync month_number from month name
        if self.month in MONTH_MAP:
            self.month_number = MONTH_MAP[self.month]

        # Auto-generate report_id if empty
        if not self.report_id or not str(self.report_id).strip():
            from uuid import uuid4
            from django.utils.text import slugify
            month_slug = slugify(self.month) if self.month else "month"
            candidate_id = f"trade-{self.year}-{month_slug}"
            while ExportImportReport.objects.filter(report_id=candidate_id).exclude(pk=self.pk).exists():
                candidate_id = f"trade-{self.year}-{month_slug}-{uuid4().hex[:4]}"
            self.report_id = candidate_id

        # Auto-format display date if empty
        if not self.display_date and self.published_date:
            self.display_date = self.published_date.strftime("%d %B %Y")

        # Auto-calculate file size if uploaded
        if self.document_file and (not self.file_size or self.file_size == "250 KB"):
            try:
                size_bytes = self.document_file.size
                if size_bytes < 1024 * 1024:
                    self.file_size = f"{round(size_bytes / 1024)} KB"
                else:
                    self.file_size = f"{round(size_bytes / (1024 * 1024), 1)} MB"
            except Exception:
                pass

        # Auto-ensure ExportImportYearCategory exists for this report's year
        if self.year:
            try:
                ExportImportYearCategory.objects.get_or_create(
                    year=self.year,
                    defaults={
                        "title_en": f"{self.year} Export & Import Trade Reports",
                        "title_si": f"{self.year} මත්ස්‍ය අපනයන සහ ආනයන වෙළඳ වාර්තා",
                        "title_ta": f"{self.year} மீன் ஏற்றுமதி மற்றும் இறக்குமதி வர்த்தக அறிக்கைகள்",
                        "description_en": f"Official monthly fish export and import customs trade datasets compiled for {self.year}",
                        "description_si": f"{self.year} වසර සඳහා සකස් කරන ලද නිල මාසික මත්ස්‍ය අපනයන සහ ආනයන රේගු වෙළඳ දත්ත වාර්තා",
                        "description_ta": f"{self.year} ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ மாதாந்த மீன் ஏற்றுமதி மற்றும் இறக்குமதி சுங்க வர்த்தக தரவுத்தொகுப்புகள்",
                        "badge_singular_en": "Report",
                        "badge_plural_en": "Monthly Reports",
                        "badge_singular_si": "වාර්තාව",
                        "badge_plural_si": "මාසික වාර්තා",
                        "badge_singular_ta": "அறிக்கை",
                        "badge_plural_ta": "மாதாந்த அறிக்கைகள்",
                    }
                )
            except Exception:
                pass

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.year} {self.month} - {self.title_en}"
