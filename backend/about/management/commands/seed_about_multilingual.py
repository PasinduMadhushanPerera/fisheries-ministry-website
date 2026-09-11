from django.core.management.base import BaseCommand
from about.models import (
    AboutOverview,
    AboutVisionMission,
    AboutObjectiveHeader,
    AboutObjective,
    AboutLeadershipHeader,
    AboutLeader,
    AboutOrganizationStructure,
    AboutTimelineHeader,
    AboutTimelineEvent,
)
from minister_profile.models import MinisterProfile, MinisterMessage, MinisterSecretariat
from deputy_minister_profile.models import DeputyMinisterProfile, DeputyMinisterMessage, DeputyMinisterSecretariat
from secretary_profile.models import SecretaryProfile, SecretaryMessage, SecretarySecretariat
from divisions_page.models import DivisionsPageIntro, MinistryDivision
from organization_structure.models import OrganizationStructureChart


class Command(BaseCommand):
    help = "Seed rich authentic English, Sinhala, and Tamil data for all About Us pages"

    def handle(self, *args, **options):
        self.stdout.write("Seeding multilingual data for About Us pages...")

        # -----------------------------------------------------------------
        # 1. About Overview
        # -----------------------------------------------------------------
        overview, _ = AboutOverview.objects.get_or_create(id=1)
        overview.eyebrow_en = "Ministry Overview"
        overview.eyebrow_si = "අමාත්‍යාංශ දළ විශ්ලේෂණය"
        overview.eyebrow_ta = "அமைச்சு கண்ணோட்டம்"

        overview.title_en = "Serving the fisheries sector and the nation"
        overview.title_si = "ධීවර ක්ෂේත්‍රයට සහ ජාතියට සේවය කිරීම"
        overview.title_ta = "கடற்றொழில் துறைக்கும் நாட்டிற்கும் சேவை செய்தல்"

        overview.description_en = "Fishing has a long tradition in Sri Lanka spanning over two thousand years. From traditional coastal livelihoods to a multibillion-rupee modern industry, the Ministry provides leadership, regulatory oversight, and sustainable development."
        overview.description_si = "ශ්‍රී ලංකාවේ ධීවර කර්මාන්තයට වසර දෙදහසකට අධික දීර්ඝ ඉතිහාසයක් ඇත. සම්ප්‍රදායික වෙරළබඩ ජීවනෝපායේ සිට නවීන කර්මාන්තයක් දක්වා අමාත්‍යාංශය නායකත්වය සහ තිරසාර සංවර්ධනය සපයයි."
        overview.description_ta = "இலங்கையில் கடற்றொழில் இரண்டாயிரம் ஆண்டுகளுக்கும் மேலான பாரம்பரியத்தைக் கொண்டுள்ளது. பாரம்பரிய கரையோர வாழ்வாதாரத்திலிருந்து நவீன தொழில் வரை அமைச்சு தலைமைத்துவத்தை வழங்குகிறது."

        overview.legacy_title_en = "Historical Legacy & Sector Evolution"
        overview.legacy_title_si = "ඓතිහාසික උරුමය සහ ක්ෂේත්‍ර පරිණාමය"
        overview.legacy_title_ta = "வரலாற்றுப் பாரம்பரியம் மற்றும் துறைசார் பரிணாமம்"

        overview.legacy_content_en = "Marine fishing has gradually developed from a traditional coastal livelihood activity to a multibillion-rupee industry since Sri Lanka obtained independence in 1948. Inland fishing and aquaculture are recent developments over the last 75 years, with coastal shrimp farming commencing in the 1980s and marine aquaculture expanding rapidly since 2010."
        overview.legacy_content_si = "1948 නිදහස ලැබීමෙන් පසු සාගර ධීවර කර්මාන්තය බිලියන ගණනක ප්‍රධාන කර්මාන්තයක් බවට පත්විය. මිරිදිය ධීවර හා ජලජීවී වගාව පසුගිය වසර 75 තුළ වේගයෙන් වර්ධනය වී ඇති අතර 1980 ගණන්වල ඉස්සන් වගාව සහ 2010 සිට සාගර ජලජීවී වගාව පුළුල් විය."
        overview.legacy_content_ta = "1948 இல் சுதந்திரம் பெற்றதிலிருந்து கடல் மீன்பிடித்தல் ஒரு பிரதான தொழிலாக உருவெடுத்துள்ளது. நன்னீர் மீன்பிடி மற்றும் நீர்வாழ் உயிரின வளர்ப்பு கடந்த 75 ஆண்டுகளில் வேகமாக வளர்ச்சியடைந்துள்ளது."

        overview.economic_title_en = "Economic Impact & Resource Base"
        overview.economic_title_si = "ආර්ථික දායකත්වය සහ සම්පත් පදනම"
        overview.economic_title_ta = "பொருளாதார தாக்கம் மற்றும் வள தளம்"

        overview.economic_content_en = "The sector contributes around 1.4% to the national Gross Domestic Product (GDP), providing direct and indirect employment to approximately 575,000 individuals (3.7% of the nation's workforce). Annual fish production exceeds 530,000 metric tons valued at over USD 1.3 Billion, with export earnings topping USD 250 Million annually."
        overview.economic_content_si = "මෙම ක්ෂේත්‍රය ජාතික දළ දේශීය නිෂ්පාදිතයට (GDP) 1.4% ක දායකත්වයක් සපයන අතර 575,000 කට අධික සෘජු හා වක්‍ර රැකියා නියුක්තියක් සපයයි. වාර්ෂික මත්ස්‍ය නිෂ්පාදනය මෙට්‍රික් ටොන් 530,000 ඉක්මවන අතර අපනයන ආදායම ඇ.ඩො. මිලියන 250 ඉක්මවයි."
        overview.economic_content_ta = "இத்துறை தேசிய மொத்த உள்நாட்டு உற்பத்திக்கு (GDP) 1.4% பங்களிப்புடன் சுமார் 575,000 பேருக்கு வேலைவாய்ப்பை வழங்குகிறது. வருடாந்த உற்பத்தி 530,000 மெட்ரிக் தொன்னைத் தாண்டுகிறது."

        overview.economic_subcontent_en = "Local production currently satisfies 65% of national fish consumption. The Ministry is committed to fulfilling 100% of national consumption from local fisheries and sustainable aquaculture while expanding export revenues."
        overview.economic_subcontent_si = "දේශීය නිෂ්පාදනයෙන් ජාතික මත්ස්‍ය පරිභෝජනයෙන් 65% ක් සපුරාලන අතර එය 100% දක්වා ඉහළ නැංවීමට සහ අපනයන ආදායම පුළුල් කිරීමට අමාත්‍යාංශය කැපවී සිටී."
        overview.economic_subcontent_ta = "உள்நாட்டு உற்பத்தி தேசிய நுகர்வில் 65% ஐ பூர்த்தி செய்வதுடன், அதனை 100% ஆக உயர்த்துவதே அமைச்சின் நோக்கமாகும்."

        overview.stat_1_value = "517,000"
        overview.stat_1_label_en = "Sq km EEZ Zone"
        overview.stat_1_label_si = "විශේෂ ආර්ථික කලාපය (ව.කි.මී.)"
        overview.stat_1_label_ta = "பிரத்தியேக பொருளாதார வலயம் (ச.கி.மீ)"

        overview.stat_2_value = "575,000"
        overview.stat_2_label_en = "Active Workforce"
        overview.stat_2_label_si = "ක්‍රියාකාරී ශ්‍රම බලකාය"
        overview.stat_2_label_ta = "செயலில் உள்ள தொழிலாளர்கள்"

        overview.stat_3_value = "530,000"
        overview.stat_3_label_en = "MT Annual Yield"
        overview.stat_3_label_si = "වාර්ෂික අස්වැන්න (මෙ.ටොන්)"
        overview.stat_3_label_ta = "வருடாந்த உற்பத்தி (மெ.தொன்)"

        overview.stat_4_value = "$250M+"
        overview.stat_4_label_en = "Export Earnings"
        overview.stat_4_label_si = "අපනයන ඉපැයීම්"
        overview.stat_4_label_ta = "ஏற்றுமதி வருமானம்"

        overview.cta_button_text_en = "Explore Ministry Institutions"
        overview.cta_button_text_si = "අමාත්‍යාංශ ආයතන ගවේෂණය කරන්න"
        overview.cta_button_text_ta = "அமைச்சின் நிறுவனங்களை அணுகவும்"
        overview.cta_button_url = "/institutions"

        overview.pillar_mandate_badge_en = "Strategic Mandate"
        overview.pillar_mandate_badge_si = "උපායමාර්ගික මෙහෙවර"
        overview.pillar_mandate_badge_ta = "மூலோபாய ஆணை"

        overview.pillar_mandate_title_en = "Key Public Pillars"
        overview.pillar_mandate_title_si = "ප්‍රධාන මහජන කුළුණු"
        overview.pillar_mandate_title_ta = "முக்கிய பொதுத் தூண்கள்"

        overview.pillar_1_title_en = "National fisheries development"
        overview.pillar_1_title_si = "ජාතික ධීවර සංවර්ධනය"
        overview.pillar_1_title_ta = "தேசிய கடற்றொழில் அபிவிருத்தி"
        overview.pillar_1_description_en = "Supporting the responsible development of fisheries, aquaculture and related economic activities."
        overview.pillar_1_description_si = "ධීවර, ජලජීවී වගාව සහ ආශ්‍රිත ආර්ථික ක්‍රියාකාරකම් වගකීමෙන් යුතුව සංවර්ධනය කිරීම."
        overview.pillar_1_description_ta = "கடற்றொழில் மற்றும் நீரியல் உயிரின வளர்ப்பின் பொறுப்பான வளர்ச்சியை ஆதரித்தல்."

        overview.pillar_2_title_en = "Community-focused public services"
        overview.pillar_2_title_si = "ප්‍රජා කේන්ද්‍රීය මහජන සේවා"
        overview.pillar_2_title_ta = "சமூகத்தை மையமாகக் கொண்ட பொதுச் சேவைகள்"
        overview.pillar_2_description_en = "Improving access to information, services and institutional support for fisheries communities."
        overview.pillar_2_description_si = "ධීවර ප්‍රජාවන් සඳහා තොරතුරු, සේවා සහ ආයතනික සහාය ලබාගැනීමේ හැකියාව වැඩිදියුණු කිරීම."
        overview.pillar_2_description_ta = "மீன்பிடி சமூகங்களுக்கான தகவல், சேவைகள் மற்றும் நிறுவன ஆதரவை மேம்படுத்துதல்."

        overview.pillar_3_title_en = "Responsible resource management"
        overview.pillar_3_title_si = "වගකීම් සහගත සම්පත් කළමනාකරණය"
        overview.pillar_3_title_ta = "பொறுப்பான வள மேலாண்மை"
        overview.pillar_3_description_en = "Promoting the sustainable use, conservation and protection of aquatic and ocean resources."
        overview.pillar_3_description_si = "ජලජ සහ සාගර සම්පත් තිරසාර ලෙස භාවිතා කිරීම, සංරක්ෂණය සහ ආරක්ෂා කිරීම ප්‍රවර්ධනය කිරීම."
        overview.pillar_3_description_ta = "நீரியல் மற்றும் கடல்சார் வளங்களின் நிலையான பயன்பாடு மற்றும் பாதுகாப்பை ஊக்குவித்தல்."

        overview.benefit_banner_title_en = "National Protein & Economic Security"
        overview.benefit_banner_title_si = "ජාතික ප්‍රෝටීන් සහ ආර්ථික සුරක්ෂිතතාව"
        overview.benefit_banner_title_ta = "தேசிய புரத மற்றும் பொருளாதார பாதுகாப்பு"

        overview.benefit_banner_text_en = "Ensuring sustainable marine conservation while supplying nutritious food to Sri Lanka."
        overview.benefit_banner_text_si = "තිරසාර සාගර සංරක්ෂණය තහවුරු කරමින් ශ්‍රී ලංකාවට පෝෂ්‍යදායී ආහාර සැපයීම."
        overview.benefit_banner_text_ta = "நிலையான கடல் பாதுகாப்பை உறுதி செய்யும் அதே வேளையில் போஷாக்கான உணவை வழங்குதல்."
        overview.save()

        # -----------------------------------------------------------------
        # 2. Vision & Mission
        # -----------------------------------------------------------------
        vm, _ = AboutVisionMission.objects.get_or_create(id=1)
        vm.eyebrow_en = "Our Direction"
        vm.eyebrow_si = "අපගේ දැක්ම සහ මෙහෙවර"
        vm.eyebrow_ta = "எமது வழிகாட்டல்"

        vm.title_en = "Vision and Mission"
        vm.title_si = "දැක්ම සහ මෙහෙවර"
        vm.title_ta = "தொலைநோக்கு மற்றும் பணிப்பொறுப்பு"

        vm.description_en = "Guiding Sri Lanka's fisheries and ocean sector toward sustainable growth and community prosperity."
        vm.description_si = "ශ්‍රී ලංකාවේ ධීවර හා සාගර ක්ෂේත්‍රය තිරසාර වර්ධනයක් සහ ප්‍රජා සෞභාග්‍යය කරා මෙහෙයවීම."
        vm.description_ta = "இலங்கையின் கடற்றொழில் மற்றும் கடல்சார் துறையை நிலையான வளர்ச்சி நோக்கி வழிநடத்துதல்."

        vm.vision_badge_en = "Vision"
        vm.vision_badge_si = "දැක්ම"
        vm.vision_badge_ta = "தொலைநோக்கு"

        vm.vision_heading_en = "Sustainable Aquatic Wealth"
        vm.vision_heading_si = "තිරසාර ජලජ සම්පත් සෞභාග්‍යය"
        vm.vision_heading_ta = "நிலையான நீரியல் வளம்"

        vm.vision_description_en = "To be the leading contributor to the national economy through sustainable utilization and conservation of fisheries and ocean resources, ensuring nutritional security, enhanced livelihoods for fishing communities, and world-class aquatic stewardship."
        vm.vision_description_si = "ධීවර හා සාගර සම්පත් තිරසාර ලෙස උපයෝජනය හා සංරක්ෂණය තුළින් ජාතික ආර්ථිකයට ප්‍රමුඛතම දායකත්වය ලබාදීම, පෝෂණ සුරක්ෂිතතාව, ධීවර ප්‍රජාවන්ගේ ජීවනෝපාය නංවාලීම සහ ලෝක මට්ටමේ ජලජ භාරකාරත්වය සහතික කිරීම."
        vm.vision_description_ta = "கடற்றொழில் மற்றும் கடல்சார் வளங்களின் நிலையான பயன்பாடு மற்றும் பாதுகாப்பின் மூலம் தேசிய பொருளாதாரத்திற்கு முன்னணிப் பங்களிப்பை வழங்குதல், ஊட்டச்சத்து பாதுகாப்பு மற்றும் மீனவ சமூகங்களின் வாழ்வாதாரத்தை மேம்படுத்துதல்."

        vm.vision_footer_en = "National Fisheries Sector Strategy"
        vm.vision_footer_si = "ජාතික ධීවර ක්ෂේත්‍ර උපායමාර්ගය"
        vm.vision_footer_ta = "தேசிய கடற்றொழில் துறை மூலோபாயம்"

        vm.mission_badge_en = "Mission"
        vm.mission_badge_si = "මෙහෙවර"
        vm.mission_badge_ta = "பணிப்பொறுப்பு"

        vm.mission_heading_en = "Empowered Fishing Communities"
        vm.mission_heading_si = "සවිබල ගැන්වුණු ධීවර ප්‍රජාව"
        vm.mission_heading_ta = "வலுவூட்டப்பட்ட மீன்பிடி சமூகங்கள்"

        vm.mission_description_en = "Providing regulatory leadership, technological adoption, high-yield aquaculture, and social security for fishing communities while preserving marine ecosystems through evidence-based policies and transparent institutional governance."
        vm.mission_description_si = "නියාමන නායකත්වය, නවීන තාක්ෂණය, ඉහළ අස්වැන්නක් සහිත ජලජීවී වගාව සහ සාගර පරිසර පද්ධති ආරක්ෂා කරමින් ධීවර ප්‍රජාවන්ගේ සමාජ ආරක්ෂාව සහ ජීවන තත්ත්වය උසස් කිරීම."
        vm.mission_description_ta = "ஒழுங்குமுறை தலைமைத்துவம், தொழில்நுட்ப தத்தெடுப்பு மற்றும் கடல் சுற்றுச்சூழல் அமைப்புகளைப் பாதுகாத்து மீனவ சமூகங்களுக்கான சமூகப் பாதுகாப்பை வழங்குதல்."

        vm.mission_footer_en = "National Fisheries Sector Strategy"
        vm.mission_footer_si = "ජාතික ධීවර ක්ෂේත්‍ර උපායමාර්ගය"
        vm.mission_footer_ta = "தேசிய கடற்றொழில் துறை மூலோபாயம்"
        vm.save()

        # -----------------------------------------------------------------
        # 3. Policy Objectives
        # -----------------------------------------------------------------
        obj_hdr, _ = AboutObjectiveHeader.objects.get_or_create(id=1)
        obj_hdr.eyebrow_en = "Policy Objectives"
        obj_hdr.eyebrow_si = "ප්‍රතිපත්ති අරමුණු"
        obj_hdr.eyebrow_ta = "கொள்கை நோக்கங்கள்"

        obj_hdr.title_en = "Objectives of the Sector Policy"
        obj_hdr.title_si = "ක්ෂේත්‍ර ප්‍රතිපත්තියේ අරමුණු"
        obj_hdr.title_ta = "துறைக் கொள்கையின் நோக்கங்கள்"

        obj_hdr.description_en = "The Government envisages achieving the following objectives from implementation of the new Policy in the fisheries and aquaculture sector."
        obj_hdr.description_si = "ධීවර හා ජලජීවී වගා ක්ෂේත්‍රයේ නව ප්‍රතිපත්තිය ක්‍රියාත්මක කිරීමෙන් පහත අරමුණු සාක්ෂාත් කර ගැනීමට රජය අපේක්ෂා කරයි."
        obj_hdr.description_ta = "கடற்றொழில் மற்றும் நீரியல் உயிரின வளர்ப்புத் துறையில் புதிய கொள்கையை நடைமுறைப்படுத்துவதன் மூலம் பின்வரும் நோக்கங்களை அடைவதை அரசாங்கம் நோக்கமாகக் கொண்டுள்ளது."
        obj_hdr.save()

        # Objectives cards
        objectives_data = [
            (
                1, "01", "Database",
                "Sustainable Utilization & Conservation",
                "Sustainable utilization and conservation of aquatic resources and biodiversity in compliance with international and regional instruments.",
                "තිරසාර උපයෝජනය සහ සංරක්ෂණය",
                "ජාත්‍යන්තර සහ කලාපීය නීතිවලට අනුකූලව ජලජ සම්පත් සහ ජෛව විවිධත්වය තිරසාර ලෙස පරිහරණය කිරීම සහ සංරක්ෂණය කිරීම.",
                "நிலையான பயன்பாடு மற்றும் பாதுகாப்பு",
                "சர்வதேச மற்றும் பிராந்திய சட்டங்களுக்கு இணங்க நீரியல் வளங்கள் மற்றும் பல்லுயிர் பெருக்கத்தின் நிலையான பயன்பாடு மற்றும் பாதுகாப்பு."
            ),
            (
                2, "02", "Globe",
                "Nutritional Security & Export Enhancement",
                "Promotion of the sector's contribution to food and nutrition security and export earnings while generating high-income economic activities.",
                "පෝෂණ සුරක්ෂිතතාව සහ අපනයන වර්ධනය",
                "ආහාර සහ පෝෂණ සුරක්ෂිතතාවයට මෙන්ම ඉහළ ආදායම් උත්පාදනය කරමින් අපනයන ඉපැයීම් සඳහා ක්ෂේත්‍රයේ දායකත්වය ප්‍රවර්ධනය කිරීම.",
                "ஊட்டச்சத்து பாதுகாப்பு மற்றும் ஏற்றுமதி விரிவாக்கம்",
                "உணவு மற்றும் ஊட்டச்சத்து பாதுகாப்பு மற்றும் ஏற்றுமதி வருவாய்க்கு இத்துறையின் பங்களிப்பை ஊக்குவித்தல்."
            ),
            (
                3, "03", "Anchor",
                "Livelihood Upgrading & Social Security",
                "Improvement of socio-economic conditions and safety of fishing and aquaculture communities and upliftment of their livelihoods.",
                "ජීවනෝපාය නංවාලීම සහ සමාජ ආරක්ෂාව",
                "ධීවර හා ජලජීවී වගා ප්‍රජාවන්ගේ සමාජ-ආර්ථික තත්ත්වය, ආරක්ෂාව සහ ඔවුන්ගේ ජීවනෝපායන් ඉහළ නැංවීම.",
                "வாழ்வாதார மேம்பாடு மற்றும் சமூக பாதுகாப்பு",
                "மீன்பிடி மற்றும் நீர்வாழ் உயிரின வளர்ப்பு சமூகங்களின் சமூக-பொருளாதார நிலைமைகள் மற்றும் பாதுகாப்பை மேம்படுத்துதல்."
            ),
            (
                4, "04", "Fish",
                "Responsible Fisheries & Aquaculture Growth",
                "Expansion of responsible, climate-resilient aquaculture and sustainable inland fisheries to meet 100% of domestic nutritional demands.",
                "වගකීම් සහගත ධීවර හා ජලජීවී වර්ධනය",
                "දේශීය පෝෂණ අවශ්‍යතාවලින් 100% ක් සපුරාලීම සඳහා වගකීම් සහගත, දේශගුණික-ඔරොත්තු දෙන ජලජීවී වගාව සහ මිරිදිය ධීවර කර්මාන්තය පුළුල් කිරීම.",
                "பொறுப்பான மீன்பிடி மற்றும் நீர்வாழ் உயிரின வளர்ச்சி",
                "உள்நாட்டு ஊட்டச்சத்து தேவைகளில் 100% ஐ பூர்த்தி செய்வதற்காக பொறுப்பான, காலநிலை மீள்திறன் கொண்ட நீர்வாழ் உயிரின வளர்ப்பை விரிவுபடுத்துதல்."
            ),
            (
                5, "05", "ShieldCheck",
                "Fisheries Infrastructure & Modern Harbours",
                "Development and maintenance of world-class fishery harbours, anchorages, cold chains, and landing sites across the island.",
                "ධීවර යටිතල පහසුකම් සහ නවීන වරාය",
                "දිවයින පුරා ලෝක මට්ටමේ ධීවර වරායවල්, නැංගුරම් පොළවල්, ශීතාගාර දාම සහ ගොඩබෑමේ මධ්‍යස්ථාන සංවර්ධනය සහ නඩත්තු කිරීම.",
                "மீன்பிடி உட்கட்டமைப்பு மற்றும் நவீன துறைமுகங்கள்",
                "நாடு முழுவதும் உலகத் தரம் வாய்ந்த மீன்பிடித் துறைமுகங்கள், குளிரூட்டும் கட்டமைப்பு மற்றும் இறங்குதளங்களை மேம்படுத்துதல்."
            ),
            (
                6, "06", "Award",
                "Scientific Research & Ocean Innovation",
                "Fostering research, evidence-based marine spatial planning, oceanographic surveys, and innovation across fisheries institutions.",
                "විද්‍යාත්මක පර්යේෂණ සහ සාගර නවෝත්පාදනය",
                "ධීවර ආයතන හරහා පර්යේෂණ, සාක්ෂි මත පදනම් වූ සාගර අවකාශීය සැලසුම්කරණය, සාගර සමීක්ෂණ සහ නවෝත්පාදන ප්‍රවර්ධනය කිරීම.",
                "அறிவியல் ஆராய்ச்சி மற்றும் கடல்சார் கண்டுபிடிப்புகள்",
                "ஆராய்ச்சி, கடல்சார் ஆய்வுகள் மற்றும் மீன்பிடி நிறுவனங்களுக்கிடையேயான புதிய கண்டுபிடிப்புகளை ஊக்குவித்தல்."
            ),
        ]

        for order, num, icon, t_en, d_en, t_si, d_si, t_ta, d_ta in objectives_data:
            obj, _ = AboutObjective.objects.get_or_create(order=order)
            obj.number_badge = num
            obj.icon_name = icon
            obj.title_en = t_en
            obj.description_en = d_en
            obj.title_si = t_si
            obj.description_si = d_si
            obj.title_ta = t_ta
            obj.description_ta = d_ta
            obj.is_active = True
            obj.save()

        # -----------------------------------------------------------------
        # 4. Leadership Section
        # -----------------------------------------------------------------
        lead_hdr, _ = AboutLeadershipHeader.objects.get_or_create(id=1)
        lead_hdr.eyebrow_en = "Leadership"
        lead_hdr.eyebrow_si = "නායකත්වය"
        lead_hdr.eyebrow_ta = "தலைமைத்துவம்"
        lead_hdr.title_en = "Ministry leadership"
        lead_hdr.title_si = "අමාත්‍යාංශ නායකත්වය"
        lead_hdr.title_ta = "அமைச்சின் தலைமைத்துவம்"
        lead_hdr.description_en = "Executive leadership of the Ministry of Fisheries, Aquatic and Ocean Resources."
        lead_hdr.description_si = "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශයේ විධායක නායකත්වය."
        lead_hdr.description_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சின் நிறைவேற்று தலைமைத்துவம்."
        lead_hdr.save()

        # Leaders
        # Minister
        m_lead, _ = AboutLeader.objects.get_or_create(role_type="minister")
        m_lead.order = 1
        m_lead.name_en = "Hon. Ramalingam Chandrasekara"
        m_lead.name_si = "ගරු රාමලිංගම් චන්ද්‍රසේකර"
        m_lead.name_ta = "கௌரவ இராமலிங்கம் சந்திரசேகர்"
        m_lead.role_title_en = "Cabinet Minister of Fisheries, Aquatic and Ocean Resources"
        m_lead.role_title_si = "ධීවර, ජලජ සහ සාගර සම්පත් කැබිනට් අමාත්‍ය"
        m_lead.role_title_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சரவை அமைச்சர்"
        m_lead.ministry_badge_en = "Ministry of Fisheries, Aquatic and Ocean Resources"
        m_lead.ministry_badge_si = "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය"
        m_lead.ministry_badge_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு"
        m_lead.short_description_en = "Provides overall policy direction and leadership for the Ministry and statutory institutions."
        m_lead.short_description_si = "අමාත්‍යාංශය සහ ව්‍යවස්ථාපිත ආයතන සඳහා සමස්ත ප්‍රතිපත්තිමය මඟපෙන්වීම සහ නායකත්වය සපයයි."
        m_lead.short_description_ta = "அமைச்சு மற்றும் நிறுவனங்களுக்கான ஒட்டுமொத்த கொள்கை வழிகாட்டல் மற்றும் தலைமைத்துவத்தை வழங்குகிறார்."
        m_lead.message_title_en = "Minister's Statement"
        m_lead.message_title_si = "අමාත්‍යතුමාගේ නිල ප්‍රකාශය"
        m_lead.message_title_ta = "அமைச்சரின் உத்தியோகபூர்ව அறிக்கை"
        m_lead.message_content_en = "Driving science-based marine conservation, coastal community empowerment, and high-yield aquaculture growth across Sri Lanka."
        m_lead.message_content_si = "ශ්‍රී ලංකාව පුරා විද්‍යාත්මක සාගර සංරක්ෂණය, වෙරළබඩ ප්‍රජාව සවිබල ගැන්වීම සහ ඉහළ අස්වැන්නක් සහිත ජලජීවී වගා වර්ධනයක් මෙහෙයවීම."
        m_lead.message_content_ta = "இலங்கை முழுவதும் அறிவியல் பூர்வமான கடல் பாதுகாப்பு மற்றும் கடற்றொழில் சமூகங்களை வலுப்படுத்துதல்."
        m_lead.photo_fallback = "/images/leadership/minister.jpg"
        m_lead.page_url = "/about/minister"
        m_lead.is_active = True
        m_lead.save()

        # Deputy Minister
        dm_lead, _ = AboutLeader.objects.get_or_create(role_type="deputy_minister")
        dm_lead.order = 2
        dm_lead.name_en = "Hon. Deputy Minister"
        dm_lead.name_si = "ගරු නියෝජ්‍ය අමාත්‍යතුමා"
        dm_lead.name_ta = "கௌரவ பிரதி அமைச்சர்"
        dm_lead.role_title_en = "Deputy Minister of Fisheries, Aquatic and Ocean Resources"
        dm_lead.role_title_si = "ධීවර, ජලජ සහ සාගර සම්පත් නියෝජ්‍ය අමාත්‍ය"
        dm_lead.role_title_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் பிரதி அமைச்சர்"
        dm_lead.ministry_badge_en = "Ministry of Fisheries, Aquatic and Ocean Resources"
        dm_lead.ministry_badge_si = "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය"
        dm_lead.ministry_badge_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு"
        dm_lead.short_description_en = "Oversees regional coordination, community engagement, and infrastructure project delivery."
        dm_lead.short_description_si = "ප්‍රාදේශීය සම්බන්ධීකරණය, ප්‍රජා සබඳතා සහ යටිතල පහසුකම් ව්‍යාපෘති ක්‍රියාත්මක කිරීම අධීක්ෂණය කරයි."
        dm_lead.short_description_ta = "பிராந்திய ஒருங்கிணைப்பு, சமூக ஈடுபாடு மற்றும் உட்கட்டமைப்பு திட்டங்களை மேற்பார்வையிடுகிறார்."
        dm_lead.message_title_en = "Deputy Minister's Message"
        dm_lead.message_title_si = "නියෝජ්‍ය අමාත්‍යතුමාගේ පණිවිඩය"
        dm_lead.message_title_ta = "பிரதி அமைச்சரின் செய்தி"
        dm_lead.message_content_en = "Strengthening grassroots support, harbour facilities, and training pathways for coastal fisheries families."
        dm_lead.message_content_si = "වෙරළබඩ ධීවර පවුල් සඳහා බිම් මට්ටමේ සහාය, වරාය පහසුකම් සහ පුහුණු මාර්ග ශක්තිමත් කිරීම."
        dm_lead.message_content_ta = "கரையோர மீன்பிடி குடும்பங்களுக்கான அடிப்படை ஆதரவு மற்றும் பயிற்சி வழிகளை வலுப்படுத்துதல்."
        dm_lead.photo_fallback = "/images/leadership/deputy-minister.jpg"
        dm_lead.page_url = "/about/deputy-minister"
        dm_lead.is_active = True
        dm_lead.save()

        # Secretary
        sec_lead, _ = AboutLeader.objects.get_or_create(role_type="secretary")
        sec_lead.order = 3
        sec_lead.name_en = "Mr. B.K. Kolitha Kamal Jinadasa (PHD)"
        sec_lead.name_si = "බී.කේ. කොලිත කමල් ජිනදාස (ආචාර්ය) මයා"
        sec_lead.name_ta = "திரு. பி.கே. கொலித கமல் ஜினதாச (கலாநிதி)"
        sec_lead.role_title_en = "Secretary to the Ministry of Fisheries, Aquatic and Ocean Resources"
        sec_lead.role_title_si = "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශයේ ලේකම්"
        sec_lead.role_title_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சின் செயலாளர்"
        sec_lead.ministry_badge_en = "Ministry of Fisheries, Aquatic and Ocean Resources"
        sec_lead.ministry_badge_si = "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය"
        sec_lead.ministry_badge_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு"
        sec_lead.short_description_en = "Leads administrative operations, policy implementation, financial governance, and institutional coordination."
        sec_lead.short_description_si = "පරිපාලන මෙහෙයුම්, ප්‍රතිපත්ති ක්‍රියාත්මක කිරීම, මූල්‍ය පාලනය සහ ආයතනික සම්බන්ධීකරණය මෙහෙයවයි."
        sec_lead.short_description_ta = "நிர்வாக நடவடிக்கைகள், கொள்கை அமலாக்கம் மற்றும் நிறுவன ஒருங்கிணைப்பை வழிநடத்துகிறார்."
        sec_lead.message_title_en = "Secretary's Statement"
        sec_lead.message_title_si = "ලේකම්තුමාගේ ප්‍රකාශය"
        sec_lead.message_title_ta = "செயலாளரின் அறிக்கை"
        sec_lead.message_content_en = "Ensuring transparent public administration, efficient resource management, and coordinated delivery across all agencies."
        sec_lead.message_content_si = "සියලුම ආයතන හරහා පාරදෘශ්‍ය රාජ්‍ය පරිපාලනය, කාර්යක්ෂම සම්පත් කළමනාකරණය සහ මනා සම්බන්ධීකරණය තහවුරු කිරීම."
        sec_lead.message_content_ta = "அனைத்து நிறுவனங்கள் மூலமாகவும் வெளிப்படையான நிர்வாகத்தை உறுதி செய்தல்."
        sec_lead.photo_fallback = "/images/leadership/secretary.jpg"
        sec_lead.page_url = "/about/secretary"
        sec_lead.is_active = True
        sec_lead.save()

        # -----------------------------------------------------------------
        # 5. Organization Structure (About section)
        # -----------------------------------------------------------------
        org, _ = AboutOrganizationStructure.objects.get_or_create(id=1)
        org.eyebrow_en = "Administration"
        org.eyebrow_si = "පරිපාලනය"
        org.eyebrow_ta = "நிர்வாகம்"
        org.title_en = "Organizational structure"
        org.title_si = "සංවිධාන ව්‍යුහය"
        org.title_ta = "நிறுவனக் கட்டமைப்பு"
        org.description_en = "View the official administrative and institutional structure of the Ministry."
        org.description_si = "අමාත්‍යාංශයේ නිල පරිපාලන සහ ආයතනික ව්‍යුහය නිරීක්ෂණය කරන්න."
        org.description_ta = "அமைச்சின் உத்தியோகபூர்வ நிர்வாக மற்றும் நிறுவன கட்டமைப்பைப் பார்வையிடவும்."
        org.chart_box_title_en = "Ministry organizational chart"
        org.chart_box_title_si = "අමාත්‍යාංශ සංවිධාන සටහන"
        org.chart_box_title_ta = "அமைச்சு நிறுவன வரைபடம்"
        org.chart_box_subtitle_en = "Official administrative reporting structure"
        org.chart_box_subtitle_si = "නිල පරිපාලන වාර්තාකරණ ව්‍යුහය"
        org.chart_box_subtitle_ta = "உத்தியோகபூர்வ நிர்வாக அறிக்கை கட்டமைப்பு"
        org.chart_fallback = "/images/about/organizational-structure.jpg"
        org.executive_notes_en = "On smaller screens, scroll horizontally to examine the complete organizational chart or select 'View full size'."
        org.executive_notes_si = "කුඩා තිර සඳහා, සම්පූර්ණ සංවිධාන සටහන පරීක්ෂා කිරීමට තිරස් අතට අනුචලනය කරන්න හෝ 'සම්පූර්ණ ප්‍රමාණය බලන්න' තෝරන්න."
        org.executive_notes_ta = "சிறிய திரைகளில் முழு வரைபடத்தைப் பார்க்க கிடைமட்டமாக உருட்டவும் அல்லது 'முழு அளவில் பார்க்க' என்பதைத் தேர்ந்தெடுக்கவும்."
        org.save()

        # Also populate dedicated organization_structure chart model
        org_dedicated, _ = OrganizationStructureChart.objects.get_or_create(id=1)
        org_dedicated.eyebrow_en = org.eyebrow_en
        org_dedicated.eyebrow_si = org.eyebrow_si
        org_dedicated.eyebrow_ta = org.eyebrow_ta
        org_dedicated.title_en = org.title_en
        org_dedicated.title_si = org.title_si
        org_dedicated.title_ta = org.title_ta
        org_dedicated.description_en = org.description_en
        org_dedicated.description_si = org.description_si
        org_dedicated.description_ta = org.description_ta
        org_dedicated.chart_box_title_en = org.chart_box_title_en
        org_dedicated.chart_box_title_si = org.chart_box_title_si
        org_dedicated.chart_box_title_ta = org.chart_box_title_ta
        org_dedicated.chart_box_subtitle_en = org.chart_box_subtitle_en
        org_dedicated.chart_box_subtitle_si = org.chart_box_subtitle_si
        org_dedicated.chart_box_subtitle_ta = org.chart_box_subtitle_ta
        org_dedicated.chart_fallback = org.chart_fallback
        org_dedicated.executive_notes_en = org.executive_notes_en
        org_dedicated.executive_notes_si = org.executive_notes_si
        org_dedicated.executive_notes_ta = org.executive_notes_ta
        org_dedicated.save()

        # -----------------------------------------------------------------
        # 6. Timeline History
        # -----------------------------------------------------------------
        time_hdr, _ = AboutTimelineHeader.objects.get_or_create(id=1)
        time_hdr.eyebrow_en = "Our journey"
        time_hdr.eyebrow_si = "අපගේ ගමන් මග"
        time_hdr.eyebrow_ta = "எமது பயணம்"
        time_hdr.title_en = "Ministry history and development"
        time_hdr.title_si = "අමාත්‍යාංශ ඉතිහාසය සහ සංවර්ධනය"
        time_hdr.title_ta = "அமைச்சின் வரலாறும் வளர்ச்சியும்"
        time_hdr.description_en = "Key historical milestones shaping Sri Lanka's fisheries and ocean resources management."
        time_hdr.description_si = "ශ්‍රී ලංකාවේ ධීවර හා සාගර සම්පත් කළමනාකරණය හැඩගස්වන ප්‍රධාන ඓතිහාසික සන්ධිස්ථාන."
        time_hdr.description_ta = "இலங்கையின் கடற்றொழில் மற்றும் கடல்சார் வளங்கள் முகாமைத்துவத்தை வடிவமைத்த முக்கிய வரலாற்று மைல்கற்கள்."
        time_hdr.save()

        events_data = [
            (
                1, "1948", "Post-Independence Foundation",
                "Marine fishing gradually developed from a traditional coastal livelihood activity to a structured economic sector following national independence.",
                "නිදහසින් පසු පදනම",
                "ජාතික නිදහස ලැබීමෙන් පසු සාගර ධීවර කර්මාන්තය සාම්ප්‍රදායික වෙරළබඩ ජීවනෝපායක සිට ව්‍යුහගත ආර්ථික ක්ෂේත්‍රයක් දක්වා වර්ධනය විය.",
                "சுதந்திரத்திற்குப் பிந்தைய அடித்தளம்",
                "சுதந்திரத்திற்குப் பின்னர் கடல் மீன்பிடித்தல் ஒரு கட்டமைக்கப்பட்ட பொருளாதாரத் துறையாக வளர்ச்சியடைந்தது."
            ),
            (
                2, "1980", "Aquaculture Expansion",
                "Coastal shrimp farming commenced in the 1980s, creating major export pathways and expanding coastal fisheries employment.",
                "ජලජීවී වගා ව්‍යාප්තිය",
                "1980 ගණන්වල වෙරළබඩ ඉස්සන් වගාව ආරම්භ වූ අතර ප්‍රධාන අපනයන මාර්ග නිර්මාණය කරමින් වෙරළබඩ ධීවර රැකියා පුළුල් කළේය.",
                "நீர்வாழ் உயிரின வளர்ப்பு விரிவாக்கம்",
                "1980 களில் கரையோர இறால் வளர்ப்பு ஆரம்பிக்கப்பட்டு ஏற்றுமதி வாய்ப்புகள் விரிவுபடுத்தப்பட்டன."
            ),
            (
                3, "1996", "Statutory Framework Establishment",
                "Passage of the Fisheries and Aquatic Resources Act No. 2 of 1996, establishing modern management, conservation, and regulatory licensing.",
                "ව්‍යවස්ථාපිත රාමුව පිහිටුවීම",
                "නවීන කළමනාකරණය, සංරක්ෂණය සහ නියාමන බලපත්‍ර ලබාදීම ස්ථාපිත කරමින් 1996 අංක 2 දරන ධීවර හා ජලජ සම්පත් පනත සම්මත විය.",
                "சட்ட கட்டமைப்பு உருவாக்கம்",
                "1996 ஆம் ஆண்டின் 2 ஆம் இலக்க கடற்றொழில் மற்றும் நீரியல் வளங்கள் சட்டம் நிறைவேற்றப்பட்டது."
            ),
            (
                4, "2010", "Marine Aquaculture Modernization",
                "Rapid expansion of marine finfish farming, sea cucumber culture, seaweed farming, and advanced fish health diagnostic facilities.",
                "සාගර ජලජීවී වගා නවීකරණය",
                "සාගර මත්ස්‍ය වගාව, මුහුදු කූඩැල්ලන් වගාව, මුහුදු පැලෑටි වගාව සහ උසස් මත්ස්‍ය සෞඛ්‍ය රෝග විනිශ්චය පහසුකම් වේගයෙන් වර්ධනය විය.",
                "கடல் நீர்வாழ் உயிரின வளர்ப்பு நவீனமயமாக்கல்",
                "கடல் மீன் வளர்ப்பு, கடல் அட்டை மற்றும் கடற்பாசி வளர்ப்பு விரைவாக விரிவடைந்தது."
            ),
            (
                5, "2026", "Digital Transformation & Blue Economy",
                "Comprehensive digitization, modern satellite vessel tracking (VMS), online licensing, and sustainable national protein security mandate.",
                "ඩිජිටල් පරිවර්තනය සහ නීල ආර්ථිකය",
                "සමස්ත ඩිජිටල්කරණය, නවීන චන්ද්‍රිකා යාත්‍රා නිරීක්ෂණය (VMS), මාර්ගගත බලපත්‍ර ලබාදීම සහ තිරසාර ජාතික ප්‍රෝටීන් සුරක්ෂිතතාව.",
                "டிஜிட்டல் மயமாக்கல் மற்றும் நீலப் பொருளாதாரம்",
                "முழுமையான டிஜிட்டல் மயமாக்கல், விண்கல கண்காணிப்பு (VMS) மற்றும் இணையவழி அனுமதிப்பத்திர முறைமை."
            ),
        ]

        for order, yr, t_en, d_en, t_si, d_si, t_ta, d_ta in events_data:
            ev, _ = AboutTimelineEvent.objects.get_or_create(order=order)
            ev.year = yr
            ev.title_en = t_en
            ev.description_en = d_en
            ev.status_badge_en = "Historical milestone"
            ev.title_si = t_si
            ev.description_si = d_si
            ev.status_badge_si = "ඓතිහාසික සන්ධිස්ථානය"
            ev.title_ta = t_ta
            ev.description_ta = d_ta
            ev.status_badge_ta = "வரலாற்று மைல்கல்"
            ev.is_active = True
            ev.save()

        # -----------------------------------------------------------------
        # 7. Minister Profile Page (Dedicated)
        # -----------------------------------------------------------------
        min_prof, _ = MinisterProfile.objects.get_or_create(id=1)
        min_prof.badge_en = "Cabinet Minister"
        min_prof.badge_si = "කැබිනට් අමාත්‍ය"
        min_prof.badge_ta = "அமைச்சரவை அமைச்சர்"
        min_prof.name_en = "Hon. Ramalingam Chandrasekara"
        min_prof.name_si = "ගරු රාමලිංගම් චන්ද්‍රසේකර"
        min_prof.name_ta = "கௌரவ இராமலிங்கம் சந்திரசேகர்"
        min_prof.role_title_en = "Cabinet Minister of Fisheries, Aquatic and Ocean Resources"
        min_prof.role_title_si = "ධීවර, ජලජ සහ සාගර සම්පත් කැබිනට් අමාත්‍ය"
        min_prof.role_title_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சரவை அமைச்சர்"
        min_prof.ministry_badge_en = "Ministry of Fisheries, Aquatic and Ocean Resources"
        min_prof.ministry_badge_si = "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය"
        min_prof.ministry_badge_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு"
        min_prof.photo_fallback = "/images/leadership/minister.jpg"
        min_prof.save()

        min_msg, _ = MinisterMessage.objects.get_or_create(id=1)
        min_msg.eyebrow_en = "Minister's Official Message"
        min_msg.eyebrow_si = "අමාත්‍යතුමාගේ නිල පණිවිඩය"
        min_msg.eyebrow_ta = "அமைச்சரின் உத்தியோகபூர்ව செய்தி"
        min_msg.message_title_en = "Transforming Sri Lanka's Fisheries & Blue Economy"
        min_msg.message_title_si = "ශ්‍රී ලංකාවේ ධීවර හා නීල ආර්ථිකය පරිවර්තනය කිරීම"
        min_msg.message_title_ta = "இலங்கையின் கடற்றொழில் மற்றும் நீலப் பொருளாதாரத்தை மாற்றுதல்"
        min_msg.message_content_en = "Our commitment is to drive science-based marine conservation, empower coastal fishing communities, maximize inland aquaculture production, and expand seafood export earnings while safeguarding ocean ecosystems for future generations."
        min_msg.message_content_si = "අපගේ අරමුණ වන්නේ විද්‍යාත්මක සාගර සංරක්ෂණය, වෙරළබඩ ධීවර ප්‍රජාව සවිබල ගැන්වීම, මිරිදිය ජලජීවී වගා අස්වැන්න උපරිම කිරීම සහ සාගර පරිසර පද්ධති සුරකිමින් මුහුදු ආහාර අපනයන ඉපැයීම් ඉහළ නැංවීමයි."
        min_msg.message_content_ta = "அறிவியல் பூர்வமான கடல் பாதுகாப்பு, கரையோர மீன்பிடி சமூகங்களை வலுப்படுத்துதல், நீரியல் வள உற்பத்தியை அதிகரித்தல் மற்றும் கடல் உணவு ஏற்றுமதி வருவாயை விரிவுபடுத்துவதே எமது அர்ப்பணிப்பாகும்."
        min_msg.quote_author_en = "Hon. Ramalingam Chandrasekara"
        min_msg.quote_author_si = "ගරු රාමලිංගම් චන්ද්‍රසේකර"
        min_msg.quote_author_ta = "கௌரவ இராமலிங்கம் சந்திரசேகர்"
        min_msg.quote_designation_en = "Cabinet Minister"
        min_msg.quote_designation_si = "කැබිනට් අමාත්‍ය"
        min_msg.quote_designation_ta = "அமைச்சரவை அமைச்சர்"
        min_msg.save()

        min_sec, _ = MinisterSecretariat.objects.get_or_create(id=1)
        min_sec.box_title_en = "Minister's Secretariat Office"
        min_sec.box_title_si = "අමාත්‍ය ලේකම් කාර්යාලය"
        min_sec.box_title_ta = "அமைச்சர் செயலக அலுவலகம்"
        min_sec.box_subtitle_en = "Official Contact & Administration Desk"
        min_sec.box_subtitle_si = "නිල සම්බන්ධතා සහ පරිපාලන අංශය"
        min_sec.box_subtitle_ta = "உத்தியோகபூர்வ தொடர்பு மற்றும் நிர்வாகப் பிரிவு"
        min_sec.office_address_en = "New Secretariat, Maligawatta, Colombo 10, Sri Lanka"
        min_sec.office_address_si = "නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව"
        min_sec.office_address_ta = "புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை"
        min_sec.cta_contact_button_text_en = "Contact Secretariat"
        min_sec.cta_contact_button_text_si = "ලේකම් කාර්යාලය අමතන්න"
        min_sec.cta_contact_button_text_ta = "செயலகத்தைத் தொடர்பு கொள்ள"
        min_sec.secondary_link_text_en = "View Ministry Divisions"
        min_sec.secondary_link_text_si = "අමාත්‍යාංශ අංශ බලන්න"
        min_sec.secondary_link_text_ta = "அமைச்சின் பிரிவுகளைப் பார்க்க"
        min_sec.save()

        # -----------------------------------------------------------------
        # 8. Deputy Minister Profile Page (Dedicated)
        # -----------------------------------------------------------------
        dm_prof, _ = DeputyMinisterProfile.objects.get_or_create(id=1)
        dm_prof.badge_en = "Deputy Minister"
        dm_prof.badge_si = "නියෝජ්‍ය අමාත්‍ය"
        dm_prof.badge_ta = "பிரதி அமைச்சர்"
        dm_prof.name_en = "Hon. Deputy Minister"
        dm_prof.name_si = "ගරු නියෝජ්‍ය අමාත්‍යතුමා"
        dm_prof.name_ta = "கௌரவ பிரதி அமைச்சர்"
        dm_prof.role_title_en = "Deputy Minister of Fisheries, Aquatic and Ocean Resources"
        dm_prof.role_title_si = "ධීවර, ජලජ සහ සාගර සම්පත් නියෝජ්‍ය අමාත්‍ය"
        dm_prof.role_title_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் பிரதி அமைச்சர்"
        dm_prof.ministry_badge_en = "Ministry of Fisheries, Aquatic and Ocean Resources"
        dm_prof.ministry_badge_si = "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය"
        dm_prof.ministry_badge_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு"
        dm_prof.photo_fallback = "/images/leadership/deputy-minister.jpg"
        dm_prof.save()

        dm_msg, _ = DeputyMinisterMessage.objects.get_or_create(id=1)
        dm_msg.eyebrow_en = "Deputy Minister's Official Message"
        dm_msg.eyebrow_si = "නියෝජ්‍ය අමාත්‍යතුමාගේ නිල පණිවිඩය"
        dm_msg.eyebrow_ta = "பிரதி அமைச்சரின் உத்தியோகபூர்வ செய்தி"
        dm_msg.message_title_en = "Empowering Regional Fisheries Communities & Infrastructure"
        dm_msg.message_title_si = "ප්‍රාදේශීය ධීවර ප්‍රජාව සහ යටිතල පහසුකම් සවිබල ගැන්වීම"
        dm_msg.message_title_ta = "பிராந்திய மீன்பிடி சமூகங்கள் மற்றும் உட்கட்டமைப்பை மேம்படுத்துதல்"
        dm_msg.message_content_en = "Our focus is on delivering efficient public administration, upgrading regional harbour facilities, expanding local training opportunities for young fishers, and ensuring welfare support reaches every coastal community in Sri Lanka."
        dm_msg.message_content_si = "අපගේ ප්‍රමුඛතාවය වන්නේ කාර්යක්ෂම මහජන පරිපාලනයක් සැපයීම, ප්‍රාදේශීය වරාය පහසුකම් නවීකරණය කිරීම, තරුණ ධීවරයින් සඳහා දේශීය පුහුණු අවස්ථා පුළුල් කිරීම සහ සුබසාධන ප්‍රතිලාභ සෑම ධීවර ප්‍රජාවකටම ළඟා කරදීමයි."
        dm_msg.message_content_ta = "செயல்திறன் மிக்க பொது நிர்வாகத்தை வழங்குதல், பிராந்திய துறைமுக வசதிகளை மேம்படுத்துதல் மற்றும் மீனவர்களுக்கான உள்ளூர் பயிற்சி வாய்ப்புகளை விரிவுபடுத்துவதே எமது நோக்கமாகும்."
        dm_msg.quote_author_en = "Hon. Deputy Minister"
        dm_msg.quote_author_si = "ගරු නියෝජ්‍ය අමාත්‍යතුමා"
        dm_msg.quote_author_ta = "கௌரவ பிரதி அமைச்சர்"
        dm_msg.quote_designation_en = "Deputy Minister"
        dm_msg.quote_designation_si = "නියෝජ්‍ය අමාත්‍ය"
        dm_msg.quote_designation_ta = "பிரதி அமைச்சர்"
        dm_msg.save()

        dm_sec, _ = DeputyMinisterSecretariat.objects.get_or_create(id=1)
        dm_sec.box_title_en = "Deputy Minister's Secretariat Office"
        dm_sec.box_title_si = "නියෝජ්‍ය අමාත්‍ය ලේකම් කාර්යාලය"
        dm_sec.box_title_ta = "பிரதி அமைச்சர் செயலக அலுவலகம்"
        dm_sec.box_subtitle_en = "Regional Coordination & Public Service Desk"
        dm_sec.box_subtitle_si = "ප්‍රාදේශීය සම්බන්ධීකරණ සහ මහජන සේවා අංශය"
        dm_sec.box_subtitle_ta = "பிராந்திய ஒருங்கிணைப்பு மற்றும் பொதுச் சேவைப் பிரிவு"
        dm_sec.office_address_en = "New Secretariat, Maligawatta, Colombo 10, Sri Lanka"
        dm_sec.office_address_si = "නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව"
        dm_sec.office_address_ta = "புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை"
        dm_sec.cta_contact_button_text_en = "Contact Secretariat"
        dm_sec.cta_contact_button_text_si = "ලේකම් කාර්යාලය අමතන්න"
        dm_sec.cta_contact_button_text_ta = "செயலகத்தைத் தொடர்பு கொள்ள"
        dm_sec.secondary_link_text_en = "View Ministry Divisions"
        dm_sec.secondary_link_text_si = "අමාත්‍යාංශ අංශ බලන්න"
        dm_sec.secondary_link_text_ta = "அமைச்சின் பிரிவுகளைப் பார்க்க"
        dm_sec.save()

        # -----------------------------------------------------------------
        # 9. Secretary Profile Page (Dedicated)
        # -----------------------------------------------------------------
        sec_prof, _ = SecretaryProfile.objects.get_or_create(id=1)
        sec_prof.badge_en = "Ministry Secretary"
        sec_prof.badge_si = "අමාත්‍යාංශ ලේකම්"
        sec_prof.badge_ta = "அமைச்சின் செயலாளர்"
        sec_prof.name_en = "Mr. B.K. Kolitha Kamal Jinadasa (PHD)"
        sec_prof.name_si = "බී.කේ. කොලිත කමල් ජිනදාස (ආචාර්ය) මයා"
        sec_prof.name_ta = "திரு. பி.கே. கொலித கமல் ஜினதாச (கலாநிதி)"
        sec_prof.role_title_en = "Secretary to the Ministry of Fisheries, Aquatic and Ocean Resources"
        sec_prof.role_title_si = "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශයේ ලේකම්"
        sec_prof.role_title_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சின் செயலாளர்"
        sec_prof.ministry_badge_en = "Ministry of Fisheries, Aquatic and Ocean Resources"
        sec_prof.ministry_badge_si = "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය"
        sec_prof.ministry_badge_ta = "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு"
        sec_prof.photo_fallback = "/images/leadership/secretary.jpg"
        sec_prof.save()

        sec_msg, _ = SecretaryMessage.objects.get_or_create(id=1)
        sec_msg.eyebrow_en = "Secretary's Official Statement"
        sec_msg.eyebrow_si = "ලේකම්තුමාගේ නිල ප්‍රකාශය"
        sec_msg.eyebrow_ta = "செயலாளரின் உத்தியோகபூர்வ அறிக்கை"
        sec_msg.message_title_en = "Ensuring Administrative Excellence & Sustainable Governance"
        sec_msg.message_title_si = "පරිපාලන විශිෂ්ටත්වය සහ තිරසාර පාලනය සහතික කිරීම"
        sec_msg.message_title_ta = "நிர்வாக சிறப்பு மற்றும் நிலையான நிர்வாகத்தை உறுதி செய்தல்"
        sec_msg.message_content_en = "Our focus is to ensure transparent public administration, efficient resource allocation, scientific research integration, and seamless coordination across DFAR, NARA, NAQDA, and CFHC to serve Sri Lanka's fisheries sector effectively."
        sec_msg.message_content_si = "අපගේ අරමුණ වන්නේ පාරදෘශ්‍ය රාජ්‍ය පරිපාලනය, කාර්යක්ෂම සම්පත් බෙදාහැරීම, විද්‍යාත්මක පර්යේෂණ ඒකාබද්ධ කිරීම සහ ධීවර හා ජලජ සම්පත් දෙපාර්තමේන්තුව, නාරා, නැක්ඩා සහ ධීවර වරාය නීතිගත සංස්ථාව හරහා මනා සම්බන්ධීකරණයකින් ශ්‍රී ලංකාවේ ධීවර ක්ෂේත්‍රයට විශිෂ්ට සේවාවක් සැපයීමයි."
        sec_msg.message_content_ta = "வெளிப்படையான பொது நிர்வாகத்தை உறுதி செய்தல், வளங்களை திறம்பட ஒதுக்கீடு செய்தல் மற்றும் DFAR, NARA, NAQDA மற்றும் CFHC ஆகியவற்றுக்கிடையே தடையற்ற ஒருங்கிணைப்பை ஏற்படுத்துவதே எமது நோக்கமாகும்."
        sec_msg.quote_author_en = "Mr. B.K. Kolitha Kamal Jinadasa (PHD)"
        sec_msg.quote_author_si = "බී.කේ. කොලිත කමල් ජිනදාස (ආචාර්ය) මයා"
        sec_msg.quote_author_ta = "திரு. பி.கே. கொலித கமல் ஜினதாச (கலாநிதி)"
        sec_msg.quote_designation_en = "Secretary to the Ministry"
        sec_msg.quote_designation_si = "අමාත්‍යාංශ ලේකම්"
        sec_msg.quote_designation_ta = "அமைச்சின் செயலாளர்"
        sec_msg.save()

        sec_desk, _ = SecretarySecretariat.objects.get_or_create(id=1)
        sec_desk.box_title_en = "Secretary's Office Contact Details"
        sec_desk.box_title_si = "ලේකම් කාර්යාල සම්බන්ධතා විස්තර"
        sec_desk.box_title_ta = "செயலாளர் அலுவலக தொடர்பு விவரங்கள்"
        sec_desk.box_subtitle_en = "Executive Administration & Governance Desk"
        sec_desk.box_subtitle_si = "විධායක පරිපාලන සහ පාලන අංශය"
        sec_desk.box_subtitle_ta = "நிறைவேற்று நிர்வாகப் பிரிவு"
        sec_desk.office_address_en = "Ministry of Fisheries, New Secretariat, Maligawatta, Colombo 10, Sri Lanka"
        sec_desk.office_address_si = "ධීවර අමාත්‍යාංශය, නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව"
        sec_desk.office_address_ta = "கடற்றொழில் அமைச்சு, புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை"
        sec_desk.cta_contact_button_text_en = "Contact Secretary Office"
        sec_desk.cta_contact_button_text_si = "ලේකම් කාර්යාලය අමතන්න"
        sec_desk.cta_contact_button_text_ta = "செயலாளர் அலுவலகத்தைத் தொடர்பு கொள்ள"
        sec_desk.secondary_link_text_en = "View Organization Structure"
        sec_desk.secondary_link_text_si = "සංවිධාන ව්‍යුහය බලන්න"
        sec_desk.secondary_link_text_ta = "நிறுவனக் கட்டமைப்பைப் பார்க்க"
        sec_desk.save()

        # -----------------------------------------------------------------
        # 10. Divisions Page
        # -----------------------------------------------------------------
        div_intro, _ = DivisionsPageIntro.objects.get_or_create(id=1)
        div_intro.badge_text_en = "Ministry Operations"
        div_intro.badge_text_si = "අමාත්‍යාංශ මෙහෙයුම්"
        div_intro.badge_text_ta = "அமைச்சு நடவடிக்கைகள்"
        div_intro.title_en = "Divisions supporting Ministry operations"
        div_intro.title_si = "අමාත්‍යාංශ මෙහෙයුම් සඳහා සහාය වන අංශ"
        div_intro.title_ta = "அமைச்சின் நடவடிக்கைகளுக்கு ஆதரவளிக்கும் பிரிவுகள்"
        div_intro.description_en = "Select a division to learn more about its responsibilities and contribution to the work of the Ministry."
        div_intro.description_si = "අමාත්‍යාංශයේ කාර්යභාරය සහ වගකීම් පිළිබඳ වැඩිදුර තොරතුරු දැනගැනීමට අදාළ අංශය තෝරන්න."
        div_intro.description_ta = "அமைச்சின் பொறுப்புகள் மற்றும் பங்களிப்புகள் பற்றி மேலும் அறிய ஒரு பிரிவைத் தேர்ந்தெடுக்கவும்."
        div_intro.save()

        divisions_data = [
            (
                1, "administration", "UsersRound",
                "Administration Division",
                "Responsible for human resources, administration, institutional coordination and the effective operation of the Ministry.",
                "Managing public sector human resources, recruitment, staff development, administrative logistics, and inter-agency coordination across all fisheries institutions.",
                "• Human resource management and career progression\n• Ministry logistics and general administration\n• Coordination with statutory agencies and external ministries\n• Disciplinary and administrative integrity protocols",
                "Senior Assistant Secretary (Administration)",
                "පරිපාලන අංශය",
                "මානව සම්පත්, පරිපාලනය, ආයතනික සම්බන්ධීකරණය සහ අමාත්‍යාංශයේ ඵලදායී ක්‍රියාකාරිත්වය සඳහා වගකීම දරයි.",
                "රාජ්‍ය අංශයේ මානව සම්පත් කළමනාකරණය, බඳවා ගැනීම්, කාර්ය මණ්ඩල සංවර්ධනය, පරිපාලන සැපයුම් සහ සියලුම ධීවර ආයතන හරහා අන්තර් ආයතනික සම්බන්ධීකරණය.",
                "• මානව සම්පත් කළමනාකරණය සහ වෘත්තීය ප්‍රගතිය\n• අමාත්‍යාංශ සැපයුම් සහ සාමාන්‍ය පරිපාලනය\n• ව්‍යවස්ථාපිත ආයතන සමඟ සම්බන්ධීකරණය\n• විනය සහ පරිපාලන අඛණ්ඩතා ප්‍රොටෝකෝල",
                "ජ්‍යෙෂ්ඨ සහකාර ලේකම් (පරිපාලන)",
                "நிர்வாகப் பிரிவு",
                "மனித வளங்கள், நிர்வாகம், நிறுவன ஒருங்கிணைப்பு மற்றும் அமைச்சின் பயனுள்ள செயல்பாட்டிற்குப் பொறுப்பானது.",
                "பொதுத்துறை மனித வள முகாமைத்துவம், ஆட்சேர்ப்பு, பணியாளர் மேம்பாடு மற்றும் அனைத்து மீன்பிடி நிறுவனங்களுக்கிடையிலான ஒருங்கிணைப்பு.",
                "• மனித வள முகாமைத்துவம் மற்றும் தொழில் முன்னேற்றம்\n• அமைச்சின் தளவாடங்கள் மற்றும் பொது நிர்வாகம்\n• சட்டரீதியான நிறுவனங்களுடன் ஒருங்கிணைப்பு",
                "சிரேஷ்ட உதவிச் செயலாளர் (நிர்வாகம்)"
            ),
            (
                2, "accounts", "Landmark",
                "Accounts & Finance Division",
                "Manages budgeting, financial control, donor-funded project accounts, and statutory financial reporting.",
                "Ensuring sound financial stewardship, public expenditure compliance, preparation of annual budget estimates, and financial monitoring of development programs.",
                "• Annual budget preparation and treasury coordination\n• Expenditure monitoring and procurement auditing\n• Financial management of foreign and donor-funded projects\n• Timely preparation of statutory annual accounts",
                "Chief Financial Officer / Chief Accountant",
                "ගිණුම් සහ මූල්‍ය අංශය",
                "අයවැය සකස් කිරීම, මූල්‍ය පාලනය, විදේශ ආධාර ව්‍යාපෘති ගිණුම් සහ ව්‍යවස්ථාපිත මූල්‍ය වාර්තාකරණය කළමනාකරණය කරයි.",
                "මනා මූල්‍ය භාරකාරත්වය, රාජ්‍ය වියදම් අනුකූලතාව, වාර්ෂික අයවැය ඇස්තමේන්තු සකස් කිරීම සහ සංවර්ධන වැඩසටහන්වල මූල්‍ය අධීක්ෂණය සහතික කිරීම.",
                "• වාර්ෂික අයවැය සකස් කිරීම සහ භාණ්ඩාගාර සම්බන්ධීකරණය\n• වියදම් අධීක්ෂණය සහ ප්‍රසම්පාදන විගණනය\n• විදේශ ආධාර ව්‍යාපෘතිවල මූල්‍ය කළමනාකරණය\n• ව්‍යවස්ථාපිත වාර්ෂික ගිණුම් සකස් කිරීම",
                "ප්‍රධාන මූල්‍ය නිලධාරී / ප්‍රධාන ගණකාධිකාරී",
                "கணக்குகள் மற்றும் நிதிப் பிரிவு",
                "வரவு செலவுத் திட்டம், நிதி கட்டுப்பாடு, உதவித் திட்டக் கணக்குகள் மற்றும் நிதி அறிக்கையிடலை நிர்வகிக்கிறது.",
                "செலவு இணக்கம், வருடாந்த வரவு செலவுத் திட்ட மதிப்பீடுகளைத் தயாரித்தல் மற்றும் மேம்பாட்டுத் திட்டங்களின் நிதிக் கண்காணிப்பு.",
                "• வருடாந்த வரவு செலவுத் திட்டம் தயாரித்தல்\n• செலவு கண்காணிப்பு மற்றும் கொள்முதல் தணிக்கை\n• வெளிநாட்டு நிதியுதவி திட்டங்களின் நிதி முகாமைத்துவம்",
                "தலைமை கணக்காளர்"
            ),
            (
                3, "planning", "ClipboardCheck",
                "Planning & Monitoring Division",
                "Formulates long-term development strategies, monitors sector performance, and coordinates national policy execution.",
                "Leading national fisheries policy formulation, monitoring progress against sustainable development targets, and evaluating impact across inland and marine fisheries.",
                "• Formulation of National Fisheries Master Plans\n• Project appraisal, monitoring and KPI evaluation\n• Coordination with Department of National Planning\n• Sustainable Development Goals (SDG) progress monitoring",
                "Director (Planning)",
                "සැලසුම් සහ අධීක්ෂණ අංශය",
                "දිගුකාලීන සංවර්ධන උපායමාර්ග සැකසීම, ක්ෂේත්‍රයේ කාර්යසාධනය අධීක්ෂණය සහ ජාතික ප්‍රතිපත්ති ක්‍රියාත්මක කිරීම සම්බන්ධීකරණය කරයි.",
                "ජාතික ධීවර ප්‍රතිපත්ති සම්පාදනයට නායකත්වය දීම, තිරසාර සංවර්ධන ඉලක්කයන්ට සාපේක්ෂව ප්‍රගතිය අධීක්ෂණය කිරීම සහ මිරිදිය හා සාගර ධීවර කර්මාන්තය හරහා බලපෑම ඇගයීම.",
                "• ජාතික ධීවර ප්‍රධාන සැලසුම් සම්පාදනය\n• ව්‍යාපෘති ඇගයීම, අධීක්ෂණය සහ KPI ඇගයීම\n• ජාතික සැලසුම් දෙපාර්තමේන්තුව සමඟ සම්බන්ධීකරණය\n• තිරසාර සංවර්ධන ඉලක්ක (SDG) ප්‍රගති අධීක්ෂණය",
                "අධ්‍යක්ෂ (සැලසුම්)",
                "திட்டமிடல் மற்றும் கண்காணிப்பு பிரிவு",
                "நீண்டகால அபிவிருத்தி உத்திகளை உருவாக்குதல், துறையின் செயல்திறனைக் கண்காணித்தல் மற்றும் தேசிய கொள்கை அமுலாக்கத்தை ஒருங்கிணைத்தல்.",
                "தேசிய கடற்றொழில் கொள்கை உருவாக்கம், நிலையான அபிவிருத்தி இலக்குகளுக்கு எதிரான முன்னேற்றத்தைக் கண்காணித்தல்.",
                "• தேசிய கடற்றொழில் திட்டங்களை உருவாக்குதல்\n• திட்ட மதிப்பீடு மற்றும் KPI கண்காணிப்பு\n• தேசிய திட்டமிடல் திணைக்களத்துடன் ஒருங்கிணைப்பு",
                "பணிப்பாளர் (திட்டமிடல்)"
            ),
            (
                4, "technical", "Wrench",
                "Fisheries Development & Technical Division",
                "Drives technical standards, vessel safety specifications, post-harvest quality enhancement, and sustainable aquaculture guidelines.",
                "Setting technical benchmarks for multi-day fishing vessels, overseeing the adoption of modern fishing gear, ice plants, refrigeration technology, and fish health standards.",
                "• Technical specifications for fishing craft and gear\n• Post-harvest quality control and cold-chain standards\n• Guidelines for commercial aquaculture and hatcheries\n• Promotion of sustainable fishing technologies and eco-labels",
                "Director (Technical & Development)",
                "ධීවර සංවර්ධන සහ තාක්ෂණික අංශය",
                "තාක්ෂණික ප්‍රමිතීන්, යාත්‍රා ආරක්ෂණ පිරිවිතර, පසු අස්වනු ගුණාත්මකභාවය වැඩිදියුණු කිරීම සහ තිරසාර ජලජීවී වගා මාර්ගෝපදේශ මෙහෙයවයි.",
                "බහුදින ධීවර යාත්‍රා සඳහා තාක්ෂණික මිණුම් සලකුණු සැකසීම, නවීන ධීවර ආම්පන්න, අයිස් කම්හල්, ශීතකරණ තාක්ෂණය සහ මත්ස්‍ය සෞඛ්‍ය ප්‍රමිතීන් අධීක්ෂණය කිරීම.",
                "• ධීවර යාත්‍රා සහ ආම්පන්න සඳහා තාක්ෂණික පිරිවිතර\n• පසු අස්වනු තත්ත්ව පාලනය සහ ශීතාගාර ප්‍රමිති\n• වාණිජ ජලජීවී වගාව සහ බීජෞෂණාගාර සඳහා මාර්ගෝපදේශ\n• තිරසාර ධීවර තාක්ෂණයන් ප්‍රවර්ධනය",
                "අධ්‍යක්ෂ (තාක්ෂණික හා සංවර්ධන)",
                "கடற்றொழில் அபிவிருத்தி மற்றும் தொழில்நுட்பப் பிரிவு",
                "தொழில்நுட்ப தரநிலைகள், படகு பாதுகாப்பு விவரக்குறிப்புகள் மற்றும் நிலையான நீர்வாழ் உயிரின வளர்ப்பு வழிகாட்டுதல்களை வழிநடத்துகிறது.",
                "பல நாள் மீன்பிடி படகுகளுக்கான தொழில்நுட்ப தரங்களை அமைத்தல் மற்றும் நவீன மீன்பிடி உபகரணங்களை மேற்பார்வையிடுதல்.",
                "• மீன்பிடி படகுகள் மற்றும் உபகரணங்களுக்கான தொழில்நுட்ப விவரக்குறிப்புகள்\n• அறுவடைக்கு பிந்தைய தரக்கட்டுப்பாடு மற்றும் குளிரூட்டல் தரநிலைகள்\n• வணிக நீர்வாழ் உயிரின வளர்ப்புக்கான வழிகாட்டுதல்கள்",
                "பணிப்பாளர் (தொழில்நுட்பம் மற்றும் அபிவிருத்தி)"
            ),
        ]

        for order, slug, icon, t_en, s_en, f_en, b_en, h_en, t_si, s_si, f_si, b_si, h_si, t_ta, s_ta, f_ta, b_ta, h_ta in divisions_data:
            div, _ = MinistryDivision.objects.get_or_create(slug=slug)
            div.order = order
            div.icon_name = icon
            div.title_en = t_en
            div.short_description_en = s_en
            div.full_description_en = f_en
            div.bullet_points_en = b_en
            div.head_of_division_en = h_en

            div.title_si = t_si
            div.short_description_si = s_si
            div.full_description_si = f_si
            div.bullet_points_si = b_si
            div.head_of_division_si = h_si

            div.title_ta = t_ta
            div.short_description_ta = s_ta
            div.full_description_ta = f_ta
            div.bullet_points_ta = b_ta
            div.head_of_division_ta = h_ta

            div.contact_email = f"{slug}@fisheries.gov.lk"
            div.contact_phone = "+94 112 327 060"
            div.is_active = True
            div.save()

        self.stdout.write(self.style.SUCCESS("Successfully seeded multilingual data for all About Us pages!"))
