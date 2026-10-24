import os
import sys
import django

sys.path.insert(0, ".")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from privacy_page.models import PrivacyPageSettings, PrivacySection

def seed_privacy():
    print("Seeding Privacy Page Settings...")
    settings_obj, created = PrivacyPageSettings.objects.get_or_create(pk=1)
    if created:
        print("Created default PrivacyPageSettings.")
    else:
        print("Existing PrivacyPageSettings found.")

    sections_data = [
        {
            "section_key": "overview",
            "order": 1,
            "nav_label_en": "1. Overview",
            "title_en": "1. Overview",
            "content_en": "This Privacy Policy outlines how personal information is gathered, managed, and protected when you visit this website, communicate with the Ministry, or utilize online services.\n\nThe Ministry adheres to strict data minimisation principles, collecting only information reasonably required to deliver public services and satisfy statutory obligations.",
            "items_json_en": [],
            "nav_label_si": "1. දළ විශ්ලේෂණය",
            "title_si": "1. දළ විශ්ලේෂණය (Overview)",
            "content_si": "මෙම පුද්ගලිකත්ව ප්‍රතිපත්තිය ඔබ මෙම වෙබ් අඩවියට පිවිසීමේදී, අමාත්‍යාංශය සමඟ සන්නිවේදනය කිරීමේදී හෝ මාර්ගගත සේවාවන් භාවිත කිරීමේදී පුද්ගලික තොරතුරු රැස් කිරීම, කළමනාකරණය කිරීම සහ ආරක්ෂා කිරීම පිළිබඳව පැහැදිලි කරයි.\n\nඅමාත්‍යාංශය දැඩි දත්ත අවම කිරීමේ ප්‍රතිපත්ති අනුගමනය කරන අතර, මහජන සේවා සැපයීමට සහ ව්‍යවස්ථාපිත වගකීම් ඉටු කිරීමට සාධාරණව අවශ්‍ය තොරතුරු පමණක් රැස් කරයි.",
            "items_json_si": [],
            "nav_label_ta": "1. மேலோட்டம்",
            "title_ta": "1. மேலோட்டம் (Overview)",
            "content_ta": "நீங்கள் இந்த இணையதளத்தைப் பார்வையிடும்போது, அமைச்சுடன் தொடர்பு கொள்ளும்போது அல்லது இணைய சேவைகளைப் பயன்படுத்தும்போது தனிப்பட்ட தகவல்கள் எவ்வாறு சேகரிக்கப்படுகின்றன, நிர்வகிக்கப்படுகின்றன மற்றும் பாதுகாக்கப்படுகின்றன என்பதை இந்த தனியுரிமைக் கொள்கை கோடிட்டுக் காட்டுகிறது.\n\nஅமைச்சகம் கடுமையான தரவுக் குறைப்புக் கொள்கைகளைக் கடைப்பிடிக்கிறது, பொதுச் சேவைகளை வழங்குவதற்கும் சட்டப்பூர்வ கடமைகளை நிறைவேற்றுவதற்கும் தேவையான தகவல்களை மட்டுமே சேகரிக்கிறது.",
            "items_json_ta": [],
        },
        {
            "section_key": "information",
            "order": 2,
            "nav_label_en": "2. Information We Collect",
            "title_en": "2. Information We Collect",
            "content_en": "The type of data collected depends on your specific interaction with our digital services:",
            "items_json_en": [
                {"title": "Personal Information", "description": "Names, NIC numbers, or contact details provided through Ministry service applications."},
                {"title": "Contact Details", "description": "Email addresses, telephone numbers, postal addresses and preferred communication channels."},
                {"title": "Technical Usage Data", "description": "Browser type, device IP, page views, and analytical session data to optimize website performance."},
                {"title": "Application Submissions", "description": "Registration forms, permit applications, public inquiries, and online service submissions."}
            ],
            "nav_label_si": "2. අප රැස් කරන තොරතුරු",
            "title_si": "2. අප රැස් කරන තොරතුරු (Information We Collect)",
            "content_si": "රැස් කරනු ලබන දත්ත වර්ගය අපගේ ඩිජිටල් සේවාවන් සමඟ ඔබ සිදු කරන සබඳතාවය මත පදනම් වේ:",
            "items_json_si": [
                {"title": "පුද්ගලික තොරතුරු", "description": "අමාත්‍යාංශයේ සේවා අයදුම්පත් හරහා සපයනු ලබන නම්, ජාතික හැඳුනුම්පත් අංක හෝ සම්බන්ධතා විස්තර."},
                {"title": "සම්බන්ධතා විස්තර", "description": "විද්‍යුත් තැපැල් ලිපින, දුරකථන අංක, තැපැල් ලිපින සහ කැමති සන්නිවේදන මාර්ග."},
                {"title": "තාක්ෂණික භාවිත දත්ත", "description": "වෙබ් අඩවියේ ක්‍රියාකාරිත්වය ප්‍රශස්ත කිරීම සඳහා බ්‍රව්සර් වර්ගය, උපාංගයේ IP ලිපිනය සහ සැසි දත්ත."},
                {"title": "අයදුම්පත් සහ ඉදිරිපත් කිරීම්", "description": "ලියාපදිංචි ආකෘති පත්‍ර, බලපත්‍ර අයදුම්පත්, මහජන විමසීම් සහ මාර්ගගත සේවා ඉදිරිපත් කිරීම්."}
            ],
            "nav_label_ta": "2. நாம் சேகரிக்கும் தகவல்கள்",
            "title_ta": "2. நாம் சேகரிக்கும் தகவல்கள் (Information We Collect)",
            "content_ta": "சேகரிக்கப்படும் தரவு வகை எங்கள் டிஜிட்டல் சேவைகளுடனான உங்கள் தொடர்பைப் பொறுத்தது:",
            "items_json_ta": [
                {"title": "தனிப்பட்ட தகவல்", "description": "அமைச்சு சேவை விண்ணப்பங்கள் மூலம் வழங்கப்படும் பெயர்கள், தேசிய அடையாள அட்டை எண்கள் அல்லது தொடர்பு விவரங்கள்."},
                {"title": "தொடர்பு விவரங்கள்", "description": "மின்னஞ்சல் முகவரிகள், தொலைபேசி எண்கள், அஞ்சல் முகவரிகள் மற்றும் விருப்பமான தொடர்பு வழிகள்."},
                {"title": "தொழில்நுட்ப பயன்பாட்டுத் தரவு", "description": "இணையதள செயல்திறனை மேம்படுத்துவதற்கான உலாவி வகை, சாதன ஐபி முகவரி மற்றும் அமர்வுத் தரவு."},
                {"title": "விண்ணப்ப சமர்ப்பிப்புகள்", "description": "பதிவுப் படிவங்கள், அனுமதி விண்ணப்பங்கள், பொது விசாரணைகள் மற்றும் இணைய சேவை சமர்ப்பிப்புகள்."}
            ],
        },
        {
            "section_key": "usage",
            "order": 3,
            "nav_label_en": "3. How Information is Used",
            "title_en": "3. How Information is Used",
            "content_en": "Information gathered by the Ministry is utilized exclusively for legitimate administrative, public-service, and regulatory purposes:",
            "items_json_en": [
                "Provide official government information and public services",
                "Process licensing applications, vessel registrations and permits",
                "Respond to public inquiries, grievances and feedback",
                "Improve website usability, performance and accessibility",
                "Maintain system security and prevent unauthorized activity",
                "Fulfill statutory, administrative and legal obligations"
            ],
            "nav_label_si": "3. තොරතුරු භාවිතා කරන ආකාරය",
            "title_si": "3. තොරතුරු භාවිතා කරන ආකාරය (How Information is Used)",
            "content_si": "අමාත්‍යාංශය විසින් රැස් කරනු ලබන තොරතුරු නීත්‍යානුකූල පරිපාලන, මහජන සේවා සහ නියාමන අරමුණු සඳහා පමණක් භාවිතා කරනු ලැබේ:",
            "items_json_si": [
                "නිල රාජ්‍ය තොරතුරු සහ මහජන සේවා සැපයීම",
                "ධීවර බලපත්‍ර අයදුම්පත්, යාත්‍රා ලියාපදිංචි කිරීම් සහ අවසරපත් සැකසීම",
                "මහජන විමසීම්, පැමිණිලි සහ ප්‍රතිචාර සඳහා පිළිතුරු සැපයීම",
                "වෙබ් අඩවියේ භාවිත පහසුව, කාර්යක්ෂමතාව සහ ප්‍රවේශතාව වැඩිදියුණු කිරීම",
                "පද්ධති ආරක්ෂාව පවත්වා ගැනීම සහ අනවසර ක්‍රියාකාරකම් වැළැක්වීම",
                "ව්‍යවස්ථාපිත, පරිපාලනමය සහ නීතිමය බැඳීම් ඉටු කිරීම"
            ],
            "nav_label_ta": "3. தகவல்கள் எவ்வாறு பயன்படுத்தப்படுகின்றன",
            "title_ta": "3. தகவல்கள் எவ்வாறு பயன்படுத்தப்படுகின்றன (How Information is Used)",
            "content_ta": "அமைச்சினால் சேகரிக்கப்படும் தகவல்கள் முறையான நிர்வாக, பொதுச் சேவை மற்றும் ஒழுங்குமுறை நோக்கங்களுக்காக மட்டுமே பயன்படுத்தப்படுகின்றன:",
            "items_json_ta": [
                "உத்தியோகபூர்வ அரச தகவல்கள் மற்றும் பொதுச் சேவைகளை வழங்குதல்",
                "உரிம விண்ணப்பங்கள், படகுப் பதிவுகள் மற்றும் அனுமதிகளைச் செயலாக்குதல்",
                "பொது விசாரணைகள், முறைப்பாடுகள் மற்றும் கருத்துக்களுக்குப் பதிலளித்தல்",
                "இணையதளப் பயன்பாட்டினை மேம்படுத்துதல்",
                "அமைப்பின் பாதுகாப்பைப் பேணுதல் மற்றும் அங்கீகரிக்கப்படாத செயற்பாடுகளைத் தடுத்தல்",
                "சட்டப்பூர்வ மற்றும் நிர்வாகக் கடமைகளை நிறைவேற்றுதல்"
            ],
        },
        {
            "section_key": "sharing",
            "order": 4,
            "nav_label_en": "4. Information Sharing",
            "title_en": "4. Information Sharing & Disclosure",
            "content_en": "The Ministry does not sell, rent, or trade personal information to third parties or commercial entities. Personal information is only disclosed to authorized government entities, affiliated statutory authorities (such as DFAR, NAQDA, NARA, CFHC), or law enforcement agencies when mandated by legislation, official ministerial duties, or valid court orders.",
            "items_json_en": [],
            "nav_label_si": "4. තොරතුරු හුවමාරුව",
            "title_si": "4. තොරතුරු හුවමාරුව සහ අනාවරණය (Information Sharing & Disclosure)",
            "content_si": "අමාත්‍යාංශය කිසිදු තෙවන පාර්ශවයකට හෝ වාණිජ ආයතනයකට පුද්ගලික තොරතුරු විකිණීම, කුලියට දීම හෝ වෙළඳාම් කිරීම සිදු නොකරයි. පුද්ගලික තොරතුරු අනාවරණය කරනු ලබන්නේ බලයලත් රජයේ ආයතන, අනුබද්ධ ව්‍යවස්ථාපිත අධිකාරීන් (DFAR, NAQDA, NARA, CFHC වැනි) හෝ නීතියෙන් හෝ අධිකරණ නියෝගයකින් නියම කර ඇති අවස්ථාවලදී පමණි.",
            "items_json_si": [],
            "nav_label_ta": "4. தகவல் பகிர்வு",
            "title_ta": "4. தகவல் பகிர்வு மற்றும் வெளிப்படுத்தல் (Information Sharing)",
            "content_ta": "அமைச்சகம் தனிப்பட்ட தகவல்களை மூன்றாம் தரப்பினருக்கோ வணிக நிறுவனங்களுக்கோ விற்கவோ, வாடகைக்கு விடவோ மாட்டாது. அங்கீகரிக்கப்பட்ட அரச நிறுவனங்கள், இணைந்த அதிகார சபைகள் (DFAR, NAQDA, NARA போன்றவை) அல்லது சட்டத்தால் கட்டாயப்படுத்தப்படும் போது மட்டுமே தகவல்கள் பகிரப்படும்.",
            "items_json_ta": [],
        },
        {
            "section_key": "security",
            "order": 5,
            "nav_label_en": "5. Information Security",
            "title_en": "5. Information Security & Safeguards",
            "content_en": "Appropriate technical and organizational safeguards including SSL encryption, secure data hosting, role based access control, and vulnerability monitoring are deployed to safeguard information against unauthorized access, loss, or disclosure.",
            "items_json_en": [],
            "nav_label_si": "5. තොරතුරු ආරක්ෂාව",
            "title_si": "5. තොරතුරු ආරක්ෂාව (Information Security & Safeguards)",
            "content_si": "අනවසර ප්‍රවේශය, අහිමිවීම හෝ අනාවරණය වීමෙන් තොරතුරු ආරක්ෂා කිරීම සඳහා SSL සංකේතනය, ආරක්ෂිත රාජ්‍ය දත්ත සත්කාරකත්වය, භූමිකාව පදනම් කරගත් ප්‍රවේශ පාලනය සහ අඛණ්ඩ අවදානම් නිරීක්ෂණය ඇතුළු සුදුසු තාක්ෂණික සහ ආයතනික ආරක්ෂණ ක්‍රම යොදවා ඇත.",
            "items_json_si": [],
            "nav_label_ta": "5. தகவல் பாதுகாப்பு",
            "title_ta": "5. தகவல் பாதுகாப்பு (Information Security & Safeguards)",
            "content_ta": "அங்கீகரிக்கப்படாத அணுகல், இழப்பு அல்லது வெளிப்படுத்தலில் இருந்து தகவல்களைப் பாதுகாக்க SSL குறியாக்கம், பாதுகாப்பான அரச கிளவுட் ஹோஸ்டிங், பங்கு அடிப்படையிலான அணுகல் கட்டுப்பாடு போன்ற பொருத்தமான தொழில்நுட்பப் பாதுகாப்பு முறைகள் பயன்படுத்தப்படுகின்றன.",
            "items_json_ta": [],
        },
        {
            "section_key": "cookies",
            "order": 6,
            "nav_label_en": "6. Cookies Policy",
            "title_en": "6. Cookies & Similar Technologies",
            "content_en": "This portal uses essential and functional cookies to preserve user preferences (such as text size, high contrast mode, and language selection). No tracking cookies are stored for commercial advertising purposes.",
            "items_json_en": [],
            "nav_label_si": "6. කුකීස් ප්‍රතිපත්තිය",
            "title_si": "6. කුකීස් සහ ඒ හා සමාන තාක්ෂණයන් (Cookies Policy)",
            "content_si": "පරිශීලක මනාපයන් (අකුරු ප්‍රමාණය, ඉහළ ප්‍රතිවිරුද්ධතා ප්‍රකාරය සහ භාෂා තේරීම වැනි) සුරැකීමට මෙම ද්වාරය අත්‍යවශ්‍ය සහ ක්‍රියාකාරී කුකීස් භාවිතා කරයි. වාණිජ ප්‍රචාරණ අරමුණු සඳහා කිසිදු කුකීස් ගබඩා නොකෙරේ.",
            "items_json_si": [],
            "nav_label_ta": "6. குக்கீஸ் கொள்கை",
            "title_ta": "6. குக்கீஸ் மற்றும் ஒத்த தொழில்நுட்பங்கள் (Cookies Policy)",
            "content_ta": "பயனர் விருப்பங்களைப் பாதுகாக்க (எழுத்து அளவு, மொழித் தேர்வு போன்றவை) இந்த தளம் அத்தியாவசிய குக்கீகளைப் பயன்படுத்துகிறது. வணிக விளம்பர நோக்கங்களுக்காக எந்த குக்கீகளும் சேமிக்கப்படுவதில்லை.",
            "items_json_ta": [],
        },
        {
            "section_key": "retention",
            "order": 7,
            "nav_label_en": "7. Data Retention",
            "title_en": "7. Data Retention & Archival",
            "content_en": "Personal data is retained only for the duration necessary to fulfill the statutory, regulatory, and administrative purposes for which it was originally collected, and in compliance with National Archives regulations and Sri Lanka Government records retention policies.",
            "items_json_en": [],
            "nav_label_si": "7. දත්ත රඳවා ගැනීම",
            "title_si": "7. දත්ත රඳවා ගැනීම (Data Retention)",
            "content_si": "පුද්ගලික දත්ත රඳවා තබා ගනු ලබන්නේ මුලින් රැස් කරන ලද ව්‍යවස්ථාපිත, නියාමන සහ පරිපාලන අරමුණු ඉටු කිරීම සඳහා අවශ්‍ය කාල සීමාව සඳහා පමණක් වන අතර, ජාතික ලේඛනාරක්ෂක රෙගුලාසි සහ ශ්‍රී ලංකා රජයේ වාර්තා රඳවා ගැනීමේ ප්‍රතිපත්තිවලට අනුකූලව එය සිදු කෙරේ.",
            "items_json_si": [],
            "nav_label_ta": "7. தரவு தக்கவைப்பு",
            "title_ta": "7. தரவு தக்கவைப்பு (Data Retention)",
            "content_ta": "தனிப்பட்ட தரவு முதலில் சேகரிக்கப்பட்ட சட்டப்பூர்வ மற்றும் நிர்வாக நோக்கங்களை நிறைவேற்றத் தேவையான காலத்திற்கு மட்டுமே தக்கவைக்கப்படும்.",
            "items_json_ta": [],
        },
        {
            "section_key": "rights",
            "order": 8,
            "nav_label_en": "8. Your Privacy Rights",
            "title_en": "8. Your Privacy Rights",
            "content_en": "Under Sri Lankan privacy guidelines and the Right to Information (RTI) framework, you have fundamental rights regarding your personal records held by the Ministry:",
            "items_json_en": [
                {"title": "Access Records", "description": "Request details regarding personal data held by the Ministry under RTI and privacy frameworks."},
                {"title": "Request Corrections", "description": "Submit correction requests for inaccurate, outdated, or incomplete personal details."},
                {"title": "Inquire on Usage", "description": "Contact our data protection desk regarding how personal information is handled."},
                {"title": "Submit Grievances", "description": "Report privacy concerns or provide feedback regarding digital service data practices."}
            ],
            "nav_label_si": "8. ඔබගේ පුද්ගලිකත්ව අයිතිවාසිකම්",
            "title_si": "8. ඔබගේ පුද්ගලිකත්ව අයිතිවාසිකම් (Your Privacy Rights)",
            "content_si": "ශ්‍රී ලංකා පුද්ගලිකත්ව මාර්ගෝපදේශ සහ තොරතුරු දැනගැනීමේ අයිතිය (RTI) රාමුව යටතේ, අමාත්‍යාංශය සතුව ඇති ඔබගේ පුද්ගලික වාර්තා සම්බන්ධයෙන් ඔබට මූලික අයිතිවාසිකම් ඇත:",
            "items_json_si": [
                {"title": "වාර්තා සඳහා ප්‍රවේශ වීම", "description": "RTI සහ පුද්ගලිකත්ව රාමුව යටතේ අමාත්‍යාංශය සතු පුද්ගලික දත්ත පිළිබඳ විස්තර ඉල්ලා සිටීම."},
                {"title": "නිවැරදි කිරීම් ඉල්ලා සිටීම", "description": "වැරදි, යල් පැන ගිය හෝ අසම්පූර්ණ පුද්ගලික තොරතුරු නිවැරදි කිරීමට ඉල්ලීම් ඉදිරිපත් කිරීම."},
                {"title": "භාවිතය පිළිබඳ විමසීම", "description": "පුද්ගලික තොරතුරු හසුරුවන ආකාරය පිළිබඳව අපගේ දත්ත ආරක්ෂණ අංශය සම්බන්ධ කර ගැනීම."},
                {"title": "පැමිණිලි ඉදිරිපත් කිරීම", "description": "ඩිජිටල් සේවා දත්ත භාවිතයන් සම්බන්ධයෙන් පුද්ගලිකත්ව ගැටළු හෝ ප්‍රතිපෝෂණ වාර්තා කිරීම."}
            ],
            "nav_label_ta": "8. உங்கள் தனியுரிமை உரிமைகள்",
            "title_ta": "8. உங்கள் தனியுரிமை உரிமைகள் (Your Privacy Rights)",
            "content_ta": "இலங்கை தனியுரிமை வழிகாட்டுதல்கள் மற்றும் தகவல் அறியும் உரிமை (RTI) கட்டமைப்பின் கீழ் உங்கள் அடிப்படை உரிமைகள்:",
            "items_json_ta": [
                {"title": "பதிவுகளை அணுகுதல்", "description": "RTI சட்டத்தின் கீழ் அமைச்சகம் வைத்துள்ள தனிப்பட்ட தரவு தொடர்பான விவரங்களைக் கோரலாம்."},
                {"title": "திருத்தங்களைக் கோருதல்", "description": "தவறான அல்லது முழுமையற்ற தனிப்பட்ட விவரங்களுக்கான திருத்தக் கோரிக்கைகளைச் சமர்ப்பிக்கலாம்."},
                {"title": "பயன்பாடு பற்றி விசாரித்தல்", "description": "தனிப்பட்ட தகவல்கள் எவ்வாறு கையாளப்படுகின்றன என்பது பற்றி எங்கள் தரவுப் பாதுகாப்புப் பிரிவைத் தொடர்புகொள்ளலாம்."},
                {"title": "முறைப்பாடுகளைச் சமர்ப்பித்தல்", "description": "டிஜிட்டல் சேவை தரவு நடைமுறைகள் தொடர்பான தனியுரிமைக் கவலைகளைப் புகாரளிக்கலாம்."}
            ],
        },
        {
            "section_key": "changes",
            "order": 9,
            "nav_label_en": "9. Policy Revisions",
            "title_en": "9. Policy Revisions & Updates",
            "content_en": "The Ministry reserves the right to revise or amend this Privacy Policy periodically to reflect technological changes, statutory amendments, or enhanced security measures. Any revisions will become effective immediately upon being published on this page with an updated revision date.",
            "items_json_en": [],
            "nav_label_si": "9. ප්‍රතිපත්ති සංශෝධන",
            "title_si": "9. ප්‍රතිපත්ති සංශෝධන සහ යාවත්කාලීන (Policy Revisions)",
            "content_si": "තාක්ෂණික වෙනස්කම්, ව්‍යවස්ථාපිත සංශෝධන හෝ වැඩිදියුණු කළ ආරක්ෂක පියවරයන් පිළිබිඹු කිරීම සඳහා මෙම පුද්ගලිකත්ව ප්‍රතිපත්තිය කලින් කලට සංශෝධනය කිරීමට අමාත්‍යාංශයට අයිතිය ඇත. ඕනෑම සංශෝධනයක් යාවත්කාලීන කළ දිනයක් සමඟ මෙම පිටුවේ ප්‍රකාශයට පත් කළ වහාම ක්‍රියාත්මක වේ.",
            "items_json_si": [],
            "nav_label_ta": "9. கொள்கை திருத்தங்கள்",
            "title_ta": "9. கொள்கை திருத்தங்கள் (Policy Revisions)",
            "content_ta": "தொழில்நுட்ப மாற்றங்கள் அல்லது சட்டத் திருத்தங்களைப் பிரதிபலிக்கும் வகையில் இந்தக் கொள்கையைத் திருத்த அமைச்சகத்திற்கு உரிமை உண்டு.",
            "items_json_ta": [],
        },
        {
            "section_key": "contact",
            "order": 10,
            "nav_label_en": "10. Contact Us",
            "title_en": "10. Contact the Ministry Privacy Desk",
            "content_en": "If you have questions, feedback, or concerns regarding this Privacy Policy, or wish to exercise your rights regarding personal data, please contact our Data Protection and Privacy Desk.",
            "items_json_en": [],
            "nav_label_si": "10. අප අමතන්න",
            "title_si": "10. අමාත්‍යාංශ පුද්ගලිකත්ව අංශය අමතන්න (Contact Us)",
            "content_si": "මෙම පුද්ගලිකත්ව ප්‍රතිපත්තිය පිළිබඳව ඔබට කිසියම් ප්‍රශ්නයක්, ප්‍රතිපෝෂණයක් හෝ ගැටළුවක් ඇත්නම්, කරුණාකර අපගේ දත්ත ආරක්ෂණ සහ පුද්ගලිකත්ව අංශය අමතන්න.",
            "items_json_si": [],
            "nav_label_ta": "10. தொடர்பு கொள்ளவும்",
            "title_ta": "10. அமைச்சின் தனியுரிமைப் பிரிவைத் தொடர்பு கொள்ளவும் (Contact Us)",
            "content_ta": "இந்தத் தனியுரிமைக் கொள்கை தொடர்பாக ஏதேனும் கேள்விகள் இருந்தால், தயவுசெய்து எங்கள் தரவுப் பாதுகாப்புப் பிரிவைத் தொடர்பு கொள்ளவும்.",
            "items_json_ta": [],
        },
    ]

    for item in sections_data:
        obj, was_created = PrivacySection.objects.update_or_create(
            section_key=item["section_key"],
            defaults=item,
        )
        print(f"{'Created' if was_created else 'Updated'} section: {obj.section_key}")

    print("Privacy Page successfully seeded!")

if __name__ == "__main__":
    seed_privacy()
