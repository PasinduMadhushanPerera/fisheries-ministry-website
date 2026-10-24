import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from internal_affairs.models import (
    InternalAffairsOfficer,
    OfficerContactLine,
    InternalAffairsDocument,
    InternalAffairsPageSettings,
)


def seed_internal_affairs():
    print("Seeding Internal Affairs Page Settings, Officers & Documents Data...")

    # Page Settings Singleton
    settings_obj, s_created = InternalAffairsPageSettings.objects.get_or_create(id=1)
    if s_created:
        print("  [Created] Internal Affairs Page Settings Singleton")
    else:
        print("  [Exists] Internal Affairs Page Settings Singleton")

    officers_data = [
        {
            "officer_id": "senior-assistant-secretary",
            "name_en": "Mrs. Priyanka Kodithuwakku",
            "name_si": "ප්‍රියංකා කොඩිතුවක්කු මහත්මිය",
            "name_ta": "திருமதி. பிரியங்கா கொடிதுவக்கு",
            "designation_en": "Senior Assistant Secretary",
            "designation_si": "ජ්‍යෙෂ්ඨ සහකාර ලේකම්",
            "designation_ta": "ஜேஷ்ட உதவிச் செயலாளர்",
            "role_badge_en": "Internal Affairs Lead",
            "role_badge_si": "අභ්‍යන්තර කටයුතු ප්‍රධානී",
            "role_badge_ta": "உள் விவகாரத் தலைவர்",
            "phone": "+94 11 244 6183",
            "mobile_whatsapp": "+94 71 442 8434",
            "email": "iau@fisheries.gov.lk",
            "office_address_en": "Ministry of Fisheries, Aquatic and Ocean Resources, New Secretariat, Maligawatta, Colombo 10",
            "office_address_si": "ධීවර, ජලජ හා මහාසාගර සම්පත් අමාත්‍යාංශය, නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10",
            "office_address_ta": "கடற்றொழில், நீரியல் மற்றும் கடல் வளங்கள் அமைச்சு, புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10",
            "photo_fallback": "/images/leadership/Senior Assistant Secretary.jpg",
            "order": 1,
            "is_active": True,
            "custom_contacts": [
                {
                    "label_en": "IAU WhatsApp",
                    "label_si": "IAU වට්ස්ඇප්",
                    "label_ta": "IAU வாட்ஸ்அப்",
                    "value": "+94 707 786 181",
                    "icon_type": "whatsapp",
                    "link_type": "whatsapp",
                    "order": 1,
                },
                {
                    "label_en": "IAU E-mail",
                    "label_si": "IAU ඉමේල්",
                    "label_ta": "IAU மின்னஞ்சல்",
                    "value": "iau[at]fisheries.gov.lk",
                    "icon_type": "email",
                    "link_type": "mailto",
                    "order": 2,
                },
            ],
        },
        {
            "officer_id": "director-development",
            "name_en": "Mrs. Y.I.D. Gunawardhana",
            "name_si": "වයි.අයි.ඩී. ගුණවර්ධන මහත්මිය",
            "name_ta": "திருமதி. வை.ஐ.டி. குணவர்தன",
            "designation_en": "Director (Development)",
            "designation_si": "අධ්‍යක්ෂ (සංවර්ධන)",
            "designation_ta": "இயக்குனர் (அபிவிருத்தி)",
            "role_badge_en": "Development Oversight",
            "role_badge_si": "සංවර්ධන අධීක්ෂණ නිලධාරී",
            "role_badge_ta": "அபிவிருத்தி மேற்பார்வை",
            "phone": "+94 11 244 1537",
            "mobile_whatsapp": "+94 77 692 7738",
            "email": "gyasintha@yahoo.com",
            "office_address_en": "Ministry of Fisheries, Aquatic and Ocean Resources, New Secretariat, Maligawatta, Colombo 10",
            "office_address_si": "ධීවර, ජලජ හා මහාසාගර සම්පත් අමාත්‍යාංශය, නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10",
            "office_address_ta": "கடற்றொழில், நீரியல் மற்றும் கடல் வளங்கள் அமைச்சு, புதிய செயலகம், மாளிகාවத்தை, கொழும்பு 10",
            "photo_fallback": "/images/leadership/Director (Development).jpg",
            "order": 2,
            "is_active": True,
            "custom_contacts": [],
        },
    ]

    for item in officers_data:
        custom_contacts = item.pop("custom_contacts", [])
        officer, created = InternalAffairsOfficer.objects.update_or_create(
            officer_id=item["officer_id"],
            defaults=item,
        )
        status = "Created" if created else "Updated"
        print(f"  [{status}] Officer: {officer.name_en}")

        for cc in custom_contacts:
            line, l_created = OfficerContactLine.objects.update_or_create(
                officer=officer,
                label_en=cc["label_en"],
                defaults={**cc, "officer": officer},
            )
            l_status = "Created" if l_created else "Updated"
            print(f"    - [{l_status}] Custom Contact Line: {line.label_en} -> {line.value}")

    # Documents Data
    documents_data = [
        {
            "document_id": "complaint-guidelines-2026",
            "title_en": "Internal Affairs Complaint & Whistleblower Guidance Guidelines",
            "title_si": "අභ්‍යන්තර කටයුතු පැමිණිලි හා තොරතුරු අනාවරණය කිරීමේ මාර්ගෝපදේශ මාලාව",
            "title_ta": "உள் விவகாரங்கள் முறைப்பாடு மற்றும் தகவல் வெளிப்படுத்தல் வழிகாட்டுதல்கள்",
            "description_en": "Official procedures, rights, and confidential reporting frameworks for public citizens and ministry personnel.",
            "description_si": "මහජනතාව සහ අමාත්‍යාංශ නිලධාරීන් සඳහා වන නිල පැමිණිලි නීතිමය ක්‍රියාපටිපාටිය සහ රහස්‍යභාවය පිළිබඳ උපදෙස් මාලාව.",
            "description_ta": "பொதுமக்கள் மற்றும் அமைச்சு ஊழியர்களுக்கான உத்தியோகபூர்வ முறைப்பாடு நடைமுறைகள் மற்றும் இரகசியத்தன்மை வழிகாட்டுதல்கள்.",
            "file_type": "PDF",
            "file_size": "380 KB",
            "display_date": "02 October 2026",
            "order": 1,
            "is_active": True,
        }
    ]

    for doc in documents_data:
        d_obj, d_created = InternalAffairsDocument.objects.update_or_create(
            document_id=doc["document_id"],
            defaults=doc,
        )
        d_status = "Created" if d_created else "Updated"
        print(f"  [{d_status}] Document: {d_obj.title_en}")

    print("Internal Affairs Seeding Complete!\n")


if __name__ == "__main__":
    seed_internal_affairs()
