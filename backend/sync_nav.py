import os
import sys
import django

sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
django.setup()

from navigation.models import MenuItem

def sync_navigation():
    # 1. Define complete navigation structure matching mainNavigation
    nav_tree = [
        {
            "title": "Home",
            "title_si": "මුල් පිටුව",
            "title_ta": "முகப்பு",
            "url": "/",
            "order": 1,
            "children": []
        },
        {
            "title": "About Us",
            "title_si": "අප ගැන",
            "title_ta": "எங்களைப் பற்றி",
            "url": "/about",
            "order": 2,
            "children": [
                {"title": "Overview", "title_si": "දළ විශ්ලේෂණය", "title_ta": "கண்ணோட்டம்", "url": "/about", "order": 1},
                {"title": "Hon. Minister", "title_si": "ගරු අමාත්‍යතුමා", "title_ta": "கௌரவ அமைச்சர்", "url": "/about/minister", "order": 2},
                {"title": "Hon. Deputy Minister", "title_si": "ගරු නියෝජ්‍ය අමාත්‍යතුමා", "title_ta": "கௌரவ பிரதி அமைச்சர்", "url": "/about/deputy-minister", "order": 3},
                {"title": "Secretary", "title_si": "අමාත්‍යාංශ ලේකම්", "title_ta": "அமைச்சின் செயலாளர்", "url": "/about/secretary", "order": 4},
                {"title": "Divisions", "title_si": "අමාත්‍යාංශ අංශ", "title_ta": "அமைச்சின் பிரிவுகள்", "url": "/about/divisions", "order": 5},
                {"title": "Organization Structure", "title_si": "සංවිධාන ව්‍යුහය", "title_ta": "நிறுவனக் கட்டமைப்பு", "url": "/about/organization-structure", "order": 6},
            ]
        },
        {
            "title": "Opportunities & Portals",
            "title_si": "අවස්ථා සහ ද්වාර",
            "title_ta": "வாய்ப்புகள் & முகப்புகள்",
            "url": "/local-training",
            "order": 3,
            "children": [
                {"title": "Local Fisheries Training", "title_si": "දේශීය ධීවර පුහුණුව", "title_ta": "உள்நாட்டுப் பயிற்சிகள்", "url": "/local-training", "order": 1},
                {"title": "Foreign Training & Fellowships", "title_si": "විදේශ පුහුණු අවස්ථා", "title_ta": "வெளிநாட்டுப் பயிற்சிகள்", "url": "/foreign-training", "order": 2},
                {"title": "Procurement & Tenders Portal", "title_si": "ප්‍රසම්පාදන සහ ටෙන්ඩර්", "title_ta": "கொள்முதல் & கேள்விப்பத்திரங்கள்", "url": "/procurement", "order": 3},
                {"title": "Recruitment & Vacancies Portal", "title_si": "වෘත්තීය බඳවාගැනීම්", "title_ta": "வேலைவாய்ப்பு ஆட்சேர்ப்பு", "url": "/recruitment", "order": 4},
            ]
        },
        {
            "title": "Media Centre",
            "title_si": "මාධ්‍ය මධ්‍යස්ථානය",
            "title_ta": "ஊடக மையம்",
            "url": "/media-centre/news",
            "order": 4,
            "children": [
                {"title": "News", "title_si": "පුවත්", "title_ta": "செய்திகள்", "url": "/media-centre/news", "order": 1},
                {"title": "Notices", "title_si": "නිවේදන", "title_ta": "அறிவித்தல்கள்", "url": "/media-centre/notices", "order": 2},
                {"title": "Press Releases", "title_si": "මාධ්‍ය නිවේදන", "title_ta": "ஊடக வெளியீடுகள்", "url": "/media-centre/press-releases", "order": 3},
                {"title": "Events", "title_si": "විශේෂ සිදුවීම්", "title_ta": "நிகழ்வுகள்", "url": "/media-centre/events", "order": 4},
                {"title": "Photo Gallery", "title_si": "ඡායාරූප ගැලරිය", "title_ta": "புகைப்பட தொகுப்பு", "url": "/media-centre/gallery", "order": 5},
                {"title": "Videos", "title_si": "වීඩියෝ දර්ශන", "title_ta": "காணொளிகள்", "url": "/media-centre/videos", "order": 6},
                {"title": "Youth Development Program", "title_si": "තරුණ සංවර්ධන වැඩසටහන", "title_ta": "இளைஞர் அபிவிருத்தி திட்டம்", "url": "/fisheries-youth-development-program", "order": 7},
            ]
        },
        {
            "title": "Statistics",
            "title_si": "සංඛ්‍යාලේඛන",
            "title_ta": "புள்ளிவிவரங்கள்",
            "url": "/statistics/at-a-glance",
            "order": 5,
            "children": [
                {"title": "Fisheries at a Glance", "title_si": "ධීවර ක්ෂේත්‍රය බැලූ බැල්මට", "title_ta": "ஒரு பார்வையில் கடற்றொழில்", "url": "/statistics/at-a-glance", "order": 1},
                {"title": "Weekly Fish Prices", "title_si": "සතිපතා මත්ස්‍ය මිල ගණන්", "title_ta": "வாராந்த மீன் விலைகள்", "url": "/statistics/weekly-fish-prices", "order": 2},
                {"title": "Monthly Fish Production", "title_si": "මාසික මත්ස්‍ය නිෂ්පාදනය", "title_ta": "மாதாந்த மீன் உற்பத்தி", "url": "/statistics/monthly-fish-production", "order": 3},
                {"title": "Annual Statistics Reports", "title_si": "වාර්ෂික සංඛ්‍යාලේඛන වාර්තා", "title_ta": "வருடாந்த புள்ளிவிவர அறிக்கைகள்", "url": "/statistics/annual-reports", "order": 4},
                {"title": "Export and Import", "title_si": "අපනයන සහ ආනයන", "title_ta": "ஏற்றுமதி மற்றும் இறக்குமதி", "url": "/statistics/export-and-import", "order": 5},
                {"title": "Fishery Related Information", "title_si": "ධීවර ආශ්‍රිත තොරතුරු", "title_ta": "கடற்றொழில் சார்ந்த தகவல்கள்", "url": "/statistics/related-information", "order": 6},
            ]
        },
        {
            "title": "RTI",
            "title_si": "තොරතුරු දැනගැනීමේ අයිතිය",
            "title_ta": "தகவல் அறியும் உரிமை",
            "url": "/rti",
            "order": 6,
            "children": []
        },
        {
            "title": "Downloads",
            "title_si": "බාගත කිරීම්",
            "title_ta": "பதிவிறக்கங்கள்",
            "url": "/downloads",
            "order": 7,
            "children": [
                {"title": "Human Resource Development Plan", "title_si": "මානව සම්පත් සංවර්ධන සැලැස්ම", "title_ta": "மனித வள அபிவிருத்தித் திட்டம்", "url": "/downloads?category=hr-development", "order": 1},
                {"title": "Performance Report", "title_si": "කාර්යසාධන වාර්තාව", "title_ta": "செயல்திறன் அறிக்கை", "url": "/downloads?category=performance-report", "order": 2},
                {"title": "Progress Report", "title_si": "ප්‍රගති වාර්තාව", "title_ta": "முன்னேற்ற அறிக்கை", "url": "/downloads?category=progress-report", "order": 3},
                {"title": "Annual Statistics", "title_si": "වාර්ෂික සංඛ්‍යාලේඛන", "title_ta": "வருடாந்த புள்ளிவிவரங்கள்", "url": "/downloads?category=annual-statistics", "order": 4},
                {"title": "Action Plan", "title_si": "ක්‍රියාකාරී සැලැස්ම", "title_ta": "செயற்பாட்டுத் திட்டம்", "url": "/downloads?category=action-plan", "order": 5},
                {"title": "Physical and Financial Progress Report", "title_si": "භෞතික හා මුදල් ප්‍රගති වාර්තාව", "title_ta": "பௌதீக සහ මුදල් ප්‍රගති වාර්තාව", "url": "/downloads?category=physical-financial-progress", "order": 6},
                {"title": "Others", "title_si": "වෙනත්", "title_ta": "மற்றவை", "url": "/downloads?category=others", "order": 7},
            ]
        },
        {
            "title": "Contact Us",
            "title_si": "සම්බන්ධ වන්න",
            "title_ta": "தொடர்பு கொள்ள",
            "url": "/contact",
            "order": 8,
            "children": []
        },
    ]

    print("Updating existing menu items with translations...")
    for item_data in nav_tree:
        children_data = item_data.pop("children")
        parent_item = MenuItem.objects.filter(url=item_data["url"], parent__isnull=True).first()
        if not parent_item:
            parent_item = MenuItem.objects.filter(title=item_data["title"], parent__isnull=True).first()

        if parent_item:
            parent_item.title_si = item_data.get("title_si", "")
            parent_item.title_ta = item_data.get("title_ta", "")
            parent_item.save()
            print(f"Updated top-level: {parent_item.title} -> si: {parent_item.title_si}")
        else:
            parent_item = MenuItem.objects.create(**item_data, is_active=True)
            print(f"Created top-level: {parent_item.title}")

        for child in children_data:
            child_item = MenuItem.objects.filter(url=child["url"], parent=parent_item).first()
            if not child_item:
                child_item = MenuItem.objects.filter(title=child["title"], parent=parent_item).first()

            if child_item:
                child_item.title_si = child.get("title_si", "")
                child_item.title_ta = child.get("title_ta", "")
                child_item.save()
                print(f"  Updated child: {child_item.title} -> si: {child_item.title_si}")
            else:
                child_item = MenuItem.objects.create(**child, parent=parent_item, is_active=True)
                print(f"  Created child: {child_item.title}")

if __name__ == "__main__":
    sync_navigation()
