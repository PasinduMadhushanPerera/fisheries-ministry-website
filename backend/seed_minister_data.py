import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from minister_profile.models import (
    MinisterProfile,
    MinisterMessage,
    MinisterSecretariat,
    MinisterPriorityCard,
    MinisterBiography,
)


def seed_minister_data():
    print("[*] Seeding 03. Hon. Minister Profile CMS Models...")

    # 1. Minister Profile & Portrait
    MinisterProfile.objects.update_or_create(
        id=1,
        defaults={
            "badge": "Cabinet Minister",
            "name": "Hon. Ramalingam Chandrasekara",
            "role_title": "Cabinet Minister of Fisheries, Aquatic and Ocean Resources",
            "ministry_badge": "Ministry of Fisheries, Aquatic and Ocean Resources",
            "photo_fallback": "/images/leadership/minister.jpg",
            "photo_alt": "Official portrait of Hon. Ramalingam Chandrasekara",
        },
    )
    print("[+] 01. Minister Profile seeded.")

    # 2. Minister's Official Leadership Message
    MinisterMessage.objects.update_or_create(
        id=1,
        defaults={
            "eyebrow": "Minister's Official Message",
            "message_title": "Transforming Sri Lanka's Fisheries & Blue Economy",
            "message_content": "Our commitment is to drive science-based marine conservation, empower coastal fishing communities, maximize inland aquaculture production, and expand seafood export earnings while safeguarding ocean ecosystems for future generations.",
            "quote_author": "Hon. Ramalingam Chandrasekara",
            "quote_designation": "Cabinet Minister",
        },
    )
    print("[+] 02. Minister Leadership Message seeded.")

    # 3. Secretariat Office & Contact Desk
    MinisterSecretariat.objects.update_or_create(
        id=1,
        defaults={
            "box_title": "Minister's Secretariat Office",
            "box_subtitle": "Official Contact & Administration Desk",
            "office_hours": "8:30 AM – 4:15 PM",
            "office_address": "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
            "office_phone": "+94 11 244 6183",
            "office_email": "minister@fisheries.gov.lk",
            "cta_contact_button_text": "Contact Secretariat",
            "cta_contact_button_url": "/contact",
            "secondary_link_text": "View Ministry Divisions",
            "secondary_link_url": "/about/divisions",
        },
    )
    print("[+] 03. Minister Secretariat Office seeded.")

    # 4. Key Policy Priorities & Initiatives (4 cards)
    priorities_data = [
        (1, "01", "Sustainable Marine Governance", "Implementing scientific quota management, satellite Vessel Monitoring Systems (VMS), and combating IUU fishing across Sri Lanka's 517,000 sq km EEZ.", "Anchor"),
        (2, "02", "Aquaculture Expansion & Seed Stocking", "Expanding inland reservoir fish stocking, commercial shrimp culture, sea cucumber farming, and high-yield hatcheries nationwide.", "Fish"),
        (3, "03", "Harbour Modernization & Cold Chains", "Upgrading 25 major fishery harbours with modernized breakwaters, sanitary landing facilities, and cold storage to eliminate post-harvest losses.", "ShipWheel"),
        (4, "04", "Fisher Welfare & Social Security", "Direct welfare assistance, modern safety equipment distribution, specialized insurance schemes, and livelihood grants for 575,000 fisher families.", "Users"),
    ]
    for order, badge, title, desc, icon in priorities_data:
        MinisterPriorityCard.objects.update_or_create(
            order=order,
            defaults={
                "number_badge": badge,
                "title": title,
                "description": desc,
                "icon_name": icon,
                "is_active": True,
            },
        )
    print("[+] 04. 4 Minister Priority Cards seeded.")

    # 5. Biography & Career Background
    MinisterBiography.objects.update_or_create(
        id=1,
        defaults={
            "eyebrow": "Biography & Public Profile",
            "title": "Leadership Dedicated to Sri Lanka's Aquatic Wealth",
            "subtitle": "A distinguished track record of public service, regional economic development, and sustainable natural resource management.",
            "content": "<p>Hon. Ramalingam Chandrasekara was appointed Cabinet Minister of Fisheries, Aquatic and Ocean Resources to steer Sri Lanka's maritime and aquatic resources toward a resilient, prosperous, and sustainable future.</p><p>With a comprehensive vision focused on modernizing traditional fisheries infrastructure and unlocking the economic potential of Sri Lanka's Exclusive Economic Zone (EEZ), the Minister actively works to improve livelihoods across coastal and inland fishing communities.</p><p>Key achievements under his stewardship include the expansion of community-level aquaculture training, bilateral fisheries cooperation, enhanced vessel safety standards, and the introduction of digitized services for vessel registration and licensing.</p>",
            "is_active": True,
        },
    )
    print("[+] 05. Minister Biography seeded.")

    print("[SUCCESS] All 03. Hon. Minister Profile CMS Models Seeded Successfully!")


if __name__ == "__main__":
    seed_minister_data()
