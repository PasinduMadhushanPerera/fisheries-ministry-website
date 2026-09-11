from django.core.management.base import BaseCommand
from procurement_page.models import ProcurementPageHeader, ProcurementTenderItem


class Command(BaseCommand):
    help = "Seed rich multilingual data for Procurement & Tenders Portal"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Procurement page and tenders...")

        # 1. Page Header
        hdr, _ = ProcurementPageHeader.objects.get_or_create(id=1)
        hdr.badge_text_en = "Transparency & Public Accountability"
        hdr.badge_text_si = "විනිවිදභාවය සහ මහජන වගවීම"
        hdr.badge_text_ta = "வெளிப்படைத்தன்மை மற்றும் பொதுப் பொறுப்புக்கூறல்"

        hdr.title_en = "Procurement & Tenders Portal"
        hdr.title_si = "ප්‍රසම්පාදන සහ ටෙන්ඩර් ද්වාරය"
        hdr.title_ta = "கொள்முதல் மற்றும் கேள்விப்பத்திர போர்டல்"

        hdr.description_en = "Official e-procurement portal of the Ministry of Fisheries. Access competitive bidding documents, harbor development tenders, equipment purchasing notices, and contract award summaries."
        hdr.description_si = "ධීවර අමාත්‍යාංශයේ නිල විද්‍යුත් ප්‍රසම්පාදන ද්වාරය. තරඟකාරී ලංසු ලේඛන, වරාය සංවර්ධන ටෙන්ඩර්, උපකරණ මිලදී ගැනීමේ දැන්වීම් සහ කොන්ත්‍රාත්තු පිරිනැමීමේ තොරතුරු වෙත ප්‍රවේශ වන්න."
        hdr.description_ta = "கடற்றොழில் அமைச்சின் உத்தியோகபூர்ව கொள்முதல் தளம். கேள்விப்பத்திர ஆவணங்கள், துறைமுக அபிවிருத்திப் பணிகள், உபகரணக் கொள்முதல் மற்றும் ஒப்பந்த விருது விபரங்களைப் பார்வையிடவும்."

        hdr.featured_badge_en = "Featured Procurement Notices"
        hdr.featured_badge_si = "විශේෂ ප්‍රසම්පාදන දැන්වීම්"
        hdr.featured_badge_ta = "சிறப்பு கொள்முதல் அறிவிப்புகள்"

        hdr.catalogue_badge_en = "Active & Archived Notices"
        hdr.catalogue_badge_si = "ක්‍රියාකාරී සහ ලේඛනාගාර දැන්වීම්"
        hdr.catalogue_badge_ta = "செயலில் உள்ள மற்றும் காப்பகப்படுத்தப்பட்ட அறிவிப்புகள்"

        hdr.library_title_en = "Procurement & Tenders Library"
        hdr.library_title_si = "ප්‍රසම්පාදන සහ ටෙන්ඩර් එකතුව"
        hdr.library_title_ta = "கொள்முதல் மற்றும் கேள்விப்பத்திர நூலகம்"
        hdr.save()

        # 2. Tenders Data
        tenders_data = [
            {
                "slug": "mirissa-harbour-dredging-deepening-2026",
                "ref_number": "MOF/PR/2026/04",
                "order": 1,
                "year": 2026,
                "category": "harbour",
                "status": "Closing Soon",
                "featured": True,
                "title_en": "Dredging and Basin Deepening Works at Mirissa Fishery Harbour",
                "title_si": "මිරිස්ස ධීවර වරායේ වැලි හෑරීම සහ ද්‍රෝණිය ගැඹුරු කිරීමේ වැඩසටහන",
                "title_ta": "மிரிஸ்ஸ மீன்பிடித் துறைமுகத்தில் அகழ்வாராய்ச்சி மற்றும் ஆழப்படுத்தும் பணிகள்",
                "publisher_en": "Ceylon Fishery Harbours Corporation (CFHC)",
                "publisher_si": "ලංකා ධීවර වරාය නීතිගත සංස්ථාව (CFHC)",
                "publisher_ta": "இலங்கை மீன்பிடித் துறைமுகக் கூட்டுத்தாபனம் (CFHC)",
                "description_en": "Sealed bids are invited from CIDA-registered civil engineering contractors for maintenance dredging, entrance channel clearing, and basin deepening works at Mirissa Fishery Harbour.",
                "description_si": "මිරිස්ස ධීවර වරායේ නඩත්තු වැලි හෑරීම, පිවිසුම් ඇල මාර්ගය පිරිසිදු කිරීම සහ වරාය ද්‍රෝණිය ගැඹුරු කිරීම සඳහා CIDA ලියාපදිංචි ඉංජිනේරු කොන්ත්‍රාත්කරුවන්ගෙන් මුද්‍රා තැබූ ලංසු කැඳවනු ලැබේ.",
                "description_ta": "மிரிஸ்ஸ மீன்பிடித் துறைமுகத்தில் அகழ்வாராய்ச்சி மற்றும் ஆழப்படுத்தும் பணிகளுக்காக CIDA பதிவுசெய்த ஒப்பந்தக்காரர்களிடமிருந்து கேள்விப்பத்திரங்கள் கோரப்படுகின்றன.",
                "category_label_en": "Harbour & Civil Works",
                "category_label_si": "වරාය සහ සිවිල් වැඩ",
                "category_label_ta": "துறைமுகம் மற்றும் சிவில் பணிகள்",
                "detailed_scope_en": "Removal of approximately 45,000 cu.m of marine sediment from inner harbour basin\nMaintenance clearing of harbour entrance navigation channel to 5.5m depth\nEnvironmental water quality monitoring during dredging operations\nDredged spoil disposal at designated offshore dumping location",
                "detailed_scope_si": "අභ්‍යන්තර වරාය ද්‍රෝණියෙන් ඝන මීටර් 45,000 ක සමුද්‍ර අවසාදිත ඉවත් කිරීම\nවරාය පිවිසුම් නාවික ඇල මාර්ගය මීටර් 5.5 ක් ගැඹුරට පිරිසිදු කිරීම\nවැලි හෑරීමේ මෙහෙයුම් අතරතුර පාරිසරික ජල තත්ත්ව නිරීක්ෂණය\nඉවත් කරන ලද වැලි නියමිත ගැඹුරු මුහුදු ස්ථානයක බැහැර කිරීම",
                "detailed_scope_ta": "துறைமுக உட்பகுதியில் இருந்து 45,000 கன மீற்றர் படிவுகளை அகற்றுதல்\nநுழைவுப் பாதையை 5.5 மீற்றர் ஆழத்திற்கு துப்பரவு செய்தல்\nசுற்றுச்சூழல் நீர் தர கண்காணிப்பு\nஅகற்றப்பட்ட படிவுகளை நியமிக்கப்பட்ட கடல் பகுதியில் கொட்டுதல்",
                "published_date": "2026-02-01",
                "closing_date": "2026-03-25",
                "submission_address_en": "Procurement Committee, CFHC HQ, No. 15, Rock House Lane, Colombo 15",
                "submission_address_si": "ප්‍රසම්පාදන කමිටුව, ලංකා ධීවර වරාය නීතිගත සංස්ථාව, අංක 15, රොක් හවුස් පටුමග, කොළඹ 15",
                "submission_address_ta": "கொள்முதல் குழு, CFHC தலைமையகம், இல. 15, ரொக் ஹவுஸ் லேன், கொழும்பு 15",
                "tender_fee_en": "LKR 12,500 (Non-refundable)",
                "tender_fee_si": "රු. 12,500 (ආපසු නොගෙවනු ලැබේ)",
                "tender_fee_ta": "ரூபா 12,500 (மீளளிக்கப்பட மாட்டாது)",
                "bid_security_en": "LKR 450,000 (Valid for 120 days)",
                "bid_security_si": "රු. 450,000 (දින 120 ක් වලංගු)",
                "bid_security_ta": "ரூபா 450,000 (120 நாட்களுக்கு செல்லுபடியாகும்)",
                "eligibility_en": "CIDA Grade C3 or above in Marine / Dredging Works",
                "eligibility_si": "සමුද්‍ර / වැලි හෑරීමේ කටයුතු පිළිබඳ CIDA ශ්‍රේණිය C3 හෝ ඊට ඉහළ",
                "eligibility_ta": "கடல்சார் / அகழ்வாராய்ச்சி பணிகளில் CIDA தரம் C3 அல்லது அதற்கு மேல்",
                "contact_info_en": "Chief Engineer (Harbours): +94 112 529 361 | tender@cfhc.gov.lk",
                "contact_info_si": "ප්‍රධාන ඉංජිනේරු (වරාය): +94 112 529 361 | tender@cfhc.gov.lk",
                "contact_info_ta": "தலைமை பொறியியலாளர்: +94 112 529 361 | tender@cfhc.gov.lk",
                "file_type": "PDF",
                "file_size": "2.4 MB",
            },
            {
                "slug": "supply-installation-flake-ice-plants-2026",
                "ref_number": "MOF/EQ/2026/01",
                "order": 2,
                "year": 2026,
                "category": "equipment",
                "status": "Open",
                "featured": True,
                "title_en": "Supply, Installation and Commissioning of Industrial Flake Ice Plants",
                "title_si": "කාර්මික පෙති අයිස් (Flake Ice) නිෂ්පාදන යන්ත්‍රාගාර සැපයීම සහ ස්ථාපනය කිරීම",
                "title_ta": "தொழில்துறை செதில் பனி உற்பத்தி ஆலைகளை வழங்குதல் மற்றும் நிறுவுதல்",
                "publisher_en": "Ministry of Fisheries HQ",
                "publisher_si": "ධීවර අමාත්‍යාංශ ප්‍රධාන කාර්යාලය",
                "publisher_ta": "கடற்றொழில் அமைச்சு தலைமையகம்",
                "description_en": "International competitive bidding for the supply, installation, testing and commissioning of three 25-Ton daily capacity industrial flake ice making plants for coastal fish landing centers.",
                "description_si": "වෙරළබඩ මසුන් ගොඩබෑමේ මධ්‍යස්ථාන සඳහා දෛනික ධාරිතාව ටොන් 25 ක් වන කාර්මික පෙති අයිස් නිෂ්පාදන යන්ත්‍රාගාර තුනක් සැපයීම, ස්ථාපනය සහ පරීක්ෂා කිරීම සඳහා ජාත්‍යන්තර තරඟකාරී ලංසු කැඳවීම.",
                "description_ta": "கரையோர மீன் இறங்குதளங்களுக்கான 25 தொன் தினசரி திறன் கொண்ட மூன்று தொழில்துறை பனி உற்பத்தி ஆலைகளை வழங்குவதற்கும் நிறுவுவதற்கும் சர்வதேச கேள்விப்பத்திரம்.",
                "category_label_en": "Equipment & Refrigeration",
                "category_label_si": "උපකරණ සහ ශීතකරණ",
                "category_label_ta": "உபகரணங்கள் மற்றும் குளிரூட்டல்",
                "detailed_scope_en": "Supply of 3 x 25-Ton/day automated containerized flake ice production units\nInstallation of ammonia/eco-refrigerant compressors and ice storage bins\nOn-site technical training for Ministry refrigeration technicians\nComprehensive 2-year warranty and maintenance service agreement",
                "detailed_scope_si": "දිනකට ටොන් 25 ක ධාරිතාවෙන් යුත් ස්වයංක්‍රීය කන්ටේනර්ගත අයිස් නිෂ්පාදන ඒකක 3 ක් සැපයීම\nඇමෝනියා/පරිසර හිතකාමී ශීතකාරක සම්පීඩක සහ අයිස් ගබඩා බඳුන් ස්ථාපනය\nඅමාත්‍යාංශ ශීතකරණ කාර්මික ශිල්පීන් සඳහා ප්‍රායෝගික තාක්ෂණික පුහුණුව\nවසර 2 ක පූර්ණ වගකීම් සහ නඩත්තු සේවා ගිවිසුම",
                "detailed_scope_ta": "3 x 25-தொன்/நாள் தானியங்கி பனி உற்பத்தி அலகுகளை வழங்குதல்\nஅம்மோனியா/சூழல் நட்பு அமுக்கிகள் மற்றும் பனி சேமிப்பு தொட்டிகளை நிறுவுதல்\nதொழில்நுட்ப வல்லுநர்களுக்கான தளப் பயிற்சி\n2 வருட உத்தரவாதம் மற்றும் பராமரிப்பு சேவை ஒப்பந்தம்",
                "published_date": "2026-01-15",
                "closing_date": "2026-04-10",
                "submission_address_en": "Ministry Procurement Committee, New Secretariat, Maligawatta, Colombo 10",
                "submission_address_si": "අමාත්‍යාංශ ප්‍රසම්පාදන කමිටුව, නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10",
                "submission_address_ta": "அமைச்சு கொள்முதல் குழு, புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10",
                "tender_fee_en": "LKR 25,000",
                "tender_fee_si": "රු. 25,000",
                "tender_fee_ta": "ரூபா 25,000",
                "bid_security_en": "LKR 1,200,000",
                "bid_security_si": "රු. 1,200,000",
                "bid_security_ta": "ரூபா 1,200,000",
                "eligibility_en": "Authorized original equipment manufacturers (OEM) or certified agents",
                "eligibility_si": "බලයලත් මුල් උපකරණ නිෂ්පාදකයින් (OEM) හෝ සහතික කළ නියෝජිතයින්",
                "eligibility_ta": "அங்கீகரிக்கப்பட்ட உற்பத்தியாளர்கள் (OEM) அல்லது சான்றளிக்கப்பட்ட முகவர்கள்",
                "contact_info_en": "Director Engineering: +94 112 327 060 | procurement@fisheries.gov.lk",
                "contact_info_si": "ඉංජිනේරු අධ්‍යක්ෂ: +94 112 327 060 | procurement@fisheries.gov.lk",
                "contact_info_ta": "பொறியியல் பணிப்பாளர்: +94 112 327 060 | procurement@fisheries.gov.lk",
                "file_type": "PDF",
                "file_size": "1.8 MB",
            },
            {
                "slug": "vms-satellite-transceivers-dfar-2026",
                "ref_number": "MOF/IT/2026/02",
                "order": 3,
                "year": 2026,
                "category": "it",
                "status": "Open",
                "featured": True,
                "title_en": "Procurement of Enterprise VMS Satellite Transceivers and Server Hardware",
                "title_si": "VMS චන්ද්‍රිකා සම්ප්‍රේෂක සහ සර්වර් දෘඩාංග ප්‍රසම්පාදනය",
                "title_ta": "VMS செய்மதி டிரான்ஸ்ஸீவர்ஸ் மற்றும் சர்வர் வன்பொருள் கொள்முதல்",
                "publisher_en": "Department of Fisheries and Aquatic Resources (DFAR)",
                "publisher_si": "ධීවර හා ජලජ සම්පත් දෙපාර්තමේන්තුව (DFAR)",
                "publisher_ta": "கடற்றொழில் மற்றும் நீரியல் வளங்கள் திணைக்களம் (DFAR)",
                "description_en": "Supply and delivery of 150 Inmarsat/Iridium Marine Satellite VMS Transceivers and enterprise rack servers for DFAR Monitoring, Control and Surveillance (MCS) operations center.",
                "description_si": "DFAR මෙහෙයුම් මධ්‍යස්ථානය සඳහා Inmarsat/Iridium සමුද්‍ර චන්ද්‍රිකා VMS සම්ප්‍රේෂක 150 ක් සහ රැක් සර්වර් පද්ධති සැපයීම.",
                "description_ta": "DFAR கண்காணிப்பு மற்றும் கட்டுப்பாட்டு மையத்திற்காக 150 Inmarsat/Iridium செய்மதி VMS டிரான்ஸ்ஸீவர்ஸ் மற்றும் சர்வர் வன்பொருட்களை வழங்குதல்.",
                "category_label_en": "IT & Communications",
                "category_label_si": "තොරතුරු තාක්ෂණය හා සන්නිවේදනය",
                "category_label_ta": "தகவல் தொழில்நுட்பம் மற்றும் தொடர்பாடல்",
                "detailed_scope_en": "150 x IP67 waterproof marine VMS transceivers with emergency SOS button\n2 x Enterprise 2U Rack Servers with 128GB RAM & redundant power supplies\nIntegration API documentation for existing national vessel registry system\nType approval certification by Telecommunications Regulatory Commission (TRCSL)",
                "detailed_scope_si": "හදිසි SOS බොත්තමක් සහිත IP67 ජල ආරක්ෂිත සමුද්‍ර VMS සම්ප්‍රේෂක 150 ක්\n128GB RAM සහ අමතර බල සැපයුම් සහිත Enterprise 2U රැක් සර්වර් 2 ක්\nජාතික යාත්‍රා ලේඛකාධිකාරී පද්ධතිය සමඟ ඒකාබද්ධ කිරීමේ API ලියකියවිලි\nශ්‍රී ලංකා විදුලි සංදේශ නියාමන කොමිෂන් සභාවේ (TRCSL) අනුමැතිය",
                "detailed_scope_ta": "அவசர SOS பொத்தானுடன் கூடிய 150 நீர்ப்புகா கடல்சார் VMS டிரான்ஸ்ஸீவர்ஸ்\n128GB RAM கொண்ட 2 எண்டர்பிரைஸ் சர்வர்கள்\nதேசிய படகு பதிவு முறைமைக்கான API ஆவணப்படுத்தல்\nதொலைத்தொடர்பு ஒழுங்குமுறை ஆணைக்குழுவின் (TRCSL) ஒப்புதல்",
                "published_date": "2026-01-20",
                "closing_date": "2026-04-05",
                "submission_address_en": "Departmental Procurement Committee, DFAR, Maligawatta, Colombo 10",
                "submission_address_si": "දෙපාර්තමේන්තු ප්‍රසම්පාදන කමිටුව, ධීවර දෙපාර්තමේන්තුව, මාළිගාවත්ත, කොළඹ 10",
                "submission_address_ta": "திணைக்கள கொள்முதல் குழு, DFAR, மாளிகாவத்தை, கொழும்பு 10",
                "tender_fee_en": "LKR 15,000",
                "tender_fee_si": "රු. 15,000",
                "tender_fee_ta": "ரூபா 15,000",
                "bid_security_en": "LKR 650,000",
                "bid_security_si": "රු. 650,000",
                "bid_security_ta": "ரூபா 650,000",
                "eligibility_en": "TRCSL registered ICT vendors with marine electronics experience",
                "eligibility_si": "සමුද්‍ර ඉලෙක්ට්‍රොනික ක්ෂේත්‍රයේ පළපුරුද්ද ඇති TRCSL ලියාපදිංචි ICT සැපයුම්කරුවන්",
                "eligibility_ta": "கடல்சார் மின்னணுவியல் அனுபவமுள்ள TRCSL பதிவுசெய்த ICT வழங்குநர்கள்",
                "contact_info_en": "MCS Operations Manager: +94 112 449 175 | mcs@fisheriesdept.gov.lk",
                "contact_info_si": "MCS මෙහෙයුම් කළමනාකරු: +94 112 449 175 | mcs@fisheriesdept.gov.lk",
                "contact_info_ta": "MCS செயல்பாட்டு முகாமையாளர்: +94 112 449 175 | mcs@fisheriesdept.gov.lk",
                "file_type": "PDF",
                "file_size": "1.2 MB",
            },
            {
                "slug": "research-vessel-drydocking-overhaul-2026",
                "ref_number": "NARA/TN/2026/01",
                "order": 4,
                "year": 2026,
                "category": "harbour",
                "status": "Open",
                "featured": True,
                "title_en": "Drydocking, Hull Preservation and Overhaul of Oceanographic Research Vessel",
                "title_si": "සාගර පර්යේෂණ නෞකාවේ වියළි තටාකගත කිරීම, බඳ සංරක්ෂණය සහ ප්‍රතිසංස්කරණය",
                "title_ta": "சமுத்திரவியல் ஆராய்ச்சி கப்பலின் உலர் கப்பல்துறை பராமரிப்பு மற்றும் மேலமைப்பு பணிகள்",
                "publisher_en": "National Aquatic Resources Research and Development Agency (NARA)",
                "publisher_si": "ජාතික ජලජ සම්පත් පර්යේෂණ හා සංවර්ධන නියෝජිතායතනය (NARA)",
                "publisher_ta": "தேசிய நீரியல் வளங்கள் ஆராய்ச்சி மற்றும் அபிவிருத்தி முகவரகம் (NARA)",
                "description_en": "Tenders are invited for scheduled biennial drydocking, hull sandblasting, antifouling painting, sonar transducer inspection, and main propulsion overhaul for NARA research vessel R/V Samuddrika.",
                "description_si": "නාරා (NARA) පර්යේෂණ නෞකාව වියළි තටාකගත කිරීම, බඳ වැලි ගසා පිරිසිදු කිරීම, ඇන්ටිෆවුලිං තීන්ත ආලේප කිරීම සහ ප්‍රධාන එන්ජින් අලුත්වැඩියාව සඳහා ටෙන්ඩර් කැඳවීම.",
                "description_ta": "NARA ஆராய்ச்சி கப்பலுக்கான உலர் கப்பல்துறை பராமரிப்பு, மேலோடு மணல் வெடிப்பு மற்றும் பிரதான இயந்திர பழுதுபார்ப்புக்கான கேள்விப்பத்திரம்.",
                "category_label_en": "Harbour & Civil Works",
                "category_label_si": "වරාය සහ සිවිල් වැඩ",
                "category_label_ta": "துறைமுகம் மற்றும் சிவில் பணிகள்",
                "detailed_scope_en": "Complete vessel drydocking for 21 days in certified shipyard\nHull high-pressure washing, grit blasting to SA 2.5 standard & marine coating\nShaft alignment, rudder clearance checks and ultrasonic thickness gauging\nOverhaul of auxiliary generators and scientific winch hydraulics",
                "detailed_scope_si": "සහතික කළ නැව් තටාකාංගනයක දින 21 ක් නෞකාව වියළි තටාකගත කිරීම\nනෞකා බඳ අධි පීඩන සේදීම, SA 2.5 ප්‍රමිතියට වැලි ගැසීම සහ සමුද්‍ර තීන්ත ආලේපනය\nපතුවළ පෙළගැස්ම, සුක්කානම් නිෂ්කාශන පරීක්ෂාව සහ අතිධ්වනික ඝණකම මැනීම\nඋප ජනක යන්ත්‍ර සහ විද්‍යාත්මක වින්ච් හයිඩ්‍රොලික්ස් පද්ධති අලුත්වැඩියාව",
                "detailed_scope_ta": "சான்றளிக்கப்பட்ட கப்பல் கட்டும் தளத்தில் 21 நாட்கள் உலர் கப்பல்துறை பராமரிப்பு\nமேலோடு உயர் அழுத்த கழுவுதல் மற்றும் கடல் பூச்சு\nசுக்கான் சரிபார்ப்பு மற்றும் தடிமன் அளவீடு\nமின்பிறப்பிகள் மற்றும் வின்ச் அமைப்புகளின் மேலமைப்பு",
                "published_date": "2026-02-05",
                "closing_date": "2026-03-30",
                "submission_address_en": "Chairman Procurement Committee, NARA HQ, Crow Island, Mattakkuliya, Colombo 15",
                "submission_address_si": "සභාපති ප්‍රසම්පාදන කමිටුව, නාරා (NARA), කපුටු දූපත, මට්ටක්කුලිය, කොළඹ 15",
                "submission_address_ta": "தலைவர் கொள்முதல் குழு, NARA, மட்டக்குளி, கொழும்பு 15",
                "tender_fee_en": "LKR 10,000",
                "tender_fee_si": "රු. 10,000",
                "tender_fee_ta": "ரூபா 10,000",
                "bid_security_en": "LKR 350,000",
                "bid_security_si": "රු. 350,000",
                "bid_security_ta": "ரூபா 350,000",
                "eligibility_en": "Commercial Shipyards certified by IACS or ClassNK / Lloyd's Register",
                "eligibility_si": "IACS හෝ ClassNK / Lloyd's Register විසින් සහතික කරන ලද වාණිජ නැව් තටාකාංගන",
                "eligibility_ta": "IACS அல்லது ClassNK ஆல் சான்றளிக்கப்பட்ட வணிக கப்பல் கட்டும் தளங்கள்",
                "contact_info_en": "Director General NARA: +94 112 521 000 | dg@nara.ac.lk",
                "contact_info_si": "අධ්‍යක්ෂ ජනරාල් නාරා: +94 112 521 000 | dg@nara.ac.lk",
                "contact_info_ta": "பணிப்பாளர் நாயகம் NARA: +94 112 521 000 | dg@nara.ac.lk",
                "file_type": "PDF",
                "file_size": "3.1 MB",
            },
        ]

        for t_data in tenders_data:
            slug = t_data.pop("slug")
            tender, created = ProcurementTenderItem.objects.get_or_create(slug=slug, defaults=t_data)
            if not created:
                for k, v in t_data.items():
                    setattr(tender, k, v)
                tender.save()

        self.stdout.write(self.style.SUCCESS("Successfully seeded Procurement & Tenders data!"))
