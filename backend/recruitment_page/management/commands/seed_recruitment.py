from django.core.management.base import BaseCommand
from recruitment_page.models import RecruitmentPageHeader, RecruitmentVacancyItem


class Command(BaseCommand):
    help = "Seed rich multilingual data for Recruitment & Careers Portal"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Recruitment page and vacancies...")

        # 1. Page Header
        hdr, _ = RecruitmentPageHeader.objects.get_or_create(id=1)
        hdr.badge_text_en = "Join Our Dedicated Public Service"
        hdr.badge_text_si = "අපගේ රාජ්‍ය සේවයට එක්වන්න"
        hdr.badge_text_ta = "எமது பொதுச் சேவையில் இணையுங்கள்"

        hdr.title_en = "Recruitment & Careers Portal"
        hdr.title_si = "බඳවා ගැනීම් සහ වෘත්තීය ද්වාරය"
        hdr.title_ta = "ஆட்சேர்ப்பு மற்றும் தொழில் வாய்ப்புகள் போர்டல்"

        hdr.description_en = "Official recruitment portal of the Ministry of Fisheries. View public service vacancies, gazette job notices, research fellowships, and career application forms."
        hdr.description_si = "ධීවර අමාත්‍යාංශයේ නිල බඳවා ගැනීමේ ද්වාරය. රාජ්‍ය සේවා පුරප්පාඩු, ගැසට් නිවේදන, පර්යේෂණ ශිෂ්‍යත්ව සහ වෘත්තීය අයදුම්පත් පත්‍රිකා වෙත ප්‍රවේශ වන්න."
        hdr.description_ta = "கடற்றொழில் அமைச்சின் உத்தியோகபூர்வ ஆட்சேர்ப்பு தளம். பொது சேவை வெற்றிடங்கள், வர்த்தமானி வேலை அறிவிப்புகள், ஆராய்ச்சிப் பயிற்சிகள் மற்றும் விண்ணப்பப் படிவங்களைப் பார்வையிடவும்."

        hdr.featured_badge_en = "Featured Public Service Vacancies"
        hdr.featured_badge_si = "විශේෂ රාජ්‍ය සේවා පුරප්පාඩු"
        hdr.featured_badge_ta = "சிறப்பு பொது சேவை வெற்றிடங்கள்"

        hdr.catalogue_badge_en = "Official Vacancies Catalogue"
        hdr.catalogue_badge_si = "නිල පුරප්පාඩු නාමාවලිය"
        hdr.catalogue_badge_ta = "உத்தியோகபூர்வ வெற்றிடங்களின் பட்டியல்"

        hdr.library_title_en = "Public Service Recruitment Library"
        hdr.library_title_si = "රාජ්‍ය සේවා බඳවා ගැනීමේ එකතුව"
        hdr.library_title_ta = "பொது சேவை ஆட்சேர்ப்பு நூலகம்"
        hdr.save()

        # 2. Vacancies Data
        vacancies_data = [
            {
                "slug": "marine-fisheries-inspector-grade-iii-2026",
                "ref_number": "MOF/REC/2026/01",
                "order": 1,
                "year": 2026,
                "category": "inspection",
                "status": "Closing Soon",
                "featured": True,
                "title_en": "Marine Fisheries Inspector (Grade III)",
                "title_si": "සමුද්‍ර ධීවර පරීක්ෂක (III වන ශ්‍රේණිය)",
                "title_ta": "கடல்சார் கடற்றொழில் பரிசோதகர் (தரம் III)",
                "institution_en": "Department of Fisheries and Aquatic Resources (DFAR)",
                "institution_si": "ධීවර හා ජලජ සම්පත් දෙපාර්තමේන්තුව (DFAR)",
                "institution_ta": "கடற்றொழில் மற்றும் நீரியல் வளங்கள் திணைக்களம் (DFAR)",
                "department_en": "Vessel Monitoring & Inspection Division",
                "department_si": "යාත්‍රා නිරීක්ෂණ හා පරීක්ෂණ අංශය",
                "department_ta": "படகு கண்காணிப்பு மற்றும் ஆய்வுப் பிரிவு",
                "description_en": "Applications are invited from qualified Sri Lankan citizens for the post of Marine Fisheries Inspector. Duties include harbour vessel clearance, catch log auditing, and sea safety inspection.",
                "description_si": "සමුද්‍ර ධීවර පරීක්ෂක තනතුර සඳහා සුදුසුකම් ලත් ශ්‍රී ලාංකික පුරවැසියන්ගෙන් අයදුම්පත් කැඳවනු ලැබේ. වරාය යාත්‍රා නිෂ්කාශනය, අස්වනු සටහන් විගණනය සහ මුහුදු ආරක්ෂණ පරීක්ෂාව ප්‍රධාන රාජකාරි වේ.",
                "description_ta": "கடல்சார் மீன்பிடி பரிசோதகர் பதவிக்கு தகுதியான இலங்கை பிரஜைகளிடமிருந்து விண்ணப்பங்கள் கோரப்படுகின்றன. துறைமுக அனுமதி, பிடிப்பு பதிவு தணிக்கை மற்றும் பாதுகாப்பு ஆய்வு ஆகியவை கடமைகளாகும்.",
                "category_label_en": "Inspection & Compliance",
                "category_label_si": "පරීක්ෂණ හා අනුකූලතාව",
                "category_label_ta": "ஆய்வு மற்றும் இணக்கப்பாடு",
                "qualifications_en": "Degree in Fisheries Science, Marine Biology, Agriculture or B.Sc. Physical Science\nPasses in Sinhala/Tamil and English at G.C.E. (O/L) examination\nPhysical fitness for high-seas vessel inspection duties",
                "qualifications_si": "ධීවර විද්‍යාව, සාගර ජීව විද්‍යාව, කෘෂිකර්මය පිළිබඳ උපාධියක් හෝ භෞතික විද්‍යා B.Sc. උපාධියක්\nඅ.පො.ස. (සා/පෙ) විභාගයේදී සිංහල/දෙමළ සහ ඉංග්‍රීසි විෂයයන් සමත්ව තිබීම\nගැඹුරු මුහුදු යාත්‍රා පරීක්ෂණ රාජකාරි සඳහා අවශ්‍ය කායික යෝග්‍යතාව",
                "qualifications_ta": "கடற்றொழில் அறிவியல், கடல்சார் உயிரியல், விவசாயம் அல்லது B.Sc. பட்டப்படிப்பு\nக.பொ.த. (சா/த) பரீட்சையில் சிங்களம்/தமிழ் மற்றும் ஆங்கிலத்தில் சித்தி\nஆழ்கடல் படகு ஆய்வு பணிகளுக்கான உடல் தகுதி",
                "salary_scale_en": "MN 4-2016: LKR 31,490 - 10x445 - 11x525 - 10x600 - LKR 51,965/-",
                "salary_scale_si": "MN 4-2016: රු. 31,490 - 10x445 - 11x525 - 10x600 - රු. 51,965/-",
                "salary_scale_ta": "MN 4-2016: ரூபா 31,490 - 10x445 - 11x525 - 10x600 - ரூபா 51,965/-",
                "age_limit_en": "Between 18 and 35 years as of closing date",
                "age_limit_si": "අයදුම්පත් භාරගන්නා අවසන් දිනට වයස අවුරුදු 18 ත් 35 ත් අතර",
                "age_limit_ta": "விண்ணப்ப முடிவுத் திகதியில் 18 முதல் 35 வயது வரை",
                "published_date": "2026-01-20",
                "closing_date": "2026-03-25",
                "file_type": "PDF",
                "file_size": "1.1 MB",
            },
            {
                "slug": "senior-research-scientist-oceanography-2026",
                "ref_number": "MOF/REC/2026/02",
                "order": 2,
                "year": 2026,
                "category": "research",
                "status": "Open",
                "featured": True,
                "title_en": "Senior Research Scientist (Oceanography & Remote Sensing)",
                "title_si": "ජ්‍යෙෂ්ඨ පර්යේෂණ විද්‍යාඥ (සාගර විද්‍යාව සහ දුරස්ථ සංවේදනය)",
                "title_ta": "சிரேஷ்ட ஆராய்ச்சி விஞ்ஞானி (சமுத்திரவியல் மற்றும் தொலை உணர்வு)",
                "institution_en": "National Aquatic Resources Research Agency (NARA)",
                "institution_si": "ජාතික ජලජ සම්පත් පර්යේෂණ හා සංවර්ධන නියෝජිතායතනය (NARA)",
                "institution_ta": "தேசிய நீரியல் வளங்கள் ஆராய்ச்சி மற்றும் அபிவிருத்தி முகவரகம் (NARA)",
                "department_en": "Oceanography & Marine Environment Directorate",
                "department_si": "සාගර විද්‍යා හා සමුද්‍ර පරිසර අධ්‍යක්ෂ මණ්ඩලය",
                "department_ta": "சமுத்திரவியல் மற்றும் கடல் சுற்றுச்சூழல் பணிப்பகம்",
                "description_en": "NARA invites applications for Senior Research Scientist to lead satellite oceanographic surveys, sea-surface temperature (SST) modeling, and coastal habitat mapping projects.",
                "description_si": "චන්ද්‍රිකා සාගර විද්‍යාත්මක සමීක්ෂණ, මුහුදු මතුපිට උෂ්ණත්ව (SST) ආකෘති නිර්මාණය සහ වෙරළබඩ පරිසර පද්ධති සිතියම්ගත කිරීමේ ව්‍යාපෘති මෙහෙයවීම සඳහා නාරා (NARA) අයදුම්පත් කැඳවයි.",
                "description_ta": "செய்மதி சமுத்திரவியல் ஆய்வுகள், கடல் மேற்பரப்பு வெப்பநிலை மாதிரி மற்றும் கரையோர வாழ்விட வரைபட திட்டங்களை வழிநடத்த NARA விண்ணப்பங்களை கோருகிறது.",
                "category_label_en": "Scientific Research",
                "category_label_si": "විද්‍යාත්මක පර්යේෂණ",
                "category_label_ta": "அறிவியல் ஆராய்ச்சி",
                "qualifications_en": "Ph.D. or Master of Science in Oceanography, GIS & Remote Sensing, or Geophysics\nMinimum 5 years research experience in marine satellite data analysis\nDemonstrated publication record in peer-reviewed scientific journals",
                "qualifications_si": "සාගර විද්‍යාව, GIS සහ දුරස්ථ සංවේදනය හෝ භූ භෞතික විද්‍යාව පිළිබඳ Ph.D. හෝ M.Sc. උපාධියක්\nසමුද්‍ර චන්ද්‍රිකා දත්ත විශ්ලේෂණය පිළිබඳ අවම වශයෙන් වසර 5 ක පර්යේෂණ පළපුරුද්ද\nපිළිගත් විද්‍යාත්මක සඟරාවල පර්යේෂණ පත්‍රිකා ප්‍රකාශයට පත් කර තිබීම",
                "qualifications_ta": "சமுத்திரவியல், GIS & தொலை உணர்வு அல்லது புவி இயற்பியலில் Ph.D. அல்லது M.Sc. பட்டம்\nகடல்சார் செய்மதி தரவு பகுப்பாய்வில் குறைந்தது 5 வருட ஆராய்ச்சி அனுபவம்\nஅங்கீகரிக்கப்பட்ட அறிவியல் இதழ்களில் கட்டுரைகள் வெளியிட்ட அனுபவம்",
                "salary_scale_en": "AR 2-2016: LKR 76,200 - 10x2,000 - LKR 96,200/-",
                "salary_scale_si": "AR 2-2016: රු. 76,200 - 10x2,000 - රු. 96,200/-",
                "salary_scale_ta": "AR 2-2016: ரூபா 76,200 - 10x2,000 - ரூபா 96,200/-",
                "age_limit_en": "Below 45 years as of closing date",
                "age_limit_si": "අයදුම්පත් භාරගන්නා අවසන් දිනට වයස අවුරුදු 45 ට අඩු",
                "age_limit_ta": "விண்ணப்ப முடிவுத் திகதியில் 45 வயதுக்கு உட்பட்டவராக இருத்தல் வேண்டும்",
                "published_date": "2026-02-01",
                "closing_date": "2026-04-15",
                "file_type": "PDF",
                "file_size": "1.4 MB",
            },
            {
                "slug": "aquaculture-extension-officer-naqda-2026",
                "ref_number": "MOF/REC/2026/03",
                "order": 3,
                "year": 2026,
                "category": "technical",
                "status": "Open",
                "featured": True,
                "title_en": "Aquaculture Development Extension Officer (Grade II)",
                "title_si": "ජලජීවී වගා සංවර්ධන ව්‍යාප්ති නිලධාරී (II වන ශ්‍රේණිය)",
                "title_ta": "நீர்வாழ் உயிரின வளர்ப்பு அபிவிருத்தி விரிவாக்கல் அதிகாரி (தரம் II)",
                "institution_en": "National Aquaculture Development Authority (NAQDA)",
                "institution_si": "ජාතික ජලජීවී වගා සංවර්ධන අධිකාරිය (NAQDA)",
                "institution_ta": "தேசிய நீர்வாழ் உயிரின வளர்ப்பு அபிவிருத்தி அதிகாரசபை (NAQDA)",
                "department_en": "Inland & Coastal Extension Division",
                "department_si": "මිරිදිය හා වෙරළබඩ ව්‍යාප්ති අංශය",
                "department_ta": "உள்நாட்டு மற்றும் கரையோர விரிவாக்கல் பிரிவு",
                "description_en": "Field extension officers required across Eastern and Northern provinces to assist rural fish farmers, monitor shrimp hatcheries, and manage freshwater fish seed distribution.",
                "description_si": "නැගෙනහිර සහ උතුරු පළාත්වල ග්‍රාමීය මත්ස්‍ය ගොවීන්ට සහාය වීම, ඉස්සන් බීජෞෂණාගාර නිරීක්ෂණය සහ මිරිදිය මත්ස්‍ය පැටවුන් බෙදා හැරීම සඳහා ක්ෂේත්‍ර ව්‍යාප්ති නිලධාරීන් බඳවා ගැනේ.",
                "description_ta": "கிராமப்புற மீன் விவசாயிகளுக்கு உதவவும், இறால் குஞ்சுபொரிப்பகங்களை கண்காணிக்கவும் கிழக்கு மற்றும் வடக்கு மாகாணங்களுக்கு கள விரிவாக்கல் அதிகாரிகள் தேவை.",
                "category_label_en": "Technical & Extension",
                "category_label_si": "තාක්ෂණික හා ව්‍යාප්ති",
                "category_label_ta": "தொழில்நுட்பம் மற்றும் விரிவாக்கம்",
                "qualifications_en": "Diploma in Agriculture / Aquaculture from a recognized school of agriculture\nValid light motor vehicle / motorcycle riding license",
                "qualifications_si": "පිළිගත් කෘෂිකර්ම විද්‍යාලයකින් කෘෂිකර්මය / ජලජීවී වගාව පිළිබඳ ඩිප්ලෝමාවක්\nවලංගු සැහැල්ලු වාහන / යතුරුපැදි පැදවීමේ බලපත්‍රයක් හිමිවීම",
                "qualifications_ta": "அங்கீகரிக்கப்பட்ட விவசாயக் கல்லூரியில் இருந்து விவசாயம்/நீர்வாழ் உயிரின வளர்ப்பில் டிப்ளோமா\nசெல்லுபடியாகும் மோட்டார் சைக்கிள் ஓட்டுநர் அனுமதிப்பத்திரம்",
                "salary_scale_en": "MA 3-2016: LKR 32,200 - 10x370 - 10x495 - LKR 52,500/-",
                "salary_scale_si": "MA 3-2016: රු. 32,200 - 10x370 - 10x495 - රු. 52,500/-",
                "salary_scale_ta": "MA 3-2016: ரூபா 32,200 - 10x370 - 10x495 - ரூபா 52,500/-",
                "age_limit_en": "Between 20 and 35 years",
                "age_limit_si": "වයස අවුරුදු 20 ත් 35 ත් අතර",
                "age_limit_ta": "20 முதல் 35 வயது வரை",
                "published_date": "2026-02-10",
                "closing_date": "2026-04-30",
                "file_type": "PDF",
                "file_size": "850 KB",
            },
            {
                "slug": "assistant-director-planning-monitoring-2026",
                "ref_number": "MOF/REC/2026/04",
                "order": 4,
                "year": 2026,
                "category": "administrative",
                "status": "Open",
                "featured": False,
                "title_en": "Assistant Director (Planning & Sector Monitoring)",
                "title_si": "සහකාර අධ්‍යක්ෂ (සැලසුම් සහ ක්ෂේත්‍ර නිරීක්ෂණ)",
                "title_ta": "உதவிப் பணிப்பாளர் (திட்டமிடல் மற்றும் துறைசார் கண்காணிப்பு)",
                "institution_en": "Ministry of Fisheries HQ",
                "institution_si": "ධීවර අමාත්‍යාංශ ප්‍රධාන කාර්යාලය",
                "institution_ta": "கடற்றොழில் அமைச்சு தலைமையகம்",
                "department_en": "Planning & Monitoring Division",
                "department_si": "සැලසුම් හා නිරීක්ෂණ අංශය",
                "department_ta": "திட்டமிடல் மற்றும் கண்காணிப்புப் பிரிவு",
                "description_en": "Executive role in formulation of national fisheries action plans, treasury capital expenditure tracking, and coordination with foreign development partners.",
                "description_si": "ජාතික ධීවර ක්‍රියාකාරී සැලසුම් සැකසීම, මහා භාණ්ඩාගාර ප්‍රාග්ධන වියදම් නිරීක්ෂණය සහ විදේශ සංවර්ධන හවුල්කරුවන් සමඟ සම්බන්ධීකරණය.",
                "description_ta": "தேசிய கடற்றொழில் செயல் திட்டங்களை உருவாக்குதல், மூலதன செலவினங்களை கண்காணித்தல் மற்றும் வெளிநாட்டு பங்காளர்களுடன் ஒருங்கிணைப்பு.",
                "category_label_en": "Administrative & Management",
                "category_label_si": "පරිපාලන හා කළමනාකරණ",
                "category_label_ta": "நிர்வாகம் மற்றும் முகாமைத்துவம்",
                "qualifications_en": "Special Degree in Economics, Statistics, Public Administration or Development Studies (Class I or II Upper)\nSLAS / SLPS (Sri Lanka Planning Service) cadre officers or open recruitment with 3 years executive experience",
                "qualifications_si": "ආර්ථික විද්‍යාව, සංඛ්‍යාලේඛන, රාජ්‍ය පරිපාලනය පිළිබඳ විශේෂ උපාධියක් (පළමු හෝ දෙවන පෙළ ඉහළ සාමාර්ථයක්)\nශ්‍රී ලංකා සැලසුම් සේවයේ (SLPS) නිලධාරීන් හෝ වසර 3 ක විධායක පළපුරුද්ද සහිත විවෘත අයදුම්කරුවන්",
                "qualifications_ta": "பொருளாதாரம், புள்ளிவிவரம் அல்லது பொது நிர்வாகத்தில் சிறப்பு பட்டம்\nஇலங்கை திட்டமிடல் சேவை அதிகாரிகள் அல்லது 3 வருட நிறைவேற்று அனுபவம் உள்ளவர்கள்",
                "salary_scale_en": "SL 1-2016: LKR 47,615 - 10x1,335 - 8x1,630 - LKR 84,005/-",
                "salary_scale_si": "SL 1-2016: රු. 47,615 - 10x1,335 - 8x1,630 - රු. 84,005/-",
                "salary_scale_ta": "SL 1-2016: ரூபா 47,615 - 10x1,335 - 8x1,630 - ரூபா 84,005/-",
                "age_limit_en": "Between 22 and 35 years (Age limit not applicable to public officers)",
                "age_limit_si": "වයස අවුරුදු 22 ත් 35 ත් අතර (රාජ්‍ය නිලධාරීන්ට උපරිම වයස් සීමාව අදාළ නොවේ)",
                "age_limit_ta": "22 முதல் 35 வயது வரை (அரச ஊழியர்களுக்கு வயது வரம்பு பொருந்தாது)",
                "published_date": "2026-01-25",
                "closing_date": "2026-03-31",
                "file_type": "PDF",
                "file_size": "920 KB",
            },
        ]

        for v_data in vacancies_data:
            slug = v_data.pop("slug")
            vac, created = RecruitmentVacancyItem.objects.get_or_create(slug=slug, defaults=v_data)
            if not created:
                for k, v in v_data.items():
                    setattr(vac, k, v)
                vac.save()

        self.stdout.write(self.style.SUCCESS("Successfully seeded Recruitment data!"))
