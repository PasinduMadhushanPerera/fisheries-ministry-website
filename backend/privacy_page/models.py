from django.db import models
from common.models import TimeStampedModel


class PrivacyPageSettings(TimeStampedModel):
    """
    Singleton model for global Privacy & Data Protection Page configuration,
    hero banner, callout texts, and data protection desk contact details.
    """
    # Hero Section - English
    badge_text_en = models.CharField(
        max_length=150,
        default="Data Protection",
        verbose_name="Badge Text (English)",
    )
    hero_title_en = models.CharField(
        max_length=255,
        default="Privacy & Data",
        verbose_name="Hero Title (English)",
    )
    hero_highlight_en = models.CharField(
        max_length=255,
        default="Protection Policy",
        verbose_name="Hero Highlight Title (English)",
    )
    hero_description_en = models.TextField(
        default="The Ministry is committed to protecting personal information, maintaining public trust, and safeguarding privacy when delivering digital information and government services.",
        verbose_name="Hero Description (English)",
    )
    pill_text1_en = models.CharField(
        max_length=150,
        default="Secure Government Data",
        verbose_name="Pill Text 1 (English)",
    )
    pill_text2_en = models.CharField(
        max_length=150,
        default="Government of Sri Lanka",
        verbose_name="Pill Text 2 (English)",
    )

    # Hero Card - English
    card_eyebrow_en = models.CharField(
        max_length=150,
        default="Privacy Guarantee",
        verbose_name="Card Eyebrow (English)",
    )
    card_title_en = models.CharField(
        max_length=255,
        default="Responsible Data Handling",
        verbose_name="Card Title (English)",
    )
    card_description_en = models.TextField(
        default="This policy explains how personal information is collected, used, shared, retained and protected across all official Ministry web services.",
        verbose_name="Card Description (English)",
    )

    # Callout Banner - English
    callout_title_en = models.CharField(
        max_length=255,
        default="About this Privacy Policy",
        verbose_name="Callout Title (English)",
    )
    callout_text_en = models.TextField(
        default="This policy applies to all personal information collected through this website and Ministry-operated digital portals. Specific additional privacy notices may apply to specialized portal systems.",
        verbose_name="Callout Text (English)",
    )

    # Privacy Desk - English
    desk_badge_en = models.CharField(
        max_length=150,
        default="Privacy Assistance",
        verbose_name="Desk Badge (English)",
    )
    desk_title_en = models.CharField(
        max_length=255,
        default="10. Contact the Ministry",
        verbose_name="Desk Title (English)",
    )
    desk_description_en = models.TextField(
        default="For privacy inquiries, data access requests, or to report a data protection concern, please contact our team:",
        verbose_name="Desk Description (English)",
    )
    desk_office_name_en = models.CharField(
        max_length=255,
        default="Ministry Privacy Desk",
        verbose_name="Desk Office Name (English)",
    )
    contact_btn_text_en = models.CharField(
        max_length=150,
        default="Go to Contact Page",
        verbose_name="Contact Button Text (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=150,
        blank=True,
        default="දත්ත ආරක්ෂණය",
        verbose_name="Badge Text (සිංහල)",
    )
    hero_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="පුද්ගලිකත්ව සහ දත්ත",
        verbose_name="Hero Title (සිංහල)",
    )
    hero_highlight_si = models.CharField(
        max_length=255,
        blank=True,
        default="ආරක්ෂණ ප්‍රතිපත්තිය",
        verbose_name="Hero Highlight Title (සිංහල)",
    )
    hero_description_si = models.TextField(
        blank=True,
        default="ඩිජිටල් තොරතුරු සහ රාජ්‍ය සේවා සැපයීමේදී පුද්ගලික තොරතුරු සුරක්ෂිත කිරීම, මහජන විශ්වාසය තහවුරු කිරීම සහ පුද්ගලිකත්වය ආරක්ෂා කිරීම සඳහා අමාත්‍යාංශය කැපවී සිටී.",
        verbose_name="Hero Description (සිංහල)",
    )
    pill_text1_si = models.CharField(
        max_length=150,
        blank=True,
        default="සුරක්ෂිත රාජ්‍ය දත්ත",
        verbose_name="Pill Text 1 (සිංහල)",
    )
    pill_text2_si = models.CharField(
        max_length=150,
        blank=True,
        default="ශ්‍රී ලංකා රජය",
        verbose_name="Pill Text 2 (සිංහල)",
    )
    card_eyebrow_si = models.CharField(
        max_length=150,
        blank=True,
        default="පුද්ගලිකත්ව සහතිකය",
        verbose_name="Card Eyebrow (සිංහල)",
    )
    card_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="වගකීම් සහගත දත්ත හැසිරවීම",
        verbose_name="Card Title (සිංහල)",
    )
    card_description_si = models.TextField(
        blank=True,
        default="මෙම ප්‍රතිපත්තිය මඟින් අමාත්‍යාංශයේ සියලුම නිල වෙබ් සේවාවන් හරහා පුද්ගලික තොරතුරු රැස් කිරීම, භාවිතය, බෙදාගැනීම, රඳවා තබා ගැනීම සහ ආරක්ෂා කිරීම පිළිබඳව පැහැදිලි කරයි.",
        verbose_name="Card Description (සිංහල)",
    )
    callout_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="මෙම පුද්ගලිකත්ව ප්‍රතිපත්තිය පිළිබඳව",
        verbose_name="Callout Title (සිංහල)",
    )
    callout_text_si = models.TextField(
        blank=True,
        default="මෙම ප්‍රතිපත්තිය මෙම වෙබ් අඩවිය සහ අමාත්‍යාංශය මඟින් ක්‍රියාත්මක වන ඩිජිටල් ද්වාර හරහා රැස් කරනු ලබන සියලුම පුද්ගලික තොරතුරු සඳහා අදාළ වේ. විශේෂිත පද්ධති සඳහා අමතර පුද්ගලිකත්ව නිවේදන අදාළ විය හැක.",
        verbose_name="Callout Text (සිංහල)",
    )
    desk_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="පුද්ගලිකත්ව සහාය",
        verbose_name="Desk Badge (සිංහල)",
    )
    desk_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="10. අමාත්‍යාංශය අමතන්න",
        verbose_name="Desk Title (සිංහල)",
    )
    desk_description_si = models.TextField(
        blank=True,
        default="පුද්ගලිකත්ව විමසීම්, දත්ත ප්‍රවේශ ඉල්ලීම් හෝ දත්ත ආරක්ෂණ ගැටළු දැනුම් දීම සඳහා කරුණාකර අපගේ කණ්ඩායම අමතන්න:",
        verbose_name="Desk Description (සිංහල)",
    )
    desk_office_name_si = models.CharField(
        max_length=255,
        blank=True,
        default="අමාත්‍යාංශ පුද්ගලිකත්ව අංශය",
        verbose_name="Desk Office Name (සිංහල)",
    )
    contact_btn_text_si = models.CharField(
        max_length=150,
        blank=True,
        default="සම්බන්ධතා පිටුවට යන්න",
        verbose_name="Contact Button Text (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=150,
        blank=True,
        default="தரவுப் பாதுகாப்பு",
        verbose_name="Badge Text (தமிழ்)",
    )
    hero_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="தனியுரிமை மற்றும் தரவுப்",
        verbose_name="Hero Title (தமிழ்)",
    )
    hero_highlight_ta = models.CharField(
        max_length=255,
        blank=True,
        default="பாதுகாப்புக் கொள்கை",
        verbose_name="Hero Highlight Title (தமிழ்)",
    )
    hero_description_ta = models.TextField(
        blank=True,
        default="டிஜிட்டல் தகவல் மற்றும் அரசாங்க சேவைகளை வழங்கும்போது தனிப்பட்ட தகவல்களைப் பாதுகாப்பதற்கும், பொதுமக்களின் நம்பிக்கையைப் பேணுவதற்கும் அமைச்சகம் உறுதிபூண்டுள்ளது.",
        verbose_name="Hero Description (தமிழ்)",
    )
    pill_text1_ta = models.CharField(
        max_length=150,
        blank=True,
        default="பாதுகாப்பான அரச தரவு",
        verbose_name="Pill Text 1 (தமிழ்)",
    )
    pill_text2_ta = models.CharField(
        max_length=150,
        blank=True,
        default="இலங்கை அரசாங்கம்",
        verbose_name="Pill Text 2 (தமிழ்)",
    )
    card_eyebrow_ta = models.CharField(
        max_length=150,
        blank=True,
        default="தனியுரிமை உத்தரவாதம்",
        verbose_name="Card Eyebrow (தமிழ்)",
    )
    card_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="பொறுப்பான தரவு கையாளுதல்",
        verbose_name="Card Title (தமிழ்)",
    )
    card_description_ta = models.TextField(
        blank=True,
        default="இந்தக் கொள்கை அனைத்து உத்தியோகபூர்வ அமைச்சு இணைய சேவைகளிலும் தனிப்பட்ட தகவல்கள் எவ்வாறு சேகரிக்கப்படுகின்றன, பயன்படுத்தப்படுகின்றன மற்றும் பாதுகாக்கப்படுகின்றன என்பதை விளக்குகிறது.",
        verbose_name="Card Description (தமிழ்)",
    )
    callout_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="இந்த தனியுரிமைக் கொள்கை பற்றி",
        verbose_name="Callout Title (தமிழ்)",
    )
    callout_text_ta = models.TextField(
        blank=True,
        default="இந்த கொள்கை இந்த இணையதளம் மற்றும் அமைச்சினால் இயக்கப்படும் டிஜிட்டல் தளங்கள் ஊடாக சேகரிக்கப்படும் அனைத்து தனிப்பட்ட தகவல்களுக்கும் பொருந்தும்.",
        verbose_name="Callout Text (தமிழ்)",
    )
    desk_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="தனியுரிமை உதவி",
        verbose_name="Desk Badge (தமிழ்)",
    )
    desk_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="10. அமைச்சகைத் தொடர்பு கொள்ளவும்",
        verbose_name="Desk Title (தமிழ்)",
    )
    desk_description_ta = models.TextField(
        blank=True,
        default="தனியுரிமை விசாரணைகள், தரவு அணுகல் கோரிக்கைகள் அல்லது தரவு பாதுகாப்பு கவலைகளைப் புகாரளிக்க எங்களைத் தொடர்பு கொள்ளவும்:",
        verbose_name="Desk Description (தமிழ்)",
    )
    desk_office_name_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அமைச்சின் தனியுரிமைப் பிரிவு",
        verbose_name="Desk Office Name (தமிழ்)",
    )
    contact_btn_text_ta = models.CharField(
        max_length=150,
        blank=True,
        default="தொடர்புப் பக்கத்திற்குச் செல்லவும்",
        verbose_name="Contact Button Text (தமிழ்)",
    )

    # Global Contact Details
    desk_email = models.CharField(
        max_length=150,
        default="info@fisheries.gov.lk",
        verbose_name="Desk Email Address",
    )
    desk_phone = models.CharField(
        max_length=100,
        default="+94 112 327 060",
        verbose_name="Desk Telephone Number",
    )
    last_updated_date = models.CharField(
        max_length=100,
        default="October 2026",
        verbose_name="Last Updated Date Label",
    )

    class Meta:
        verbose_name = "Privacy Page Settings"
        verbose_name_plural = "Privacy Page Settings"

    def __str__(self):
        return "Privacy & Data Protection Page Configuration"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class PrivacySection(TimeStampedModel):
    """
    Sections of the Privacy Policy (e.g. Overview, Information Collected,
    Usage, Sharing, Security, Cookies, Retention, Rights, Changes, Contact).
    """
    section_key = models.CharField(
        max_length=50,
        unique=True,
        verbose_name="Section Key (Anchor ID)",
        help_text="Unique key matching HTML anchor, e.g. 'overview', 'information', 'usage', 'security', 'cookies', 'rights', 'contact'.",
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Display Order",
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="Is Active",
    )

    # 🇬🇧 English Content
    nav_label_en = models.CharField(
        max_length=150,
        default="",
        verbose_name="Navigation Label (English)",
        help_text="Short label shown in sidebar, e.g. '1. Overview'",
    )
    title_en = models.CharField(
        max_length=255,
        default="",
        verbose_name="Section Title (English)",
        help_text="Full heading, e.g. '1. Overview'",
    )
    content_en = models.TextField(
        blank=True,
        default="",
        verbose_name="Paragraph Content (English)",
    )
    items_json_en = models.JSONField(
        default=list,
        blank=True,
        verbose_name="Structured Cards / Bullet Items (English)",
        help_text='JSON array of items with title and description or string list. e.g. [{"title":"Personal Data", "description":"..."}]',
    )

    # 🇱🇰 Sinhala Content (සිංහල)
    nav_label_si = models.CharField(
        max_length=150,
        blank=True,
        default="",
        verbose_name="Navigation Label (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Section Title (සිංහල)",
    )
    content_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Paragraph Content (සිංහල)",
    )
    items_json_si = models.JSONField(
        default=list,
        blank=True,
        verbose_name="Structured Cards / Bullet Items (සිංහල)",
    )

    # 🇱🇰 Tamil Content (தமிழ்)
    nav_label_ta = models.CharField(
        max_length=150,
        blank=True,
        default="",
        verbose_name="Navigation Label (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Section Title (தமிழ்)",
    )
    content_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Paragraph Content (தமிழ்)",
    )
    items_json_ta = models.JSONField(
        default=list,
        blank=True,
        verbose_name="Structured Cards / Bullet Items (தமிழ்)",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Privacy Policy Section"
        verbose_name_plural = "Privacy Policy Sections"

    def __str__(self):
        return f"{self.order}. {self.title_en or self.section_key}"
