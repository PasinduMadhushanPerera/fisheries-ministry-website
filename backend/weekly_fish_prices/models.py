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
# 02. Weekly Price Report PDF Bulletins
# ==========================================================
class WeeklyPriceReport(TimeStampedModel):
    report_id = models.CharField(
        max_length=100,
        unique=True,
        help_text="Unique identifier (e.g. 'report-2026-june-w4')",
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
        verbose_name = "02. Weekly Price Report"
        verbose_name_plural = "02. Weekly Price Reports"

    def save(self, *args, **kwargs):
        # Auto-sync month_number from month name
        if self.month in MONTH_MAP:
            self.month_number = MONTH_MAP[self.month]

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

    def __str__(self) -> str:
        return f"{self.year} {self.month} Week {self.week} - {self.title_en}"
