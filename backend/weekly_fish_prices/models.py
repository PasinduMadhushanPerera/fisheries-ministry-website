import os
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

SINHALA_MONTH_MAP = {
    "January": "ජනවාරි",
    "February": "පෙබරවාරි",
    "March": "මාර්තු",
    "April": "අප්‍රේල්",
    "May": "මැයි",
    "June": "ජූනි",
    "July": "ජූලි",
    "August": "අගෝස්තු",
    "September": "සැප්තැම්බර්",
    "October": "ඔක්තෝබර්",
    "November": "නොවැම්බර්",
    "December": "දෙසැම්බර්",
}

TAMIL_MONTH_MAP = {
    "January": "ஜனவரி",
    "February": "பெப்ரவரி",
    "March": "மார்ச்",
    "April": "ஏப்ரல்",
    "May": "மே",
    "June": "ஜூன்",
    "July": "ஜூலை",
    "August": "ஆகஸ்ட்",
    "September": "செப்டம்பர்",
    "October": "அக்டோபர்",
    "November": "நவம்பர்",
    "December": "டிசம்பர்",
}


# ==========================================================
# 01. Weekly Fish Prices Page Header & Badges
# ==========================================================
class WeeklyFishPricesHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Official Market Intelligence",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Weekly Fish Price Reports",
        verbose_name="Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Browse and download official weekly retail and wholesale fish price intelligence reports across Sri Lanka's major fishery harbours and consumer markets.",
        verbose_name="Description (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="නිල වෙළඳපල බුද්ධි තොරතුරු",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="සතිපතා මත්ස්‍ය මිල වාර්තා",
        verbose_name="Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ශ්‍රී ලංකාවේ ප්‍රධාන ධීවර වරායන් සහ තොග/සිල්ලර වෙළඳපල ආශ්‍රිත නිල සතිපතා මත්ස්‍ය මිල වාර්තා මෙතැනින් බාගත කරගන්න.",
        verbose_name="Description (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="உத்தியோகபூர்வ சந்தை நுண்ணறிவு",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="வாராந்த மீன் விலை அறிக்கைகள்",
        verbose_name="Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="இலங்கையின் பிரதான மீன்பிடித் துறைமுகங்கள் மற்றும் சந்தைகளில் வாராந்த சில்லறை மற்றும் மொத்த மீன் விலை அறிக்கைகளைப் பதிவிறக்குங்கள்.",
        verbose_name="Description (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Page Title & Description"
        verbose_name_plural = "01. Page Title & Description"

    def __str__(self) -> str:
        return f"Weekly Fish Prices Header: {self.title_en}"


# ==========================================================
# 02. Monthly Categories / Group Headers
# ==========================================================
class WeeklyPriceMonthCategory(TimeStampedModel):
    """
    Manages custom multilingual titles, descriptions, and badge labels for each
    monthly report accordion group (e.g. September 2026, August 2026).
    """
    year = models.PositiveIntegerField(
        default=2026,
        help_text="Reporting Year (e.g. 2026, 2025)",
    )
    month = models.CharField(
        max_length=30,
        choices=MONTH_CHOICES,
        default="September",
        help_text="Reporting Month",
    )
    month_number = models.PositiveSmallIntegerField(
        default=9,
        help_text="Month integer (1 for Jan, 9 for Sep, 12 for Dec). Automatically synced.",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Title (English)",
        help_text="Group header title (e.g. 'September 2026'). Auto-filled if left blank.",
    )
    description_en = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (English)",
        help_text="Group subtitle (e.g. 'Weekly bulletins published during September 2026'). Auto-filled if left blank.",
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
        default="Reports",
        blank=True,
        verbose_name="Plural Badge (English)",
        help_text="e.g. 'Reports' for multiple items",
    )

    # 🇱🇰 Sinhala Details (සිංහල)
    title_si = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Title (සිංහල)",
        help_text="සිංහල මාතෘකාව (උදා: '2026 සැප්තැම්බර්')",
    )
    description_si = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (සිංහල)",
        help_text="සිංහල විස්තරය (උදා: '2026 සැප්තැම්බර් මාසය තුළ පළ කරන ලද සතිපතා මිල වාර්තා')",
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
        default="වාර්තා",
        blank=True,
        verbose_name="Plural Badge (සිංහල)",
        help_text="උදා: 'වාර්තා'",
    )

    # 🇱🇰 Tamil Details (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Title (தமிழ்)",
        help_text="தமிழ் தலைப்பு (எ.கா: 'செப்டம்பர் 2026')",
    )
    description_ta = models.CharField(
        max_length=255,
        default="",
        blank=True,
        verbose_name="Category Description (தமிழ்)",
        help_text="தமிழ் விளக்கம் (எ.கா: 'செப்டம்பர் 2026 இல் வெளியிடப்பட்ட வாராந்த விலை அறிக்கைகள்')",
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
        default="அறிக்கைகள்",
        blank=True,
        verbose_name="Plural Badge (தமிழ்)",
        help_text="எ.கா: 'அறிக்கைகள்'",
    )

    is_active = models.BooleanField(
        default=True,
        help_text="Display this monthly category section on live website",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Sort order",
    )

    class Meta:
        ordering = ["-year", "-month_number", "order"]
        unique_together = ("year", "month")
        verbose_name = "02. Monthly Category / Group Header (මාසික ප්‍රවර්ග)"
        verbose_name_plural = "02. Monthly Categories / Group Headers (මාසික ප්‍රවර්ග)"

    def save(self, *args, **kwargs):
        if self.month in MONTH_MAP:
            self.month_number = MONTH_MAP[self.month]

        si_month = SINHALA_MONTH_MAP.get(self.month, self.month)
        ta_month = TAMIL_MONTH_MAP.get(self.month, self.month)

        if not self.title_en:
            self.title_en = f"{self.month} {self.year}"
        if not self.description_en:
            self.description_en = f"Weekly bulletins published during {self.month} {self.year}"

        if not self.title_si:
            self.title_si = f"{self.year} {si_month}"
        if not self.description_si:
            self.description_si = f"{self.year} {si_month} මාසය තුළ පළ කරන ලද සතිපතා මිල වාර්තා"

        if not self.title_ta:
            self.title_ta = f"{ta_month} {self.year}"
        if not self.description_ta:
            self.description_ta = f"{ta_month} {self.year} இல் வெளியிடப்பட்ட வாராந்த விலை அறிக்கைகள்"

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.year} {self.month} ({self.title_si or self.title_en})"


# ==========================================================
# 03. Weekly Price Report PDF Bulletins
# ==========================================================
class WeeklyPriceReport(TimeStampedModel):
    report_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="🔒 Auto-generated unique report ID (Created automatically from year, month & week upon saving)",
    )
    year = models.PositiveIntegerField(
        default=2026,
        help_text="Reporting Year (e.g. 2026, 2025)",
    )
    month = models.CharField(
        max_length=30,
        choices=MONTH_CHOICES,
        default="June",
        help_text="Reporting Month",
    )
    month_number = models.PositiveSmallIntegerField(
        default=6,
        help_text="Month integer (1 for Jan, 6 for Jun, 12 for Dec). Automatically synced from Month selection.",
    )
    week = models.PositiveSmallIntegerField(
        default=1,
        help_text="Week number (1, 2, 3, 4, or 5)",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="Weekly Fish Price Report",
        verbose_name="Report Title (English)",
    )

    # 🇱🇰 Sinhala Details (සිංහල)
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="සතිපතා මත්ස්‍ය මිල වාර්තාව",
        verbose_name="Report Title (සිංහල)",
    )

    # 🇱🇰 Tamil Details (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="வாராந்த மீன் விலை அறிக்கை",
        verbose_name="Report Title (தமிழ்)",
    )

    published_date = models.DateField(
        help_text="Official publication date",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Formatted date text (e.g. '28 June 2026')",
    )

    # PDF Document
    pdf_file = models.FileField(
        upload_to="weekly_prices/pdfs/%Y/%m/",
        blank=True,
        null=True,
        help_text="Upload official PDF price report document",
    )
    pdf_url_fallback = models.CharField(
        max_length=500,
        blank=True,
        default="",
        help_text="Direct URL fallback if PDF is hosted externally or in static assets",
    )
    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="700 KB",
        help_text="Document file size (e.g. '726 KB', '1.2 MB'). Auto-calculated from file upload if empty.",
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
        ordering = ["-year", "-month_number", "-week", "order"]
        verbose_name = "03. Weekly Price Report"
        verbose_name_plural = "03. Weekly Price Reports"

    def save(self, *args, **kwargs):
        # Auto-sync month_number from month name
        if self.month in MONTH_MAP:
            self.month_number = MONTH_MAP[self.month]

        # Auto-generate report_id if empty
        if not self.report_id or not str(self.report_id).strip():
            from uuid import uuid4
            from django.utils.text import slugify
            month_slug = slugify(self.month) if self.month else "month"
            candidate_id = f"report-{self.year}-{month_slug}-w{self.week}"
            while WeeklyPriceReport.objects.filter(report_id=candidate_id).exclude(pk=self.pk).exists():
                candidate_id = f"report-{self.year}-{month_slug}-w{self.week}-{uuid4().hex[:4]}"
            self.report_id = candidate_id

        # Auto-format display date if empty
        if not self.display_date and self.published_date:
            self.display_date = self.published_date.strftime("%d %B %Y")

        # Auto-calculate file size if uploaded
        if self.pdf_file and (not self.file_size or self.file_size == "700 KB"):
            try:
                size_bytes = self.pdf_file.size
                if size_bytes < 1024 * 1024:
                    self.file_size = f"{round(size_bytes / 1024)} KB"
                else:
                    self.file_size = f"{round(size_bytes / (1024 * 1024), 1)} MB"
            except Exception:
                pass

        super().save(*args, **kwargs)

        # Ensure corresponding Monthly Category exists
        try:
            WeeklyPriceMonthCategory.objects.get_or_create(
                year=self.year,
                month=self.month,
            )
        except Exception:
            pass

    def __str__(self) -> str:
        return f"{self.year} {self.month} Week {self.week} - {self.title_en}"
