import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from about.models import (
    AboutOverview,
    AboutVisionMission,
    AboutObjectiveHeader,
    AboutObjective,
    AboutLeadershipHeader,
    AboutLeader,
    AboutOrganizationStructure,
    AboutDepartmentHeader,
    AboutDepartmentCard,
    AboutTimelineHeader,
    AboutTimelineEvent,
    AboutCTA,
    AboutDivision,
)


def seed_about_data():
    print("[*] Seeding 13 About Us CMS Models...")

    # 1. Ministry Overview & Key Public Pillars
    AboutOverview.objects.update_or_create(
        id=1,
        defaults={
            "eyebrow": "Ministry Overview",
            "title": "Serving the fisheries sector and the nation",
            "description": "Fishing has a long tradition in Sri Lanka spanning over two thousand years. From traditional coastal livelihoods to a multibillion-rupee modern industry, the Ministry provides leadership, regulatory oversight, and sustainable development.",
            "legacy_title": "Historical Legacy & Sector Evolution",
            "legacy_content": "Marine fishing has gradually developed from a traditional coastal livelihood activity to a multibillion-rupee industry since Sri Lanka obtained independence in 1948. Inland fishing and aquaculture are recent developments over the last 75 years, with coastal shrimp farming commencing in the 1980s and marine aquaculture expanding rapidly since 2010.",
            "economic_title": "Economic Impact & Resource Base",
            "economic_content": "The sector contributes around 1.4% to the national Gross Domestic Product (GDP), providing direct and indirect employment to approximately 575,000 individuals (3.7% of the nation's workforce). Annual fish production exceeds 530,000 metric tons valued at over USD 1.3 Billion, with export earnings topping USD 250 Million annually.",
            "economic_subcontent": "Local production currently satisfies 65% of national fish consumption. The Ministry is committed to fulfilling 100% of national consumption from local fisheries and sustainable aquaculture while expanding export revenues.",
            "stat_1_value": "517,000",
            "stat_1_label": "Sq km EEZ Zone",
            "stat_2_value": "575,000",
            "stat_2_label": "Active Workforce",
            "stat_3_value": "530,000",
            "stat_3_label": "MT Annual Yield",
            "stat_4_value": "$250M+",
            "stat_4_label": "Export Earnings",
            "cta_button_text": "Explore Ministry Institutions",
            "cta_button_url": "/institutions",
            "pillar_mandate_badge": "Strategic Mandate",
            "pillar_mandate_title": "Key Public Pillars",
            "pillar_1_title": "National fisheries development",
            "pillar_1_description": "Supporting the responsible development of fisheries, aquaculture and related economic activities.",
            "pillar_2_title": "Community-focused public services",
            "pillar_2_description": "Improving access to information, services and institutional support for fisheries communities.",
            "pillar_3_title": "Responsible resource management",
            "pillar_3_description": "Promoting the sustainable use, conservation and protection of aquatic and ocean resources.",
            "benefit_banner_title": "National Protein & Economic Security",
            "benefit_banner_text": "Ensuring sustainable marine conservation while supplying nutritious food to Sri Lanka.",
        },
    )
    print("[+] 01. Overview & Key Public Pillars seeded.")

    # 2. Vision & Mission Section
    AboutVisionMission.objects.update_or_create(
        id=1,
        defaults={
            "eyebrow": "Our Direction",
            "title": "Vision and Mission",
            "description": "Guiding Sri Lanka's fisheries and ocean sector toward sustainable growth and community prosperity.",
            "vision_badge": "Vision",
            "vision_heading": "Sustainable Aquatic Wealth",
            "vision_description": "To be the leading contributor to the national economy through sustainable utilization and conservation of fisheries and ocean resources, ensuring nutritional security, enhanced livelihoods for fishing communities, and world-class aquatic stewardship.",
            "vision_footer": "National Fisheries Sector Strategy",
            "mission_badge": "Mission",
            "mission_heading": "Empowered Fishing Communities",
            "mission_description": "Providing regulatory leadership, technological adoption, high-yield aquaculture, and social security for fishing communities while preserving marine ecosystems through evidence-based policies and transparent institutional governance.",
            "mission_footer": "National Fisheries Sector Strategy",
        },
    )
    print("[+] 02. Vision & Mission Section seeded.")

    # 3. Policy Objectives : Header
    AboutObjectiveHeader.objects.update_or_create(
        id=1,
        defaults={
            "eyebrow": "Policy Objectives",
            "title": "Objectives of the Sector Policy",
            "description": "The Government envisages achieving the following objectives from implementation of the new Policy in the fisheries and aquaculture sector.",
        },
    )
    print("[+] 03. Policy Objectives Header seeded.")

    # 4. Policy Objectives : Cards (9 objectives matching website)
    objectives_data = [
        (1, "01", "Science-Based Resource Management", "Sustainable management of resources using science-based information.", "Database"),
        (2, "02", "Global & Regional Obligations", "Compliance with regional and international obligations.", "Globe"),
        (3, "03", "Marine Fisheries Production", "Increased marine fisheries production across territorial waters.", "Anchor"),
        (4, "04", "Aquaculture & Inland Growth", "Increased aquaculture and inland fisheries production.", "Fish"),
        (5, "05", "Post-Harvest & Value Addition", "Minimized post-harvest losses and increased value addition.", "TrendingUp"),
        (6, "06", "Export Earnings Growth", "Increased export earnings through premium seafood production.", "BarChart3"),
        (7, "07", "Nutrition & Consumption", "Increased per capita consumption of fish nationwide.", "HeartPulse"),
        (8, "08", "Leisure, Jobs & Enterprise", "Improved opportunities for leisure, employment and enterprises development.", "Briefcase"),
        (9, "09", "Fisher Community Wellbeing", "Improved socio-economic activities of the fisher community.", "Users"),
    ]
    for order, badge, title, desc, icon in objectives_data:
        AboutObjective.objects.update_or_create(
            order=order,
            defaults={
                "number_badge": badge,
                "title": title,
                "description": desc,
                "icon_name": icon,
                "is_active": True,
            },
        )
    print("[+] 04. 9 Policy Objectives Cards seeded.")

    # 5. Ministry Leadership : Header
    AboutLeadershipHeader.objects.update_or_create(
        id=1,
        defaults={
            "eyebrow": "Leadership",
            "title": "Ministry leadership",
            "description": "Executive leadership of the Ministry of Fisheries, Aquatic and Ocean Resources.",
        },
    )
    print("[+] 05. Ministry Leadership Header seeded.")

    # 6. Executive Leadership Profiles : Cards
    leaders_data = [
        (
            "minister",
            1,
            "Hon. Ramalingam Chandrasekara",
            "Hon. Minister",
            "Ministry of Fisheries, Aquatic and Ocean Resources",
            "Provides cabinet leadership, strategic direction, and policy formulation for Sri Lanka's fisheries, marine conservation, and ocean economy.",
            "Transforming Sri Lanka's Fisheries & Blue Economy",
            "Our commitment is to drive science-based marine conservation, empower coastal fishing communities, maximize inland aquaculture production, and expand seafood export earnings while safeguarding ocean ecosystems for future generations.",
            "<p>Hon. Ramalingam Chandrasekara was appointed Cabinet Minister of Fisheries, Aquatic and Ocean Resources to lead the national transformation of Sri Lanka's maritime and aquatic resources.</p>",
            "/images/leadership/minister.jpg",
            "Official portrait of Hon. Ramalingam Chandrasekara",
            "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
            "+94 11 244 6183",
            "info@fisheries.gov.lk",
            "8:30 AM – 4:15 PM",
            "/about/minister",
        ),
        (
            "deputy_minister",
            2,
            "Hon. Rathna Gamage",
            "Hon. Deputy Minister",
            "Ministry of Fisheries, Aquatic and Ocean Resources",
            "Assists in political leadership, regional development initiatives, harbor infrastructure enhancements, and community welfare programs.",
            "Empowering Regional Fisheries Communities & Infrastructure",
            "Our focus is on delivering efficient public administration, upgrading regional harbour facilities, expanding local training opportunities for young fishers, and ensuring welfare support reaches every coastal community in Sri Lanka.",
            "<p>The Hon. Deputy Minister assists the Cabinet Minister in legislative coordination, district fisheries consultations, and youth training programs.</p>",
            "/images/leadership/deputy-minister.jpg",
            "Official portrait of Hon. Rathna Gamage",
            "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
            "+94 11 244 6183",
            "info@fisheries.gov.lk",
            "8:30 AM – 4:15 PM",
            "/about/deputy-minister",
        ),
        (
            "secretary",
            3,
            "Mr. B.K. Kolitha Kamal Jinadasa (PHD)",
            "Secretary",
            "Ministry of Fisheries, Aquatic and Ocean Resources",
            "Leads Ministry administration, financial oversight, institutional coordination, and policy execution.",
            "Ensuring Administrative Excellence & Sustainable Governance",
            "Our focus is to ensure transparent public administration, efficient resource allocation, scientific research integration, and seamless coordination across DFAR, NARA, NAQDA, and CFHC to serve Sri Lanka's fisheries sector effectively.",
            "<p>The Secretary to the Ministry directs institutional coordination among statutory bodies including DFAR, NARA, NAQDA, CFHC, and CFC.</p>",
            "/images/leadership/secretary.jpg",
            "Official portrait of Mr. B.K. Kolitha Kamal Jinadasa (PHD)",
            "Ministry of Fisheries, New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
            "+94 112 327 060",
            "secretary@fisheries.gov.lk",
            "8:30 AM – 4:15 PM",
            "/about/secretary",
        ),
    ]
    for role, order, name, role_title, badge, short_desc, msg_title, msg_content, bio, photo, alt, addr, phone, email, hours, page_url in leaders_data:
        AboutLeader.objects.update_or_create(
            role_type=role,
            defaults={
                "order": order,
                "name": name,
                "role_title": role_title,
                "ministry_badge": badge,
                "short_description": short_desc,
                "message_title": msg_title,
                "message_content": msg_content,
                "biography": bio,
                "photo_fallback": photo,
                "photo_alt": alt,
                "office_address": addr,
                "office_phone": phone,
                "office_email": email,
                "office_hours": hours,
                "page_url": page_url,
                "is_active": True,
            },
        )
    print("[+] 06. 3 Executive Leadership Cards seeded.")

    # 7. Organizational Structure & Chart
    AboutOrganizationStructure.objects.update_or_create(
        id=1,
        defaults={
            "eyebrow": "Administration",
            "title": "Organizational structure",
            "description": "View the official administrative and institutional structure of the Ministry.",
            "chart_box_title": "Ministry organizational chart",
            "chart_box_subtitle": "Official administrative reporting structure",
            "chart_fallback": "/images/about/organizational-structure.jpg",
            "executive_notes": "On smaller screens, scroll horizontally to examine the complete organizational chart or select 'View full size'.",
        },
    )
    print("[+] 07. Organizational Structure & Chart seeded.")

    # 8. Departments & Institutions : Header
    AboutDepartmentHeader.objects.update_or_create(
        id=1,
        defaults={
            "eyebrow": "Institutions",
            "title": "Departments & institutions",
            "description": "The Ministry works together with specialized departments, authorities and research institutions to deliver public services, scientific expertise and sector development.",
        },
    )
    print("[+] 08. Departments & Institutions Header seeded.")

    # 9. Department & Institution Cards (5 statutory institutions)
    departments_data = [
        (1, "Department of Fisheries and Aquatic Resources (DFAR)", "Supports fisheries administration, vessel registration, licensing, regulatory enforcement, and maritime search and rescue.", "https://www.fisheriesdept.gov.lk/", "Building2"),
        (2, "National Aquaculture Development Authority (NAQDA)", "Promotes commercial aquaculture, inland fisheries stocking, freshwater hatchery development, and shrimp culture.", "https://naqda.gov.lk/", "Fish"),
        (3, "National Aquatic Resources Research and Development Agency (NARA)", "Conducts oceanographic research, hydrographic surveys, marine biological assessments, and post-harvest technology testing.", "http://www.nara.ac.lk/", "Anchor"),
        (4, "Ceylon Fisheries Harbours Corporation (CFHC)", "Constructs, operates, and maintains all major fishery harbours, anchorages, breakwaters, and maritime cold chains nationwide.", "http://www.cfhc.gov.lk/", "ShipWheel"),
        (5, "Ceylon Fisheries Corporation (CFC)", "Manages islandwide fish purchasing, cold storage facilities, consumer retail outlets, and fair-price market stabilization.", "http://www.cfc.gov.lk/", "Landmark"),
    ]
    for order, title, desc, href, icon in departments_data:
        AboutDepartmentCard.objects.update_or_create(
            order=order,
            defaults={
                "title": title,
                "description": desc,
                "href": href,
                "icon_name": icon,
                "is_active": True,
            },
        )
    print("[+] 09. 5 Department & Institution Cards seeded.")

    # 10. Historical Timeline : Header
    AboutTimelineHeader.objects.update_or_create(
        id=1,
        defaults={
            "eyebrow": "Our journey",
            "title": "Ministry history and development",
            "description": "Key historical milestones shaping Sri Lanka's fisheries and ocean resources management.",
        },
    )
    print("[+] 10. Historical Timeline Header seeded.")

    # 11. Historical Milestones & Timeline Events
    timeline_data = [
        (1, "1948", "Establishment of Fisheries Department", "Formal institutional management began following national independence.", "Historical milestone"),
        (2, "1980", "Commencement of Commercial Aquaculture", "First commercial coastal shrimp farms established in North Western province.", "Development milestone"),
        (3, "1996", "Enactment of Fisheries & Aquatic Resources Act", "Comprehensive legal framework established for sustainable fisheries governance.", "Legislative milestone"),
        (4, "2010", "Modernization of Offshore Fleet & Satellite VMS", "Implementation of satellite vessel monitoring and deep-sea tuna longline expansion.", "Modernization milestone"),
        (5, "2026", "National Sustainable Blue Economy Transformation", "Islandwide cold-chain modernization and digital port management systems launched.", "Current role"),
    ]
    for order, year, title, desc, badge in timeline_data:
        AboutTimelineEvent.objects.update_or_create(
            order=order,
            defaults={
                "year": year,
                "title": title,
                "description": desc,
                "status_badge": badge,
                "is_active": True,
            },
        )
    print("[+] 11. 5 Timeline Milestones seeded.")

    # 12. Call to Action (CTA) Banner
    AboutCTA.objects.update_or_create(
        id=1,
        defaults={
            "badge": "Continue Your Journey",
            "title": "Discover services, information and opportunities",
            "description": "Explore digital services, fisheries information, institutional resources, publications and official announcements from the Ministry of Fisheries, Aquatic and Ocean Resources.",
            "button_1_text": "Explore Downloads Centre",
            "button_1_url": "/downloads",
            "button_2_text": "Contact the Ministry",
            "button_2_url": "/contact",
        },
    )
    print("[+] 12. CTA Banner seeded.")

    # 13. Ministry Divisions Directory
    divisions_data = [
        (1, "Administration Division", "ADM", "Responsible for human resources, administration, institutional coordination and the effective operation of the Ministry.", "Director of Administration", "admin@fisheries.gov.lk", "+94 112 327 075", "Human resource development, communication, transport, security, and institutional coordination."),
        (2, "Accounts Division", "ACC", "Manages financial administration, budgeting, payments, accounting controls and public financial reporting.", "Chief Financial Officer", "accounts@fisheries.gov.lk", "+94 112 327 076", "Implementing effective financial management and accurate accounting systems through regular audits."),
        (3, "Planning Division", "PLN", "Formulates national sector policies, development plans, monitoring and international project coordination.", "Director of Planning", "planning@fisheries.gov.lk", "+94 112 327 074", "Public sector investments, statistical analysis, and bilateral progress monitoring."),
        (4, "Fisheries Operations Division", "OPS", "Oversees offshore and coastal fishing vessel operations, quota monitoring, and maritime enforcement.", "Director of Marine Operations", "operations@fisheries.gov.lk", "+94 112 327 071", "Vessel licensing, VMS satellite monitoring, sea rescue coordination."),
        (5, "Aquaculture & Development Division", "AQUA", "Leads freshwater reservoir breeding, commercial shrimp farming, and community hatcheries.", "Director of Aquaculture", "aquaculture@fisheries.gov.lk", "+94 112 327 072", "Fingerling production, feed standards, coastal aquaculture leases."),
    ]
    for order, name, code, desc, head, email, phone, resp in divisions_data:
        AboutDivision.objects.update_or_create(
            order=order,
            defaults={
                "name": name,
                "short_code": code,
                "description": desc,
                "head_of_division": head,
                "contact_email": email,
                "contact_phone": phone,
                "key_responsibilities": resp,
                "is_active": True,
            },
        )
    print("[+] 13. 5 Ministry Divisions seeded.")

    print("[SUCCESS] All 13 About Us CMS Models Seeded Perfectly!")


if __name__ == "__main__":
    seed_about_data()
