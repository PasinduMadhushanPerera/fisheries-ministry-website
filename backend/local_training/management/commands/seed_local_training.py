from django.core.management.base import BaseCommand
from local_training.models import (
    LocalTrainingPageHeader,
    LocalTrainingCategory,
    LocalTrainingProgramme,
)


class Command(BaseCommand):
    help = "Seed rich multilingual data for Local Training Opportunities"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Local Training categories and programmes...")

        # 1. Page Header
        hdr, _ = LocalTrainingPageHeader.objects.get_or_create(id=1)
        hdr.badge_text_en = "Capacity Building & Skills Development"
        hdr.badge_text_si = "ධාරිතා වර්ධනය සහ කුසලතා සංවර්ධනය"
        hdr.badge_text_ta = "திறன் மேம்பாடு மற்றும் பயிற்சிகள்"

        hdr.title_en = "Local Training Opportunities"
        hdr.title_si = "දේශීය පුහුණු අවස්ථා"
        hdr.title_ta = "உள்ளூர் பயிற்சி வாய்ப்புகள்"

        hdr.description_en = "Browse local training courses, technical workshops, professional development programmes and capacity building opportunities provided by the Ministry of Fisheries and national partner institutions."
        hdr.description_si = "ධීවර අමාත්‍යාංශය සහ ජාතික හවුල්කාර ආයතන විසින් පවත්වනු ලබන දේශීය පුහුණු පාඨමාලා, තාක්ෂණික වැඩමුළු, වෘත්තීය සංවර්ධන වැඩසටහන් සහ ධාරිතා වර්ධන අවස්ථා ගවේෂණය කරන්න."
        hdr.description_ta = "கடற்றොழில் அமைச்சு மற்றும் தேசிய பங்குதாரர் நிறுவனங்களால் வழங்கப்படும் உள்ளூர் பயிற்சிப் படிப்புகள், தொழினுட்ப பட்டறைகள் மற்றும் திறன் மேம்பாட்டு வாய்ப்புகளைப் பார்வையிடவும்."

        hdr.featured_badge_en = "Featured 2026 Opportunities"
        hdr.featured_badge_si = "2026 විශේෂ අවස්ථා"
        hdr.featured_badge_ta = "2026 இன் விசேட வாய்ப்புகள்"

        hdr.catalogue_badge_en = "Programme Catalogue"
        hdr.catalogue_badge_si = "වැඩසටහන් නාමාවලිය"
        hdr.catalogue_badge_ta = "திட்ட பட்டியல்"

        hdr.library_title_en = "Training Programme Library"
        hdr.library_title_si = "පුහුණු වැඩසටහන් පුස්තකාලය"
        hdr.library_title_ta = "பயிற்சித் திட்ட நூலகம்"
        hdr.save()

        # 2. Categories Data
        categories_data = [
            {
                "category_id": "language-courses",
                "order": 1,
                "icon_type": "globe",
                "title_en": "Language & Official Communication",
                "title_si": "භාෂා සහ රාජ්‍ය සන්නිවේදනය",
                "title_ta": "மொழி மற்றும் அரச தொடர்பாடல்",
                "description_en": "Professional English, Sinhala, and Tamil proficiency courses for public sector officers.",
                "description_si": "රාජ්‍ය අංශයේ නිලධාරීන් සඳහා වෘත්තීය ඉංග්‍රීසි, සිංහල සහ දෙමළ ප්‍රවීණතා පාඨමාලා.",
                "description_ta": "அரசத்துறை அதிகாரிகளுக்கான ஆங்கிலம், சிங்களம் மற்றும் தமிழ் மொழிப் பயிற்சிகள்.",
            },
            {
                "category_id": "maritime-technical",
                "order": 2,
                "icon_type": "anchor",
                "title_en": "Maritime, Safety & Nautical Skills",
                "title_si": "නාවික, ආරක්ෂාව සහ තාක්ෂණික කුසලතා",
                "title_ta": "கடல்சார், பாதுகாப்பு மற்றும் தொழினுட்ப தகைமைகள்",
                "description_en": "Vessel navigation, safety at sea, outboard motor maintenance, and diving certifications.",
                "description_si": "යාත්‍රා නාවික සහාය, මුහුදු ආරක්ෂාව, පිටත එන්ජින් නඩත්තුව සහ කිමිදුම් සහතික.",
                "description_ta": "படகு செலுத்துகை, கடல் பாதுகாப்பு, வெளிப்ப இணைப்பு எஞ்சின் பராமரிப்பு மற்றும் மூழ்கிப் பயிற்சிகள்.",
            },
            {
                "category_id": "aquaculture-vocational",
                "order": 3,
                "icon_type": "fish",
                "title_en": "Aquaculture & Fisheries Management",
                "title_si": "ජලජීවී වගාව සහ ධීවර කළමනාකරණය",
                "title_ta": "நீர்வாழ் உயிரின வளர்ப்பு மற்றும் கடற்றොழில் நிர்வாகம்",
                "description_en": "Shrimp farming, sea cucumber culture, inland fisheries, and hatchery operational courses.",
                "description_si": "ඉස්සන් වගාව, මුහුදු කූඩැල්ලන් වගාව, අභ්‍යන්තර ධීවර සහ පැටවුන් බිහි කිරීමේ පාඨමාලා.",
                "description_ta": "ஈரால் வளர்ப்பு, கடல் அட்டை வளர்ப்பு மற்றும் நன்னீர் மீன்பிடி மேலாண்மைப் பயிற்சிகள்.",
            },
            {
                "category_id": "public-administration",
                "order": 4,
                "icon_type": "briefcase",
                "title_en": "Administration, Finance & Governance",
                "title_si": "පාලනය, මුදල් සහ ප්‍රසම්පාදන කළමනාකරණය",
                "title_ta": "நிர்வாகம், நிதி மற்றும் அரசாங்கக் கொள்முதல்",
                "description_en": "Public procurement regulations, financial accounting, and administrative circular workshops.",
                "description_si": "රාජ්‍ය ප්‍රසම්පාදන රෙගුලාසි, මුදල් ගිණුම්කරණය සහ පරිපාලන වටලේඛන වැඩමුළු.",
                "description_ta": "பொதுக் கொள்முதல் விதிகள், நிதி கணக்கியல் மற்றும் நிர்வாகப் பயிற்சிகள்.",
            },
        ]

        cat_map = {}
        for c_data in categories_data:
            cat, _ = LocalTrainingCategory.objects.get_or_create(
                category_id=c_data["category_id"],
                defaults=c_data,
            )
            for k, v in c_data.items():
                setattr(cat, k, v)
            cat.save()
            cat_map[c_data["category_id"]] = cat

        # 3. Programmes Data
        programmes_data = [
            {
                "slug": "english-language-courses-2026-2027",
                "order": 1,
                "year": 2026,
                "category_id": "language-courses",
                "subheading_en": "Spoken English & Official Communication",
                "subheading_si": "කතාකරන ඉංග්‍රීසි සහ නිල සන්නිවේදනය",
                "subheading_ta": "பேச்சு ஆங்கிலம் மற்றும் அரச தொடர்பாடல்",
                "status": "Open",
                "featured": True,
                "title_en": "English Language Courses 2026/2027",
                "title_si": "ඉංග්‍රීසි භාෂා පාඨමාලා 2026/2027",
                "title_ta": "ஆங்கில மொழிப் படிப்புகள் 2026/2027",
                "provider_en": "Department of Official Languages & Ministry HRD",
                "provider_si": "රාජ්‍ය භාෂා දෙපාර්තමේන්තුව සහ අමාත්‍යාංශ මානව සම්පත් අංශය",
                "provider_ta": "அரச கரும மொழிகள் திணைக்களம் மற்றும் மனிதவளப் பிரிவு",
                "description_en": "Comprehensive English language proficiency courses designed for public sector officers and Ministry staff to enhance professional communication and report writing.",
                "description_si": "වෘත්තීය සන්නිවේදනය සහ වාර්තාකරණය වැඩිදියුණු කිරීම සඳහා රාජ්‍ය අංශයේ නිලධාරීන් සහ අමාත්‍යාංශ කාර්ය මණ්ඩලය වෙනුවෙන් සැලසුම් කරන ලද ඉංග්‍රීසි භාෂා ප්‍රවීණතා පාඨමාලා.",
                "description_ta": "தொழில்சார் தொடர்பாடல் மற்றும் அறிக்கை தயாரிப்பை மேம்படுத்துவதற்காக பொதுத்துறை அதிகாரிகள் மற்றும் பணியாளர்களுக்காக வடிவமைக்கப்பட்ட விரிவான ஆங்கிலப் பயிற்சி.",
                "category_label_en": "Language Courses",
                "published_date": "2026-01-15",
                "application_deadline": "2026-03-31",
                "file_type": "PDF",
                "file_size": "1.2 MB",
            },
            {
                "slug": "safety-at-sea-nautical-training-2026",
                "order": 2,
                "year": 2026,
                "category_id": "maritime-technical",
                "subheading_en": "Maritime Safety & Vessel Navigation",
                "subheading_si": "මුහුදු ආරක්ෂාව සහ යාත්‍රා මෙහෙයුම්",
                "subheading_ta": "கடல் பாதுகாப்பு மற்றும் படகு செலுத்துகை",
                "status": "Closing Soon",
                "featured": True,
                "title_en": "Safety at Sea & Outboard Motor Maintenance",
                "title_si": "මුහුදු ආරක්ෂාව සහ පිටත එන්ජින් නඩත්තු පුහුණුව",
                "title_ta": "கடல் பாதுகாப்பு மற்றும் வெளிப்ப இணைப்பு எஞ்சின் பராமரிப்பு",
                "provider_en": "NIFNE & Sri Lanka Navy Maritime Academy",
                "provider_si": "ජාතික ධීවර හා නාවික ඉංජිනේරු ආයතනය (NIFNE)",
                "provider_ta": "தேசிய கடற்றොழில் மற்றும் கடல்சார் பொறியியல் நிறுவனம்",
                "description_en": "Practical marine safety certification covering sea survival, GPS navigation, emergency distress signaling, and engine troubleshooting for multiday fishermen.",
                "description_si": "බහුදින ධීවරයන් සඳහා මුහුදේ ජීවිත ආරක්ෂාව, GPS නාවික පද්ධති සහ එන්ජින් අලුත්වැඩියාව පිළිබඳ ප්‍රායෝගික තාක්ෂණික සහතික පත්‍ර පාඨමාලාව.",
                "description_ta": "பலநாள் மீன்பிடி தொழிலாளர்களுக்கான கடல் வாழ்வாங்கு பாதுகாப்பு, ஜிபிஎஸ் வழிகாட்டுதல் மற்றும் எஞ்சின் பழுதுபார்ப்பு பயிற்சி.",
                "category_label_en": "Maritime & Safety",
                "published_date": "2026-02-01",
                "application_deadline": "2026-04-15",
                "file_type": "PDF",
                "file_size": "850 KB",
            },
            {
                "slug": "aquaculture-hatchery-management-2026",
                "order": 3,
                "year": 2026,
                "category_id": "aquaculture-vocational",
                "subheading_en": "Coastal Aquaculture & Hatchery Operations",
                "subheading_si": "වෙරළබඩ ජලජීවී වගාව සහ පැටවුන් බිහි කිරීම",
                "subheading_ta": "கடலோர நீர்வாழ் உயிரின வளர்ப்பு மற்றும் விதைப் பண்ணை",
                "status": "Open",
                "featured": True,
                "title_en": "Commercial Shrimp & Sea Cucumber Farming",
                "title_si": "වාණිජ ඉස්සන් සහ මුහුදු කූඩැල්ලන් වගා තාක්ෂණය",
                "title_ta": "வணிக ரீதியான இறால் மற்றும் கடல் அட்டை வளர்ப்பு தொழினுட்பம்",
                "provider_en": "NAQDA Training Centre - Tangalle & Chilaw",
                "provider_si": "ජාතික ජලජීවී වගා සංවර්ධන අධිකාරිය (NAQDA)",
                "provider_ta": "தேசிய நீர்வாழ் உயிரின வளர்ப்பு அபிவிருத்தி அதிகாரசபை",
                "description_en": "Specialized vocational course on water quality management, disease control, sustainable feeding protocols, and export quality harvesting.",
                "description_si": "ජල තත්ත්ව පාලනය, රෝග පාලනය, තිරසාර පෝෂණ ක්‍රමවේද සහ අපනයන මට්ටමේ අස්වනු නෙලීම පිළිබඳ විශේෂඥ පුහුණුව.",
                "description_ta": "நீர்த் தர மேலாண்மை, நோய் கட்டுப்பாடு மற்றும் ஏற்றுமதித் தர அறுவடை குறித்த விசேட தொழினுட்பப் பயிற்சி.",
                "category_label_en": "Aquaculture & Farming",
                "published_date": "2026-02-10",
                "application_deadline": "2026-04-30",
                "file_type": "PDF",
                "file_size": "1.4 MB",
            },
            {
                "slug": "procurement-financial-regulations-2026",
                "order": 4,
                "year": 2026,
                "category_id": "public-administration",
                "subheading_en": "Government Procurement & Circular Compliance",
                "subheading_si": "රාජ්‍ය ප්‍රසම්පාදන සහ වටලේඛන අනුකූලතාවය",
                "subheading_ta": "அரசாங்கக் கொள்முதல் மற்றும் சுற்றுநிருபங்கள்",
                "status": "Upcoming",
                "featured": False,
                "title_en": "Public Procurement & Contract Management Seminar",
                "title_si": "රාජ්‍ය ප්‍රසම්පාදන සහ කොන්ත්‍රාත් කළමනාකරණ සම්මන්ත්‍රණය",
                "title_ta": "பொதுக் கொள்முதல் மற்றும் ஒப்பந்த மேலாண்மை கருத்தரங்கு",
                "provider_en": "Ministry Procurement Division & SLIDA",
                "provider_si": "අමාත්‍යාංශ ප්‍රසම්පාදන අංශය සහ ශ්‍රී ලංකා සංවර්ධන පරිපාලන ආයතනය",
                "provider_ta": "அமைச்சின் கொள்முதல் பிரிவு மற்றும் SLIDA",
                "description_en": "Workshops for Ministry executives on bidding procedure guidelines, tender board evaluation standards, and financial accounting circulars.",
                "description_si": "අමාත්‍යාංශ විධායක නිලධාරීන් සඳහා ටෙන්ඩර් පටිපාටි, ප්‍රසම්පාදන ඇගයීම් සහ මුදල් රෙගුලාසි පිළිබඳ ප්‍රායෝගික වැඩමුළුව.",
                "description_ta": "கொள்முதல் நடைமுறைகள், கேள்விப்பத்திர மதிப்பீடு மற்றும் நிதி விதிகளுக்கான அதிகாரிகளுக்கான செயலமர்வு.",
                "category_label_en": "Administration & Finance",
                "published_date": "2026-03-01",
                "application_deadline": "2026-05-15",
                "file_type": "DOCX",
                "file_size": "620 KB",
            },
        ]

        for p_data in programmes_data:
            cat_id = p_data.pop("category_id")
            slug = p_data["slug"]
            cat_obj = cat_map.get(cat_id)

            prog, _ = LocalTrainingProgramme.objects.get_or_create(
                slug=slug,
                defaults={**p_data, "category": cat_obj},
            )
            prog.category = cat_obj
            for k, v in p_data.items():
                setattr(prog, k, v)
            prog.save()

        self.stdout.write(self.style.SUCCESS("Successfully seeded Local Training categories and programmes!"))
