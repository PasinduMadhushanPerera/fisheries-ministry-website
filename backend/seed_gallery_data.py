import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from gallery.models import GalleryPageHeader, GalleryAlbum, GalleryImage

def seed():
    print("[*] Seeding Gallery Page Data...")

    header, _ = GalleryPageHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Official Visual Archive"
    header.title_en = "Photo Gallery &"
    header.highlighted_title_en = "Media Collections"
    header.description_en = "Browse official high-resolution photo galleries from the Ministry of Fisheries, including fisheries development programmes, aquaculture projects, community initiatives, harbour infrastructure, and official state events."
    header.featured_badge_en = "Featured Collection"
    header.catalogue_badge_en = "Photo Albums"
    header.library_title_en = "All Photo Collections & State Albums"

    header.badge_text_si = "නිල ඡායාරූප ලේඛනාගාරය"
    header.title_si = "ඡායාරූප ගැලරිය සහ"
    header.highlighted_title_si = "මාධ්‍ය එකතු"
    header.description_si = "ධීවර අමාත්‍යාංශයේ නිල සංවර්ධන වැඩසටහන්, ජලජීවී වගා ව්‍යාපෘති, ප්‍රජා සත්කාරක ඉසව්, වරාය යටිතල පහසුකම් සහ රාජ්‍ය උත්සව පිළිබඳ උසස් තත්ත්වයේ ඡායාරූප එකතුව මෙතැනින් නරඹන්න."
    header.featured_badge_si = "විශේෂ ඡායාරූප එකතුව"
    header.catalogue_badge_si = "ඡායාරූප ඇල්බම"
    header.library_title_si = "සියලු ඡායාරූප එකතු සහ ඇල්බම"

    header.badge_text_ta = "உத்தியோகபூர்வ புகைப்படக் காப்பகம்"
    header.title_ta = "புகைப்பட தொகுப்பு &"
    header.highlighted_title_ta = "ஊடக ஆவணங்கள்"
    header.description_ta = "கடற்றொழில் அமைச்சின் உத்தியோகபூர்வ அபிவிருத்தி திட்டங்கள், நீரியல் வளர்ப்பு திட்டங்கள், சமூக நலன்புரி நிகழ்வுகள் மற்றும் துறைமுக உட்கட்டமைப்பு புகைப்படங்கள்."
    header.featured_badge_ta = "முக்கிய புகைப்பட தொகுப்பு"
    header.catalogue_badge_ta = "புகைப்பட ஆல்பங்கள்"
    header.library_title_ta = "அனைத்து உத்தியோகபூர்வ புகைப்பட தொகுப்புகள்"
    header.save()

    albums_data = [
        {
            "order": 1,
            "slug": "national-fisheries-development-programme",
            "category": "official_events",
            "is_featured": True,
            "title_en": "National Fisheries Development Programme & High-Level Stakeholder Forum",
            "title_si": "ජාතික ධීවර සංවර්ධන වැඩසටහන සහ පාර්ශ්වකරුවන්ගේ සමුළුව",
            "title_ta": "தேசிய கடற்றொழில் அபிவிருத்தி திட்டம் & பங்குதாரர் மாநாடு",
            "description_en": "Highlights from the official launch of the National Fisheries Development Programme, technical sessions, and marine infrastructure exhibition.",
            "description_si": "ජාතික ධීවර සංවර්ධන වැඩසටහන නිල වශයෙන් ආරම්භ කිරීම සහ ක්ෂේත්‍ර ප්‍රදර්ශනයේ විශේෂ අවස්ථා.",
            "description_ta": "தேசிய கடற்றொழில் அபிவிருத்தி திட்டத்தின் உத்தியோகபூர்வ ஆரம்ப நிகழ்வு மற்றும் புகைப்படங்கள்.",
            "location_en": "Colombo",
            "location_si": "කොළඹ",
            "location_ta": "கொழும்பு",
            "event_date": "2026-07-20",
            "display_date": "20 July 2026",
            "cover_image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "cover_image_alt": "Officials attending National Fisheries Development Programme",
            "images": [
                {
                    "order": 1,
                    "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                    "alt_text": "Inauguration ceremony",
                    "caption_en": "Hon. Minister inaugurating the National Fisheries Summit.",
                    "caption_si": "ගරු ධීවර අමාත්‍යතුමා විසින් සමුළුව නිල වශයෙන් විවෘත කරනු ලැබූ අවස්ථාව.",
                    "caption_ta": "அமைச்சர் தேசிய கடற்றொழில் மாநாட்டை ஆரம்பித்து வைத்த காட்சி.",
                },
                {
                    "order": 2,
                    "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                    "alt_text": "Panel discussions",
                    "caption_en": "Marine scientists and policy experts addressing participants during the panel.",
                    "caption_si": "සාගර විද්‍යාඥයින් සහ ප්‍රතිපත්ති සම්පාදකයින් සාකච්ඡාවට එක්වෙමින්.",
                    "caption_ta": "விஞ்ஞானிகள் மற்றும் கொள்கை வகுப்பாளர்கள் பங்கேற்ற விவாதக் காட்சி.",
                },
                {
                    "order": 3,
                    "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                    "alt_text": "Delegates gathering",
                    "caption_en": "Delegates inspecting high-seas satellite tracking demonstrations.",
                    "caption_si": "චන්ද්‍රිකා මත්ස්‍ය ලුහුබැඳීමේ පද්ධති නිරීක්ෂණය කරන අයුරු.",
                    "caption_ta": "செய்மதி கண்காணிப்பு முறைமைகளை பார்வையிடும் காட்சி.",
                },
            ],
        },
        {
            "order": 2,
            "slug": "coastal-fisher-safety-training-programme",
            "category": "community",
            "is_featured": False,
            "title_en": "Coastal Fisher Safety & Distress Communications Training Programme",
            "title_si": "වෙරළබඩ ධීවර ආරක්ෂණ සහ ආපදා සන්නිවේදන ප්‍රායෝගික පුහුණු වැඩසටහන",
            "title_ta": "கடலோர மீனவர் பாதுகாப்பு & அவசர தொடர்பு பயிற்சித் திட்டம்",
            "description_en": "Hands-on safety training conducted for coastal multiday boat captains on marine radio, life-raft operations, and survival at sea.",
            "description_si": "මුහුදේ දිවි ගලවා ගැනීම සහ VHF සමුද්‍ර ගුවන්විදුලි සන්නිවේදනය පිළිබඳ ධීවරයින්ට ප්‍රායෝගික පුහුණුව ලබාදීම.",
            "description_ta": "கடல்சார் பாதுகாப்பு மற்றும் வானொலி இயக்க முறைமை தொடர்பான களப்பயிற்சி.",
            "location_en": "Southern Province",
            "location_si": "දකුණු පළාත",
            "location_ta": "தென் மாகாணம்",
            "event_date": "2026-07-16",
            "display_date": "16 July 2026",
            "cover_image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "cover_image_alt": "Fishers participating in coastal safety training",
            "images": [
                {
                    "order": 1,
                    "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                    "alt_text": "Life raft demonstration",
                    "caption_en": "Captains undergoing hands-on inflatable life-raft deployment drills.",
                    "caption_si": "ජීවිතාරක්ෂක බෝට්ටු භාවිතය පිළිබඳ ප්‍රායෝගික නිරූපණය.",
                    "caption_ta": "உயிர் காக்கும் மிதவைகளை பயன்படுத்தும் பயிற்சி.",
                },
                {
                    "order": 2,
                    "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                    "alt_text": "Radio operation training",
                    "caption_en": "Instructional session on VHF marine radio emergency channel broadcasting.",
                    "caption_si": "හදිසි ආපදා අවස්ථාවලදී VHF ගුවන්විදුලි සන්නිවේදනය භාවිතය පිළිබඳ උපදෙස්.",
                    "caption_ta": "VHF அவசர தொடர்பு முறைமை குறித்த விளக்கம்.",
                },
            ],
        },
        {
            "order": 3,
            "slug": "sustainable-inland-aquaculture-harvest-festival",
            "category": "aquaculture",
            "is_featured": False,
            "title_en": "Freshwater Tilapia & Giant Prawn Commercial Harvest Celebration",
            "title_si": "මිරිදිය තිලාපියා සහ කරමල් ඉස්සන් වාණිජ අස්වනු නෙලීමේ උත්සවය",
            "title_ta": "நன்னீர் திலாப்பியா மற்றும் நன்னீர் இறால் வர்த்தக அறுவடை விழா",
            "description_en": "Visual journey through NAQDA's commercial reservoir stocking initiative, community harvesting, and live fish transport logistics.",
            "description_si": "මහවැලි ජලාශ ආශ්‍රිතව NAQDA මඟින් ක්‍රියාත්මක කළ මිරිදිය මත්ස්‍ය අස්වනු නෙලීමේ උත්සවය.",
            "description_ta": "மகாவலி நீர்த்தேக்கங்களில் நன்னீர் மீன் அறுவடை மற்றும் விநியோக புகைப்படங்கள்.",
            "location_en": "Polonnaruwa & Anuradhapura",
            "location_si": "පොළොන්නරුව සහ අනුරාධපුරය",
            "location_ta": "பொலன்னறுவை & அனுராதபுரம்",
            "event_date": "2026-06-28",
            "display_date": "28 June 2026",
            "cover_image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "cover_image_alt": "Freshwater fish farming harvesting",
            "images": [
                {
                    "order": 1,
                    "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                    "alt_text": "Bountiful harvest",
                    "caption_en": "Local aquaculture cooperative members with high-grade freshwater harvest.",
                    "caption_si": "ග්‍රාමීය මත්ස්‍ය වගාකරුවන් තම උසස් අස්වැන්න ප්‍රදර්ශනය කරමින්.",
                    "caption_ta": "விவசாயிகள் தங்களது நன்னீர் மீன் அறுவடையை காட்சிப்படுத்துகின்றனர்.",
                },
                {
                    "order": 2,
                    "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                    "alt_text": "Cold transport packaging",
                    "caption_en": "Insulated ice-box loading for provincial urban distribution.",
                    "caption_si": "අගනගරය වෙත බෙදාහැරීම සඳහා අයිස් පෙට්ටිවල ඇසුරුම් කිරීම.",
                    "caption_ta": "நகர்ப்புற விநியோகத்திற்காக குளிரூட்டப்பட்ட பெட்டிகளில் ஏற்றுதல்.",
                },
            ],
        },
        {
            "order": 4,
            "slug": "beruwala-mirissa-harbour-modernization-drive",
            "category": "fisheries",
            "is_featured": False,
            "title_en": "Deep-Water Fishery Harbour Basin Deepening & Navigation Light Commissioning",
            "title_si": "ගැඹුරු මුහුදු ධීවර වරාය ද්‍රෝණි ගැඹුරු කිරීම සහ නව ආලෝක සංඥා විවෘත කිරීම",
            "title_ta": "ஆழ்கடல் மீன்பிடித் துறைமுக தூர்வாருதல் & கலங்கரை விளக்கு திறப்பு விழா",
            "description_en": "Engineering works and infrastructure upgrades at Beruwala, Mirissa, and Galle fishery harbours expanding vessel berthing capacity.",
            "description_si": "බේරුවල, මිරිස්ස සහ ගාල්ල ධීවර වරායන්හි නැංගුරම්ලෑමේ ධාරිතාව ඉහළ නැංවීමේ ඉංජිනේරුමය වැඩපිළිවෙළ.",
            "description_ta": "பேருவளை மற்றும் மிரிஸ்ஸ துறைமுகங்களில் படகு நிறுத்துமிடங்களை விரிவுபடுத்தும் பணிகள்.",
            "location_en": "Beruwala & Mirissa",
            "location_si": "බේරුවල සහ මිරිස්ස",
            "location_ta": "பேருவளை & மிரிஸ்ஸ",
            "event_date": "2026-06-15",
            "display_date": "15 June 2026",
            "cover_image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "cover_image_alt": "Harbour infrastructure engineering",
            "images": [
                {
                    "order": 1,
                    "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                    "alt_text": "Harbour dredging cutter suction",
                    "caption_en": "Modern cutter-suction dredger expanding the harbour mouth entrance.",
                    "caption_si": "වරාය පිවිසුම් මාර්ගය ගැඹුරු කිරීමේ නූතන වැලි හෑරීමේ මෙහෙයුම.",
                    "caption_ta": "துறைமுக வாயிலை ஆழமாக்கும் தூர்வாரும் பணி.",
                },
            ],
        },
        {
            "order": 5,
            "slug": "marine-sanctuary-coral-reef-conservation-survey",
            "category": "conservation",
            "is_featured": False,
            "title_en": "Bar Reef Marine Sanctuary & Pigeon Island Biodiversity Assessment",
            "title_si": "බාර් රීෆ් සාගර අභයභූමිය සහ පරෙවි දූපත ජෛව විවිධත්ව සමීක්ෂණය",
            "title_ta": "பார் பாறை கடல் சரணாலயம் & புறா தீவு பல்லுயிர் ஆய்வு",
            "description_en": "Marine scientific expedition documenting coral recovery, endangered sea turtle nesting, and sustainable artisanal fishing buffer zones.",
            "description_si": "කොරල්පර සංරක්ෂණය සහ මුහුදු කැස්බෑ බිත්තර දැමීමේ කලාප ආරක්ෂා කිරීමේ විද්‍යාත්මක ගවේෂණය.",
            "description_ta": "பவளப்பாறை மீளுருவாக்கம் மற்றும் கடல் ஆமைகள் பாதுகாப்பு குறித்த ஆய்வுகள்.",
            "location_en": "Kalpitiya & Nilaveli",
            "location_si": "කල්පිටිය සහ නිලාවෙලි",
            "location_ta": "கற்பிட்டி & நிலாவெளி",
            "event_date": "2026-05-22",
            "display_date": "22 May 2026",
            "cover_image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "cover_image_alt": "Marine biologists surveying coral reefs",
            "images": [
                {
                    "order": 1,
                    "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                    "alt_text": "Coral reef survey underwater",
                    "caption_en": "NARA scientific divers recording healthy staghorn coral regeneration.",
                    "caption_si": "නිරෝගී කොරල්පර වර්ධනය පිළිබඳ දිය යට පර්යේෂණ සිදුකරන අයුරු.",
                    "caption_ta": "நீருக்கடியில் பவளப்பாறைகளின் வளர்ச்சியை பதிவு செய்யும் காட்சி.",
                },
            ],
        },
        {
            "order": 6,
            "slug": "fisher-women-micro-enterprise-equipment-grant",
            "category": "community",
            "is_featured": False,
            "title_en": "Empowering Coastal Fisherwomen: Value-Added Seafood Equipment Distribution",
            "title_si": "වෙරළබඩ ධීවර කාන්තාවන් සවිබල ගැන්වීම: අගය එකතු කළ මත්ස්‍ය නිෂ්පාදන උපකරණ ප්‍රදානය",
            "title_ta": "கடலோர பெண்களை வலுப்படுத்துதல்: பெறுமதி சேர்க்கப்பட்ட கடல் உணவு உபகரணங்கள் வழங்கல்",
            "description_en": "Handing over modern hygienic solar-dryers, vacuum-packaging units, and cold-storage freezers to women-led coastal co-operatives.",
            "description_si": "සූර්ය බල වියළනයන්, වැකුම් ඇසුරුම් යන්ත්‍ර සහ ශීතකරණ ධීවර කාන්තා සමිති වෙත බෙදාදීම.",
            "description_ta": "பெண்கள் கூட்டுறவு சங்கங்களுக்கு நவீன சூரிய உலர்த்திகள் மற்றும் உபகரணங்கள் வழங்கல்.",
            "location_en": "Negombo & Chilaw",
            "location_si": "මීගමුව සහ හලාවත",
            "location_ta": "நீர்கொழும்பு & சிலாபம்",
            "event_date": "2026-05-08",
            "display_date": "08 May 2026",
            "cover_image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "cover_image_alt": "Fisherwomen receiving drying and packaging machinery",
            "images": [
                {
                    "order": 1,
                    "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                    "alt_text": "Machinery handover ceremony",
                    "caption_en": "Beneficiaries receiving certified commercial solar dryer units.",
                    "caption_si": "ප්‍රතිලාභී කාන්තාවන් සූර්ය බල වියළන උපකරණ ලබාගන්නා අයුරු.",
                    "caption_ta": "பயனாளிகள் சூரிய உலர்த்தி இயந்திரங்களை பெற்றுக்கொள்கின்றனர்.",
                },
            ],
        },
    ]

    for item in albums_data:
        images_list = item.pop("images", [])
        album, created = GalleryAlbum.objects.update_or_create(
            slug=item["slug"],
            defaults=item,
        )
        print(f"  {'Created' if created else 'Updated'}: Album [{album.slug}] - {album.title_en}")

        # Seed photos
        GalleryImage.objects.filter(album=album).delete()
        for img_data in images_list:
            GalleryImage.objects.create(
                album=album,
                **img_data,
            )

    print("[SUCCESS] Gallery Page Data Successfully Seeded!")

if __name__ == "__main__":
    seed()
