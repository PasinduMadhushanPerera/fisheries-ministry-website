from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def home_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"home/{timezone.now():%Y/%m}/{safe_filename}"


# ==========================================================
# 01. Hero Banner Slides (Multilingual)
# ==========================================================
class HomeHeroSlide(TimeStampedModel):
    order = models.PositiveIntegerField(default=1, db_index=True, help_text="Slide display sequence (1, 2, 3...)")
    
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=150, default="Official Government Website", verbose_name="Eyebrow (English)")
    title_en = models.CharField(max_length=255, default="Welcome to the Ministry of", verbose_name="Title (English)")
    highlighted_title_en = models.CharField(max_length=255, default="Fisheries, Aquatic and Ocean Resources", verbose_name="Highlighted Title (English)")
    description_en = models.TextField(default="Empowering coastal communities, expanding aquaculture and securing sustainable blue economic growth for Sri Lanka.", verbose_name="Description (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=150, blank=True, default="නිල රජයේ වෙබ් අඩවිය", verbose_name="Eyebrow (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="සාදරයෙන් පිළිගනිමු", verbose_name="Title (සිංහල)")
    highlighted_title_si = models.CharField(max_length=255, blank=True, default="ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය", verbose_name="Highlighted Title (සිංහල)")
    description_si = models.TextField(blank=True, default="වෙරළබඩ ප්‍රජාව සවිබල ගැන්වීම, ජලජීවී වගාව පුළුල් කිරීම සහ ශ්‍රී ලංකාවේ තිරසාර සාගර ආර්ථිකය ශක්තිමත් කිරීම.", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=150, blank=True, default="அரசின் உத்தியோகபூர்வ இணையத்தளம்", verbose_name="Eyebrow (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="நல்வரவு", verbose_name="Title (தமிழ்)")
    highlighted_title_ta = models.CharField(max_length=255, blank=True, default="கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு", verbose_name="Highlighted Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="கடலோர சமூகங்களை வலுப்படுத்துதல், நீரியல் வளங்களை மேம்படுத்துதல் மற்றும் இலங்கையின் நிலையான பொருளாதாரத்தை கட்டியெழுப்புதல்.", verbose_name="Description (தமிழ்)")

    # Media & Settings
    image = models.ImageField(upload_to=home_upload_path, blank=True, null=True, help_text="Upload custom background image")
    image_url_fallback = models.CharField(max_length=255, blank=True, default="/images/home/hero-fishing-harbour.jpg", help_text="Default static image path")
    image_alt = models.CharField(max_length=255, blank=True, default="Ministry hero banner image")
    is_active = models.BooleanField(default=True, db_index=True, help_text="Toggle slide visibility")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "01. Hero Banner Slide"
        verbose_name_plural = "01. Hero Banner Slides"

    def __str__(self) -> str:
        return f"Slide #{self.order}: {self.title_en} {self.highlighted_title_en}"


# ==========================================================
# 02. Quick Access Bar Links (Multilingual)
# ==========================================================
class HomeQuickAccessItem(TimeStampedModel):
    ICON_CHOICES = [
        ("Newspaper", "Newspaper (News)"),
        ("Bell", "Bell (Notices)"),
        ("Download", "Download (Documents)"),
        ("Building2", "Building (Institutions)"),
        ("PhoneCall", "Phone Call (Contact)"),
        ("GraduationCap", "Graduation Cap (Training)"),
        ("Globe", "Globe (International)"),
        ("FileText", "File Text (Reports)"),
    ]

    # 🇬🇧 English
    title_en = models.CharField(max_length=100, default="News", verbose_name="Title (English)")
    aria_label_en = models.CharField(max_length=150, blank=True, default="Go to news page", verbose_name="Aria Label (English)")

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(max_length=100, blank=True, default="පුවත්", verbose_name="Title (සිංහල)")
    aria_label_si = models.CharField(max_length=150, blank=True, default="පුවත් පිටුවට යන්න", verbose_name="Aria Label (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(max_length=100, blank=True, default="செய்திகள்", verbose_name="Title (தமிழ்)")
    aria_label_ta = models.CharField(max_length=150, blank=True, default="செய்திகள் பக்கத்திற்குச் செல்லவும்", verbose_name="Aria Label (தமிழ்)")

    # Settings
    url = models.CharField(max_length=255, default="/media-centre/news", help_text="Target URL")
    icon_name = models.CharField(max_length=50, choices=ICON_CHOICES, default="Newspaper")
    order = models.PositiveIntegerField(default=1, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "02. Quick Access Bar Link"
        verbose_name_plural = "02. Quick Access Bar Links"

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.url})"


# ==========================================================
# 03. Media Centre : Latest News Header (Multilingual)
# ==========================================================
class HomeNewsSection(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Media centre", verbose_name="Eyebrow (English)")
    title_en = models.CharField(max_length=255, default="Latest News", verbose_name="Title (English)")
    description_en = models.TextField(default="Follow Ministry activities, sector developments, community programmes and official public information.", verbose_name="Description (English)")
    button_text_en = models.CharField(max_length=100, default="View all news", verbose_name="Button Text (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="මාධ්‍ය මධ්‍යස්ථානය", verbose_name="Eyebrow (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="නවතම පුවත්", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="අමාත්‍යාංශයේ ක්‍රියාකාරකම්, ක්ෂේත්‍ර සංවර්ධනය, ප්‍රජා වැඩසටහන් සහ නිල නිවේදන පිළිබඳව දැනුවත් වන්න.", verbose_name="Description (සිංහල)")
    button_text_si = models.CharField(max_length=100, blank=True, default="සියලු පුවත් බලන්න", verbose_name="Button Text (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="ஊடக மையம்", verbose_name="Eyebrow (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="சமீபத்திய செய்திகள்", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="அமைச்சின் நடவடிக்கைகள், துறைசார் முன்னேற்றங்கள் மற்றும் உத்தியோகபூர்வ தகவல்களைப் பின்தொடரவும்.", verbose_name="Description (தமிழ்)")
    button_text_ta = models.CharField(max_length=100, blank=True, default="அனைத்து செய்திகளையும் பார்க்க", verbose_name="Button Text (தமிழ்)")

    button_url = models.CharField(max_length=255, default="/media-centre/news")
    max_articles = models.PositiveIntegerField(default=5, help_text="Number of latest news cards to show on homepage")

    class Meta:
        verbose_name = "03. Media Centre : Latest News Header"
        verbose_name_plural = "03. Media Centre : Latest News Header"

    def __str__(self) -> str:
        return f"Latest News Section: {self.title_en}"


# ==========================================================
# 04. Media Centre : News Articles & Cards (Multilingual)
# ==========================================================
class HomeNewsCard(TimeStampedModel):
    # 🇬🇧 English
    title_en = models.CharField(max_length=255, default="", verbose_name="Title (English)")
    category_en = models.CharField(max_length=100, default="Ministry news", verbose_name="Category (English)")
    summary_en = models.TextField(default="", verbose_name="Summary (English)")
    content_en = models.TextField(blank=True, default="", verbose_name="Full Content (English)")

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Title (සිංහල)")
    category_si = models.CharField(max_length=100, blank=True, default="අමාත්‍යාංශ පුවත්", verbose_name="Category (සිංහල)")
    summary_si = models.TextField(blank=True, default="", verbose_name="Summary (සිංහල)")
    content_si = models.TextField(blank=True, default="", verbose_name="Full Content (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Title (தமிழ்)")
    category_ta = models.CharField(max_length=100, blank=True, default="அமைச்சுச் செய்திகள்", verbose_name="Category (தமிழ்)")
    summary_ta = models.TextField(blank=True, default="", verbose_name="Summary (தமிழ்)")
    content_ta = models.TextField(blank=True, default="", verbose_name="Full Content (தமிழ்)")

    # Media & Settings
    published_date = models.DateField(default=timezone.now, help_text="Publication date")
    image = models.ImageField(upload_to=home_upload_path, blank=True, null=True, help_text="News card cover image")
    image_url_fallback = models.CharField(max_length=255, blank=True, default="", help_text="Fallback image path")
    image_alt = models.CharField(max_length=255, blank=True, default="Ministry news illustration")
    is_featured = models.BooleanField(default=False, help_text="Mark as featured badge")
    order = models.PositiveIntegerField(default=1, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["order", "-published_date", "id"]
        verbose_name = "04. Media Centre : Latest News Card"
        verbose_name_plural = "04. Media Centre : Latest News Cards"

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} [{self.category_en}]"


# ==========================================================
# 05. Ministry Portals : Services & Opportunities Header (Multilingual)
# ==========================================================
class HomeServicesSection(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(max_length=100, default="Ministry Portals", verbose_name="Badge (English)")
    section_title_en = models.CharField(max_length=255, default="Services and Opportunities", verbose_name="Section Title (English)")
    section_description_en = models.TextField(default="Explore local training programmes, foreign technical exchange, procurement notices, career recruitment, and key public opportunities provided by the Ministry of Fisheries.", verbose_name="Description (English)")

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(max_length=100, blank=True, default="අමාත්‍යාංශ ද්වාර", verbose_name="Badge (සිංහල)")
    section_title_si = models.CharField(max_length=255, blank=True, default="සේවාවන් සහ අවස්ථාවන්", verbose_name="Section Title (සිංහල)")
    section_description_si = models.TextField(blank=True, default="ධීවර අමාත්‍යාංශය මඟින් සපයනු ලබන දේශීය පුහුණු වැඩසටහන්, විදේශීය තාක්ෂණික හුවමාරු, ප්‍රසම්පාදන නිවේදන සහ වෘත්තීය බඳවාගැනීම් ගවේෂණය කරන්න.", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(max_length=100, blank=True, default="அமைச்சு இணைய முகப்புகள்", verbose_name="Badge (தமிழ்)")
    section_title_ta = models.CharField(max_length=255, blank=True, default="சேவைகள் மற்றும் வாய்ப்புகள்", verbose_name="Section Title (தமிழ்)")
    section_description_ta = models.TextField(blank=True, default="கடற்றொழில் அமைச்சினால் வழங்கப்படும் உள்நாட்டுப் பயிற்சிகள், வெளிநாட்டுப் பரிமாற்றங்கள், கொள்முதல் மற்றும் வேலைவாய்ப்புக்களை அணுகவும்.", verbose_name="Description (தமிழ்)")

    class Meta:
        verbose_name = "05. Ministry Portals : Services & Opportunities Header"
        verbose_name_plural = "05. Ministry Portals : Services & Opportunities Header"

    def __str__(self) -> str:
        return f"Services Section: {self.section_title_en}"


# ==========================================================
# 06. Ministry Portals : Service & Opportunity Cards (Multilingual)
# ==========================================================
class HomeServiceCard(TimeStampedModel):
    # 🇬🇧 English
    title_en = models.CharField(max_length=200, default="", verbose_name="Title (English)")
    category_en = models.CharField(max_length=100, default="Capacity Development", verbose_name="Category (English)")
    description_en = models.TextField(default="", verbose_name="Description (English)")
    button_text_en = models.CharField(max_length=100, default="Explore Portal", verbose_name="Button Text (English)")

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(max_length=200, blank=True, default="", verbose_name="Title (සිංහල)")
    category_si = models.CharField(max_length=100, blank=True, default="ධාරිතා සංවර්ධනය", verbose_name="Category (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Description (සිංහල)")
    button_text_si = models.CharField(max_length=100, blank=True, default="ද්වාරය ගවේෂණය කරන්න", verbose_name="Button Text (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(max_length=200, blank=True, default="", verbose_name="Title (தமிழ்)")
    category_ta = models.CharField(max_length=100, blank=True, default="திறன் அபிவிருத்தி", verbose_name="Category (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Description (தமிழ்)")
    button_text_ta = models.CharField(max_length=100, blank=True, default="அணுகவும்", verbose_name="Button Text (தமிழ்)")

    # Settings
    url = models.CharField(max_length=255, default="", help_text="Destination route")
    image = models.ImageField(upload_to=home_upload_path, blank=True, null=True)
    image_url_fallback = models.CharField(max_length=255, blank=True, default="/images/services/local-training.jpg")
    image_alt = models.CharField(max_length=255, blank=True, default="Service illustration")
    order = models.PositiveIntegerField(default=1, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "06. Ministry Portals : Service & Opportunity Card"
        verbose_name_plural = "06. Ministry Portals : Service & Opportunity Cards"

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} [{self.category_en}]"


# ==========================================================
# 07. Public Portals & Services : Quick Info Header (Multilingual)
# ==========================================================
class HomeQuickInfoSection(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(max_length=100, default="Public Portals & Services", verbose_name="Badge (English)")
    section_title_en = models.CharField(max_length=255, default="Quick Information & Public Services", verbose_name="Section Title (English)")
    section_description_en = models.TextField(default="Access frequently used public services and important Ministry information.", verbose_name="Description (English)")

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(max_length=100, blank=True, default="මහජන ද්වාර සහ සේවා", verbose_name="Badge (සිංහල)")
    section_title_si = models.CharField(max_length=255, blank=True, default="ක්ෂණික තොරතුරු සහ මහජන සේවා", verbose_name="Section Title (සිංහල)")
    section_description_si = models.TextField(blank=True, default="නිතර භාවිතා වන මහජන සේවාවන් සහ වැදගත් අමාත්‍යාංශ තොරතුරු පහසුවෙන් ලබාගන්න.", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(max_length=100, blank=True, default="பொது இணைய முகப்புகள் & சேவைகள்", verbose_name="Badge (தமிழ்)")
    section_title_ta = models.CharField(max_length=255, blank=True, default="விரைவுத் தகவல்கள் மற்றும் பொதுச் சேவைகள்", verbose_name="Section Title (தமிழ்)")
    section_description_ta = models.TextField(blank=True, default="அடிக்கடி பயன்படுத்தப்படும் பொதுச் சேவைகள் மற்றும் முக்கிய அமைச்சின் தகவல்களை அணுகவும்.", verbose_name="Description (தமிழ்)")

    class Meta:
        verbose_name = "07. Public Portals & Services : Quick Info Header"
        verbose_name_plural = "07. Public Portals & Services : Quick Info Header"

    def __str__(self) -> str:
        return f"Quick Info Section: {self.section_title_en}"


# ==========================================================
# 08. Public Portals & Services : Quick Info Cards (Multilingual)
# ==========================================================
class HomeQuickInfoCard(TimeStampedModel):
    CARD_TYPE_CHOICES = [
        ("weather", "Weather Card (External Meteo Forecast)"),
        ("internal-affairs", "Internal Affairs Unit Card (Complaints & Oversight)"),
        ("custom", "Custom Public Service Card"),
    ]

    card_type = models.CharField(max_length=30, choices=CARD_TYPE_CHOICES, default="weather")

    # 🇬🇧 English
    title_en = models.CharField(max_length=150, default="Weather", verbose_name="Title (English)")
    description_en = models.TextField(default="Official weather and marine forecast for fisheries navigation.", verbose_name="Description (English)")
    primary_button_label_en = models.CharField(max_length=100, default="View Details", verbose_name="Button Text (English)")

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(max_length=150, blank=True, default="කාලගුණය", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="ධීවර යාත්‍රා මෙහෙයුම් සඳහා නිල කාලගුණ සහ සාගර තත්ත්ව අනාවැකි.", verbose_name="Description (සිංහල)")
    primary_button_label_si = models.CharField(max_length=100, blank=True, default="විස්තර බලන්න", verbose_name="Button Text (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(max_length=150, blank=True, default="வானிலை", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="கடற்றொழில் நடவடிக்கைகளுக்கான உத்தியோகபூர்வ வானிலை மற்றும் கடல்சார் முன்னறிவிப்புகள்.", verbose_name="Description (தமிழ்)")
    primary_button_label_ta = models.CharField(max_length=100, blank=True, default="விவரங்களைப் பார்க்க", verbose_name="Button Text (தமிழ்)")

    # Settings
    url = models.CharField(max_length=255, default="", help_text="Target URL")
    is_external = models.BooleanField(default=False, help_text="Check if this is an external website")
    image = models.ImageField(upload_to=home_upload_path, blank=True, null=True)
    image_url_fallback = models.CharField(max_length=255, blank=True, default="/images/home/weather.jpg")
    image_alt = models.CharField(max_length=255, blank=True, default="Public Service Card")
    order = models.PositiveIntegerField(default=1, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "08. Public Portals & Services : Quick Info Card (Weather/IAU)"
        verbose_name_plural = "08. Public Portals & Services : Quick Info Cards (Weather/IAU)"

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.get_card_type_display()})"


# ==========================================================
# 09. Government Network : Institutions Header (Multilingual)
# ==========================================================
class HomeInstitutionsSection(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(max_length=100, default="Government Network", verbose_name="Badge (English)")
    section_title_en = models.CharField(max_length=255, default="Ministry institutions and service organisations", verbose_name="Section Title (English)")
    section_description_en = models.TextField(default="Explore the official departments, corporations, research authorities and statutory bodies operating under the Ministry of Fisheries.", verbose_name="Description (English)")

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(max_length=100, blank=True, default="රාජ්‍ය ජාලය", verbose_name="Badge (සිංහල)")
    section_title_si = models.CharField(max_length=255, blank=True, default="අමාත්‍යාංශ ආයතන සහ සේවා සංවිධාන", verbose_name="Section Title (සිංහල)")
    section_description_si = models.TextField(blank=True, default="ධීවර අමාත්‍යාංශය යටතේ ක්‍රියාත්මක වන නිල දෙපාර්තමේන්තු, සංස්ථා, පර්යේෂණ ආයතන සහ ව්‍යවස්ථාපිත මණ්ඩල ගවේෂණය කරන්න.", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(max_length=100, blank=True, default="அரசாங்க வலையமைப்பு", verbose_name="Badge (தமிழ்)")
    section_title_ta = models.CharField(max_length=255, blank=True, default="அமைச்சின் நிறுவனங்கள் மற்றும் சேவை அமைப்புகள்", verbose_name="Section Title (தமிழ்)")
    section_description_ta = models.TextField(blank=True, default="கடற்றொழில் அமைச்சின் கீழ் இயங்கும் உத்தியோகபூர்வ திணைக்களங்கள், கூட்டுத்தாபனங்கள் மற்றும் ஆராய்ச்சி நிறுவனங்களை அணுகவும்.", verbose_name="Description (தமிழ்)")

    class Meta:
        verbose_name = "09. Government Network : Institutions Header"
        verbose_name_plural = "09. Government Network : Institutions Header"

    def __str__(self) -> str:
        return f"Institutions Section: {self.section_title_en}"


# ==========================================================
# 10. Government Network : Institution Cards (Multilingual)
# ==========================================================
class HomeInstitutionCard(TimeStampedModel):
    acronym = models.CharField(max_length=50, default="", help_text="e.g. 'DFAR', 'NARA', 'NAQDA', 'CFHC', 'CFC', 'CNFL', 'NSL'")

    # 🇬🇧 English
    title_en = models.CharField(max_length=255, default="", verbose_name="Title (English)")
    description_en = models.TextField(default="", verbose_name="Description (English)")

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Description (தமிழ்)")

    # Settings
    url = models.CharField(max_length=255, default="https://", help_text="Official website link")
    is_external = models.BooleanField(default=True, help_text="Check if this opens in an external website")
    image = models.ImageField(upload_to=home_upload_path, blank=True, null=True, help_text="Upload official institution logo")
    image_url_fallback = models.CharField(max_length=255, blank=True, default="/images/institutions/dfar.jpg")
    image_alt = models.CharField(max_length=255, blank=True, default="Institution Logo")
    order = models.PositiveIntegerField(default=1, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "10. Government Network : Institution Card"
        verbose_name_plural = "10. Government Network : Institution Cards"

    def __str__(self) -> str:
        return f"{self.order}. {self.acronym} - {self.title_en}"
