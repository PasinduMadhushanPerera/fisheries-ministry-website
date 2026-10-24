import uuid
from django.db import models
from django.utils.text import slugify
from common.models import TimeStampedModel

ICON_CHOICES = [
    ("phone", "Phone Icon (Phone)"),
    ("whatsapp", "WhatsApp / Message Icon (MessageSquare)"),
    ("email", "Email Icon (Mail)"),
    ("map", "Map / Location Icon (MapPin)"),
    ("fax", "Fax Icon (Printer)"),
    ("info", "Information Icon (Info)"),
    ("clock", "Clock / Time Icon (Clock)"),
]

LINK_TYPE_CHOICES = [
    ("auto", "Auto Detect (tel:, mailto:, wa.me, etc.)"),
    ("tel", "Telephone Call (tel:)"),
    ("whatsapp", "WhatsApp Chat (wa.me)"),
    ("mailto", "Email Address (mailto:)"),
    ("url", "External Website URL"),
    ("none", "Plain Text (No Link)"),
]

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document (.pdf)"),
    ("XLSX", "Excel Spreadsheet (.xlsx)"),
    ("XLS", "Excel 97-2003 (.xls)"),
    ("CSV", "CSV Data File (.csv)"),
    ("DOCX", "Word Document (.docx)"),
    ("DOC", "Word Document (.doc)"),
    ("ZIP", "Compressed Archive (.zip)"),
]


class InternalAffairsPageSettings(TimeStampedModel):
    # 1. Officers Section Header (English / සිංහල / தமிழ்)
    officers_badge_en = models.CharField(
        max_length=150,
        default="Institutional Contacts",
        verbose_name="Officers Section Badge Text (English)",
    )
    officers_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="ආයතනික සන්නිවේදන",
        verbose_name="Officers Section Badge Text (සිංහල)",
    )
    officers_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="நிறுவன தொடர்புகள்",
        verbose_name="Officers Section Badge Text (தமிழ்)",
    )

    officers_title_en = models.CharField(
        max_length=255,
        default="Key Internal Affairs Officers",
        verbose_name="Officers Section Title (English)",
    )
    officers_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="ප්‍රධාන අභ්‍යන්තර කටයුතු නිලධාරීන්",
        verbose_name="Officers Section Title (සිංහල)",
    )
    officers_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="முக்கிய உள் விவகார அதிகாரிகள்",
        verbose_name="Officers Section Title (தமிழ்)",
    )

    officers_description_en = models.TextField(
        default="Direct profile cards of designated officers in charge of public grievances, oversight inquiries, and ethical standards.",
        verbose_name="Officers Section Description (English)",
    )
    officers_description_si = models.TextField(
        blank=True,
        default="මහජන පැමිණිලි, අධීක්ෂණ විමර්ශන සහ අභ්‍යන්තර ප්‍රමිතීන් පිළිබඳ වගකියන නිලධාරීන්ගේ තොරතුරු.",
        verbose_name="Officers Section Description (සිංහල)",
    )
    officers_description_ta = models.TextField(
        blank=True,
        default="பொதுமக்கள் முறைப்பாடுகள் மற்றும் மேற்பார்வை விசாரணைகளுக்கு பொறுப்பான அதிகாரிகளின் விவரங்கள்.",
        verbose_name="Officers Section Description (தமிழ்)",
    )

    # 2. Documents Section Header (English / සිංහල / தமிழ்)
    documents_badge_en = models.CharField(
        max_length=150,
        default="Downloads & Regulations",
        verbose_name="Documents Section Badge Text (English)",
    )
    documents_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="බාගත කිරීම් සහ රෙගුලාසි",
        verbose_name="Documents Section Badge Text (සිංහල)",
    )
    documents_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="பதிவிறக்கங்கள் மற்றும் விதிகள்",
        verbose_name="Documents Section Badge Text (தமிழ்)",
    )

    documents_title_en = models.CharField(
        max_length=255,
        default="Internal Affairs Documents & Guidance",
        verbose_name="Documents Section Title (English)",
    )
    documents_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="අභ්‍යන්තර කටයුතු ලේඛන සහ මාර්ගෝපදේශ",
        verbose_name="Documents Section Title (සිංහල)",
    )
    documents_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="உள் விவகார ஆவணங்கள் மற்றும் வழிகாட்டுதல்கள்",
        verbose_name="Documents Section Title (தமிழ்)",
    )

    documents_description_en = models.TextField(
        default="Official guidelines, complaint submission procedures, and whistleblower protection frameworks.",
        verbose_name="Documents Section Description (English)",
    )
    documents_description_si = models.TextField(
        blank=True,
        default="නිල මාර්ගෝපදේශ, පැමිණිලි ඉදිරිපත් කිරීමේ ක්‍රියාපටිපාටිය සහ තොරතුරු අනාවරණය කිරීමේ රාමුව.",
        verbose_name="Documents Section Description (සිංහල)",
    )
    documents_description_ta = models.TextField(
        blank=True,
        default="உத்தியோகபூர்வ வழிகாட்டுதல்கள் மற்றும் முறைப்பாடு சமர்ப்பிப்பு நடைமுறைகள்.",
        verbose_name="Documents Section Description (தமிழ்)",
    )

    class Meta:
        verbose_name = "00. Internal Affairs Page Settings & Section Titles"
        verbose_name_plural = "00. Internal Affairs Page Settings & Section Titles"

    def __str__(self):
        return "Internal Affairs Page Settings & Section Titles"


class InternalAffairsOfficer(TimeStampedModel):
    officer_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique officer key (e.g. 'senior-assistant-secretary'). Auto-generated if blank.",
    )

    # 🇬🇧 English Details
    name_en = models.CharField(
        max_length=255,
        default="",
        verbose_name="Officer Name (English)",
    )
    designation_en = models.CharField(
        max_length=255,
        default="",
        verbose_name="Designation (English)",
    )
    role_badge_en = models.CharField(
        max_length=100,
        default="Internal Affairs Officer",
        verbose_name="Role Badge (English)",
        help_text="Badge label shown on officer card (e.g. 'Internal Affairs Lead', 'Development Oversight')",
    )
    office_address_en = models.TextField(
        default="Ministry of Fisheries, Aquatic and Ocean Resources, New Secretariat, Maligawatta, Colombo 10",
        verbose_name="Office Address (English)",
        blank=True,
    )

    # 🇱🇰 Sinhala Details (සිංහල)
    name_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Officer Name (සිංහල)",
    )
    designation_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Designation (සිංහල)",
    )
    role_badge_si = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Role Badge (සිංහල)",
    )
    office_address_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Office Address (සිංහල)",
    )

    # 🇱🇰 Tamil Details (தமிழ்)
    name_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Officer Name (தமிழ்)",
    )
    designation_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Designation (தமிழ்)",
    )
    role_badge_ta = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Role Badge (தமிழ்)",
    )
    office_address_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Office Address (தமிழ்)",
    )

    # 📞 Telephone (Optional with Editable Labels)
    phone = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Telephone Number (Value)",
        help_text="Direct phone number (e.g. '+94 11 244 6183'). Leave blank if not applicable.",
    )
    phone_label_en = models.CharField(
        max_length=100,
        blank=True,
        default="Telephone",
        verbose_name="Telephone Label (English)",
    )
    phone_label_si = models.CharField(
        max_length=100,
        blank=True,
        default="දුරකථන",
        verbose_name="Telephone Label (සිංහල)",
    )
    phone_label_ta = models.CharField(
        max_length=100,
        blank=True,
        default="தொலைபேசி",
        verbose_name="Telephone Label (தமிழ்)",
    )

    # 💬 Mobile / WhatsApp (Optional with Editable Labels)
    mobile_whatsapp = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Mobile / WhatsApp (Value)",
        help_text="Mobile or WhatsApp contact (e.g. '+94 71 442 8434'). Leave blank if not applicable.",
    )
    mobile_label_en = models.CharField(
        max_length=100,
        blank=True,
        default="Mobile / WhatsApp",
        verbose_name="Mobile Label (English)",
    )
    mobile_label_si = models.CharField(
        max_length=100,
        blank=True,
        default="ජංගම / WhatsApp",
        verbose_name="Mobile Label (සිංහල)",
    )
    mobile_label_ta = models.CharField(
        max_length=100,
        blank=True,
        default="கைபேசி / WhatsApp",
        verbose_name="Mobile Label (தமிழ்)",
    )

    # ✉️ Email (Optional with Editable Labels)
    email = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Official Email (Value)",
        help_text="Official email address (e.g. 'iau@fisheries.gov.lk' or 'iau[at]fisheries.gov.lk'). Leave blank if not applicable.",
    )
    email_label_en = models.CharField(
        max_length=100,
        blank=True,
        default="Email",
        verbose_name="Email Label (English)",
    )
    email_label_si = models.CharField(
        max_length=100,
        blank=True,
        default="විද්‍යුත් තැපෑල",
        verbose_name="Email Label (සිංහල)",
    )
    email_label_ta = models.CharField(
        max_length=100,
        blank=True,
        default="மின்னஞ்சல்",
        verbose_name="Email Label (தமிழ்)",
    )

    # Portrait Image
    photo = models.ImageField(
        upload_to="internal_affairs/officers/%Y/",
        blank=True,
        null=True,
        help_text="Upload official portrait photograph",
    )
    photo_fallback = models.CharField(
        max_length=500,
        blank=True,
        default="/images/leadership/secretary.jpg",
        help_text="Fallback static image path if no custom photo uploaded",
    )

    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order sequence (1 = first officer card)",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display officer on live Internal Affairs webpage",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Internal Affairs Officer"
        verbose_name_plural = "Internal Affairs Officers"

    def save(self, *args, **kwargs):
        if not self.officer_id or not str(self.officer_id).strip():
            base = slugify(self.name_en) if self.name_en else f"officer-{uuid.uuid4().hex[:6]}"
            slug = base
            count = 1
            while InternalAffairsOfficer.objects.filter(officer_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.officer_id = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. {self.name_en} ({self.designation_en})"


class OfficerContactLine(TimeStampedModel):
    officer = models.ForeignKey(
        InternalAffairsOfficer,
        on_delete=models.CASCADE,
        related_name="custom_contact_lines",
        help_text="Parent officer card",
    )

    # 🇬🇧 English Label
    label_en = models.CharField(
        max_length=150,
        default="",
        verbose_name="Contact Label (English)",
        help_text="e.g. 'IAU WhatsApp', 'Hotline', 'Direct Extension', 'IAU E-mail'",
    )
    # 🇱🇰 Sinhala Label
    label_si = models.CharField(
        max_length=150,
        blank=True,
        default="",
        verbose_name="Contact Label (සිංහල)",
    )
    # 🇱🇰 Tamil Label
    label_ta = models.CharField(
        max_length=150,
        blank=True,
        default="",
        verbose_name="Contact Label (தமிழ்)",
    )

    value = models.CharField(
        max_length=255,
        default="",
        verbose_name="Contact Value / Text",
        help_text="e.g. '+94 707 786 181', 'iau[at]fisheries.gov.lk', 'Ext 402'",
    )

    icon_type = models.CharField(
        max_length=30,
        choices=ICON_CHOICES,
        default="phone",
        help_text="Icon displayed next to this contact line",
    )

    link_type = models.CharField(
        max_length=20,
        choices=LINK_TYPE_CHOICES,
        default="auto",
        help_text="Click behavior (Auto detect formats tel:, mailto:, or wa.me links automatically)",
    )

    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order sequence",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this contact line on live website card",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Custom Contact Line"
        verbose_name_plural = "Custom Contact Lines"

    def __str__(self) -> str:
        return f"{self.label_en}: {self.value}"


class InternalAffairsDocument(TimeStampedModel):
    document_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique document key (e.g. 'complaint-form-2026'). Auto-generated if blank.",
    )

    # 🇬🇧 English Details
    title_en = models.CharField(
        max_length=255,
        default="",
        verbose_name="Document Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="",
        verbose_name="Description / Overview (English)",
    )

    # 🇱🇰 Sinhala Details (සිංහල)
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Document Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Description / Overview (සිංහල)",
    )

    # 🇱🇰 Tamil Details (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Document Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Description / Overview (தமிழ்)",
    )

    # File Format
    file_type = models.CharField(
        max_length=20,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
        help_text="File format badge",
    )

    # 🇬🇧 English File Upload
    document_file_en = models.FileField(
        upload_to="internal_affairs/documents/%Y/",
        blank=True,
        null=True,
        verbose_name="Official File (English)",
        help_text="Upload official English version of document (PDF, Word, Excel)",
    )

    # 🇱🇰 Sinhala File Upload (සිංහල)
    document_file_si = models.FileField(
        upload_to="internal_affairs/documents/%Y/",
        blank=True,
        null=True,
        verbose_name="Official File (සිංහල)",
        help_text="Upload official Sinhala version of document (PDF, Word, Excel)",
    )

    # 🇱🇰 Tamil File Upload (தமிழ்)
    document_file_ta = models.FileField(
        upload_to="internal_affairs/documents/%Y/",
        blank=True,
        null=True,
        verbose_name="Official File (தமிழ்)",
        help_text="Upload official Tamil version of document (PDF, Word, Excel)",
    )

    # General / Default File
    document_file = models.FileField(
        upload_to="internal_affairs/documents/%Y/",
        blank=True,
        null=True,
        verbose_name="General / Default File",
        help_text="Upload general file if language-specific files are not separate",
    )

    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="",
        help_text="File size (e.g. '240 KB', '1.2 MB'). Auto-calculated on upload if empty.",
    )
    published_date = models.DateField(
        null=True,
        blank=True,
        help_text="Official publication date",
    )
    display_date = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Formatted date text (e.g. '02 October 2026')",
    )

    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order sequence (1 = top document)",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display document on live Internal Affairs webpage",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Internal Affairs Document"
        verbose_name_plural = "Internal Affairs Documents"

    def get_file_for_lang(self, lang="en"):
        if lang == "si" and self.document_file_si:
            return self.document_file_si
        if lang == "ta" and self.document_file_ta:
            return self.document_file_ta
        if lang == "en" and self.document_file_en:
            return self.document_file_en
        return self.document_file_en or self.document_file_si or self.document_file_ta or self.document_file

    def save(self, *args, **kwargs):
        if not self.document_id or not str(self.document_id).strip():
            base = slugify(self.title_en) if self.title_en else f"doc-{uuid.uuid4().hex[:6]}"
            slug = base
            count = 1
            while InternalAffairsDocument.objects.filter(document_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.document_id = slug

        if not self.display_date and self.published_date:
            if hasattr(self.published_date, "strftime"):
                self.display_date = self.published_date.strftime("%d %B %Y")
            else:
                self.display_date = str(self.published_date)

        active_file = self.get_file_for_lang("en")
        if active_file and not self.file_size:
            try:
                size_bytes = active_file.size
                if size_bytes < 1024 * 1024:
                    self.file_size = f"{round(size_bytes / 1024)} KB"
                else:
                    self.file_size = f"{round(size_bytes / (1024 * 1024), 1)} MB"
            except Exception:
                pass

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.file_type})"
