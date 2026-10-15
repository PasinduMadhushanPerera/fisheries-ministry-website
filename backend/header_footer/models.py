from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def header_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"header/{timezone.now():%Y/%m}/{safe_filename}"


# ==========================================================
# 01. Header Settings
# ==========================================================
class HeaderSetting(TimeStampedModel):
    """
    Manages common Header & Utility Bar elements across all website pages.
    """
    government_name = models.CharField(
        max_length=255,
        default="Democratic Socialist Republic of Sri Lanka",
        help_text="Top eyebrow text above ministry title in header",
    )
    ministry_name = models.CharField(
        max_length=255,
        default="Ministry of Fisheries, Aquatic and Ocean Resources",
        help_text="Primary Ministry title in header",
    )
    tagline = models.CharField(
        max_length=255,
        default="Sustainable fisheries, aquatic resources and public services",
        help_text="Sub-tagline under ministry title",
    )
    logo = models.ImageField(
        upload_to=header_upload_path,
        blank=True,
        null=True,
        help_text="Upload official Emblem / Ministry logo",
    )
    logo_url_fallback = models.CharField(
        max_length=255,
        blank=True,
        default="/images/government/logo.jpg",
        help_text="Default static logo path",
    )
    logo_alt = models.CharField(
        max_length=255,
        blank=True,
        default="Emblem of the Government of Sri Lanka",
    )
    hotline_phone = models.CharField(
        max_length=50,
        default="+94 112 327 060",
        help_text="Hotline phone displayed in top utility bar",
    )
    email = models.EmailField(
        default="info@fisheries.gov.lk",
        help_text="Official email displayed in top utility bar",
    )
    help_link_text = models.CharField(
        max_length=100,
        default="Get help & contact",
    )
    help_link_url = models.CharField(
        max_length=255,
        default="/contact",
    )
    gov_link_text = models.CharField(
        max_length=100,
        default="Gov.lk",
    )
    gov_link_url = models.CharField(
        max_length=255,
        default="https://www.gov.lk/",
    )
    search_placeholder = models.CharField(
        max_length=150,
        default="Search this website",
        help_text="Placeholder text in header search box",
    )
    enable_emergency_banner = models.BooleanField(
        default=False,
        help_text="Toggle emergency announcement bar across all pages",
    )
    emergency_banner_text = models.CharField(
        max_length=300,
        blank=True,
        help_text="Emergency announcement text",
    )
    emergency_banner_link = models.CharField(
        max_length=255,
        blank=True,
        help_text="Optional link for emergency notice",
    )

    class Meta:
        verbose_name = "01. Header Settings"
        verbose_name_plural = "01. Header Settings"

    def __str__(self) -> str:
        return "Header Settings"


# ==========================================================
# 02. Footer Settings
# ==========================================================
class FooterSetting(TimeStampedModel):
    """
    Manages common Footer elements across all website pages.
    """
    # Column 1: Ministry Branding
    government_badge = models.CharField(
        max_length=150,
        default="Government of Sri Lanka",
        verbose_name="Government Badge (English)",
        help_text="Small pill badge text in footer column 1",
    )
    government_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="ශ්‍රී ලංකා රජය",
        verbose_name="Government Badge (සිංහල)",
    )
    government_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="இலங்கை அரசாங்கம்",
        verbose_name="Government Badge (தமிழ்)",
    )

    ministry_name = models.CharField(
        max_length=255,
        default="Ministry of Fisheries, Aquatic and Ocean Resources",
        verbose_name="Ministry Name (English)",
    )
    ministry_name_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය",
        verbose_name="Ministry Name (සිංහල)",
    )
    ministry_name_ta = models.CharField(
        max_length=255,
        blank=True,
        default="கடற்றொழில், நீரியல் மற்றும் பெருங்கடல் வளங்கள் அமைச்சு",
        verbose_name="Ministry Name (தமிழ்)",
    )

    about_text = models.TextField(
        default="Providing public information, official announcements, downloadable forms, and institutional access for Sri Lanka's fisheries, aquaculture, and ocean resources sector.",
        verbose_name="About Text (English)",
    )
    about_text_si = models.TextField(
        blank=True,
        default="ශ්‍රී ලංකාවේ ධීවර, ජලජීවී වගා සහ සාගර සම්පත් ක්ෂේත්‍රය සඳහා පොදු තොරතුරු, නිල නිවේදන, බාගත හැකි ආකෘති පත්‍ර සහ ආයතනික ප්‍රවේශය සැපයීම.",
        verbose_name="About Text (සිංහල)",
    )
    about_text_ta = models.TextField(
        blank=True,
        default="இலங்கையின் கடற்றொழில், நீரியல் வளர்ப்பு மற்றும் பெருங்கடல் வளங்கள் துறைக்கான பொதுத் தகவல்கள், உத்தியோகபூர்வ அறிவிப்புகள், பதிவிறக்கம் செய்யக்கூடிய படிவங்கள் மற்றும் நிறுவன அணுகலை வழங்குதல்.",
        verbose_name="About Text (தமிழ்)",
    )

    gov_portal_label = models.CharField(
        max_length=100,
        default="Visit Sri Lanka Gov.lk",
        verbose_name="Gov Portal Button Label (English)",
    )
    gov_portal_label_si = models.CharField(
        max_length=100,
        blank=True,
        default="ශ්‍රී ලංකා Gov.lk වෙත පිවිසෙන්න",
        verbose_name="Gov Portal Button Label (සිංහල)",
    )
    gov_portal_label_ta = models.CharField(
        max_length=100,
        blank=True,
        default="இலங்கை Gov.lk போர்ட்டலுக்குச் செல்க",
        verbose_name="Gov Portal Button Label (தமிழ்)",
    )
    gov_portal_url = models.CharField(
        max_length=255,
        default="https://www.gov.lk/",
    )

    # Column Titles
    quick_links_title_en = models.CharField(
        max_length=100,
        blank=True,
        default="Quick Links",
        verbose_name="Column 2 Title (English)",
    )
    quick_links_title_si = models.CharField(
        max_length=100,
        blank=True,
        default="ක්ෂණික සබැඳි",
        verbose_name="Column 2 Title (සිංහල)",
    )
    quick_links_title_ta = models.CharField(
        max_length=100,
        blank=True,
        default="விரைவு இணைப்புகள்",
        verbose_name="Column 2 Title (தமிழ்)",
    )

    info_links_title_en = models.CharField(
        max_length=100,
        blank=True,
        default="Information & Portals",
        verbose_name="Column 3 Title (English)",
    )
    info_links_title_si = models.CharField(
        max_length=100,
        blank=True,
        default="තොරතුරු සහ ද්වාර",
        verbose_name="Column 3 Title (සිංහල)",
    )
    info_links_title_ta = models.CharField(
        max_length=100,
        blank=True,
        default="தகவல்கள் & போர்ட்டல்கள்",
        verbose_name="Column 3 Title (தமிழ்)",
    )

    contact_title_en = models.CharField(
        max_length=100,
        blank=True,
        default="Contact & Support",
        verbose_name="Column 4 Title (English)",
    )
    contact_title_si = models.CharField(
        max_length=100,
        blank=True,
        default="සම්බන්ධීකරණය සහ සහාය",
        verbose_name="Column 4 Title (සිංහල)",
    )
    contact_title_ta = models.CharField(
        max_length=100,
        blank=True,
        default="தொடர்பு & ஆதரவு",
        verbose_name="Column 4 Title (தமிழ்)",
    )

    awards_title_en = models.CharField(
        max_length=100,
        blank=True,
        default="Recognitions & Awards",
        verbose_name="Awards Section Title (English)",
    )
    awards_title_si = models.CharField(
        max_length=100,
        blank=True,
        default="ඇගයීම් සහ සම්මාන",
        verbose_name="Awards Section Title (සිංහල)",
    )
    awards_title_ta = models.CharField(
        max_length=100,
        blank=True,
        default="அங்கீகாரங்கள் & விருதுகள்",
        verbose_name="Awards Section Title (தமிழ்)",
    )

    # Column 4: Contact info
    hq_address = models.TextField(
        default="New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
        verbose_name="HQ Address (English)",
    )
    hq_address_si = models.TextField(
        blank=True,
        default="නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව",
        verbose_name="HQ Address (සිංහල)",
    )
    hq_address_ta = models.TextField(
        blank=True,
        default="புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை",
        verbose_name="HQ Address (தமிழ்)",
    )
    telephone = models.CharField(
        max_length=100,
        default="+94 112 327 060",
    )
    email = models.EmailField(
        default="info@fisheries.gov.lk",
    )

    # Bottom bar details
    copyright_text = models.CharField(
        max_length=255,
        default="Ministry of Fisheries, Aquatic and Ocean Resources. Official Government Website.",
        verbose_name="Copyright Statement (English)",
    )
    copyright_text_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය. නිල රාජ්‍ය වෙබ් අඩවිය.",
        verbose_name="Copyright Statement (සිංහල)",
    )
    copyright_text_ta = models.CharField(
        max_length=255,
        blank=True,
        default="கடற்றொழில், நீரியல் மற்றும் பெருங்கடல் வளங்கள் அமைச்சு. உத்தியோகபூர்வ அரசாங்க வலைத்தளம்.",
        verbose_name="Copyright Statement (தமிழ்)",
    )
    copyright_year = models.CharField(
        max_length=20,
        blank=True,
        default="2026",
        help_text="Custom copyright year string (e.g. '2026' or '2026-2027'). If left blank, current year will be used.",
    )
    developed_by_text = models.CharField(
        max_length=255,
        blank=True,
        default="Design & Developed by IT UNIT",
        verbose_name="Development Details / Credits (English)",
        help_text="Development details, designer/developer credits displayed on a separate line below the copyright text.",
    )
    developed_by_text_si = models.CharField(
        max_length=255,
        blank=True,
        default="තොරතුරු තාක්ෂණ ඒකකය (IT UNIT) මඟින් නිර්මාණය සහ සංවර්ධනය කරන ලදී",
        verbose_name="Development Details / Credits (සිංහල)",
    )
    developed_by_text_ta = models.CharField(
        max_length=255,
        blank=True,
        default="தகவல் தொழில்நுட்பப் பிரிவினால் (IT UNIT) வடிவமைக்கப்பட்டு உருவாக்கப்பட்டது",
        verbose_name="Development Details / Credits (தமிழ்)",
    )

    last_updated_text = models.CharField(
        max_length=100,
        default="25 August 2026",
        verbose_name="Last Updated Date (English)",
        help_text="Last updated date string displayed in footer bottom bar",
    )
    last_updated_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="2026 අගෝස්තු 25",
        verbose_name="Last Updated Date (සිංහල)",
    )
    last_updated_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="25 ஆகஸ்ட் 2026",
        verbose_name="Last Updated Date (தமிழ்)",
    )

    last_updated_prefix_en = models.CharField(
        max_length=50,
        blank=True,
        default="Last updated:",
        verbose_name="Last Updated Prefix (English)",
    )
    last_updated_prefix_si = models.CharField(
        max_length=50,
        blank=True,
        default="අවසන් වරට යාවත්කාලීන කළේ:",
        verbose_name="Last Updated Prefix (සිංහල)",
    )
    last_updated_prefix_ta = models.CharField(
        max_length=50,
        blank=True,
        default="கடைசியாக புதுப்பிக்கப்பட்டது:",
        verbose_name="Last Updated Prefix (தமிழ்)",
    )

    website_views_prefix_en = models.CharField(
        max_length=50,
        blank=True,
        default="Website Views:",
        verbose_name="Website Views Prefix (English)",
    )
    website_views_prefix_si = models.CharField(
        max_length=50,
        blank=True,
        default="වෙබ් අඩවි පිවිසුම්:",
        verbose_name="Website Views Prefix (සිංහල)",
    )
    website_views_prefix_ta = models.CharField(
        max_length=50,
        blank=True,
        default="தளப் பார்வைகள்:",
        verbose_name="Website Views Prefix (தமிழ்)",
    )

    # Social Media Links
    enable_social_media = models.BooleanField(
        default=True,
        help_text="Master toggle to show or hide all social media icons in footer",
    )
    facebook_url = models.URLField(
        max_length=500,
        blank=True,
        default="https://web.facebook.com/fisheries.gov.lk/",
        help_text="Official Facebook Page URL (Leave blank to hide Facebook icon)",
    )
    youtube_url = models.URLField(
        max_length=500,
        blank=True,
        default="https://www.youtube.com/@Ministry_of_Fisheries_SL",
        help_text="Official YouTube Channel URL (Leave blank to hide YouTube icon)",
    )
    linkedin_url = models.URLField(
        max_length=500,
        blank=True,
        default="https://www.linkedin.com/company/ministry-of-fisheries-and-ocean-resources/",
        help_text="Official LinkedIn Page URL (Leave blank to hide LinkedIn icon)",
    )
    twitter_url = models.URLField(
        max_length=500,
        blank=True,
        default="",
        help_text="Optional Official X (Twitter) Page URL (Leave blank to hide X icon)",
    )
    instagram_url = models.URLField(
        max_length=500,
        blank=True,
        default="",
        help_text="Optional Official Instagram Page URL (Leave blank to hide Instagram icon)",
    )

    class Meta:
        verbose_name = "02. Footer Settings"
        verbose_name_plural = "02. Footer Settings"

    def __str__(self) -> str:
        return "Footer Settings"


# ==========================================================
# 03. Footer Award Badges
# ==========================================================
def award_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"footer/awards/{timezone.now():%Y/%m}/{safe_filename}"


class FooterAward(TimeStampedModel):
    """
    Award badges, accolades, or certification logos displayed in footer.
    """
    title = models.CharField(
        max_length=255,
        help_text="Award / Accreditation Title (e.g. 'Best Government Website Award 2025')",
    )
    image = models.ImageField(
        upload_to=award_upload_path,
        help_text="Upload small award/badge image",
    )
    url = models.URLField(
        max_length=500,
        blank=True,
        default="",
        help_text="Optional link to award details or certificate page",
    )
    order = models.PositiveIntegerField(default=1, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "05. Footer Award Badge"
        verbose_name_plural = "05. Footer Award Badges"

    def __str__(self) -> str:
        return self.title


# ==========================================================
# 03. Footer Navigation Links
# ==========================================================
class FooterLink(TimeStampedModel):
    """
    Customizable navigation links rendered in the Footer columns.
    """
    COLUMN_CHOICES = [
        ("quick", "Column 2: Quick Links"),
        ("info", "Column 3: Information & Portals"),
        ("support", "Column 4: Contact & Support Links"),
        ("legal", "Bottom Bar: Legal & Privacy Links"),
    ]

    column = models.CharField(max_length=20, choices=COLUMN_CHOICES, default="quick")
    label = models.CharField(max_length=150, help_text="Link text (e.g. 'Downloads Centre')")
    label_si = models.CharField(max_length=150, blank=True, default="", verbose_name="Link Label (සිංහල)")
    label_ta = models.CharField(max_length=150, blank=True, default="", verbose_name="Link Label (தமிழ்)")
    url = models.CharField(max_length=255, help_text="Target URL (e.g. '/downloads' or 'https://...')")
    is_external = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=1, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["column", "order", "id"]
        verbose_name = "03. Footer Navigation Link"
        verbose_name_plural = "03. Footer Navigation Links"

    def __str__(self) -> str:
        return f"[{self.get_column_display()}] {self.order}. {self.label} ({self.url})"


# ==========================================================
# 04. Website Views Counter
# ==========================================================
class WebsiteViewsCounter(TimeStampedModel):
    """
    Stores total live website views count.
    """
    total_views = models.PositiveBigIntegerField(
        default=1420,
        help_text="Total live website view count across all pages",
    )

    class Meta:
        verbose_name = "04. Website Views Counter"
        verbose_name_plural = "04. Website Views Counter"

    def __str__(self) -> str:
        return f"Total Website Views: {self.total_views:,}"


# ==========================================================
# 05. Site Maintenance Mode Control (Global System Toggle)
# ==========================================================
class SiteMaintenanceSetting(TimeStampedModel):
    """
    Global Site Maintenance Mode configuration.
    Toggling is_maintenance_mode ON will display an official maintenance page across the entire public website.
    """
    is_maintenance_mode = models.BooleanField(
        default=False,
        verbose_name="🚨 ENABLE MAINTENANCE MODE (වෙබ් අඩවිය නඩත්තු තත්වයට පත් කරන්න)",
        help_text="Check this box to switch the website to Maintenance Mode. Uncheck to bring the live website back online for users.",
    )

    # 🇬🇧 English Content
    title_en = models.CharField(
        max_length=255,
        default="Website Under Scheduled Maintenance",
        verbose_name="Title (English)",
    )
    message_en = models.TextField(
        default="The official website of the Ministry of Fisheries, Aquatic and Ocean Resources is currently undergoing scheduled system updates to serve you better. We apologize for any inconvenience caused.",
        verbose_name="Message (English)",
    )
    estimated_restoration_en = models.CharField(
        max_length=200,
        default="Expected Restoration: Today at 6:00 PM",
        verbose_name="Estimated Restoration Time (English)",
    )

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(
        max_length=255,
        default="වෙබ් අඩවියේ සැලසුම් කළ නඩත්තු කටයුත්තක් සිදු වෙමින් පවතී",
        verbose_name="Title (සිංහල)",
    )
    message_si = models.TextField(
        default="ඔබට වඩාත් උසස් සේවාවක් සැපයීම සඳහා ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශයේ නිල වෙබ් අඩවියේ පද්ධති නඩත්තු කිරීමක් මේ වන විට සිදුවෙමින් පවතී. සිදු වන අපහසුතාවයට අපගේ කණගාටුව ප්‍රකාශ කරමු.",
        verbose_name="Message (සිංහල)",
    )
    estimated_restoration_si = models.CharField(
        max_length=200,
        default="නැවත සේවාව ආරම්භ වන වේලාව: අද ප.ව. 6:00 ට",
        verbose_name="Estimated Restoration Time (සිංහල)",
    )

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        default="இணையதளம் திட்டமிடப்பட்ட பராமரிப்பில் உள்ளது",
        verbose_name="Title (தமிழ்)",
    )
    message_ta = models.TextField(
        default="உங்களுக்கு சிறந்த சேவையை வழங்குவதற்காக கடற்றொழில் அமைச்சின் உத்தியோகபூர்வ இணையதளம் தற்போது கணினி புதுப்பித்தலுக்கு உட்பட்டுள்ளது. ஏற்படும் சிரமத்திற்கு வருந்துகிறோம்.",
        verbose_name="Message (தமிழ்)",
    )
    estimated_restoration_ta = models.CharField(
        max_length=200,
        default="எதிர்பார்க்கப்படும் சேவை மீட்டமைப்பு: இன்று மாலை 6:00 மணிக்கு",
        verbose_name="Estimated Restoration Time (தமிழ்)",
    )

    # Emergency Contacts
    contact_phone = models.CharField(
        max_length=100,
        default="+94 11 244 6183 / +94 11 244 6184",
        verbose_name="Emergency Contact Phone",
    )
    contact_email = models.CharField(
        max_length=100,
        default="info@fisheries.gov.lk",
        verbose_name="Emergency Contact Email",
    )

    class Meta:
        verbose_name = "00. Site Maintenance Mode Settings (නඩත්තු ප්‍රකාරය)"
        verbose_name_plural = "00. Site Maintenance Mode Settings (නඩත්තු ප්‍රකාරය)"

    def __str__(self) -> str:
        status = "🔴 ACTIVE (Maintenance ON)" if self.is_maintenance_mode else "🟢 INACTIVE (Site Live)"
        return f"Maintenance Mode Status: {status}"

