import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from home_page.models import (
    HomeHeroSlide,
    HomeQuickAccessItem,
    HomeServicesSection,
    HomeServiceCard,
    HomeQuickInfoSection,
    HomeQuickInfoCard,
    HomeInstitutionsSection,
    HomeInstitutionCard,
)

def seed_all_hero_slides():
    print("[*] Updating & Seeding all 4 Hero Banner Slides into Django Database...")

    slides_data = [
        {
            "order": 1,
            "eyebrow_en": "Official Government Website",
            "title_en": "Welcome to the Ministry of",
            "highlighted_title_en": "Fisheries, Aquatic and Ocean Resources",
            "description_en": "Access trusted information, public services and development programmes supporting Sri Lanka’s fisheries sector and coastal communities.",
            "eyebrow_si": "නිල රජයේ වෙබ් අඩවිය",
            "title_si": "සාදරයෙන් පිළිගනිමු",
            "highlighted_title_si": "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය",
            "description_si": "ශ්‍රී ලංකාවේ ධීවර ක්ෂේත්‍රය සහ වෙරළබඩ ප්‍රජාව සවිබල ගන්වන විශ්වසනීය තොරතුරු, රාජ්‍ය සේවා සහ සංවර්ධන වැඩසටහන්.",
            "eyebrow_ta": "அரசின் உத்தியோகபூர்வ இணையத்தளம்",
            "title_ta": "நல்வரவு",
            "highlighted_title_ta": "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சு",
            "description_ta": "இலங்கையின் கடற்றொழில் துறை மற்றும் கடலோர சமூகங்களை வலுப்படுத்தும் உத்தியோகபூர்வ தகவல்கள் மற்றும் அபிவிருத்தித் திட்டங்கள்.",
            "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
            "image_alt": "Fishing boats at a Sri Lankan harbour representing the national fisheries sector",
            "is_active": True,
        },
        {
            "order": 2,
            "eyebrow_en": "Empowering Coastal Communities",
            "title_en": "Supporting the people who sustain",
            "highlighted_title_en": "Sri Lanka’s fisheries sector",
            "description_en": "Discover programmes, services and resources created to strengthen livelihoods, improve safety and support fishing communities.",
            "eyebrow_si": "වෙරළබඩ ප්‍රජාව සවිබල ගැන්වීම",
            "title_si": "ධීවර ක්ෂේත්‍රය සුරකින",
            "highlighted_title_si": "ධීවර ජනතාව සවිබල ගැන්වීම",
            "description_si": "ධීවර ප්‍රජාවේ ජීවනෝපාය ශක්තිමත් කිරීම, ආරක්ෂාව ඉහළ නැංවීම සහ ප්‍රජා සංවර්ධනය වෙනුවෙන් ක්‍රියාත්මක වැඩසටහන්.",
            "eyebrow_ta": "கடலோர சமூகங்களை வலுப்படுத்துதல்",
            "title_ta": "கடற்றொழில் துறையை மேம்படுத்தும்",
            "highlighted_title_ta": "மக்களுக்கான ஆதரவு சேவைகள்",
            "description_ta": "கடற்றொழில் சமூகங்களின் வாழ்வாதாரத்தை வலுப்படுத்தவும், பாதுகாப்பை உறுதிப்படுத்தவும் நடைமுறைப்படுத்தப்படும் திட்டங்கள்.",
            "image_url_fallback": "/images/home/hero-fishing-community.jpg",
            "image_alt": "Members of a Sri Lankan fishing community working near the coast",
            "is_active": True,
        },
        {
            "order": 3,
            "eyebrow_en": "Sustainable Development",
            "title_en": "Advancing responsible and productive",
            "highlighted_title_en": "aquaculture development",
            "description_en": "Learn about sustainable aquaculture, technical support, investment opportunities and initiatives that strengthen national food security.",
            "eyebrow_si": "තිරසාර සංවර්ධනය",
            "title_si": "ඵලදායී සහ තිරසාර",
            "highlighted_title_si": "ජලජීවී වගා සංවර්ධනය",
            "description_si": "දේශීය ආහාර සුරක්ෂිතතාව ශක්තිමත් කෙරෙන තිරසාර ජලජීවී වගාව, තාක්ෂණික සහාය සහ ආයෝජන අවස්ථා.",
            "eyebrow_ta": "நிலையான அபிவிருத்தி",
            "title_ta": "பொறுப்பான மற்றும் உற்பத்தித்திறன் மிக்க",
            "highlighted_title_ta": "நீரியல் வாழ்வளர்ப்பு அபிவிருத்தி",
            "description_ta": "தேசிய உணவுப் பாதுகாப்பை வலுப்படுத்தும் நிலையான நீரியல் வாழ்வளர்ப்பு, தொழில்நுட்ப உதவி மற்றும் முதலீட்டு வாய்ப்புகள்.",
            "image_url_fallback": "/images/home/hero-aquaculture.jpg",
            "image_alt": "Aquaculture farming facility supporting sustainable fish production",
            "is_active": True,
        },
        {
            "order": 4,
            "eyebrow_en": "Protecting Our Ocean",
            "title_en": "Managing aquatic resources for",
            "highlighted_title_en": "future generations",
            "description_en": "Explore policies and national initiatives focused on marine conservation, responsible resource management and healthy ocean ecosystems.",
            "eyebrow_si": "අපගේ සාගරය සුරැකීම",
            "title_si": "අනාගත පරපුර උදෙසා",
            "highlighted_title_si": "සාගර සහ ජලජ සම්පත් කළමනාකරණය",
            "description_si": "සාගර සංරක්ෂණය, වගකීම්සහගත සම්පත් කළමනාකරණය සහ නීරෝගී සාගර පාරිසරික පද්ධතියක් උදෙසා ජාතික ප්‍රතිපත්ති.",
            "eyebrow_ta": "எமது கடலைப் பாதுகாத்தல்",
            "title_ta": "எதிர்கால சந்ததிக்காக",
            "highlighted_title_ta": "கடல்சார் வள மேலாண்மை",
            "description_ta": "கடல்சார் பாதுகாப்பு, பொறுப்பான வள மேலாண்மை மற்றும் ஆரோக்கியமான கடல் சூழல் அமைப்பிற்கான தேசிய கொள்கைகள்.",
            "image_url_fallback": "/images/home/hero-ocean-resources.jpg",
            "image_alt": "Ocean and coastal environment representing marine resource protection",
            "is_active": True,
        },
    ]

    # Clear existing and insert all 4 slides
    HomeHeroSlide.objects.all().delete()
    for item in slides_data:
        HomeHeroSlide.objects.create(**item)

    print(f"[SUCCESS] {HomeHeroSlide.objects.count()} Hero Banner Slides seeded in Django database!")

if __name__ == "__main__":
    seed_all_hero_slides()
