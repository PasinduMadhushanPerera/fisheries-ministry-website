from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def secretary_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"secretary/{timezone.now():%Y/%m}/{safe_filename}"


# ==========================================================
# 01. Secretary Profile & Official Portrait (Multilingual)
# ==========================================================
class SecretaryProfile(TimeStampedModel):
    # 🇬🇧 English
    badge_en = models.CharField(max_length=100, default="Ministry Secretary", verbose_name="Badge (English)")
    name_en = models.CharField(max_length=255, default="Mr. B.K. Kolitha Kamal Jinadasa (PHD)", verbose_name="Name (English)")
    role_title_en = models.CharField(
        max_length=255,
        default="Secretary to the Ministry of Fisheries, Aquatic and Ocean Resources",
        verbose_name="Role Title (English)"
    )
    ministry_badge_en = models.CharField(
        max_length=255,
        default="Ministry of Fisheries, Aquatic and Ocean Resources",
        verbose_name="Ministry Badge (English)"
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_si = models.CharField(max_length=100, blank=True, default="අමාත්‍යාංශ ලේකම්", verbose_name="Badge (සිංහල)")
    name_si = models.CharField(max_length=255, blank=True, default="බී.කේ. කොලිත කමල් ජිනදාස (ආචාර්ය) මයා", verbose_name="Name (සිංහල)")
    role_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශයේ ලේකම්",
        verbose_name="Role Title (සිංහල)"
    )
    ministry_badge_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය",
        verbose_name="Ministry Badge (සිංහල)"
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_ta = models.CharField(max_length=100, blank=True, default="அமைச்சின் செயலாளர்", verbose_name="Badge (தமிழ்)")
    name_ta = models.CharField(max_length=255, blank=True, default="திரு. பி.கே. கொலித கமல் ஜினதாச (கலாநிதி)", verbose_name="Name (தமிழ்)")
    role_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சின் செயலாளர்",
        verbose_name="Role Title (தமிழ்)"
    )
    ministry_badge_ta = models.CharField(
        max_length=255,
        blank=True,
        default="கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு",
        verbose_name="Ministry Badge (தமிழ்)"
    )

    # Media
    photo = models.ImageField(upload_to=secretary_upload_path, blank=True, null=True)
    photo_fallback = models.CharField(max_length=255, blank=True, default="/images/leadership/secretary.jpg")
    photo_alt = models.CharField(max_length=255, blank=True, default="Official portrait of Mr. B.K. Kolitha Kamal Jinadasa (PHD)")

    class Meta:
        verbose_name = "01. Secretary Profile & Official Portrait"
        verbose_name_plural = "01. Secretary Profile & Official Portrait"

    def __str__(self) -> str:
        return f"{self.name_en} ({self.badge_en})"


# ==========================================================
# 02. Secretary's Official Statement (Multilingual)
# ==========================================================
class SecretaryMessage(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Secretary's Official Statement", verbose_name="Eyebrow (English)")
    message_title_en = models.CharField(
        max_length=255,
        default="Ensuring Administrative Excellence & Sustainable Governance",
        verbose_name="Message Title (English)"
    )
    message_content_en = models.TextField(
        default="Our focus is to ensure transparent public administration, efficient resource allocation, scientific research integration, and seamless coordination across DFAR, NARA, NAQDA, and CFHC to serve Sri Lanka's fisheries sector effectively.",
        verbose_name="Message Content (English)"
    )
    quote_author_en = models.CharField(max_length=255, default="Mr. B.K. Kolitha Kamal Jinadasa (PHD)", verbose_name="Quote Author (English)")
    quote_designation_en = models.CharField(max_length=255, default="Secretary to the Ministry", verbose_name="Quote Designation (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="ලේකම්තුමාගේ නිල ප්‍රකාශය", verbose_name="Eyebrow (සිංහල)")
    message_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="පරිපාලන විශිෂ්ටත්වය සහ තිරසාර පාලනය සහතික කිරීම",
        verbose_name="Message Title (සිංහල)"
    )
    message_content_si = models.TextField(
        blank=True,
        default="අපගේ අරමුණ වන්නේ පාරදෘශ්‍ය රාජ්‍ය පරිපාලනය, කාර්යක්ෂම සම්පත් බෙදාහැරීම, විද්‍යාත්මක පර්යේෂණ ඒකාබද්ධ කිරීම සහ ධීවර හා ජලජ සම්පත් දෙපාර්තමේන්තුව, නාරා, නැක්ඩා සහ ධීවර වරාය නීතිගත සංස්ථාව හරහා මනා සම්බන්ධීකරණයකින් ශ්‍රී ලංකාවේ ධීවර ක්ෂේත්‍රයට විශිෂ්ට සේවාවක් සැපයීමයි.",
        verbose_name="Message Content (සිංහල)"
    )
    quote_author_si = models.CharField(max_length=255, blank=True, default="බී.කේ. කොලිත කමල් ජිනදාස (ආචාර්ය) මයා", verbose_name="Quote Author (සිංහල)")
    quote_designation_si = models.CharField(max_length=255, blank=True, default="අමාත්‍යාංශ ලේකම්", verbose_name="Quote Designation (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="செயலாளரின் உத்தியோகபூர்வ அறிக்கை", verbose_name="Eyebrow (தமிழ்)")
    message_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="நிர்வாக சிறப்பு மற்றும் நிலையான நிர்வாகத்தை உறுதி செய்தல்",
        verbose_name="Message Title (தமிழ்)"
    )
    message_content_ta = models.TextField(
        blank=True,
        default="வெளிப்படையான பொது நிர்வாகத்தை உறுதி செய்தல், வளங்களை திறம்பட ஒதுக்கீடு செய்தல் மற்றும் DFAR, NARA, NAQDA மற்றும் CFHC ஆகியவற்றுக்கிடையே தடையற்ற ஒருங்கிணைப்பை ஏற்படுத்துவதே எமது நோக்கமாகும்.",
        verbose_name="Message Content (தமிழ்)"
    )
    quote_author_ta = models.CharField(max_length=255, blank=True, default="திரு. பி.கே. கொலித கமல் ஜினதாச (கலாநிதி)", verbose_name="Quote Author (தமிழ்)")
    quote_designation_ta = models.CharField(max_length=255, blank=True, default="அமைச்சின் செயலாளர்", verbose_name="Quote Designation (தமிழ்)")

    class Meta:
        verbose_name = "02. Secretary's Official Statement"
        verbose_name_plural = "02. Secretary's Official Statement"

    def __str__(self) -> str:
        return f"Statement: {self.message_title_en}"


# ==========================================================
# 03. Secretary's Office Contact & Administration Desk (Multilingual)
# ==========================================================
class SecretarySecretariat(TimeStampedModel):
    # 🇬🇧 English
    box_title_en = models.CharField(max_length=255, default="Secretary's Office Contact Details", verbose_name="Box Title (English)")
    box_subtitle_en = models.CharField(max_length=255, default="Executive Administration & Governance Desk", verbose_name="Box Subtitle (English)")
    office_address_en = models.TextField(default="Ministry of Fisheries, New Secretariat, Maligawatta, Colombo 10, Sri Lanka", verbose_name="Address (English)")
    cta_contact_button_text_en = models.CharField(max_length=100, default="Contact Secretary Office", verbose_name="Button Text (English)")
    secondary_link_text_en = models.CharField(max_length=100, default="View Organization Structure", verbose_name="Secondary Link Text (English)")

    # 🇱🇰 Sinhala (සිංහල)
    box_title_si = models.CharField(max_length=255, blank=True, default="ලේකම් කාර්යාල සම්බන්ධතා විස්තර", verbose_name="Box Title (සිංහල)")
    box_subtitle_si = models.CharField(max_length=255, blank=True, default="විධායක පරිපාලන සහ පාලන අංශය", verbose_name="Box Subtitle (සිංහල)")
    office_address_si = models.TextField(blank=True, default="ධීවර අමාත්‍යාංශය, නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව", verbose_name="Address (සිංහල)")
    cta_contact_button_text_si = models.CharField(max_length=100, blank=True, default="ලේකම් කාර්යාලය අමතන්න", verbose_name="Button Text (සිංහල)")
    secondary_link_text_si = models.CharField(max_length=100, blank=True, default="සංවිධාන ව්‍යුහය බලන්න", verbose_name="Secondary Link Text (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    box_title_ta = models.CharField(max_length=255, blank=True, default="செயலாளர் அலுவலக தொடர்பு விவரங்கள்", verbose_name="Box Title (தமிழ்)")
    box_subtitle_ta = models.CharField(max_length=255, blank=True, default="நிறைவேற்று நிர்வாகப் பிரிவு", verbose_name="Box Subtitle (தமிழ்)")
    office_address_ta = models.TextField(blank=True, default="கடற்றொழில் அமைச்சு, புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை", verbose_name="Address (தமிழ்)")
    cta_contact_button_text_ta = models.CharField(max_length=100, blank=True, default="செயலாளர் அலுவலகத்தைத் தொடர்பு கொள்ள", verbose_name="Button Text (தமிழ்)")
    secondary_link_text_ta = models.CharField(max_length=100, blank=True, default="நிறுவனக் கட்டமைப்பைப் பார்க்க", verbose_name="Secondary Link Text (தமிழ்)")

    # Settings
    office_hours = models.CharField(max_length=100, default="8:30 AM – 4:15 PM")
    office_phone = models.CharField(max_length=100, default="+94 112 327 060")
    office_email = models.EmailField(default="secretary@fisheries.gov.lk")
    cta_contact_button_url = models.CharField(max_length=255, default="/contact")
    secondary_link_url = models.CharField(max_length=255, default="/about/organization-structure")

    class Meta:
        verbose_name = "03. Office Contact & Administration Desk"
        verbose_name_plural = "03. Office Contact & Administration Desk"

    def __str__(self) -> str:
        return f"Office: {self.box_title_en}"
