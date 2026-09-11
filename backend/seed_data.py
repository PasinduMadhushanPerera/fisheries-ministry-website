import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth.models import User
from pages.models import DynamicPage
from navigation.models import MenuItem
from core_content.models import InstitutionEntity, SiteSetting, PressRelease


def seed_all():
    print("[*] Starting Seed Process...")

    # 1. Superuser
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@fisheries.gov.lk", "admin123")
        print("[+] Superuser created -> Username: 'admin', Password: 'admin123'")
    else:
        print("[i] Superuser 'admin' already exists.")

    # 2. Site Settings
    setting, _ = SiteSetting.objects.get_or_create(
        id=1,
        defaults={
            "ministry_name": "Ministry of Fisheries, Aquatic and Ocean Resources",
            "hotline_number": "+94 11 244 6183",
            "general_email": "info@fisheries.gov.lk",
            "address": "Ministry of Fisheries, New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
            "working_hours": "Monday - Friday: 8:30 AM - 4:15 PM",
        },
    )
    print("[+] Global Site Settings verified.")

    # 3. Dynamic Navigation Menus
    if not MenuItem.objects.exists():
        # Top-level Tabs
        home = MenuItem.objects.create(title="Home", url="/", order=1)
        about = MenuItem.objects.create(title="About Us", url="/about", order=2)
        opportunities = MenuItem.objects.create(title="Opportunities & Portals", url="/procurement", order=3)
        institutions = MenuItem.objects.create(title="Institutions", url="/institutions", order=4)
        media = MenuItem.objects.create(title="Media Centre", url="/media-centre", order=5)
        contact = MenuItem.objects.create(title="Contact Us", url="/contact", order=6)

        # About Dropdown Children
        MenuItem.objects.create(parent=about, title="Overview", url="/about/overview", description="Vision, mission, and sector background", order=1)
        MenuItem.objects.create(parent=about, title="Hon. Minister", url="/about/minister", description="Cabinet Minister profile and message", order=2)
        MenuItem.objects.create(parent=about, title="Hon. Deputy Minister", url="/about/deputy-minister", description="Deputy Minister profile and focus", order=3)
        MenuItem.objects.create(parent=about, title="Ministry Secretary", url="/about/secretary", description="Executive administration overview", order=4)
        MenuItem.objects.create(parent=about, title="Divisions & Units", url="/about/divisions", description="Ministry directorates and departments", order=5)
        MenuItem.objects.create(parent=about, title="Organization Structure", url="/about/organization-structure", description="Governance hierarchy and chart", order=6)

        # Opportunities Dropdown Children
        MenuItem.objects.create(parent=opportunities, title="Procurement & Tenders", url="/procurement", badge="Tenders", description="Government tenders and bidding notices", order=1)
        MenuItem.objects.create(parent=opportunities, title="Career Recruitment", url="/recruitment", badge="Careers", description="Job vacancies and circulars", order=2)
        MenuItem.objects.create(parent=opportunities, title="Local Training", url="/local-training", badge="Training", description="Fisheries and maritime skills courses", order=3)
        MenuItem.objects.create(parent=opportunities, title="Foreign Training", url="/foreign-training", badge="Exchange", description="Technical scholarship and study visits", order=4)
        MenuItem.objects.create(parent=opportunities, title="Internal Affairs Unit", url="/internal-affairs", badge="Portal", description="Public complaints and oversight portal", order=5)
        MenuItem.objects.create(parent=opportunities, title="Weather Forecast", url="https://www.meteo.gov.lk", is_external=True, badge="Meteo", description="Live marine sea conditions and weather updates", order=6)

        # Media Centre Dropdown Children
        MenuItem.objects.create(parent=media, title="News Articles", url="/media-centre/news", order=1)
        MenuItem.objects.create(parent=media, title="Press Releases", url="/media-centre/press-releases", order=2)
        MenuItem.objects.create(parent=media, title="Public Notices", url="/media-centre/notices", order=3)
        MenuItem.objects.create(parent=media, title="Photo Gallery", url="/media-centre/gallery", order=4)
        MenuItem.objects.create(parent=media, title="Video Highlights", url="/media-centre/videos", order=5)

        print("[+] Seeded Full Dynamic Navigation Menu Tree.")
    else:
        print("[i] Navigation menu items already exist.")

    # 4. Sample Dynamic Custom Page
    if not DynamicPage.objects.filter(slug="marine-safety-initiative").exists():
        DynamicPage.objects.create(
            title="National Marine Safety & Coastal Protection Initiative",
            slug="marine-safety-initiative",
            hero_title="National Marine Safety & Vessel Tracking Initiative",
            hero_subtitle="A comprehensive national project equipping multiday fishing craft with satellite transponders, advanced distress beacons, and modern seamanship training.",
            badge_text="Strategic National Project",
            content="""
            <h2>Protecting Our Seafarers and Coastal Marine Resources</h2>
            <p>The Ministry of Fisheries, Aquatic and Ocean Resources has launched the <strong>National Marine Safety & Coastal Protection Initiative</strong> to ensure the welfare, safety, and sustainable livelihood of artisanal and multiday fishers across Sri Lanka.</p>
            
            <h3>Key Objectives of the Initiative:</h3>
            <ul>
                <li><strong>Vessel Monitoring Systems (VMS):</strong> Equipping multiday vessels with real-time satellite transponders for rapid search and rescue operations.</li>
                <li><strong>Emergency Distress Beacons:</strong> Distributing EPIRB and AIS safety equipment subsidized by the Ministry.</li>
                <li><strong>Harbour Modernization:</strong> Upgrading breakwaters, navigational lighting, and fuel bunkering at major fishery harbours.</li>
                <li><strong>Capacity Building:</strong> Seamanship and marine electronics training for coastal fishing youth.</li>
            </ul>

            <blockquote style="border-left: 4px solid #256B29; padding-left: 1rem; color: #1e293b; font-style: italic; background: #f0fdf4; padding: 1rem; border-radius: 0.5rem;">
                "Our highest priority is ensuring that every fisher who ventures into our Exclusive Economic Zone returns home safely to their families with sustainable catch."
            </blockquote>

            <h3>Implementation Timeline & Eligibility</h3>
            <p>Vessel owners registered with the Department of Fisheries and Aquatic Resources (DFAR) can submit applications at their local District Fisheries Extension Offices.</p>
            """,
            show_sidebar=True,
            sidebar_title="Project Coordination Desk",
            sidebar_content="<p><strong>Hotline:</strong> +94 11 244 6183<br/><strong>Email:</strong> safety@fisheries.gov.lk<br/><strong>Office:</strong> Marine Operations Division, Level 4, New Secretariat, Colombo 10</p>",
            is_published=True,
            meta_title="National Marine Safety Initiative - Ministry of Fisheries",
            meta_description="Learn about the Ministry's Vessel Monitoring Systems, emergency beacons, and fisher safety programs.",
        )
        print("[+] Sample Dynamic Page 'marine-safety-initiative' created.")

    # 5. Institutions Seed
    institutions_data = [
        ("DFAR", "Department of Fisheries & Aquatic Resources", "Responsible for fisheries management, vessel registration, licensing, and marine enforcement across Sri Lanka.", "https://fisheriesdept.gov.lk/", 1),
        ("NARA", "National Aquatic Resources Research Agency", "Conducts scientific research in oceanography, marine biology, fisheries management, and aquatic environment.", "http://www.nara.ac.lk/", 2),
        ("NAQDA", "National Aquaculture Development Authority", "Drives sustainable inland fisheries, commercial shrimp farming, seed production, and freshwater aquaculture.", "https://naqda.gov.lk/", 3),
        ("CFHC", "Ceylon Fishery Harbours Corporation", "Constructs, manages, and operates fishery harbours, anchorage facilities, and maritime safety infrastructure.", "https://cfhc.gov.lk/", 4),
        ("CFC", "Ceylon Fisheries Corporation", "Manages commercial fish purchasing, cold storage facilities, fish processing, and islandwide distribution.", "https://cfc.gov.lk/", 5),
        ("CNFL", "CEY-NOR FOUNDATION LTD", "Specializes in fiberglass boat manufacturing, marine vessel construction, and modern fishing gear technology.", "https://www.ceynor.gov.lk/", 6),
        ("NSL", "North Sea Ltd", "Operates state-of-the-art fishing net manufacturing plants supplying high-quality netting products to local fishers.", "https://northsea.lk/", 7),
    ]

    for acronym, title, desc, url, order in institutions_data:
        InstitutionEntity.objects.get_or_create(
            acronym=acronym,
            defaults={
                "title": title,
                "description": desc,
                "website_url": url,
                "order": order,
                "is_active": True,
            },
        )
    print("[+] Seeded Official Institutions Entities.")

    print("[SUCCESS] All Seeds Finished Successfully!")


if __name__ == "__main__":
    seed_all()
