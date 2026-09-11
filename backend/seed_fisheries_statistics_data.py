import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from fisheries_statistics.models import (
    FisheriesStatisticsHeader,
    FisheriesSummaryMetric,
    StatisticsCategory,
    StatisticsTableRow,
)

def seed():
    print("[*] Seeding Fisheries at a Glance Statistics Data...")

    # 1. Header
    header, _ = FisheriesStatisticsHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Sectoral Statistics Directory"
    header.title_en = "Sectoral Performance & Operating Figures"
    header.description_en = "Select any statistical category below to view detailed breakdown tables, vessel counts, and official sector indicators."

    header.badge_text_si = "ක්ෂේත්‍ර සංඛ්‍යාලේඛන නාමාවලිය"
    header.title_si = "ක්ෂේත්‍ර කාර්යසාධනය සහ මෙහෙයුම් දත්ත"
    header.description_si = "සවිස්තරාත්මක සංඛ්‍යාලේඛන වගු, යාත්‍රා සංඛ්‍යාව සහ නිල ක්ෂේත්‍ර දර්ශක නැරඹීම සඳහා පහත ඕනෑම ප්‍රවර්ගයක් තෝරන්න."

    header.badge_text_ta = "துறைசார் புள்ளிவிவர விபரம்"
    header.title_ta = "துறைசார் செயல்திறன் மற்றும் இயக்க புள்ளிவிவரங்கள்"
    header.description_ta = "விரிவான புள்ளிவிவர அட்டவணைகள், படகுகளின் எண்ணிக்கை மற்றும் உத்தியோகபூர்வ துறைசார் குறிகாட்டிகளைப் பார்வையிட கீழே உள்ள வகைகளைத் தேர்ந்தெடுக்கவும்."
    header.save()

    # 2. Summary Metric Cards
    metrics_data = [
        {
            "order": 1,
            "year": "2024",
            "value": "410,000",
            "icon_name": "TrendingUp",
            "title_en": "Annual Fish Production",
            "unit_en": "Metric tonnes",
            "title_si": "වාර්ෂික මත්ස්‍ය නිෂ්පාදනය",
            "unit_si": "මෙට්‍රික් ටොන්",
            "title_ta": "வருடாந்த மீன் உற்பத்தி",
            "unit_ta": "மெட்ரிக் தொன்",
        },
        {
            "order": 2,
            "year": "2024",
            "value": "49,271",
            "icon_name": "Anchor",
            "title_en": "Marine Fishing Fleet",
            "unit_en": "Operating vessels",
            "title_si": "ක්‍රියාකාරී සාගර ධීවර යාත්‍රා",
            "unit_si": "ක්‍රියාකාරී යාත්‍රා",
            "title_ta": "கடல் மீன்பிடி படகுகள்",
            "unit_ta": "செயல்படும் படகுகள்",
        },
        {
            "order": 3,
            "year": "2024",
            "value": "9,647",
            "icon_name": "Ship",
            "title_en": "Inland Fishing Fleet",
            "unit_en": "Inland craft",
            "title_si": "මිරිදිය ධීවර යාත්‍රා",
            "unit_si": "මිරිදිය යාත්‍රා",
            "title_ta": "நன்னீர் மீன்பிடி படகுகள்",
            "unit_ta": "நன்னீர் படகுகள்",
        },
        {
            "order": 4,
            "year": "2024",
            "value": "25",
            "icon_name": "Building2",
            "title_en": "Fisheries Harbours",
            "unit_en": "Major harbours & anchorages",
            "title_si": "ධීවර වරායන්",
            "unit_si": "ප්‍රධාන වරාය සහ නැංගුරම්පොළ",
            "title_ta": "மீன்பிடித் துறைமுகங்கள்",
            "unit_ta": "பிரதான துறைமுகங்கள்",
        },
        {
            "order": 5,
            "year": "2024",
            "value": "245,000",
            "icon_name": "Users",
            "title_en": "Direct Employment",
            "unit_en": "Active fishers & workers",
            "title_si": "සෘජු රැකියා නියුක්තිය",
            "unit_si": "ක්‍රියාකාරී ධීවරයින් හා සේවකයින්",
            "title_ta": "நேரடி வேலைவாய்ப்பு",
            "unit_ta": "மீனவர்கள் மற்றும் பணியாளர்கள்",
        },
        {
            "order": 6,
            "year": "2024",
            "value": "$320.5M",
            "icon_name": "DollarSign",
            "title_en": "Export Value",
            "unit_en": "USD Value",
            "title_si": "අපනයන වටිනාකම",
            "unit_si": "ඇමරිකානු ඩොලර්",
            "title_ta": "ஏற்றுமதி பெறுமதி",
            "unit_ta": "அமெரிக்க டொலர்",
        },
    ]

    for m in metrics_data:
        FisheriesSummaryMetric.objects.update_or_create(
            order=m["order"],
            defaults=m,
        )

    # 3. Statistical Categories and Breakdown Tables
    categories_data = [
        {
            "order": 1,
            "slug": "annual-fish-production",
            "icon_name": "TrendingUp",
            "is_default_open": False,
            "title_en": "Annual Fish Production (Mt)",
            "title_si": "වාර්ෂික මත්ස්‍ය නිෂ්පාදනය (මෙට්‍රික් ටොන්)",
            "title_ta": "வருடாந்த மீன் உற்பத்தி (மெட்ரிக் தொன்)",
            "description_en": "Annual national fish production figures across marine, inland, and aquaculture sectors for 2024.",
            "description_si": "2024 වසර සඳහා සාගර, මිරිදිය සහ ජලජීවී වගා අංශ ඔස්සේ වාර්ෂික ජාතික මත්ස්‍ය නිෂ්පාදන දත්ත.",
            "description_ta": "2024 ஆம் ஆண்டிற்கான கடல், நன்னீர் மற்றும் நீரியல் வளர்ப்பு துறைகளின் வருடாந்த மீன் உற்பத்தி புள்ளிவிவரங்கள்.",
            "caption_en": "National fish production breakdown by sub-sector (Metric Tonnes), 2024",
            "caption_si": "උප-ක්ෂේත්‍ර අනුව ජාතික මත්ස්‍ය නිෂ්පාදන බිඳවැටීම (මෙට්‍රික් ටොන්), 2024",
            "caption_ta": "துணைத் துறை வாரியாக தேசிய மீன் உற்பத்தி (மெட்ரிக் தொன்), 2024",
            "rows": [
                {"order": 1, "label_en": "Marine Sector", "label_si": "සාගර අංශය", "label_ta": "கடல் துறை", "value": "308,430", "unit": "Mt", "is_emphasized": False},
                {"order": 2, "label_en": "Inland and Aquaculture Sector", "label_si": "මිරිදිය සහ ජලජීවී වගා අංශය", "label_ta": "நன்னீர் மற்றும் நீரியல் வளர்ப்பு துறை", "value": "102,330", "unit": "Mt", "is_emphasized": False},
                {"order": 3, "label_en": "Total Fish Production (Mt)", "label_si": "මුළු මත්ස්‍ය නිෂ්පාදනය (මෙට්‍රික් ටොන්)", "label_ta": "மொத்த மீன் உற்பத்தி (மெட்ரிக் தொன்)", "value": "410,760", "unit": "Mt", "is_emphasized": True},
            ],
        },
        {
            "order": 2,
            "slug": "fishing-fleet",
            "icon_name": "Anchor",
            "is_default_open": True,
            "title_en": "Operating Fishing Fleet (Nos)",
            "title_si": "ක්‍රියාකාරී ධීවර යාත්‍රා බලඇණිය (සංඛ්‍යාව)",
            "title_ta": "செயல்படும் மீன்பிடி படகுகள் (எண்ணிக்கை)",
            "description_en": "Registered and operational marine and inland fishing crafts categorized by vessel type.",
            "description_si": "යාත්‍රා වර්ගය අනුව වර්ගීකරණය කරන ලද ලියාපදිංචි සහ ක්‍රියාකාරී සාගර හා මිරිදිය ධීවර යාත්‍රා.",
            "description_ta": "படகு வகைகளின் அடிப்படையில் பதிவுசெய்யப்பட்ட மற்றும் இயங்கும் கடல் மற்றும் நன்னீர் படகுகள்.",
            "caption_en": "Operational fishing craft inventory across all maritime districts, 2024",
            "caption_si": "සියලුම වෙරළබඩ දිස්ත්‍රික්කවල ක්‍රියාකාරී ධීවර යාත්‍රා සංගණනය, 2024",
            "caption_ta": "அனைத்து கடல்சார் மாவட்டங்களிலும் செயல்படும் மீன்பிடி படகுகளின் விபரம், 2024",
            "rows": [
                {"order": 1, "label_en": "Multiday Boats (IMUL)", "label_si": "බහුදින යාත්‍රා (IMUL)", "label_ta": "பலநாள் படகுகள் (IMUL)", "value": "4,785", "unit": "Nos", "is_emphasized": False},
                {"order": 2, "label_en": "Inboard Single-Day Boats (IDAY)", "label_si": "එක්දින එන්ජින් යාත්‍රා (IDAY)", "label_ta": "உள்நாட்டு ஒருநாள் படகுகள் (IDAY)", "value": "1,340", "unit": "Nos", "is_emphasized": False},
                {"order": 3, "label_en": "Outboard Engine FRP Boats (OFRP)", "label_si": "පිටත එන්ජින් සවි කළ ෆයිබර්ග්ලාස් යාත්‍රා (OFRP)", "label_ta": "வெளிப்புற எஞ்சின் பொருத்தப்பட்ட படகுகள் (OFRP)", "value": "26,120", "unit": "Nos", "is_emphasized": False},
                {"order": 4, "label_en": "Motorized Traditional Boats (MTRB)", "label_si": "යන්ත්‍රික සාම්ප්‍රදායික යාත්‍රා (MTRB)", "label_ta": "இயந்திரமயமாக்கப்பட்ட பாரம்பரிய படகுகள் (MTRB)", "value": "2,140", "unit": "Nos", "is_emphasized": False},
                {"order": 5, "label_en": "Non-Motorized Traditional Crafts (NTRB)", "label_si": "යන්ත්‍ර නොමැති සාම්ප්‍රදායික යාත්‍රා (NTRB)", "label_ta": "இயந்திரமற்ற பாரம்பரிய படகுகள் (NTRB)", "value": "14,886", "unit": "Nos", "is_emphasized": False},
                {"order": 6, "label_en": "Total Marine Fishing Fleet", "label_si": "මුළු සාගර ධීවර යාත්‍රා බලඇණිය", "label_ta": "மொத்த கடல் மீன்பிடி படகுகள்", "value": "49,271", "unit": "Nos", "is_emphasized": True},
                {"order": 7, "label_en": "Inland Fishing Crafts", "label_si": "මිරිදිය ධීවර යාත්‍රා", "label_ta": "நன்னீர் மீன்பிடி படகுகள்", "value": "9,647", "unit": "Nos", "is_emphasized": False},
                {"order": 8, "label_en": "Total National Fishing Fleet (Marine + Inland)", "label_si": "මුළු ජාතික ධීවර යාත්‍රා එකතුව (සාගර + මිරිදිය)", "label_ta": "மொத்த தேசிய மீன்பிடி படகுகள் (கடல் + நன்னீர்)", "value": "58,918", "unit": "Nos", "is_emphasized": True},
            ],
        },
        {
            "order": 3,
            "slug": "fisheries-infrastructure",
            "icon_name": "Building2",
            "is_default_open": False,
            "title_en": "Fisheries Infrastructure & Anchorages",
            "title_si": "ධීවර යටිතල පහසුකම් සහ නැංගුරම්පොළවල්",
            "title_ta": "மீன்பிடி உட்கட்டமைப்பு மற்றும் நங்கூர தளங்கள்",
            "description_en": "Physical facilities, landing sites, and cold-chain storage assets supporting coastal operations.",
            "description_si": "වෙරළබඩ මෙහෙයුම් සඳහා සහාය වන භෞතික පහසුකම්, ගොඩබෑමේ මධ්‍යස්ථාන සහ ශීතාගාර වත්කම්.",
            "description_ta": "கடலோர நடவடிக்கைகளுக்கு ஆதரவளிக்கும் உட்கட்டமைப்பு வசதிகள் மற்றும் குளிரூட்டல் சேமிப்பு வசதிகள்.",
            "caption_en": "National fisheries infrastructure summary, 2024",
            "caption_si": "ජාතික ධීවර යටිතල පහසුකම් සාරාංශය, 2024",
            "caption_ta": "தேசிய மீன்பிடி உட்கட்டமைப்பு விபரம், 2024",
            "rows": [
                {"order": 1, "label_en": "Major Fishery Harbours", "label_si": "ප්‍රධාන ධීවර වරායන්", "label_ta": "பிரதான மீன்பிடித் துறைமுகங்கள்", "value": "25", "unit": "Locations", "is_emphasized": False},
                {"order": 2, "label_en": "Anchorages", "label_si": "නැංගුරම්පොළවල්", "label_ta": "நங்கூர தளங்கள்", "value": "62", "unit": "Locations", "is_emphasized": False},
                {"order": 3, "label_en": "Fish Landing Centres", "label_si": "මත්ස්‍ය ගොඩබෑමේ මධ්‍යස්ථාන", "label_ta": "மீன் இறங்கு தளங்கள்", "value": "902", "unit": "Centres", "is_emphasized": False},
                {"order": 4, "label_en": "Operational Ice Plants", "label_si": "ක්‍රියාකාරී අයිස් නිෂ්පාදනාගාර", "label_ta": "செயல்படும் ஐஸ் தொழிற்சாலைகள்", "value": "118", "unit": "Units", "is_emphasized": False},
                {"order": 5, "label_en": "Total Ice Production Capacity", "label_si": "දෛනික අයිස් නිෂ්පාදන ධාරිතාව", "label_ta": "மொத்த ஐஸ் உற்பத்தி திறன்", "value": "3,450", "unit": "Mt/Day", "is_emphasized": True},
            ],
        },
        {
            "order": 4,
            "slug": "social-information",
            "icon_name": "Users",
            "is_default_open": False,
            "title_en": "Fisher Population & Direct Employment",
            "title_si": "ධීවර ජනගහනය සහ සෘජු රැකියා නියුක්තිය",
            "title_ta": "மீனவ மக்கள் தொகை & நேரடி வேலைவாய்ப்பு",
            "description_en": "Demographic and employment indicators of active fishers and coastal households in Sri Lanka.",
            "description_si": "ශ්‍රී ලංකාවේ ක්‍රියාකාරී ධීවරයින් සහ වෙරළබඩ පවුල් පිළිබඳ ජන විකාශන හා රැකියා දර්ශක.",
            "description_ta": "இலங்கையின் செயல்படும் மீனவர்கள் மற்றும் கடலோர குடும்பங்களின் புள்ளிவிவரங்கள்.",
            "caption_en": "Socio-economic statistics of fisheries sector households, 2024",
            "caption_si": "ධීවර ක්ෂේත්‍රයේ පවුල් පිළිබඳ සමාජ-ආර්ථික සංඛ්‍යාලේඛන, 2024",
            "caption_ta": "மீன்பிடித் துறை சார்ந்த குடும்பங்களின் சமூக-பொருளாதார புள்ளிவிவரங்கள், 2024",
            "rows": [
                {"order": 1, "label_en": "Active Marine Fishers", "label_si": "ක්‍රියාකාරී සාගර ධීවරයින්", "label_ta": "செயல்படும் கடல் மீனவர்கள்", "value": "194,500", "unit": "Persons", "is_emphasized": False},
                {"order": 2, "label_en": "Active Inland & Aquaculture Fishers", "label_si": "ක්‍රියාකාරී මිරිදිය හා ජලජීවී වගාකරුවන්", "label_ta": "செயல்படும் நன்னீர் மீனவர்கள்", "value": "50,500", "unit": "Persons", "is_emphasized": False},
                {"order": 3, "label_en": "Total Active Fishers (Direct Employment)", "label_si": "මුළු ක්‍රියාකාරී ධීවරයින් (සෘජු රැකියා)", "label_ta": "மொத்த செயல்படும் மீனவர்கள் (நேரடி வேலைவாய்ப்பு)", "value": "245,000", "unit": "Persons", "is_emphasized": True},
                {"order": 4, "label_en": "Total Fisher Household Population", "label_si": "මුළු ධීවර පවුල් ජනගහනය", "label_ta": "மொத்த மீனவ குடும்ப மக்கள் தொகை", "value": "1,020,000", "unit": "Persons", "is_emphasized": False},
            ],
        },
        {
            "order": 5,
            "slug": "canned-fish",
            "icon_name": "PackageCheck",
            "is_default_open": False,
            "title_en": "Canned Fish Production & Processing",
            "title_si": "ටින් මත්ස්‍ය නිෂ්පාදනය සහ සැකසීම",
            "title_ta": "டின் மீன் உற்பத்தி மற்றும் பதப்படுத்துதல்",
            "description_en": "Domestic canned fish production figures and local manufacturing capacity.",
            "description_si": "දේශීය ටින් මත්ස්‍ය නිෂ්පාදන දත්ත සහ දේශීය නිෂ්පාදන ධාරිතාව.",
            "description_ta": "உள்நாட்டு டின் மீன் உற்பத்தி மற்றும் பதப்படுத்தும் திறன்.",
            "caption_en": "Canned fish processing metrics across licensed facilities, 2024",
            "caption_si": "බලපත්‍රලාභී කර්මාන්තශාලා හරහා ටින් මත්ස්‍ය සැකසුම් දත්ත, 2024",
            "caption_ta": "அங்கீகரிக்கப்பட்ட ஆலைகளின் டின் மீன் உற்பத்தி விபரம், 2024",
            "rows": [
                {"order": 1, "label_en": "Operational Canning Plants", "label_si": "ක්‍රියාකාරී ටින් මත්ස්‍ය කර්මාන්තශාලා", "label_ta": "செயல்படும் டின் மீன் தொழிற்சாலைகள்", "value": "9", "unit": "Facilities", "is_emphasized": False},
                {"order": 2, "label_en": "Annual Canned Fish Production (425g Cans)", "label_si": "වාර්ෂික ටින් මත්ස්‍ය නිෂ්පාදනය (ග්‍රෑම් 425 කෑන්)", "label_ta": "வருடாந்த டின் மீன் உற்பத்தி (425g டின்கள்)", "value": "28,400,000", "unit": "Cans", "is_emphasized": True},
                {"order": 3, "label_en": "Annual Raw Material Utilized (Fish)", "label_si": "භාවිතා කළ අමුද්‍රව්‍ය ප්‍රමාණය (මත්ස්‍ය)", "label_ta": "பயன்படுத்தப்பட்ட மூலப்பொருள் (மீன்)", "value": "14,200", "unit": "Mt", "is_emphasized": False},
            ],
        },
        {
            "order": 6,
            "slug": "fisheries-indicators",
            "icon_name": "Activity",
            "is_default_open": False,
            "title_en": "Key National Fisheries Indicators",
            "title_si": "ප්‍රධාන ජාතික ධීවර ක්ෂේත්‍ර දර්ශක",
            "title_ta": "முக்கிய தேசிய மீன்பிடி குறிகாட்டிகள்",
            "description_en": "Contribution to Gross Domestic Product (GDP), per capita fish consumption, and trade balance.",
            "description_si": "දළ දේශීය නිෂ්පාදිතයට (GDP) දායකත්වය, ඒක පුද්ගල මත්ස්‍ය පරිභෝජනය සහ වෙළඳ ශේෂය.",
            "description_ta": "மொத்த உள்நாட்டு உற்பத்திக்கு (GDP) பங்களிப்பு மற்றும் தனிநபர் மீன் நுகர்வு.",
            "caption_en": "Macro-economic indicators of fisheries sector, 2024",
            "caption_si": "ධීවර ක්ෂේත්‍රයේ සාර්ව ආර්ථික දර්ශක, 2024",
            "caption_ta": "மீன்பிடித் துறையின் பொருளாதார குறிகாட்டிகள், 2024",
            "rows": [
                {"order": 1, "label_en": "Fisheries Sector Contribution to GDP", "label_si": "දළ දේශීය නිෂ්පාදිතයට (GDP) දායකත්වය", "label_ta": "GDP இல் மீன்பிடித் துறையின் பங்களிப்பு", "value": "1.3", "unit": "%", "is_emphasized": True},
                {"order": 2, "label_en": "Per Capita Fish Consumption", "label_si": "ඒක පුද්ගල වාර්ෂික මත්ස්‍ය පරිභෝජනය", "label_ta": "வருடாந்த தனிநபர் மீன் நுகர்வு", "value": "16.8", "unit": "Kg/Year", "is_emphasized": False},
                {"order": 3, "label_en": "Animal Protein Contribution from Fish", "label_si": "සත්ත්ව ප්‍රෝටීන අවශ්‍යතාවයෙන් මත්ස්‍ය දායකත්වය", "label_ta": "விலங்கு புரதத் தேவையில் மீனின் பங்களிப்பு", "value": "52.4", "unit": "%", "is_emphasized": True},
            ],
        },
        {
            "order": 7,
            "slug": "export-import-trade",
            "icon_name": "ArrowLeftRight",
            "is_default_open": False,
            "title_en": "Export & Import Performance Summary",
            "title_si": "අපනයන සහ ආනයන කාර්යසාධන සාරාංශය",
            "title_ta": "ஏற்றுமதி & இறக்குமதி செயல்திறன் சுருக்கம்",
            "description_en": "International trade figures, high-value seafood exports, and processed imports for 2024.",
            "description_si": "ජාත්‍යන්තර වෙළඳ දත්ත, ඉහළ වටිනාකමකින් යුත් මුහුදු ආහාර අපනයනය සහ ආනයනය.",
            "description_ta": "சர்வதேச வர்த்தக புள்ளிவிவரங்கள், கடல் உணவு ஏற்றுமதி மற்றும் இறக்குமதி.",
            "caption_en": "Fish & fishery product trade summary (Customs Data), 2024",
            "caption_si": "මත්ස්‍ය සහ ධීවර නිෂ්පාදන වෙළඳ සාරාංශය (රේගු දත්ත), 2024",
            "caption_ta": "மீன் மற்றும் கடல் உணவு வர்த்தக சுருக்கம் (சுங்க தரவு), 2024",
            "rows": [
                {"order": 1, "label_en": "Total Seafood Export Volume", "label_si": "මුළු මුහුදු ආහාර අපනයන ප්‍රමාණය", "label_ta": "மொத்த கடல் உணவு ஏற்றுமதி அளவு", "value": "24,850", "unit": "Mt", "is_emphasized": False},
                {"order": 2, "label_en": "Total Seafood Export Value", "label_si": "මුළු මුහුදු ආහාර අපනයන වටිනාකම", "label_ta": "மொத்த கடல் உணவு ஏற்றுமதி பெறுமதி", "value": "320.5", "unit": "USD ($ Million)", "is_emphasized": True},
                {"order": 3, "label_en": "Dried & Processed Fish Import Volume", "label_si": "කරවල සහ සැකසූ මත්ස්‍ය ආනයන ප්‍රමාණය", "label_ta": "கருவாடு மற்றும் பதப்படுத்தப்பட்ட மீன் இறக்குமதி", "value": "62,400", "unit": "Mt", "is_emphasized": False},
                {"order": 4, "label_en": "Total Fish Import Expenditure", "label_si": "මුළු මත්ස්‍ය ආනයන වියදම", "label_ta": "மொத்த மீன் இறக்குமதி செலவு", "value": "185.2", "unit": "USD ($ Million)", "is_emphasized": False},
                {"order": 5, "label_en": "Net Fisheries Trade Balance (Surplus)", "label_si": "ශුද්ධ ධීවර වෙළඳ ශේෂය (අතිරික්තය)", "label_ta": "நிகர மீன்பிடி வர்த்தக சமநிலை (உபரி)", "value": "+135.3", "unit": "USD ($ Million)", "is_emphasized": True},
            ],
        },
    ]

    for cat_data in categories_data:
        rows_list = cat_data.pop("rows", [])
        cat_obj, created = StatisticsCategory.objects.update_or_create(
            slug=cat_data["slug"],
            defaults=cat_data,
        )
        print(f"  {'Created' if created else 'Updated'}: Category [{cat_obj.slug}] - {cat_obj.title_en}")

        StatisticsTableRow.objects.filter(category=cat_obj).delete()
        for r in rows_list:
            StatisticsTableRow.objects.create(
                category=cat_obj,
                **r,
            )

    print("[SUCCESS] Fisheries at a Glance Data Successfully Seeded!")

if __name__ == "__main__":
    seed()
