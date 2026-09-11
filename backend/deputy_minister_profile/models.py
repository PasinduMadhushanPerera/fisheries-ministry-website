from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def deputy_minister_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"deputy_minister/{timezone.now():%Y/%m}/{safe_filename}"


# ==========================================================
# 01. Deputy Minister Profile & Official Portrait (Multilingual)
# ==========================================================
class DeputyMinisterProfile(TimeStampedModel):
    # 🇬🇧 English
    badge_en = models.CharField(max_length=100, default="Deputy Minister", verbose_name="Badge (English)")
    name_en = models.CharField(max_length=255, default="Hon. Deputy Minister", verbose_name="Name (English)")
    role_title_en = models.CharField(
        max_length=255,
        default="Deputy Minister of Fisheries, Aquatic and Ocean Resources",
        verbose_name="Role Title (English)"
    )
    ministry_badge_en = models.CharField(
        max_length=255,
        default="Ministry of Fisheries, Aquatic and Ocean Resources",
        verbose_name="Ministry Badge (English)"
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_si = models.CharField(max_length=100, blank=True, default="නියෝජ්‍ය අමාත්‍ය", verbose_name="Badge (සිංහල)")
    name_si = models.CharField(max_length=255, blank=True, default="ගරු නියෝජ්‍ය අමාත්‍යතුමා", verbose_name="Name (සිංහල)")
    role_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර, ජලජ සහ සාගර සම්පත් නියෝජ්‍ය අමාත්‍ය",
        verbose_name="Role Title (සිංහල)"
    )
    ministry_badge_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය",
        verbose_name="Ministry Badge (සිංහල)"
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_ta = models.CharField(max_length=100, blank=True, default="பிரதி அமைச்சர்", verbose_name="Badge (தமிழ்)")
    name_ta = models.CharField(max_length=255, blank=True, default="கௌரவ பிரதி அமைச்சர்", verbose_name="Name (தமிழ்)")
    role_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="கடற்றොழில், நீரியல் மற்றும் கடல்சார் வளங்கள் பிரதி அமைச்சர்",
        verbose_name="Role Title (தமிழ்)"
    )
    ministry_badge_ta = models.CharField(
        max_length=255,
        blank=True,
        default="கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு",
        verbose_name="Ministry Badge (தமிழ்)"
    )

    # Media
    photo = models.ImageField(upload_to=deputy_minister_upload_path, blank=True, null=True)
    photo_fallback = models.CharField(max_length=255, blank=True, default="/images/leadership/deputy-minister.jpg")
    photo_alt = models.CharField(max_length=255, blank=True, default="Official portrait of Hon. Deputy Minister")

    class Meta:
        verbose_name = "01. Deputy Minister Profile & Official Portrait"
        verbose_name_plural = "01. Deputy Minister Profile & Official Portrait"

    def __str__(self) -> str:
        return f"{self.name_en} ({self.badge_en})"


# ==========================================================
# 02. Deputy Minister's Official Leadership Message (Multilingual)
# ==========================================================
class DeputyMinisterMessage(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Deputy Minister's Official Message", verbose_name="Eyebrow (English)")
    message_title_en = models.CharField(
        max_length=255,
        default="Empowering Regional Fisheries Communities & Infrastructure",
        verbose_name="Message Title (English)"
    )
    message_content_en = models.TextField(
        default="Our focus is on delivering efficient public administration, upgrading regional harbour facilities, expanding local training opportunities for young fishers, and ensuring welfare support reaches every coastal community in Sri Lanka.",
        verbose_name="Message Content (English)"
    )
    quote_author_en = models.CharField(max_length=255, default="Hon. Deputy Minister", verbose_name="Quote Author (English)")
    quote_designation_en = models.CharField(max_length=255, default="Deputy Minister", verbose_name="Quote Designation (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="නියෝජ්‍ය අමාත්‍යතුමාගේ නිල පණිවිඩය", verbose_name="Eyebrow (සිංහල)")
    message_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="ප්‍රාදේශීය ධීවර ප්‍රජාව සහ යටිතල පහසුකම් සවිබල ගැන්වීම",
        verbose_name="Message Title (සිංහල)"
    )
    message_content_si = models.TextField(
        blank=True,
        default="අපගේ ප්‍රමුඛතාවය වන්නේ කාර්යක්ෂම මහජන පරිපාලනයක් සැපයීම, ප්‍රාදේශීය වරාය පහසුකම් නවීකරණය කිරීම, තරුණ ධීවරයින් සඳහා දේශීය පුහුණු අවස්ථා පුළුල් කිරීම සහ සුබසාධන ප්‍රතිලාභ සෑම ධීවර ප්‍රජාවකටම ළඟා කරදීමයි.",
        verbose_name="Message Content (සිංහල)"
    )
    quote_author_si = models.CharField(max_length=255, blank=True, default="ගරු නියෝජ්‍ය අමාත්‍යතුමා", verbose_name="Quote Author (සිංහල)")
    quote_designation_si = models.CharField(max_length=255, blank=True, default="නියෝජ්‍ය අමාත්‍ය", verbose_name="Quote Designation (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="பிரதி அமைச்சரின் உத்தியோகபூர்வ செய்தி", verbose_name="Eyebrow (தமிழ்)")
    message_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="பிராந்திய மீன்பிடி சமூகங்கள் மற்றும் உட்கட்டமைப்பை மேம்படுத்துதல்",
        verbose_name="Message Title (தமிழ்)"
    )
    message_content_ta = models.TextField(
        blank=True,
        default="செயல்திறன் மிக்க பொது நிர்வாகத்தை வழங்குதல், பிராந்திய துறைமுக வசதிகளை மேம்படுத்துதல் மற்றும் மீனவர்களுக்கான உள்ளூர் பயிற்சி வாய்ப்புகளை விரிவுபடுத்துவதே எமது நோக்கமாகும்.",
        verbose_name="Message Content (தமிழ்)"
    )
    quote_author_ta = models.CharField(max_length=255, blank=True, default="கௌரவ பிரதி அமைச்சர்", verbose_name="Quote Author (தமிழ்)")
    quote_designation_ta = models.CharField(max_length=255, blank=True, default="பிரதி அமைச்சர்", verbose_name="Quote Designation (தமிழ்)")

    class Meta:
        verbose_name = "02. Deputy Minister's Official Leadership Message"
        verbose_name_plural = "02. Deputy Minister's Official Leadership Message"

    def __str__(self) -> str:
        return f"Message: {self.message_title_en}"


# ==========================================================
# 03. Deputy Minister Secretariat & Contact Desk (Multilingual)
# ==========================================================
class DeputyMinisterSecretariat(TimeStampedModel):
    # 🇬🇧 English
    box_title_en = models.CharField(max_length=255, default="Deputy Minister's Secretariat Office", verbose_name="Box Title (English)")
    box_subtitle_en = models.CharField(max_length=255, default="Regional Coordination & Public Service Desk", verbose_name="Box Subtitle (English)")
    office_address_en = models.TextField(default="New Secretariat, Maligawatta, Colombo 10, Sri Lanka", verbose_name="Address (English)")
    cta_contact_button_text_en = models.CharField(max_length=100, default="Contact Secretariat", verbose_name="Button Text (English)")
    secondary_link_text_en = models.CharField(max_length=100, default="View Ministry Divisions", verbose_name="Secondary Link Text (English)")

    # 🇱🇰 Sinhala (සිංහල)
    box_title_si = models.CharField(max_length=255, blank=True, default="නියෝජ්‍ය අමාත්‍ය ලේකම් කාර්යාලය", verbose_name="Box Title (සිංහල)")
    box_subtitle_si = models.CharField(max_length=255, blank=True, default="ප්‍රාදේශීය සම්බන්ධීකරණ සහ මහජන සේවා අංශය", verbose_name="Box Subtitle (සිංහල)")
    office_address_si = models.TextField(blank=True, default="නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව", verbose_name="Address (සිංහල)")
    cta_contact_button_text_si = models.CharField(max_length=100, blank=True, default="ලේකම් කාර්යාලය අමතන්න", verbose_name="Button Text (සිංහල)")
    secondary_link_text_si = models.CharField(max_length=100, blank=True, default="අමාත්‍යාංශ අංශ බලන්න", verbose_name="Secondary Link Text (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    box_title_ta = models.CharField(max_length=255, blank=True, default="பிரதி அமைச்சர் செயலக அலுவலகம்", verbose_name="Box Title (தமிழ்)")
    box_subtitle_ta = models.CharField(max_length=255, blank=True, default="பிராந்திய ஒருங்கிணைப்பு மற்றும் பொதுச் சேவைப் பிரிவு", verbose_name="Box Subtitle (தமிழ்)")
    office_address_ta = models.TextField(blank=True, default="புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை", verbose_name="Address (தமிழ்)")
    cta_contact_button_text_ta = models.CharField(max_length=100, blank=True, default="செயலகத்தைத் தொடர்பு கொள்ள", verbose_name="Button Text (தமிழ்)")
    secondary_link_text_ta = models.CharField(max_length=100, blank=True, default="அமைச்சின் பிரிவுகளைப் பார்க்க", verbose_name="Secondary Link Text (தமிழ்)")

    # Settings
    office_hours = models.CharField(max_length=100, default="8:30 AM – 4:15 PM")
    office_phone = models.CharField(max_length=100, default="+94 11 244 6183")
    office_email = models.EmailField(default="deputyminister@fisheries.gov.lk")
    cta_contact_button_url = models.CharField(max_length=255, default="/contact")
    secondary_link_url = models.CharField(max_length=255, default="/about/divisions")

    class Meta:
        verbose_name = "03. Secretariat Office & Contact Desk"
        verbose_name_plural = "03. Secretariat Office & Contact Desk"

    def __str__(self) -> str:
        return f"Secretariat: {self.box_title_en}"
