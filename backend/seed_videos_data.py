import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from videos.models import VideoPageHeader, VideoItem

def seed():
    print("[*] Seeding Videos Page Data with Valid Video IDs...")

    header, _ = VideoPageHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Official Video Archive"
    header.title_en = "Official Videos &"
    header.highlighted_title_en = "Documentary Library"
    header.description_en = "Watch official video documentaries, project updates, fisher training sessions, and media briefings from the Ministry of Fisheries, Sri Lanka."
    header.featured_badge_en = "Featured Official Video"
    header.catalogue_badge_en = "Video Directory"
    header.library_title_en = "All Official Videos & Documentaries"

    header.badge_text_si = "නිල වීඩියෝ ලේඛනාගාරය"
    header.title_si = "නිල වීඩියෝ සහ"
    header.highlighted_title_si = "වාර්තා වැඩසටහන්"
    header.description_si = "ධීවර අමාත්‍යාංශයේ නිල සංවර්ධන වැඩසටහන්, පුහුණු සැසි, ජලජීවී ව්‍යාපෘති සහ විශේෂ මාධ්‍ය සාකච්ඡා පිළිබඳ වීඩියෝ මෙතැනින් නරඹන්න."
    header.featured_badge_si = "විශේෂ වීඩියෝව"
    header.catalogue_badge_si = "වීඩියෝ නාමාවලිය"
    header.library_title_si = "සියලු නිල වීඩියෝ සහ වාර්තා වැඩසටහන්"

    header.badge_text_ta = "உத்தியோகபூர்வ வீடியோ காப்பகம்"
    header.title_ta = "உத்தியோகபூர்வ வீடியோக்கள் &"
    header.highlighted_title_ta = "ஆவணப் படங்கள்"
    header.description_ta = "கடற்றොழில் அமைச்சின் உத்தியோகபூர்வ அபிவிருத்தி திட்டங்கள், பயிற்சி பட்டறைகள் மற்றும் ஆவணப்படங்களை பார்வையிடுங்கள்."
    header.featured_badge_ta = "முக்கிய வீடியோ"
    header.catalogue_badge_ta = "வீடியோ ஆவணம்"
    header.library_title_ta = "அனைத்து உத்தியோகபூர்வ வீடியோக்கள் மற்றும் ஆவணப்படங்கள்"
    header.save()

    videos_data = [
        {
            "order": 1,
            "slug": "national-fisheries-development-programme",
            "category": "official_events",
            "is_featured": True,
            "title_en": "National Fisheries Development Programme: Modernizing Sustainable Marine Infrastructure",
            "title_si": "ජාතික ධීවර සංවර්ධන වැඩසටහන: තිරසර සාගර යටිතල පහසුකම් නවීකරණය",
            "title_ta": "தேசிய கடற்றொழில் அபிவிருத்தி திட்டம்: நிலையான கடல்சார் உட்கட்டமைப்பை நவீனமயமாக்குதல்",
            "description_en": "Highlights from the official launch of the National Fisheries Development Programme, featuring minister keynote address, stakeholder dialogues, and harbour technology showcases.",
            "description_si": "ජාතික ධීවර සංවර්ධන වැඩසටහන නිල වශයෙන් ආරම්භ කිරීම, අමාත්‍යතුමාගේ ප්‍රධාන දේශනය සහ නවීන වරාය තාක්ෂණ ප්‍රදර්ශනයේ විශේෂ අවස්ථා.",
            "description_ta": "தேசிய கடற்றொழில் அபிவிருத்தி திட்டத்தின் உத்தியோகபூர்வ ஆரம்ப நிகழ்வு மற்றும் முக்கிய அம்சங்கள்.",
            "location_en": "Colombo",
            "location_si": "කොළඹ",
            "location_ta": "கொழும்பு",
            "published_date": "2026-07-20",
            "display_date": "20 July 2026",
            "duration": "4:28",
            "video_url": "https://www.youtube.com/watch?v=LXb3EKWsInQ",
            "youtube_id": "LXb3EKWsInQ",
            "thumbnail_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "thumbnail_alt": "Officials launching the National Fisheries Development Programme",
        },
        {
            "order": 2,
            "slug": "coastal-fisher-safety-training",
            "category": "community",
            "is_featured": False,
            "title_en": "Coastal Fisher Safety, VHF Radio Protocol & Sea Survival Training",
            "title_si": "වෙරළබඩ ධීවර ආරක්ෂණ, VHF ගුවන්විදුලි සන්නිවේදන සහ මුහුදේ දිවි ගලවා ගැනීමේ පුහුණුව",
            "title_ta": "கடலோர மீனவர் பாதுகாப்பு, VHF வானொலி மற்றும் கடலில் உயிர் பிழைத்தல் பயிற்சி",
            "description_en": "Comprehensive documentary on maritime safety protocols, distress beacon activations, and emergency preparedness for multiday boat operators.",
            "description_si": "බහුදින යාත්‍රා ක්‍රියාකරුවන් සඳහා මුහුදු ආරක්ෂණ ක්‍රමවේද සහ ආපදා සන්නිවේදනය පිළිබඳ පුහුණු වාර්තා වැඩසටහන.",
            "description_ta": "பலநாள் படகு ஆபரேட்டர்களுக்கான கடல்சார் பாதுகாப்பு நெறிமுறைகள் பற்றிய ஆவணப்படம்.",
            "location_en": "Southern Province",
            "location_si": "දකුණු පළාත",
            "location_ta": "தென் மாகාணம்",
            "published_date": "2026-07-16",
            "display_date": "16 July 2026",
            "duration": "6:12",
            "video_url": "https://www.youtube.com/watch?v=ysz5S6PUM-U",
            "youtube_id": "ysz5S6PUM-U",
            "thumbnail_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "thumbnail_alt": "Fishers participating in a safety training programme",
        },
        {
            "order": 3,
            "slug": "aquaculture-development-project",
            "category": "aquaculture",
            "is_featured": False,
            "title_en": "Inland Aquaculture Revolution: Freshwater Tilapia & Giant Prawn Farming",
            "title_si": "මිරිදිය ජලජීවී වගා විප්ලවය: තිලාපියා සහ කරමල් ඉස්සන් වගාව",
            "title_ta": "நன்னீர் நீரியல் வளர்ப்பு புரட்சி: திலாப்பியா மற்றும் நன்னீர் இறால் வளர்ப்பு",
            "description_en": "Overview of sustainable inland aquaculture initiatives, subsidized fingerling distribution to village reservoir tanks, and high-yield harvest returns.",
            "description_si": "ග්‍රාමීය වැව් ආශ්‍රිත මිරිදිය මත්ස්‍ය පැටවුන් මුදාහැරීම සහ සාර්ථක අස්වැන්න නෙලීම පිළිබඳ වාර්තා වැඩසටහන.",
            "description_ta": "கிராமப்புற குளங்களில் நன்னீர் மீன் வளர்ப்பு மற்றும் உயர் விளைச்சல் குறித்த பார்வை.",
            "location_en": "North Western Province",
            "location_si": "වයඹ පළාත",
            "location_ta": "வடமேல் மாகாணம்",
            "published_date": "2026-07-12",
            "display_date": "12 July 2026",
            "duration": "5:47",
            "video_url": "https://www.youtube.com/watch?v=M7lc1UVf-VE",
            "youtube_id": "M7lc1UVf-VE",
            "thumbnail_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "thumbnail_alt": "Aquaculture development facility",
        },
        {
            "order": 4,
            "slug": "fishing-harbour-development",
            "category": "fisheries",
            "is_featured": False,
            "title_en": "Modernization of Fishery Harbours: Beruwala, Mirissa & Galle Infrastructure",
            "title_si": "ධීවර වරාය නවීකරණය: බේරුවල, මිරිස්ස සහ ගාල්ල වරාය යටිතල පහසුකම්",
            "title_ta": "மீன்பிடித் துறைமுகங்களை நவீனமயமாக்குதல்: பேருவளை, மிரிஸ்ஸ & காலி உட்கட்டமைப்பு",
            "description_en": "Infrastructure enhancements, cold-room expansion, basin dredging, and upgraded navigation beacons across Sri Lanka's major fishery harbours.",
            "description_si": "ශ්‍රී ලංකාවේ ප්‍රධාන ධීවර වරායන්හි සීතල කාමර පුළුල් කිරීම, වැලි හෑරීම සහ නව ආලෝක සංඥා ස්ථාපිත කිරීමේ ව්‍යාපෘති.",
            "description_ta": "பிரதான மீன்பிடித் துறைமுகங்களில் குளிரூட்டல் நிலையங்கள் மற்றும் தூர்வாரும் பணிகள்.",
            "location_en": "Western & Southern Coast",
            "location_si": "බස්නාහිර සහ දකුණු වෙරළ",
            "location_ta": "மேல் மற்றும் தென் கடலோரம்",
            "published_date": "2026-07-08",
            "display_date": "8 July 2026",
            "duration": "3:55",
            "video_url": "https://www.youtube.com/watch?v=LXb3EKWsInQ",
            "youtube_id": "LXb3EKWsInQ",
            "thumbnail_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "thumbnail_alt": "Modern fishing harbour with docked vessels",
        },
        {
            "order": 5,
            "slug": "marine-conservation-programme",
            "category": "conservation",
            "is_featured": False,
            "title_en": "Guardians of the Ocean: Bar Reef Marine Sanctuary Protection & Coral Restoration",
            "title_si": "සාගරයේ ආරක්ෂකයෝ: බාර් රීෆ් සාගර අභයභූමි සංරක්ෂණය සහ කොරල්පර පුනරුත්ථාපනය",
            "title_ta": "கடலின் காவலர்கள்: பார் பாறை கடல் சரணாலய பாதுகாப்பு மற்றும் பவள மீளுருவாக்கம்",
            "description_en": "Efforts by NARA marine scientists and coastal community groups to protect sensitive coral reefs, sea turtle nesting beaches, and eliminate destructive fishing methods.",
            "description_si": "NARA විද්‍යාඥයින් සහ ප්‍රජා සංවිධාන එක්ව සංවේදී කොරල්පර ආරක්ෂා කිරීම සහ විනාශකාරී ධීවර ක්‍රම පිටුදැකීම පිළිබඳ වාර්තාව.",
            "description_ta": "பவளப்பாறைகள் மற்றும் கடல் ஆமைகளை பாதுகாப்பதற்கான விஞ்ஞானிகள் மற்றும் சமூகத்தின் முயற்சிகள்.",
            "location_en": "Kalpitiya & Trincomalee",
            "location_si": "කල්පිටිය සහ ත්‍රිකුණාමලය",
            "location_ta": "கற்பிட்டி & திருகோணமலை",
            "published_date": "2026-07-04",
            "display_date": "4 July 2026",
            "duration": "7:18",
            "video_url": "https://www.youtube.com/watch?v=ysz5S6PUM-U",
            "youtube_id": "ysz5S6PUM-U",
            "thumbnail_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "thumbnail_alt": "Coral reef conservation and marine research",
        },
        {
            "order": 6,
            "slug": "fisher-community-welfare-initiative",
            "category": "community",
            "is_featured": False,
            "title_en": "Empowering Coastal Livelihoods: Pension Scheme & Disaster Relief Grants",
            "title_si": "වෙරළබඩ ජීවනෝපාය සවිබල ගැන්වීම: විශ්‍රාම වැටුප් ක්‍රමය සහ ආපදා සහනාධාර",
            "title_ta": "கடலோர வாழ்வாதாரத்தை வலுப்படுத்துதல்: ஓய்வூதியத் திட்டம் & பேரிடர் நிவாரண உதவிகள்",
            "description_en": "Community development, insurance schemes, housing support, and value-addition training programmes for small-scale fisher families.",
            "description_si": "කුඩා පරිමාණ ධීවර පවුල් සඳහා සමාජ ආරක්ෂණ විශ්‍රාම වැටුප්, නිවාස ආධාර සහ කාන්තා ව්‍යවසායකත්ව උපකරණ බෙදාහැරීම.",
            "description_ta": "சிறிய அளவிலான மீனவ குடும்பங்களுக்கான ஓய்வூதியம் மற்றும் வாழ்வாதார உதவித் திட்டங்கள்.",
            "location_en": "Eastern & Northern Province",
            "location_si": "නැගෙනහිර සහ උතුරු පළාත",
            "location_ta": "கிழக்கு & வடக்கு மாகாணம்",
            "published_date": "2026-06-30",
            "display_date": "30 June 2026",
            "duration": "4:52",
            "video_url": "https://www.youtube.com/watch?v=M7lc1UVf-VE",
            "youtube_id": "M7lc1UVf-VE",
            "thumbnail_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "thumbnail_alt": "Community welfare meeting with coastal fishers",
        },
    ]

    for item in videos_data:
        obj, created = VideoItem.objects.update_or_create(
            slug=item["slug"],
            defaults=item,
        )
        print(f"  {'Created' if created else 'Updated'}: [{obj.slug}] - {obj.title_en} (ID: {obj.youtube_id})")

    print("[SUCCESS] Videos Page Data Successfully Seeded with Valid YouTube IDs!")

if __name__ == "__main__":
    seed()
