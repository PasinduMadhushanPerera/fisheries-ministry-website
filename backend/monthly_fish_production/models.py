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
    ("XLSX", "Excel Spreadsheet (.xlsx)"),
    ("XLS", "Excel Spreadsheet (.xls)"),
    ("PDF", "PDF Document (.pdf)"),
    ("CSV", "Comma Separated Values (.csv)"),
]


# ==========================================================
# 01. Monthly Fish Production Page Header & Badges
# ==========================================================
class MonthlyFishProductionHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Sectoral Production Data",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Monthly Fish Production Statistics",
        verbose_name="Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Download official monthly fish production statistics compiled by the Ministry of Fisheries across marine, coastal, and inland sectors.",
        verbose_name="Description (English)",
    )
    featured_badge_en = models.CharField(
        max_length=100,
        blank=True,
        default="Featured Production Report",
        verbose_name="Featured Badge (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="ක්ෂේත්‍ර නිෂ්පාදන දත්ත",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="මාසික මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන",
        verbose_name="Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ධීවර අමාත්‍යාංශය විසින් සකස් කරන ලද සාගර, වෙරළබඩ සහ මිරිදිය අංශ ඔස්සේ නිල මාසික මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන මෙතැනින් බාගත කරගන්න.",
        verbose_name="Description (සිංහල)",
    )
    featured_badge_si = models.CharField(
        max_length=100,
        blank=True,
        default="විශේෂ නිෂ්පාදන වාර්තාව",
        verbose_name="Featured Badge (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="துறைசார் உற்பத்தி தரவு",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="மாதாந்த மீன் உற்பத்தி புள்ளிவிவரங்கள்",
        verbose_name="Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="கடற்றொழில் அமைச்சினால் தொகுக்கப்பட்ட கடல், கடலோர மற்றும் நன்னீர் துறைகளின் உத்தியோகபூர்வ மாதாந்த மீன் உற்பத்தி புள்ளிவிவரங்களைப் பதிவிறக்குங்கள்.",
        verbose_name="Description (தமிழ்)",
    )
    featured_badge_ta = models.CharField(
        max_length=100,
        blank=True,
        default="முக்கிய உற்பத்தி அறிக்கை",
        verbose_name="Featured Badge (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Page Title & Description"
        verbose_name_plural = "01. Page Title & Description"

    def __str__(self) -> str:
        return f"Monthly Fish Production Header: {self.title_en}"


# ==========================================================
# 02. Annual Categories / Year Accordion Headers
# ==========================================================
class MonthlyProductionYearCategory(TimeStampedModel):
    """
    Manages custom multilingual titles, descriptions, and badge labels for each
    annual fish production report accordion group (e.g. 2026, 2025).
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
        help_text="Group header title (e.g. '2026 Fish Production Reports'). Auto-filled if left blank.",
    )
    description_en = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (English)",
        help_text="Group subtitle (e.g. 'Official monthly sectoral production datasets compiled for 2026'). Auto-filled if left blank.",
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
        help_text="සිංහල මාතෘකාව (උදා: '2026 මත්ස්‍ය නිෂ්පාදන වාර්තා')",
    )
    description_si = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (සිංහල)",
        help_text="සිංහල විස්තරය (උදා: '2026 වසර සඳහා සකස් කරන ලද නිල මාසික ක්ෂේත්‍ර නිෂ්පාදන දත්ත වාර්තා')",
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
        help_text="தமிழ் தலைப்பு (எ.கா: '2026 மீன் உற்பத்தி அறிக்கைகள்')",
    )
    description_ta = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (தமிழ்)",
        help_text="தமிழ் விளக்கம் (எ.கா: '2026 ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ மாதாந்த துறைசார் உற்பத்தி தரவுத்தொகுப்புகள்')",
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
        verbose_name = "02. Annual Category / Year Header (වාර්ෂික ප්‍රවර්ග)"
        verbose_name_plural = "02. Annual Categories / Year Headers (වාර්ෂික ප්‍රවර්ග)"

    def save(self, *args, **kwargs):
        if not self.title_en:
            self.title_en = f"{self.year} Fish Production Reports"
        if not self.description_en:
            self.description_en = f"Official monthly sectoral production datasets compiled for {self.year}"

        if not self.title_si:
            self.title_si = f"{self.year} මත්ස්‍ය නිෂ්පාදන වාර්තා"
        if not self.description_si:
            self.description_si = f"{self.year} වසර සඳහා සකස් කරන ලද නිල මාසික ක්ෂේත්‍ර නිෂ්පාදන දත්ත වාර්තා"

        if not self.title_ta:
            self.title_ta = f"{self.year} மீன் உற்பத்தி அறிக்கைகள்"
        if not self.description_ta:
            self.description_ta = f"{self.year} ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ மாதாந்த துறைசார் உற்பத்தி தரவுத்தொகுப்புகள்"

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.year} ({self.title_si or self.title_en})"


# ==========================================================
# 03. Monthly Production Report Data Spreadsheets
# ==========================================================
class MonthlyProductionReport(TimeStampedModel):
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
        default="March",
        help_text="Reporting Month",
    )
    month_number = models.PositiveSmallIntegerField(
        default=3,
        help_text="Month integer (1 for Jan, 3 for Mar, 12 for Dec). Automatically synced from Month selection.",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="Monthly Fish Production Report",
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
        default="මාසික මත්ස්‍ය නිෂ්පාදන වාර්තාව",
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
        default="மாதாந்த மீன் உற்பத்தி அறிக்கை",
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
        default="XLSX",
        help_text="Spreadsheet or document format",
    )
    document_file = models.FileField(
        upload_to="monthly_production/files/%Y/%m/",
        blank=True,
        null=True,
        help_text="Upload official Excel (.xlsx, .xls) or PDF spreadsheet document",
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
        default="56 KB",
        help_text="Document file size (e.g. '56 KB', '1.4 MB'). Auto-calculated from file upload if empty.",
    )

    published_date = models.DateField(
        help_text="Official publication date",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Formatted date text (e.g. '31 March 2026')",
    )

    is_featured = models.BooleanField(
        default=False,
        help_text="Highlight as primary featured report banner at top of library",
        verbose_name="Featured Production Report",
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
        ordering = ["-is_featured", "-year", "-month_number", "order"]
        verbose_name = "03. Monthly Production Report"
        verbose_name_plural = "03. Monthly Production Reports"

    def save(self, *args, **kwargs):
        # Auto-sync month_number from month name
        if self.month in MONTH_MAP:
            self.month_number = MONTH_MAP[self.month]

        # Auto-generate report_id if empty
        if not self.report_id or not str(self.report_id).strip():
            from uuid import uuid4
            from django.utils.text import slugify
            month_slug = slugify(self.month) if self.month else "month"
            candidate_id = f"production-{self.year}-{month_slug}"
            while MonthlyProductionReport.objects.filter(report_id=candidate_id).exclude(pk=self.pk).exists():
                candidate_id = f"production-{self.year}-{month_slug}-{uuid4().hex[:4]}"
            self.report_id = candidate_id

        # Auto-format display date if empty
        if not self.display_date and self.published_date:
            self.display_date = self.published_date.strftime("%d %B %Y")

        # Auto-calculate file size if uploaded
        if self.document_file and (not self.file_size or self.file_size == "56 KB"):
            try:
                size_bytes = self.document_file.size
                if size_bytes < 1024 * 1024:
                    self.file_size = f"{round(size_bytes / 1024)} KB"
                else:
                    self.file_size = f"{round(size_bytes / (1024 * 1024), 1)} MB"
            except Exception:
                pass

        super().save(*args, **kwargs)

        # Ensure corresponding Year Category exists
        try:
            MonthlyProductionYearCategory.objects.get_or_create(year=self.year)
        except Exception:
            pass

    def __str__(self) -> str:
        return f"{self.year} {self.month} - {self.title_en}"
