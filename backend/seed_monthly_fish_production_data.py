import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from monthly_fish_production.models import MonthlyFishProductionHeader, MonthlyProductionReport

def seed():
    print("[*] Seeding Monthly Fish Production Data...")

    header, _ = MonthlyFishProductionHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Sectoral Production Data"
    header.title_en = "Monthly Fish Production Statistics"
    header.description_en = "Download official monthly fish production statistics compiled by the Ministry of Fisheries across marine, coastal, and inland sectors."

    header.badge_text_si = "ක්ෂේත්‍ර නිෂ්පාදන දත්ත"
    header.title_si = "මාසික මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන"
    header.description_si = "ධීවර අමාත්‍යාංශය විසින් සකස් කරන ලද සාගර, වෙරළබඩ සහ මිරිදිය අංශ ඔස්සේ නිල මාසික මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන මෙතැනින් බාගත කරගන්න."

    header.badge_text_ta = "துறைசார் உற்பத்தி தரவு"
    header.title_ta = "மாதாந்த மீன் உற்பத்தி புள்ளிவிவரங்கள்"
    header.description_ta = "கடற்றொழில் அமைச்சினால் தொகுக்கப்பட்ட கடல், கடலோர மற்றும் நன்னீர் துறைகளின் உத்தியோகபூர்வ மாதாந்த மீன் உற்பத்தி புள்ளிவிவரங்களைப் பதிவிறக்குங்கள்."
    header.save()

    reports = [
        # --- 2026 Reports ---
        {
            "report_id": "2026-03",
            "year": 2026,
            "month": "March",
            "month_number": 3,
            "title_en": "Monthly Fish Production Report",
            "title_si": "මාසික මත්ස්‍ය නිෂ්පාදන වාර්තාව",
            "title_ta": "மாதாந்த மீன் உற்பத்தி அறிக்கை",
            "description_en": "Official fish production statistics for March 2026 across marine, coastal, and inland sectors.",
            "description_si": "2026 මාර්තු මස සාගර, වෙරළබඩ සහ මිරිදිය අංශ ඔස්සේ නිල මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන දත්ත.",
            "description_ta": "2026 மார்ச் மாதத்திற்கான கடல், கடலோர மற்றும் நன்னீர் துறைகளின் உத்தியோகபூர்வ மீன் உற்பத்தி புள்ளிவிவரங்கள்.",
            "file_type": "XLSX",
            "file_size": "56 KB",
            "file_url_fallback": "#",
            "published_date": "2026-03-31",
            "display_date": "31 March 2026",
            "is_featured": True,
            "order": 1,
        },
        {
            "report_id": "2026-02",
            "year": 2026,
            "month": "February",
            "month_number": 2,
            "title_en": "Monthly Fish Production Report",
            "title_si": "මාසික මත්ස්‍ය නිෂ්පාදන වාර්තාව",
            "title_ta": "மாதாந்த மீன் உற்பத்தி அறிக்கை",
            "description_en": "Official fish production statistics for February 2026 across marine, coastal, and inland sectors.",
            "description_si": "2026 පෙබරවාරි මස සාගර, වෙරළබඩ සහ මිරිදිය අංශ ඔස්සේ නිල මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන දත්ත.",
            "description_ta": "2026 பெப்ரவரி மாதத்திற்கான கடல், கடலோர மற்றும் நன்னீர் துறைகளின் உத்தியோகபூர்வ மீன் உற்பத்தி புள்ளிவிவரங்கள்.",
            "file_type": "XLSX",
            "file_size": "56 KB",
            "file_url_fallback": "#",
            "published_date": "2026-02-28",
            "display_date": "28 February 2026",
            "order": 2,
        },
        {
            "report_id": "2026-01",
            "year": 2026,
            "month": "January",
            "month_number": 1,
            "title_en": "Monthly Fish Production Report",
            "title_si": "මාසික මත්ස්‍ය නිෂ්පාදන වාර්තාව",
            "title_ta": "மாதாந்த மீன் உற்பத்தி அறிக்கை",
            "description_en": "Official fish production statistics for January 2026 across marine, coastal, and inland sectors.",
            "description_si": "2026 ජනවාරි මස සාගර, වෙරළබඩ සහ මිරිදිය අංශ ඔස්සේ නිල මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන දත්ත.",
            "description_ta": "2026 ஜனவரி மாதத்திற்கான கடல், கடலோர மற்றும் நன்னீர் துறைகளின் உத்தியோகபூர்வ மீன் உற்பத்தி புள்ளிவிவரங்கள்.",
            "file_type": "XLSX",
            "file_size": "55 KB",
            "file_url_fallback": "#",
            "published_date": "2026-01-31",
            "display_date": "31 January 2026",
            "order": 3,
        },
        # --- 2025 Reports ---
        {
            "report_id": "2025-12",
            "year": 2025,
            "month": "December",
            "month_number": 12,
            "title_en": "Monthly Fish Production Report",
            "title_si": "මාසික මත්ස්‍ය නිෂ්පාදන වාර්තාව",
            "title_ta": "மாதாந்த மீன் உற்பத்தி அறிக்கை",
            "description_en": "Official fish production statistics for December 2025 including annual yield reconciliations.",
            "description_si": "2025 දෙසැම්බර් මස වාර්ෂික අස්වැන්න සංසන්දනය ඇතුළත් නිල මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන.",
            "description_ta": "2025 டிசம்பர் மாதத்திற்கான வருடாந்த உற்பத்தி மதிப்பீடுகள் உள்ளிட்ட உத்தியோகபூர்வ மீன் உற்பத்தி புள்ளிவிவரங்கள்.",
            "file_type": "XLSX",
            "file_size": "62 KB",
            "file_url_fallback": "#",
            "published_date": "2025-12-31",
            "display_date": "31 December 2025",
            "order": 4,
        },
        {
            "report_id": "2025-11",
            "year": 2025,
            "month": "November",
            "month_number": 11,
            "title_en": "Monthly Fish Production Report",
            "title_si": "මාසික මත්ස්‍ය නිෂ්පාදන වාර්තාව",
            "title_ta": "மாதாந்த மீன் உற்பத்தி அறிக்கை",
            "description_en": "Official fish production statistics for November 2025 across all coastal harbor divisions.",
            "description_si": "සියලුම වෙරළබඩ වරාය අංශ ඔස්සේ 2025 නොවැම්බර් මස නිල මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන.",
            "description_ta": "அனைத்து கடலோர துறைமுக பிரிவுகளினதும் 2025 நவம்பர் மாதத்திற்கான உத்தியோகபூர்வ மீன் உற்பத்தி புள்ளிவிவரங்கள்.",
            "file_type": "XLSX",
            "file_size": "58 KB",
            "file_url_fallback": "#",
            "published_date": "2025-11-30",
            "display_date": "30 November 2025",
            "order": 5,
        },
        {
            "report_id": "2025-10",
            "year": 2025,
            "month": "October",
            "month_number": 10,
            "title_en": "Monthly Fish Production Report",
            "title_si": "මාසික මත්ස්‍ය නිෂ්පාදන වාර්තාව",
            "title_ta": "மாதாந்த மீன் உற்பத்தி அறிக்கை",
            "description_en": "Official fish production statistics for October 2025 including aquaculture harvests.",
            "description_si": "ජලජීවී වගා අස්වැන්න ඇතුළත්ව 2025 ඔක්තෝබර් මස නිල මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන.",
            "description_ta": "நீரியல் வளர்ப்பு அறுவடைகள் உள்ளிட்ட 2025 அக்டோபர் மாதத்திற்கான உத்தியோகபூர்வ மீன் உற்பத்தி புள்ளிவிவரங்கள்.",
            "file_type": "XLSX",
            "file_size": "57 KB",
            "file_url_fallback": "#",
            "published_date": "2025-10-31",
            "display_date": "31 October 2025",
            "order": 6,
        },
        {
            "report_id": "2025-09",
            "year": 2025,
            "month": "September",
            "month_number": 9,
            "title_en": "Monthly Fish Production Report",
            "title_si": "මාසික මත්ස්‍ය නිෂ්පාදන වාර්තාව",
            "title_ta": "மாதாந்த மீன் உற்பத்தி அறிக்கை",
            "description_en": "Official fish production statistics for September 2025 across marine and inland waters.",
            "description_si": "සාගර සහ මිරිදිය ජලාශ ආශ්‍රිතව 2025 සැප්තැම්බර් මස නිල මත්ස්‍ය නිෂ්පාදන සංඛ්‍යාලේඛන.",
            "description_ta": "கடல் மற்றும் நன்னீர் நிலைகளில் 2025 செப்டம்பர் மாதத்திற்கான உத்தியோகபூர்வ மீன் உற்பத்தி புள்ளிவிவரங்கள்.",
            "file_type": "XLSX",
            "file_size": "54 KB",
            "file_url_fallback": "#",
            "published_date": "2025-09-30",
            "display_date": "30 September 2025",
            "order": 7,
        },
    ]

    for item in reports:
        obj, created = MonthlyProductionReport.objects.update_or_create(
            report_id=item["report_id"],
            defaults=item,
        )
        print(f"  {'Created' if created else 'Updated'}: [{obj.report_id}] - {obj.year} {obj.month}")

    print("[SUCCESS] Monthly Fish Production Data Successfully Seeded!")

if __name__ == "__main__":
    seed()
