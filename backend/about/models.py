from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def about_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"about/{timezone.now():%Y/%m}/{safe_filename}"


about_image_upload_path = about_upload_path
about_document_upload_path = about_upload_path


def validate_upload_size(value):
    pass



# ==========================================================
# 01. Ministry Overview & Key Public Pillars (Multilingual)
# ==========================================================
class AboutOverview(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Ministry Overview", verbose_name="Eyebrow (English)")
    title_en = models.CharField(max_length=255, default="Serving the fisheries sector and the nation", verbose_name="Title (English)")
    description_en = models.TextField(
        default="Fishing has a long tradition in Sri Lanka spanning over two thousand years. From traditional coastal livelihoods to a multibillion-rupee modern industry, the Ministry provides leadership, regulatory oversight, and sustainable development.",
        verbose_name="Description (English)"
    )
    legacy_title_en = models.CharField(max_length=255, default="Historical Legacy & Sector Evolution", verbose_name="Legacy Title (English)")
    legacy_content_en = models.TextField(
        default="Marine fishing has gradually developed from a traditional coastal livelihood activity to a multibillion-rupee industry since Sri Lanka obtained independence in 1948. Inland fishing and aquaculture are recent developments over the last 75 years, with coastal shrimp farming commencing in the 1980s and marine aquaculture expanding rapidly since 2010.",
        verbose_name="Legacy Content (English)"
    )
    economic_title_en = models.CharField(max_length=255, default="Economic Impact & Resource Base", verbose_name="Economic Title (English)")
    economic_content_en = models.TextField(
        default="The sector contributes around 1.4% to the national Gross Domestic Product (GDP), providing direct and indirect employment to approximately 575,000 individuals (3.7% of the nation's workforce). Annual fish production exceeds 530,000 metric tons valued at over USD 1.3 Billion, with export earnings topping USD 250 Million annually.",
        verbose_name="Economic Content (English)"
    )
    economic_subcontent_en = models.TextField(
        default="Local production currently satisfies 65% of national fish consumption. The Ministry is committed to fulfilling 100% of national consumption from local fisheries and sustainable aquaculture while expanding export revenues.",
        verbose_name="Economic Subcontent (English)"
    )
    stat_1_label_en = models.CharField(max_length=100, default="Sq km EEZ Zone", verbose_name="Stat 1 Label (English)")
    stat_2_label_en = models.CharField(max_length=100, default="Active Workforce", verbose_name="Stat 2 Label (English)")
    stat_3_label_en = models.CharField(max_length=100, default="MT Annual Yield", verbose_name="Stat 3 Label (English)")
    stat_4_label_en = models.CharField(max_length=100, default="Export Earnings", verbose_name="Stat 4 Label (English)")
    cta_button_text_en = models.CharField(max_length=100, default="Explore Ministry Institutions", verbose_name="CTA Button (English)")
    pillar_mandate_badge_en = models.CharField(max_length=100, default="Strategic Mandate", verbose_name="Pillar Badge (English)")
    pillar_mandate_title_en = models.CharField(max_length=100, default="Key Public Pillars", verbose_name="Pillar Title (English)")
    pillar_1_title_en = models.CharField(max_length=255, default="National fisheries development", verbose_name="Pillar 1 Title (English)")
    pillar_1_description_en = models.TextField(default="Supporting the responsible development of fisheries, aquaculture and related economic activities.", verbose_name="Pillar 1 Description (English)")
    pillar_2_title_en = models.CharField(max_length=255, default="Community-focused public services", verbose_name="Pillar 2 Title (English)")
    pillar_2_description_en = models.TextField(default="Improving access to information, services and institutional support for fisheries communities.", verbose_name="Pillar 2 Description (English)")
    pillar_3_title_en = models.CharField(max_length=255, default="Responsible resource management", verbose_name="Pillar 3 Title (English)")
    pillar_3_description_en = models.TextField(default="Promoting the sustainable use, conservation and protection of aquatic and ocean resources.", verbose_name="Pillar 3 Description (English)")
    benefit_banner_title_en = models.CharField(max_length=255, default="National Protein & Economic Security", verbose_name="Banner Title (English)")
    benefit_banner_text_en = models.TextField(default="Ensuring sustainable marine conservation while supplying nutritious food to Sri Lanka.", verbose_name="Banner Text (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="අමාත්‍යාංශ දළ විශ්ලේෂණය", verbose_name="Eyebrow (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="ධීවර ක්ෂේත්‍රයට සහ ජාතියට සේවය කිරීම", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="ශ්‍රී ලංකාවේ ධීවර කර්මාන්තයට වසර දෙදහසකට අධික දීර්ඝ ඉතිහාසයක් ඇත. සම්ප්‍රදායික වෙරළබඩ ජීවනෝපායේ සිට නවීන කර්මාන්තයක් දක්වා අමාත්‍යාංශය නායකත්වය සහ තිරසාර සංවර්ධනය සපයයි.", verbose_name="Description (සිංහල)")
    legacy_title_si = models.CharField(max_length=255, blank=True, default="ඓතිහාසික උරුමය සහ ක්ෂේත්‍ර පරිණාමය", verbose_name="Legacy Title (සිංහල)")
    legacy_content_si = models.TextField(blank=True, default="1948 නිදහස ලැබීමෙන් පසු සාගර ධීවර කර්මාන්තය බිලියන ගණනක ප්‍රධාන කර්මාන්තයක් බවට පත්විය. මිරිදිය ධීවර හා ජලජීවී වගාව පසුගිය වසර 75 තුළ වේගයෙන් වර්ධනය වී ඇත.", verbose_name="Legacy Content (සිංහල)")
    economic_title_si = models.CharField(max_length=255, blank=True, default="ආර්ථික දායකත්වය සහ සම්පත් පදනම", verbose_name="Economic Title (සිංහල)")
    economic_content_si = models.TextField(blank=True, default="මෙම ක්ෂේත්‍රය ජාතික දළ දේශීය නිෂ්පාදිතයට (GDP) 1.4% ක දායකත්වයක් සපයන අතර 575,000 කට අධික සෘජු හා වක්‍ර රැකියා නියුක්තියක් සපයයි.", verbose_name="Economic Content (සිංහල)")
    economic_subcontent_si = models.TextField(blank=True, default="දේශීය නිෂ්පාදනයෙන් ජාතික මත්ස්‍ය පරිභෝජනයෙන් 65% ක් සපුරාලන අතර එය 100% දක්වා ඉහළ නැංවීමට අමාත්‍යාංශය කැපවී සිටී.", verbose_name="Economic Subcontent (සිංහල)")
    stat_1_label_si = models.CharField(max_length=100, blank=True, default="විශේෂ ආර්ථික කලාපය (ව.කි.මී.)", verbose_name="Stat 1 Label (සිංහල)")
    stat_2_label_si = models.CharField(max_length=100, blank=True, default="ක්‍රියාකාරී ශ්‍රම බලකාය", verbose_name="Stat 2 Label (සිංහල)")
    stat_3_label_si = models.CharField(max_length=100, blank=True, default="වාර්ෂික අස්වැන්න (මෙ.ටොන්)", verbose_name="Stat 3 Label (සිංහල)")
    stat_4_label_si = models.CharField(max_length=100, blank=True, default="අපනයන ඉපැයීම්", verbose_name="Stat 4 Label (සිංහල)")
    cta_button_text_si = models.CharField(max_length=100, blank=True, default="අමාත්‍යාංශ ආයතන ගවේෂණය කරන්න", verbose_name="CTA Button (සිංහල)")
    pillar_mandate_badge_si = models.CharField(max_length=100, blank=True, default="උපායමාර්ගික මෙහෙවර", verbose_name="Pillar Badge (සිංහල)")
    pillar_mandate_title_si = models.CharField(max_length=100, blank=True, default="ප්‍රධාන මහජන කුළුණු", verbose_name="Pillar Title (සිංහල)")
    pillar_1_title_si = models.CharField(max_length=255, blank=True, default="ජාතික ධීවර සංවර්ධනය", verbose_name="Pillar 1 Title (සිංහල)")
    pillar_1_description_si = models.TextField(blank=True, default="ධීවර, ජලජීවී වගාව සහ ආශ්‍රිත ආර්ථික ක්‍රියාකාරකම් වගකීමෙන් යුතුව සංවර්ධනය කිරීම.", verbose_name="Pillar 1 Description (සිංහල)")
    pillar_2_title_si = models.CharField(max_length=255, blank=True, default="ප්‍රජා කේන්ද්‍රීය මහජන සේවා", verbose_name="Pillar 2 Title (සිංහල)")
    pillar_2_description_si = models.TextField(blank=True, default="ධීවර ප්‍රජාවන් සඳහා තොරතුරු, සේවා සහ ආයතනික සහාය ලබාගැනීමේ හැකියාව වැඩිදියුණු කිරීම.", verbose_name="Pillar 2 Description (සිංහල)")
    pillar_3_title_si = models.CharField(max_length=255, blank=True, default="වගකීම් සහගත සම්පත් කළමනාකරණය", verbose_name="Pillar 3 Title (සිංහල)")
    pillar_3_description_si = models.TextField(blank=True, default="ජලජ සහ සාගර සම්පත් තිරසාර ලෙස භාවිතා කිරීම, සංරක්ෂණය සහ ආරක්ෂා කිරීම ප්‍රවර්ධනය කිරීම.", verbose_name="Pillar 3 Description (සිංහල)")
    benefit_banner_title_si = models.CharField(max_length=255, blank=True, default="ජාතික ප්‍රෝටීන් සහ ආර්ථික සුරක්ෂිතතාව", verbose_name="Banner Title (සිංහල)")
    benefit_banner_text_si = models.TextField(blank=True, default="තිරසාර සාගර සංරක්ෂණය තහවුරු කරමින් ශ්‍රී ලංකාවට පෝෂ්‍යදායී ආහාර සැපයීම.", verbose_name="Banner Text (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="அமைச்சு கண்ணோட்டம்", verbose_name="Eyebrow (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="கடற்றொழில் துறைக்கும் நாட்டிற்கும் சேவை செய்தல்", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="இலங்கையில் கடற்றொழில் இரண்டாயிரம் ஆண்டுகளுக்கும் மேலான பாரம்பரியத்தைக் கொண்டுள்ளது. அமைச்சு தலைமைத்துவம் மற்றும் நிலையான வளர்ச்சியை வழங்குகிறது.", verbose_name="Description (தமிழ்)")
    legacy_title_ta = models.CharField(max_length=255, blank=True, default="வரலாற்றுப் பாரம்பரியம் மற்றும் துறைசார் பரிணாமம்", verbose_name="Legacy Title (தமிழ்)")
    legacy_content_ta = models.TextField(blank=True, default="1948 இல் சுதந்திரம் பெற்றதிலிருந்து கடல் மீன்பிடித்தல் பாரம்பரிய வாழ்வாதாரத்திலிருந்து பில்லியன் கணக்கான தொழிலாக உருவெடுத்துள்ளது.", verbose_name="Legacy Content (தமிழ்)")
    economic_title_ta = models.CharField(max_length=255, blank=True, default="பொருளாதார தாக்கம் மற்றும் வள தளம்", verbose_name="Economic Title (தமிழ்)")
    economic_content_ta = models.TextField(blank=True, default="இத்துறை தேசிய மொத்த உள்நாட்டு உற்பத்திக்கு (GDP) 1.4% பங்களிப்புடன் சுமார் 575,000 பேருக்கு நேரடி மற்றும் மறைமுக வேலைவாய்ப்பை வழங்குகிறது.", verbose_name="Economic Content (தமிழ்)")
    economic_subcontent_ta = models.TextField(blank=True, default="உள்நாட்டு உற்பத்தி தேசிய நுகர்வில் 65% ஐ பூர்த்தி செய்வதுடன், அதனை 100% ஆக உயர்த்துவதே அமைச்சின் நோக்கமாகும்.", verbose_name="Economic Subcontent (தமிழ்)")
    stat_1_label_ta = models.CharField(max_length=100, blank=True, default="பிரத்தியேக பொருளாதார வலயம் (ச.கி.மீ)", verbose_name="Stat 1 Label (தமிழ்)")
    stat_2_label_ta = models.CharField(max_length=100, blank=True, default="செயலில் உள்ள தொழிலாளர்கள்", verbose_name="Stat 2 Label (தமிழ்)")
    stat_3_label_ta = models.CharField(max_length=100, blank=True, default="வருடாந்த உற்பத்தி (மெ.தொன்)", verbose_name="Stat 3 Label (தமிழ்)")
    stat_4_label_ta = models.CharField(max_length=100, blank=True, default="ஏற்றுமதி வருமானம்", verbose_name="Stat 4 Label (தமிழ்)")
    cta_button_text_ta = models.CharField(max_length=100, blank=True, default="அமைச்சின் நிறுவனங்களை அணுகவும்", verbose_name="CTA Button (தமிழ்)")
    pillar_mandate_badge_ta = models.CharField(max_length=100, blank=True, default="மூலோபாய ஆணை", verbose_name="Pillar Badge (தமிழ்)")
    pillar_mandate_title_ta = models.CharField(max_length=100, blank=True, default="முக்கிய பொதுத் தூண்கள்", verbose_name="Pillar Title (தமிழ்)")
    pillar_1_title_ta = models.CharField(max_length=255, blank=True, default="தேசிய கடற்றொழில் அபிவிருத்தி", verbose_name="Pillar 1 Title (தமிழ்)")
    pillar_1_description_ta = models.TextField(blank=True, default="கடற்றொழில் மற்றும் நீரியல் உயிரின வளர்ப்பின் பொறுப்பான வளர்ச்சியை ஆதரித்தல்.", verbose_name="Pillar 1 Description (தமிழ்)")
    pillar_2_title_ta = models.CharField(max_length=255, blank=True, default="சமூகத்தை மையமாகக் கொண்ட பொதுச் சேவைகள்", verbose_name="Pillar 2 Title (தமிழ்)")
    pillar_2_description_ta = models.TextField(blank=True, default="மீன்பிடி சமூகங்களுக்கான தகவல், சேவைகள் மற்றும் நிறுவன ஆதரவை மேம்படுத்துதல்.", verbose_name="Pillar 2 Description (தமிழ்)")
    pillar_3_title_ta = models.CharField(max_length=255, blank=True, default="பொறுப்பான வள மேலாண்மை", verbose_name="Pillar 3 Title (தமிழ்)")
    pillar_3_description_ta = models.TextField(blank=True, default="நீரியல் மற்றும் கடல்சார் வளங்களின் நிலையான பயன்பாடு மற்றும் பாதுகாப்பை ஊக்குவித்தல்.", verbose_name="Pillar 3 Description (தமிழ்)")
    benefit_banner_title_ta = models.CharField(max_length=255, blank=True, default="தேசிய புரத மற்றும் பொருளாதார பாதுகாப்பு", verbose_name="Banner Title (தமிழ்)")
    benefit_banner_text_ta = models.TextField(blank=True, default="நிலையான கடல் பாதுகாப்பை உறுதி செய்யும் அதே வேளையில் போஷாக்கான உணவை வழங்குதல்.", verbose_name="Banner Text (தமிழ்)")

    # Values & Settings
    stat_1_value = models.CharField(max_length=50, default="517,000")
    stat_2_value = models.CharField(max_length=50, default="575,000")
    stat_3_value = models.CharField(max_length=50, default="530,000")
    stat_4_value = models.CharField(max_length=50, default="$250M+")
    cta_button_url = models.CharField(max_length=255, default="/institutions")

    class Meta:
        verbose_name = "01. Ministry Overview & Key Public Pillars"
        verbose_name_plural = "01. Ministry Overview & Key Public Pillars"

    def __str__(self) -> str:
        return f"Ministry Overview: {self.title_en}"


# ==========================================================
# 02. Vision & Mission Section (Multilingual)
# ==========================================================
class AboutVisionMission(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Our Direction", verbose_name="Eyebrow (English)")
    title_en = models.CharField(max_length=255, default="Vision and Mission", verbose_name="Title (English)")
    description_en = models.TextField(default="Guiding Sri Lanka's fisheries and ocean sector toward sustainable growth and community prosperity.", verbose_name="Description (English)")
    vision_badge_en = models.CharField(max_length=100, default="Vision", verbose_name="Vision Badge (English)")
    vision_heading_en = models.CharField(max_length=255, default="Sustainable Aquatic Wealth", verbose_name="Vision Heading (English)")
    vision_description_en = models.TextField(default="To be the leading contributor to the national economy through sustainable utilization and conservation of fisheries and ocean resources, ensuring nutritional security, enhanced livelihoods for fishing communities, and world-class aquatic stewardship.", verbose_name="Vision Description (English)")
    vision_footer_en = models.CharField(max_length=255, default="National Fisheries Sector Strategy", verbose_name="Vision Footer (English)")
    mission_badge_en = models.CharField(max_length=100, default="Mission", verbose_name="Mission Badge (English)")
    mission_heading_en = models.CharField(max_length=255, default="Empowered Fishing Communities", verbose_name="Mission Heading (English)")
    mission_description_en = models.TextField(default="Providing regulatory leadership, technological adoption, high-yield aquaculture, and social security for fishing communities while preserving marine ecosystems through evidence-based policies and transparent institutional governance.", verbose_name="Mission Description (English)")
    mission_footer_en = models.CharField(max_length=255, default="National Fisheries Sector Strategy", verbose_name="Mission Footer (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="අපගේ දැක්ම සහ මෙහෙවර", verbose_name="Eyebrow (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="දැක්ම සහ මෙහෙවර", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="ශ්‍රී ලංකාවේ ධීවර හා සාගර ක්ෂේත්‍රය තිරසාර වර්ධනයක් සහ ප්‍රජා සෞභාග්‍යය කරා මෙහෙයවීම.", verbose_name="Description (සිංහල)")
    vision_badge_si = models.CharField(max_length=100, blank=True, default="දැක්ම", verbose_name="Vision Badge (සිංහල)")
    vision_heading_si = models.CharField(max_length=255, blank=True, default="තිරසාර ජලජ සම්පත් සෞභාග්‍යය", verbose_name="Vision Heading (සිංහල)")
    vision_description_si = models.TextField(blank=True, default="ධීවර හා සාගර සම්පත් තිරසාර ලෙස උපයෝජනය හා සංරක්ෂණය තුළින් ජාතික ආර්ථිකයට ප්‍රමුඛතම දායකත්වය ලබාදීම.", verbose_name="Vision Description (සිංහල)")
    vision_footer_si = models.CharField(max_length=255, blank=True, default="ජාතික ධීවර ක්ෂේත්‍ර උපායමාර්ගය", verbose_name="Vision Footer (සිංහල)")
    mission_badge_si = models.CharField(max_length=100, blank=True, default="මෙහෙවර", verbose_name="Mission Badge (සිංහල)")
    mission_heading_si = models.CharField(max_length=255, blank=True, default="සවිබල ගැන්වුණු ධීවර ප්‍රජාව", verbose_name="Mission Heading (සිංහල)")
    mission_description_si = models.TextField(blank=True, default="නියාමන නායකත්වය, නවීන තාක්ෂණය, සාගර පරිසර පද්ධති ආරක්ෂා කරමින් ධීවර ප්‍රජාවන්ගේ සමාජ ආරක්ෂාව සහ ජීවන තත්ත්වය උසස් කිරීම.", verbose_name="Mission Description (සිංහල)")
    mission_footer_si = models.CharField(max_length=255, blank=True, default="ජාතික ධීවර ක්ෂේත්‍ර උපායමාර්ගය", verbose_name="Mission Footer (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="எமது வழிகாட்டல்", verbose_name="Eyebrow (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="தொலைநோக்கு மற்றும் பணிப்பொறுப்பு", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="இலங்கையின் கடற்றொழில் மற்றும் கடல்சார் துறையை நிலையான வளர்ச்சி நோக்கி வழிநடத்துதல்.", verbose_name="Description (தமிழ்)")
    vision_badge_ta = models.CharField(max_length=100, blank=True, default="தொலைநோக்கு", verbose_name="Vision Badge (தமிழ்)")
    vision_heading_ta = models.CharField(max_length=255, blank=True, default="நிலையான நீரியல் வளம்", verbose_name="Vision Heading (தமிழ்)")
    vision_description_ta = models.TextField(blank=True, default="கடற்றொழில் மற்றும் கடல்சார் வளங்களின் நிலையான பயன்பாடு மற்றும் பாதுகாப்பின் மூலம் தேசிய பொருளாதாரத்திற்கு முன்னணிப் பங்களிப்பை வழங்குதல்.", verbose_name="Vision Description (தமிழ்)")
    vision_footer_ta = models.CharField(max_length=255, blank=True, default="தேசிய கடற்றொழில் துறை மூலோபாயம்", verbose_name="Vision Footer (தமிழ்)")
    mission_badge_ta = models.CharField(max_length=100, blank=True, default="பணிப்பொறுப்பு", verbose_name="Mission Badge (தமிழ்)")
    mission_heading_ta = models.CharField(max_length=255, blank=True, default="வலுவூட்டப்பட்ட மீன்பிடி சமூகங்கள்", verbose_name="Mission Heading (தமிழ்)")
    mission_description_ta = models.TextField(blank=True, default="ஒழுங்குமுறை தலைமைத்துவம், தொழில்நுட்ப தத்தெடுப்பு மற்றும் கடல் சுற்றுச்சூழல் அமைப்புகளைப் பாதுகாத்து மீனவ சமூகங்களை மேம்படுத்துதல்.", verbose_name="Mission Description (தமிழ்)")
    mission_footer_ta = models.CharField(max_length=255, blank=True, default="தேசிய கடற்றொழில் துறை மூலோபாயம்", verbose_name="Mission Footer (தமிழ்)")

    class Meta:
        verbose_name = "02. Vision & Mission Section"
        verbose_name_plural = "02. Vision & Mission Section"

    def __str__(self) -> str:
        return f"Vision & Mission: {self.title_en}"


# ==========================================================
# 03. Policy Objectives : Header (Multilingual)
# ==========================================================
class AboutObjectiveHeader(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Policy Objectives", verbose_name="Eyebrow (English)")
    title_en = models.CharField(max_length=255, default="Objectives of the Sector Policy", verbose_name="Title (English)")
    description_en = models.TextField(default="The Government envisages achieving the following objectives from implementation of the new Policy in the fisheries and aquaculture sector.", verbose_name="Description (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="ප්‍රතිපත්ති අරමුණු", verbose_name="Eyebrow (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="ක්ෂේත්‍ර ප්‍රතිපත්තියේ අරමුණු", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="ධීවර හා ජලජීවී වගා ක්ෂේත්‍රයේ නව ප්‍රතිපත්තිය ක්‍රියාත්මක කිරීමෙන් පහත අරමුණු සාක්ෂාත් කර ගැනීමට රජය අපේක්ෂා කරයි.", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="கொள்கை நோக்கங்கள்", verbose_name="Eyebrow (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="துறைக் கொள்கையின் நோக்கங்கள்", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="கடற்றொழில் மற்றும் நீரியல் உயிரின வளர்ப்புத் துறையில் புதிய கொள்கையை நடைமுறைப்படுத்துவதன் மூலம் பின்வரும் நோக்கங்களை அடைவதை அரசாங்கம் நோக்கமாகக் கொண்டுள்ளது.", verbose_name="Description (தமிழ்)")

    class Meta:
        verbose_name = "03. Policy Objectives : Header"
        verbose_name_plural = "03. Policy Objectives : Header"

    def __str__(self) -> str:
        return f"Objectives Header: {self.title_en}"


# ==========================================================
# 04. Policy Objectives : Cards (Multilingual)
# ==========================================================
class AboutObjective(TimeStampedModel):
    order = models.PositiveIntegerField(default=1, db_index=True)
    number_badge = models.CharField(max_length=10, default="01")
    icon_name = models.CharField(max_length=50, default="Database")

    # 🇬🇧 English
    title_en = models.CharField(max_length=255, default="", verbose_name="Title (English)")
    description_en = models.TextField(default="", verbose_name="Description (English)")

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Description (தமிழ்)")

    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "04. Policy Objectives : Card"
        verbose_name_plural = "04. Policy Objectives : Cards"

    def __str__(self) -> str:
        return f"{self.number_badge}. {self.title_en}"


# ==========================================================
# 05. Ministry Leadership : Header (Multilingual)
# ==========================================================
class AboutLeadershipHeader(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Leadership", verbose_name="Eyebrow (English)")
    title_en = models.CharField(max_length=255, default="Ministry leadership", verbose_name="Title (English)")
    description_en = models.TextField(default="Executive leadership of the Ministry of Fisheries, Aquatic and Ocean Resources.", verbose_name="Description (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="නායකත්වය", verbose_name="Eyebrow (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="අමාත්‍යාංශ නායකත්වය", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශයේ විධායක නායකත්වය.", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="தலைமைத்துவம்", verbose_name="Eyebrow (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="அமைச்சின் தலைமைத்துவம்", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சின் நிறைவேற்று தலைமைத்துவம்.", verbose_name="Description (தமிழ்)")

    class Meta:
        verbose_name = "05. Ministry Leadership : Header"
        verbose_name_plural = "05. Ministry Leadership : Header"

    def __str__(self) -> str:
        return f"Leadership Header: {self.title_en}"


# ==========================================================
# 06. Executive Leadership Profiles : Cards (Multilingual)
# ==========================================================
class AboutLeader(TimeStampedModel):
    ROLE_CHOICES = [
        ("minister", "Hon. Cabinet Minister"),
        ("deputy_minister", "Hon. Deputy Minister"),
        ("secretary", "Ministry Secretary"),
    ]

    role_type = models.CharField(max_length=30, choices=ROLE_CHOICES, unique=True)
    order = models.PositiveIntegerField(default=1, db_index=True)

    # 🇬🇧 English
    name_en = models.CharField(max_length=255, default="", verbose_name="Name (English)")
    role_title_en = models.CharField(max_length=255, default="", verbose_name="Role Title (English)")
    ministry_badge_en = models.CharField(max_length=255, default="Ministry of Fisheries, Aquatic and Ocean Resources", verbose_name="Ministry Badge (English)")
    short_description_en = models.TextField(default="", verbose_name="Short Description (English)")
    message_title_en = models.CharField(max_length=255, default="Official Leadership Message", verbose_name="Message Title (English)")
    message_content_en = models.TextField(default="", verbose_name="Message Content (English)")
    office_address_en = models.TextField(default="New Secretariat, Maligawatta, Colombo 10, Sri Lanka", verbose_name="Office Address (English)")

    # 🇱🇰 Sinhala (සිංහල)
    name_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Name (සිංහල)")
    role_title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Role Title (සිංහල)")
    ministry_badge_si = models.CharField(max_length=255, blank=True, default="ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය", verbose_name="Ministry Badge (සිංහල)")
    short_description_si = models.TextField(blank=True, default="", verbose_name="Short Description (සිංහල)")
    message_title_si = models.CharField(max_length=255, blank=True, default="නිල නායකත්ව පණිවිඩය", verbose_name="Message Title (සිංහල)")
    message_content_si = models.TextField(blank=True, default="", verbose_name="Message Content (සිංහල)")
    office_address_si = models.TextField(blank=True, default="නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව", verbose_name="Office Address (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    name_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Name (தமிழ்)")
    role_title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Role Title (தமிழ்)")
    ministry_badge_ta = models.CharField(max_length=255, blank=True, default="கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு", verbose_name="Ministry Badge (தமிழ்)")
    short_description_ta = models.TextField(blank=True, default="", verbose_name="Short Description (தமிழ்)")
    message_title_ta = models.CharField(max_length=255, blank=True, default="உத்தியோகபூர்வ தலைமைத்துவச் செய்தி", verbose_name="Message Title (தமிழ்)")
    message_content_ta = models.TextField(blank=True, default="", verbose_name="Message Content (தமிழ்)")
    office_address_ta = models.TextField(blank=True, default="புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை", verbose_name="Office Address (தமிழ்)")

    # Photo & Settings
    photo = models.ImageField(upload_to=about_upload_path, blank=True, null=True)
    photo_fallback = models.CharField(max_length=255, blank=True, default="/images/leadership/minister.jpg")
    photo_alt = models.CharField(max_length=255, blank=True, default="Official leadership portrait")
    office_phone = models.CharField(max_length=100, default="+94 112 327 060")
    office_email = models.EmailField(default="info@fisheries.gov.lk")
    office_hours = models.CharField(max_length=200, default="8:30 AM – 4:15 PM")
    page_url = models.CharField(max_length=255, default="/about/minister")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "06. Executive Leadership Profile"
        verbose_name_plural = "06. Executive Leadership Profiles"

    def __str__(self) -> str:
        return f"{self.get_role_type_display()} - {self.name_en}"


# ==========================================================
# 07. Organizational Structure & Chart (Multilingual)
# ==========================================================
class AboutOrganizationStructure(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Administration", verbose_name="Eyebrow (English)")
    title_en = models.CharField(max_length=255, default="Organizational structure", verbose_name="Title (English)")
    description_en = models.TextField(default="View the official administrative and institutional structure of the Ministry.", verbose_name="Description (English)")
    chart_box_title_en = models.CharField(max_length=255, default="Ministry organizational chart", verbose_name="Chart Title (English)")
    chart_box_subtitle_en = models.CharField(max_length=255, default="Official administrative reporting structure", verbose_name="Chart Subtitle (English)")
    executive_notes_en = models.TextField(default="On smaller screens, scroll horizontally to examine the complete organizational chart or select 'View full size'.", verbose_name="Executive Notes (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="පරිපාලනය", verbose_name="Eyebrow (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="සංවිධාන ව්‍යුහය", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="අමාත්‍යාංශයේ නිල පරිපාලන සහ ආයතනික ව්‍යුහය නිරීක්ෂණය කරන්න.", verbose_name="Description (සිංහල)")
    chart_box_title_si = models.CharField(max_length=255, blank=True, default="අමාත්‍යාංශ සංවිධාන සටහන", verbose_name="Chart Title (සිංහල)")
    chart_box_subtitle_si = models.CharField(max_length=255, blank=True, default="නිල පරිපාලන වාර්තාකරණ ව්‍යුහය", verbose_name="Chart Subtitle (සිංහල)")
    executive_notes_si = models.TextField(blank=True, default="කුඩා තිර සඳහා, සම්පූර්ණ සංවිධාන සටහන පරීක්ෂා කිරීමට තිරස් අතට අනුචලනය කරන්න හෝ 'සම්පූර්ණ ප්‍රමාණය බලන්න' තෝරන්න.", verbose_name="Executive Notes (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="நிர்வாகம்", verbose_name="Eyebrow (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="நிறுவனக் கட்டமைப்பு", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="அமைச்சின் உத்தியோகபூர்வ நிர்வாக மற்றும் நிறுவன கட்டமைப்பைப் பார்வையிடவும்.", verbose_name="Description (தமிழ்)")
    chart_box_title_ta = models.CharField(max_length=255, blank=True, default="அமைச்சு நிறுவன வரைபடம்", verbose_name="Chart Title (தமிழ்)")
    chart_box_subtitle_ta = models.CharField(max_length=255, blank=True, default="உத்தியோகபூர்வ நிர்வாக அறிக்கை கட்டமைப்பு", verbose_name="Chart Subtitle (தமிழ்)")
    executive_notes_ta = models.TextField(blank=True, default="சிறிய திரைகளில் முழு வரைபடத்தைப் பார்க்க கிடைமட்டமாக உருட்டவும் அல்லது 'முழு அளவில் பார்க்க' என்பதைத் தேர்ந்தெடுக்கவும்.", verbose_name="Executive Notes (தமிழ்)")

    # Media & Settings
    chart_image = models.ImageField(upload_to=about_upload_path, blank=True, null=True)
    chart_fallback = models.CharField(max_length=255, blank=True, default="/images/about/organizational-structure.jpg")
    chart_pdf = models.FileField(upload_to=about_upload_path, blank=True, null=True)

    class Meta:
        verbose_name = "07. Organizational Structure & Chart"
        verbose_name_plural = "07. Organizational Structure & Chart"

    def __str__(self) -> str:
        return f"Organization Structure: {self.title_en}"


# ==========================================================
# 08. Historical Timeline : Header (Multilingual)
# ==========================================================
class AboutTimelineHeader(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Our journey", verbose_name="Eyebrow (English)")
    title_en = models.CharField(max_length=255, default="Ministry history and development", verbose_name="Title (English)")
    description_en = models.TextField(default="Key historical milestones shaping Sri Lanka's fisheries and ocean resources management.", verbose_name="Description (English)")

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="අපගේ ගමන් මග", verbose_name="Eyebrow (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="අමාත්‍යාංශ ඉතිහාසය සහ සංවර්ධනය", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="ශ්‍රී ලංකාවේ ධීවර හා සාගර සම්පත් කළමනාකරණය හැඩගස්වන ප්‍රධාන ඓතිහාසික සන්ධිස්ථාන.", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="எமது பயணம்", verbose_name="Eyebrow (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="அமைச்சின் வரலாறும் வளர்ச்சியும்", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="இலங்கையின் கடற்றொழில் மற்றும் கடல்சார் வளங்கள் முகாமைத்துவத்தை வடிவமைத்த முக்கிய வரலாற்று மைல்கற்கள்.", verbose_name="Description (தமிழ்)")

    class Meta:
        verbose_name = "08. Historical Timeline : Header"
        verbose_name_plural = "08. Historical Timeline : Header"

    def __str__(self) -> str:
        return f"Timeline Header: {self.title_en}"


# ==========================================================
# 09. Historical Milestones & Timeline Events (Multilingual)
# ==========================================================
class AboutTimelineEvent(TimeStampedModel):
    order = models.PositiveIntegerField(default=1, db_index=True)
    year = models.CharField(max_length=50, default="")

    # 🇬🇧 English
    title_en = models.CharField(max_length=255, default="", verbose_name="Title (English)")
    description_en = models.TextField(default="", verbose_name="Description (English)")
    status_badge_en = models.CharField(max_length=100, default="Historical milestone", verbose_name="Badge (English)")

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Title (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Description (සිංහල)")
    status_badge_si = models.CharField(max_length=100, blank=True, default="ඓතිහාසික සන්ධිස්ථානය", verbose_name="Badge (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Description (தமிழ்)")
    status_badge_ta = models.CharField(max_length=100, blank=True, default="வரலாற்று மைல்கல்", verbose_name="Badge (தமிழ்)")

    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "09. Historical Milestone & Timeline Event"
        verbose_name_plural = "09. Historical Milestones & Timeline Events"

    def __str__(self) -> str:
        return f"[{self.year}] {self.title_en}"