import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from weekly_fish_prices.models import WeeklyFishPricesHeader, WeeklyPriceReport

def seed():
    print("[*] Seeding Weekly Fish Prices Data...")

    header, _ = WeeklyFishPricesHeader.objects.get_or_create(id=1)
    header.badge_text_en = "Official Market Intelligence"
    header.title_en = "Weekly Fish Price Reports"
    header.description_en = "Browse and download official weekly retail and wholesale fish price intelligence reports across Sri Lanka's major fishery harbours and consumer markets."

    header.badge_text_si = "නිල වෙළඳපල බුද්ධි තොරතුරු"
    header.title_si = "සතිපතා මත්ස්‍ය මිල වාර්තා"
    header.description_si = "ශ්‍රී ලංකාවේ ප්‍රධාන ධීවර වරායන් සහ තොග/සිල්ලර වෙළඳපල ආශ්‍රිත නිල සතිපතා මත්ස්‍ය මිල වාර්තා මෙතැනින් බාගත කරගන්න."

    header.badge_text_ta = "உத்தியோகபூர்வ சந்தை நுண்ணறிவு"
    header.title_ta = "வாராந்த மீன் விலை அறிக்கைகள்"
    header.description_ta = "இலங்கையின் பிரதான மீன்பிடித் துறைமுகங்கள் மற்றும் சந்தைகளில் வாராந்த சில்லறை மற்றும் மொத்த மீன் விலை அறிக்கைகளைப் பதிவிறக்குங்கள்."
    header.save()

    reports = [
        # --- 2026 Reports ---
        {
            "report_id": "report-2026-june-w4",
            "year": 2026,
            "month": "June",
            "month_number": 6,
            "week": 4,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-06-28",
            "display_date": "28 June 2026",
            "file_size": "726 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-june-week4.pdf",
            "order": 1,
        },
        {
            "report_id": "report-2026-june-w3",
            "year": 2026,
            "month": "June",
            "month_number": 6,
            "week": 3,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-06-21",
            "display_date": "21 June 2026",
            "file_size": "698 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-june-week3.pdf",
            "order": 2,
        },
        {
            "report_id": "report-2026-june-w2",
            "year": 2026,
            "month": "June",
            "month_number": 6,
            "week": 2,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-06-14",
            "display_date": "14 June 2026",
            "file_size": "712 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-june-week2.pdf",
            "order": 3,
        },
        {
            "report_id": "report-2026-june-w1",
            "year": 2026,
            "month": "June",
            "month_number": 6,
            "week": 1,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-06-07",
            "display_date": "07 June 2026",
            "file_size": "680 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-june-week1.pdf",
            "order": 4,
        },
        {
            "report_id": "report-2026-may-w4",
            "year": 2026,
            "month": "May",
            "month_number": 5,
            "week": 4,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-05-31",
            "display_date": "31 May 2026",
            "file_size": "740 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-may-week4.pdf",
            "order": 5,
        },
        {
            "report_id": "report-2026-may-w3",
            "year": 2026,
            "month": "May",
            "month_number": 5,
            "week": 3,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-05-24",
            "display_date": "24 May 2026",
            "file_size": "705 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-may-week3.pdf",
            "order": 6,
        },
        {
            "report_id": "report-2026-may-w2",
            "year": 2026,
            "month": "May",
            "month_number": 5,
            "week": 2,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-05-17",
            "display_date": "17 May 2026",
            "file_size": "690 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-may-week2.pdf",
            "order": 7,
        },
        {
            "report_id": "report-2026-may-w1",
            "year": 2026,
            "month": "May",
            "month_number": 5,
            "week": 1,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-05-10",
            "display_date": "10 May 2026",
            "file_size": "715 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-may-week1.pdf",
            "order": 8,
        },
        {
            "report_id": "report-2026-apr-w4",
            "year": 2026,
            "month": "April",
            "month_number": 4,
            "week": 4,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-04-26",
            "display_date": "26 April 2026",
            "file_size": "730 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-april-week4.pdf",
            "order": 9,
        },
        {
            "report_id": "report-2026-apr-w3",
            "year": 2026,
            "month": "April",
            "month_number": 4,
            "week": 3,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-04-19",
            "display_date": "19 April 2026",
            "file_size": "700 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-april-week3.pdf",
            "order": 10,
        },
        {
            "report_id": "report-2026-mar-w4",
            "year": 2026,
            "month": "March",
            "month_number": 3,
            "week": 4,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-03-29",
            "display_date": "29 March 2026",
            "file_size": "695 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-march-week4.pdf",
            "order": 11,
        },
        {
            "report_id": "report-2026-mar-w3",
            "year": 2026,
            "month": "March",
            "month_number": 3,
            "week": 3,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2026-03-22",
            "display_date": "22 March 2026",
            "file_size": "710 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2026-march-week3.pdf",
            "order": 12,
        },
        # --- 2025 Reports ---
        {
            "report_id": "report-2025-dec-w4",
            "year": 2025,
            "month": "December",
            "month_number": 12,
            "week": 4,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2025-12-28",
            "display_date": "28 December 2025",
            "file_size": "750 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2025-december-week4.pdf",
            "order": 13,
        },
        {
            "report_id": "report-2025-dec-w3",
            "year": 2025,
            "month": "December",
            "month_number": 12,
            "week": 3,
            "title_en": "Weekly Fish Price Report",
            "title_si": "සතිපතා මත්ස්‍ය මිල වාර්තාව",
            "title_ta": "வாராந்த மீன் விலை அறிக்கை",
            "published_date": "2025-12-21",
            "display_date": "21 December 2025",
            "file_size": "715 KB",
            "pdf_url_fallback": "/downloads/weekly-price-reports/2025-december-week3.pdf",
            "order": 14,
        },
    ]

    for item in reports:
        obj, created = WeeklyPriceReport.objects.update_or_create(
            report_id=item["report_id"],
            defaults=item,
        )
        print(f"  {'Created' if created else 'Updated'}: [{obj.report_id}] - {obj.year} {obj.month} W{obj.week}")

    print("[SUCCESS] Weekly Fish Prices Data Successfully Seeded!")

if __name__ == "__main__":
    seed()
