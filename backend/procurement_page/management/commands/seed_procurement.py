from django.core.management.base import BaseCommand
from procurement_page.models import ProcurementPageHeader, ProcurementTenderItem


class Command(BaseCommand):
    help = "Seed rich multilingual data for Procurement & Tenders Portal"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Procurement page and tender items...")

        # 1. Page Header
        hdr, _ = ProcurementPageHeader.objects.get_or_create(id=1)
        hdr.badge_text_en = "Transparency & Public Accountability"
        hdr.badge_text_si = "විනිවිදභාවය සහ මහජන වගවීම"
        hdr.badge_text_ta = "வெளிப்படைத்தன்மை மற்றும் பொதுப் பொறுப்புக்கூறல்"

        hdr.title_en = "Procurement & Tenders Portal"
        hdr.title_si = "ප්‍රසම්පාදන සහ ටෙන්ඩර් ද්වාරය"
        hdr.title_ta = "கொள்முதல் மற்றும் கேள்விப்பத்திர போர்டல்"

        hdr.description_en = "Official e-procurement portal of the Ministry of Fisheries. Access competitive bidding documents, harbor development tenders, equipment purchasing notices, and contract award summaries."
        hdr.description_si = "ධීවර අමාත්‍යාංශයේ නිල විද්‍යුත් ප්‍රසම්පාදන ද්වාරය. තරඟකාරී ලංසු ලේඛන, වරාය සංවර්ධන ටෙන්ඩර්, උපකරණ මිලදී ගැනීමේ දැන්වීම් සහ කොන්ත්‍රාත්තු තොරතුරු වෙත ප්‍රවේශ වන්න."
        hdr.description_ta = "கடற்றொழில் அமைச்சின் உத்தியோகபூர்வ கொள்முதல் தளம். கேள்விப்பத்திர ஆவணங்கள், துறைமுக அபிவிருத்திப் பணிகள், உபகரணக் கொள்முதல் மற்றும் ஒப்பந்த விருது விபரங்களைப் பார்வையிடவும்."

        hdr.featured_badge_en = "Featured Procurement Notices"
        hdr.featured_badge_si = "විශේෂ ප්‍රසම්පාදන දැන්වීම්"
        hdr.featured_badge_ta = "சிறப்பு கொள்முதல் அறிவிப்புகள்"

        hdr.catalogue_badge_en = "Active & Archived Notices"
        hdr.catalogue_badge_si = "ක්‍රියාකාරී සහ ලේඛනාගාර දැන්වීම්"
        hdr.catalogue_badge_ta = "செயலில் உள்ள மற்றும் காப்பகப்படுத்தப்பட்ட அறிவிப்புகள்"

        hdr.library_title_en = "Procurement & Tenders Library"
        hdr.library_title_si = "ප්‍රසම්පාදන සහ ටෙන්ඩර් එකතුව"
        hdr.library_title_ta = "கொள்முதல் மற்றும் கேள்விப்பத்திர நூலகம்"
        hdr.save()

        # 2. Procurement Tender Items
        tenders_data = [
            {
                "slug": "invitation-for-bids-horizontal-fuel-storage-tanks-cfhc-2026",
                "order": 1,
                "year": 2026,
                "ref_number": "MOF/CFHC/2026/FUEL-TANKS",
                "category": "equipment",
                "status": "Open",
                "featured": True,
                "title_en": "Invitation for Bids Fabrication, Supply, Delivery, Installation and Commissioning of 08 No’s Above Ground Horizontal Fuel Storage Tanks of 8000 Gallon Capacity for Ceylon Fisheries Harbour Corporation (CFHC)",
                "title_si": "ලංකා ධීවර වරාය නීතිගත සංස්ථාව (CFHC) සඳහා ගැලුම් 8000 ධාරිතාවයෙන් යුත් භූමියට ඉහළින් පිහිටි තිරස් ඉන්ධන ගබඩා ටැංකි 08 ක් නිෂ්පාදනය, සැපයීම, බෙදා හැරීම, සවිකිරීම සහ කොමිස් කිරීම සඳහා ලංසු කැඳවීම",
                "title_ta": "இலங்கை கடற்றொழில் துறைமுக கூட்டுத்தாபனத்திற்காக (CFHC) 8000 கலன் கொள்ளளவு கொண்ட 08 கிடைமட்ட எரிபொருள் சேமிப்பு தொட்டிகளை தயாரித்தல், விநியோகித்தல், நிறுவுதல் மற்றும் இயங்கவைத்தல்",
                "publisher_en": "Ceylon Fisheries Harbour Corporation (CFHC)",
                "publisher_si": "ලංකා ධීවර වරාය නීතිගත සංස්ථාව (CFHC)",
                "publisher_ta": "இலங்கை கடற்றොழில் துறைமுக கூட்டுத்தாபனம் (CFHC)",
                "description_en": "Fabrication, supply, delivery, installation and commissioning of 08 No’s above ground horizontal fuel storage tanks of 8000 gallon capacity for CFHC harbours.",
                "doc_button_label_en": "Document can be downloaded from here",
                "doc_button_label_si": "ලේඛනය මෙතැනින් බාගත හැකිය",
                "doc_button_label_ta": "கேள்விப்பத்திர ஆவணத்தை இங்கிருந்து பதிவிறக்கம் செய்யலாம்",
                "published_date": "2026-02-10",
                "closing_date": "2026-04-15",
                "file_type": "PDF",
                "file_size": "483 KB",
            },
            {
                "slug": "roof-renovation-admin-building-ambalangoda-harbour",
                "order": 2,
                "year": 2026,
                "ref_number": "MOF/CFHC/2026/AMB-ROOF",
                "category": "harbour",
                "status": "Open",
                "featured": True,
                "title_en": "Invitation for Bids Roof Renovation Works of the Administration Building at Ambalangoda Fishery Harbour",
                "title_si": "අම්බලන්ගොඩ ධීවර වරායේ පාලන ගොඩනැගිල්ලේ වහල ප්‍රතිසංස්කරණ කටයුතු සඳහා ලංසු කැඳවීම",
                "title_ta": "அம்பலாங்கொடை மீன்பிடித் துறைமுகத்தின் நிர்வாகக் கட்டிடத்தின் கூரை சீரமைப்புப் பணிகளுக்கான அழைப்பு",
                "publisher_en": "Ceylon Fisheries Harbour Corporation (CFHC)",
                "publisher_si": "ලංකා ධීවර වරාය නීතිගත සංස්ථාව (CFHC)",
                "publisher_ta": "இலங்கை கடற்றொழில் துறைமுக கூட்டுத்தாபனம் (CFHC)",
                "description_en": "Roof renovation and waterproofing structural works of the main administration building at Ambalangoda Fishery Harbour.",
                "doc_button_label_en": "Document can be downloaded from here",
                "doc_button_label_si": "ලේඛනය මෙතැනින් බාගත හැකිය",
                "doc_button_label_ta": "கேள்விப்பத்திர ஆவணத்தை இங்கிருந்து பதிவிறக்கம் செய்யலாம்",
                "published_date": "2026-02-12",
                "closing_date": "2026-04-20",
                "file_type": "PDF",
                "file_size": "504 KB",
            },
            {
                "slug": "rehabilitation-public-toilet-mirissa-harbour",
                "order": 3,
                "year": 2026,
                "ref_number": "MOF/CFHC/2026/MIR-TOILET",
                "category": "harbour",
                "status": "Open",
                "featured": True,
                "title_en": "Invitation for Bids Rehabilitation of the Public Toilet at Mirissa Fishery Harbour",
                "title_si": "මිිරිස්ස ධීවර වරායේ පොදු වැසිකිළි පද්ධතිය පුනරුත්ථාපනය කිරීම සඳහා ලංසු කැඳවීම",
                "title_ta": "மிரிஸ்ஸ மீன்பிடித் துறைமுகத்தில் உள்ள பொதுக் கழிப்பறையை சீரமைப்பதற்கான அழைப்பு",
                "publisher_en": "Ceylon Fisheries Harbour Corporation (CFHC)",
                "publisher_si": "ලංකා ධීවර වරාය නීතිගත සංස්ථාව (CFHC)",
                "publisher_ta": "இலங்கை கடற்றொழில் துறைமுக கூட்டுத்தாபனம் (CFHC)",
                "description_en": "Rehabilitation, plumbing upgrade and sanitation improvement works of the public toilet complex at Mirissa Fishery Harbour.",
                "doc_button_label_en": "Document can be downloaded from here",
                "doc_button_label_si": "ලේඛනය මෙතැනින් බාගත හැකිය",
                "doc_button_label_ta": "கேள்விப்பத்திர ஆவணத்தை இங்கிருந்து பதிவிறக்கம் செய்யலாம்",
                "published_date": "2026-02-14",
                "closing_date": "2026-04-22",
                "file_type": "PDF",
                "file_size": "503 KB",
            },
            {
                "slug": "rehabilitation-existing-jetty-kalpitiya-harbour",
                "order": 4,
                "year": 2026,
                "ref_number": "MOF/CFHC/2026/KALP-JETTY",
                "category": "harbour",
                "status": "Open",
                "featured": True,
                "title_en": "Invitation for Bids Rehabilitation of the Existing Jetty at Kalpitiya Fishery Harbour",
                "title_si": "කල්පිටිය ධීවර වරායේ පවතින ජැටිය පුනරුත්ථාපනය කිරීම සඳහා ලංසු කැඳවීම",
                "title_ta": "கற்பிட்டி மீன்பிடித் துறைமுகத்தில் உள்ள இருக்கும் பாயை சீரமைப்பதற்கான அழைப்பு",
                "publisher_en": "Ceylon Fisheries Harbour Corporation (CFHC)",
                "publisher_si": "ලංකා ධීවර වරාය නීතිගත සංස්ථාව (CFHC)",
                "publisher_ta": "இலங்கை கடற்றொழில் துறைமுக கூட்டுத்தாபனம் (CFHC)",
                "description_en": "Structural repair, concrete pile reinforcement, and fender restoration works of the main jetty at Kalpitiya Fishery Harbour.",
                "doc_button_label_en": "Document can be downloaded from here",
                "doc_button_label_si": "ලේඛනය මෙතැනින් බාගත හැකිය",
                "doc_button_label_ta": "கேள்விப்பத்திர ஆவணத்தை இங்கிருந்து பதிவிறக்கம் செய்யலாம்",
                "published_date": "2026-02-15",
                "closing_date": "2026-04-25",
                "file_type": "PDF",
                "file_size": "503 KB",
            },
            {
                "slug": "live-aquaculture-species-naqda-icb-2026",
                "order": 5,
                "year": 2026,
                "ref_number": "MOF/NAQDA/2026/ICB-AQUA",
                "category": "supplies",
                "status": "Open",
                "featured": True,
                "title_en": "International Competitive Bidding for Supply and Delivery of Live Aquaculture Species (Ornamental Fish, Shrimp, Seabass, Grouper and Tilapia) for the National Aquaculture Development Programme",
                "title_si": "ජාතික ජලජීවී වගා සංවර්ධන වැඩසටහන සඳහා සජීවී ජලජීවී විශේෂ (අලංකාර මත්ස්‍යයන්, ඉස්සන්, මෝදා, කල්ප අං සහ තිලාපියා) සැපයීම සහ බෙදා හැරීම සඳහා ජාත්‍යන්තර තරඟකාරී ලංසු කැඳවීම",
                "title_ta": "தேசிய நீர்வாழ் உயிரின வளர்ப்பு மேம்பாட்டுத் திட்டத்திற்காக நேரடி நீர்வாழ் உயிரினங்களை (அலங்கார மீன்கள், இறால், கொடுவா மற்றும் திலாப்பியா) விநியோகிப்பதற்கான சர்வதேச போட்டி ஏலம்",
                "publisher_en": "National Aquaculture Development Authority of Sri Lanka (NAQDA)",
                "publisher_si": "ජාතික ජලජීවී වගා සංවර්ධන අධිකාරිය (NAQDA)",
                "publisher_ta": "தேசிய நீர்வாழ் உயிரின வளர்ப்பு அபிவிருத்தி அதிகாரசபை (NAQDA)",
                "description_en": "International competitive bidding for supply and delivery of high-health live aquaculture species.",
                "additional_info_en": "Join Zoom Meeting\nZoom meeting link: https://zoom.us/j/73961883339\nTime: Aug 19, 2026 10:30 AM Colombo\nMeeting ID: 739 6188 3339\nPasscode: 6iznsj",
                "additional_info_si": "Zoom රැස්වීමට සම්බන්ධ වන්න\nZoom meeting link: https://zoom.us/j/73961883339\nවේලාව: 2026 අගෝස්තු 19 පෙ.ව. 10:30 කොළඹ\nMeeting ID: 739 6188 3339\nPasscode: 6iznsj",
                "additional_info_ta": "Zoom கூட்டத்தில் இணையுங்கள்\nZoom meeting link: https://zoom.us/j/73961883339\nநேரம்: ஆகஸ்ட் 19, 2026 மு.ப 10:30 கொழும்பு\nMeeting ID: 739 6188 3339\nPasscode: 6iznsj",
                "doc_button_label_en": "Document can be downloaded from here",
                "doc_button_label_si": "ලේඛනය මෙතැනින් බාගත හැකිය",
                "doc_button_label_ta": "கேள்விப்பத்திர ஆவணத்தை இங்கிருந்து பதிவிறக்கம் செய்யலாம்",
                "published_date": "2026-02-18",
                "closing_date": "2026-05-15",
                "file_type": "PDF",
                "file_size": "1.59 MB",
                "second_document_label_en": "Document can be downloaded from here",
                "second_document_label_si": "ලේඛනය මෙතැනින් බාගත හැකිය",
                "second_document_label_ta": "ஆவணத்தை இங்கிருந்து பதிவிறக்கம் செய்யலாம்",
                "second_file_type": "PDF",
                "second_file_size": "753 KB",
            },
        ]

        for t_data in tenders_data:
            slug = t_data.pop("slug")
            tender, created = ProcurementTenderItem.objects.get_or_create(slug=slug, defaults=t_data)
            if not created:
                for k, v in t_data.items():
                    setattr(tender, k, v)
                tender.save()

        self.stdout.write(self.style.SUCCESS("Successfully seeded Procurement tenders!"))
