from django.core.management.base import BaseCommand
from local_training.models import LocalTrainingPageHeader, LocalTrainingProgramme


class Command(BaseCommand):
    help = "Seed rich multilingual data for Local Training Opportunities"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Local Training page and programmes...")

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
        hdr.description_ta = "கடற்றொழில் அமைச்சு மற்றும் தேசிய பங்குதாரர் நிறுவனங்களால் வழங்கப்படும் உள்ளூர் பயிற்சிப் படிப்புகள், தொழினுட்ப பட்டறைகள் மற்றும் திறன் மேம்பாட்டு வாய்ப்புகளைப் பார்வையிடவும்."

        hdr.featured_badge_en = "Featured 2026 Opportunities"
        hdr.featured_badge_si = "2026 විශේෂ අවස්ථා"
        hdr.featured_badge_ta = "2026 இன் விசேட வாய்ப்புகள்"

        hdr.catalogue_badge_en = "Programme Catalogue"
        hdr.catalogue_badge_si = "වැඩසටහන් නාමාවලිය"
        hdr.catalogue_badge_ta = "திட்ட பட்டியல்"

        hdr.library_title_en = "Training Programme Library"
        hdr.library_title_si = "පුහුණු වැඩසටහන් පුස්තකාලය"
        hdr.library_title_ta = "பயிற்සිத் திட்ட நூலகம்"
        hdr.save()

        # 2. Programmes Data
        programmes_data = [
            {
                "slug": "english-language-courses-2026-2027",
                "order": 1,
                "year": 2026,
                "category": "language",
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
                "category_label_si": "භාෂා පාඨමාලා",
                "category_label_ta": "மொழிப் பயிற்சிகள்",
                "published_date": "2026-01-15",
                "application_deadline": "2026-03-31",
                "file_type": "PDF",
                "file_size": "1 MB",
                "image_fallback": "/images/services/local-training.jpg",
            },
            {
                "slug": "training-program-on-sdfl-schedule-july-2026",
                "order": 2,
                "year": 2026,
                "category": "professional-development",
                "status": "Open",
                "featured": True,
                "title_en": "Training Program on SDFL – Program Schedule – July 2026",
                "title_si": "SDFL පුහුණු වැඩසටහන් කාලසටහන – ජූලි 2026",
                "title_ta": "SDFL பயிற்சித் திட்ட அட்டவணை – ஜூலை 2026",
                "provider_en": "Skills Development Fund Limited (SDFL)",
                "provider_si": "කුසලතා සංවර්ධන අරමුදල (SDFL)",
                "provider_ta": "திறன் மேம்பாட்டு நிதியம் (SDFL)",
                "description_en": "Official annual training schedule and course catalogue offered by SDFL focusing on technical skill upgrading, vocational competency, and industrial productivity.",
                "description_si": "තාක්ෂණික නිපුණතා, වෘත්තීය නිපුණතාව සහ කාර්මික ඵලදායිතාව ඉහළ නැංවීම කෙරෙහි අවධානය යොමු කරමින් SDFL විසින් පිරිනමනු ලබන නිල වාර්ෂික පුහුණු පාඨමාලා නාමාවලිය.",
                "description_ta": "தொழினுட்ப திறன் மேம்பாடு மற்றும் உற்பத்தித்திறனை மையமாகக் கொண்டு SDFL வழங்கும் அதிகாரப்பூர்வ வருடாந்த பயிற்சி அட்டவணை.",
                "category_label_en": "Professional Development",
                "category_label_si": "වෘත්තීය සංවර්ධනය",
                "category_label_ta": "தொழில்முறை மேம்பாடு",
                "published_date": "2026-02-01",
                "application_deadline": "2026-06-30",
                "file_type": "PDF",
                "file_size": "178 KB",
                "image_fallback": "/images/services/foreign-training.jpg",
            },
            {
                "slug": "mba-program-open-university-sri-lanka",
                "order": 3,
                "year": 2026,
                "category": "management",
                "status": "Open",
                "featured": True,
                "title_en": "Master of Business Administration Program – The Open University of Sri Lanka",
                "title_si": "ව්‍යාපාර පරිපාලනපති (MBA) උපාධි වැඩසටහන – ශ්‍රී ලංකා විවෘත විශ්වවිද්‍යාලය",
                "title_ta": "வணிக முகாமைத்துவ முதுமாணி (MBA) திட்டம் – இலங்கை திறந்த பல்கலைக்கழகம்",
                "provider_en": "The Open University of Sri Lanka (OUSL)",
                "provider_si": "ශ්‍රී ලංකා විවෘත විශ්වවිද්‍යාලය (OUSL)",
                "provider_ta": "இலங்கை திறந்த பல்கலைக்கழகம் (OUSL)",
                "description_en": "Postgraduate MBA degree programme intake notice for executive public officers seeking advanced managerial, strategic planning, and organizational leadership skills.",
                "description_si": "උසස් කළමනාකරණ, උපායමාර්ගික සැලසුම් සහ ආයතනික නායකත්ව කුසලතා අපේක්ෂා කරන විධායක රාජ්‍ය නිලධාරීන් සඳහා වන පශ්චාද් උපාධි MBA වැඩසටහන.",
                "description_ta": "உயர் முகாமைத்துவம் மற்றும் தலைமைத்துவ திறன்களை நாடும் நிறைவேற்று அதிகாரிகளுக்கான முதுகலை MBA பட்டப்படிப்பு.",
                "category_label_en": "Management",
                "category_label_si": "කළමනාකරණය",
                "category_label_ta": "முகாமைத்துவம்",
                "published_date": "2026-01-20",
                "application_deadline": "2026-04-15",
                "file_type": "PDF",
                "file_size": "794 KB",
                "image_fallback": "/images/services/recruitment.jpg",
            },
            {
                "slug": "contract-administration-payment-procedures",
                "order": 4,
                "year": 2026,
                "category": "procurement",
                "status": "Open",
                "featured": True,
                "title_en": "Contract Administration and Payment Procedures",
                "title_si": "කොන්ත්‍රාත් පරිපාලනය සහ ගෙවීම් පටිපාටි පුහුණුව",
                "title_ta": "ஒப்பந்த நிர்வாகம் மற்றும் கொடுப்பனவு நடைமுறைகள்",
                "provider_en": "National Institute of Business Management (NIBM)",
                "provider_si": "ජාතික ව්‍යාපාර කළමනාකාරීත්ව ආයතනය (NIBM)",
                "provider_ta": "தேசிய வணிக முகாமைத்துவ நிறுவனம் (NIBM)",
                "description_en": "Specialized workshop covering public contract management, contractor dispute resolution, milestone verification, and government payment clearance protocols.",
                "description_si": "රාජ්‍ය කොන්ත්‍රාත් කළමනාකරණය, කොන්ත්‍රාත්කරු ආරවුල් නිරාකරණය සහ රජයේ ගෙවීම් නිෂ්කාශන ප්‍රොටෝකෝල පිළිබඳ විශේෂ පුහුණු වැඩමුළුව.",
                "description_ta": "அரசு ஒப்பந்த முகாமைத்துவம், கொடுப்பனவு நடைமுறைகள் மற்றும் ஒப்பந்த பிணக்கு தீர்வு குறித்த சிறப்பு செயலமர்வு.",
                "category_label_en": "Procurement",
                "category_label_si": "ප්‍රසම්පාදනය",
                "category_label_ta": "கொள்முதல்",
                "published_date": "2026-02-10",
                "application_deadline": "2026-03-25",
                "file_type": "PDF",
                "file_size": "891 KB",
                "image_fallback": "/images/services/tenders.jpg",
            },
            {
                "slug": "ict-skills-digital-governance-fisheries",
                "order": 5,
                "year": 2026,
                "category": "technology",
                "status": "Open",
                "featured": False,
                "title_en": "ICT Skills for Digital Governance in Fisheries",
                "title_si": "ධීවර ක්ෂේත්‍රයේ ඩිජිටල් පාලනය සඳහා තොරතුරු තාක්ෂණ කුසලතා",
                "title_ta": "கடற்றொழிலில் டிஜிட்டல் நிர்வாகத்திற்கான தகவல் தொழினுட்ப திறன்",
                "provider_en": "Information and Communication Technology Agency (ICTA)",
                "provider_si": "තොරතුරු හා සන්නිවේදන තාක්ෂණ නියෝජිතායතනය (ICTA)",
                "provider_ta": "தகவல் மற்றும் தொடர்பாடல் தொழினுட்ப முகவரகம் (ICTA)",
                "description_en": "Hands-on computer training on modern digital services, VMS monitoring software, online licensing portals, and cloud data tools for Ministry staff.",
                "description_si": "නවීන ඩිජිටල් සේවා, VMS යාත්‍රා නිරීක්ෂණ මෘදුකාංග සහ මාර්ගගත බලපත්‍ර පද්ධති පිළිබඳ අමාත්‍යාංශ කාර්ය මණ්ඩලය සඳහා ප්‍රායෝගික පරිගණක පුහුණුව.",
                "description_ta": "டிஜிட்டல் சேவைகள், VMS கண்காணிப்பு மென்பொருள் மற்றும் இணைய அனுமதிப்பத்திர தளங்கள் பற்றிய அமைச்சு ஊழியர்களுக்கான தொழினுட்பப் பயிற்சி.",
                "category_label_en": "Technology & Digital Skills",
                "category_label_si": "තොරතුරු තාක්ෂණය",
                "category_label_ta": "தொழினுட்பம்",
                "published_date": "2026-02-05",
                "application_deadline": "2026-04-30",
                "file_type": "PDF",
                "file_size": "450 KB",
                "image_fallback": "/images/services/weather.jpg",
            },
            {
                "slug": "public-financial-regulations-audit-compliance",
                "order": 6,
                "year": 2026,
                "category": "finance",
                "status": "Open",
                "featured": False,
                "title_en": "Public Financial Regulations and Audit Compliance",
                "title_si": "රාජ්‍ය මූල්‍ය රෙගුලාසි සහ විගණන අනුකූලතා වැඩමුළුව",
                "title_ta": "அரச நிதி ஒழுங்குவிதிகள் மற்றும் கணக்காய்வு இணக்கப்பாடு",
                "provider_en": "Sri Lanka Institute of Development Administration (SLIDA)",
                "provider_si": "ශ්‍රී ලංකා සංවර්ධන පරිපාලන ආයතනය (SLIDA)",
                "provider_ta": "இலங்கை அபிவிருத்தி நிர்வாக நிறுவனம் (SLIDA)",
                "description_en": "Comprehensive study of government FR guidelines, expenditure verification, voucher approval systems, and preparation for national audit queries.",
                "description_si": "රජයේ මූල්‍ය රෙගුලාසි (FR) මාර්ගෝපදේශ, වියදම් සත්‍යාපනය සහ ජාතික විගණන විමසීම් සඳහා සූදානම් වීම පිළිබඳ පුළුල් අධ්‍යයනයක්.",
                "description_ta": "அரசாங்க நிதி ஒழுங்குவிதிகள், செலவு சரிபார்ப்பு மற்றும் தேசிய கணக்காய்வுக்கான தயாரிப்பு பற்றிய விரிவான பயிற்சி.",
                "category_label_en": "Finance & Accounting",
                "category_label_si": "මූල්‍ය හා ගිණුම්කරණය",
                "category_label_ta": "நிதி மற்றும் கணக்கியல்",
                "published_date": "2026-01-28",
                "application_deadline": "2026-03-20",
                "file_type": "PDF",
                "file_size": "620 KB",
                "image_fallback": "/images/services/services.jpg",
            },
            {
                "slug": "sustainable-aquaculture-hatchery-management-2025",
                "order": 7,
                "year": 2025,
                "category": "professional-development",
                "status": "Closed",
                "featured": False,
                "title_en": "Sustainable Aquaculture & Hatchery Management 2025",
                "title_si": "තිරසාර ජලජීවී වගාව සහ බීජෞෂණාගාර කළමනාකරණය 2025",
                "title_ta": "நிலையான நீர்வாழ் உயிரின வளர்ப்பு மற்றும் குஞ்சுபொரிப்பக முகாமைத்துவம் 2025",
                "provider_en": "National Aquaculture Development Authority (NAQDA)",
                "provider_si": "ජාතික ජලජීවී වගා සංවර්ධන අධිකාරිය (NAQDA)",
                "provider_ta": "தேசிய நீர்வாழ் உயிரின வளர்ப்பு அபிவிருத்தி அதிகாரசபை (NAQDA)",
                "description_en": "Field certification course covering seed production, water quality management, feed formulation, and biosecurity for freshwater and coastal hatcheries.",
                "description_si": "මිරිදිය සහ වෙරළබඩ බීජෞෂණාගාර සඳහා මත්ස්‍ය බීජ නිෂ්පාදනය, ජල තත්ත්ව කළමනාකරණය සහ ජෛව ආරක්ෂාව පිළිබඳ ක්ෂේත්‍ර සහතිකපත්‍ර පාඨමාලාව.",
                "description_ta": "நன்னீர் மற்றும் கரையோர குஞ்சுபொரிப்பகங்களுக்கான உற்பத்தி, நீர் தர முகாமைத்துவம் மற்றும் உயிர் பாதுகாப்பு சான்றிதழ் படிப்பு.",
                "category_label_en": "Professional Development",
                "category_label_si": "වෘත්තීය සංවර්ධනය",
                "category_label_ta": "தொழில்முறை மேம்பாடு",
                "published_date": "2025-06-10",
                "application_deadline": "2025-08-15",
                "file_type": "PDF",
                "file_size": "1.4 MB",
                "image_fallback": "/images/services/coastal.jpg",
            },
            {
                "slug": "marine-engine-repair-navigational-safety-2025",
                "order": 8,
                "year": 2025,
                "category": "professional-development",
                "status": "Closed",
                "featured": False,
                "title_en": "Marine Engine Repair & Navigational Safety 2025",
                "title_si": "සාගර එන්ජින් අලුත්වැඩියාව සහ නාවික ආරක්ෂාව 2025",
                "title_ta": "கடல் இயந்திர திருத்தம் மற்றும் வழிசெலுத்தல் பாதுகாப்பு 2025",
                "provider_en": "Ceylon Fisheries Harbour Corporation (CFHC) & NIFTE",
                "provider_si": "ලංකා ධීවර වරාය නීතිගත සංස්ථාව (CFHC) සහ NIFTE",
                "provider_ta": "இலங்கை மீன்பிடித் துறைமுகக் கூட்டுத்தாபனம் (CFHC)",
                "description_en": "Vocational training for multi-day boat technicians on diesel engine maintenance, electrical troubleshooting, and emergency GPS distress systems.",
                "description_si": "ඩීසල් එන්ජින් නඩත්තුව, විදුලි දෝෂ නිරාකරණය සහ හදිසි GPS ආපදා පද්ධති පිළිබඳ බහුදින යාත්‍රා කාර්මික ශිල්පීන් සඳහා වෘත්තීය පුහුණුව.",
                "description_ta": "டீசல் என்ஜின் பராமரிப்பு மற்றும் அவசரகால GPS அமைப்புகள் குறித்த படகு தொழில்நுட்பவியலாளர்களுக்கான தொழிற்பயிற்சி.",
                "category_label_en": "Professional Development",
                "category_label_si": "වෘත්තීය සංවර්ධනය",
                "category_label_ta": "தொழில்முறை மேம்பாடு",
                "published_date": "2025-04-12",
                "application_deadline": "2025-05-30",
                "file_type": "PDF",
                "file_size": "850 KB",
                "image_fallback": "/images/services/offshore.jpg",
            },
        ]

        for p_data in programmes_data:
            slug = p_data.pop("slug")
            prog, created = LocalTrainingProgramme.objects.get_or_create(slug=slug, defaults=p_data)
            if not created:
                for k, v in p_data.items():
                    setattr(prog, k, v)
                prog.save()

        self.stdout.write(self.style.SUCCESS("Successfully seeded Local Training data!"))
