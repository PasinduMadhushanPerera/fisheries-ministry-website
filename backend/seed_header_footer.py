import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from header_footer.models import HeaderSetting, FooterSetting, FooterLink


def seed_header_footer_data():
    print("[*] Seeding Header & Footer CMS Models...")

    # 1. Header Setting
    HeaderSetting.objects.update_or_create(
        id=1,
        defaults={
            "government_name": "Government of Sri Lanka",
            "ministry_name": "Ministry of Fisheries, Aquatic and Ocean Resources",
            "tagline": "Sustainable fisheries, aquatic resources and public services",
            "logo_url_fallback": "/images/government/logo.jpg",
            "logo_alt": "Emblem of the Government of Sri Lanka",
            "hotline_phone": "+94 112 327 060",
            "email": "info@fisheries.gov.lk",
            "help_link_text": "Get help & contact",
            "help_link_url": "/contact",
            "gov_link_text": "Gov.lk",
            "gov_link_url": "https://www.gov.lk/",
            "search_placeholder": "Search this website",
            "enable_emergency_banner": False,
            "emergency_banner_text": "",
            "emergency_banner_link": "",
        },
    )
    print("[+] Header Settings updated.")

    # 2. Footer Setting
    FooterSetting.objects.update_or_create(
        id=1,
        defaults={
            "government_badge": "Government of Sri Lanka",
            "ministry_name": "Ministry of Fisheries, Aquatic and Ocean Resources",
            "about_text": "Providing public information, official announcements, downloadable forms, and institutional access for Sri Lanka's fisheries, aquaculture, and ocean resources sector.",
            "gov_portal_label": "Visit Sri Lanka Gov.lk",
            "gov_portal_url": "https://www.gov.lk/",
            "hq_address": "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
            "telephone": "+94 112 327 060",
            "email": "info@fisheries.gov.lk",
            "copyright_text": "Ministry of Fisheries, Aquatic and Ocean Resources. Official Government Website.",
        },
    )
    print("[+] Footer Settings updated.")

    # 3. Footer Links
    if not FooterLink.objects.exists():
        links = [
            # Column 2: Quick Links
            ("quick", 1, "Downloads Centre", "/downloads", False),
            ("quick", 2, "About the Ministry", "/about/overview", False),
            ("quick", 3, "Fisheries Institutions", "/institutions", False),

            # Column 3: Information & Portals
            ("info", 1, "News & Media Centre", "/media-centre", False),
            ("info", 2, "Public Notices", "/media-centre/notices", False),
            ("info", 3, "Events & Programmes", "/media-centre/events", False),
            ("info", 4, "Fisheries Statistics", "/statistics", False),
            ("info", 5, "Right to Information (RTI)", "/rti", False),

            # Column 4: Contact & Support Links
            ("support", 1, "Contact HQ & Directory", "/contact", False),
            ("support", 2, "Frequently Asked Questions", "/contact#contact-faq", False),
            ("support", 3, "Accessibility Statement", "/accessibility", False),

            # Bottom Bar Legal Links
            ("legal", 1, "Privacy Policy", "/privacy", False),
            ("legal", 2, "Terms of Use", "/terms-of-use", False),
            ("legal", 3, "Accessibility Statement", "/accessibility", False),
        ]

        for col, order, label, url, ext in links:
            FooterLink.objects.create(
                column=col,
                order=order,
                label=label,
                url=url,
                is_external=ext,
                is_active=True,
            )
        print("[+] 14 Footer Links seeded.")

    print("[SUCCESS] Header & Footer CMS Models Seeded Successfully!")


if __name__ == "__main__":
    seed_header_footer_data()
