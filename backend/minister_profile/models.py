from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def minister_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"minister/{timezone.now():%Y/%m}/{safe_filename}"


# ==========================================================
# 01. Minister Profile & Official Portrait (Multilingual)
# ==========================================================
class MinisterProfile(TimeStampedModel):
    # 🇬🇧 English
    badge_en = models.CharField(max_length=100, default="Cabinet Minister", verbose_name="Badge (English)")
    name_en = models.CharField(max_length=255, default="Hon. Ramalingam Chandrasekara", verbose_name="Name (English)")
    role_title_en = models.CharField(max_length=255, default="Cabinet Minister of Fisheries, Aquatic and Ocean Resources", verbose_name="Role Title (English)")
    ministry_badge_en = models.CharField(max_length=255, default="Ministry of Fisheries, Aquatic and Ocean Resources", verbose_name="Ministry Badge (English)")

    # 🇱🇰 Sinhala (සිංහල)
    badge_si = models.CharField(max_length=100, blank=True, default="කැබිනට් අමාත්‍ය", verbose_name="Badge (සිංහල)")
    name_si = models.CharField(max_length=255, blank=True, default="ගරු රාමලිංගම් චන්ද්‍රසේකර", verbose_name="Name (සිංහල)")
    role_title_si = models.CharField(max_length=255, blank=True, default="ධීවර, ජලජ සහ සාගර සම්පත් කැබිනට් අමාත්‍ය", verbose_name="Role Title (සිංහල)")
    ministry_badge_si = models.CharField(max_length=255, blank=True, default="ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය", verbose_name="Ministry Badge (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    badge_ta = models.CharField(max_length=100, blank=True, default="அமைச்சரவை அமைச்சர்", verbose_name="Badge (தமிழ்)")
    name_ta = models.CharField(max_length=255, blank=True, default="கௌரவ இராமலிங்கம் சந்திரசேகர்", verbose_name="Name (தமிழ்)")
    role_title_ta = models.CharField(max_length=255, blank=True, default="கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சரவை அமைச்சர்", verbose_name="Role Title (தமிழ்)")
    ministry_badge_ta = models.CharField(max_length=255, blank=True, default="கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு", verbose_name="Ministry Badge (தமிழ்)")

    # Media
    photo = models.ImageField(upload_to=minister_upload_path, blank=True, null=True)
    photo_fallback = models.CharField(max_length=255, blank=True, default="/images/leadership/minister.jpg")
    photo_alt = models.CharField(max_length=255, blank=True, default="Official portrait of Hon. Ramalingam Chandrasekara")

    class Meta:
        verbose_name = "01. Minister Profile & Official Portrait"
        verbose_name_plural = "01. Minister Profile & Official Portrait"

    def __str__(self) -> str:
        return f"{self.name_en} ({self.badge_en})"


# ==========================================================
# 02. Minister's Official Leadership Message (Multilingual)
# ==========================================================
class MinisterMessage(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Minister's Official Message", verbose_name="Eyebrow (English)")
    message_title_en = models.CharField(max_length=255, default="Transforming Sri Lanka's Fisheries & Blue Economy", verbose_name="Message Title (English)")
    message_content_en = models.TextField(
        default="Our commitment is to drive science-based marine conservation, empower coastal fishing communities, maximize inland aquaculture production, and expand seafood export earnings while safeguarding ocean ecosystems for future generations.",
        verbose_name="Message Content (English)"
    )
    quote_author_en = models.CharField(max_length=255, default="Hon. Ramalingam Chandrasekara", verbose_name="Quote Author (English)")
    quote_designation_en = models.CharField(max_length=255, default="Cabinet Minister", verbose_name="Quote Designation (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="අමාත්‍යතුමාගේ නිල පණිවිඩය", verbose_name="Eyebrow (සිංහල)")
    message_title_si = models.CharField(max_length=255, blank=True, default="ශ්‍රී ලංකාවේ ධීවර හා නීල ආර්ථිකය පරිවර්තනය කිරීම", verbose_name="Message Title (සිංහල)")
    message_content_si = models.TextField(
        blank=True,
        default="අපගේ අරමුණ වන්නේ විද්‍යාත්මක සාගර සංරක්ෂණය, වෙරළබඩ ධීවර ප්‍රජාව සවිබල ගැන්වීම, මිරිදිය ජලජීවී වගා අස්වැන්න උපරිම කිරීම සහ සාගර පරිසර පද්ධති සුරකිමින් මුහුදු ආහාර අපනයන ඉපැයීම් ඉහළ නැංවීමයි.",
        verbose_name="Message Content (සිංහල)"
    )
    quote_author_si = models.CharField(max_length=255, blank=True, default="ගරු රාමලිංගම් චන්ද්‍රසේකර", verbose_name="Quote Author (සිංහල)")
    quote_designation_si = models.CharField(max_length=255, blank=True, default="කැබිනට් අමාත්‍ය", verbose_name="Quote Designation (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="அமைச்சரின் உத்தியோகபூர்வ செய்தி", verbose_name="Eyebrow (தமிழ்)")
    message_title_ta = models.CharField(max_length=255, blank=True, default="இலங்கையின் கடற்றொழில் மற்றும் நீலப் பொருளாதாரத்தை மாற்றுதல்", verbose_name="Message Title (தமிழ்)")
    message_content_ta = models.TextField(
        blank=True,
        default="அறிவியல் பூர்வமான கடல் பாதுகாப்பு, கரையோர மீன்பிடி சமூகங்களை வலுப்படுத்துதல், நீரியல் வள உற்பத்தியை அதிகரித்தல் மற்றும் கடல் உணவு ஏற்றுமதி வருவாயை விரிவுபடுத்துவதே எமது அர்ப்பணிப்பாகும்.",
        verbose_name="Message Content (தமிழ்)"
    )
    quote_author_ta = models.CharField(max_length=255, blank=True, default="கௌரவ இராமலிங்கம் சந்திரசேகர்", verbose_name="Quote Author (தமிழ்)")
    quote_designation_ta = models.CharField(max_length=255, blank=True, default="அமைச்சரவை அமைச்சர்", verbose_name="Quote Designation (தமிழ்)")

    class Meta:
        verbose_name = "02. Minister's Official Leadership Message"
        verbose_name_plural = "02. Minister's Official Leadership Message"

    def __str__(self) -> str:
        return f"Message: {self.message_title_en}"


# ==========================================================
# 03. Secretariat Office & Contact Desk (Multilingual)
# ==========================================================
class MinisterSecretariat(TimeStampedModel):
    # 🇬🇧 English
    box_title_en = models.CharField(max_length=255, default="Minister's Secretariat Office", verbose_name="Box Title (English)")
    box_subtitle_en = models.CharField(max_length=255, default="Official Contact & Administration Desk", verbose_name="Box Subtitle (English)")
    office_address_en = models.TextField(default="New Secretariat, Maligawatta, Colombo 10, Sri Lanka", verbose_name="Address (English)")
    cta_contact_button_text_en = models.CharField(max_length=100, default="Contact Secretariat", verbose_name="Button Text (English)")
    secondary_link_text_en = models.CharField(max_length=100, default="View Ministry Divisions", verbose_name="Secondary Link Text (English)")

    # 🇱🇰 Sinhala (සිංහල)
    box_title_si = models.CharField(max_length=255, blank=True, default="අමාත්‍ය ලේකම් කාර්යාලය", verbose_name="Box Title (සිංහල)")
    box_subtitle_si = models.CharField(max_length=255, blank=True, default="නිල සම්බන්ධතා සහ පරිපාලන අංශය", verbose_name="Box Subtitle (සිංහල)")
    office_address_si = models.TextField(blank=True, default="නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව", verbose_name="Address (සිංහල)")
    cta_contact_button_text_si = models.CharField(max_length=100, blank=True, default="ලේකම් කාර්යාලය අමතන්න", verbose_name="Button Text (සිංහල)")
    secondary_link_text_si = models.CharField(max_length=100, blank=True, default="අමාත්‍යාංශ අංශ බලන්න", verbose_name="Secondary Link Text (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    box_title_ta = models.CharField(max_length=255, blank=True, default="அமைச்சர் செயலக அலுவலகம்", verbose_name="Box Title (தமிழ்)")
    box_subtitle_ta = models.CharField(max_length=255, blank=True, default="உத்தியோகபூர்வ தொடர்பு மற்றும் நிர்வாகப் பிரிவு", verbose_name="Box Subtitle (தமிழ்)")
    office_address_ta = models.TextField(blank=True, default="புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை", verbose_name="Address (தமிழ்)")
    cta_contact_button_text_ta = models.CharField(max_length=100, blank=True, default="செயலகத்தைத் தொடர்பு கொள்ள", verbose_name="Button Text (தமிழ்)")
    secondary_link_text_ta = models.CharField(max_length=100, blank=True, default="அமைச்சின் பிரிவுகளைப் பார்க்க", verbose_name="Secondary Link Text (தமிழ்)")

    # Settings
    office_hours = models.CharField(max_length=100, default="8:30 AM – 4:15 PM")
    office_phone = models.CharField(max_length=100, default="+94 11 244 6183")
    office_email = models.EmailField(default="minister@fisheries.gov.lk")
    cta_contact_button_url = models.CharField(max_length=255, default="/contact")
    secondary_link_url = models.CharField(max_length=255, default="/about/divisions")

    class Meta:
        verbose_name = "03. Secretariat Office & Contact Desk"
        verbose_name_plural = "03. Secretariat Office & Contact Desk"

    def __str__(self) -> str:
        return f"Secretariat: {self.box_title_en}"
