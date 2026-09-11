from django.db import models
from common.models import TimeStampedModel

ICON_CHOICES = [
    ("UsersRound", "👥 Users Round (HR / Administration)"),
    ("Landmark", "🏛️ Landmark (Accounts / Finance)"),
    ("ClipboardCheck", "📋 Clipboard Check (Planning / Monitoring)"),
    ("Wrench", "🔧 Wrench (Technical Services)"),
    ("TrendingUp", "📈 Trending Up (Development / Growth)"),
    ("ShieldCheck", "🛡️ Shield Check (Internal Audit)"),
    ("HardHat", "👷 Hard Hat (Engineering / Infrastructure)"),
    ("ChartNoAxesCombined", "📊 Combined Chart (Statistics / Data)"),
    ("Building2", "🏢 Building 2 (General Division)"),
]


# ==========================================================
# 01. Divisions Page Header & Intro Settings (Multilingual)
# ==========================================================
class DivisionsPageIntro(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(max_length=100, default="Ministry Operations", verbose_name="Badge (English)")
    title_en = models.CharField(max_length=255, default="Divisions supporting Ministry operations", verbose_name="Title (English)")
    description_en = models.TextField(
        default="Select a division to learn more about its responsibilities and contribution to the work of the Ministry.",
        verbose_name="Description (English)"
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(max_length=100, blank=True, default="අමාත්‍යාංශ මෙහෙයුම්", verbose_name="Badge (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="අමාත්‍යාංශ මෙහෙයුම් සඳහා සහාය වන අංශ", verbose_name="Title (සිංහල)")
    description_si = models.TextField(
        blank=True,
        default="අමාත්‍යාංශයේ කාර්යභාරය සහ වගකීම් පිළිබඳ වැඩිදුර තොරතුරු දැනගැනීමට අදාළ අංශය තෝරන්න.",
        verbose_name="Description (සිංහල)"
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(max_length=100, blank=True, default="அமைச்சு நடவடிக்கைகள்", verbose_name="Badge (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="அமைச்சின் நடவடிக்கைகளுக்கு ஆதரவளிக்கும் பிரிவுகள்", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(
        blank=True,
        default="அமைச்சின் பொறுப்புகள் மற்றும் பங்களிப்புகள் பற்றி மேலும் அறிய ஒரு பிரிவைத் தேர்ந்தெடுக்கவும்.",
        verbose_name="Description (தமிழ்)"
    )

    class Meta:
        verbose_name = "01. Divisions Page Header & Intro"
        verbose_name_plural = "01. Divisions Page Header & Intro"

    def __str__(self) -> str:
        return f"Header: {self.title_en}"


# ==========================================================
# 02. Ministry Divisions Directory (Multilingual)
# ==========================================================
class MinistryDivision(TimeStampedModel):
    order = models.PositiveIntegerField(default=1)
    slug = models.SlugField(max_length=100, unique=True)
    icon_name = models.CharField(max_length=50, choices=ICON_CHOICES, default="UsersRound")

    # 🇬🇧 English
    title_en = models.CharField(max_length=255, default="", verbose_name="Title (English)")
    short_description_en = models.TextField(default="", verbose_name="Short Description (English)")
    full_description_en = models.TextField(default="", verbose_name="Full Description (English)")
    bullet_points_en = models.TextField(blank=True, default="", verbose_name="Bullet Points (English)")
    head_of_division_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Head of Division (English)")

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Title (සිංහල)")
    short_description_si = models.TextField(blank=True, default="", verbose_name="Short Description (සිංහල)")
    full_description_si = models.TextField(blank=True, default="", verbose_name="Full Description (සිංහල)")
    bullet_points_si = models.TextField(blank=True, default="", verbose_name="Bullet Points (සිංහල)")
    head_of_division_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Head of Division (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Title (தமிழ்)")
    short_description_ta = models.TextField(blank=True, default="", verbose_name="Short Description (தமிழ்)")
    full_description_ta = models.TextField(blank=True, default="", verbose_name="Full Description (தமிழ்)")
    bullet_points_ta = models.TextField(blank=True, default="", verbose_name="Bullet Points (தமிழ்)")
    head_of_division_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Head of Division (தமிழ்)")

    # Contact & Status
    contact_email = models.EmailField(blank=True, default="")
    contact_phone = models.CharField(max_length=100, blank=True, default="")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "02. Ministry Division"
        verbose_name_plural = "02. Ministry Divisions"

    def __str__(self) -> str:
        return f"{self.order:02d}. {self.title_en}"
