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
)


def seed_homepage():
    print("[*] Seeding Homepage CMS Models...")

    # 1. Hero Slides
    if not HomeHeroSlide.objects.exists():
        slides = [
            (
                1,
                "Official Government Website",
                "Welcome to the Ministry of",
                "Fisheries, Aquatic and Ocean Resources",
                "Access trusted information, public services and development programmes supporting Sri Lanka’s fisheries sector and coastal communities.",
                "/images/home/hero-fishing-harbour.jpg",
                "Fishing boats at a Sri Lankan harbour representing the national fisheries sector",
            ),
            (
                2,
                "Empowering Coastal Communities",
                "Supporting the people who sustain",
                "Sri Lanka’s fisheries sector",
                "Discover programmes, services and resources created to strengthen livelihoods, improve safety and support fishing communities.",
                "/images/home/hero-fishing-community.jpg",
                "Members of a Sri Lankan fishing community working near the coast",
            ),
            (
                3,
                "Sustainable Development",
                "Advancing responsible and productive",
                "aquaculture development",
                "Learn about sustainable aquaculture, technical support, investment opportunities and initiatives that strengthen national food security.",
                "/images/home/hero-aquaculture.jpg",
                "Aquaculture farming facility supporting sustainable fish production",
            ),
            (
                4,
                "Protecting Our Ocean",
                "Managing aquatic resources for",
                "future generations",
                "Explore policies and national initiatives focused on marine conservation, responsible resource management and healthy ocean ecosystems.",
                "/images/home/hero-ocean-resources.jpg",
                "Ocean and coastal environment representing marine resource protection",
            ),
        ]
        for order, eyebrow, title, h_title, desc, img_fallback, alt in slides:
            HomeHeroSlide.objects.create(
                order=order,
                eyebrow=eyebrow,
                title=title,
                highlighted_title=h_title,
                description=desc,
                image_url_fallback=img_fallback,
                image_alt=alt,
                is_active=True,
            )
        print("[+] 4 Hero Slides seeded.")

    # 2. Quick Access Items
    if not HomeQuickAccessItem.objects.exists():
        items = [
            (1, "News", "/media-centre/news", "Newspaper", "Go to Ministry news page"),
            (2, "Notices", "/media-centre/notices", "Bell", "Go to official notices page"),
            (3, "Downloads", "/downloads", "Download", "Go to document downloads page"),
            (4, "Divisions", "/about/divisions", "Building2", "Go to Ministry Division directory"),
            (5, "Contact", "/contact", "PhoneCall", "Go to contact Ministry page"),
        ]
        for order, title, url, icon, aria in items:
            HomeQuickAccessItem.objects.create(
                order=order,
                title=title,
                url=url,
                icon_name=icon,
                aria_label=aria,
                is_active=True,
            )
        print("[+] 5 Quick Access Items seeded.")

    # 3. Services Section Header & Cards
    services_sec, _ = HomeServicesSection.objects.get_or_create(
        id=1,
        defaults={
            "badge_text": "Ministry Portals",
            "section_title": "Services and Opportunities",
            "section_description": "Explore local training programmes, foreign technical exchange, procurement notices, career recruitment, and key public opportunities provided by the Ministry of Fisheries.",
        },
    )

    if not HomeServiceCard.objects.exists():
        cards = [
            (
                1,
                "Local Fisheries Training",
                "Capacity Development",
                "Browse local training courses, seamanship workshops and technical development programmes for Ministry staff and sector stakeholders.",
                "Explore Local Training",
                "/local-training",
                "/images/services/local-training.jpg",
                "Local fisheries training workshop in Sri Lanka",
            ),
            (
                2,
                "Foreign & Overseas Training",
                "International Exchange",
                "Discover international oceanography courses, technology exposure seminars and overseas training opportunities in partner maritime nations.",
                "Explore Foreign Training",
                "/foreign-training",
                "/images/services/foreign-training.jpg",
                "International ocean science and foreign training seminar",
            ),
            (
                3,
                "Procurement & Tenders",
                "Ministry Bidding",
                "Access official procurement opportunities, purchasing tenders, harbour construction bids and supply contracts published by the Ministry.",
                "Explore Procurement Portal",
                "/procurement",
                "/images/services/procurement.jpg",
                "Official government procurement documents and tenders",
            ),
            (
                4,
                "Recruitment & Vacancies",
                "Career Opportunities",
                "View current job opportunities, public sector vacancies, research internships and career announcements across Ministry institutions.",
                "Explore Career Vacancies",
                "/recruitment",
                "/images/services/recruitment.jpg",
                "Fisheries ministry career recruitment and job vacancies",
            ),
        ]
        for order, title, cat, desc, btn, url, img, alt in cards:
            HomeServiceCard.objects.create(
                order=order,
                title=title,
                category=cat,
                description=desc,
                button_text=btn,
                url=url,
                image_url_fallback=img,
                image_alt=alt,
                is_active=True,
            )
        print("[+] 4 Services Cards seeded.")

    # 4. Quick Info Header & Cards (Weather & Internal Affairs)
    quick_info_sec, _ = HomeQuickInfoSection.objects.get_or_create(
        id=1,
        defaults={
            "badge_text": "Public Portals & Services",
            "section_title": "Quick Information & Public Services",
            "section_description": "Access frequently used public services and important Ministry information.",
        },
    )

    if not HomeQuickInfoCard.objects.exists():
        info_cards = [
            (
                1,
                "Weather",
                "weather",
                "View today's live weather conditions, sea state updates and marine forecasts relevant to fisheries and ocean activities.",
                "View Weather",
                "https://www.meteo.gov.lk",
                True,
                "/images/home/weather.jpg",
                "Marine Weather and Ocean Sea Conditions Forecast",
            ),
            (
                2,
                "Internal Affairs Unit",
                "internal-affairs",
                "Submit complaints, report concerns, or contact the Ministry's Internal Affairs Unit regarding public services and officer conduct.",
                "Submit Complaint",
                "/internal-affairs",
                False,
                "/images/home/internal-affairs.jpg",
                "Ministry of Fisheries Internal Affairs Unit Office",
            ),
        ]
        for order, title, ctype, desc, btn, url, ext, img, alt in info_cards:
            HomeQuickInfoCard.objects.create(
                order=order,
                title=title,
                card_type=ctype,
                description=desc,
                primary_button_label=btn,
                url=url,
                is_external=ext,
                image_url_fallback=img,
                image_alt=alt,
                is_active=True,
            )
        print("[+] Quick Info Cards (Weather & Internal Affairs) seeded.")

    # 5. Institutions Section Header
    inst_sec, _ = HomeInstitutionsSection.objects.get_or_create(
        id=1,
        defaults={
            "badge_text": "Government Network",
            "section_title": "Ministry institutions and service organisations",
            "section_description": "Explore the official departments, corporations, research authorities and statutory bodies operating under the Ministry of Fisheries.",
        },
    )
    print("[+] Institutions Section Header verified.")

    print("[SUCCESS] All Homepage CMS Data Seeded Successfully!")


if __name__ == "__main__":
    seed_homepage()
