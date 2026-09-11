import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from export_import_statistics.models import (
    ExportImportHeader,
    ExportImportSummaryMetric,
    ExportImportReport,
)

def seed():
    print("[*] Seeding Export & Import Statistics Data...")

    # 1. Header
    header, _ = ExportImportHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Trade & Commerce Statistics"
    header.title_en = "Export and Import of Fish and Fishery Products"
    header.description_en = "Official monthly statistics on fish exports, imports, trade values, customs volume reconciliations, and balance of trade compiled by the Ministry of Fisheries."
    header.summary_heading_en = "Fisheries Trade Key Performance Highlights"

    header.badge_text_si = "වෙළඳ සහ වාණිජ සංඛ්‍යාලේඛන"
    header.title_si = "මත්ස්‍ය සහ ධීවර නිෂ්පාදන අපනයන සහ ආනයන දත්ත"
    header.description_si = "ධීවර අමාත්‍යාංශය විසින් සකස් කරන ලද මත්ස්‍ය අපනයන, ආනයන, වෙළඳ වටිනාකම් සහ වෙළඳ ශේෂය පිළිබඳ නිල මාසික සංඛ්‍යාලේඛන."
    header.summary_heading_si = "ධීවර වෙළඳ ප්‍රධාන කාර්යසාධන විශේෂාංග"

    header.badge_text_ta = "வர்த்தகம் மற்றும் வணிக புள்ளிவிவரங்கள்"
    header.title_ta = "மீன் மற்றும் மீன்பிடிப் பொருட்களின் ஏற்றுமதி மற்றும் இறக்குமதி"
    header.description_ta = "கடற்றொழில் அமைச்சினால் தொகுக்கப்பட்ட மீன் ஏற்றுமதி, இறக்குமதி, வர்த்தக மதிப்புகள் மற்றும் வர்த்தக சமநிலை பற்றிய உத்தியோகபூர்வ மாதாந்த புள்ளிவிவரங்கள்."
    header.summary_heading_ta = "மீன்பிடி வர்த்தக முக்கிய செயல்திறன் சிறப்பம்சங்கள்"
    header.save()

    # 2. Summary Metrics
    metrics = [
        {
            "metric_id": "export-val",
            "title_en": "Export Value",
            "title_si": "අපනයන වටිනාකම",
            "title_ta": "ஏற்றுமதி மதிப்பு",
            "value_en": "LKR 78.4",
            "value_si": "රුපියල් බිලියන 78.4",
            "value_ta": "ரூ. 78.4 பில்லியன்",
            "unit_en": "Billion",
            "unit_si": "බිලියන",
            "unit_ta": "பில்லியன்",
            "period_en": "2026 YTD",
            "period_si": "2026 වසරේ මේ දක්වා",
            "period_ta": "2026 இதுவரையான காலம்",
            "trend_en": "+12.4% YoY",
            "trend_si": "+12.4% වාර්ෂික වර්ධනය",
            "trend_ta": "+12.4% வருடாந்த வளர்ச்சி",
            "icon_type": "export-val",
            "order": 1,
        },
        {
            "metric_id": "import-val",
            "title_en": "Import Value",
            "title_si": "ආනයන වියදම",
            "title_ta": "இறக்குமதி மதிப்பு",
            "value_en": "LKR 31.2",
            "value_si": "රුපියල් බිලියන 31.2",
            "value_ta": "ரூ. 31.2 பில்லியன்",
            "unit_en": "Billion",
            "unit_si": "බිලියන",
            "unit_ta": "பில்லியன்",
            "period_en": "2026 YTD",
            "period_si": "2026 වසරේ මේ දක්වා",
            "period_ta": "2026 இதுவரையான காலம்",
            "trend_en": "-4.1% YoY",
            "trend_si": "-4.1% වාර්ෂික අඩුවීම",
            "trend_ta": "-4.1% வருடாந்த குறைவு",
            "icon_type": "import-val",
            "order": 2,
        },
        {
            "metric_id": "trade-balance",
            "title_en": "Trade Balance",
            "title_si": "වෙළඳ ශේෂය",
            "title_ta": "வர்த்தக சமநிலை",
            "value_en": "+ LKR 47.2",
            "value_si": "+ රුපියල් බිලියන 47.2",
            "value_ta": "+ ரூ. 47.2 பில்லியன்",
            "unit_en": "Billion Surplus",
            "unit_si": "බිලියන අතිරික්තය",
            "unit_ta": "பில்லியன் உபரி",
            "period_en": "2026 YTD",
            "period_si": "2026 වසරේ මේ දක්වා",
            "period_ta": "2026 இதுவரையான காலம்",
            "trend_en": "Positive Surplus",
            "trend_si": "ධනාත්මක වෙළඳ අතිරික්තය",
            "trend_ta": "நேர்மறை வர்த்தக உபரி",
            "icon_type": "balance",
            "order": 3,
        },
        {
            "metric_id": "export-qty",
            "title_en": "Total Export Volume",
            "title_si": "මුළු අපනයන පරිමාව",
            "title_ta": "மொத்த ஏற்றுமதி அளவு",
            "value_en": "24,850",
            "value_si": "මෙ.ටො. 24,850",
            "value_ta": "மெ.தொ. 24,850",
            "unit_en": "Metric Tons",
            "unit_si": "මෙට්‍රික් ටොන්",
            "unit_ta": "மெட்ரிக் தொன்",
            "period_en": "2026 YTD",
            "period_si": "2026 වසරේ මේ දක්වා",
            "period_ta": "2026 இதுவரையான காலம்",
            "trend_en": "+8.2% YoY",
            "trend_si": "+8.2% වාර්ෂික වර්ධනය",
            "trend_ta": "+8.2% வருடாந்த வளர்ச்சி",
            "icon_type": "export-qty",
            "order": 4,
        },
        {
            "metric_id": "import-qty",
            "title_en": "Total Import Volume",
            "title_si": "මුළු ආනයන පරිමාව",
            "title_ta": "மொத்த இறக்குமதி அளவு",
            "value_en": "42,100",
            "value_si": "මෙ.ටො. 42,100",
            "value_ta": "மெ.தொ. 42,100",
            "unit_en": "Metric Tons",
            "unit_si": "මෙට්‍රික් ටොන්",
            "unit_ta": "மெட்ரிக் தொன்",
            "period_en": "2026 YTD",
            "period_si": "2026 වසරේ මේ දක්වා",
            "period_ta": "2026 இதுவரையான காலம்",
            "trend_en": "-2.5% YoY",
            "trend_si": "-2.5% වාර්ෂික අඩුවීම",
            "trend_ta": "-2.5% வருடாந்த குறைவு",
            "icon_type": "import-qty",
            "order": 5,
        },
        {
            "metric_id": "latest-month",
            "title_en": "Latest Report Month",
            "title_si": "නවතම වාර්තා මාසය",
            "title_ta": "சமீபத்திய அறிக்கை மாதம்",
            "value_en": "May 2026",
            "value_si": "2026 මැයි",
            "value_ta": "மே 2026",
            "unit_en": "Official Release",
            "unit_si": "නිල ප්‍රකාශනය",
            "unit_ta": "உத்தியோகபூர்வ வெளியீடு",
            "period_en": "Published 31 May 2026",
            "period_si": "2026 මැයි 31 දින ප්‍රකාශිත",
            "period_ta": "31 மே 2026 வெளியிடப்பட்டது",
            "trend_en": "Updated Monthly",
            "trend_si": "මාසිකව යාවත්කාලීන වේ",
            "trend_ta": "மாதந்தோறும் புதுப்பிக்கப்படும்",
            "icon_type": "latest-month",
            "order": 6,
        },
    ]

    for m in metrics:
        obj, created = ExportImportSummaryMetric.objects.update_or_create(
            metric_id=m["metric_id"],
            defaults=m,
        )
        print(f"  Metric {'Created' if created else 'Updated'}: [{obj.metric_id}] - {obj.title_en}")

    # 3. Monthly Reports
    reports = [
        # --- 2026 Reports ---
        {
            "report_id": "2026-05",
            "year": 2026,
            "month": "May",
            "month_number": 5,
            "title_en": "Export and Import of Fish",
            "title_si": "මත්ස්‍ය අපනයන සහ ආනයන වාර්තාව",
            "title_ta": "மீன் ஏற்றுமதி மற்றும் இறக்குமதி அறிக்கை",
            "description_en": "Official monthly statistics on fish exports, imports and trade performance for May 2026.",
            "description_si": "2026 මැයි මස මත්ස්‍ය අපනයන, ආනයන සහ වෙළඳ කාර්යසාධනය පිළිබඳ නිල සංඛ්‍යාලේඛන.",
            "description_ta": "2026 மே மாதத்திற்கான மீன் ஏற்றுமதி, இறக்குமதி மற்றும் வர்த்தக செயல்திறன் பற்றிய உத்தியோகபூர்வ புள்ளிவிவரங்கள்.",
            "file_type": "PDF",
            "file_size": "258 KB",
            "file_url_fallback": "#",
            "published_date": "2026-05-31",
            "display_date": "31 May 2026",
            "order": 1,
        },
        {
            "report_id": "2026-04",
            "year": 2026,
            "month": "April",
            "month_number": 4,
            "title_en": "Export and Import of Fish",
            "title_si": "මත්ස්‍ය අපනයන සහ ආනයන වාර්තාව",
            "title_ta": "மீன் ஏற்றுமதி மற்றும் இறக்குமதி அறிக்கை",
            "description_en": "Official monthly statistics on fish exports, imports and trade performance for April 2026.",
            "description_si": "2026 අප්‍රේල් මස මත්ස්‍ය අපනයන, ආනයන සහ වෙළඳ කාර්යසාධනය පිළිබඳ නිල සංඛ්‍යාලේඛන.",
            "description_ta": "2026 ஏப்ரல் மாதத்திற்கான மீன் ஏற்றுமதி, இறக்குமதி மற்றும் வர்த்தக செயல்திறன் பற்றிய உத்தியோகபூர்வ புள்ளிவிவரங்கள்.",
            "file_type": "PDF",
            "file_size": "254 KB",
            "file_url_fallback": "#",
            "published_date": "2026-04-30",
            "display_date": "30 April 2026",
            "order": 2,
        },
        {
            "report_id": "2026-03",
            "year": 2026,
            "month": "March",
            "month_number": 3,
            "title_en": "Export and Import of Fish",
            "title_si": "මත්ස්‍ය අපනයන සහ ආනයන වාර්තාව",
            "title_ta": "மீன் ஏற்றுமதி மற்றும் இறக்குமதி அறிக்கை",
            "description_en": "Official monthly statistics on fish exports, imports and trade performance for March 2026.",
            "description_si": "2026 මාර්තු මස මත්ස්‍ය අපනයන, ආනයන සහ වෙළඳ කාර්යසාධනය පිළිබඳ නිල සංඛ්‍යාලේඛන.",
            "description_ta": "2026 மார்ச் மாதத்திற்கான மீன் ஏற்றுமதி, இறக்குமதி மற்றும் வர்த்தக செயல்திறன் பற்றிய உத்தியோகபூர்வ புள்ளிவிவரங்கள்.",
            "file_type": "PDF",
            "file_size": "251 KB",
            "file_url_fallback": "#",
            "published_date": "2026-03-31",
            "display_date": "31 March 2026",
            "order": 3,
        },
        {
            "report_id": "2026-02",
            "year": 2026,
            "month": "February",
            "month_number": 2,
            "title_en": "Export and Import of Fish",
            "title_si": "මත්ස්‍ය අපනයන සහ ආනයන වාර්තාව",
            "title_ta": "மீன் ஏற்றுமதி மற்றும் இறக்குமதி அறிக்கை",
            "description_en": "Official monthly statistics on fish exports, imports and trade performance for February 2026.",
            "description_si": "2026 පෙබරවාරි මස මත්ස්‍ය අපනයන, ආනයන සහ වෙළඳ කාර්යසාධනය පිළිබඳ නිල සංඛ්‍යාලේඛන.",
            "description_ta": "2026 பெப்ரவரி மாதத்திற்கான மீன் ஏற்றுமதி, இறக்குமதி மற்றும் வர்த்தக செயல்திறன் பற்றிய உத்தியோகபூர்வ புள்ளிவிவரங்கள்.",
            "file_type": "PDF",
            "file_size": "248 KB",
            "file_url_fallback": "#",
            "published_date": "2026-02-28",
            "display_date": "28 February 2026",
            "order": 4,
        },
        {
            "report_id": "2026-01",
            "year": 2026,
            "month": "January",
            "month_number": 1,
            "title_en": "Export and Import of Fish",
            "title_si": "මත්ස්‍ය අපනයන සහ ආනයන වාර්තාව",
            "title_ta": "மீன் ஏற்றுமதி மற்றும் இறக்குமதி அறிக்கை",
            "description_en": "Official monthly statistics on fish exports, imports and trade performance for January 2026.",
            "description_si": "2026 ජනවාරි මස මත්ස්‍ය අපනයන, ආනයන සහ වෙළඳ කාර්යසාධනය පිළිබඳ නිල සංඛ්‍යාලේඛන.",
            "description_ta": "2026 ஜனவரி மாதத்திற்கான மீன் ஏற்றுமதி, இறக்குமதி மற்றும் வர்த்தக செயல்திறன் பற்றிய உத்தியோகபூர்வ புள்ளிவிவரங்கள்.",
            "file_type": "PDF",
            "file_size": "245 KB",
            "file_url_fallback": "#",
            "published_date": "2026-01-31",
            "display_date": "31 January 2026",
            "order": 5,
        },
        # --- 2025 Reports ---
        {
            "report_id": "2025-12",
            "year": 2025,
            "month": "December",
            "month_number": 12,
            "title_en": "Export and Import of Fish",
            "title_si": "මත්ස්‍ය අපනයන සහ ආනයන වාර්තාව",
            "title_ta": "மீன் ஏற்றுமதி மற்றும் இறக்குமதி அறிக்கை",
            "description_en": "Official monthly statistics on fish exports, imports and annual trade reconciliation for December 2025.",
            "description_si": "2025 දෙසැම්බර් මස වාර්ෂික වෙළඳ සංසන්දනය ඇතුළත් මත්ස්‍ය අපනයන සහ ආනයන නිල වාර්තාව.",
            "description_ta": "2025 டிசம்பர் மாதத்திற்கான வருடாந்த வர்த்தக மதிப்பீடுகள் உள்ளிட்ட உத்தியோகபூர்வ அறிக்கை.",
            "file_type": "PDF",
            "file_size": "260 KB",
            "file_url_fallback": "#",
            "published_date": "2025-12-31",
            "display_date": "31 December 2025",
            "order": 6,
        },
        {
            "report_id": "2025-11",
            "year": 2025,
            "month": "November",
            "month_number": 11,
            "title_en": "Export and Import of Fish",
            "title_si": "මත්ස්‍ය අපනයන සහ ආනයන වාර්තාව",
            "title_ta": "மீன் ஏற்றுமதி மற்றும் இறக்குமதி அறிக்கை",
            "description_en": "Official monthly statistics on fish exports and imports for November 2025.",
            "description_si": "2025 නොවැම්බර් මස මත්ස්‍ය අපනයන සහ ආනයන නිල සංඛ්‍යාලේඛන.",
            "description_ta": "2025 நவம்பர் மாதத்திற்கான மீன் ஏற்றுமதி மற்றும் இறக்குமதி உத்தியோகபூர்வ புள்ளிவிவரங்கள்.",
            "file_type": "PDF",
            "file_size": "252 KB",
            "file_url_fallback": "#",
            "published_date": "2025-11-30",
            "display_date": "30 November 2025",
            "order": 7,
        },
    ]

    for item in reports:
        obj, created = ExportImportReport.objects.update_or_create(
            report_id=item["report_id"],
            defaults=item,
        )
        print(f"  Report {'Created' if created else 'Updated'}: [{obj.report_id}] - {obj.year} {obj.month}")

    print("[SUCCESS] Export & Import Statistics Data Successfully Seeded!")

if __name__ == "__main__":
    seed()
