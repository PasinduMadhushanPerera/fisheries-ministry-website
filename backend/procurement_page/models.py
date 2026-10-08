from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from common.models import TimeStampedModel


def procurement_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"procurement/{timezone.now():%Y/%m}/{safe_filename}"


def format_file_size(size_bytes: int) -> str:
    if not size_bytes or size_bytes <= 0:
        return ""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        kb = round(size_bytes / 1024, 1)
        return f"{int(kb) if kb.is_integer() else kb} KB"
    else:
        mb = round(size_bytes / (1024 * 1024), 1)
        return f"{int(mb) if mb.is_integer() else mb} MB"


CATEGORY_CHOICES = [
    ("", "⚪ No Category (Unselected)"),
    ("harbour", "🏗️ Harbour & Civil Works"),
    ("equipment", "❄️ Equipment & Machinery"),
    ("it", "💻 IT, VMS & Communications"),
    ("consultancy", "📊 Consultancy & Feasibility Studies"),
    ("supplies", "📦 General Supplies & Services"),
    ("other", "📌 Other Procurement"),
]

STATUS_CHOICES = [
    ("", "⚪ No Status Badge (Unselected)"),
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


CATEGORY_ICON_CHOICES = [
    ("anchor", "Harbour & Marine Engineering (Anchor)"),
    ("briefcase", "Equipment & Heavy Machinery (Briefcase)"),
    ("globe", "IT & Telecommunications (Globe)"),
    ("book-open", "Consultancy & Studies (BookOpen)"),
    ("fish", "Supplies & Aquaculture (Fish)"),
    ("shield-check", "General & Compliance (ShieldCheck)"),
    ("building", "Buildings & Infrastructure (Building)"),
    ("scale", "Legal & Regulatory (Scale)"),
    ("file-text", "Standard Document (FileText)"),
]


# ==========================================================
# 02. Procurement Categories
# ==========================================================
class ProcurementCategory(TimeStampedModel):
    category_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique category identifier (e.g. 'harbour', 'equipment', 'tenders-2026'). Auto-generated if blank.",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(max_length=255, default="", verbose_name="Category Title (English)")
    description_en = models.TextField(blank=True, default="", verbose_name="Description (English)")

    # 🇱🇰 Sinhala Details (සිංහල)
    title_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Category Title (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Description (සිංහල)")

    # 🇱🇰 Tamil Details (தமிழ்)
    title_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Category Title (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Description (தமிழ்)")

    icon_type = models.CharField(
        max_length=30,
        choices=CATEGORY_ICON_CHOICES,
        default="anchor",
        help_text="Visual icon for accordion",
    )
    order = models.PositiveIntegerField(default=1, help_text="Sort order sequence")
    is_active = models.BooleanField(default=True, help_text="Display category on live website")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "02. Procurement Category"
        verbose_name_plural = "02. Procurement Categories"

    def save(self, *args, **kwargs):
        if not self.category_id or not str(self.category_id).strip():
            base = slugify(self.title_en) if self.title_en else f"cat-{uuid4().hex[:6]}"
            slug = base
            count = 1
            while ProcurementCategory.objects.filter(category_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.category_id = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.category_id})"


# ==========================================================
# 03. Procurement & Tender Notices (Multilingual)
# ==========================================================
class ProcurementTenderItem(TimeStampedModel):
    order = models.PositiveIntegerField(default=1, help_text="Display priority sequence")
    slug = models.SlugField(max_length=150, unique=True, blank=True, help_text="Unique identifier slug (auto-generated if left blank)")
    ref_number = models.CharField(max_length=100, blank=True, default="", verbose_name="Tender Ref No (e.g. MOF/PR/2026/04)")
    year = models.IntegerField(default=2026, help_text="Procurement Year (e.g. 2026, 2025, 2024)")
    category_ref = models.ForeignKey(
        ProcurementCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="tenders",
        verbose_name="Parent Category",
    )
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, blank=True, default="")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, blank=True, default="")
    featured = models.BooleanField(default=False, help_text="Check to display in top 'Featured Tenders' section")
    is_active = models.BooleanField(default=True, help_text="Display on live website")

    # 🇬🇧 English Content
    title_en = models.CharField(max_length=500, verbose_name="Tender Title (English)")
    subheading_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Sub-heading / Department Group (English e.g. 'Civil Works & Dredging Division')")
    publisher_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Procuring Entity / Department (English)")
    description_en = models.TextField(blank=True, default="", verbose_name="Short Description (English)")
    category_label_en = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (English)")
    detailed_scope_en = models.TextField(blank=True, default="", verbose_name="Detailed Scope / Key Requirements (English - One per line)")
    additional_info_en = models.TextField(blank=True, default="", verbose_name="Additional Information / Zoom Meeting Details (English)")
    submission_address_en = models.TextField(blank=True, default="", verbose_name="Bid Submission Address (English)")
    tender_fee_en = models.CharField(max_length=150, blank=True, default="", verbose_name="Non-Refundable Tender Fee (English)")
    bid_security_en = models.CharField(max_length=150, blank=True, default="", verbose_name="Bid Security / Guarantee (English)")
    eligibility_en = models.TextField(blank=True, default="", verbose_name="Eligibility & Registration (English)")
    contact_info_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Inquiries Contact (English)")
    doc_button_label_en = models.CharField(max_length=255, blank=True, default="Document can be downloaded from here", verbose_name="Primary Doc Download Label (English)")

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(max_length=500, blank=True, default="", verbose_name="Tender Title (සිංහල)")
    subheading_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Sub-heading / Department Group (සිංහල)")
    publisher_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Procuring Entity (සිංහල)")
    description_si = models.TextField(blank=True, default="", verbose_name="Short Description (සිංහල)")
    category_label_si = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (සිංහල)")
    detailed_scope_si = models.TextField(blank=True, default="", verbose_name="Detailed Scope (සිංහල - එක් පේළියකට එකක්)")
    additional_info_si = models.TextField(blank=True, default="", verbose_name="Additional Information (සිංහල)")
    submission_address_si = models.TextField(blank=True, default="", verbose_name="Submission Address (සිංහල)")
    tender_fee_si = models.CharField(max_length=150, blank=True, default="", verbose_name="Tender Fee (සිංහල)")
    bid_security_si = models.CharField(max_length=150, blank=True, default="", verbose_name="Bid Security (සිංහල)")
    eligibility_si = models.TextField(blank=True, default="", verbose_name="Eligibility (සිංහල)")
    contact_info_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Contact (සිංහල)")
    doc_button_label_si = models.CharField(max_length=255, blank=True, default="ලේඛනය මෙතැනින් බාගත හැකිය", verbose_name="Primary Doc Download Label (සිංහල)")

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(max_length=500, blank=True, default="", verbose_name="Tender Title (தமிழ்)")
    subheading_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Sub-heading / Department Group (தமிழ்)")
    publisher_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Procuring Entity (தமிழ்)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Short Description (தமிழ்)")
    category_label_ta = models.CharField(max_length=100, blank=True, default="", verbose_name="Category Label (தமிழ்)")
    detailed_scope_ta = models.TextField(blank=True, default="", verbose_name="Detailed Scope (தமிழ் - ஒரு வரியில் ஒன்று)")
    additional_info_ta = models.TextField(blank=True, default="", verbose_name="Additional Information (தமிழ்)")
    submission_address_ta = models.TextField(blank=True, default="", verbose_name="Submission Address (தமிழ்)")
    tender_fee_ta = models.CharField(max_length=150, blank=True, default="", verbose_name="Tender Fee (தமிழ்)")
    bid_security_ta = models.CharField(max_length=150, blank=True, default="", verbose_name="Bid Security (தமிழ்)")
    eligibility_ta = models.TextField(blank=True, default="", verbose_name="Eligibility (தமிழ்)")
    contact_info_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Contact (தமிழ்)")
    doc_button_label_ta = models.CharField(max_length=255, blank=True, default="கேள்விப்பத்திர ஆவணத்தை இங்கிருந்து பதிவிறக்கம் செய்யலாம்", verbose_name="Primary Doc Download Label (தமிழ்)")

    # Dates & Metadata
    published_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-02-01'")
    closing_date = models.CharField(max_length=50, blank=True, default="", help_text="e.g. '2026-03-25'")

    # Primary Document & Downloads
    document_file = models.FileField(upload_to=procurement_upload_path, blank=True, null=True, help_text="Upload Primary PDF / DOCX Bidding Document")
    file_url = models.CharField(max_length=500, blank=True, default="#", help_text="Direct link or external procurement URL")
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    file_size = models.CharField(max_length=50, blank=True, default="", help_text="Auto-calculated if blank, or enter e.g. '483 KB'")

    # Secondary Document & Downloads (e.g. SOR document)
    second_document_label_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Secondary Doc Download Label (English e.g. 'Document can be downloaded from here')")
    second_document_label_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Secondary Doc Download Label (සිංහල)")
    second_document_label_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Secondary Doc Download Label (தமிழ்)")
    second_document_file = models.FileField(upload_to=procurement_upload_path, blank=True, null=True, help_text="Upload Secondary Document (e.g. SOR document)")
    second_file_url = models.CharField(max_length=500, blank=True, default="", help_text="Direct link for secondary document")
    second_file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    second_file_size = models.CharField(max_length=50, blank=True, default="", help_text="Auto-calculated if blank, or enter e.g. '753 KB'")

    def save(self, *args, **kwargs):
        # 1. Auto-generate slug if blank
        if not self.slug or not str(self.slug).strip():
            base = slugify(self.title_en[:100]) if self.title_en else f"proc-{uuid4().hex[:6]}"
            slug = base
            count = 1
            while ProcurementTenderItem.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.slug = slug

        # 2. Auto-calculate primary file size
        if self.document_file:
            if not self.file_size or not str(self.file_size).strip():
                try:
                    if hasattr(self.document_file, "size") and self.document_file.size:
                        calc_size = format_file_size(self.document_file.size)
                        if calc_size:
                            self.file_size = calc_size
                except Exception:
                    pass

        # 3. Auto-calculate secondary file size
        if self.second_document_file:
            if not self.second_file_size or not str(self.second_file_size).strip():
                try:
                    if hasattr(self.second_document_file, "size") and self.second_document_file.size:
                        calc_size = format_file_size(self.second_document_file.size)
                        if calc_size:
                            self.second_file_size = calc_size
                except Exception:
                    pass

        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-year", "order", "-id"]
        verbose_name = "02. Procurement Tender Item"
        verbose_name_plural = "02. Procurement Tender Items"

    def __str__(self) -> str:
        return f"[{self.ref_number or 'Tender'}] {self.title_en[:60]} ({self.status})"


# ==========================================================
# 03. Additional Tender Documents (Dynamic / Dynamic List)
# ==========================================================
class ProcurementTenderDocument(TimeStampedModel):
    tender = models.ForeignKey(
        ProcurementTenderItem,
        on_delete=models.CASCADE,
        related_name="additional_documents",
        verbose_name="Procurement Tender Item"
    )
    order = models.PositiveIntegerField(default=1, help_text="Display priority order")

    # Download Button Labels (Multilingual)
    label_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Doc Download Label (English e.g. 'SOR Document' or 'Addendum 01')")
    label_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Doc Download Label (සිංහල)")
    label_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Doc Download Label (தமிழ்)")

    # Document File & Details
    document_file = models.FileField(upload_to=procurement_upload_path, blank=True, null=True, help_text="Upload PDF / DOCX Document")
    file_url = models.CharField(max_length=500, blank=True, default="", help_text="Direct link or external document URL")
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default="PDF")
    file_size = models.CharField(max_length=50, blank=True, default="", help_text="Auto-calculated if blank, or enter e.g. '483 KB'")

    def save(self, *args, **kwargs):
        if self.document_file:
            if not self.file_size or not str(self.file_size).strip():
                try:
                    if hasattr(self.document_file, "size") and self.document_file.size:
                        calc_size = format_file_size(self.document_file.size)
                        if calc_size:
                            self.file_size = calc_size
                except Exception:
                    pass
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "03. Additional Tender Document"
        verbose_name_plural = "03. Additional Tender Documents"

    def __str__(self) -> str:
        return f"Doc: {self.label_en or 'Document'} ({self.file_type})"

