from django.core.management.base import BaseCommand
from foreign_training.models import (
    ForeignTrainingPageHeader,
    ForeignTrainingCategory,
    ForeignTrainingProgramme,
)


class Command(BaseCommand):
    help = "Seed rich multilingual data for Foreign Training & Overseas Fellowships"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Foreign Training categories, page header, and programmes...")

        # 1. Page Header
        hdr, _ = ForeignTrainingPageHeader.objects.get_or_create(id=1)
        hdr.badge_text_en = "International Partnerships & Fellowships"
        hdr.badge_text_si = "ජාත්‍යන්තර හවුල්කාරිත්ව සහ ශිෂ්‍යත්ව"
        hdr.badge_text_ta = "சர்வதேச கூட்டாண்மைகள் மற்றும் புலமைப்பரிசில்கள்"

        hdr.title_en = "Foreign Training & Overseas Fellowships"
        hdr.title_si = "විදේශීය පුහුණු සහ අධිශිෂ්‍යත්ව අවස්ථා"
        hdr.title_ta = "வெளிநாட்டுப் பயிற்சி மற்றும் வெளிநாட்டு புலமைப்பரிசில்கள்"

        hdr.description_en = "Discover international oceanography courses, overseas scholarships, bilateral technical seminars, and global ocean science fellowships provided through Ministry international partnerships."
        hdr.description_si = "අමාත්‍යාංශයේ ජාත්‍යන්තර හවුල්කාරිත්වයන් හරහා පිරිනමනු ලබන ජාත්‍යන්තර සාගර විද්‍යා පාඨමාලා, විදේශීය ශිෂ්‍යත්ව, ද්විපාර්ශ්වික තාක්ෂණික සම්මන්ත්‍රණ සහ ගෝලීය සාගර පර්යේෂණ අවස්ථා ගවේෂණය කරන්න."
        hdr.description_ta = "அமைச்சின் சர்வதேச கூட்டாண்மைகள் ஊடாக வழங்கப்படும் சர்வதேச சமுத்திரவியல் படிப்புகள், வெளிநாட்டு புலமைப்பரிசில்கள், இருதரப்பு தொழினுட்ப கருத்தரங்குகள் மற்றும் உலகளாவிய கடல்சார் ஆய்வு வாய்ப்புகளைப் பார்வையிடவும்."

        hdr.featured_badge_en = "Featured Overseas Fellowships"
        hdr.featured_badge_si = "විශේෂ විදේශීය අධිශිෂ්‍යත්ව"
        hdr.featured_badge_ta = "சிறப்பு வெளிநாட்டு புலமைப்பரிசில்கள்"

        hdr.catalogue_badge_en = "Scholarship Catalogue"
        hdr.catalogue_badge_si = "ශිෂ්‍යත්ව නාමාවලිය"
        hdr.catalogue_badge_ta = "புலமைப்பரிசில் பட்டியல்"

        hdr.library_title_en = "Foreign Training & Fellowships Library"
        hdr.library_title_si = "විදේශීය පුහුණු සහ අධිශිෂ්‍යත්ව එකතුව"
        hdr.library_title_ta = "வெளிநாட்டுப் பயிற்சி மற்றும் புலமைப்பரிசில் நூலகம்"
        hdr.save()

        # 2. Categories Data
        categories_data = [
            {
                "category_id": "scholarships",
                "order": 1,
                "icon_type": "graduation-cap",
                "title_en": "Scholarships & Fellowships",
                "title_si": "ශිෂ්‍යත්ව සහ අධිශිෂ්‍යත්ව",
                "title_ta": "புலமைப்பரிசில்கள் மற்றும் ஆய்வுப் பயிற்சிகள்",
                "description_en": "Post-graduate degree scholarships and fully-funded research fellowships abroad.",
                "description_si": "විදේශීය පශ්චාත් උපාධි ශිෂ්‍යත්ව සහ පූර්ණ අරමුදල් සහිත පර්යේෂණ අධිශිෂ්‍යත්ව වැඩසටහන්.",
                "description_ta": "வெளிநாட்டு முதுகலை புலமைப்பரிசில்கள் மற்றும் முழு நிதியுதவி ஆராய்ச்சி வாய்ப்புகள்.",
            },
            {
                "category_id": "high-seas",
                "order": 2,
                "icon_type": "anchor",
                "title_en": "High-Seas Fisheries & Satellite VMS",
                "title_si": "ගැඹුරු මුහුදු ධීවර කළමනාකරණය සහ VMS",
                "title_ta": "உயர் கடல் மீன்பிடி முகாமைத்துவம் மற்றும் VMS",
                "description_en": "Deep-sea fisheries governance, satellite vessel monitoring systems, and IUU enforcement.",
                "description_si": "ගැඹුරු මුහුදු ධීවර පාලනය, චන්ද්‍රිකා යාත්‍රා නිරීක්ෂණ පද්ධති සහ IUU මැඩපැවැත්වීම.",
                "description_ta": "ஆழ்கடல் மீன்பிடி ஆளுகை, செய்மதி படகு கண்காணிப்பு மற்றும் IUU தடுத்தல்.",
            },
            {
                "category_id": "technical-seminars",
                "order": 3,
                "icon_type": "briefcase",
                "title_en": "Technical Seminars & Aquaculture Workshops",
                "title_si": "තාක්ෂණික සම්මන්ත්‍රණ සහ ජලජීවී වගා වැඩමුළු",
                "title_ta": "தொழினுட்ப கருத்தரங்குகள் மற்றும் நீர்வாழ் உயிரின வளர்ப்பு",
                "description_en": "Bilateral technical seminars, hatchery management, and seafood quality compliance.",
                "description_si": "ද්විපාර්ශ්වික තාක්ෂණික සම්මන්ත්‍රණ, බීජෞෂණාගාර කළමනාකරණය සහ අපනයන ප්‍රමිතීන්.",
                "description_ta": "இருதரப்பு தொழினுட்ப கருத்தரங்குகள், குஞ்சுபொரிப்பக முகாமைத்துவம் மற்றும் ஏற்றுமதி தரநிலைகள்.",
            },
            {
                "category_id": "blue-economy",
                "order": 4,
                "icon_type": "award",
                "title_en": "Blue Economy & Ocean Governance",
                "title_si": "නීල ආර්ථිකය සහ සාගර පාලනය",
                "title_ta": "நீலப் பொருளாதாரம் மற்றும் கடல்சார் ஆளுகை",
                "description_en": "Executive leadership courses, marine spatial planning, and maritime security policy.",
                "description_si": "විධායක නායකත්ව පාඨමාලා, සමුද්‍ර අවකාශීය සැලසුම්කරණය සහ සාගර ආර්ථික පාලනය.",
                "description_ta": "நிறைவேற்று தலைமைத்துவ படிப்புகள் மற்றும் நிலையான கடல்சார் பொருளாதார ஆளுகை.",
            },
            {
                "category_id": "oceanography",
                "order": 5,
                "icon_type": "globe",
                "title_en": "Oceanography & Marine Science",
                "title_si": "සාගර විද්‍යාව සහ සමුද්‍ර පර්යේෂණ",
                "title_ta": "சமுத்திரவியல் மற்றும் கடல் அறிவியல்",
                "description_en": "Advanced GIS ocean modeling, climate resilience tracking, and oceanographic research.",
                "description_si": "උසස් GIS සාගර ආකෘති නිර්මාණය, දේශගුණික ඔරොත්තු දීමේ හැකියාව සහ සාගර විද්‍යාත්මක පර්යේෂණ.",
                "description_ta": "மேம்பட்ட GIS கடல் மாதிரி மற்றும் காலநிலை பின்னடைவு ஆராய்ச்சி படிப்புகள்.",
            },
        ]

        cat_objects = {}
        for c_data in categories_data:
            cat_id = c_data.pop("category_id")
            cat, _ = ForeignTrainingCategory.objects.get_or_create(category_id=cat_id, defaults=c_data)
            for k, v in c_data.items():
                setattr(cat, k, v)
            cat.save()
            cat_objects[cat_id] = cat

        # 3. Programmes Data
        programmes_data = [
            {
                "slug": "jica-sustainable-fisheries-coastal-management-2026",
                "category": cat_objects["scholarships"],
                "order": 1,
                "year": 2026,
                "country_en": "Japan",
                "country_si": "ජපානය",
                "country_ta": "ஜப்பான்",
                "status": "Open",
                "featured": True,
                "subheading_en": "Post-Graduate Overseas Fellowships",
                "subheading_si": "පශ්චාත් උපාධි විදේශීය අධිශිෂ්‍යත්ව",
                "subheading_ta": "முதுகலை வெளிநாட்டுப் புலமைப்பரிசில்கள்",
                "title_en": "JICA Knowledge Co-Creation Program in Sustainable Fisheries & Coastal Management",
                "title_si": "තිරසාර ධීවර හා වෙරළබඩ කළමනාකරණය පිළිබඳ JICA දැනුම සහයෝගීතා වැඩසටහන",
                "title_ta": "நிலையான கடற்றொழில் மற்றும் கரையோர முகாமைத்துவத்திற்கான JICA கூட்டு அறிவுப் பகிர்வுத் திட்டம்",
                "institution_en": "Japan International Cooperation Agency (JICA) & Tokyo University of Marine Science",
                "institution_si": "ජපාන ජාත්‍යන්තර සහයෝගිතා ඒජන්සිය (JICA) සහ ටෝකියෝ සාගර විද්‍යා විශ්වවිද්‍යාලය",
                "institution_ta": "ஜப்பான் சர்வதேச ஒத்துழைப்பு முகவரகம் (JICA) மற்றும் டோக்கியோ கடல்சார் அறிவியல் பல்கலைக்கழகம்",
                "description_en": "Fully-funded 6-month international training fellowship in Japan focusing on sustainable coastal capture fisheries, artificial reef management, and post-harvest cold chain logistics.",
                "description_si": "තිරසාර වෙරළබඩ ධීවර කර්මාන්තය, කෘතිම කොරල්පර කළමනාකරණය සහ පසු අස්වනු සිසිල් දාම සැපයුම් පිළිබඳ අවධානය යොමු කරමින් ජපානයේ පැවැත්වෙන මාස 6 ක පූර්ණ අරමුදල් සහිත ජාත්‍යන්තර පුහුණු අධිශිෂ්‍යත්වය.",
                "description_ta": "நிலையான கரையோர மீன்பிடி, செயற்கை பவளப்பாறை முகாமைத்துவம் மற்றும் அறுவடைக்கு பிந்தைய குளிர் சங்கிலி முகாமைத்துவம் குறித்து ஜப்பானில் 6 மாத முழு நிதியுதவிப் பயிற்சி.",
                "category_label_en": "Scholarships & Fellowships",
                "category_label_si": "ශිෂ්‍යත්ව සහ අධිශිෂ්‍යත්ව",
                "category_label_ta": "புலமைப்பரிசில்கள் மற்றும் ஆய்வுப் பயிற்சிகள்",
                "published_date": "2026-01-10",
                "application_deadline": "2026-04-15",
                "file_type": "PDF",
                "file_size": "1.4 MB",
                "image_fallback": "/images/services/foreign-training.jpg",
            },
            {
                "slug": "norad-high-seas-fishery-management-vms-2026",
                "category": cat_objects["high-seas"],
                "order": 2,
                "year": 2026,
                "country_en": "Norway",
                "country_si": "නෝර්වේ",
                "country_ta": "நோர்வே",
                "status": "Open",
                "featured": True,
                "subheading_en": "Satellite VMS & IUU Enforcement",
                "subheading_si": "චන්ද්‍රිකා VMS සහ IUU නීති බලාත්මක කිරීම",
                "subheading_ta": "செய்மதி VMS மற்றும் IUU சட்ட அமலாக்கம்",
                "title_en": "NORAD High-Seas Fishery Management & Satellite VMS Seminar 2026",
                "title_si": "නෝර්වේජියානු NORAD ගැඹුරු මුහුදු ධීවර කළමනාකරණය සහ චන්ද්‍රිකා VMS සම්මන්ත්‍රණය 2026",
                "title_ta": "NORAD உயர் கடல் மீன்பிடி முகாமைத்துவம் மற்றும் செய்மதி VMS கருத்தரங்கு 2026",
                "institution_en": "Norwegian Agency for Development Cooperation (NORAD) & Institute of Marine Research, Bergen",
                "institution_si": "නෝර්වේජියානු සංවර්ධන සහයෝගිතා ඒජන්සිය (NORAD) සහ බර්ගන් සාගර පර්යේෂණ ආයතනය",
                "institution_ta": "நோர்வே அபிவிருத்தி ஒத்துழைப்பு முகவரகம் (NORAD) மற்றும் கடல் ஆராய்ச்சி நிறுவனம், பெர்கன்",
                "description_en": "Specialized technical seminar in Bergen, Norway, exploring satellite Vessel Monitoring Systems (VMS), electronic catch reporting, and combating Illegal, Unreported, and Unregulated (IUU) fishing.",
                "description_si": "චන්ද්‍රිකා යාත්‍රා නිරීක්ෂණ පද්ධති (VMS), විද්‍යුත් අස්වනු වාර්තාකරණය සහ නීතිවිරෝධී (IUU) ධීවර කටයුතු මැඩපැවැත්වීම පිළිබඳ නෝර්වේ හි බර්ගන් නුවර පැවැත්වෙන විශේෂ තාක්ෂණික සම්මන්ත්‍රණය.",
                "description_ta": "செய்மதி படகு கண்காணிப்பு அமைப்புகள் (VMS), இலத்திரனியல் பிடிப்பு அறிக்கை மற்றும் சட்டவிரோத மீன்பிடியைத் தடுத்தல் பற்றிய நோர்வேயின் பெர்கனில் உள்ள சிறப்பு தொழினுட்ப கருத்தரங்கு.",
                "category_label_en": "High-Seas Fisheries",
                "category_label_si": "ගැඹුරු මුහුදු ධීවර කටයුතු",
                "category_label_ta": "உயர் கடல் மீன்பிடி",
                "published_date": "2026-01-25",
                "application_deadline": "2026-05-10",
                "file_type": "PDF",
                "file_size": "920 KB",
                "image_fallback": "/images/services/foreign-training.jpg",
            },
            {
                "slug": "itec-marine-aquaculture-hatchery-management",
                "category": cat_objects["technical-seminars"],
                "order": 3,
                "year": 2026,
                "country_en": "India",
                "country_si": "ඉන්දියාව",
                "country_ta": "இந்தியா",
                "status": "Open",
                "featured": True,
                "subheading_en": "Marine Aquaculture & Hatcheries",
                "subheading_si": "සමුද්‍ර ජලජීවී වගාව සහ බීජෞෂණාගාර",
                "subheading_ta": "கடல்வாழ் உயிரின வளர்ப்பு மற்றும் குஞ்சுபொரிப்பகங்கள்",
                "title_en": "ITEC International Course in Advanced Marine Aquaculture & Hatchery Management",
                "title_si": "උසස් සමුද්‍ර ජලජීවී වගාව සහ බීජෞෂණාගාර කළමනාකරණය පිළිබඳ ITEC ජාත්‍යන්තර පාඨමාලාව",
                "title_ta": "மேம்பட்ட கடல்வாழ் உயிரின வளர்ப்பு மற்றும் குஞ்சுபொரிப்பக முகாமைத்துவத்திற்கான ITEC சர்வதேச படிப்பு",
                "institution_en": "Central Institute of Brackishwater Aquaculture (CIBA), Chennai & ITEC Ministry of External Affairs",
                "institution_si": "චෙන්නායි කිවුල්දිය ජලජීවී වගා මධ්‍යම ආයතනය (CIBA) සහ ඉන්දීය විදේශ කටයුතු අමාත්‍යාංශය (ITEC)",
                "institution_ta": "மத்திய உவர்நீர் மீன்வளர்ப்பு நிறுவனம் (CIBA), சென்னை மற்றும் ITEC இந்திய வெளியுறவு அமைச்சு",
                "description_en": "Fully sponsored 8-week practical training in Chennai, India, covering sea bass and mud crab seed production, recirculating aquaculture systems (RAS), and fish health management.",
                "description_si": "මෝදා සහ මඩ කකුළුවන් බීජ නිෂ්පාදනය, ප්‍රතිචක්‍රීකරණ ජලජීවී වගා පද්ධති (RAS) සහ මත්ස්‍ය සෞඛ්‍ය කළමනාකරණය පිළිබඳ ඉන්දියාවේ චෙන්නායි හි පැවැත්වෙන සති 8 ක පූර්ණ අනුග්‍රාහක ප්‍රායෝගික පුහුණුව.",
                "description_ta": "கொடுவா மீன் மற்றும் நண்டு குஞ்சு உற்பத்தி, மீள்சுழற்சி நீர்வாழ் அமைப்புகள் (RAS) மற்றும் மீன் சுகாதார முகாமைத்துவம் பற்றிய இந்தியாவில் 8 வார நேரடி பயிற்சி.",
                "category_label_en": "Technical Seminars",
                "category_label_si": "තාක්ෂණික සම්මන්ත්‍රණ",
                "category_label_ta": "தொழினுட்ப கருத்தரங்குகள்",
                "published_date": "2026-02-01",
                "application_deadline": "2026-04-30",
                "file_type": "PDF",
                "file_size": "780 KB",
                "image_fallback": "/images/services/local-training.jpg",
            },
            {
                "slug": "blue-economy-ocean-governance-australia-2026",
                "category": cat_objects["blue-economy"],
                "order": 4,
                "year": 2026,
                "country_en": "Australia",
                "country_si": "ඕස්ට්‍රේලියාව",
                "country_ta": "அவுஸ்திரேலியா",
                "status": "Open",
                "featured": True,
                "subheading_en": "Executive Ocean Leadership",
                "subheading_si": "විධායක සාගර නායකත්වය",
                "subheading_ta": "நிறைவேற்று கடல்சார் தலைமைத்துவம்",
                "title_en": "Blue Economy & Ocean Governance Leadership Program 2026",
                "title_si": "නීල ආර්ථිකය සහ සාගර පාලන නායකත්ව වැඩසටහන 2026",
                "title_ta": "நீலப் பொருளாதாரம் மற்றும் கடல்சார் ஆளுகை தலைமைத்துவ திட்டம் 2026",
                "institution_en": "Australian National Centre for Ocean Resources and Security (ANCORS), University of Wollongong",
                "institution_si": "සාගර සම්පත් සහ ආරක්ෂාව පිළිබඳ ඕස්ට්‍රේලියානු ජාතික මධ්‍යස්ථානය (ANCORS), වුලොන්ගොං විශ්වවිද්‍යාලය",
                "institution_ta": "கடல் வளங்கள் மற்றும் பாதுகாப்புக்கான அவுஸ்திரேலிய தேசிய மையம் (ANCORS), வொல்லொங்கோங் பல்கலைக்கழகம்",
                "description_en": "Executive leadership fellowship in Australia for senior Ministry policy makers examining maritime boundary delimitation, marine spatial planning, and sustainable ocean economy governance.",
                "description_si": "මුහුදු සීමා නිර්ණය, සමුද්‍ර අවකාශීය සැලසුම්කරණය සහ තිරසාර සාගර ආර්ථික පාලනය පිළිබඳ ජ්‍යෙෂ්ඨ අමාත්‍යාංශ ප්‍රතිපත්ති සම්පාදකයින් සඳහා ඕස්ට්‍රේලියාවේ පැවැත්වෙන විධායක නායකත්ව අධිශිෂ්‍යත්වය.",
                "description_ta": "கடல்சார் எல்லை நிர்ணயம், கடல் இடஞ்சார்ந்த திட்டமிடல் மற்றும் நிலையான பொருளாதார ஆளுகை குறித்த அவுஸ்திரேலியாவின் நிறைவேற்று தலைமைத்துவ கூட்டுறவு.",
                "category_label_en": "Blue Economy",
                "category_label_si": "නීල ආර්ථිකය",
                "category_label_ta": "நீலப் பொருளாதாரம்",
                "published_date": "2026-01-18",
                "application_deadline": "2026-03-30",
                "file_type": "PDF",
                "file_size": "1.1 MB",
                "image_fallback": "/images/services/recruitment.jpg",
            },
            {
                "slug": "koica-oceanographic-data-climate-resilience-2026",
                "category": cat_objects["oceanography"],
                "order": 5,
                "year": 2026,
                "country_en": "South Korea",
                "country_si": "දකුණු කොරියාව",
                "country_ta": "தென் கொரியா",
                "status": "Upcoming",
                "featured": False,
                "subheading_en": "GIS Ocean Modeling & Research",
                "subheading_si": "GIS සාගර ආකෘති නිර්මාණය සහ පර්යේෂණ",
                "subheading_ta": "GIS கடல் மாதிரி மற்றும் ஆராய்ச்சி",
                "title_en": "KOICA Oceanographic Data Analysis & Climate Resilience Fellowship",
                "title_si": "KOICA සාගර විද්‍යාත්මක දත්ත විශ්ලේෂණය සහ දේශගුණික ඔරොත්තු දීමේ හැකියාව පිළිබඳ අධිශිෂ්‍යත්වය",
                "title_ta": "KOICA சமுத்திரவியல் தரவு பகுப்பாய்வு மற்றும் காலநிலை பின்னடைவு ஆய்வுப் பயிற்சி",
                "institution_en": "Korea International Cooperation Agency (KOICA) & KIOST, Busan",
                "institution_si": "කොරියානු ජාත්‍යන්තර සහයෝගිතා ඒජන්සිය (KOICA) සහ බුසාන් සාගර විද්‍යා හා තාක්ෂණ ආයතනය (KIOST)",
                "institution_ta": "கொரியா சர்வதேச ஒத்துழைப்பு முகவரகம் (KOICA) மற்றும் KIOST, புசான்",
                "description_en": "Advanced 3-month research attachment in Busan on GIS ocean modeling, sea surface temperature anomaly tracking, and coastal cyclone vulnerability mapping.",
                "description_si": "GIS සාගර ආකෘති නිර්මාණය, මුහුදු මතුපිට උෂ්ණත්ව විෂමතා නිරීක්ෂණය සහ වෙරළබඩ සුළි කුණාටු අවදානම් සිතියම්ගත කිරීම පිළිබඳ දකුණු කොරියාවේ බුසාන් හි පැවැත්වෙන මාස 3 ක උසස් පර්යේෂණ වැඩසටහන.",
                "description_ta": "GIS கடல் மாதிரி, கடல் மேற்பரப்பு வெப்பநிலை கண்காணிப்பு மற்றும் புயல் பாதிப்பு வரைபடம் பற்றிய தென் கொரியாவின் புசானில் 3 மாத மேம்பட்ட ஆராய்ச்சி படிப்பு.",
                "category_label_en": "Oceanography & Marine Science",
                "category_label_si": "සාගර විද්‍යාව",
                "category_label_ta": "சமுத்திரவியல்",
                "published_date": "2026-02-15",
                "application_deadline": "2026-06-15",
                "file_type": "PDF",
                "file_size": "850 KB",
                "image_fallback": "/images/services/weather.jpg",
            },
            {
                "slug": "fao-post-harvest-quality-certification-italy-2025",
                "category": cat_objects["technical-seminars"],
                "order": 6,
                "year": 2025,
                "country_en": "Italy",
                "country_si": "ඉතාලිය",
                "country_ta": "இத்தாலி",
                "status": "Closed",
                "featured": False,
                "subheading_en": "Post-Harvest Compliance & Exports",
                "subheading_si": "පසු අස්වනු ප්‍රමිතීන් සහ අපනයන",
                "subheading_ta": "அறுவடைக்கு பிந்தைய இணக்கம் மற்றும் ஏற்றுமதி",
                "title_en": "FAO Post-Harvest Quality & EU Seafood Export Certification Workshop",
                "title_si": "පසු අස්වනු ගුණාත්මකභාවය සහ EU මුහුදු ආහාර අපනයන සහතිකකරණය පිළිබඳ FAO වැඩමුළුව",
                "title_ta": "அறுவடைக்கு பிந்தைய தரம் மற்றும் EU கடல் உணவு ஏற்றுமதி சான்றிதழ் குறித்த FAO பட்டறை",
                "institution_en": "Food and Agriculture Organization (FAO) Headquarters, Rome",
                "institution_si": "එක්සත් ජාතීන්ගේ ආහාර හා කෘෂිකර්ම සංවිධානය (FAO), රෝමය",
                "institution_ta": "ஐக்கிய நாடுகளின் உணவு மற்றும் விவசாய அமைப்பு (FAO), ரோம்",
                "description_en": "Technical compliance workshop examining SPS sanitary measures, histamine trace analysis, and EU border inspection post clearance standards for Sri Lankan tuna exporters.",
                "description_si": "ශ්‍රී ලාංකික ටූනා අපනයනකරුවන් සඳහා SPS සනීපාරක්ෂක පියවර, හිස්ටමින් විශ්ලේෂණය සහ යුරෝපා සංගමයේ දේශසීමා පරීක්ෂණ ප්‍රමිතීන් පිළිබඳ තාක්ෂණික වැඩමුළුව.",
                "description_ta": "இலங்கை சூரை மீன் ஏற்றுமதியாளர்களுக்கான SPS சுகாதார நடவடிக்கைகள், ஹிஸ்டமின் சோதனை மற்றும் ஐரோப்பிய ஒன்றிய தரநிலைகள் குறித்த தொழில்நுட்ப பட்டறை.",
                "category_label_en": "Technical Seminars",
                "category_label_si": "තාක්ෂණික සම්මන්ත්‍රණ",
                "category_label_ta": "தொழினுட்ப கருத்தரங்குகள்",
                "published_date": "2025-05-10",
                "application_deadline": "2025-07-20",
                "file_type": "PDF",
                "file_size": "1.3 MB",
                "image_fallback": "/images/services/offshore.jpg",
            },
        ]

        for p_data in programmes_data:
            slug = p_data.pop("slug")
            prog, created = ForeignTrainingProgramme.objects.get_or_create(slug=slug, defaults=p_data)
            if not created:
                for k, v in p_data.items():
                    setattr(prog, k, v)
                prog.save()

        self.stdout.write(self.style.SUCCESS("Successfully seeded Foreign Training categories and data!"))
