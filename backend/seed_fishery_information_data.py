import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from fishery_information.models import (
    FisheryInformationHeader,
    FisheryInformationCategory,
    FisheryInformationItem,
)

def seed():
    print("[*] Seeding Fishery Related Information Data...")

    # 1. Header
    header, _ = FisheryInformationHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Fisheries Knowledge Base"
    header.title_en = "Fishery Related Information & Datasets"
    header.description_en = "Access official landing-site maps, fish species directories, tuna identification cards, export-approved fish processing establishment lists, and national fishing boat census data."

    header.badge_text_si = "ධීවර තොරතුරු සහ දැනුම පදනම"
    header.title_si = "ධීවර ආශ්‍රිත තොරතුරු සහ දත්ත කට්ටල"
    header.description_si = "මත්ස්‍ය ගොඩබෑමේ ස්ථාන සිතියම්, මත්ස්‍ය විශේෂ නාමාවලි, කෙලවල්ලා හඳුනාගැනීමේ කාඩ්පත්, අනුමත මත්ස්‍ය සැකසුම් ආයතන ලැයිස්තු සහ යාත්‍රා සංගණන දත්ත මෙතැනින් ලබාගන්න."

    header.badge_text_ta = "மீன்பிடி தகவல் மற்றும் அறிவுத் தளம்"
    header.title_ta = "மீன்பிடி தொடர்பான தகவல்கள் மற்றும் தரவுத்தொகுப்புகள்"
    header.description_ta = "மீன் இறங்குதள வரைபடங்கள், மீன் இனங்களின் அடைவு, சூரை மீன் அடையாள அட்டைகள், ஏற்றுமதிக்கு அங்கீகரிக்கப்பட்ட மீன் பதப்படுத்தும் நிறுவனங்கள் மற்றும் படகு கணக்கெடுப்பு தரவுகளைப் பெறுங்கள்."
    header.save()

    # 2. Categories
    categories = [
        {
            "category_id": "landing-site-maps",
            "title_en": "Landing Site Maps",
            "title_si": "මත්ස්‍ය ගොඩබෑමේ ස්ථාන සිතියම්",
            "title_ta": "மீன் இறங்குதள வரைபடங்கள்",
            "description_en": "Browse official landing-site maps for coastal fisheries locations across Sri Lanka.",
            "description_si": "ශ්‍රී ලංකාවේ වෙරළබඩ ධීවර ගොඩබෑමේ ස්ථාන සඳහා නිල සිතියම් මෙතැනින් පරිශීලනය කරන්න.",
            "description_ta": "இலங்கையின் கடலோர மீன்பிடி இறங்குதளங்களுக்கான உத்தியோகபூர்வ வரைபடங்களைப் பார்வையிடுங்கள்.",
            "icon_type": "map",
            "order": 1,
        },
        {
            "category_id": "fish-species",
            "title_en": "Fish Species List",
            "title_si": "මත්ස්‍ය විශේෂ නාමාවලිය",
            "title_ta": "மீன் இனங்களின் பட்டியல்",
            "description_en": "Access official fish species lists and fisheries reference information.",
            "description_si": "නිල මත්ස්‍ය විශේෂ ලැයිස්තු සහ ධීවර විමර්ශන තොරතුරු ලබාගන්න.",
            "description_ta": "உத்தியோகபூர்வ மீன் இனங்களின் பட்டியல் மற்றும் மீன்பிடி குறிப்புத் தகவல்களை அணுகவும்.",
            "icon_type": "fish",
            "order": 2,
        },
        {
            "category_id": "tuna-identification",
            "title_en": "Tuna Identification Cards",
            "title_si": "කෙලවල්ලා මත්ස්‍ය හඳුනාගැනීමේ කාඩ්පත්",
            "title_ta": "சூரை மீன் அடையாள அட்டைகள்",
            "description_en": "View practical tuna-identification resources and reference cards.",
            "description_si": "ප්‍රායෝගික කෙලවල්ලා මත්ස්‍ය හඳුනාගැනීමේ මූලාශ්‍ර සහ කාඩ්පත් පරිශීලනය කරන්න.",
            "description_ta": "நடைமுறை சூரை மீன் அடையாள வளங்கள் மற்றும் குறிப்பு அட்டைகளைப் பார்க்கவும்.",
            "icon_type": "card",
            "order": 3,
        },
        {
            "category_id": "processing-establishments",
            "title_en": "Fish Processing Establishments for Export",
            "title_si": "අපනයනය සඳහා අනුමත මත්ස්‍ය සැකසුම් ආයතන",
            "title_ta": "ஏற்றுமதிக்கான மீன் பதப்படுத்தும் நிறுவனங்கள்",
            "description_en": "Access approved or registered fish-processing establishment information.",
            "description_si": "අපනයනය සඳහා අනුමත සහ ලියාපදිංචි මත්ස්‍ය සැකසුම් ආයතන තොරතුරු.",
            "description_ta": "அங்கீகரிக்கப்பட்ட அல்லது பதிவுசெய்யப்பட்ட மீன் பதப்படுத்தும் நிறுவனங்களின் தகவல்கள்.",
            "icon_type": "building",
            "order": 4,
        },
        {
            "category_id": "boat-census",
            "title_en": "Boat Census",
            "title_si": "ධීවර යාත්‍රා සංගණනය",
            "title_ta": "படகு கணக்கெடுப்பு",
            "description_en": "Browse fisheries vessel and boat census documents and datasets.",
            "description_si": "ධීවර යාත්‍රා සහ බෝට්ටු සංගණන ලේඛන සහ දත්ත කට්ටල මෙතැනින් ලබාගන්න.",
            "description_ta": "மீன்பிடி கப்பல்கள் மற்றும் படகு கணக்கெடுப்பு ஆவணங்கள் மற்றும் தரவுத்தொகுப்புகளை உலாவவும்.",
            "icon_type": "ship",
            "order": 5,
        },
    ]

    cat_objs = {}
    for cat in categories:
        obj, created = FisheryInformationCategory.objects.update_or_create(
            category_id=cat["category_id"],
            defaults=cat,
        )
        cat_objs[obj.category_id] = obj
        print(f"  Category {'Created' if created else 'Updated'}: [{obj.category_id}] - {obj.title_en}")

    # 3. Information Items
    items = [
        # --- 1. Landing Site Maps ---
        {
            "item_id": "map-chilaw",
            "category_id": "landing-site-maps",
            "title_en": "Chilaw Landing Site Map",
            "title_si": "හලාවත මත්ස්‍ය ගොඩබෑමේ ස්ථාන සිතියම",
            "title_ta": "சிலாபம் மீன் இறங்குதள வரைபடம்",
            "description_en": "Official coastal fishing landing site map, harbor boundaries, and anchorage coordinates for Chilaw district.",
            "description_si": "හලාවත දිස්ත්‍රික්කයේ වෙරළබඩ ධීවර ගොඩබෑමේ ස්ථාන, වරාය සීමා සහ නැංගුරම් ඛණ්ඩාංක ඇතුළත් නිල සිතියම.",
            "description_ta": "சிலாபம் மாவட்டத்திற்கான கடலோர மீன்பிடி இறங்குதளம், துறைமுக எல்லைகள் மற்றும் நங்கூரமிடும் ஆயத்தொலைவுகளின் உத்தியோகபூர்வ வரைபடம்.",
            "location_en": "Chilaw",
            "location_si": "හලාවත",
            "location_ta": "சிலாபம்",
            "year": 2025,
            "file_type": "PDF",
            "file_size": "55 KB",
            "file_url_fallback": "#",
            "published_date": "2025-01-15",
            "display_date": "15 January 2025",
            "order": 1,
        },
        {
            "item_id": "map-batticaloa",
            "category_id": "landing-site-maps",
            "title_en": "Batticaloa Landing Site Map",
            "title_si": "මඩකලපුව මත්ස්‍ය ගොඩබෑමේ ස්ථාන සිතියම",
            "title_ta": "மட்டக்களப்பு மீன் இறங்குதள வரைபடம்",
            "description_en": "Official coastal fishing landing site map, lagoon access points, and fish landing center layout for Batticaloa.",
            "description_si": "මඩකලපුව කලපු ප්‍රවේශ ස්ථාන සහ මත්ස්‍ය ගොඩබෑමේ මධ්‍යස්ථාන ඇතුළත් නිල සිතියම.",
            "description_ta": "மட்டக்களப்புக்கான கடலோர மீன்பிடி இறங்குதளம் மற்றும் மீன் இறங்கும் மைய அமைப்பின் உத்தியோகபூர்ව வரைபடம்.",
            "location_en": "Batticaloa",
            "location_si": "මඩකලපුව",
            "location_ta": "மட்டக்களப்பு",
            "year": 2025,
            "file_type": "PDF",
            "file_size": "225 KB",
            "file_url_fallback": "#",
            "published_date": "2025-01-20",
            "order": 2,
        },
        {
            "item_id": "map-tangalle",
            "category_id": "landing-site-maps",
            "title_en": "Tangalle Landing Site Map",
            "title_si": "තංගල්ල මත්ස්‍ය ගොඩබෑමේ ස්ථාන සිතියම",
            "title_ta": "தங்கalle மீன் இறங்குதள வரைபடம்",
            "description_en": "Official fisheries harbor and coastal landing-site geographical map for Tangalle southern coast.",
            "description_si": "තංගල්ල දකුණු වෙරළබඩ ධීවර වරාය සහ ගොඩබෑමේ ස්ථාන භූගෝලීය සිතියම.",
            "description_ta": "தங்கல்லே தெற்கு கடற்கரைக்கான உத்தியோகபூர்ව மீன்பிடி துறைமுகம் மற்றும் இறங்குதள புவியியல் வரைபடம்.",
            "location_en": "Tangalle",
            "location_si": "තංගල්ල",
            "location_ta": "தங்கல்லே",
            "year": 2025,
            "file_type": "PDF",
            "file_size": "100 KB",
            "file_url_fallback": "#",
            "published_date": "2025-02-01",
            "order": 3,
        },
        {
            "item_id": "map-negombo",
            "category_id": "landing-site-maps",
            "title_en": "Negombo Landing Site Map",
            "title_si": "මීගමුව මත්ස්‍ය ගොඩබෑමේ ස්ථාන සිතියම",
            "title_ta": "நீர்கொழும்பு மீன் இறங்குதள வரைபடம்",
            "description_en": "Lagoon and coastal landing sites, anchorages, and cooperative society zones in Negombo.",
            "description_si": "මීගමුව කලපු සහ වෙරළබඩ ගොඩබෑමේ ස්ථාන, නැංගුරම් පොළවල් සහ සමූපකාර කලාප සිතියම.",
            "description_ta": "நீர்கொழும்பில் உள்ள களப்பு மற்றும் கடலோர இறங்குதளங்கள் மற்றும் கூட்டுறவு சங்க மண்டலங்களின் வரைபடம்.",
            "location_en": "Negombo",
            "location_si": "මීගමුව",
            "location_ta": "நீர்கொழும்பு",
            "year": 2025,
            "file_type": "PDF",
            "file_size": "85 KB",
            "file_url_fallback": "#",
            "published_date": "2025-02-10",
            "order": 4,
        },
        {
            "item_id": "map-trincomalee",
            "category_id": "landing-site-maps",
            "title_en": "Trincomalee Landing Site Map",
            "title_si": "ත්‍රිකුණාමලය මත්ස්‍ය ගොඩබෑමේ ස්ථාන සිතියම",
            "title_ta": "திருகோணமலை மீன் இறங்குதள வரைபடம்",
            "description_en": "Natural harbor boundaries, landing beaches, and seasonal shelter bays across Trincomalee district.",
            "description_si": "ත්‍රිකුණාමලය ස්වභාවික වරාය සීමා, ගොඩබෑමේ වෙරළ තීරයන් සහ සෘතුමය ආරක්ෂිත බොකු සිතියම.",
            "description_ta": "திருகோணமலை மாவட்டம் முழுவதும் உள்ள இயற்கை துறைமுக எல்லைகள் மற்றும் இறங்கு கடற்கரைகளின் வரைபடம்.",
            "location_en": "Trincomalee",
            "location_si": "ත්‍රිකුණාමලය",
            "location_ta": "திருகோணமலை",
            "year": 2025,
            "file_type": "PDF",
            "file_size": "145 KB",
            "file_url_fallback": "#",
            "published_date": "2025-02-15",
            "order": 5,
        },

        # --- 2. Fish Species List ---
        {
            "item_id": "species-marine-directory",
            "category_id": "fish-species",
            "title_en": "Marine Fish Species Directory – Sri Lanka",
            "title_si": "ශ්‍රී ලංකාවේ සාගර මත්ස්‍ය විශේෂ නාමාවලිය",
            "title_ta": "இலங்கையின் கடல் மீன் இனங்களின் அடைவு",
            "description_en": "Comprehensive taxonomy checklist of commercially important marine pelagic and demersal fish species in Sri Lankan waters.",
            "description_si": "ශ්‍රී ලංකා මුහුදු සීමාවේ වාණිජමය වශයෙන් වැදගත් සාගර මත්ස්‍ය විශේෂ පිළිබඳ විද්‍යාත්මක නාමාවලිය.",
            "description_ta": "இலங்கை கடற்பரப்பில் வணிக ரீதியாக முக்கியத்துவம் வாய்ந்த கடல் மீன் இனங்களின் விரிவான வகைப்பாட்டியல் பட்டியல்.",
            "location_en": "National Waters",
            "location_si": "ජාතික මුහුදු සීමාව",
            "location_ta": "தேசிய கடல் பகுதி",
            "year": 2025,
            "file_type": "PDF",
            "file_size": "1.2 MB",
            "file_url_fallback": "#",
            "published_date": "2025-01-10",
            "order": 6,
        },
        {
            "item_id": "species-inland-freshwater",
            "category_id": "fish-species",
            "title_en": "Inland & Freshwater Fish Species Catalog",
            "title_si": "මිරිදිය සහ අභ්‍යන්තර ජලාශ මත්ස්‍ය විශේෂ නාමාවලිය",
            "title_ta": "நன்னீர் மற்றும் உள்நாட்டு மீன் இனங்களின் பட்டியல்",
            "description_en": "Official identification catalog of native and introduced freshwater food fish and reservoir aquaculture species.",
            "description_si": "දේශීය සහ හඳුන්වා දුන් මිරිදිය ආහාර මත්ස්‍ය සහ ජලාශ ජලජීවී වගා විශේෂ හඳුනාගැනීමේ නාමාවලිය.",
            "description_ta": "சுதேச மற்றும் அறிமுகப்படுத்தப்பட்ட நன்னீர் உணவு மீன்கள் மற்றும் நீர்த்தேக்க மீன் இனங்களின் உத்தியோகபூர்வ பட்டியல்.",
            "location_en": "Inland Reservoirs",
            "location_si": "මිරිදිය ජලාශ",
            "location_ta": "உள்நாட்டு நீர்த்தேக்கங்கள்",
            "year": 2025,
            "file_type": "XLSX",
            "file_size": "340 KB",
            "file_url_fallback": "#",
            "published_date": "2025-01-25",
            "order": 7,
        },

        # --- 3. Tuna Identification Cards ---
        {
            "item_id": "tuna-id-yellowfin-bigeye",
            "category_id": "tuna-identification",
            "title_en": "Yellowfin vs Bigeye Tuna Identification Field Guide",
            "title_si": "කෙලවල්ලා සහ ලොකු ඇස් කෙලවල්ලා ක්ෂේත්‍ර හඳුනාගැනීමේ මඟපෙන්වීම",
            "title_ta": "மஞ்சள் துடுப்பு மற்றும் பெரிய கண் சூரை மீன் அடையாள கள வழிகாட்டி",
            "description_en": "Illustrated high-resolution field guide differentiating juvenile Yellowfin tuna (Thunnus albacares) from Bigeye tuna (Thunnus obesus).",
            "description_si": "කෙලවල්ලා සහ ලොකු ඇස් කෙලවල්ලා පැහැදිලිව වෙන්කර හඳුනාගැනීම සඳහා රූප සටහන් සහිත ක්ෂේත්‍ර මාර්ගෝපදේශය.",
            "description_ta": "மஞ்சள் துடுப்பு சூரை மீன்களை பெரிய கண் சூரை மீன்களிலிருந்து வேறுபடுத்துவதற்கான விளக்கப்பட வழிகாட்டி.",
            "location_en": "Offshore & High Seas",
            "location_si": "ගැඹුරු මුහුද",
            "location_ta": "ஆழ்கடல் பகுதி",
            "year": 2025,
            "file_type": "PDF",
            "file_size": "2.4 MB",
            "file_url_fallback": "#",
            "published_date": "2025-02-05",
            "order": 8,
        },
        {
            "item_id": "tuna-id-skipjack-mackerel",
            "category_id": "tuna-identification",
            "title_en": "Skipjack, Kawakawa & Frigate Tuna Field Identification Card",
            "title_si": "බලයා, අටවල්ලා සහ ඇලගොඩුවා ක්ෂේත්‍ර හඳුනාගැනීමේ කාඩ්පත",
            "title_ta": "கட்ட சூரை, கவாக்கவா மற்றும் பொன்னக சூரை அடையாள அட்டை",
            "description_en": "Laminated-format visual guide for identifying oceanic Skipjack, Eastern Little Tuna (Kawakawa), and Frigate/Bullet mackerels.",
            "description_si": "බලයා, අටවල්ලා සහ ඇලගොඩුවා පහසුවෙන් හඳුනාගැනීම සඳහා සකස් කරන ලද දෘශ්‍ය ක්ෂේත්‍ර මාර්ගෝපදේශය.",
            "description_ta": "கட்ட சூரை, கவாக்கவா மற்றும் பொன்னக சூரை மீன்களை அடையாளம் காண்பதற்கான காட்சி வழிகாட்டி.",
            "location_en": "Pelagic Zone",
            "location_si": "මධ්‍ය සාගර කලාපය",
            "location_ta": "கடல் மேற்பரப்பு மண்டலம்",
            "year": 2025,
            "file_type": "PDF",
            "file_size": "1.8 MB",
            "file_url_fallback": "#",
            "published_date": "2025-02-12",
            "order": 9,
        },

        # --- 4. Fish Processing Establishments for Export ---
        {
            "item_id": "export-establishments-eu-approved",
            "category_id": "processing-establishments",
            "title_en": "EU Approved Fish Processing Establishments Directory – 2025",
            "title_si": "යුරෝපා සංගමයේ (EU) අනුමත මත්ස්‍ය සැකසුම් ආයතන නාමාවලිය – 2025",
            "title_ta": "ஐரோப்பிய ஒன்றியம் (EU) அங்கீகரித்த மீன் பதப்படுத்தும் நிறுவனங்கள் – 2025",
            "description_en": "Official register of Sri Lankan fish-processing plants and cold storage establishments certified for seafood export to the European Union.",
            "description_si": "යුරෝපා සංගමයට මුහුදු ආහාර අපනයනය සඳහා සහතික කළ ශ්‍රී ලාංකික මත්ස්‍ය සැකසුම් සහ ශීතාගාර ආයතන නාමාවලිය.",
            "description_ta": "ஐரோப்பிய ஒன்றியத்திற்கு கடல் உணவுகளை ஏற்றுமதி செய்ய சான்றளிக்கப்பட்ட இலங்கை மீன் பதப்படுத்தும் ஆலைகளின் உத்தியோகபூர்வ பதிவு.",
            "location_en": "All Island / Export Zones",
            "location_si": "දිවයින පුරා / අපනයන කලාප",
            "location_ta": "தீவு முழுவதும் / ஏற்றுமதி மண்டலங்கள்",
            "year": 2025,
            "file_type": "PDF",
            "file_size": "480 KB",
            "file_url_fallback": "#",
            "published_date": "2025-03-01",
            "order": 10,
        },
        {
            "item_id": "export-establishments-non-eu",
            "category_id": "processing-establishments",
            "title_en": "Registered Non-EU Seafood Processing Facilities",
            "title_si": "යුරෝපා නොවන රටවල් සඳහා ලියාපදිංචි මත්ස්‍ය සැකසුම් ආයතන",
            "title_ta": "EU அல்லாத நாடுகளுக்கான பதிவுசெய்யப்பட்ட கடல் உணவு பதப்படுத்தும் வசதிகள்",
            "description_en": "List of Department of Fisheries & Aquatic Resources approved processing establishments exporting to Asian, Middle East, and US markets.",
            "description_si": "ආසියානු, මැදපෙරදිග සහ ඇමරිකානු වෙළඳපල වෙත අපනයනය කරන ධීවර හා ජලජ සම්පත් දෙපාර්තමේන්තුව විසින් අනුමත සැකසුම් ආයතන.",
            "description_ta": "ஆசிய, மத்திய கிழக்கு மற்றும் அமெரிக்க சந்தைகளுக்கு ஏற்றுமதி செய்யும் அங்கீகரிக்கப்பட்ட பதப்படுத்தும் நிறுவனங்களின் பட்டியல்.",
            "location_en": "Western & Southern Provinces",
            "location_si": "බස්නාහිර සහ දකුණු පළාත්",
            "location_ta": "மேற்கு மற்றும் தென் மாகாணங்கள்",
            "year": 2025,
            "file_type": "XLSX",
            "file_size": "195 KB",
            "file_url_fallback": "#",
            "published_date": "2025-03-05",
            "order": 11,
        },

        # --- 5. Boat Census ---
        {
            "item_id": "census-fishing-fleet-2024",
            "category_id": "boat-census",
            "title_en": "National Fishing Fleet Census Report – 2024",
            "title_si": "ජාතික ධීවර යාත්‍රා සංගණන වාර්තාව – 2024",
            "title_ta": "தேசிய மீன்பிடி படகு கணக்கெடுப்பு அறிக்கை – 2024",
            "description_en": "Comprehensive census of registered multiday (IMUL), inboard day boats (IDAY), outboard fiberglass (OFRP), and traditional fishing crafts.",
            "description_si": "බහුදින යාත්‍රා (IMUL), එක්දින යාත්‍රා (IDAY), ෆයිබර්ග්ලාස් බෝට්ටු (OFRP) සහ සාම්ප්‍රදායික ධීවර යාත්‍රා පිළිබඳ සම්පූර්ණ සංගණන වාර්තාව.",
            "description_ta": "பலநாள் படகுகள் (IMUL), ஒருநாள் படகுகள் (IDAY) மற்றும் பாரம்பரிய மீன்பிடி படகுகளின் விரிவான கணக்கெடுப்பு அறிக்கை.",
            "location_en": "All 15 Coastal Districts",
            "location_si": "වෙරළබඩ දිස්ත්‍රික්ක 15ම",
            "location_ta": "அனைத்து 15 கடலோர மாவட்டங்கள்",
            "year": 2024,
            "file_type": "PDF",
            "file_size": "3.1 MB",
            "file_url_fallback": "#",
            "published_date": "2024-12-20",
            "order": 12,
        },
        {
            "item_id": "census-vessel-district-breakdown",
            "category_id": "boat-census",
            "title_en": "District-wise Vessel Registry & Engine Power Dataset",
            "title_si": "දිස්ත්‍රික්ක අනුව ධීවර යාත්‍රා ලේඛනය සහ එන්ජින් ධාරිතා දත්ත කට්ටලය",
            "title_ta": "மாவட்ட வாரியான படகு பதிவு மற்றும் இயந்திர திறன் தரவுத்தொகுப்பு",
            "description_en": "Detailed tabular dataset of fishing craft registrations categorized by harbor base, hull length, engine horsepower, and fishing gear types.",
            "description_si": "වරාය, බෝට්ටු දිග, එන්ජින් අශ්වබල ධාරිතාව සහ ධීවර ආම්පන්න වර්ග අනුව සකස් කළ සවිස්තරාත්මක එක්සෙල් දත්ත කට්ටලය.",
            "description_ta": "துறைமுக தளம், நீளம், என்ஜின் குதிரைத்திறன் மற்றும் உபகரணங்களின் வகை வாரியாக வகைப்படுத்தப்பட்ட விரிவான எக்செல் தரவுத்தொகுப்பு.",
            "location_en": "National Registry",
            "location_si": "ජාතික ලේඛනාගාරය",
            "location_ta": "தேசிய பதிவேடு",
            "year": 2024,
            "file_type": "XLSX",
            "file_size": "520 KB",
            "file_url_fallback": "#",
            "published_date": "2024-12-28",
            "order": 13,
        },
    ]

    for item in items:
        cat_id = item.pop("category_id")
        cat_obj = cat_objs.get(cat_id)
        if not cat_obj:
            continue
        obj, created = FisheryInformationItem.objects.update_or_create(
            item_id=item["item_id"],
            defaults={"category": cat_obj, **item},
        )
        print(f"  Item {'Created' if created else 'Updated'}: [{obj.item_id}] - {obj.title_en}")

    print("[SUCCESS] Fishery Related Information Data Successfully Seeded!")

if __name__ == "__main__":
    seed()
