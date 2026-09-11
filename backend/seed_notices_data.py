import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from notices.models import NoticePageHeader, NoticeItem

def seed():
    print("[*] Seeding Official Notices Page Data...")

    header, _ = NoticePageHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Official Announcements"
    header.title_en = "Official Notices &"
    header.highlighted_title_en = "Ministry Circulars"
    header.description_en = "Access official public notices, administrative circulars, gazette announcements, licensing instructions, and public consultations issued by the Ministry of Fisheries."
    header.featured_badge_en = "Urgent / Important Notice"
    header.catalogue_badge_en = "Notice Board Directory"
    header.library_title_en = "All Official Notices & Public Gazettes"

    header.badge_text_si = "නිල නිවේදන සහ චක්‍රලේඛ"
    header.title_si = "නිල නිවේදන සහ"
    header.highlighted_title_si = "අමාත්‍යාංශ චක්‍රලේඛ"
    header.description_si = "ධීවර අමාත්‍යාංශය මඟින් නිකුත් කරන ලද නිල මහජන නිවේදන, චක්‍රලේඛ, ගැසට් පත්‍රිකා, බලපත්‍ර උපදෙස් සහ මහජන අදහස් විමසීම් මෙතැනින් ලබාගන්න."
    header.featured_badge_si = "විශේෂ / හදිසි නිවේදනය"
    header.catalogue_badge_si = "නිවේදන නාමාවලිය"
    header.library_title_si = "සියලු නිල නිවේදන සහ චක්‍රලේඛ එකතුව"

    header.badge_text_ta = "உத்தியோகபூர்வ அறிவித்தல்கள்"
    header.title_ta = "உத்தியோகபூர்வ அறிவித்தல்கள் &"
    header.highlighted_title_ta = "அமைச்சு சுற்றறிக்கைகள்"
    header.description_ta = "கடற்றொழில் அமைச்சு வெளியிடும் உத்தியோகபூர்வ பொது அறிவித்தல்கள், நிர்வாக சுற்றறிக்கைகள், வர்த்தமானி அறிவித்தல்கள் மற்றும் பொதுமக்கள் கருத்துக்கேட்புகள்."
    header.featured_badge_ta = "முக்கிய / அவசர அறிவித்தல்"
    header.catalogue_badge_ta = "அறிவித்தல் பலகை விபரம்"
    header.library_title_ta = "அனைத்து உத்தியோகபூர்வ அறிவித்தல்கள் & சுற்றறிக்கைகள்"
    header.save()

    notices_data = [
        {
            "order": 1,
            "notice_number": "MF/CIR/2026/01",
            "slug": "fuel-subsidy-qr-registration-2026",
            "category": "circular",
            "priority": "urgent",
            "is_urgent": True,
            "is_featured": True,
            "title_en": "Mandatory Digital QR Code Registration for Coastal Kerosene & Diesel Fuel Subsidies",
            "title_si": "වෙරළබඩ භූමිතෙල් සහ ඩීසල් ඉන්ධන සහනාධාර සඳහා අනිවාර්ය ඩිජිටල් QR ලියාපදිංචිය",
            "title_ta": "கடலோர மண்ணெண்ணெய் மற்றும் டீசல் எரிபொருள் மானியங்களுக்கான கட்டாய டிஜிட்டல் QR பதிவு",
            "department_en": "Department of Fisheries and Aquatic Resources (DFAR)",
            "department_si": "ධීවර හා ජලජ සම්පත් දෙපාර්තමේන්තුව (DFAR)",
            "department_ta": "கடற்றொழில் மற்றும் நீரியல் வளங்கள் திணைக்களம் (DFAR)",
            "summary_en": "All registered small-craft and multiday boat operators must link their fisheries logbook with the Ministry QR fuel allocation platform before 31 March 2026 to continue receiving monthly subsidized fuel quotas.",
            "summary_si": "මාසික සහනාධාර ඉන්ධන කෝටාව අඛණ්ඩව ලබාගැනීම සඳහා සියලුම ලියාපදිංචි කුඩා යාත්‍රා සහ බහුදින යාත්‍රා හිමියන් 2026 මාර්තු 31 වන දිනට පෙර අමාත්‍යාංශයේ QR වේදිකාව සමඟ ලියාපදිංචි විය යුතුය.",
            "summary_ta": "மாதாந்த மானிய எரிபொருள் ஒதுக்கீட்டை தொடர்ந்து பெறுவதற்கு அனைத்து பதிவு செய்யப்பட்ட சிறிய படகுகள் மற்றும் பலநாள் படகு உரிமையாளர்கள் 2026 மார்ச் 31 இற்கு முன்னர் அமைச்சின் QR தளத்தில் பதிவு செய்ய வேண்டும்.",
            "content_en": """<p>The Ministry of Fisheries hereby notifies all commercial and artisanal fishers regarding the new digital fuel allowance distribution mechanism implemented in collaboration with the Ceylon Petroleum Corporation (CPC).</p>
<h3>Key Operational Guidelines:</h3>
<ul>
<li><strong>Eligibility:</strong> Valid 2025/2026 fishing vessel craft license and national identity card of the vessel owner.</li>
<li><strong>Registration Centers:</strong> All District Fisheries Offices (DFO), Harbour Master Offices, and designated cooperative societies.</li>
<li><strong>Issuance Deadline:</strong> 31 March 2026. Non-registered vessels will forfeit subsidized quota access for Q2 2026.</li>
</ul>
<p>For technical inquiries and mobile verification support, contact the DFAR Hotline at <strong>1985</strong> or email <em>support@fisheries.gov.lk</em>.</p>""",
            "content_si": """<p>ලංකා ඛනිජ තෙල් නීතිගත සංස්ථාව (CPC) සමඟ එක්ව ක්‍රියාත්මක කරනු ලබන නව ඩිජිටල් ඉන්ධන සහනාධාර බෙදාහැරීමේ ක්‍රමවේදය පිළිබඳව ධීවර අමාත්‍යාංශය සියලුම ධීවර ප්‍රජාව දැනුවත් කරයි.</p>
<h3>ප්‍රධාන උපදෙස්:</h3>
<ul>
<li><strong>සුදුසුකම්:</strong> වලංගු 2025/2026 ධීවර යාත්‍රා බලපත්‍රය සහ යාත්‍රා හිමිකරුගේ ජාතික හැඳුනුම්පත.</li>
<li><strong>ලියාපදිංචි මධ්‍යස්ථාන:</strong> සියලුම දිස්ත්‍රික් ධීවර කාර්යාල, වරාය නිලධාරී කාර්යාල සහ ධීවර සමිති.</li>
<li><strong>අවසන් දිනය:</strong> 2026 මාර්තු 31. ලියාපදිංචි නොවූ යාත්‍රා සඳහා 2026 දෙවන කාර්තුවේ සහනාධාර කෝටා අහිමි වනු ඇත.</li>
</ul>""",
            "content_ta": """<p>இலங்கை பெற்றோலியக் கூட்டுத்தாபனத்துடன் (CPC) இணைந்து நடைமுறைப்படுத்தப்படும் புதிய டிஜிட்டல் எரிபொருள் மானிய விநியோக முறைமை குறித்து கடற்றொழில் அமைச்சு அறிவிக்கிறது.</p>
<h3>முக்கிய வழிகாட்டுதல்கள்:</h3>
<ul>
<li><strong>தகுதி:</strong> செல்லுபடியாகும் 2025/2026 படகு அனுமதிப்பத்திரம் மற்றும் உரிமையாளரின் தேசிய அடையாள அட்டை.</li>
<li><strong>பதிவு நிலையங்கள்:</strong> அனைத்து மாவட்ட கடற்றொழில் அலுவலகங்கள் மற்றும் துறைமுக அலுவலகங்கள்.</li>
<li><strong>இறுதித் திகதி:</strong> 2026 மார்ச் 31.</li>
</ul>""",
            "published_date": "2026-03-10",
            "expiry_date": "2026-03-31",
            "attachment_title_en": "Circular MF-CIR-2026-01-Fuel-Quota-Guidelines.pdf",
            "attachment_title_si": "චක්‍රලේඛය MF-CIR-2026-01-ඉන්ධන-සහනාධාර-උපදෙස්.pdf",
            "attachment_title_ta": "சுற்றறிக்கை MF-CIR-2026-01-எரிபொருள்-மானிய-வழிகாட்டல்.pdf",
            "file_type": "PDF",
            "file_size": "1.8 MB",
        },
        {
            "order": 2,
            "notice_number": "DFAR/LIC/2026/04",
            "slug": "annual-vessel-license-renewal-2026",
            "category": "licensing",
            "priority": "high",
            "is_urgent": False,
            "is_featured": False,
            "title_en": "Renewal of Annual Fishing Operations Licenses & Seaworthiness Certification 2026",
            "title_si": "2026 වාර්ෂික ධීවර මෙහෙයුම් බලපත්‍ර සහ මුහුදු යෝග්‍යතා සහතික අලුත් කිරීම",
            "title_ta": "2026 ஆம் ஆண்டுக்கான வருடாந்த கடற்றொழில் அனுமதிப்பத்திரங்கள் மற்றும் கடற்பயண தகுதிச் சான்றிதழ் புதுப்பித்தல்",
            "department_en": "Licensing & Monitoring Division - DFAR",
            "department_si": "බලපත්‍ර සහ නිරීක්ෂණ අංශය - DFAR",
            "department_ta": "அனுமதிப்பத்திரம் மற்றும் கண்காணிப்புப் பிரிவு - DFAR",
            "summary_en": "Notice to all commercial, multiday, and inboard-motor craft owners regarding mandatory annual safety inspections and operational license renewals commencing 1st April 2026.",
            "summary_si": "සියලුම වාණිජ, බහුදින සහ එන්ජින් සහිත යාත්‍රා සඳහා වන වාර්ෂික ආරක්ෂක පරීක්ෂණ සහ මෙහෙයුම් බලපත්‍ර අලුත් කිරීම 2026 අප්‍රේල් 1 වන දින ආරම්භ වන බව දන්වා සිටිමු.",
            "summary_ta": "அனைத்து வர்த்தக, பலநாள் படகுகளுக்கான வருடாந்த பாதுகாப்பு சோதனைகள் மற்றும் அனுமதிப்பத்திர புதுப்பித்தல் 2026 ஏப்ரல் 1 முதல் ஆரம்பமாகும்.",
            "content_en": "<p>In accordance with Fisheries and Aquatic Resources Act No. 2 of 1996, all fishing vessels operating in Sri Lankan waters and High Seas are required to undergo comprehensive seaworthiness inspections.</p><p>Owners must present valid Vessel Monitoring System (VMS) operational clearance, updated life-saving equipment logs, and fire safety apparatus certificates.</p>",
            "content_si": "<p>1996 අංක 2 දරන ධීවර හා ජලජ සම්පත් පනතට අනුකූලව, ශ්‍රී ලංකා මුහුදු සීමාවේ සහ ජාත්‍යන්තර මුහුදේ ක්‍රියාත්මක වන සියලුම ධීවර යාත්‍රා වාර්ෂික පරීක්ෂාවට ලක් කළ යුතුය.</p>",
            "content_ta": "<p>1996 ஆம் ஆண்டின் 2 ஆம் இலக்க கடற்றொழில் மற்றும் நீரியல் வளங்கள் சட்டத்திற்கு அமைய, அனைத்து கடற்றொழில் படகுகளும் விரிவான பாதுகாப்பு பரிசோதனைக்கு உட்படுத்தப்பட வேண்டும்.</p>",
            "published_date": "2026-03-01",
            "expiry_date": "2026-04-30",
            "attachment_title_en": "DFAR-Licensing-Inspection-Checklist-2026.pdf",
            "attachment_title_si": "DFAR-බලපත්‍ර-පරීක්ෂණ-ලැයිස්තුව-2026.pdf",
            "attachment_title_ta": "DFAR-அனுமதிப்பத்திர-பரிசோதனை-விபரம்-2026.pdf",
            "file_type": "PDF",
            "file_size": "1.2 MB",
        },
        {
            "order": 3,
            "notice_number": "NAQDA/PUB/2026/02",
            "slug": "freshwater-aquaculture-land-allotment-applications",
            "category": "public_consultation",
            "priority": "normal",
            "is_urgent": False,
            "is_featured": False,
            "title_en": "Call for Applications: Commercial Freshwater Aquaculture Leases in Mahaweli Zones",
            "title_si": "අයදුම්පත් කැඳවීම: මහවැලි කලාප තුළ වාණිජ මිරිදිය ජලජීවී වගා ඉඩම් බදුදීම",
            "title_ta": "விண்ணப்பக் கோரல்: மகாவலி வலயங்களில் வர்த்தக நன்னீர் நீரியல் வளர்ப்பு நில குத்தகை",
            "department_en": "National Aquaculture Development Authority (NAQDA)",
            "department_si": "ජාතික ජලජීවී වගා සංවර්ධන අධිකාරිය (NAQDA)",
            "department_ta": "தேசிய நீரியல் வளர்ப்பு அபிவிருத்தி அதிகாரசபை (NAQDA)",
            "summary_en": "Applications are invited from registered youth entrepreneurs, cooperative societies, and commercial enterprises for 10-year freshwater aquaculture pond leasing in Anuradhapura, Polonnaruwa, and Ampara.",
            "summary_si": "අනුරාධපුරය, පොළොන්නරුව සහ අම්පාර දිස්ත්‍රික්කවල වසර 10 ක මිරිදිය ජලජීවී වගා ඉඩම් බදුදීම සඳහා ලියාපදිංචි තරුණ ව්‍යවසායකයින් සහ ධීවර සමිතිවලින් අයදුම්පත් කැඳවනු ලැබේ.",
            "summary_ta": "அனுராதபுரம், பொலன்னறுவை மற்றும் அம்பாறை மாவட்டங்களில் 10 வருட நன்னீர் நீரியல் வளர்ப்பு நில குத்தகைக்கு விண்ணப்பங்கள் கோரப்படுகின்றன.",
            "content_en": "<p>NAQDA invites project proposals for commercial Tilapia, Carp, and Giant Freshwater Prawn farming under technical supervision of NAQDA extension officers. Subsidized fingerling stocks and water testing support will be provided to selected applicants.</p>",
            "content_si": "<p>NAQDA තාක්ෂණික අධීක්ෂණය යටතේ වාණිජ තිලාපියා, කාප් සහ කරමල් ඉස්සන් වගාව සඳහා ව්‍යාපෘති යෝජනා කැඳවනු ලැබේ. තෝරාගත් අයදුම්කරුවන්ට සහනාධාර මත්ස්‍ය පැටවුන් සහ ජල පරීක්ෂණ පහසුකම් ලබාදේ.</p>",
            "content_ta": "<p>வர்த்தக ரீதியான திலாப்பியா, கார்ப்ப் மற்றும் நன்னீர் இறால் வளர்ப்புக்கான திட்ட முன்மொழிவுகளை NAQDA வரவேற்கிறது.</p>",
            "published_date": "2026-02-25",
            "expiry_date": "2026-04-15",
            "attachment_title_en": "NAQDA-Aquaculture-Application-Guidelines-2026.pdf",
            "attachment_title_si": "NAQDA-ජලජීවී-අයදුම්පත්-මාර්ගෝපදේශ-2026.pdf",
            "attachment_title_ta": "NAQDA-நீரியல்-வளர்ப்பு-விண்ணப்ப-வழிகாட்டல்-2026.pdf",
            "file_type": "PDF",
            "file_size": "2.4 MB",
        },
        {
            "order": 4,
            "notice_number": "MF/NOT/2026/08",
            "slug": "lobster-spiny-crab-closed-season-regulations",
            "category": "circular",
            "priority": "high",
            "is_urgent": True,
            "is_featured": False,
            "title_en": "Public Notice: Annual Closed Fishing Season for Spiny Lobster & Egg-Bearing Crustaceans",
            "title_si": "මහජන නිවේදනය: පොකිරිස්සන් සහ බිත්තර සහිත කකුළුවන් ඇල්ලීම තහනම් වාර්ෂික කාලසීමාව",
            "title_ta": "பொது அறிவித்தல்: சிங்க இறால் மற்றும் முட்டையிடும் நண்டுகளை பிடிப்பதற்கான வருடாந்த தடைக்காலம்",
            "department_en": "Marine Conservation & Fisheries Management Division",
            "department_si": "සාගර සංරක්ෂණ සහ ධීවර කළමනාකරණ අංශය",
            "department_ta": "கடல்சார் பாதுகாப்பு மற்றும் கடற்றொழில் முகாமைத்துவப் பிரிவு",
            "summary_en": "Strict enforcement of the annual conservation ban on harvesting, possession, and commercial sale of spiny lobster and berried female crabs effective from 1 May to 30 June 2026 across Southern and Eastern coastal belts.",
            "summary_si": "දකුණු සහ නැගෙනහිර වෙරළ තීරයන්හි 2026 මැයි 1 සිට ජූනි 30 දක්වා පොකිරිස්සන් සහ බිත්තර සහිත ගැහැණු කකුළුවන් ඇල්ලීම, ළඟ තබා ගැනීම සහ විකිණීම තහනම් කර ඇත.",
            "summary_ta": "தெற்கு மற்றும் கிழக்கு கடலோரப் பகுதிகளில் 2026 மே 1 முதல் ஜூன் 30 வரை சிங்க இறால் மற்றும் முட்டையிடும் நண்டுகளை பிடித்தல் மற்றும் விற்பனை செய்தல் தடைசெய்யப்பட்டுள்ளது.",
            "content_en": "<p>In exercise of powers vested under Fisheries and Aquatic Resources Gazette Extraordinary No. 1665/17, fishers and seafood hospitality establishments are notified of strict penal actions for violations during the designated breeding season.</p>",
            "content_si": "<p>1665/17 දරන අතිවිශේෂ ගැසට් පත්‍රය යටතේ පැවරී ඇති බලතල අනුව, ප්‍රජනන කාලසීමාව තුළ මෙම නීති උල්ලංඝනය කරන අයට එරෙහිව දැඩි නීතිමය පියවර ගනු ලැබේ.</p>",
            "content_ta": "<p>1665/17 ஆம் இலக்க அதிவிசேட வர்த்தமானியின் கீழ் வழங்கப்பட்டுள்ள அதிகாரங்களின்படி, இனப்பெருக்க காலத்தில் சட்டங்களை மீறுவோருக்கு எதிராக கடுமையான சட்ட நடவடிக்கை எடுக்கப்படும்.</p>",
            "published_date": "2026-02-20",
            "expiry_date": "2026-06-30",
            "attachment_title_en": "Gazette-Extraordinary-Lobster-Conservation-Regulations.pdf",
            "attachment_title_si": "අතිවිශේෂ-ගැසට්-පොකිරිස්සන්-සංරක්ෂණ-නියෝග.pdf",
            "attachment_title_ta": "வர்த்தமானி-அறிவித்தல்-இறால்-பாதுகாப்பு-விதிகள்.pdf",
            "file_type": "PDF",
            "file_size": "950 KB",
        },
        {
            "order": 5,
            "notice_number": "CFHC/TND/2026/03",
            "slug": "beruwala-harbour-dredging-procurement-notice",
            "category": "procurement",
            "priority": "normal",
            "is_urgent": False,
            "is_featured": False,
            "title_en": "National Competitive Bidding: Maintenance Dredging & Basin Deepening at Beruwala Fishery Harbour",
            "title_si": "ජාතික තරඟකාරී ලංසු කැඳවීම: බේරුවල ධීවර වරායේ නඩත්තු වැලි හෑරීම සහ ද්‍රෝණිය ගැඹුරු කිරීම",
            "title_ta": "தேசிய போட்டி ஏலக் கோரல்: பேருவளை மீன்பிடித் துறைமுகத்தில் பராமரிப்பு தூர்வாருதல்",
            "department_en": "Ceylon Fishery Harbours Corporation (CFHC)",
            "department_si": "ලංකා ධීවර වරාය නීතිගත සංස්ථාව (CFHC)",
            "department_ta": "இலங்கை மீன்பிடித் துறைமுகக் கூட்டுத்தாபனம் (CFHC)",
            "summary_en": "Sealed bids are invited from eligible marine engineering contractors registered with CIDA (Grade SP-1 or above) for comprehensive harbour navigation channel dredging works.",
            "summary_si": "බේරුවල ධීවර වරායේ යාත්‍රා ගමනාගමන නාලිකා වැලි හෑරීමේ කටයුතු සඳහා CIDA (ශ්‍රේණිය SP-1 හෝ ඉහළ) ලියාපදිංචි කොන්ත්‍රාත්කරුවන්ගෙන් මුද්‍රා තැබූ ලංසු කැඳවනු ලැබේ.",
            "summary_ta": "பேருவளை மீன்பிடித் துறைமுகத்தில் பராமரிப்பு தூர்வாரும் பணிகளுக்காக தகுதியான ஒப்பந்தக்காரர்களிடமிருந்து முத்திரையிடப்பட்ட ஏலங்கள் கோரப்படுகின்றன.",
            "content_en": "<p>Bidding documents can be inspected and purchased from CFHC Procurement Division, Rock House Lane, Colombo 15 upon payment of a non-refundable fee of LKR 12,500. Bid security value: LKR 450,000.</p>",
            "content_si": "<p>ලංසු ලියකියවිලි රු. 12,500 ක ආපසු නොගෙවන ගාස්තුවක් ගෙවා කොළඹ 15, රොක් හවුස් පටුමගේ පිහිටි CFHC ප්‍රසම්පාදන අංශයෙන් ලබාගත හැක.</p>",
            "content_ta": "<p>ஏல ஆவணங்களை இலங்கை மீன்பிடித் துறைமுகக் கூட்டுத்தாபனத்தின் கொள்முதல் பிரிவில் பெற்றுக்கொள்ளலாம்.</p>",
            "published_date": "2026-02-15",
            "expiry_date": "2026-03-28",
            "attachment_title_en": "CFHC-TND-2026-03-Beruwala-Dredging-Bidding-Doc.pdf",
            "attachment_title_si": "CFHC-TND-2026-03-බේරුවල-ලංසු-ලේඛන.pdf",
            "attachment_title_ta": "CFHC-TND-2026-03-பேருவளை-ஏல-ஆவணங்கள்.pdf",
            "file_type": "PDF",
            "file_size": "3.5 MB",
        },
        {
            "order": 6,
            "notice_number": "MF/REC/2026/01",
            "slug": "recruitment-fisheries-inspectors-class-ii",
            "category": "recruitment",
            "priority": "normal",
            "is_urgent": False,
            "is_featured": False,
            "title_en": "Open Competitive Examination for Recruitment to the Post of Fisheries Inspector (Class II) - 2026",
            "title_si": "ධීවර පරීක්ෂක (II වන පන්තිය) තනතුරට බඳවාගැනීමේ විවෘත තරඟ විභාගය - 2026",
            "title_ta": "கடற்றொழில் பரிசோதகர் (வகுப்பு II) பதவிக்கான திறந்த போட்டிப் பரீட்சை - 2026",
            "department_en": "Department of Fisheries and Aquatic Resources (DFAR)",
            "department_si": "ධීවර හා ජලජ සම්පත් දෙපාර්තමේන්තුව (DFAR)",
            "department_ta": "கடற்றொழில் மற்றும் நீரியல் வளங்கள் திணைக்களம் (DFAR)",
            "summary_en": "Applications are called from qualified Sri Lankan citizens possessing G.C.E. Advanced Level in Science / Bio-Systems Technology for 45 vacancies in the Department of Fisheries field cadre.",
            "summary_si": "ධීවර දෙපාර්තමේන්තුවේ පුරප්පාඩු 45 ක් සඳහා විද්‍යා හෝ ජෛව පද්ධති තාක්ෂණවේදය අංශයෙන් උසස් පෙළ සමත් ශ්‍රී ලාංකික පුරවැසියන්ගෙන් අයදුම්පත් කැඳවනු ලැබේ.",
            "summary_ta": "கடற்றொழில் திணைக்களத்தில் 45 வெற்றிடங்களுக்காக தகுதியான இலங்கை பிரஜைகளிடமிருந்து விண்ணப்பங்கள் கோரப்படுகின்றன.",
            "content_en": "<p>Age limit: 18 - 30 years as of closing date. Application submission must be completed online through the Department Examination portal and printed confirmation submitted via Registered Post.</p>",
            "content_si": "<p>වයස් සීමාව: අවසන් දිනට අවුරුදු 18 - 30. අයදුම්පත් දෙපාර්තමේන්තු වෙබ් අඩවිය හරහා මාර්ගගතව යොමු කළ යුතුය.</p>",
            "content_ta": "<p>வயது எல்லை: 18 - 30 வயது. விண்ணப்பங்களை இணையத்தளத்தினூடாக சமர்ப்பிக்க வேண்டும்.</p>",
            "published_date": "2026-02-05",
            "expiry_date": "2026-03-25",
            "attachment_title_en": "Gazette-Notice-Fisheries-Inspector-Recruitment-2026.pdf",
            "attachment_title_si": "ගැසට්-නිවේදනය-ධීවර-පරීක්ෂක-බඳවාගැනීම්-2026.pdf",
            "attachment_title_ta": "வர்த்தமானி-அறிவித்தல்-பரிசோதகர்-ஆட்சேர்ப்பு-2026.pdf",
            "file_type": "PDF",
            "file_size": "850 KB",
        },
    ]

    for item in notices_data:
        obj, created = NoticeItem.objects.update_or_create(
            slug=item["slug"],
            defaults=item,
        )
        print(f"  {'Created' if created else 'Updated'}: [{obj.notice_number}] {obj.title_en}")

    print("[SUCCESS] Notices Page Data Successfully Seeded!")

if __name__ == "__main__":
    seed()
