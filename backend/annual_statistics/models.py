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
# 02. Annual Statistics Report Documents & Datasets
# ==========================================================
class AnnualStatisticsReport(TimeStampedModel):
    report_id = models.CharField(
        max_length=100,
        unique=True,
        help_text="Unique identifier (e.g. 'annual-bulletin-2024', 'indicators-dataset-2024')",
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
        verbose_name = "02. Annual Statistics Report"
        verbose_name_plural = "02. Annual Statistics Reports"

    def save(self, *args, **kwargs):
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

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.year} - {self.title_en} ({self.file_type})"
