import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from news.models import NewsPageHeader, NewsArticleItem


def seed_news():
    print("[*] Starting News Data Seeding...")

    # 1. News Page Header
    header, created = NewsPageHeader.objects.get_or_create(
        id=1,
        defaults={
            # 🇬🇧 English
            "badge_text_en": "Ministry Newsroom",
            "title_en": "Latest News &",
            "highlighted_title_en": "Ministry Updates",
            "description_en": "Read the latest fisheries news, development updates, coastal community welfare programmes, and official events from across Sri Lanka.",
            "featured_badge_en": "Latest Featured News",
            "catalogue_badge_en": "Official News Feed",
            "library_title_en": "All News & Press Updates",

            # 🇱🇰 Sinhala (සිංහල)
            "badge_text_si": "අමාත්‍යාංශ ප්‍රවෘත්ති කාමරය",
            "title_si": "නවතම පුවත් සහ",
            "highlighted_title_si": "අමාත්‍යාංශ තොරතුරු",
            "description_si": "ශ්‍රී ලංකාව පුරා ධීවර පුවත්, සංවර්ධන තොරතුරු, වෙරළබඩ ප්‍රජා සුබසාධන වැඩසටහන් සහ නිල නිවේදන පිළිබඳව දැනුවත් වන්න.",
            "featured_badge_si": "විශේෂ ප්‍රමුඛ පුවත",
            "catalogue_badge_si": "නිල පුවත් එකතුව",
            "library_title_si": "සියලු පුවත් සහ මාධ්‍ය නිවේදන",

            # 🇱🇰 Tamil (தமிழ்)
            "badge_text_ta": "அமைச்சு செய்திப் பிரிவு",
            "title_ta": "சமீபத்திய செய்திகள் &",
            "highlighted_title_ta": "அமைச்சு புதுப்பிப்புகள்",
            "description_ta": "இலங்கை முழுவதும் உள்ள கடற்றொழில் செய்திகள், துறைசார் அபிவிருத்திகள், கரையோர மீனவ சமூக நலத்திட்டங்கள் மற்றும் நிகழ்வுகள்.",
            "featured_badge_ta": "சிறப்பு முக்கியச் செய்தி",
            "catalogue_badge_ta": "உத்தியோகபூர்வ செய்தித் தொகுப்பு",
            "library_title_ta": "அனைத்து செய்திகள் மற்றும் ஊடக வெளியீடுகள்",
        },
    )
    if not created:
        print("[i] News Page Header already exists.")
    else:
        print("[+] Seeded News Page Header.")

    # 2. News Articles
    articles_data = [
        {
            "order": 1,
            "slug": "mirissa-harbour-modernization-project-2026",
            "category": "development",
            "is_featured": True,
            "published_date": "2026-03-12",
            "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "image_alt": "Mirissa Fishery Harbour Modernization Ceremony",
            "file_type": "PDF",
            "file_size": "2.4 MB",
            # 🇬🇧 English
            "title_en": "Mirissa Fishery Harbour Modernization & Deep-Water Anchorage Project Launched",
            "publisher_en": "Ministry Media Unit & CFHC",
            "category_label_en": "Sector Development",
            "summary_en": "The Ministry of Fisheries and Ceylon Fishery Harbours Corporation have officially initiated a major modernization drive at the Mirissa Fishery Harbour, enhancing berthing safety and cold chain logistics.",
            "content_en": """<p>The Ministry of Fisheries, Aquatic and Ocean Resources in collaboration with the Ceylon Fishery Harbours Corporation (CFHC) has officially launched the comprehensive modernization of the Mirissa Fishery Harbour.</p>
<p>This landmark initiative includes deep-water basin dredging to a depth of 5.5 meters, breakwater reconstruction, installation of eco-friendly solar-powered cold storage facilities, and high-efficiency automated fuel bunkering stations.</p>
<p>Speaking at the inaugural event, Ministry officials highlighted that this upgrade will allow over 400 multiday fishing crafts to dock simultaneously under all weather conditions, significantly reducing post-harvest losses and improving the quality of export-grade tuna and pelagic species.</p>""",
            "attachment_title_en": "Mirissa Harbour Project Scope & Gazette Brief.pdf",
            # 🇱🇰 Sinhala
            "title_si": "මිරිස්ස ධීවර වරාය නවීකරණය සහ ගැඹුරු දිය නැංගුරම් පොළ සංවර්ධන ව්‍යාපෘතිය ආරම්භ කෙරේ",
            "publisher_si": "අමාත්‍යාංශ මාධ්‍ය අංශය සහ ලංකා ධීවර වරාය නීතිගත සංස්ථාව",
            "category_label_si": "ක්ෂේත්‍ර සංවර්ධනය",
            "summary_si": "ධීවර අමාත්‍යාංශය සහ ලංකා ධීවර වරාය නීතිගත සංස්ථාව එක්ව මිරිස්ස ධීවර වරාය නවීකරණය කිරීමේ මහා පරිමාණ ව්‍යාපෘතිය නිල වශයෙන් ආරම්භ කරන ලදී.",
            "content_si": """<p>ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය සහ ලංකා ධීවර වරාය නීතිගත සංස්ථාව (CFHC) එක්ව මිරිස්ස ධීවර වරාය පූර්ණ නවීකරණය කිරීමේ ව්‍යාපෘතිය නිල වශයෙන් ආරම්භ කර ඇත.</p>
<p>මෙම සුවිශේෂී ව්‍යාපෘතිය මඟින් වරාය ද්‍රෝණිය මීටර් 5.5 ක් දක්වා ගැඹුරු කිරීම, දියකඩනය ප්‍රතිසංස්කරණය කිරීම, සූර්ය බලයෙන් ක්‍රියාත්මක වන නවීන ශීතාගාර සංකීර්ණයක් ස්ථාපනය කිරීම සහ ස්වයංක්‍රීය ඉන්ධන පිරවුම් පද්ධති ස්ථාපිත කිරීම සිදු කෙරේ.</p>
<p>මෙමඟින් බහුදින ධීවර යාත්‍රා 400 කට අධික සංඛ්‍යාවකට ඕනෑම කාලගුණික තත්ත්වයකදී ආරක්ෂිතව නැංගුරම් ලෑමට හැකි වන අතර, පසු අස්වනු හානිය අවම කර උසස් තත්ත්වයේ මත්ස්‍ය නිෂ්පාදන අපනයනය සඳහා යොමු කිරීමට අවස්ථාව සැලසේ.</p>""",
            "attachment_title_si": "මිරිස්ස වරාය ව්‍යාපෘති විස්තර වාර්තාව.pdf",
            # 🇱🇰 Tamil
            "title_ta": "மிரிஸ்ஸ மீன்பிடித் துறைமுக நவீனமயமாக்கல் மற்றும் ஆழ்கடல் நங்கூரமிடல் திட்டம் ஆரம்பம்",
            "publisher_ta": "அமைச்சு ஊடகப் பிரிவு மற்றும் இலங்கை மீன்பிடித் துறைமுகக் கூட்டுத்தாபனம்",
            "category_label_ta": "துறைசார் அபிவிருத்தி",
            "summary_ta": "கடற்றொழில் அமைச்சு மற்றும் இலங்கை மீன்பிடித் துறைமுகக் கூட்டுத்தாபனம் இணைந்து மிரிஸ்ஸ மீன்பிடித் துறைமுகத்தை நவீனமயமாக்கும் பாரிய திட்டத்தை உத்தியோகபூர்வமாக ஆரம்பித்துள்ளது.",
            "content_ta": """<p>கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு மற்றும் இலங்கை மீன்பிடித் துறைமுகக் கூட்டுத்தாபனம் (CFHC) இணைந்து மிரிஸ்ஸ மீன்பිடித் துறைமுகத்தை நவீனமயமாக்கும் பாரிய திட்டத்தை உத்தியோகபூர்வமாக ஆரம்பித்துள்ளது.</p>
<p>இத்திட்டம் 5.5 மீற்றர் ஆழம் வரை அகழ்வு செய்தல், அலைதாங்கியை புனரமைத்தல், சூரியசக்தியில் இயங்கும் குளிரூட்டல் கட்டமைப்பு மற்றும் நவீன எரிபொருள் நிரப்பும் நிலையங்களை நிறுவுதல் ஆகியவற்றை உள்ளடக்கியுள்ளது.</p>
<p>இதன் மூலம் 400 க்கும் மேற்பட்ட பலநாள் மீன்பிடிப் படகுகள் எவ்வித தடையுமின்றி நங்கூரமிட முடிவதுடன், அறுவடைக்குப் பிந்தைய இழப்புகளை கணிசமாகக் குறைக்க முடியும்.</p>""",
            "attachment_title_ta": "மிரிஸ்ஸ துறைமுகத் திட்ட விபர அறிக்கை.pdf",
        },
        {
            "order": 2,
            "slug": "vms-satellite-transponders-multiday-vessels-2026",
            "category": "ministry",
            "is_featured": False,
            "published_date": "2026-03-05",
            "image_url_fallback": "/images/services/foreign-training.jpg",
            "image_alt": "VMS Satellite Transponder Distribution Event",
            "file_type": "PDF",
            "file_size": "1.8 MB",
            # 🇬🇧 English
            "title_en": "Subsidized Satellite VMS Transponders Distributed to 500 Multiday Fishing Vessels",
            "publisher_en": "Department of Fisheries and Aquatic Resources (DFAR)",
            "category_label_en": "Ministry News",
            "summary_en": "In a decisive move to enhance seafarer safety and combat IUU fishing, the Ministry has begun distributing high-precision satellite Vessel Monitoring System transponders.",
            "content_en": """<p>The Department of Fisheries and Aquatic Resources (DFAR) has initiated the distribution of 500 subsidized satellite-based Vessel Monitoring System (VMS) transponders to multiday fishing vessel owners across the island.</p>
<p>These advanced satellite units provide continuous 24/7 position tracking, distress emergency alerts (SOS), weather hazard warnings, and boundary breach alerts to prevent accidental entry into foreign maritime zones.</p>
<p>The Ministry has subsidized 75% of the unit costs to ensure broad adoption by small- and medium-scale multiday vessel operators, ensuring compliance with international maritime treaties and protecting crew lives at sea.</p>""",
            "attachment_title_en": "VMS Registration Guidelines & User Manual.pdf",
            # 🇱🇰 Sinhala
            "title_si": "බහුදින ධීවර යාත්‍රා 500 ක් සඳහා සහනාධාර සහිත සැටලයිට් VMS උපකරණ බෙදාදීම ආරම්භ වේ",
            "publisher_si": "ධීවර හා ජලජ සම්පත් දෙපාර්තමේන්තුව (DFAR)",
            "category_label_si": "අමාත්‍යාංශ පුවත්",
            "summary_si": "ධීවර ආරක්ෂාව සහතික කිරීම සහ නීතිවිරෝධී ධීවර කටයුතු වැළැක්වීම සඳහා බහුදින ධීවර යාත්‍රා සඳහා සැටලයිට් VMS උපකරණ බෙදාදීම අමාත්‍යාංශය මඟින් අරඹන ලදී.",
            "content_si": """<p>ධීවර හා ජලජ සම්පත් දෙපාර්තමේන්තුව (DFAR) මඟින් දිවයින පුරා බහුදින ධීවර යාත්‍රා හිමියන් සඳහා 75% ක රාජ්‍ය සහනාධාරයක් යටතේ නවීන සැටලයිට් VMS (Vessel Monitoring System) උපකරණ 500 ක් ලබාදීම ආරම්භ කර ඇත.</p>
<p>මෙම උපකරණ මඟින් පැය 24 පුරා යාත්‍රාවේ පිහිටීම නිරීක්ෂණය කිරීම, හදිසි ආපදා අනතුරු ඇඟවීම් (SOS), අයහපත් කාලගුණ අනාවැකි සහ ජාත්‍යන්තර මුහුදු සීමා පිළිබඳ ක්ෂණික අනතුරු ඇඟවීම් ලබාදෙයි.</p>""",
            "attachment_title_si": "VMS උපකරණ ලියාපදිංචි මාර්ගෝපදේශය.pdf",
            # 🇱🇰 Tamil
            "title_ta": "500 பலநாள் மீன்பிடிப் படகுகளுக்கு மானிய விலையிலான செய்மதி VMS கருவிகள் விநியோகம்",
            "publisher_ta": "கடற்றொழில் மற்றும் நீரியல் வளங்கள் திணைக்களம் (DFAR)",
            "category_label_ta": "அமைச்சுச் செய்திகள்",
            "summary_ta": "மீனவர்களின் பாதுகாப்பை உறுதிப்படுத்தவும், எல்லை தாண்டிய மீன்பிடியைத் தடுக்கவும் 500 பலநாள் படகுகளுக்கு செய்மதி VMS கருவிகளை அமைச்சு வழங்கி வருகின்றது.",
            "content_ta": """<p>கடற்றொழில் மற்றும் நீரியல் வளங்கள் திணைக்களத்தின் ஊடாக நாடளாவிய ரீதியில் உள்ள பலநாள் மீன்பிடிப் படகுகளுக்கு 75% மானிய விலையில் 500 செய்மதி கண்காணிப்பு (VMS) கருவிகள் விநியோகிக்கப்பட்டு வருகின்றன.</p>
<p>இக்கருவிகள் 24 மணிநேர கண்காணிப்பு, அவசர ஆபத்து சமிக்ஞைகள் (SOS) மற்றும் சர்வதேச எல்லை அத்துமீறல் எச்சரிக்கைகளை வழங்குகின்றன.</p>""",
            "attachment_title_ta": "VMS பதிவு வழிகாட்டல் கையேடு.pdf",
        },
        {
            "order": 3,
            "slug": "national-aquaculture-expansion-breeding-centres",
            "category": "aquaculture",
            "is_featured": False,
            "published_date": "2026-02-28",
            "image_url_fallback": "/images/services/local-training.jpg",
            "image_alt": "Freshwater Aquaculture Fish Breeding Tank",
            "file_type": "PDF",
            "file_size": "1.5 MB",
            # 🇬🇧 English
            "title_en": "National Aquaculture Expansion: New Freshwater Fish Breeding Centres in Polonnaruwa & Anuradhapura",
            "publisher_en": "National Aquaculture Development Authority (NAQDA)",
            "category_label_en": "Aquaculture & Inland",
            "summary_en": "NAQDA has commissioned two new high-yield freshwater fish seed breeding stations capable of producing 25 million fingerlings annually to stock inland irrigation reservoirs.",
            "content_en": """<p>The National Aquaculture Development Authority (NAQDA) has commissioned two state-of-the-art freshwater fish seed production centres in the Polonnaruwa and Anuradhapura districts.</p>
<p>The new facilities feature recirculating aquaculture systems (RAS), genetics labs, and automated nursery tanks designed to produce over 25 million disease-free fingerlings (including Thilapia, Catla, and Rohu) each year.</p>
<p>This initiative directly supports inland fishing cooperative societies across the North Central, Eastern, and North Western provinces, increasing rural protein security and boosting local fisher incomes.</p>""",
            "attachment_title_en": "NAQDA Freshwater Fingerling Distribution Circular.pdf",
            # 🇱🇰 Sinhala
            "title_si": "ජාතික ජලජීවී වගා ව්‍යාප්තිය: පොළොන්නරුව සහ අනුරාධපුර නව මිරිදිය මත්ස්‍ය බෝකිරීමේ මධ්‍යස්ථාන විවෘත කෙරේ",
            "publisher_si": "ජාතික ජලජීවී වගා සංවර්ධන අධිකාරිය (NAQDA)",
            "category_label_si": "ජලජීවී සහ මිරිදිය වගාව",
            "summary_si": "වාර්ෂිකව මත්ස්‍ය පැටවුන් මිලියන 25 ක් නිෂ්පාදනය කළ හැකි නවීන මිරිදිය මත්ස්‍ය අභිජනන මධ්‍යස්ථාන දෙකක් NAQDA ආයතනය මඟින් පිහිටුවන ලදී.",
            "content_si": """<p>ජාතික ජලජීවී වගා සංවර්ධන අධිකාරිය (NAQDA) මඟින් පොළොන්නරුව සහ අනුරාධපුර දිස්ත්‍රික්කවල නවීන තාක්ෂණයෙන් යුත් මිරිදිය මත්ස්‍ය බීජ නිෂ්පාදන මධ්‍යස්ථාන දෙකක් විවෘත කර ඇත.</p>
<p>මෙම මධ්‍යස්ථාන මඟින් වාර්ෂිකව තිලාපියා, කාට්ලා සහ රෝහු ඇතුළු උසස් තත්ත්වයේ මත්ස්‍ය පැටවුන් මිලියන 25 කට අධික ප්‍රමාණයක් දිවයිනේ ප්‍රධාන සහ මධ්‍යම ප්‍රමාණයේ ජලාශ සඳහා මුදාහැරීමට නියමිතය.</p>""",
            "attachment_title_si": "NAQDA මත්ස්‍ය පැටවුන් බෙදාහැරීමේ චක්‍රලේඛය.pdf",
            # 🇱🇰 Tamil
            "title_ta": "தேசிய நீரியல் வளர்ப்பு விரிவாக்கம்: பொலன்னறுவை மற்றும் அனுராதபுரத்தில் புதிய நன்னீர் மீன் இனப்பெருக்க நிலையங்கள்",
            "publisher_ta": "தேசிய நீரியல் உயிரின வளர்ப்பு அபிவிருத்தி அதிகாரசபை (NAQDA)",
            "category_label_ta": "நீரியல் மற்றும் நன்னீர் வளர்ப்பு",
            "summary_ta": "வருடாந்தம் 25 மில்லியன் மீன் குஞ்சுகளை உற்பத்தி செய்யக்கூடிய புதிய நன்னீர் மீன் இனப்பெருக்க நிலையங்களை NAQDA ஆரம்பித்துள்ளது.",
            "content_ta": """<p>தேசிய நீரியல் உயிரின வளர்ப்பு அபிவிருத்தி அதிகாரசபை (NAQDA) பொலன்னறுவை மற்றும் அனுராதபுரம் மாவட்டங்களில் இரண்டு நவீன நன்னீர் மீன் குஞ்சு உற்பத்தி நிலையங்களை நிறுவியுள்ளது.</p>
<p>இவ்விரண்டு நிலையங்கள் ஊடாக வருடாந்தம் 25 மில்லியன் திலாப்பியா, ரோகு போன்ற மீன் குஞ்சுகள் நீர்த்தேக்கங்களில் விடப்படவுள்ளன.</p>""",
            "attachment_title_ta": "NAQDA மீன் குஞ்சுகள் விநியோக சுற்றறிக்கை.pdf",
        },
        {
            "order": 4,
            "slug": "emergency-fuel-subsidy-welfare-relief-fishers",
            "category": "community",
            "is_featured": False,
            "published_date": "2026-02-18",
            "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "image_alt": "Fisher Community Welfare Scheme",
            "file_type": "PDF",
            "file_size": "950 KB",
            # 🇬🇧 English
            "title_en": "Emergency Welfare Relief Fund & Fuel Subsidy Package Approved for Coastal Fishers",
            "publisher_en": "Ministry Secretariat & DFAR",
            "category_label_en": "Fisher Community & Welfare",
            "summary_en": "Cabinet approval has been granted for an emergency fuel assistance grant and insurance safety net benefiting more than 65,000 small-scale artisanal and outboard motor (OFRP) fishers.",
            "content_en": """<p>The Cabinet of Ministers has approved a comprehensive financial support and fuel relief package formulated by the Ministry of Fisheries to protect artisanal fishing families from rising operational costs.</p>
<p>Under this scheme, registered owners of traditional non-motorized crafts and Outboard Fibre-Reinforced Plastic (OFRP) boats will receive monthly kerosene and diesel allowances distributed via digital QR vouchers directly at coastal fuel sheds.</p>
<p>Additionally, the Fisheries Pension and Social Security Benefit Scheme has been enhanced with medical distress grants and children's higher education scholarships for active cooperative members.</p>""",
            "attachment_title_en": "Fuel Subsidy Registration & Eligibility Gazette.pdf",
            # 🇱🇰 Sinhala
            "title_si": "වෙරළබඩ ධීවරයින් සඳහා හදිසි සුබසාධන සහන අරමුදලක් සහ ඉන්ධන සහනාධාර පැකේජයක් අනුමත කෙරේ",
            "publisher_si": "අමාත්‍යාංශ ලේකම් කාර්යාලය සහ ධීවර දෙපාර්තමේන්තුව",
            "category_label_si": "ධීවර ප්‍රජාව සහ සුබසාධනය",
            "summary_si": "සුළු පරිමාණ සහ සම්ප්‍රදායික ධීවරයින් 65,000 කට අධික පිරිසක් සඳහා මාසික ඉන්ධන සහන සහ සමාජ ආරක්ෂණ පැකේජයක් සඳහා අමාත්‍ය මණ්ඩල අනුමැතිය හිමිවිය.",
            "content_si": """<p>සුළු පරිමාණ ධීවර පවුල්වල ජීවන තත්ත්වය උසස් කිරීම සහ මෙහෙයුම් පිරිවැය පාලනය කිරීම සඳහා ධීවර අමාත්‍යාංශය විසින් ඉදිරිපත් කරන ලද විශේෂ ඉන්ධන සහන පැකේජයට අමාත්‍ය මණ්ඩල අනුමැතිය හිමිව ඇත.</p>
<p>මෙමඟින් ලියාපදිංචි සම්ප්‍රදායික යාත්‍රා සහ කුඩා එන්ජින් බෝට්ටු (OFRP) හිමියන්ට ඩිජිටල් QR ක්‍රමවේදය ඔස්සේ මාසික භූමිතෙල් සහ ඩීසල් දීමනාවක් ඍජුවම ලබාගැනීමේ අවස්ථාව හිමිවේ.</p>""",
            "attachment_title_si": "ඉන්ධන සහනාධාර අයදුම්පත් චක්‍රලේඛය.pdf",
            # 🇱🇰 Tamil
            "title_ta": "கரையோர மீனவர்களுக்கான அவசர நலன்புரி நிதி மற்றும் எரிபொருள் மானியப் பொதிக்கு அங்கீகாரம்",
            "publisher_ta": "அமைச்சு செயலகம் மற்றும் கடற்றொழில் திணைக்களம்",
            "category_label_ta": "மீனவ சமூகம் & நலன்புரி",
            "summary_ta": "65,000 க்கும் மேற்பட்ட பாரம்பரிய மற்றும் சிறு படகு மீனவர்களுக்கு மாதாந்த எரிபொருள் நிவாரணம் வழங்க அமைச்சரவை அங்கீகாரம் அளித்துள்ளது.",
            "content_ta": """<p>சிறு மீனவ குடும்பங்களின் வாழ்வாதாரத்தைப் பாதுகாக்கும் நோக்கில் கடற்றொழில் அமைச்சினால் முன்மொழியப்பட்ட விரிவான எரிபொருள் நிவாரணப் பொதிக்கு அமைச்சரவை அங்கீகாரம் வழங்கியுள்ளது.</p>
<p>பதிவுசெய்யப்பட்ட மீனவர்களுக்கு டிஜிட்டல் QR முறைமை மூலம் மண்ணெண்ணெய் மற்றும் டீசல் கொடுப்பனவுகள் கடலோர எரிபொருள் நிலையங்களில் நேரடியாக வழங்கப்படும்.</p>""",
            "attachment_title_ta": "எரிபொருள் மானிய பதிவு வர்த்தமானி.pdf",
        },
        {
            "order": 5,
            "slug": "sustainable-tuna-stock-conservation-colombo-2026",
            "category": "ocean",
            "is_featured": False,
            "published_date": "2026-02-10",
            "image_url_fallback": "/images/services/foreign-training.jpg",
            "image_alt": "Marine Biology Research Vessel at Sea",
            "file_type": "PDF",
            "file_size": "3.1 MB",
            # 🇬🇧 English
            "title_en": "Joint Marine Conservation Workshop on Sustainable Tuna Stock Management Held in Colombo",
            "publisher_en": "National Aquatic Resources Research and Development Agency (NARA)",
            "category_label_en": "Ocean Resources & Marine",
            "summary_en": "NARA and international ocean stewardship partners convened a high-level scientific conference on preserving yellowfin and bigeye tuna fisheries in the Northern Indian Ocean.",
            "content_en": """<p>The National Aquatic Resources Research and Development Agency (NARA), in collaboration with the Indian Ocean Tuna Commission (IOTC), hosted a three-day international scientific workshop in Colombo on sustainable pelagic fisheries management.</p>
<p>Oceanographers, marine biologists, and policy experts examined satellite oceanography data, acoustic biomass assessments, and juvenile catch mitigation strategies to safeguard Sri Lanka's marine biodiversity while maximizing sustainable export value.</p>
<p>The conference concluded with the adoption of the Colombo Action Declaration on Responsible Longline Fisheries and Marine Mammal Bycatch Mitigation.</p>""",
            "attachment_title_en": "NARA Marine Science Research Summary Report.pdf",
            # 🇱🇰 Sinhala
            "title_si": "තිරසාර ටූනා මත්ස්‍ය සම්පත් කළමනාකරණය පිළිබඳ ඒකාබද්ධ සාගර සංරක්ෂණ වැඩමුළුව කොළඹදී පැවැත්වේ",
            "publisher_si": "ජාතික ජලජ සම්පත් පර්යේෂණ හා සංවර්ධන නියෝජිතායතනය (NARA)",
            "category_label_si": "සාගර සම්පත් සහ සංරක්ෂණය",
            "summary_si": "උතුරු ඉන්දියන් සාගරයේ කෙළවල්ලා සහ තලපත් මත්ස්‍ය සම්පත තිරසාර ලෙස ආරක්ෂා කරගැනීම පිළිබඳ ජාත්‍යන්තර විද්‍යාත්මක සමුළුවක් NARA ආයතනය විසින් සංවිධානය කරන ලදී.",
            "content_si": """<p>ජාතික ජලජ සම්පත් පර්යේෂණ හා සංවර්ධන නියෝජිතායතනය (NARA) සහ ඉන්දියන් සාගර ටූනා කොමිසම (IOTC) එක්ව සංවිධානය කළ තුන්දින ජාත්‍යන්තර සාගර විද්‍යාත්මක වැඩමුළුව කොළඹදී සාර්ථකව පැවැත්විණි.</p>
<p>සාගර විද්‍යාඥයින්, පර්යේෂකයින් සහ ප්‍රතිපත්ති සම්පාදකයින් විසින් ටූනා මත්ස්‍ය තොග ආරක්ෂා කරගනිමින් තිරසාර සාගර සම්පත් පරිහරණය සඳහා වූ 'කොළඹ ප්‍රකාශනය' මෙහිදී සම්මත කරගන්නා ලදී.</p>""",
            "attachment_title_si": "NARA පර්යේෂණ සාරාංශ වාර්තාව.pdf",
            # 🇱🇰 Tamil
            "title_ta": "நிலையான சூரை மீன் வள முகாமைத்துவம் தொடர்பான கடல்சார் பாதுகாப்பு செயலமர்வு கொழும்பில்",
            "publisher_ta": "தேசிய நீரியல் வளங்கள் ஆராய்ச்சி மற்றும் அபிவிருத்தி முகவர் நிலையம் (NARA)",
            "category_label_ta": "கடல்சார் வளங்கள் & பாதுகாப்பு",
            "summary_ta": "வட இந்தியப் பெருங்கடலில் சூரை மீன் வளங்களைப் பாதுகாப்பது குறித்த சர்வதேச விஞ்ஞான மாநாட்டை NARA கொழும்பில் நடத்தியது.",
            "content_ta": """<p>தேசிய நீரியல் வளங்கள் ஆராய்ச்சி மற்றும் அபிவிருத்தி முகவர் நிலையம் (NARA) இந்தியப் பெருங்கடல் சூரை மீன் ஆணைக்குழுவுடன் (IOTC) இணைந்து மூன்று நாள் சர்வதேச கடல்சார் மாநாட்டை கொழும்பில் நடத்தியது.</p>
<p>இதில் சூரை மீன் வளங்களைப் பாதுகாத்தல் மற்றும் சர்வதேச ஏற்றுமதித் தரங்களைப் பேணுதல் தொடர்பான முக்கிய பரிந்துரைகள் ஏற்றுக்கொள்ளப்பட்டன.</p>""",
            "attachment_title_ta": "NARA கடல் ஆராய்ச்சி சுருக்க அறிக்கை.pdf",
        },
        {
            "order": 6,
            "slug": "national-fishery-awards-ceremony-2026",
            "category": "events",
            "is_featured": False,
            "published_date": "2026-02-01",
            "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "image_alt": "National Fishery Excellence Awards",
            "file_type": "PDF",
            "file_size": "1.1 MB",
            # 🇬🇧 English
            "title_en": "National Fishery Awards 2026 Ceremony Celebrates Outstanding Seafarers & Aquaculture Innovators",
            "publisher_en": "Ministry Directorate of Fisheries Development",
            "category_label_en": "Events & Ceremonies",
            "summary_en": "The annual National Fisheries Excellence Awards honored outstanding master fishermen, female aquaculture entrepreneurs, and innovative export processing companies at BMICH.",
            "content_en": """<p>The annual National Fishery Excellence Awards 2026 took place at the Bandaranaike Memorial International Conference Hall (BMICH), celebrating the exceptional dedication and resilience of Sri Lanka's fishing workforce.</p>
<p>Honors were presented across twelve categories including Best Multiday Skipper, Top Aquaculture Exporter, Most Innovative Crab Hatchery, and Coastal Women's Fisheries Cooperative of the Year.</p>
<p>The Ministry reaffirmed its commitment to supporting sustainable blue economic entrepreneurs through financial grants, technology transfers, and expanded export market linkages.</p>""",
            "attachment_title_en": "National Fishery Awards Winners List 2026.pdf",
            # 🇱🇰 Sinhala
            "title_si": "විශිෂ්ටතම ධීවරයින් සහ ජලජීවී වගා ව්‍යවසායකයින් ඇගයෙන 'ජාතික ධීවර සම්මාන උළෙල 2026' උත්කර්ෂවත්ව පැවැත්වේ",
            "publisher_si": "අමාත්‍යාංශ ධීවර සංවර්ධන අධ්‍යක්ෂ මණ්ඩලය",
            "category_label_si": "විශේෂ සිදුවීම් සහ උත්සව",
            "summary_si": "ශ්‍රී ලංකාවේ දක්ෂතම බහුදින ධීවරයින්, කාන්තා ජලජීවී ව්‍යවසායිකාවන් සහ අපනයන ආයතන ඇගයීම සඳහා ජාතික ධීවර සම්මාන උළෙල BMICH හිදී පැවැත්විණි.",
            "content_si": """<p>ශ්‍රී ලංකාවේ ධීවර ප්‍රජාවගේ සහ ව්‍යවසායකයින්ගේ දායකත්වය අගයමින් සංවිධානය කරන ලද 'ජාතික ධීවර සම්මාන උළෙල 2026' බණ්ඩාරනායක අනුස්මරණ ජාත්‍යන්තර සම්මන්ත්‍රණ ශාලාවේදී (BMICH) උත්කර්ෂවත්ව පැවැත්විණි.</p>
<p>වසරේ විශිෂ්ටතම බහුදින යාත්‍රා නියමුවා, ඉහළම මත්ස්‍ය අපනයනකරු, හොඳම කකුළු අභිජනනාගාරය ඇතුළු කාණ්ඩ 12 ක් යටතේ සම්මාන සහ මුදල් ත්‍යාග පිරිනැමිණි.</p>""",
            "attachment_title_si": "2026 ජාතික ධීවර සම්මානලාභීන්ගේ නාමලේඛනය.pdf",
            # 🇱🇰 Tamil
            "title_ta": "சிறந்த மீனவர்கள் மற்றும் நீரியல் தொழில்முனைவோரை கௌரவிக்கும் 'தேசிய கடற்றொழில் விருதுகள் 2026' விழா",
            "publisher_ta": "அமைச்சு கடற்றொழில் அபிவிருத்தி பணிப்பகம்",
            "category_label_ta": "நிகழ்வுகள் & வைபவங்கள்",
            "summary_ta": "இலங்கையின் தலைசிறந்த பலநாள் படகோட்டிகள் மற்றும் ஏற்றுமதி நிறுவனங்களை கௌரவிக்கும் தேசிய விருது விழா BMICH இல் நடைபெற்றது.",
            "content_ta": """<p>இலங்கையின் கடற்றொழில் சமூகத்தின் அர்ப்பணிப்பைப் பாராட்டி 'தேசிய கடற்றொழில் விருதுகள் 2026' விழா பண்டாரநாயக்க சர்வதேச மாநாட்டு மண்டபத்தில் (BMICH) சிறப்பாக நடைபெற்றது.</p>
<p>சிறந்த படகோட்டி, சிறந்த ஏற்றுமதியாளர் உள்ளிட்ட 12 பிரிவுகளின் கீழ் விருதுகளும் பணப்பரிசில்களும் வழங்கப்பட்டன.</p>""",
            "attachment_title_ta": "தேசிய கடற்றொழில் வெற்றியாளர் பட்டியல் 2026.pdf",
        },
    ]

    for item in articles_data:
        NewsArticleItem.objects.update_or_create(
            slug=item["slug"],
            defaults=item,
        )
        print(f"[+] Seeded News Article: {item['title_en']}")

    print("[SUCCESS] All News Data Seeded Successfully!")


if __name__ == "__main__":
    seed_news()
