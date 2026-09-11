from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def procurement_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"procurement/{timezone.now():%Y/%m}/{safe_filename}"


CATEGORY_CHOICES = [
    ("harbour", "🏗️ Harbour & Civil Works"),
    ("equipment", "❄️ Equipment & Machinery"),
    ("it", "💻 IT, VMS & Communications"),
    ("consultancy", "📊 Consultancy & Feasibility Studies"),
    ("supplies", "📦 General Supplies & Services"),
    ("other", "📌 Other Procurement"),
]

STATUS_CHOICES = [
    ("Open", "🟢 Open for Bidding"),
    ("Closing Soon", "🟡 Closing Soon"),
    ("Closed", "🔴 Tender Closed"),
    ("Awarded", "🏆 Contract Awarded"),
]

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document"),
    ("DOCX", "Word Document (DOCX)"),
    ("XLSX", "Excel Spreadsheet (XLSX)"),
    ("ZIP", "ZIP Archive"),
]


# ==========================================================
# 01. Procurement Page Header & Intro (Multilingual)
# ==========================================================
class ProcurementPageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(max_length=100, default="Transparency & Public Accountability", verbose_name="Badge (English)")
    title_en = models.CharField(max_length=255, default="Procurement & Tenders Portal", verbose_name="Title (English)")
    description_en = models.TextField(
        default="Official e-procurement portal of the Ministry of Fisheries. Access competitive bidding documents, harbor development tenders, equipment purchasing notices, and contract award summaries.",
        verbose_name="Description (English)"
    )
    featured_badge_en = models.CharField(max_length=150, default="Featured Procurement Notices", verbose_name="Featured Section Badge (English)")
    catalogue_badge_en = models.CharField(max_length=150, default="Active & Archived Notices", verbose_name="Library Section Badge (English)")
    library_title_en = models.CharField(max_length=255, default="Procurement & Tenders Library", verbose_name="Library Section Title (English)")

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(max_length=100, blank=True, default="විනිවිදභාවය සහ මහජන වගවීම", verbose_name="Badge (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="ප්‍රසම්පාදන සහ ටෙන්ඩර් ද්වාරය", verbose_name="Title (සිංහල)")
    description_si = models.TextField(
        blank=True,
        default="ධීවර අමාත්‍යාංශයේ නිල විද්‍යුත් ප්‍රසම්පාදන ද්වාරය. තරඟකාරී ලංසු ලේඛන, වරාය සංවර්ධන ටෙන්ඩර්, උපකරණ මිලදී ගැනීමේ දැන්වීම් සහ කොන්ත්‍රාත්තු පිරිනැමීමේ තොරතුරු වෙත ප්‍රවේශ වන්න.",
        verbose_name="Description (සිංහල)"
    )
    featured_badge_si = models.CharField(max_length=150, blank=True, default="විශේෂ ප්‍රසම්පාදන දැන්වීම්", verbose_name="Featured Section Badge (සිංහල)")
    catalogue_badge_si = models.CharField(max_length=150, blank=True, default="ක්‍රියාකාරී සහ ලේඛනාගාර දැන්වීම්", verbose_name="Library Section Badge (සිංහල)")
    library_title_si = models.CharField(max_length=255, blank=True, default="ප්‍රසම්පාදන සහ ටෙන්ඩර් එකතුව", verbose_name="Library Section Title (සිංහල)")

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(max_length=100, blank=True, default="வெளிப்படைத்தன்மை மற்றும் பொதுப் பொறுப்புக்கூறல்", verbose_name="Badge (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="கொள்முதல் மற்றும் கேள்விப்பத்திர போர்டல்", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(
        blank=True,
        default="கடற்றொழில் அமைச்சின் உத்தியோகபூர்வ கொள்முதல் தளம். கேள்விப்பத்திர ஆவணங்கள், துறைமுக அபிவிருத்திப் பணிகள், உபகரணக் கொள்முதல் மற்றும் ஒப்பந்த விருது விபரங்களைப் பார்வையிடவும்.",
        verbose_name="Description (தமிழ்)"
    )
    featured_badge_ta = models.CharField(max_length=150, blank=True, default="சிறப்பு கொள்முதல் அறிவிப்புகள்", verbose_name="Featured Section Badge (தமிழ்)")
    catalogue_badge_ta = models.CharField(max_length=150, blank=True, default="செயலில் உள்ள மற்றும் காப்பகப்படுத்தப்பட்ட அறிவிப்புகள்", verbose_name="Library Section Badge (தமிழ்)")
    library_title_ta = models.CharField(max_length=255, blank=True, default="கொள்முதல் மற்றும் கேள்விப்பத்திர நூலகம்", verbose_name="Library Section Title (தமிழ்)")

    class Meta:
        verbose_name = "01. Procurement Page Header & Section Titles"
        verbose_name_plural = "01. Procurement Page Header & Section Titles"

    def __str__(self) -> str:
        return f"Header: {self.title_en}"


# ==========================================================
# 02. Procurement & Tender Notices (Multilingual)
# ==========================================================
class ProcurementTenderItem(TimeStampedModel):
    order = models.PositiveIntegerField(default=1, help_text="Display priority sequence")
    slug = models.SlugField(max_length=150, unique=True, help_text="Unique identifier slug (e.g. mirissa-harbour-dredging-2026)")
    ref_number = models.CharField(max_length=100, verbose_name="Tender Ref No (e.g. MOF/PR/2026/04)")
    year = models.IntegerField(default=2026, help_text="Procurement Year (e.g. 2026, 2025, 2024)")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="harbour")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="Open")
    featured = models.BooleanField(default=False, help_text="Check to display in top 'Featured Tenders' section")
    is_active = models.BooleanField(default=True, help_text="Display on live website")

    # 🇬🇧 English Content
    title_en = models.CharField(max_length=255, verbose_name="Tender Title (English)")
    publisher_en = models.CharField(max_length=255, verbose_name="Procuring Entity / Department (English)")
    description_en = models.TextField(verbose_name="Short Description (English)")
    category_label_en = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (English)")
    detailed_scope_en = models.TextField(blank=True, default="", verbose_name="Detailed Scope / Key Requirements (English - One per line)")
    submission_address_en = models.TextField(blank=True, default="", verbose_name="Bid Submission Address (English)")
    tender_fee_en = models.CharField(max_length=150, blank=True, default="", verbose_name="Non-Refundable Tender Fee (English)")
    bid_security_en = models.CharField(max_length=150, blank=True, default="", verbose_name="Bid Security / Guarantee (English)")
    eligibility_en = models.TextField(blank=True, default="", verbose_name="Eligibility & Registration (English)")
    contact_info_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Inquiries Contact (English)")

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Tender Title (සිංහල)")
    publisher_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Procuring Entity (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Short Description (සිංහල)")
    category_label_si = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (සිංහල)")
    detailed_scope_si = models.TextField(blank=True, default="", verbose_name="Detailed Scope (සිංහල - එක් පේළියකට එකක්)")
    submission_address_si = models.TextField(blank=True, default="", verbose_name="Submission Address (සිංහල)")
    tender_fee_si = models.CharField(max_length=150, blank=True, default="", verbose_name="Tender Fee (සිංහල)")
    bid_security_si = models.CharField(max_length=150, blank=True, default="", verbose_name="Bid Security (සිංහල)")
    eligibility_si = models.TextField(blank=True, default="", verbose_name="Eligibility (සිංහල)")
    contact_info_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Contact (සිංහල)")

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Tender Title (தமிழ்)")
    publisher_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Procuring Entity (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Short Description (தமிழ்)")
    category_label_ta = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (தமிழ்)")
    detailed_scope_ta = models.TextField(blank=True, default="", verbose_name="Detailed Scope (தமிழ் - ஒரு வரியில் ஒன்று)")
    submission_address_ta = models.TextField(blank=True, default="", verbose_name="Submission Address (தமிழ்)")
    tender_fee_ta = models.CharField(max_length=150, blank=True, default="", verbose_name="Tender Fee (தமிழ்)")
    bid_security_ta = models.CharField(max_length=150, blank=True, default="", verbose_name="Bid Security (தமிழ்)")
    eligibility_ta = models.TextField(blank=True, default="", verbose_name="Eligibility (தமிழ்)")
    contact_info_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Contact (தமிழ்)")

    # Dates & Metadata
    published_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-02-01'")
    closing_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-03-25'")

    # Media & Downloads
    document_file = models.FileField(upload_to=procurement_upload_path, blank=True, null=True, help_text="Upload PDF / DOCX Bidding Document")
    file_url = models.CharField(max_length=500, blank=True, default="#", help_text="Direct link or external procurement URL")
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    file_size = models.CharField(max_length=50, default="2.4 MB", help_text="e.g. '2.4 MB' or '1.8 MB'")

    class Meta:
        ordering = ["-year", "order", "-id"]
        verbose_name = "02. Procurement Tender Item"
        verbose_name_plural = "02. Procurement Tender Items"

    def __str__(self) -> str:
        return f"[{self.ref_number}] {self.title_en} ({self.status})"
