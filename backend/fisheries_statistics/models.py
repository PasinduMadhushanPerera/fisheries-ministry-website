from django.db import models
from common.models import TimeStampedModel


ICON_CHOICES = [
    ("TrendingUp", "TrendingUp (Fish Production / Growth)"),
    ("Anchor", "Anchor (Marine Fleet / Harbours)"),
    ("Ship", "Ship (Inland Vessels / Craft)"),
    ("Building2", "Building2 (Infrastructure / Anchorages)"),
    ("Users", "Users (Employment / Population)"),
    ("DollarSign", "DollarSign (Export / Revenue)"),
    ("ArrowLeftRight", "ArrowLeftRight (Trade / Export-Import)"),
    ("PackageCheck", "PackageCheck (Canned Fish / Processing)"),
    ("Activity", "Activity (Indicators / Performance)"),
    ("BarChart3", "BarChart3 (Statistics / Analytics)"),
]


# ==========================================================
# 01. Statistics Page Header & Badges
# ==========================================================
class FisheriesStatisticsHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Sectoral Statistics Directory",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Sectoral Performance & Operating Figures",
        verbose_name="Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Select any statistical category below to view detailed breakdown tables, vessel counts, and official sector indicators.",
        verbose_name="Description (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="ක්ෂේත්‍ර සංඛ්‍යාලේඛන නාමාවලිය",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="ක්ෂේත්‍ර කාර්යසාධනය සහ මෙහෙයුම් දත්ත",
        verbose_name="Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="සවිස්තරාත්මක සංඛ්‍යාලේඛන වගු, යාත්‍රා සංඛ්‍යාව සහ නිල ක්ෂේත්‍ර දර්ශක නැරඹීම සඳහා පහත ඕනෑම ප්‍රවර්ගයක් තෝරන්න.",
        verbose_name="Description (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="துறைசார் புள்ளிவிவர விபரம்",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="துறைசார் செயல்திறன் மற்றும் இயக்க புள்ளிவிவரங்கள்",
        verbose_name="Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="விரிவான புள்ளிவிவர அட்டவணைகள், படகுகளின் எண்ணிக்கை மற்றும் உத்தியோகபூர்வ துறைசார் குறிகாட்டிகளைப் பார்வையிட கீழே உள்ள வகைகளைத் தேர்ந்தெடுக்கவும்.",
        verbose_name="Description (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Page Title & Description"
        verbose_name_plural = "01. Page Title & Description"

    def __str__(self) -> str:
        return f"Statistics Page Header: {self.title_en}"


# ==========================================================
# 02. Top Summary Metric Cards
# ==========================================================
class FisheriesSummaryMetric(TimeStampedModel):
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display sequence order",
    )
    year = models.CharField(
        max_length=20,
        default="2024",
        help_text="Data year (e.g. '2024')",
    )
    value = models.CharField(
        max_length=100,
        default="410,000",
        help_text="Metric value (e.g. '410,000', '49,271', '$320.5M')",
    )
    icon_name = models.CharField(
        max_length=50,
        choices=ICON_CHOICES,
        default="TrendingUp",
        help_text="Card icon",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )

    # 🇬🇧 English
    title_en = models.CharField(
        max_length=150,
        verbose_name="Metric Title (English)",
    )
    unit_en = models.CharField(
        max_length=100,
        default="Metric tonnes",
        verbose_name="Unit / Subtitle (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(
        max_length=150,
        blank=True,
        default="",
        verbose_name="Metric Title (සිංහල)",
    )
    unit_si = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Unit / Subtitle (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(
        max_length=150,
        blank=True,
        default="",
        verbose_name="Metric Title (தமிழ்)",
    )
    unit_ta = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Unit / Subtitle (தமிழ்)",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "02. Summary Metric Card"
        verbose_name_plural = "02. Summary Metric Cards"

    def __str__(self) -> str:
        return f"{self.title_en}: {self.value} {self.unit_en}"


# ==========================================================
# 03. Statistical Categories (Accordion Sections)
# ==========================================================
class StatisticsCategory(TimeStampedModel):
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display sequence order",
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        help_text="🔒 Auto-generated unique identifier slug (Created automatically from category title upon saving)",
    )
    icon_name = models.CharField(
        max_length=50,
        choices=ICON_CHOICES,
        default="TrendingUp",
        help_text="Category icon",
    )
    is_default_open = models.BooleanField(
        default=False,
        help_text="Open this accordion section by default on page load",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )

    # 🇬🇧 English
    title_en = models.CharField(
        max_length=255,
        verbose_name="Category Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="",
        verbose_name="Category Overview / Description (English)",
    )
    caption_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Table Caption / Dateline (English)",
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
        verbose_name="Category Overview (සිංහල)",
    )
    caption_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Table Caption (සිංහල)",
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
        verbose_name="Category Overview (தமிழ்)",
    )
    caption_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Table Caption (தமிழ்)",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "03. Statistical Category & Table"
        verbose_name_plural = "03. Statistical Categories & Tables"

    def save(self, *args, **kwargs):
        # Auto-generate unique slug if empty or format properly
        if not self.slug or not str(self.slug).strip():
            from django.utils.text import slugify
            from uuid import uuid4
            base_slug = slugify(self.title_en) if (self.title_en and self.title_en.strip()) else (
                slugify(self.title_si) if (self.title_si and self.title_si.strip()) else (
                    slugify(self.title_ta) if (self.title_ta and self.title_ta.strip()) else "stat-category"
                )
            )
            if not base_slug:
                base_slug = "stat-category"
            base_slug = base_slug[:200].rstrip('-')
            candidate_slug = base_slug
            while StatisticsCategory.objects.filter(slug=candidate_slug).exclude(pk=self.pk).exists():
                candidate_slug = f"{base_slug}-{uuid4().hex[:6]}"
            self.slug = candidate_slug
        else:
            from django.utils.text import slugify
            clean_slug = slugify(self.slug)
            if clean_slug:
                self.slug = clean_slug[:255].rstrip('-')
            else:
                self.slug = str(self.slug)[:255]

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.title_en} ({self.rows.count()} rows)"


# ==========================================================
# 04. Table Rows (Children of Statistical Categories)
# ==========================================================
class StatisticsTableRow(TimeStampedModel):
    category = models.ForeignKey(
        StatisticsCategory,
        on_delete=models.CASCADE,
        related_name="rows",
        verbose_name="Statistical Category",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Row priority sequence",
    )
    value = models.CharField(
        max_length=100,
        default="0",
        help_text="Value or quantity (e.g. '308,430', '25', '1,780.5')",
    )
    unit = models.CharField(
        max_length=50,
        blank=True,
        default="",
        help_text="Measurement unit (e.g. 'Mt', 'Nos', 'USD ($)', 'Rs')",
    )
    is_emphasized = models.BooleanField(
        default=False,
        help_text="Highlight as bold total row with emerald styling",
        verbose_name="Is Total / Highlighted Row",
    )

    # 🇬🇧 English
    label_en = models.CharField(
        max_length=255,
        verbose_name="Row Label (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    label_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Row Label (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    label_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Row Label (தமிழ்)",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Table Row"
        verbose_name_plural = "Table Rows"

    def __str__(self) -> str:
        return f"{self.label_en}: {self.value} {self.unit}"
