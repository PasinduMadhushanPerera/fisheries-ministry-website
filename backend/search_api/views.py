import logging
import re
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from news.models import NewsArticleItem
from notices.models import NoticeItem
from press_releases.models import PressReleaseItem
from events.models import EventItem
from procurement_page.models import ProcurementTenderItem
from recruitment_page.models import RecruitmentVacancyItem
from local_training.models import LocalTrainingProgramme
from foreign_training.models import ForeignTrainingProgramme
from downloads_page.models import DownloadDocumentItem
from rti_page.models import RtiDocumentItem
from weekly_fish_prices.models import WeeklyPriceReport
from monthly_fish_production.models import MonthlyProductionReport
from annual_statistics.models import AnnualStatisticsReport
from export_import_statistics.models import ExportImportReport
from fishery_information.models import FisheryInformationItem
from divisions_page.models import MinistryDivision
from contact_page.models import ContactFaq
from pages.models import DynamicPage

logger = logging.getLogger(__name__)


def resolve_text(obj, field_base: str, lang: str) -> str:
    if lang == "si":
        val = getattr(obj, f"{field_base}_si", "")
        if val:
            return val
    elif lang == "ta":
        val = getattr(obj, f"{field_base}_ta", "")
        if val:
            return val
    return getattr(obj, f"{field_base}_en", "") or getattr(obj, field_base, "") or ""


def resolve_date_str(val) -> str | None:
    if not val:
        return None
    if hasattr(val, "strftime"):
        return val.strftime("%Y-%m-%d")
    s = str(val).strip()
    return s if s else None


def clean_html(text: str) -> str:
    if not text:
        return ""
    clean = re.sub(r"<[^>]+>", " ", text)
    return " ".join(clean.split())


# Curated Portal Shortcuts with Trilingual Metadata
PORTAL_SERVICES = [
    {
        "id": "weather",
        "title_en": "Marine Weather & Sea State Forecast",
        "title_si": "සාගර කාලගුණය සහ මුහුදු තත්ත්ව අනාවැකිය",
        "title_ta": "கடல் வானிலை மற்றும் கடல் நிலை முன்னறிவிப்பு",
        "summary_en": "View today's weather conditions, wind speed, wave height, and ocean forecasts relevant to marine fisheries via the Department of Meteorology.",
        "summary_si": "කාලගුණ විද්‍යා දෙපාර්තමේන්තුව හරහා ධීවර කටයුතු සඳහා අදාළ දෛනික මුහුදු කාලගුණය, සුළඟේ වේගය සහ රළ උස පිළිබඳ තොරතුරු ලබා ගන්න.",
        "summary_ta": "வளிமண்டலவியல் திணைக்களத்தின் ஊடாக கடல் மீன்பிடி நடவடிக்கைகளுக்குத் தேவையான அன்றைய வானிலை நிலை, காற்றின் வேகம் மற்றும் அலைகளின் உயரம் ஆகியவற்றைப் பார்க்கவும்.",
        "href": "https://www.meteo.gov.lk",
        "category_key": "support",
        "badge_en": "Weather Service",
        "badge_si": "කාලගුණ සේවාව",
        "badge_ta": "வானிலை சேவை",
        "keywords": ["weather", "forecast", "sea", "marine", "waves", "wind", "meteo", "කාලගුණය", "සුළඟ", "මුහුද", "வானிலை"],
    },
    {
        "id": "complaints",
        "title_en": "Internal Affairs Unit & Public Complaints",
        "title_si": "අභ්‍යන්තර කටයුතු අංශය සහ මහජන පැමිණිලි",
        "title_ta": "உள்நாட்டு விவகாரப் பிரிவு மற்றும் பொது முறைப்பாடுகள்",
        "summary_en": "Submit grievances, integrity concerns, or contact the Ministry's Internal Affairs Unit regarding public services and ministerial oversight.",
        "summary_si": "රාජ්‍ය සේවාවන් සහ අමාත්‍යාංශ අධීක්ෂණය සම්බන්ධයෙන් පැමිණිලි, ගැටළු හෝ ප්‍රතිචාර අභ්‍යන්තර කටයුතු අංශයට ඉදිරිපත් කරන්න.",
        "summary_ta": "பொதுச் சேவைகள் மற்றும் அமைச்சின் மேற்பார்வை தொடர்பான முறைப்பாடுகள் அல்லது கவலைகளை உள்நாட்டு விவகாரப் பிரிவுக்குச் சமர்ப்பிக்கவும்.",
        "href": "https://www.publiccomplaint.gov.lk",
        "category_key": "support",
        "badge_en": "Public Service",
        "badge_si": "මහජන සේවාව",
        "badge_ta": "பொது சேவை",
        "keywords": ["complaints", "internal affairs", "grievances", "oversight", "integrity", "පැමිණිලි", "අභ්‍යන්තර", "முறைப்பாடு"],
    },
    {
        "id": "licensing",
        "title_en": "Fishing Licensing & Vessel Registration (DFAR)",
        "title_si": "ධීවර බලපත්‍ර සහ යාත්‍රා ලියාපදිංචිය (DFAR)",
        "title_ta": "மீன்பிடி உரிமங்கள் மற்றும் படகுப் பதிவு (DFAR)",
        "summary_en": "Official regulations, operating permits, vessel registry, and coastal fishing licenses administered by the Department of Fisheries and Aquatic Resources.",
        "summary_si": "ධීවර හා ජලජ සම්පත් දෙපාර්තමේන්තුව මඟින් නියාමනය කරනු ලබන ධීවර යාත්‍රා ලියාපදිංචිය, මුහුදු බලපත්‍ර සහ නීති රෙගුලාසි.",
        "summary_ta": "கடற்றொழில் மற்றும் நீரியல் வளங்கள் திணைக்களத்தினால் நிர்வகிக்கப்படும் மீன்பிடிப் படகுப் பதிவு மற்றும் கடல் உரிமங்கள்.",
        "href": "/services",
        "category_key": "support",
        "badge_en": "Licensing",
        "badge_si": "බලපත්‍ර",
        "badge_ta": "உரிமம்",
        "keywords": ["licensing", "vessel", "permits", "dfar", "boats", "registration", "බලපත්‍ර", "බෝට්ටු", "ලියාපදිංචි", "உரிமம்"],
    },
    {
        "id": "institutions-hub",
        "title_en": "Institutions & Statutory Bodies",
        "title_si": "අනුබද්ධ ආයතන සහ ව්‍යවස්ථාපිත මණ්ඩල",
        "title_ta": "இணைந்த நிறுவனங்கள் மற்றும் சட்டப்பூர்வ சபைகள்",
        "summary_en": "Access official portals of sector organizations including DFAR, NARA, NAQDA, CFHC, CFC, and Cey-Nor Foundation.",
        "summary_si": "DFAR, NARA, NAQDA, CFHC, CFC සහ Cey-Nor ඇතුළු අමාත්‍යාංශය යටතේ ක්‍රියාත්මක වන සියලුම රාජ්‍ය ආයතන පිළිබඳ විස්තර.",
        "summary_ta": "DFAR, NARA, NAQDA, CFHC, CFC உட்பட அமைச்சின் கீழ் இயங்கும் நிறுவனங்களின் உத்தியோகபூர்வ போர்ட்டல்களை அணுகவும்.",
        "href": "/institutions",
        "category_key": "about",
        "badge_en": "Institutions",
        "badge_si": "ආයතන",
        "badge_ta": "நிறுவனங்கள்",
        "keywords": ["institutions", "nara", "naqda", "cfhc", "cfc", "ceynor", "dfar", "ආයතන", "නාරා", "நிறுவனம்"],
    },
    {
        "id": "contact-portal",
        "title_en": "Ministry Headquarters & Contact Directory",
        "title_si": "අමාත්‍යාංශ මූලස්ථානය සහ දුරකථන නාමාවලිය",
        "title_ta": "அமைச்சின் தலைமையகம் மற்றும் தொடர்பு விபரக் கொத்து",
        "summary_en": "Access official telephone numbers, officer directories, room locations, headquarters address, and public inquiry messaging.",
        "summary_si": "අමාත්‍යාංශයේ නිල දුරකථන අංක, අංශ ප්‍රධානීන්ගේ විස්තර, මූලස්ථාන ලිපිනය සහ විමසීම් යොමු කිරීමේ පෝරමය.",
        "summary_ta": "அமைச்சின் உத்தியோகபூர்வ தொலைபேசி எண்கள், அதிகாரிகள் விபரம், தலைமையக முகவரி மற்றும் விசாரணைப் படிவம்.",
        "href": "/contact",
        "category_key": "support",
        "badge_en": "Directory",
        "badge_si": "නාමාවලිය",
        "badge_ta": "விபரக் கொத்து",
        "keywords": ["contact", "directory", "phone", "email", "address", "officers", "headquarters", "දුරකථන", "ලිපිනය", "තොරතුරු", "தொடர்பு"],
    },
]

CATEGORY_LABELS = {
    "all": {"en": "All Results", "si": "සියලු ප්‍රතිඵල", "ta": "அனைத்து முடிவுகளும்"},
    "tenders": {"en": "Tenders & Procurement", "si": "ටෙන්ඩර් සහ ප්‍රසම්පාදන", "ta": "டெண்டர்கள் & கொள்முதல்"},
    "careers": {"en": "Careers & Vacancies", "si": "රැකියා සහ පුරප්පාඩු", "ta": "தொழில் வாய்ப்புகள்"},
    "training": {"en": "Training & Fellowships", "si": "පුහුණු පාඨමාලා", "ta": "பயிற்சி திட்டங்கள்"},
    "media": {"en": "News & Notices", "si": "පුවත් සහ නිවේදන", "ta": "செய்திகள் & அறிவிப்புகள்"},
    "downloads": {"en": "Downloads & Forms", "si": "බාගැනීම් සහ ආකෘති පත්‍ර", "ta": "பதிவிறக்கங்கள் & படிவங்கள்"},
    "statistics": {"en": "Fisheries Statistics", "si": "ධීවර සංඛ්‍යාලේඛන", "ta": "புள்ளிவிவரங்கள்"},
    "about": {"en": "Ministry & Divisions", "si": "අමාත්‍යාංශය සහ අංශ", "ta": "அமைச்சு & பிரிவுகள்"},
    "support": {"en": "Support & Portals", "si": "සේවාවන් සහ සහාය", "ta": "ஆதரவு & சேவைகள்"},
}


class GlobalSearchView(APIView):
    """
    Unified full-text search API across all ministry models and key services
    with trilingual matching and category breakdown.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.query_params.get("q", "").strip()
        lang = request.query_params.get("lang", "en").lower()
        if lang not in ["en", "si", "ta"]:
            lang = "en"
        category_filter = request.query_params.get("category", "all").lower()

        results = []

        if query:
            q_clean = query.lower()

            # 1. Search Curated Portal Services
            for s in PORTAL_SERVICES:
                title = s[f"title_{lang}"]
                summary = s[f"summary_{lang}"]
                badge = s[f"badge_{lang}"]
                kw_str = " ".join(s["keywords"]).lower()

                if (
                    q_clean in title.lower()
                    or q_clean in summary.lower()
                    or q_clean in kw_str
                    or any(k in q_clean for k in s["keywords"])
                ):
                    results.append({
                        "id": f"service_{s['id']}",
                        "title": title,
                        "summary": summary,
                        "category_key": s["category_key"],
                        "category": CATEGORY_LABELS.get(s["category_key"], {}).get(lang, "Support"),
                        "href": s["href"],
                        "badge": badge,
                        "date": None,
                    })

            # 2. Search Procurement Tenders
            try:
                tender_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(category__icontains=query)
                    | Q(category_label_en__icontains=query)
                    | Q(category_label_si__icontains=query)
                    | Q(category_label_ta__icontains=query)
                    | Q(ref_number__icontains=query)
                    | Q(description_en__icontains=query)
                    | Q(description_si__icontains=query)
                )
                for t in ProcurementTenderItem.objects.filter(tender_q)[:15]:
                    title = resolve_text(t, "title", lang)
                    desc = clean_html(resolve_text(t, "description", lang) or t.ref_number or "Procurement Tender")
                    date_val = resolve_date_str(t.closing_date or t.published_date)
                    results.append({
                        "id": f"tender_{t.id}",
                        "title": title,
                        "summary": desc[:240] + ("..." if len(desc) > 240 else ""),
                        "category_key": "tenders",
                        "category": CATEGORY_LABELS["tenders"][lang],
                        "href": "/procurement",
                        "badge": (t.status or "Tender").capitalize(),
                        "date": date_val,
                    })
            except Exception as e:
                logger.warning(f"Error searching tenders: {e}")

            # 3. Search Recruitment & Vacancies
            try:
                rec_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(category__icontains=query)
                    | Q(category_label_en__icontains=query)
                    | Q(category_label_si__icontains=query)
                    | Q(ref_number__icontains=query)
                    | Q(description_en__icontains=query)
                )
                for r in RecruitmentVacancyItem.objects.filter(rec_q)[:15]:
                    title = resolve_text(r, "title", lang)
                    desc = clean_html(resolve_text(r, "description", lang) or r.ref_number or "Recruitment Vacancy")
                    date_val = resolve_date_str(r.closing_date or r.published_date)
                    results.append({
                        "id": f"recruitment_{r.id}",
                        "title": title,
                        "summary": desc[:240] + ("..." if len(desc) > 240 else ""),
                        "category_key": "careers",
                        "category": CATEGORY_LABELS["careers"][lang],
                        "href": "/recruitment",
                        "badge": (r.status or "Vacancy").capitalize(),
                        "date": date_val,
                    })
            except Exception as e:
                logger.warning(f"Error searching recruitment: {e}")

            # 4. Search Local Training Programmes
            try:
                loc_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(category__icontains=query)
                    | Q(category_label_en__icontains=query)
                    | Q(description_en__icontains=query)
                )
                for lp in LocalTrainingProgramme.objects.filter(loc_q)[:10]:
                    title = resolve_text(lp, "title", lang)
                    desc = clean_html(resolve_text(lp, "description", lang) or "Local fisheries training course.")
                    date_val = resolve_date_str(lp.application_deadline)
                    results.append({
                        "id": f"local_training_{lp.id}",
                        "title": title,
                        "summary": desc[:240] + ("..." if len(desc) > 240 else ""),
                        "category_key": "training",
                        "category": CATEGORY_LABELS["training"][lang],
                        "href": "/local-training",
                        "badge": "Local Training",
                        "date": date_val,
                    })
            except Exception as e:
                logger.warning(f"Error searching local training: {e}")

            # 5. Search Foreign Training Programmes
            try:
                for_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(country_en__icontains=query)
                    | Q(category__icontains=query)
                    | Q(description_en__icontains=query)
                )
                for fp in ForeignTrainingProgramme.objects.filter(for_q)[:10]:
                    title = resolve_text(fp, "title", lang)
                    desc = clean_html(resolve_text(fp, "description", lang) or "International ocean fellowship or seminar.")
                    date_val = resolve_date_str(fp.application_deadline)
                    results.append({
                        "id": f"foreign_training_{fp.id}",
                        "title": title,
                        "summary": desc[:240] + ("..." if len(desc) > 240 else ""),
                        "category_key": "training",
                        "category": CATEGORY_LABELS["training"][lang],
                        "href": "/foreign-training",
                        "badge": "Overseas Training",
                        "date": date_val,
                    })
            except Exception as e:
                logger.warning(f"Error searching foreign training: {e}")

            # 6. Search News Articles
            try:
                news_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(summary_en__icontains=query)
                    | Q(summary_si__icontains=query)
                    | Q(category__icontains=query)
                )
                for n in NewsArticleItem.objects.filter(news_q)[:10]:
                    title = resolve_text(n, "title", lang)
                    desc = clean_html(resolve_text(n, "summary", lang) or "Ministry news article.")
                    date_val = resolve_date_str(n.published_date)
                    results.append({
                        "id": f"news_{n.id}",
                        "title": title,
                        "summary": desc[:240] + ("..." if len(desc) > 240 else ""),
                        "category_key": "media",
                        "category": CATEGORY_LABELS["media"][lang],
                        "href": "/media-centre/news",
                        "badge": "News",
                        "date": date_val,
                    })
            except Exception as e:
                logger.warning(f"Error searching news: {e}")

            # 7. Search Notices & Circulars
            try:
                notice_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(notice_number__icontains=query)
                    | Q(summary_en__icontains=query)
                    | Q(summary_si__icontains=query)
                    | Q(category__icontains=query)
                )
                for notc in NoticeItem.objects.filter(notice_q)[:10]:
                    title = resolve_text(notc, "title", lang)
                    desc = clean_html(resolve_text(notc, "summary", lang) or notc.notice_number or "Public Notice")
                    date_val = resolve_date_str(notc.published_date)
                    results.append({
                        "id": f"notice_{notc.id}",
                        "title": title,
                        "summary": desc[:240] + ("..." if len(desc) > 240 else ""),
                        "category_key": "media",
                        "category": CATEGORY_LABELS["media"][lang],
                        "href": "/media-centre/notices",
                        "badge": "Notice",
                        "date": date_val,
                    })
            except Exception as e:
                logger.warning(f"Error searching notices: {e}")

            # 8. Search Press Releases
            try:
                press_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(summary_en__icontains=query)
                    | Q(release_number__icontains=query)
                )
                for p in PressReleaseItem.objects.filter(press_q)[:8]:
                    title = resolve_text(p, "title", lang)
                    desc = clean_html(resolve_text(p, "summary", lang) or "Official ministerial statement.")
                    date_val = resolve_date_str(p.published_date)
                    results.append({
                        "id": f"press_{p.id}",
                        "title": title,
                        "summary": desc[:240] + ("..." if len(desc) > 240 else ""),
                        "category_key": "media",
                        "category": CATEGORY_LABELS["media"][lang],
                        "href": "/media-centre/press-releases",
                        "badge": "Press Release",
                        "date": date_val,
                    })
            except Exception as e:
                logger.warning(f"Error searching press releases: {e}")

            # 9. Search Events
            try:
                event_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(summary_en__icontains=query)
                    | Q(venue_en__icontains=query)
                )
                for ev in EventItem.objects.filter(event_q)[:6]:
                    title = resolve_text(ev, "title", lang)
                    desc = clean_html(resolve_text(ev, "summary", lang) or "Ministry event and meeting.")
                    date_val = resolve_date_str(ev.date)
                    results.append({
                        "id": f"event_{ev.id}",
                        "title": title,
                        "summary": desc[:240] + ("..." if len(desc) > 240 else ""),
                        "category_key": "media",
                        "category": CATEGORY_LABELS["media"][lang],
                        "href": "/media-centre/events",
                        "badge": "Event",
                        "date": date_val,
                    })
            except Exception as e:
                logger.warning(f"Error searching events: {e}")

            # 10. Search Downloads & Documents
            try:
                doc_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(description_en__icontains=query)
                    | Q(year__icontains=query)
                )
                for d in DownloadDocumentItem.objects.filter(doc_q)[:12]:
                    title = resolve_text(d, "title", lang)
                    desc = clean_html(resolve_text(d, "description", lang) or f"Official downloadable document ({d.file_type or 'PDF'}).")
                    results.append({
                        "id": f"download_{d.id}",
                        "title": title,
                        "summary": desc[:240] + ("..." if len(desc) > 240 else ""),
                        "category_key": "downloads",
                        "category": CATEGORY_LABELS["downloads"][lang],
                        "href": "/downloads",
                        "badge": d.file_type or "Download",
                        "date": d.display_date or d.year or None,
                    })
            except Exception as e:
                logger.warning(f"Error searching downloads: {e}")

            # 11. Search Right to Information (RTI) Documents
            try:
                rti_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(document_number__icontains=query)
                )
                for rti in RtiDocumentItem.objects.filter(rti_q)[:6]:
                    title = resolve_text(rti, "title", lang)
                    results.append({
                        "id": f"rti_{rti.id}",
                        "title": title,
                        "summary": f"Right to Information (RTI) official publication {rti.document_number or ''}.",
                        "category_key": "downloads",
                        "category": CATEGORY_LABELS["downloads"][lang],
                        "href": "/rti",
                        "badge": "RTI Document",
                        "date": None,
                    })
            except Exception as e:
                logger.warning(f"Error searching RTI: {e}")

            # 12. Search Weekly Fish Prices
            try:
                w_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(year__icontains=query)
                    | Q(month__icontains=query)
                )
                for wp in WeeklyPriceReport.objects.filter(w_q)[:6]:
                    title = resolve_text(wp, "title", lang)
                    results.append({
                        "id": f"price_{wp.id}",
                        "title": f"{title} - {wp.month} {wp.year}",
                        "summary": f"Weekly wholesale and retail fish price bulletin for {wp.month} {wp.year}.",
                        "category_key": "statistics",
                        "category": CATEGORY_LABELS["statistics"][lang],
                        "href": "/statistics/weekly-fish-prices",
                        "badge": "Fish Prices",
                        "date": wp.display_date or f"{wp.month} {wp.year}",
                    })
            except Exception as e:
                logger.warning(f"Error searching weekly fish prices: {e}")

            # 13. Search Monthly Production
            try:
                m_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(year__icontains=query)
                    | Q(month__icontains=query)
                )
                for mp in MonthlyProductionReport.objects.filter(m_q)[:6]:
                    title = resolve_text(mp, "title", lang)
                    results.append({
                        "id": f"production_{mp.id}",
                        "title": f"{title} - {mp.month} {mp.year}",
                        "summary": f"Monthly fish production report for {mp.month} {mp.year}.",
                        "category_key": "statistics",
                        "category": CATEGORY_LABELS["statistics"][lang],
                        "href": "/statistics/monthly-fish-production",
                        "badge": "Production",
                        "date": mp.display_date or f"{mp.month} {mp.year}",
                    })
            except Exception as e:
                logger.warning(f"Error searching monthly production: {e}")

            # 14. Search Annual Statistics
            try:
                a_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(year__icontains=query)
                )
                for ap in AnnualStatisticsReport.objects.filter(a_q)[:6]:
                    title = resolve_text(ap, "title", lang)
                    results.append({
                        "id": f"annual_stat_{ap.id}",
                        "title": f"{title} ({ap.year})",
                        "summary": f"Annual fisheries statistics and sector indicators for {ap.year}.",
                        "category_key": "statistics",
                        "category": CATEGORY_LABELS["statistics"][lang],
                        "href": "/statistics/annual-reports",
                        "badge": "Annual Stats",
                        "date": ap.display_date or ap.year,
                    })
            except Exception as e:
                logger.warning(f"Error searching annual statistics: {e}")

            # 15. Search Export & Import Statistics
            try:
                ei_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(year__icontains=query)
                )
                for eir in ExportImportReport.objects.filter(ei_q)[:6]:
                    title = resolve_text(eir, "title", lang)
                    results.append({
                        "id": f"export_import_{eir.id}",
                        "title": f"{title} ({eir.year})",
                        "summary": f"Fish export and import trade statistics for {eir.year}.",
                        "category_key": "statistics",
                        "category": CATEGORY_LABELS["statistics"][lang],
                        "href": "/statistics/export-and-import",
                        "badge": "Trade Stats",
                        "date": eir.display_date or eir.year,
                    })
            except Exception as e:
                logger.warning(f"Error searching export/import statistics: {e}")

            # 16. Search Fishery Related Information
            try:
                fi_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(description_en__icontains=query)
                )
                for fitem in FisheryInformationItem.objects.filter(fi_q)[:6]:
                    title = resolve_text(fitem, "title", lang)
                    results.append({
                        "id": f"fishery_info_{fitem.id}",
                        "title": title,
                        "summary": clean_html(resolve_text(fitem, "description", lang))[:240],
                        "category_key": "statistics",
                        "category": CATEGORY_LABELS["statistics"][lang],
                        "href": "/statistics/related-information",
                        "badge": "Information",
                        "date": None,
                    })
            except Exception as e:
                logger.warning(f"Error searching fishery info: {e}")

            # 17. Search Ministry Divisions
            try:
                div_q = Q(is_active=True) & (
                    Q(title_en__icontains=query)
                    | Q(title_si__icontains=query)
                    | Q(title_ta__icontains=query)
                    | Q(short_description_en__icontains=query)
                    | Q(short_description_si__icontains=query)
                )
                for dv in MinistryDivision.objects.filter(div_q)[:6]:
                    title = resolve_text(dv, "title", lang)
                    desc = clean_html(resolve_text(dv, "short_description", lang) or "Operational division under the Ministry of Fisheries.")
                    results.append({
                        "id": f"division_{dv.id}",
                        "title": title,
                        "summary": desc[:240] + ("..." if len(desc) > 240 else ""),
                        "category_key": "about",
                        "category": CATEGORY_LABELS["about"][lang],
                        "href": "/divisions",
                        "badge": "Division",
                        "date": None,
                    })
            except Exception as e:
                logger.warning(f"Error searching divisions: {e}")

            # 18. Search Contact FAQs
            try:
                faq_q = Q(is_active=True) & (
                    Q(question_en__icontains=query)
                    | Q(question_si__icontains=query)
                    | Q(question_ta__icontains=query)
                    | Q(answer_en__icontains=query)
                )
                for fq in ContactFaq.objects.filter(faq_q)[:6]:
                    q_text = resolve_text(fq, "question", lang)
                    a_text = clean_html(resolve_text(fq, "answer", lang))
                    results.append({
                        "id": f"faq_{fq.id}",
                        "title": q_text,
                        "summary": a_text[:240] + ("..." if len(a_text) > 240 else ""),
                        "category_key": "support",
                        "category": CATEGORY_LABELS["support"][lang],
                        "href": "/contact#contact-faq",
                        "badge": "FAQ",
                        "date": None,
                    })
            except Exception as e:
                logger.warning(f"Error searching FAQs: {e}")

            # 19. Search Dynamic CMS Pages (with HTML stripped)
            try:
                for pg in DynamicPage.objects.filter(is_published=True):
                    clean_content = clean_html(pg.content or "")
                    if (
                        q_clean in pg.title.lower()
                        or q_clean in (pg.hero_subtitle or "").lower()
                        or q_clean in clean_content.lower()
                    ):
                        results.append({
                            "id": f"page_{pg.id}",
                            "title": pg.title,
                            "summary": (pg.hero_subtitle or clean_content[:200]) + "...",
                            "category_key": "about",
                            "category": CATEGORY_LABELS["about"][lang],
                            "href": f"/{pg.slug}",
                            "badge": "Page",
                            "date": None,
                        })
            except Exception as e:
                logger.warning(f"Error searching pages: {e}")

        else:
            # If no query provided, show curated portal services as top suggestions
            for s in PORTAL_SERVICES:
                results.append({
                    "id": f"service_{s['id']}",
                    "title": s[f"title_{lang}"],
                    "summary": s[f"summary_{lang}"],
                    "category_key": s["category_key"],
                    "category": CATEGORY_LABELS.get(s["category_key"], {}).get(lang, "Support"),
                    "href": s["href"],
                    "badge": s[f"badge_{lang}"],
                    "date": None,
                })

        # Calculate category counts across all matched results
        category_counts = {}
        for r in results:
            cat = r["category_key"]
            category_counts[cat] = category_counts.get(cat, 0) + 1

        # Build categories list for frontend tabs
        categories_response = [
            {
                "key": "all",
                "label": CATEGORY_LABELS["all"][lang],
                "count": len(results),
            }
        ]
        for cat_key, labels in CATEGORY_LABELS.items():
            if cat_key == "all":
                continue
            count = category_counts.get(cat_key, 0)
            if count > 0 or category_filter == cat_key:
                categories_response.append({
                    "key": cat_key,
                    "label": labels[lang],
                    "count": count,
                })

        # Apply category filter if not "all"
        filtered_results = results
        if category_filter and category_filter != "all":
            filtered_results = [r for r in results if r["category_key"] == category_filter]

        # Popular search suggestions for users
        popular_suggestions = {
            "en": [
                {"query": "Tenders", "label": "Tenders & Bidding"},
                {"query": "Fish Prices", "label": "Weekly Fish Prices"},
                {"query": "Weather", "label": "Marine Weather"},
                {"query": "Licensing", "label": "Boat Licensing"},
                {"query": "Downloads", "label": "Application Forms"},
                {"query": "Vacancies", "label": "Careers"},
                {"query": "Contact", "label": "Ministry Helpdesk"},
            ],
            "si": [
                {"query": "ටෙන්ඩර්", "label": "ප්‍රසම්පාදන සහ ටෙන්ඩර්"},
                {"query": "මාළු මිල", "label": "සතිපතා මාළු මිල"},
                {"query": "කාලගුණය", "label": "මුහුදු කාලගුණය"},
                {"query": "බලපත්‍ර", "label": "ධීවර බලපත්‍ර"},
                {"query": "බාගැනීම්", "label": "අයදුම්පත් සහ ආකෘති"},
                {"query": "රැකියා", "label": "පුරප්පාඩු"},
                {"query": "සම්බන්ධතා", "label": "අමාත්‍යාංශය අමතන්න"},
            ],
            "ta": [
                {"query": "டெண்டர்கள்", "label": "டெண்டர்கள் & கொள்முதல்"},
                {"query": "மீன் விலை", "label": "வாராந்த மீன் விலை"},
                {"query": "வானிலை", "label": "கடல் வானிலை"},
                {"query": "உரிமங்கள்", "label": "மீன்பிடி உரிமங்கள்"},
                {"query": "பதிவிறக்கங்கள்", "label": "விண்ணப்ப படிவங்கள்"},
                {"query": "வேலைவாய்ப்புகள்", "label": "தொழில் வாய்ப்புகள்"},
                {"query": "தொடர்பு", "label": "அமைச்சக உதவி மையம்"},
            ],
        }

        return Response({
            "query": query,
            "lang": lang,
            "selected_category": category_filter,
            "total_results": len(filtered_results),
            "categories": categories_response,
            "results": filtered_results,
            "popular_suggestions": popular_suggestions.get(lang, popular_suggestions["en"]),
        })
