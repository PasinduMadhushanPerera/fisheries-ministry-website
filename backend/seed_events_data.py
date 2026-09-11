import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from events.models import EventPageHeader, EventItem

def seed():
    print("[*] Seeding Events & Programmes Page Data...")

    header, _ = EventPageHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Official Gatherings"
    header.title_en = "Events &"
    header.highlighted_title_en = "Ministry Programmes"
    header.description_en = "Explore official symposiums, workshops, coastal fisher safety training, aquaculture conferences, and public outreach programmes organized by the Ministry of Fisheries."
    header.catalogue_badge_en = "Events Library"
    header.library_title_en = "All Ministry Events & Programmes"

    header.badge_text_si = "නිල වැඩසටහන් සහ සමුළු"
    header.title_si = "වැඩසටහන් සහ"
    header.highlighted_title_si = "අමාත්‍යාංශ ඉසව්"
    header.description_si = "ධීවර අමාත්‍යාංශය මඟින් සංවිධානය කරනු ලබන නිල සම්මන්ත්‍රණ, පුහුණු වැඩමුළු, ප්‍රජා සත්කාරක වැඩසටහන් සහ ක්ෂේත්‍ර සමුළු පිළිබඳ විස්තර මෙතැනින් ලබාගන්න."
    header.catalogue_badge_si = "වැඩසටහන් නාමාවලිය"
    header.library_title_si = "සියලු අමාත්‍යාංශ වැඩසටහන් සහ සම්මන්ත්‍රණ"

    header.badge_text_ta = "உத்தியோகபூர்வ நிகழ்வுகள்"
    header.title_ta = "நிகழ்வுகள் &"
    header.highlighted_title_ta = "அமைச்சு திட்டங்கள்"
    header.description_ta = "கடற்றொழில் அமைச்சு ஒழுங்குசெய்யும் உத்தியோகபூர்வ மாநாடுகள், பட்டறைகள், மீனவ பாதுகாப்பு பயிற்சிகள் மற்றும் சமூக மேம்பாட்டு திட்டங்கள்."
    header.catalogue_badge_ta = "நிகழ்வுகள் ஆவணம்"
    header.library_title_ta = "அனைத்து அமைச்சு நிகழ்வுகள் மற்றும் திட்டங்கள்"
    header.save()

    events_data = [
        {
            "order": 1,
            "reference_number": "MFAR/EV/2026/001",
            "slug": "national-fisheries-blue-economy-symposium-2026",
            "category": "symposiums_conferences",
            "status": "Upcoming",
            "is_featured": True,
            "title_en": "National Fisheries & Blue Economy Symposium 2026",
            "title_si": "ජාතික ධීවර හා නීල ආර්ථික සම්මන්ත්‍රණය 2026",
            "title_ta": "தேசிய கடற்றொழில் மற்றும் நீலப் பொருளாதார கருத்தரங்கு 2026",
            "summary_en": "A landmark gathering of marine scientists, policymakers, fisheries leaders, and international partners to chart the future of sustainable fisheries in Sri Lanka.",
            "summary_si": "ශ්‍රී ලංකාවේ තිරසර ධීවර ක්ෂේත්‍රයේ අනාගතය සැලසුම් කිරීම සඳහා සාගර විද්‍යාඥයින්, ප්‍රතිපත්ති සම්පාදකයින් සහ ජාත්‍යන්තර හවුල්කරුවන්ගේ සහභාගීත්වයෙන් පැවැත්වෙන ප්‍රමුඛ සම්මන්ත්‍රණය.",
            "summary_ta": "இலங்கையில் நிலையான கடற்றொழிலின் எதிர்காலத்தை திட்டமிடுவதற்கான கடல் விஞ்ஞானிகள் மற்றும் சர்வதேச கூட்டாளர்களின் மாநாடு.",
            "description_en": "The National Fisheries & Blue Economy Symposium brings together over 500 delegates from government, academic research institutions, commercial fisheries, and international marine organizations.\n\nThe symposium will focus on sustainable stock management, modernizing harbor technologies, marine climate adaptation, and expanding value-added fish exports.\n\nKeynote addresses will be delivered by the Hon. Minister of Fisheries and leading international ocean conservation specialists.",
            "description_si": "රජය, විශ්වවිද්‍යාල පර්යේෂණ ආයතන, වාණිජ ධීවර ව්‍යවසායකයින් සහ ජාත්‍යන්තර සංවිධාන නියෝජනය කරමින් නියෝජිතයින් 500 කට අධික පිරිසක් මෙම සමුළුවට එක්වෙති.\n\nතිරසර මත්ස්‍ය සම්පත් කළමනාකරණය, වරාය තාක්ෂණය නවීකරණය, සාගර දේශගුණික විපර්යාසයන්ට මුහුණදීම සහ අගය එකතු කළ මත්ස්‍ය අපනයන පුළුල් කිරීම මෙහි ප්‍රධාන තේමාවන් වේ.",
            "description_ta": "அரசாங்கம், பல்கலைக்கழகங்கள் மற்றும் சர்வதேச அமைப்புகளின் 500 க்கும் மேற்பட்ட பிரதிநிதிகள் இதில் பங்கேற்கின்றனர்.",
            "venue_en": "BMICH Main Auditorium, Colombo 07",
            "venue_si": "බණ්ඩාරනායක සම්මන්ත්‍රණ ශාලාව (BMICH), කොළඹ 07",
            "venue_ta": "பண்டாரநாயக்க சர்வதேச மாநாட்டு மண்டபம், கொழும்பு 07",
            "location_en": "Colombo",
            "location_si": "කොළඹ",
            "location_ta": "கொழும்பு",
            "organizer_en": "Ministry of Fisheries & NARA",
            "organizer_si": "ධීවර අමාත්‍යාංශය සහ NARA",
            "organizer_ta": "கடற்றொழில் அமைச்சு & NARA",
            "date": "2026-06-20",
            "display_date": "20 June 2026",
            "time": "09:00 AM - 04:30 PM",
            "contact_email": "symposium@fisheries.gov.lk",
            "contact_phone": "+94 11 244 6183",
            "agenda": [
                {"time": "09:00 AM", "topic": "Registration & Welcome Reception"},
                {"time": "09:30 AM", "topic": "Keynote Address: Sustainable Ocean Governance"},
                {"time": "11:00 AM", "topic": "Panel 1: Modernizing Artisanal & Deep-Sea Fisheries"},
                {"time": "01:30 PM", "topic": "Panel 2: Climate Resilience & Coastal Community Welfare"},
                {"time": "03:30 PM", "topic": "Closing Declarations & Policy Roadmap"},
            ],
        },
        {
            "order": 2,
            "reference_number": "MFAR/EV/2026/002",
            "slug": "coastal-fisher-safety-radio-training-workshop",
            "category": "workshops_training",
            "status": "Upcoming",
            "is_featured": False,
            "title_en": "Coastal Fisher Safety & Maritime VHF Radio Workshop",
            "title_si": "වෙරළබඩ ධීවර ආරක්ෂණ සහ VHF සමුද්‍ර ගුවන්විදුලි පුහුණු වැඩමුළුව",
            "title_ta": "கடலோர மீனவர் பாதுகாப்பு & கடல்சார் VHF வானொலி பயிற்சிப் பட்டறை",
            "summary_en": "Hands-on safety training and maritime VHF radio communication workshop for multiday vessel operators and coastal fishers.",
            "summary_si": "බහුදින යාත්‍රා ක්‍රියාකරුවන් සහ වෙරළබඩ ධීවරයින් සඳහා ප්‍රායෝගික ආරක්ෂක පුහුණුව සහ සමුද්‍ර VHF ගුවන්විදුලි සන්නිවේදන වැඩමුළුව.",
            "summary_ta": "பலநாள் படகு ஆபரேட்டர்கள் மற்றும் கடலோர மீனவர்களுக்கான கடல்சார் பாதுகாப்பு மற்றும் வானொலி தொடர்பு பயிற்சி.",
            "description_en": "This practical workshop equips coastal fishers and boat captains with critical sea survival, distress signal protocol, and maritime radio operating skills.\n\nParticipants will receive hands-on instruction on operating VHF marine radios, VMS distress beacons, life-raft deployment, and interpreting real-time weather alerts from the Department of Meteorology.",
            "description_si": "මුහුදේ දිවි ගලවා ගැනීම, ආපදා සංඥා නිකුත් කිරීම සහ සමුද්‍ර ගුවන්විදුලි උපකරණ ක්‍රියාත්මක කිරීම පිළිබඳ ප්‍රායෝගික දැනුම ලබාදීම මෙම වැඩමුළුවේ අරමුණයි.",
            "description_ta": "கடலில் உயிர் பிழைத்தல், அவசர சமிக்ஞை மற்றும் வானொலி இயக்க திறன்களை இந்த பட்டறை வழங்குகிறது.",
            "venue_en": "Tangalle Fishery Harbour Training Hall",
            "venue_si": "තංගල්ල ධීවර වරාය පුහුණු ශ්‍රවණාගාරය",
            "venue_ta": "தங்கALLE மீன்பிடித் துறைமுக பயிற்சி மண்டபம்",
            "location_en": "Southern Province",
            "location_si": "දකුණු පළාත",
            "location_ta": "தென் மாகாணம்",
            "organizer_en": "Department of Fisheries & Maritime Safety Unit",
            "organizer_si": "ධීවර දෙපාර්තමේන්තුව සහ සමුද්‍ර ආරක්ෂණ අංශය",
            "organizer_ta": "கடற்றொழில் திணைக்களம் & கடல்சார் பாதுகாப்பு பிரிவு",
            "date": "2026-06-12",
            "display_date": "12 June 2026",
            "time": "08:30 AM - 02:00 PM",
            "contact_email": "safety@fisheries.gov.lk",
            "contact_phone": "+94 47 224 0120",
            "agenda": [
                {"time": "08:30 AM", "topic": "Vessel Safety Pre-Departure Checklist"},
                {"time": "10:00 AM", "topic": "VHF Channel 16 Emergency Calls & VMS Distresses"},
                {"time": "11:30 AM", "topic": "Live Survival at Sea Demonstration"},
                {"time": "01:00 PM", "topic": "Distribution of Certified Safety Manuals"},
            ],
        },
        {
            "order": 3,
            "reference_number": "MFAR/EV/2026/003",
            "slug": "inland-aquaculture-farmers-conference",
            "category": "stakeholder_forums",
            "status": "Upcoming",
            "is_featured": False,
            "title_en": "National Inland Aquaculture & Freshwater Farmers Conference",
            "title_si": "ජාතික මිරිදිය ජලජීවී වගාකරුවන්ගේ සමුළුව",
            "title_ta": "தேசிய நன்னீர் நீரியல் வளர்ப்பு விவசாயிகள் மாநாடு",
            "summary_en": "A national technical conference discussing fingerling production, pond water quality management, and commercial fish farming subsidies.",
            "summary_si": "මත්ස්‍ය පැටවුන් නිෂ්පාදනය, පොකුණු ජල තත්ත්ව කළමනාකරණය සහ වාණිජ මිරිදිය මත්ස්‍ය වගා සහනාධාර පිළිබඳ ජාතික තාක්ෂණික සමුළුව.",
            "summary_ta": "மீன் குஞ்சு உற்பத்தி, குளத்து நீரின் தரம் மற்றும் மானியங்கள் பற்றிய தேசிய மாநாடு.",
            "description_en": "Organized in collaboration with NAQDA, this conference provides freshwater farmers with practical techniques in commercial Tilapia, Carp, and Freshwater Prawn cultivation.",
            "description_si": "NAQDA ආයතනය සමඟ එක්ව සංවිධානය කරනු ලබන මෙම සමුළුව මඟින් වාණිජ මිරිදිය මත්ස්‍ය වගාව සඳහා නව තාක්ෂණික දැනුම බෙදාදේ.",
            "description_ta": "NAQDA உடன் இணைந்து ஏற்பாடு செய்யப்பட்ட இந்த மாநாடு நன்னீர் விவசாயிகளுக்கு நவீன நுட்பங்களை வழங்குகிறது.",
            "venue_en": "District Secretariat Auditorium, Anuradhapura",
            "venue_si": "දිස්ත්‍රික් ලේකම් කාර්යාල ශ්‍රවණාගාරය, අනුරාධපුරය",
            "venue_ta": "மாவட்ட செயலக மண்டபம், அனுராதபுரம்",
            "location_en": "North Central Province",
            "location_si": "උතුරු මැද පළාත",
            "location_ta": "வடமத்திய மாகாணம்",
            "organizer_en": "National Aquaculture Development Authority (NAQDA)",
            "organizer_si": "ජාතික ජලජීවී වගා සංවර්ධන අධිකාරිය (NAQDA)",
            "organizer_ta": "தேசிய நீரியல் வளர்ப்பு அபிவிருத்தி அதிகாரசபை (NAQDA)",
            "date": "2026-07-05",
            "display_date": "05 July 2026",
            "time": "09:00 AM - 03:30 PM",
            "contact_email": "inland@naqda.gov.lk",
            "contact_phone": "+94 25 222 2841",
            "agenda": [
                {"time": "09:00 AM", "topic": "Overview of National Freshwater Production Targets"},
                {"time": "10:30 AM", "topic": "Scientific Water Quality Testing in Village Ponds"},
                {"time": "01:00 PM", "topic": "Feed Optimization & Disease Prevention"},
                {"time": "02:30 PM", "topic": "Subsidized Fingerling Distribution Protocol"},
            ],
        },
        {
            "order": 4,
            "reference_number": "MFAR/EV/2026/004",
            "slug": "coastal-community-welfare-pension-enrollment-drive",
            "category": "community_outreach",
            "status": "Upcoming",
            "is_featured": False,
            "title_en": "Coastal Fisher Welfare & Pension Scheme Community Outreach Drive",
            "title_si": "ධීවර ප්‍රජා සුබසාධන හා විශ්‍රාම වැටුප් ලියාපදිංචි කිරීමේ ජංගම සේවය",
            "title_ta": "கடலோர மீனவர் நலன்புரி & ஓய்வூதியத் திட்டம் சமூக விழிப்புணர்வு நிகழ்வு",
            "summary_en": "District-level public consultation and enrollment drive assisting artisanal fishers and women seafood processors with social security and insurance coverage.",
            "summary_si": "සාම්ප්‍රදායික සුළු පරිමාණ ධීවරයින් සහ වියළි මත්ස්‍ය නිෂ්පාදිකාවන් සමාජ ආරක්ෂණ විශ්‍රාම වැටුප් ක්‍රමයට ලියාපදිංචි කිරීමේ ජංගම සේවාව.",
            "summary_ta": "மீனவர்கள் மற்றும் பெண்களுக்கான சமூக பாதுகாப்பு மற்றும் காப்புறுதி பதிவு திட்டம்.",
            "description_en": "Ministry officers will visit coastal landing sites to register artisanal fishers under the revamped Fishermen's Pension and Social Security Benefit Scheme.",
            "description_si": "නව විශ්‍රාම වැටුප් හා සමාජ ආරක්ෂණ ප්‍රතිලාභ ක්‍රමය යටතේ ධීවරයින් ලියාපදිංචි කිරීම සඳහා අමාත්‍යාංශ නිලධාරීන් වෙරළබඩ ධීවර ගම්මාන වෙත පැමිණෙනු ඇත.",
            "description_ta": "அமைச்சு அதிகாரிகள் கடலோர கிராமங்களுக்கு நேரடியாக சென்று பதிவுகளை மேற்கொள்வர்.",
            "venue_en": "Trincomalee Fisheries Community Center, Orr's Hill",
            "venue_si": "ත්‍රිකුණාමලය ධීවර ප්‍රජා ශාලාව, ඕර්ස් හිල්",
            "venue_ta": "திருகோணமலை கடற்றொழில் சமூக மையம், ஓர்ஸ் ஹில்",
            "location_en": "Eastern Province",
            "location_si": "නැගෙනහිර පළාත",
            "location_ta": "கிழக்கு மாகாணம்",
            "organizer_en": "Fisheries Welfare Directorate & Social Security Board",
            "organizer_si": "ධීවර සුබසාධන අධ්‍යක්ෂ මණ්ඩලය සහ සමාජ ආරක්ෂණ මණ්ඩලය",
            "organizer_ta": "கடற்றொழில் நலன்புரி பணிப்பாளர் நாயகம்",
            "date": "2026-07-18",
            "display_date": "18 July 2026",
            "time": "08:00 AM - 05:00 PM",
            "contact_email": "welfare@fisheries.gov.lk",
            "contact_phone": "+94 26 222 2271",
            "agenda": [
                {"time": "08:00 AM", "topic": "On-Site Biometric Enrollment & ID Verification"},
                {"time": "11:00 AM", "topic": "Briefing on Medical Disability Grants"},
                {"time": "02:00 PM", "topic": "Distribution of Digital Welfare Passbooks"},
            ],
        },
        {
            "order": 5,
            "reference_number": "MFAR/EV/2026/005",
            "slug": "sustainable-tuna-export-standards-roundtable",
            "category": "stakeholder_forums",
            "status": "Completed",
            "is_featured": False,
            "title_en": "Roundtable on International Yellowfin Tuna Traceability & Export Standards",
            "title_si": "ජාත්‍යන්තර කෙලවල්ලා මත්ස්‍ය ලුහුබැඳීම සහ අපනයන ප්‍රමිති පිළිබඳ වටමේස සාකච්ඡාව",
            "title_ta": "சர்வதேச சூரை மீன் கண்காணிப்பு மற்றும் ஏற்றுமதி தரம் தொடர்பான வட்டமேசை கலந்துரையாடல்",
            "summary_en": "A high-level dialogue between seafood exporters, harbor masters, and quality control inspectors reviewing compliance with EU and Japanese market certifications.",
            "summary_si": "යුරෝපා සහ ජපාන වෙළඳපොළ ප්‍රමිතීන්ට අනුකූල වීම පිළිබඳ අපනයනකරුවන්, වරාය නිලධාරීන් සහ තත්ත්ව පාලන පරීක්ෂකයින් අතර පැවති සාකච්ඡාව.",
            "summary_ta": "கடல் உணவு ஏற்றுமதியாளர்கள் மற்றும் தரக்கட்டுப்பாட்டு அதிகாரிகளுக்கு இடையிலான உயர்மட்ட கலந்துரையாடல்.",
            "description_en": "Focused on maintaining Sri Lanka's premium export status, this roundtable assessed digitized electronic logbook submissions, satellite catch landing verification, and cold-chain temperature monitoring standards.",
            "description_si": "ඩිජිටල් ධීවර සටහන් පොත් භාවිතය, චන්ද්‍රිකා මඟින් මත්ස්‍ය අස්වැන්න තහවුරු කිරීම සහ සීතල කාමර උෂ්ණත්ව ප්‍රමිතීන් මෙහිදී සමාලෝචනය කෙරිණි.",
            "description_ta": "டிஜிட்டல் பதிவு புத்தகங்கள் மற்றும் குளிரூட்டல் தரநிலைகள் குறித்து ஆராயப்பட்டது.",
            "venue_en": "Cinnamon Grand Ballroom, Colombo",
            "venue_si": "සිනමන් ග්‍රෑන්ඩ් හෝටලය, කොළඹ",
            "venue_ta": "சின்னமன் கிராண்ட் ஹோட்டல், கொழும்பு",
            "location_en": "Western Province",
            "location_si": "බස්නාහිර පළාත",
            "location_ta": "மேல் மாகாணம்",
            "organizer_en": "Department of Fisheries & Seafood Exporters Association",
            "organizer_si": "ධීවර දෙපාර්තමේන්තුව සහ මත්ස්‍ය අපනයනකරුවන්ගේ සංගමය",
            "organizer_ta": "கடற்றொழில் திணைக்களம் & கடல் உணவு ஏற்றுமதியாளர் சங்கம்",
            "date": "2026-05-14",
            "display_date": "14 May 2026",
            "time": "09:30 AM - 01:30 PM",
            "contact_email": "exports@fisheries.gov.lk",
            "contact_phone": "+94 11 244 6183",
            "agenda": [
                {"time": "09:30 AM", "topic": "Keynote: 2026 EU Export Compliance Standards"},
                {"time": "10:30 AM", "topic": "Digital Catch Certificate Verification Protocol"},
                {"time": "12:00 PM", "topic": "Recommendations for Harbour Ice Production Upgrades"},
            ],
        },
        {
            "order": 6,
            "reference_number": "MFAR/EV/2026/006",
            "slug": "marine-protected-areas-coral-conservation-workshop",
            "category": "workshops_training",
            "status": "Upcoming",
            "is_featured": False,
            "title_en": "Scientific Workshop on Bar Reef Marine Sanctuary Conservation & Citizen Science",
            "title_si": "බාර් රීෆ් සාගර අභයභූමි සංරක්ෂණය සහ විද්‍යාත්මක ගවේෂණ වැඩමුළුව",
            "title_ta": "பார் பாறை கடல் சரணாலய பாதுகாப்பு மற்றும் அறிவியல் பட்டறை",
            "summary_en": "Community training for dive operators, eco-tourism guides, and fishers on coral reef monitoring and participatory biodiversity recording.",
            "summary_si": "කොරල්පර නිරීක්ෂණය සහ සාගර ජෛව විවිධත්වය සංරක්ෂණය පිළිබඳ කිමිදුම්කරුවන්, පරිසර සංචාරක මාර්ගෝපදේශකයින් සහ ධීවරයින් දැනුවත් කිරීමේ වැඩමුළුව.",
            "summary_ta": "பவளப்பாறை கண்காணிப்பு மற்றும் கடல்சார் பல்லுயிர் பாதுகாப்பு குறித்த சமூக பயிற்சி.",
            "description_en": "Organized jointly with NARA marine biologists, this workshop trains coastal stakeholders on rapid reef health assessment and reporting illegal dynamite fishing or bottom trawling activities.",
            "description_si": "NARA සාගර ජීව විද්‍යාඥයින් සමඟ එක්ව සංවිධානය කරනු ලබන මෙම වැඩමුළුව මඟින් කොරල්පර සෞඛ්‍යය ඇගයීම පිළිබඳ පුහුණුව ලබාදේ.",
            "description_ta": "NARA விஞ்ஞானிகளுடன் இணைந்து ஏற்பாடு செய்யப்பட்ட இந்த பட்டறை பவளப்பாறை பாதுகாப்பு குறித்து பயிற்சி அளிக்கிறது.",
            "venue_en": "Kalpitiya NARA Field Marine Station",
            "venue_si": "කල්පිටිය NARA ක්ෂේත්‍ර සාගර පර්යේෂණ මධ්‍යස්ථානය",
            "venue_ta": "கற்பிட்டி NARA கடல்சார் ஆராய்ச்சி நிலையம்",
            "location_en": "North Western Province",
            "location_si": "වයඹ පළාත",
            "location_ta": "வடமேல் மாகாணம்",
            "organizer_en": "NARA & Marine Conservation Taskforce",
            "organizer_si": "NARA සහ සාගර සංරක්ෂණ කාර්යසාධක බලකාය",
            "organizer_ta": "NARA & கடல்சார் பாதுகாப்பு செயலணி",
            "date": "2026-08-04",
            "display_date": "04 August 2026",
            "time": "09:00 AM - 03:00 PM",
            "contact_email": "conservation@nara.ac.lk",
            "contact_phone": "+94 32 226 0190",
            "agenda": [
                {"time": "09:00 AM", "topic": "Bar Reef Coral Bleaching Recovery Status"},
                {"time": "11:00 AM", "topic": "Field Training: Underwater Photo Transect Mapping"},
                {"time": "01:30 PM", "topic": "Establishing Community Anti-Poaching Hotline"},
            ],
        },
    ]

    for item in events_data:
        obj, created = EventItem.objects.update_or_create(
            slug=item["slug"],
            defaults=item,
        )
        print(f"  {'Created' if created else 'Updated'}: [{obj.reference_number}] {obj.title_en}")

    print("[SUCCESS] Events Page Data Successfully Seeded!")

if __name__ == "__main__":
    seed()
