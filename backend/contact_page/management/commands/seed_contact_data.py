from django.core.management.base import BaseCommand
from contact_page.models import (
    ContactPageSettings,
    ContactDepartment,
    ContactOfficer,
    ContactFaq,
)

DEFAULT_DEPARTMENTS = [
    {
        "id_code": "sec-exec",
        "name_en": "Ministry Secretariat & Executive Office",
        "name_si": "අමාත්‍යාංශ ලේකම් කාර්යාලය සහ විධායක කාර්යාලය",
        "name_ta": "அமைச்சின் செயலகம் & நிறைவேற்று அலுவலகம்",
        "description_en": "Policy direction, executive management, and secretarial administration.",
        "description_si": "ප්‍රතිපත්ති මාර්ගෝපදේශනය, විධායක කළමනාකරණය සහ ලේකම් පාලනය.",
        "description_ta": "கொள்கை வழிகாட்டல், நிர்வாக மேலாண்மை மற்றும் செயலக நிர்வாகம்.",
        "location_en": "4th Floor, Main Building",
        "location_si": "4 වන මහල, ප්‍රධාන ගොඩනැගිල්ල",
        "location_ta": "4 வது மாடி, பிரதான கட்டிடம்",
        "order": 1,
        "custom_columns": ["Designation", "Officer Name", "Telephone", "Mobile", "Fax", "Email", "Location"],
        "officers": [
            {
                "designation_en": "Secretary to the Ministry",
                "designation_si": "අමාත්‍යාංශයේ ලේකම්",
                "designation_ta": "அமைச்சின் செயலாளர்",
                "name_en": "Mr. B.K. Kolitha Kamal Jinadasa (PhD)",
                "telephone": "+94 112 327 060",
                "fax": "+94 112 541 184",
                "email": "secretary@fisheries.gov.lk",
                "location_en": "4th Floor, Room 401",
                "order": 1,
            },
            {
                "designation_en": "Additional Secretary (Admin & HR)",
                "designation_si": "අතිරේක ලේකම් (පාලන හා මානව සම්පත්)",
                "designation_ta": "மேலதிக செயலாளர் (நிர்வாகம் & மனித வளம்)",
                "name_en": "Mrs. N. A. A. P. S. Nissanka",
                "telephone": "+94 112 436 665",
                "fax": "+94 112 320 140",
                "email": "asstsecfisheries@yahoo.com",
                "location_en": "4th Floor, Room 405",
                "order": 2,
            },
        ],
    },
    {
        "id_code": "admin-hr",
        "name_en": "Administration & Human Resources Division",
        "name_si": "පාලන හා මානව සම්පත් අංශය",
        "name_ta": "நிர்வாகம் & மனித வளப் பிரிவு",
        "description_en": "General administration, cadre management, foreign training, and staff welfare.",
        "description_si": "සාමාන්‍ය පාලනය, මානව සම්පත් කළමනාකරණය සහ කාර්ය මණ්ඩල සුබසාධනය.",
        "description_ta": "பொது நிர்வாகம், ஊழியர் மேலாண்மை மற்றும் பணியாளர் நலன்.",
        "location_en": "3rd Floor, Main Building",
        "location_si": "3 වන මහල, ප්‍රධාන ගොඩනැගිල්ල",
        "location_ta": "3 வது மாடி, பிரதான கட்டிடம்",
        "order": 2,
        "custom_columns": ["Designation", "Officer Name", "Telephone", "Mobile", "Fax", "Email", "Location"],
        "officers": [
            {
                "designation_en": "Director (Admin)",
                "designation_si": "අධ්‍යක්ෂ (පාලන)",
                "designation_ta": "இயக்குனர் (நிர்வாகம்)",
                "name_en": "Mr. H. M. P. Senarathne",
                "telephone": "+94 112 446 183",
                "mobile": "+94 714 289 101",
                "email": "diradmin@fisheries.gov.lk",
                "location_en": "3rd Floor, Room 302",
                "order": 1,
            },
            {
                "designation_en": "Assistant Director (HRD)",
                "designation_si": "සහකාර අධ්‍යක්ෂ (මානව සම්පත්)",
                "designation_ta": "உதவி இயக்குனர் (மனித வளம்)",
                "name_en": "Ms. K. G. Perera",
                "telephone": "+94 112 446 185",
                "email": "hrd@fisheries.gov.lk",
                "location_en": "3rd Floor, Room 304",
                "order": 2,
            },
        ],
    },
    {
        "id_code": "fish-dev",
        "name_en": "Fisheries & Aquatic Resources Development Division",
        "name_si": "ධීවර හා ජලජ සම්පත් සංවර්ධන අංශය",
        "name_ta": "கடற்றொழில் & நீர்வாழ் வளங்கள் அபிவிருத்திப் பிரிவு",
        "description_en": "Marine capture fisheries policy, harbor operations, and fleet development.",
        "description_si": "සාගර ධීවර ප්‍රතිපත්තිය, වරාය මෙහෙයුම් සහ නාවික බලඇණි සංවර්ධනය.",
        "description_ta": "கடல் மீன்பிடிக்கொள்கை, துறைமுக செயல்பாடுகள் மற்றும் கப்பற்படை வளர்ச்சி.",
        "location_en": "2nd Floor, Main Building",
        "location_si": "2 වන මහල, ප්‍රධාන ගොඩනැගිල්ල",
        "location_ta": "2 வது மாடி, பிரதான கட்டிடம்",
        "order": 3,
        "custom_columns": ["Designation", "Officer Name", "Telephone", "Mobile", "Fax", "Email", "Location"],
        "officers": [
            {
                "designation_en": "Director Development (Fisheries)",
                "designation_si": "සංවර්ධන අධ්‍යක්ෂ (ධීවර)",
                "designation_ta": "அபிவிருத்தி இயக்குனர் (மீன்பிடி)",
                "name_en": "Mr. M. S. M. Fernando",
                "telephone": "+94 112 423 781",
                "email": "dirdev@fisheries.gov.lk",
                "location_en": "2nd Floor, Room 201",
                "order": 1,
            },
            {
                "designation_en": "Senior Fisheries Development Officer",
                "designation_si": "ජ්‍යෙෂ්ඨ ධීවර සංවර්ධන නිලධාරී",
                "designation_ta": "மூத்த மீன்பிடி அபிவிருத்தி அதிகாரி",
                "name_en": "Mr. W. A. Silva",
                "telephone": "+94 112 423 784",
                "mobile": "+94 773 112 490",
                "email": "devops@fisheries.gov.lk",
                "location_en": "2nd Floor, Room 206",
                "order": 2,
            },
        ],
    },
    {
        "id_code": "ocean-coast",
        "name_en": "Ocean Resources & Coastal Conservation Division",
        "name_si": "සාගර සම්පත් හා වෙරළ සංරක්ෂණ අංශය",
        "name_ta": "பெருங்கடல் வளங்கள் & கடலோர பாதுகாப்பு பிரிவு",
        "description_en": "Exclusive Economic Zone (EEZ) management, marine spatial planning, and conservation.",
        "description_si": "විශේෂිත ආර්ථික කලාප පාලනය සහ සාගර සංරක්ෂණය.",
        "description_ta": "பிரத்யேக பொருளாதார மண்டல மேலாண்மை மற்றும் கடல்சார் பாதுகாப்பு.",
        "location_en": "2nd Floor, Annex",
        "location_si": "2 වන මහල, ඇමුණුම",
        "location_ta": "2 வது மாடி, இணைப்பு",
        "order": 4,
        "custom_columns": ["Designation", "Officer Name", "Telephone", "Mobile", "Fax", "Email", "Location"],
        "officers": [
            {
                "designation_en": "Director (Ocean Resources)",
                "designation_si": "අධ්‍යක්ෂ (සාගර සම්පත්)",
                "designation_ta": "இயக்குனர் (பெருங்கடல் வளங்கள்)",
                "name_en": "Dr. S. K. Wickramasinghe",
                "telephone": "+94 112 331 405",
                "email": "dirocean@fisheries.gov.lk",
                "location_en": "2nd Floor Annex, Room A201",
                "order": 1,
            },
            {
                "designation_en": "Coastal Conservation Coordinator",
                "designation_si": "වෙරළ සංරක්ෂණ සම්බන්ධීකාරක",
                "designation_ta": "கடலோர பாதுகாப்பு ஒருங்கிணைப்பாளர்",
                "name_en": "Mrs. T. D. Jayasuriya",
                "telephone": "+94 112 331 408",
                "email": "coastal@fisheries.gov.lk",
                "location_en": "2nd Floor Annex, Room A204",
                "order": 2,
            },
        ],
    },
]

DEFAULT_FAQS = [
    {
        "question_en": "What are the official public working hours of the Ministry Headquarters?",
        "question_si": "අමාත්‍යාංශ ප්‍රධාන කාර්යාලයේ නිල මහජන වැඩකරන වේලාවන් මොනවාද?",
        "question_ta": "அமைச்சின் தலைமை அலுவலகத்தின் அதிகாரப்பூர்வ பணி நேரங்கள் என்ன?",
        "answer_en": "The Ministry headquarters is open Monday to Friday from 8:30 AM to 4:15 PM. The office remains closed on Saturdays, Sundays, and official public & Poya holidays.",
        "answer_si": "අමාත්‍යාංශ ප්‍රධාන කාර්යාලය සඳුදා සිට සිකුරාදා දක්වා පෙ.ව. 8:30 සිට ප.ව. 4:15 දක්වා විවෘතව පවතී. සෙනසුරාදා, ඉරිදා සහ රජයේ නිවාඩු/පෝය දිනවල වසා තැබේ.",
        "answer_ta": "அமைச்சின் தலைமை அலுவலகம் திங்கள் முதல் வெள்ளி வரை காலை 8:30 முதல் மாலை 4:15 வரை திறந்திருக்கும். சனி, ஞாயிறு மற்றும் அரச விடுமுறை நாட்களில் மூடப்படும்.",
        "order": 1,
    },
    {
        "question_en": "How can I submit a public inquiry or official message to the Ministry?",
        "question_si": "අමාත්‍යාංශය වෙත නිල පණිවුඩයක් හෝ විමසීමක් යොමු කරන්නේ කෙසේද?",
        "question_ta": "அமைச்சுக்கு பொது விசாரணை அல்லது அதிகாரப்பூர்வ செய்தியை எவ்வாறு சமர்ப்பிப்பது?",
        "answer_en": "You can fill out the online 'Send Us a Message' form on this page. Submitted inquiries are logged and dispatched to minfishit@gmail.com for review and response.",
        "answer_si": "ඔබට මෙම පිටුවේ ඇති 'අප වෙත පණිවුඩයක් යොමු කරන්න' පෝරමය පිරවිය හැක. යොමු කරන ලද සියලුම විමසීම් minfishit@gmail.com වෙත යොමු කෙරේ.",
        "answer_ta": "இந்தப் பக்கத்தில் உள்ள 'எங்களுக்கு ஒரு செய்தியை அனுப்புங்கள்' படிவத்தைப் பூர்த்தி செய்யலாம். சமர்ப்பிக்கப்பட்ட விசாரணைகள் minfishit@gmail.com க்கு அனுப்பப்படும்.",
        "order": 2,
    },
    {
        "question_en": "Where is the Ministry of Fisheries located in Colombo?",
        "question_si": "ධීවර අමාත්‍යාංශය කොළඹ පිහිටා තිබෙන්නේ කොහේද?",
        "question_ta": "கடற்றொழில் அமைச்சு கொழும்பில் எங்கு அமைந்துள்ளது?",
        "answer_en": "The main Secretariat building is located at the New Secretariat Complex, Maligawatta, Colombo 10, Sri Lanka.",
        "answer_si": "ප්‍රධාන ලේකම් කාර්යාල ගොඩනැගිල්ල නවලේකම් කාර්යාල සංකීර්ණය, මාලිගාවත්ත, කොළඹ 10 හි පිහිටා ඇත.",
        "answer_ta": "பிரதான செயலகக் கட்டிடம் புதிய செயலக வளாகம், மாளிகாவத்தை, கொழும்பு 10 இல் அமைந்துள்ளது.",
        "order": 3,
    },
]


class Command(BaseCommand):
    help = "Seeds initial Contact Page Settings, Department Categories, Contact Tables, and Public FAQs."

    def handle(self, *args, **options):
        self.stdout.write("Seeding Contact Page data...")

        settings_obj, created = ContactPageSettings.objects.get_or_create(id=1)
        settings_obj.page_title_en = "Contact Us"
        settings_obj.page_title_si = "අප හා සම්බන්ධ වන්න"
        settings_obj.page_title_ta = "எங்களைத் தொடர்பு கொள்ளவும்"

        settings_obj.page_description_en = "Official contact portal of the Ministry of Fisheries. Access departmental directories, headquarters address, office map, inquiry submission form, and public FAQs."
        settings_obj.page_description_si = "ධීවර අමාත්‍යාංශයේ නිල සම්බන්ධතා ද්වාරය. දෙපාර්තමේන්තු නාමාවලි, ප්‍රධාන කාර්යාල ලිපිනය, කාර්යාල සිතියම, විමසීම් යොමු කිරීමේ පෝරමය සහ පොදු නිතර අසන ප්‍රශ්න වෙත පිවිසෙන්න."
        settings_obj.page_description_ta = "கடற்றொழில் அமைச்சின் அதிகாரப்பூர்வ தொடர்பு போர்டல். திணைக்கள கோப்பகங்கள், தலைமை அலுவலக முகவரி, அலுவலக வரைபடம் மற்றும் பொது அடிக்கடி கேட்கப்படும் கேள்விகளை அணுகவும்."

        settings_obj.directory_badge_en = "Primary Contact Directory"
        settings_obj.directory_badge_si = "ප්‍රාථමික සම්බන්ධතා නාමාවලිය"
        settings_obj.directory_badge_ta = "முதன்மை தொடர்பு கோப்பகம்"

        settings_obj.directory_title_en = "Departmental & Division Contacts"
        settings_obj.directory_title_si = "අමාත්‍යාංශ අංශ සහ දෙපාර්තමේන්තු සම්බන්ධතා"
        settings_obj.directory_title_ta = "திணைக்கள & பிரிவு தொடர்புகள்"

        settings_obj.directory_subtitle_en = "Access direct telephone numbers, extensions, location details, and officer emails for each division and affiliated department."
        settings_obj.directory_subtitle_si = "එක් එක් අංශය සහ අනුබද්ධ දෙපාර්තමේන්තු සඳහා සෘජු දුරකථන අංක, අභ්‍යන්තර අංක, ස්ථාන විස්තර සහ නිලධාරී විද්‍යුත් තැපෑල වෙත පිවිසෙන්න."
        settings_obj.directory_subtitle_ta = "ஒவ்வொரு பிரிவு மற்றும் இணைக்கப்பட்ட திணைக்களத்திற்கான நேரடி தொலைபேசி எண்கள், நீட்டிப்புகள், இருப்பிட விவரங்கள் மற்றும் அதிகாரி மின்னஞ்சல்களை அணுகவும்."

        settings_obj.hq_badge_en = "Ministry Headquarters"
        settings_obj.hq_badge_si = "අමාත්‍යාංශ ප්‍රධාන කාර්යාලය"
        settings_obj.hq_badge_ta = "அமைச்சின் தலைமை அலுவலகம்"

        settings_obj.hq_title_en = "Visit Our Main Office"
        settings_obj.hq_title_si = "ප්‍රධාන කාර්යාලය"
        settings_obj.hq_title_ta = "தலைமை அலுவலகம்"

        settings_obj.hq_description_en = "Official Headquarters of the Ministry of Fisheries, Aquatic and Ocean Resources."
        settings_obj.hq_description_si = "ධීවර, ජලජ හා සාගර සම්පත් අමාත්‍යාංශයේ නිල ප්‍රධාන කාර්යාලය."
        settings_obj.hq_description_ta = "கடற்றொழில், நீர்வாழ் மற்றும் பெருங்கடல் வளங்கள் அமைச்சின் அதிகாரப்பூர்வ தலைமை அலுவலகம்."

        settings_obj.hq_address_en = "New Secretariat, Maligawatta, Colombo 10, Sri Lanka"
        settings_obj.hq_address_si = "නවලේකම් කාර්යාලය, මාලිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව"
        settings_obj.hq_address_ta = "புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை"

        settings_obj.office_hours_en = "Monday – Friday: 8:30 AM – 4:15 PM (Closed on weekends & Poya Days)"
        settings_obj.office_hours_si = "සඳුදා – සිකුරාදා: පෙ.ව. 8:30 – ප.ව. 4:15 (සති අන්ත සහ පෝය දිනවල වසා ඇත)"
        settings_obj.office_hours_ta = "திங்கள் – வெள்ளி: காலை 8:30 – மாலை 4:15 (வார இறுதி நாட்கள் & பௌர்ணமி தினங்களில் மூடப்படும்)"

        settings_obj.form_badge_en = "Public Inquiry Form"
        settings_obj.form_badge_si = "මහජන විමසීම් පෝරමය"
        settings_obj.form_badge_ta = "பொது விசாரணை படிவம்"

        settings_obj.form_title_en = "Send Us a Message"
        settings_obj.form_title_si = "අප වෙත පණිවුඩයක් යොමු කරන්න"
        settings_obj.form_title_ta = "எங்களுக்கு ஒரு செய்தியை அனுப்புங்கள்"

        settings_obj.form_subtitle_en = "Submit your question, feedback or public inquiry directly to the Ministry staff. All inquiries are delivered directly to minfishit@gmail.com and logged in our system."
        settings_obj.form_subtitle_si = "ඔබගේ ප්‍රශ්නය, ප්‍රතිපෝෂණය හෝ මහජන විමසීම සෘජුවම අමාත්‍යාංශ කාර්ය මණ්ඩලය වෙත යොමු කරන්න."
        settings_obj.form_subtitle_ta = "உங்கள் கேள்வி, கருத்து அல்லது பொது விசாரணையை நேரடியாக அமைச்சு ஊழியர்களிடம் சமர்ப்பிக்கவும்."

        settings_obj.form_guidance_title_en = "Before you submit"
        settings_obj.form_guidance_title_si = "යොමු කිරීමට පෙර"
        settings_obj.form_guidance_title_ta = "சமர்ப்பிப்பதற்கு முன்"

        settings_obj.form_guidance_items_en = [
            "Use your official full name as registered on national identification",
            "Provide a valid email address for official response delivery",
            "Choose the correct subject division for faster processing",
            "Explain your inquiry clearly with any relevant registration numbers",
        ]
        settings_obj.form_guidance_items_si = [
            "ජාතික හැඳුනුම්පතේ ලියාපදිංචි කර ඇති පරිදි ඔබගේ නිල සම්පූර්ණ නම භාවිතා කරන්න",
            "නිල පිළිතුරු ලබා ගැනීම සඳහා වලංගු විද්‍යුත් තැපැල් ලිපිනයක් සපයන්න",
            "වේගවත් ක්‍රියාකාරිත්වය සඳහා නිවැරදි විෂය අංශය තෝරන්න",
            "ඕනෑම අදාළ ලියාපදිංචි අංක සමඟ ඔබගේ විමසීම පැහැදිලිව විස්තර කරන්න",
        ]
        settings_obj.form_guidance_items_ta = [
            "தேசிய அடையாள அட்டையில் உள்ளபடி உங்கள் அதிகாரப்பூர்வ முழுப் பெயரைப் பயன்படுத்தவும்",
            "அதிகாரப்பூர்வ பதிலைப் பெற செல்லுபடியாகும் மின்னஞ்சல் முகவரியை வழங்கவும்",
            "வேகமான செயலாக்கத்திற்கு சரியான பாடப் பிரிவைத் தேர்ந்தெடுக்கவும்",
            "தொடர்புடைய பதிவு எண்களுடன் உங்கள் விசாரணையை தெளிவாக விவரிக்கவும்",
        ]

        settings_obj.faq_badge_en = "Public FAQ"
        settings_obj.faq_badge_si = "පොදු නිතර අසන ප්‍රශ්න"
        settings_obj.faq_badge_ta = "பொது FAQ"

        settings_obj.faq_title_en = "Frequently Asked Questions"
        settings_obj.faq_title_si = "නිතර අසන ප්‍රශ්න"
        settings_obj.faq_title_ta = "அடிக்கடி கேட்கப்படும் கேள்விகள்"

        settings_obj.faq_subtitle_en = "Quick answers to common questions regarding department contacts, office hours, and public service inquiries."
        settings_obj.faq_subtitle_si = "දෙපාර්තමේන්තු සම්බන්ධතා, කාර්යාල වේලාවන් සහ මහජන සේවා විමසීම් පිළිබඳ පොදු ප්‍රශ්නවලට ඉක්මන් පිළිතුරු."
        settings_obj.faq_subtitle_ta = "திணைக்கள தொடர்புகள், அலுவலக நேரங்கள் மற்றும் பொது சேவை விசாரணைகள் பற்றிய பொதுவான கேள்விகளுக்கான விரைவான பதில்கள்."

        settings_obj.receiver_email = "minfishit@gmail.com"
        settings_obj.save()

        for dept_data in DEFAULT_DEPARTMENTS:
            dept_data.pop("id_code", None)
            officers_data = dept_data.pop("officers")
            dept_obj, _ = ContactDepartment.objects.update_or_create(
                name_en=dept_data["name_en"],
                defaults=dept_data
            )

            for officer_info in officers_data:
                ContactOfficer.objects.update_or_create(
                    department=dept_obj,
                    name_en=officer_info["name_en"],
                    designation_en=officer_info["designation_en"],
                    defaults=officer_info
                )

        for faq_info in DEFAULT_FAQS:
            ContactFaq.objects.update_or_create(
                question_en=faq_info["question_en"],
                defaults=faq_info
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded Contact Page data!"))
