import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from press_releases.models import PressReleasePageHeader, PressReleaseItem

def seed():
    print("[*] Seeding Press Releases Page Data...")

    header, _ = PressReleasePageHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Official Statements"
    header.title_en = "Press Releases &"
    header.highlighted_title_en = "Official Statements"
    header.description_en = "Read official statements, policy declarations, sector progress briefings, and verified media announcements issued by the Ministry of Fisheries."
    header.featured_badge_en = "Lead Press Briefing"
    header.catalogue_badge_en = "Press Room Archive"
    header.library_title_en = "All Official Press Releases & Media Briefings"

    header.badge_text_si = "නිල මාධ්‍ය ප්‍රකාශ"
    header.title_si = "මාධ්‍ය නිවේදන සහ"
    header.highlighted_title_si = "නිල ප්‍රකාශන"
    header.description_si = "ධීවර අමාත්‍යාංශය මඟින් නිකුත් කරනු ලබන නිල මාධ්‍ය නිවේදන, ප්‍රතිපත්ති ප්‍රකාශන, ක්ෂේත්‍ර ප්‍රගති වාර්තා සහ විශේෂ නිවේදන මෙතැනින් ලබාගන්න."
    header.featured_badge_si = "ප්‍රධාන මාධ්‍ය නිවේදනය"
    header.catalogue_badge_si = "මාධ්‍ය ලේඛනාගාරය"
    header.library_title_si = "සියලු නිල මාධ්‍ය නිවේදන සහ ප්‍රකාශ එකතුව"

    header.badge_text_ta = "உத்தியோகபூர்வ ஊடக அறிக்கைகள்"
    header.title_ta = "ஊடக வெளியீடுகள் &"
    header.highlighted_title_ta = "உத்தியோகபூர்வ அறிக்கைகள்"
    header.description_ta = "கடற்றொழில் அமைச்சு வெளியிடும் உத்தியோகபூர்வ ஊடக வெளியீடுகள், கொள்கை விளக்கங்கள், துறைசார் முன்னேற்ற அறிக்கைகள் மற்றும் சிறப்பு அறிவித்தல்கள்."
    header.featured_badge_ta = "முக்கிய ஊடக அறிக்கை"
    header.catalogue_badge_ta = "ஊடக ஆவணக் காப்பகம்"
    header.library_title_ta = "அனைத்து உத்தியோகபூர்வ ஊடக வெளியீடுகள் மற்றும் அறிக்கைகள்"
    header.save()

    releases_data = [
        {
            "order": 1,
            "release_number": "MF/PR/2026/01",
            "slug": "sri-lanka-eu-sustainable-fisheries-pact-2026",
            "category": "bilateral_cooperation",
            "location": "Colombo, Sri Lanka",
            "is_featured": True,
            "title_en": "Sri Lanka Signs Historic Bilateral Sustainable Fisheries and Yellowfin Tuna Export Partnership with European Union",
            "title_si": "ශ්‍රී ලංකාව සහ යුරෝපා සංගමය අතර තිරසර ධීවර හා කෙලවල්ලා මත්ස්‍ය අපනයන ඓතිහාසික ද්විපාර්ශ්වික ගිවිසුම අත්සන් කෙරේ",
            "title_ta": "ஐரோப்பிய ஒன்றியத்துடன் வரலாற்று முக்கியத்துவம் வாய்ந்த இருதரப்பு நிலையான கடற்றொழில் மற்றும் சூரை மீன் ஏற்றுமதி ஒப்பந்தத்தில் இலங்கை கையெழுத்திட்டது",
            "publisher_en": "Ministry Media & Public Diplomacy Division",
            "publisher_si": "අමාත්‍යාංශ මාධ්‍ය සහ මහජන රාජ්‍යතාන්ත්‍රික අංශය",
            "publisher_ta": "அமைச்சு ஊடக மற்றும் பொது இராஜதந்திரப் பிரிவு",
            "summary_en": "Minister of Fisheries leads delegation in signing a comprehensive 5-year maritime framework bolstering EU market tariff access for certified sustainably harvested tuna, satellite catch tracing, and harbour cold-chain upgrades.",
            "summary_si": "තිරසර ධීවර සහතික ලත් කෙලවල්ලා මත්ස්‍ය අපනයන සඳහා යුරෝපා වෙළඳපොළ තීරුබදු සහන, චන්ද්‍රිකා මත්ස්‍ය ලුහුබැඳීමේ පද්ධති සහ වරාය සීතල කාමර වැඩිදියුණු කිරීම සඳහා වූ පස් අවුරුදු ගිවිසුමකට අත්සන් තැබිණි.",
            "summary_ta": "சான்றளிக்கப்பட்ட நிலையான சூரை மீன் ஏற்றுமதிக்கான ஐரோப்பிய ஒன்றிய சந்தை வரிச் சலுகைகள் மற்றும் துறைமுக குளிரூட்டல் மேம்பாடுகளுக்கான 5 வருட ஒப்பந்தம் கைச்சாத்திடப்பட்டது.",
            "content_en": """<p><strong>COLOMBO (Ministry Media Unit)</strong> — The Ministry of Fisheries announces the formal signing of the Sri Lanka - European Union Sustainable Marine Fisheries Cooperation Framework 2026–2031.</p>
<p>The agreement solidifies Sri Lanka's position as a premier exporter of premium sashimi-grade yellowfin and bigeye tuna, recognizing the nation's stringent anti-IUU (Illegal, Unreported, and Unregulated) enforcement and vessel monitoring infrastructure.</p>
<h3>Key Pillars of the Bilateral Framework:</h3>
<ul>
<li><strong>Zero-Tariff Quota Expansion:</strong> Preferential tariff quota enhancements for value-added processed seafood exports to 27 EU member states.</li>
<li><strong>Digital Traceability Integration:</strong> Real-time electronic catch documentation directly interoperable with the EU TRACES seafood sanitary system.</li>
<li><strong>Grant Assistance:</strong> EUR 14.5 Million in technical cooperation for modernizing post-harvest landing facilities at Galle, Dikkowita, and Mirissa fishery harbours.</li>
</ul>
<p>Speaking at the signing ceremony at the Ministry auditorium, Hon. Minister emphasized that this milestone guarantees both economic prosperity for coastal fishers and long-term marine stock conservation.</p>""",
            "content_si": """<p><strong>කොළඹ (අමාත්‍යාංශ මාධ්‍ය අංශය)</strong> — ශ්‍රී ලංකාව සහ යුරෝපා සංගමය අතර 2026–2031 තිරසර සාගර ධීවර සහයෝගීතා රාමුව නිල වශයෙන් අත්සන් කළ බව ධීවර අමාත්‍යාංශය නිවේදනය කරයි.</p>
<p>නීතිවිරෝධී, වාර්තා නොකළ සහ නියාමනය නොකළ (IUU) ධීවර කටයුතු වැළැක්වීම සඳහා ශ්‍රී ලංකාව ගෙන ඇති ක්‍රියාමාර්ග ඇගයීමට ලක් කරමින් මෙම ගිවිසුම ක්‍රියාත්මක වේ.</p>
<h3>ගිවිසුමේ ප්‍රධාන අංශ:</h3>
<ul>
<li><strong>තීරුබදු රහිත කෝටා පුළුල් කිරීම:</strong> යුරෝපා සංගමයේ සාමාජික රටවල් 27 වෙත අගය එකතු කළ මත්ස්‍ය නිෂ්පාදන අපනයනය සඳහා තීරුබදු සහන.</li>
<li><strong>ඩිජිටල් ලුහුබැඳීමේ පද්ධතිය:</strong> යුරෝපා TRACES පද්ධතිය සමඟ සෘජුව සම්බන්ධ වන ඩිජිටල් මත්ස්‍ය වාර්තාකරණය.</li>
<li><strong>ප්‍රදාන ආධාර:</strong> ගාල්ල, දික්ඕවිට සහ මිරිස්ස ධීවර වරායන්හි සීතල කාමර නවීකරණය සඳහා යුරෝ මිලියන 14.5 ක තාක්ෂණික සහයෝගය.</li>
</ul>""",
            "content_ta": """<p><strong>கொழும்பு (அமைச்சு ஊடகப் பிரிவு)</strong> — இலங்கை மற்றும் ஐரோப்பிய ஒன்றியத்திற்கு இடையிலான 2026–2031 நிலையான கடல் கடற்றொழில் ஒத்துழைப்பு ஒப்பந்தம் உத்தியோகபூர்வமாக கையெழுத்தானது.</p>
<h3>ஒப்பந்தத்தின் முக்கிய அம்சங்கள்:</h3>
<ul>
<li><strong>வரிவிலக்கு ஒதுக்கீடு விரிவாக்கம்:</strong> 27 ஐரோப்பிய ஒன்றிய நாடுகளுக்கு பெறுமதி சேர்க்கப்பட்ட கடல் உணவு ஏற்றுமதிக்கான வரிச் சலுகைகள்.</li>
<li><strong>டிஜிட்டல் கண்காணிப்பு முறைமை:</strong> ஐரோப்பிய ஒன்றிய TRACES முறைமையுடன் இணைக்கப்பட்ட இலத்திரனியல் ஆவணப்படுத்தல்.</li>
<li><strong>மானிய உதவி:</strong> காலி, திக்கோவிற்ற மற்றும் மிரிஸ்ஸ துறைமுக குளிரூட்டல் நிலையங்களை நவீனமயமாக்குவதற்கு 14.5 மில்லியன் யூரோ நிதி உதவி.</li>
</ul>""",
            "published_date": "2026-03-14",
            "attachment_title_en": "MF-PR-2026-01-EU-Fisheries-Partnership-Briefing.pdf",
            "attachment_title_si": "MF-PR-2026-01-යුරෝපා-ධීවර-හවුල්කාරීත්ව-වාර්තාව.pdf",
            "attachment_title_ta": "MF-PR-2026-01-ஐரோப்பிய-ஒன்றிய-ஒப்பந்த-விபரம்.pdf",
            "file_type": "PDF",
            "file_size": "2.1 MB",
        },
        {
            "order": 2,
            "release_number": "MF/PR/2026/02",
            "slug": "ministerial-briefing-national-aquaculture-development-drive",
            "category": "sector_progress",
            "location": "Polonnaruwa, Sri Lanka",
            "is_featured": False,
            "title_en": "Ministry Unveils Strategic Plan to Triple Freshwater Seafood Production to 120,000 Metric Tons by 2028",
            "title_si": "2028 වන විට මිරිදිය මත්ස්‍ය නිෂ්පාදනය මෙට්‍රික් ටොන් 120,000 දක්වා තෙගුණ කිරීමේ උපායමාර්ගික සැලැස්ම එළිදක්වයි",
            "title_ta": "2028 ஆம் ஆண்டளவில் நன்னீர் கடல் உணவு உற்பத்தியை 120,000 மெட்ரிக் தொன்னாக மூன்று மடங்காக அதிகரிக்கும் மூலோபாயத் திட்டம் வெளியீடு",
            "publisher_en": "Office of the Secretary - Ministry of Fisheries",
            "publisher_si": "ලේකම් කාර්යාලය - ධීවර අමාත්‍යාංශය",
            "publisher_ta": "செயலாளர் அலுவலகம் - கடற்றொழில் அமைச்சு",
            "summary_en": "Comprehensive national masterplan unveiled targeting fingerling production in 1,200 non-perennial village tanks and modern shrimp hatcheries across Eastern and North-Central Provinces.",
            "summary_si": "නැගෙනහිර සහ උතුරු මැද පළාත්වල ග්‍රාමීය වැව් 1,200 ක් සහ නවීන ඉස්සන් අභිජනන මධ්‍යස්ථාන ඉලක්ක කරගනිමින් ජාතික මිරිදිය මත්ස්‍ය සංවර්ධන සැලැස්ම එළිදක්වයි.",
            "summary_ta": "கிழக்கு மற்றும் வடமத்திய மாகாணங்களில் 1,200 கிராமக் குளங்கள் மற்றும் இறால் குஞ்சு பொரிப்பகங்களை இலக்காகக் கொண்ட தேசிய திட்டம் வெளியிடப்பட்டது.",
            "content_en": "<p>During a high-level field briefing in Polonnaruwa, Ministry leadership announced a dedicated LKR 3.2 Billion capital investment into inland aquaculture fingerling distribution, cold-chain transport networks, and farmer training institutes.</p>",
            "content_si": "<p>පොළොන්නරුවේ පැවති විශේෂ මාධ්‍ය සාකච්ඡාවකදී මිරිදිය ජලජීවී වගාව සඳහා රුපියල් බිලියන 3.2 ක ආයෝජන ව්‍යාපෘතියක් ක්‍රියාත්මක කරන බව නිවේදනය කෙරිණි.</p>",
            "content_ta": "<p>பொலன்னறுவையில் நடைபெற்ற ஊடகவியலாளர் சந்திப்பில் நன்னீர் நீரியல் வளர்ப்புக்காக 3.2 பில்லியன் ரூபா முதலீட்டுத் திட்டம் அறிவிக்கப்பட்டது.</p>",
            "published_date": "2026-03-08",
            "attachment_title_en": "National-Inland-Aquaculture-Masterplan-2026-2028.pdf",
            "attachment_title_si": "ජාතික-මිරිදිය-ජලජීවී-සැලැස්ම-2026-2028.pdf",
            "attachment_title_ta": "தேசிய-நன்னீர்-நீரியல்-வளர்ப்பு-திட்டம்-2026.pdf",
            "file_type": "PDF",
            "file_size": "3.4 MB",
        },
        {
            "order": 3,
            "release_number": "MF/PR/2026/03",
            "slug": "relief-package-implementation-monsoon-season",
            "category": "fisher_welfare",
            "location": "Galle, Sri Lanka",
            "is_featured": False,
            "title_en": "Over 45,000 Small-Scale Coastal Fisher Families Receive Off-Season Welfare and Nutrition Allowances",
            "title_si": "කුඩා පරිමාණ වෙරළබඩ ධීවර පවුල් 45,000 කට අධික සංඛ්‍යාවකට වාරකන් සහනාධාර සහ පෝෂණ දීමනා ලබාදීම ආරම්භ වේ",
            "title_ta": "45,000 க்கும் மேற்பட்ட சிறிய அளவிலான கடலோர மீனவ குடும்பங்களுக்கு நிவாரண மற்றும் ஊட்டச்சத்து கொடுப்பனவுகள் வழங்கல்",
            "publisher_en": "Fisheries Community Welfare Directorate",
            "publisher_si": "ධීවර ප්‍රජා සුබසාධන අධ්‍යක්ෂ මණ්ඩලය",
            "publisher_ta": "மீனவ சமூக நலன்புரி பணிப்பாளர் நாயகம்",
            "summary_en": "Direct bank disbursement of monthly living allowances completed under the National Fisheries Social Security Fund to safeguard coastal household livelihoods during inclement monsoon weather.",
            "summary_si": "අයහපත් කාලගුණික තත්ත්වයන් හේතුවෙන් මුහුදු යාමට නොහැකි වූ ධීවර පවුල් සඳහා ජාතික ධීවර සමාජ ආරක්ෂණ අරමුදල මඟින් සෘජු බැංකු ගිණුම් හරහා මාසික දීමනා බෙදාහැරේ.",
            "summary_ta": "சீற்றமான வானிலை காரணமாக கடற்றொழிலில் ஈடுபட முடியாத மீனவ குடும்பங்களுக்கு தேசிய சமூக பாதுகாப்பு நிதியத்தின் ஊடாக மாதாந்த கொடுப்பனவுகள் வழங்கப்பட்டுள்ளன.",
            "content_en": "<p>The Ministry has expedited direct welfare transfers of LKR 15,000 per registered family across 14 coastal fisheries administrative districts to mitigate the adverse economic effects of rough seas.</p>",
            "content_si": "<p>වෙරළබඩ දිස්ත්‍රික්ක 14 ක ලියාපදිංචි ධීවර පවුලක් සඳහා රු. 15,000 බැගින් වන සෘජු මූල්‍ය ආධාර මුදාහැරීමට අමාත්‍යාංශය කටයුතු කර ඇත.</p>",
            "content_ta": "<p>14 கடலோர மாவட்டங்களில் பதிவு செய்யப்பட்ட குடும்பத்திற்கு 15,000 ரூபா நேரடி நிதி உதவி வழங்கப்பட்டுள்ளது.</p>",
            "published_date": "2026-02-27",
            "attachment_title_en": "Press-Briefing-Monsoon-Welfare-Disbursement-Report.pdf",
            "attachment_title_si": "වාරකන්-සහනාධාර-බෙදාහැරීමේ-වාර්තාව.pdf",
            "attachment_title_ta": "பருவகால-நிவாரண-அறிக்கை-2026.pdf",
            "file_type": "PDF",
            "file_size": "1.1 MB",
        },
        {
            "order": 4,
            "release_number": "MF/PR/2026/04",
            "slug": "joint-indian-ocean-search-and-rescue-mission-success",
            "category": "emergency_alert",
            "location": "Trincomalee, Sri Lanka",
            "is_featured": False,
            "title_en": "Coordinated Deep-Sea Search & Rescue Operation Successfully Locates and Evacuates 6 Multiday Fishers in Arabian Sea",
            "title_si": "අරාබි මුහුදේ ආපදාවට පත් බහුදින ධීවර යාත්‍රාවක ධීවරයින් 6 දෙනෙකු මුදාගැනීමේ ඒකාබද්ධ මෙහෙයුම සාර්ථකව නිමවේ",
            "title_ta": "அரபிக் கடலில் ஆபத்தில் சிக்கிய பலநாள் படகில் இருந்த 6 மீனவர்களை மீட்கும் கூட்டு நடவடிக்கை வெற்றி",
            "publisher_en": "Maritime Rescue Coordination Centre (MRCC) & DFAR",
            "publisher_si": "මුහුදු මුදාගැනීමේ සම්බන්ධීකරණ මධ්‍යස්ථානය (MRCC) සහ DFAR",
            "publisher_ta": "கடல்சார் மீட்பு ஒருங்கிணைப்பு மையம் (MRCC) மற்றும் DFAR",
            "summary_en": "Ministry Satellite VMS unit detects distress beacon from vessel 'Nilwala-04'; coordinates rapid response with Sri Lanka Navy and regional coastguards to safely tow vessel to safety.",
            "summary_si": "'නිල්වලා-04' යාත්‍රාවෙන් නිකුත් වූ හදිසි ආපදා සංඥාව චන්ද්‍රිකා VMS මධ්‍යස්ථානය මඟින් හඳුනාගෙන නාවික හමුදාව සමඟ එක්ව ධීවරයින් ආරක්ෂිතව මුදාගන්නා ලදී.",
            "summary_ta": "'நில்வலா-04' படகின் அவசர சமிக்ஞை செய்மதி VMS ஊடாக அடையாளம் காணப்பட்டு கடற்படையுடன் இணைந்து மீனவர்கள் பாதுகாப்பாக மீட்கப்பட்டனர்.",
            "content_en": "<p>The Ministry reiterates the vital importance of operating certified Satellite VMS units and EPIRB transponders on all multiday crafts navigating beyond the Sri Lankan Exclusive Economic Zone (EEZ).</p>",
            "content_si": "<p>ශ්‍රී ලංකා මුහුදු සීමාවෙන් ඔබ්බට යාත්‍රා කරන සියලුම බහුදින යාත්‍රා සඳහා චන්ද්‍රිකා VMS සහ හදිසි ආපදා සංඥා උපකරණ අනිවාර්ය බව අමාත්‍යාංශය යළිත් අවධාරණය කරයි.</p>",
            "content_ta": "<p>அனைத்து பலநாள் படகுகளுக்கும் செய்மதி VMS மற்றும் அவசர சமிக்ஞை கருவிகள் கட்டாயமானது என்பதை அமைச்சு மீண்டும் வலியுறுத்துகிறது.</p>",
            "published_date": "2026-02-18",
            "attachment_title_en": "MRCC-Operations-Incident-Report-Nilwala04.pdf",
            "attachment_title_si": "MRCC-මෙහෙයුම්-වාර්තාව-නිල්වලා04.pdf",
            "attachment_title_ta": "MRCC-மீட்பு-நடவடிக்கை-அறிக்கை.pdf",
            "file_type": "PDF",
            "file_size": "980 KB",
        },
        {
            "order": 5,
            "release_number": "MF/PR/2026/05",
            "slug": "sustainable-blue-economy-marine-sanctuary-declaration",
            "category": "ocean_conservation",
            "location": "Kalpitiya, Sri Lanka",
            "is_featured": False,
            "title_en": "Cabinet Approves Expansion of Bar Reef Marine Sanctuary with Dedicated Sustainable Artisanal Fishing Zones",
            "title_si": "බාර් රීෆ් සාගර අභයභූමිය පුළුල් කිරීමට සහ පාරම්පරික ධීවර කලාප වෙන් කිරීමට කැබිනට් අනුමැතිය හිමිවේ",
            "title_ta": "பார் பாறை கடல் சரணாலயத்தை விரிவுபடுத்தவும் நிலையான பாரம்பரிய கடற்றொழில் வலயங்களை ஒதுக்கவும் அமைச்சரவை அனுமதி",
            "publisher_en": "Ocean Resources & Marine Environment Secretariat",
            "publisher_si": "සාගර සම්පත් සහ සාගර පරිසර ලේකම් කාර්යාලය",
            "publisher_ta": "கடல் வளங்கள் மற்றும் கடல் சுற்றாடல் செயலகம்",
            "summary_en": "Historic environmental milestone balancing biodiversity protection of sensitive coral reefs with protected livelihood access for traditional small-boat fishers in Kalpitiya peninsula.",
            "summary_si": "කල්පිටිය අර්ධද්වීපයේ සංවේදී කොරල්පර සංරක්ෂණය සහ සාම්ප්‍රදායික සුළු පරිමාණ ධීවරයින්ගේ ජීවනෝපාය සුරක්ෂිත කිරීම සඳහා විශේෂ වැඩපිළිවෙළක් ක්‍රියාත්මක කෙරේ.",
            "summary_ta": "கற்பிட்டி குடாநாட்டில் பவளப்பாறைகளை பாதுகாப்பதுடன் பாரம்பரிய மீனவர்களின் வாழ்வாதாரத்தை பாதுகாப்பதற்கான திட்டம்.",
            "content_en": "<p>The newly designated zoning framework, designed jointly with NARA scientists and local fishing co-operatives, prohibits bottom trawling while supporting sustainable hand-line and hook fishing.</p>",
            "content_si": "<p>NARA විද්‍යාඥයින් සහ ප්‍රදේශයේ ධීවර සමිති සමඟ එක්ව සකස් කරන ලද මෙම නව කලාපකරණය මඟින් පතුල හාරා මසුන් ඇල්ලීම තහනම් කෙරේ.</p>",
            "content_ta": "<p>NARA விஞ்ஞானிகளுடன் இணைந்து உருவாக்கப்பட்ட இந்த புதிய வலையமைப்பு சுற்றாடல் பாதுகாப்பை உறுதி செய்கிறது.</p>",
            "published_date": "2026-02-12",
            "attachment_title_en": "Cabinet-Memorandum-Bar-Reef-Sanctuary-Zoning.pdf",
            "attachment_title_si": "කැබිනට්-තීරණ-බාර්-රීෆ්-සංරක්ෂණ-කලාප.pdf",
            "attachment_title_ta": "அமைச்சரவை-முடிவு-கடல்-சரணாலயம்.pdf",
            "file_type": "PDF",
            "file_size": "2.8 MB",
        },
        {
            "order": 6,
            "release_number": "MF/PR/2026/06",
            "slug": "annual-fisheries-summit-blue-prosperity-2026",
            "category": "ministerial_statement",
            "location": "Colombo, Sri Lanka",
            "is_featured": False,
            "title_en": "National Fisheries Summit 'Blue Prosperity 2026' Concludes with LKR 15 Billion Investment Pledges",
            "title_si": "'නීල සෞභාග්‍යය 2026' ජාතික ධීවර සමුළුව රුපියල් බිලියන 15 ක ආයෝජන ප්‍රතිඥා සමඟ සාර්ථකව නිමවේ",
            "title_ta": "'நீல செழிப்பு 2026' தேசிய கடற்றொழில் உச்சி மாநாடு 15 பில்லியன் ரூபா முதலீட்டு உறுதிமொழிகளுடன் நிறைவு",
            "publisher_en": "Ministry Media & Communication Unit",
            "publisher_si": "අමාත්‍යාංශ මාධ්‍ය හා ප්‍රවෘත්ති අංශය",
            "publisher_ta": "அமைச்சு ஊடக மற்றும் தொடர்பாடல் பிரிவு",
            "summary_en": "Three-day international summit brings together commercial exporters, aquaculture innovators, naval security chiefs, and global investors committing to modernize Sri Lanka's marine infrastructure.",
            "summary_si": "ශ්‍රී ලංකාවේ සාගර යටිතල පහසුකම් නවීකරණය කිරීම සඳහා වාණිජ අපනයනකරුවන්, ජලජීවී නවෝත්පාදකයින් සහ ආයෝජකයින්ගේ සහභාගීත්වයෙන් සමුළුව පැවැත්විණි.",
            "summary_ta": "இலங்கையின் கடல்சார் உட்கட்டமைப்பை நவீனமயமாக்குவதற்கு சர்வதேச முதலீட்டாளர்கள் பங்கேற்ற உச்சி மாநாடு வெற்றிகரமாக நடைபெற்றது.",
            "content_en": "<p>Hon. Minister closed the summit thanking development partners and affirming the government's steadfast commitment to empowering coastal fishing communities through technological innovation.</p>",
            "content_si": "<p>තාක්ෂණික නවෝත්පාදනයන් ඔස්සේ වෙරළබඩ ධීවර ප්‍රජාව සවිබල ගැන්වීම රජයේ ප්‍රධාන අරමුණ බව අමාත්‍යවරයා අවධාරණය කළේය.</p>",
            "content_ta": "<p>தொழில்நுட்ப புத்தாக்கங்கள் ஊடாக மீனவ சமூகத்தை வலுப்படுத்துவதே அரசாங்கத்தின் பிரதான நோக்கம் என அமைச்சர் வலியுறுத்தினார்.</p>",
            "published_date": "2026-02-02",
            "attachment_title_en": "Blue-Prosperity-Summit-Communique-2026.pdf",
            "attachment_title_si": "නීල-සෞභාග්‍යය-සමුළු-නිවේදනය-2026.pdf",
            "attachment_title_ta": "நீல-செழிப்பு-மாநாட்டு-அறிக்கை-2026.pdf",
            "file_type": "PDF",
            "file_size": "4.1 MB",
        },
    ]

    for item in releases_data:
        obj, created = PressReleaseItem.objects.update_or_create(
            slug=item["slug"],
            defaults=item,
        )
        print(f"  {'Created' if created else 'Updated'}: [{obj.release_number}] {obj.title_en}")

    print("[SUCCESS] Press Releases Page Data Successfully Seeded!")

if __name__ == "__main__":
    seed()
