import uuid
from django.db import models
from django.utils.text import slugify
from common.models import TimeStampedModel

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document (.pdf)"),
    ("XLSX", "Excel Spreadsheet (.xlsx)"),
    ("XLS", "Excel 97-2003 (.xls)"),
    ("CSV", "CSV Data File (.csv)"),
    ("DOCX", "Word Document (.docx)"),
    ("DOC", "Word Document (.doc)"),
    ("PPTX", "PowerPoint Presentation (.pptx)"),
    ("ZIP", "Compressed Archive (.zip)"),
    ("PNG", "PNG Image (.png)"),
    ("JPG", "JPEG Image (.jpg)"),
]

CATEGORY_ICON_CHOICES = [
    ("map", "Map Pin / Location (Landing Site Maps)"),
    ("fish", "Fish Species / Biology (Fish Species List)"),
    ("card", "ID Cards / Field Guide (Tuna Identification Cards)"),
    ("building", "Factory / Enterprise (Fish Processing Establishments)"),
    ("ship", "Vessel / Boat (Boat Census)"),
    ("document", "Document / Library"),
    ("chart", "Statistics / Charts"),
]


# ==========================================================
# 01. Page Title, Header & Description
# ==========================================================
class FisheryInformationHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=150,
        default="Fisheries Knowledge Base",
        verbose_name="Badge Text (English)",
    )
    title_en = models.CharField(
        max_length=255,
        default="Fishery Related Information & Datasets",
        verbose_name="Page Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Access official landing-site maps, fish species directories, tuna identification cards, export-approved fish processing establishment lists, and national fishing boat census data.",
        verbose_name="Page Description (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=150,
        blank=True,
        default="ධීවර තොරතුරු සහ දැනුම පදනම",
        verbose_name="Badge Text (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="ධීවර ආශ්‍රිත තොරතුරු සහ දත්ත කට්ටල",
        verbose_name="Page Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="මත්ස්‍ය ගොඩබෑමේ ස්ථාන සිතියම්, මත්ස්‍ය විශේෂ නාමාවලි, කෙලවල්ලා හඳුනාගැනීමේ කාඩ්පත්, අනුමත මත්ස්‍ය සැකසුම් ආයතන ලැයිස්තු සහ යාත්‍රා සංගණන දත්ත මෙතැනින් ලබාගන්න.",
        verbose_name="Page Description (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=150,
        blank=True,
        default="மீன்பிடி தகவல் மற்றும் அறிவுத் தளம்",
        verbose_name="Badge Text (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="மீன்பிடி தொடர்பான தகவல்கள் மற்றும் தரவுத்தொகுப்புகள்",
        verbose_name="Page Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="மீன் இறங்குதள வரைபடங்கள், மீன் இனங்களின் அடைவு, சூரை மீன் அடையாள அட்டைகள், ஏற்றுமதிக்கு அங்கீகரிக்கப்பட்ட மீன் பதப்படுத்தும் நிறுவனங்கள் மற்றும் படகு கணக்கெடுப்பு தரவுகளைப் பெறுங்கள்.",
        verbose_name="Page Description (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. Page Title & Description"
        verbose_name_plural = "01. Page Title & Description"

    def __str__(self) -> str:
        return f"Fishery Related Information Header ({self.title_en})"


# ==========================================================
# 02. Information Categories (5 Core Knowledge Sections)
# ==========================================================
class FisheryInformationCategory(TimeStampedModel):
    category_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Unique category key (e.g. 'landing-site-maps', 'fish-species'). Auto-generated if left blank.",
    )

    # 🇬🇧 English
    title_en = models.CharField(
        max_length=255,
        default="Landing Site Maps",
        verbose_name="Category Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Browse official landing-site maps for coastal fisheries locations across Sri Lanka.",
        verbose_name="Description (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="මත්ස්‍ය ගොඩබෑමේ ස්ථාන සිතියම්",
        verbose_name="Category Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ශ්‍රී ලංකාවේ වෙරළබඩ ධීවර ගොඩබෑමේ ස්ථාන සඳහා නිල සිතියම් මෙතැනින් පරිශීලනය කරන්න.",
        verbose_name="Description (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="மீன் இறங்குதள வரைபடங்கள்",
        verbose_name="Category Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="இலங்கையின் கடலோர மீன்பிடி இறங்குதளங்களுக்கான உத்தியோகபூர்வ வரைபடங்களைப் பார்வையிடுங்கள்.",
        verbose_name="Description (தமிழ்)",
    )

    # 🏷️ Badges / Counters (e.g. '1 file', '11 files' or '1 සිතියම', 'සිතියම් 11')
    badge_singular_en = models.CharField(
        max_length=50,
        blank=True,
        default="file",
        verbose_name="Badge Singular (English)",
        help_text="Singular counter label (e.g. 'file', 'map', 'catalog', 'dataset')",
    )
    badge_plural_en = models.CharField(
        max_length=50,
        blank=True,
        default="files",
        verbose_name="Badge Plural (English)",
        help_text="Plural counter label (e.g. 'files', 'maps', 'catalogs', 'datasets')",
    )
    badge_singular_si = models.CharField(
        max_length=50,
        blank=True,
        default="ගොනුව",
        verbose_name="Badge Singular (සිංහල)",
        help_text="ඒකවචන ලේබලය (උදා: 'ගොනුව', 'සිතියම', 'නාමාවලිය', 'කාඩ්පත', 'වාර්තාව')",
    )
    badge_plural_si = models.CharField(
        max_length=50,
        blank=True,
        default="ගොනු",
        verbose_name="Badge Plural (සිංහල)",
        help_text="බහුවචන ලේබලය (උදා: 'ගොනු', 'සිතියම්', 'නාමාවලි', 'කාඩ්පත්', 'වාර්තා')",
    )
    badge_singular_ta = models.CharField(
        max_length=50,
        blank=True,
        default="கோப்பு",
        verbose_name="Badge Singular (தமிழ்)",
        help_text="ஒருமை லேபிள்கள் (எ.கா. 'கோப்பு', 'வரைபடம்', 'அட்டை')",
    )
    badge_plural_ta = models.CharField(
        max_length=50,
        blank=True,
        default="கோப்புகள்",
        verbose_name="Badge Plural (தமிழ்)",
        help_text="பன்மை லேபிள்கள் (எ.கா. 'கோப்புகள்', 'வரைபடங்கள்', 'அட்டைகள்')",
    )

    icon_type = models.CharField(
        max_length=30,
        choices=CATEGORY_ICON_CHOICES,
        default="map",
        help_text="Visual icon for this category accordion/pill",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order sequence",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display category on live website",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "02. Information Category"
        verbose_name_plural = "02. Information Categories"

    def save(self, *args, **kwargs):
        if not self.category_id or not str(self.category_id).strip():
            base = slugify(self.title_en) if self.title_en else f"cat-{uuid.uuid4().hex[:6]}"
            slug = base
            count = 1
            while FisheryInformationCategory.objects.filter(category_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.category_id = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}. {self.title_en} ({self.category_id})"


# ==========================================================
# 03. Fishery Information Documents & Items
# ==========================================================
class FisheryInformationItem(TimeStampedModel):
    item_id = models.CharField(
        max_length=100,
        unique=True,
        help_text="Unique identifier (e.g. 'map-chilaw', 'species-marine-directory', 'tuna-id-card-yellowfin')",
    )
    category = models.ForeignKey(
        FisheryInformationCategory,
        on_delete=models.CASCADE,
        related_name="items",
        help_text="Parent Information Category",
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
        verbose_name="Overview / Summary (English)",
    )
    location_en = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Location / District (English)",
        help_text="e.g. 'Chilaw', 'Batticaloa', 'Tangalle', 'National'",
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
        verbose_name="Overview / Summary (සිංහල)",
    )
    location_si = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Location / District (සිංහල)",
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
        verbose_name="Overview / Summary (தமிழ்)",
    )
    location_ta = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Location / District (தமிழ்)",
    )

    year = models.PositiveIntegerField(
        null=True,
        blank=True,
        default=2025,
        help_text="Reference Year (e.g. 2025, 2024)",
    )

    # Document File
    file_type = models.CharField(
        max_length=20,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
        help_text="Document or image file format",
    )
    document_file = models.FileField(
        upload_to="fishery_information/files/%Y/",
        blank=True,
        null=True,
        help_text="Upload official PDF, Excel, Word, CSV, Image, or ZIP file",
    )
    file_url_fallback = models.CharField(
        max_length=500,
        blank=True,
        default="#",
        help_text="Direct URL fallback if document is hosted externally or static",
    )
    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="100 KB",
        help_text="File size (e.g. '55 KB', '2.8 MB'). Auto-calculated on upload if empty.",
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
        help_text="Formatted date text (e.g. '15 January 2025')",
    )

    is_featured = models.BooleanField(
        default=False,
        help_text="Mark as featured item in this section",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display item on live website",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Sort priority sequence",
    )

    class Meta:
        ordering = ["category__order", "order", "id"]
        verbose_name = "03. Fishery Information Item"
        verbose_name_plural = "03. Fishery Information Items"

    def save(self, *args, **kwargs):
        if not self.item_id or not str(self.item_id).strip():
            base = slugify(self.title_en) if self.title_en else f"item-{uuid.uuid4().hex[:6]}"
            slug = base
            count = 1
            while FisheryInformationItem.objects.filter(item_id=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{count}"
                count += 1
            self.item_id = slug

        # Auto-format display date if empty
        if not self.display_date and self.published_date:
            if hasattr(self.published_date, "strftime"):
                self.display_date = self.published_date.strftime("%d %B %Y")
            else:
                self.display_date = str(self.published_date)

        # Auto-calculate file size if uploaded
        if self.document_file and (not self.file_size or self.file_size == "100 KB"):
            try:
                size_bytes = self.document_file.size
                if size_bytes < 1024 * 1024:
                    self.file_size = f"{round(size_bytes / 1024)} KB"
                else:
                    self.file_size = f"{round(size_bytes / (1024 * 1024), 1)} MB"
            except Exception:
                pass

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"[{self.category.category_id}] {self.title_en} ({self.file_type})"
