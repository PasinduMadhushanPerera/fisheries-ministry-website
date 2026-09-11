import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from annual_statistics.models import AnnualStatisticsHeader, AnnualStatisticsReport

def seed():
    print("[*] Seeding Annual Statistics Data...")

    header, _ = AnnualStatisticsHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Official Statistical Archive"
    header.title_en = "Annual Statistics Reports & Datasets"
    header.description_en = "Browse and download official annual fisheries statistical bulletins, comprehensive sector performance metrics, supporting spreadsheets, raw datasets, and executive presentations published by the Ministry."
    header.featured_badge_en = "Featured Annual Report"

    header.badge_text_si = "නිල සංඛ්‍යාලේඛන ලේඛනාගාරය"
    header.title_si = "වාර්ෂික සංඛ්‍යාලේඛන වාර්තා සහ දත්ත කට්ටල"
    header.description_si = "ධීවර අමාත්‍යාංශය විසින් ප්‍රකාශයට පත් කරන ලද නිල වාර්ෂික ධීවර සංඛ්‍යාලේඛන ප්‍රකාශන, ක්ෂේත්‍ර කාර්යසාධන වාර්තා සහ දත්ත කට්ටල මෙතැනින් බාගත කරගන්න."
    header.featured_badge_si = "විශේෂ වාර්ෂික වාර්තාව"

    header.badge_text_ta = "உத்தியோகபூர்வ புள்ளிவிவரக் காப்பகம்"
    header.title_ta = "வருடாந்த புள்ளிவிவர அறிக்கைகள் மற்றும் தரவுத் தொகுப்புகள்"
    header.description_ta = "கடற்றொழில் அமைச்சினால் வெளியிடப்பட்ட உத்தியோகபூர்வ வருடாந்த மீன்பிடி புள்ளிவிவர அறிக்கைகள் மற்றும் தரவுத்தொகுப்புகளைப் பதிவிறக்குங்கள்."
    header.featured_badge_ta = "முக்கிய வருடாந்த அறிக்கை"
    header.save()

    reports = [
        # --- Featured 2024 Report ---
        {
            "report_id": "annual-bulletin-2024",
            "year": 2024,
            "title_en": "Annual Fisheries Statistical Bulletin – 2024",
            "title_si": "වාර්ෂික ධීවර සංඛ්‍යාලේඛන ප්‍රකාශනය – 2024",
            "title_ta": "வருடாந்த மீன்பிடி புள்ளிவிவர அறிக்கை – 2024",
            "description_en": "Official annual fisheries statistics, comprehensive sector performance metrics, fleet counts, and socio-economic indicators for 2024.",
            "description_si": "2024 වසර සඳහා නිල වාර්ෂික ධීවර සංඛ්‍යාලේඛන, සම්පූර්ණ ක්ෂේත්‍ර කාර්යසාධන දර්ශක, යාත්‍රා සංඛ්‍යා සහ සමාජ-ආර්ථික දත්ත.",
            "description_ta": "2024 ஆம் ஆண்டிற்கான உத்தியோகபூர்வ வருடாந்த மீன்பிடி புள்ளிவிவரங்கள், துறைசார் செயல்திறன் அளவீடுகள் மற்றும் சமூக-பொருளாதார குறிகாட்டிகள்.",
            "published_date": "2025-06-30",
            "display_date": "30 June 2025",
            "file_type": "PDF",
            "file_size": "548 KB",
            "file_url_fallback": "#",
            "languages_text": "English / Sinhala / Tamil",
            "is_featured": True,
            "order": 1,
        },
        # --- 2024 Supporting Datasets ---
        {
            "report_id": "indicators-dataset-2024",
            "year": 2024,
            "title_en": "Fisheries Indicators Dataset – 2024",
            "title_si": "ධීවර ක්ෂේත්‍ර දර්ශක දත්ත කට්ටලය – 2024",
            "title_ta": "மீன்பிடி குறிகாட்டிகள் தரவுத்தொகுப்பு – 2024",
            "description_en": "Raw numerical spreadsheet of key performance indicators, regional catch breakdowns, and fish landing quantities.",
            "description_si": "ප්‍රධාන කාර්යසාධන දර්ශක, ප්‍රාදේශීය අස්වනු සහ මත්ස්‍ය ගොඩබෑමේ ප්‍රමාණ ඇතුළත් එක්සෙල් පැතුරුම්පත.",
            "description_ta": "முக்கிய செயல்திறன் குறிகாட்டிகள், பிராந்திய மீன் பிடிப்பு மற்றும் மீன் இறங்கு அளவுகளின் விரிதாள்.",
            "published_date": "2025-07-15",
            "display_date": "15 July 2025",
            "file_type": "XLSX",
            "file_size": "120 KB",
            "file_url_fallback": "#",
            "languages_text": "English",
            "is_featured": False,
            "order": 2,
        },
        {
            "report_id": "production-data-2024",
            "year": 2024,
            "title_en": "Fisheries Production Data – 2024",
            "title_si": "ධීවර නිෂ්පාදන අමු දත්ත – 2024",
            "title_ta": "மீன்பிடி உற்பத்தி தரவு – 2024",
            "description_en": "Comma-separated values dataset containing monthly production volumes by harbor and species for data analysis.",
            "description_si": "වරාය සහ මත්ස්‍ය විශේෂ අනුව මාසික නිෂ්පාදන ප්‍රමාණයන් ඇතුළත් CSV දත්ත ගොනුව.",
            "description_ta": "துறைமுகம் மற்றும் இனங்கள் வாரியாக மாதாந்த உற்பத்தி அளவுகளைக் கொண்ட CSV தரவுத்தொகுப்பு.",
            "published_date": "2025-07-20",
            "display_date": "20 July 2025",
            "file_type": "CSV",
            "file_size": "85 KB",
            "file_url_fallback": "#",
            "languages_text": "English",
            "is_featured": False,
            "order": 3,
        },
        {
            "report_id": "methodology-notes-2024",
            "year": 2024,
            "title_en": "Annual Statistics Methodology Notes – 2024",
            "title_si": "වාර්ෂික සංඛ්‍යාලේඛන ක්‍රමවේද සටහන් – 2024",
            "title_ta": "வருடாந்த புள்ளிவிவர வழிமுறை குறிப்புகள் – 2024",
            "description_en": "Technical document describing survey sampling methodologies, statistical estimation models, and data validation protocols.",
            "description_si": "සංගණන නියැදි ක්‍රමවේද, සංඛ්‍යාන ඇස්තමේන්තු ආකෘති සහ දත්ත තහවුරු කිරීමේ ක්‍රමවේද විස්තර කෙරෙන ලේඛනය.",
            "description_ta": "கள ஆய்வு மாதிரி முறைகள், புள்ளிவிவர மதிப்பீட்டு மாதிரிகள் மற்றும் தரவு சரிபார்ப்பு நெறிமுறைகளை விவரிக்கும் ஆவணம்.",
            "published_date": "2025-08-05",
            "display_date": "05 August 2025",
            "file_type": "DOCX",
            "file_size": "240 KB",
            "file_url_fallback": "#",
            "languages_text": "English",
            "is_featured": False,
            "order": 4,
        },
        {
            "report_id": "statistics-presentation-2024",
            "year": 2024,
            "title_en": "Fisheries Statistics Presentation – 2024",
            "title_si": "ධීවර සංඛ්‍යාලේඛන ඉදිරිපත් කිරීම – 2024",
            "title_ta": "மீன்பிடி புள்ளிவிவர விளக்கக்காட்சி – 2024",
            "description_en": "Official executive presentation slides summarizing sectoral growth trends, GDP contributions, and export trade statistics.",
            "description_si": "ක්ෂේත්‍ර වර්ධන ප්‍රවණතා, දළ දේශීය නිෂ්පාදිතයට දායකත්වය සහ අපනයන වෙළඳ සංඛ්‍යාලේඛන සාරාංශගත කෙරෙන ඉදිරිපත් කිරීම.",
            "description_ta": "துறைசார் வளர்ச்சி போக்குகள், GDP பங்களிப்பு மற்றும் ஏற்றுமதி வர்த்தக புள்ளிவிவரங்களை சுருக்கமாகக் கூறும் விளக்கக்காட்சி ஸ்லைடுகள்.",
            "published_date": "2025-08-10",
            "display_date": "10 August 2025",
            "file_type": "PPTX",
            "file_size": "4.2 MB",
            "file_url_fallback": "#",
            "languages_text": "English",
            "is_featured": False,
            "order": 5,
        },
        {
            "report_id": "complete-package-2024",
            "year": 2024,
            "title_en": "Complete Statistics Data Package – 2024",
            "title_si": "සම්පූර්ණ සංඛ්‍යාලේඛන දත්ත පැකේජය – 2024",
            "title_ta": "முழுமையான புள்ளிவிவர தரவு தொகுப்பு – 2024",
            "description_en": "Compressed archive containing the 2024 bulletin PDF, raw Excel spreadsheets, district maps, and methodology documentation.",
            "description_si": "2024 ප්‍රකාශන PDF, එක්සෙල් පැතුරුම්පත්, දිස්ත්‍රික් සිතියම් සහ ක්‍රමවේද ලේඛන ඇතුළත් සම්පීඩිත ZIP ගොනුව.",
            "description_ta": "2024 அறிக்கை PDF, Excel விரிதாள்கள், மாவட்ட வரைபடங்கள் மற்றும் வழிமுறை ஆவணங்களைக் கொண்ட ZIP கோப்பு.",
            "published_date": "2025-08-15",
            "display_date": "15 August 2025",
            "file_type": "ZIP",
            "file_size": "18.5 MB",
            "file_url_fallback": "#",
            "languages_text": "English / Sinhala",
            "is_featured": False,
            "order": 6,
        },
        # --- 2023 Reports ---
        {
            "report_id": "annual-bulletin-2023",
            "year": 2023,
            "title_en": "Annual Fisheries Statistical Bulletin – 2023",
            "title_si": "වාර්ෂික ධීවර සංඛ්‍යාලේඛන ප්‍රකාශනය – 2023",
            "title_ta": "வருடாந்த மீன்பிடி புள்ளிவிவர அறிக்கை – 2023",
            "description_en": "Official annual statistical bulletin covering marine, inland, and aquaculture production for the year 2023.",
            "description_si": "2023 වසර සඳහා සාගර, මිරිදිය සහ ජලජීවී වගා නිෂ්පාදනය ආවරණය වන නිල වාර්ෂික සංඛ්‍යාලේඛන ප්‍රකාශනය.",
            "description_ta": "2023 ஆம் ஆண்டிற்கான கடல், நன்னீர் மற்றும் நீரியல் வளர்ப்பு உற்பத்தியை உள்ளடக்கிய உத்தியோகபூர்வ அறிக்கை.",
            "published_date": "2024-06-25",
            "display_date": "25 June 2024",
            "file_type": "PDF",
            "file_size": "512 KB",
            "file_url_fallback": "#",
            "languages_text": "English / Sinhala / Tamil",
            "is_featured": False,
            "order": 7,
        },
        {
            "report_id": "indicators-dataset-2023",
            "year": 2023,
            "title_en": "Fisheries Indicators Dataset – 2023",
            "title_si": "ධීවර ක්ෂේත්‍ර දර්ශක දත්ත කට්ටලය – 2023",
            "title_ta": "மீன்பிடி குறிகாட்டிகள் தரவுத்தொகுப்பு – 2023",
            "description_en": "Complete numerical spreadsheet of fisheries statistics and operational metrics for 2023.",
            "description_si": "2023 වසර සඳහා ධීවර සංඛ්‍යාලේඛන සහ මෙහෙයුම් දර්ශක ඇතුළත් සම්පූර්ණ පැතුරුම්පත.",
            "description_ta": "2023 ஆம் ஆண்டிற்கான மீன்பிடி புள்ளிவிவரங்கள் மற்றும் இயக்க அளவீடுகளின் முழுமையான விரிதாள்.",
            "published_date": "2024-07-10",
            "display_date": "10 July 2024",
            "file_type": "XLSX",
            "file_size": "115 KB",
            "file_url_fallback": "#",
            "languages_text": "English",
            "is_featured": False,
            "order": 8,
        },
        # --- 2022 Reports ---
        {
            "report_id": "annual-bulletin-2022",
            "year": 2022,
            "title_en": "Annual Fisheries Statistical Bulletin – 2022",
            "title_si": "වාර්ෂික ධීවර සංඛ්‍යාලේඛන ප්‍රකාශනය – 2022",
            "title_ta": "வருடாந்த மீன்பிடி புள்ளிவிவர அறிக்கை – 2022",
            "description_en": "Consolidated fisheries data bulletin for 2022 with fleet statistics and socio-economic profiles.",
            "description_si": "යාත්‍රා සංඛ්‍යා සහ සමාජ-ආර්ථික පැතිකඩ ඇතුළත් 2022 වසරේ ඒකාබද්ධ ධීවර දත්ත ප්‍රකාශනය.",
            "description_ta": "படகுகளின் புள்ளிவிவரங்கள் மற்றும் சமூக-பொருளாதார சுயவிவரங்களுடன் கூடிய 2022 ஆம் ஆண்டின் ஒருங்கிணைந்த அறிக்கை.",
            "published_date": "2023-06-20",
            "display_date": "20 June 2023",
            "file_type": "PDF",
            "file_size": "480 KB",
            "file_url_fallback": "#",
            "languages_text": "English / Sinhala / Tamil",
            "is_featured": False,
            "order": 9,
        },
        # --- 2021 Reports ---
        {
            "report_id": "annual-bulletin-2021",
            "year": 2021,
            "title_en": "Annual Fisheries Statistical Bulletin – 2021",
            "title_si": "වාර්ෂික ධීවර සංඛ්‍යාලේඛන ප්‍රකාශනය – 2021",
            "title_ta": "வருடாந்த மீன்பிடி புள்ளிவிவர அறிக்கை – 2021",
            "description_en": "Archived official fisheries statistics bulletin for 2021 with historical comparison metrics.",
            "description_si": "ඓතිහාසික සංසන්දනාත්මක දත්ත සහිත 2021 වසරේ නිල ධීවර සංඛ්‍යාලේඛන ප්‍රකාශනය.",
            "description_ta": "வரலாற்று ஒப்பீட்டு அளவீடுகளுடன் 2021 ஆம் ஆண்டிற்கான உத்தியோகபூர்வ மீன்பிடி புள்ளிவிவர அறிக்கை.",
            "published_date": "2022-06-15",
            "display_date": "15 June 2022",
            "file_type": "PDF",
            "file_size": "450 KB",
            "file_url_fallback": "#",
            "languages_text": "English / Sinhala / Tamil",
            "is_featured": False,
            "order": 10,
        },
    ]

    for item in reports:
        obj, created = AnnualStatisticsReport.objects.update_or_create(
            report_id=item["report_id"],
            defaults=item,
        )
        print(f"  {'Created' if created else 'Updated'}: [{obj.report_id}] - {obj.year} ({obj.file_type})")

    print("[SUCCESS] Annual Statistics Data Successfully Seeded!")

if __name__ == "__main__":
    seed()
