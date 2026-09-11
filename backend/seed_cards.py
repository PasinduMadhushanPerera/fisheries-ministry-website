import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from home_page.models import HomeInstitutionCard, HomeNewsCard


def seed_cards():
    print("[*] Seeding Home Institution Cards and News Cards...")

    # 1. Institutions Cards (All 8 institutions)
    institutions_data = [
        (
            1,
            "DFAR",
            "Department of Fisheries & Aquatic Resources",
            "Responsible for fisheries management, vessel registration, licensing, and marine enforcement across Sri Lanka.",
            "https://fisheriesdept.gov.lk/",
            True,
            "/images/institutions/dfar.jpg",
            "Department of Fisheries and Aquatic Resources Logo",
        ),
        (
            2,
            "NARA",
            "National Aquatic Resources Research Agency",
            "Conducts scientific research in oceanography, marine biology, fisheries management, and aquatic environment.",
            "http://www.nara.ac.lk/",
            True,
            "/images/institutions/nara.jpg",
            "National Aquatic Resources Research Agency Logo",
        ),
        (
            3,
            "NAQDA",
            "National Aquaculture Development Authority",
            "Drives sustainable inland fisheries, commercial shrimp farming, seed production, and freshwater aquaculture.",
            "https://naqda.gov.lk/",
            True,
            "/images/institutions/naqda.jpg",
            "National Aquaculture Development Authority Logo",
        ),
        (
            4,
            "CFHC",
            "Ceylon Fishery Harbours Corporation",
            "Constructs, manages, and operates fishery harbours, anchorage facilities, and maritime safety infrastructure.",
            "https://cfhc.gov.lk/",
            True,
            "/images/institutions/cfhc.jpg",
            "Ceylon Fishery Harbours Corporation Logo",
        ),
        (
            5,
            "CFC",
            "Ceylon Fisheries Corporation",
            "Manages commercial fish purchasing, cold storage facilities, fish processing, and islandwide distribution.",
            "https://cfc.gov.lk/",
            True,
            "/images/institutions/cfc.jpg",
            "Ceylon Fisheries Corporation Logo",
        ),
        (
            6,
            "CNFL",
            "CEY-NOR FOUNDATION LTD",
            "Specializes in fiberglass boat manufacturing, marine vessel construction, and modern fishing gear technology.",
            "https://www.ceynor.gov.lk/",
            True,
            "/images/institutions/cnfl.jpg",
            "CEY-NOR Foundation Ltd Logo",
        ),
        (
            7,
            "NSL",
            "North Sea Ltd",
            "Operates state-of-the-art fishing net manufacturing plants supplying high-quality netting products to local fishers.",
            "https://northsea.lk/",
            True,
            "/images/institutions/nsl.jpg",
            "North Sea Ltd Logo",
        ),
        (
            8,
            "OTHER",
            "Other Sector Organisations",
            "Explore statutory boards, provincial fisheries bodies, and partner institutions under Ministry jurisdiction.",
            "/institutions",
            False,
            "/images/institutions/other.jpg",
            "Other Ministry Institutions and Affiliates",
        ),
    ]

    for order, acronym, title, desc, url, ext, img, alt in institutions_data:
        HomeInstitutionCard.objects.get_or_create(
            acronym=acronym,
            defaults={
                "order": order,
                "title": title,
                "description": desc,
                "url": url,
                "is_external": ext,
                "image_url_fallback": img,
                "image_alt": alt,
                "is_active": True,
            },
        )
    print("[+] 8 Institution Cards seeded.")

    # 2. News Cards (3 sample news cards)
    if not HomeNewsCard.objects.exists():
        news_data = [
            (
                1,
                "Ministry launches national sustainable aquaculture programme",
                "Development",
                "A nationwide initiative to enhance freshwater and coastal aquaculture production while preserving marine ecosystems.",
                "<p>The Ministry of Fisheries has initiated a comprehensive sustainable aquaculture development program across designated coastal zones, supporting over 20,000 community farmers with modern seed hatcheries and technical extensions.</p>",
                True,
            ),
            (
                2,
                "New safety guidelines issued for multiday fishing vessels",
                "Maritime Safety",
                "Updated maritime safety protocols and equipment standards published for all registered multiday fishing craft.",
                "<p>Under new Ministry directives, vessel tracking transponders and emergency beacon checks are mandatory prior to port clearance, significantly improving sea safety during monsoon seasons.</p>",
                False,
            ),
            (
                3,
                "Cold chain modernization project approved for major harbours",
                "Infrastructure",
                "Infrastructure upgrade programme to reduce post-harvest losses and improve international seafood export quality.",
                "<p>State-of-the-art flake ice plants and temperature-controlled storage rooms are being installed at Galle, Beruwala, and Trincomalee fishery harbours under the initial phase.</p>",
                False,
            ),
        ]
        for order, title, cat, summary, content, feat in news_data:
            HomeNewsCard.objects.create(
                order=order,
                title=title,
                category=cat,
                summary=summary,
                content=content,
                is_featured=feat,
                is_active=True,
            )
        print("[+] 3 Home News Cards seeded.")

    print("[SUCCESS] All Cards Seeded Successfully!")


if __name__ == "__main__":
    seed_cards()
