from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def news_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"news/{timezone.now():%Y/%m}/{safe_filename}"


news_image_upload_path = news_upload_path
news_attachment_upload_path = news_upload_path


def validate_upload_size(value):
    pass


CATEGORY_CHOICES = [
    ("ministry", "Ministry News"),
    ("development", "Sector Development"),
    ("community", "Fisher Community & Welfare"),
    ("aquaculture", "Aquaculture & Inland"),
    ("ocean", "Ocean Resources & Marine"),
    ("events", "Events & Ceremonies"),
    ("other", "General News"),
]

CATEGORY_LABELS_MAP = {
    "ministry": ("Ministry News", "අමාත්‍යාංශ පුවත්", "அமைச்சுச் செய்திகள்"),
    "development": ("Sector Development", "ක්ෂේත්‍ර සංවර්ධනය", "துறைசார் அபிவிருத்தி"),
    "community": ("Fisher Community & Welfare", "ධීවර ප්‍රජාව සහ සුබසාධනය", "மீனவ சமூகம் & நலன்புரி"),
    "aquaculture": ("Aquaculture & Inland", "ජලජීවී සහ මිරිදිය වගාව", "நீரியல் மற்றும் நன்னீர் வளர்ப்பு"),
    "ocean": ("Ocean Resources & Marine", "සාගර සම්පත් සහ සංරක්ෂණය", "கடல்சார் வளங்கள் & பாதுகாப்பு"),
    "events": ("Events & Ceremonies", "විශේෂ සිදුවීම් සහ උත්සව", "நிகழ்வுகள் & வைபவங்கள்"),
    "other": ("General News", "පොදු පුවත්", "பொதுச் செய்திகள்"),
}

FILE_TYPE_CHOICES = [
    ("PDF", "PDF Document"),
    ("DOCX", "Word Document (DOCX)"),
    ("XLSX", "Excel Spreadsheet (XLSX)"),
    ("ZIP", "ZIP Archive"),
    ("CSV", "CSV Data Sheet"),
    ("PPTX", "PowerPoint Presentation"),
]

BLOCK_TYPE_CHOICES = [
    ("text", "📝 Text Paragraph"),
    ("heading", "📌 Section Heading"),
    ("image", "🖼️ Image with Caption"),
    ("video", "🎬 Video Embed / Player (YouTube / Direct MP4)"),
    ("table", "📊 Data Table / Matrix"),
    ("quote", "💬 Key Quote / Ministerial Highlight Box"),
    ("attachment", "📄 Downloadable Document / Attachment"),
    ("paragraph", "📝 Text Paragraph (Legacy)"),
    ("file", "📄 Downloadable Document (Legacy)"),
]

HEADING_LEVEL_CHOICES = [
    ("h2", "Heading 2 (H2 - Major Section)"),
    ("h3", "Heading 3 (H3 - Subsection)"),
    ("h4", "Heading 4 (H4 - Minor Topic)"),
]

IMAGE_LAYOUT_CHOICES = [
    ("full", "🖼️ Full Width Banner (100% width)"),
    ("centered", "🎯 Centered Focus Card (Balanced)"),
    ("left", "⬅️ Float Left (Text Wraps on Right)"),
    ("right", "➡️ Float Right (Text Wraps on Left)"),
    ("grid-2", "👥 2-Column Grid (Side-by-Side 2 Photos)"),
    ("grid-3", "🧱 3-Column Photo Grid (3 Photos)"),
    ("collage", "🎨 4-Photo Collage / Quad Gallery (4 Photos)"),
    ("slider", "🎞️ Mini Photo Carousel"),
]

IMAGE_SIZE_CHOICES = [
    ("full", "Full Width (100%)"),
    ("large", "Large Width (75%)"),
    ("medium", "Medium Width (50%)"),
    ("small", "Small / Thumbnail Width (33%)"),
]

IMAGE_ASPECT_CHOICES = [
    ("16/9", "16:9 Widescreen (Standard)"),
    ("4/3", "4:3 Classic Photo"),
    ("1/1", "1:1 Square Frame"),
    ("21/9", "21:9 Cinematic Panorama"),
    ("auto", "Original / Natural Ratio (No Crop)"),
]

CALLOUT_TYPE_CHOICES = [
    ("quote", "💬 Ministerial / Executive Quote"),
    ("info", "ℹ️ Informational Note"),
    ("success", "✅ Key Achievement / Milestone"),
    ("warning", "⚠️ Important Notice / Reminder"),
]


# ==========================================================
# 01. News Section Titles & Badges (Multilingual)
# ==========================================================
class NewsPageHeader(TimeStampedModel):
    # 🇬🇧 English
    badge_text_en = models.CharField(
        max_length=100,
        blank=True,
        default="Ministry Newsroom",
        verbose_name="Page Badge (English)",
    )
    title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Latest News &",
        verbose_name="Title (English)",
    )
    highlighted_title_en = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry Updates",
        verbose_name="Highlighted Title (English)",
    )
    description_en = models.TextField(
        blank=True,
        default="Read the latest fisheries news, development updates, community welfare programmes, and official events from across Sri Lanka.",
        verbose_name="Description (English)",
    )
    featured_badge_en = models.CharField(
        max_length=150,
        default="Latest Featured News",
        verbose_name="Featured Section Badge (English)",
    )
    catalogue_badge_en = models.CharField(
        max_length=150,
        default="Official News Feed",
        verbose_name="Library Section Badge (English)",
    )
    library_title_en = models.CharField(
        max_length=255,
        default="All News & Press Updates",
        verbose_name="Library Section Title (English)",
    )

    # 🇱🇰 Sinhala (සිංහල)
    badge_text_si = models.CharField(
        max_length=100,
        blank=True,
        default="අමාත්‍යාංශ ප්‍රවෘත්ති කාමරය",
        verbose_name="Page Badge (සිංහල)",
    )
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="නවතම පුවත් සහ",
        verbose_name="Title (සිංහල)",
    )
    highlighted_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="අමාත්‍යාංශ තොරතුරු",
        verbose_name="Highlighted Title (සිංහල)",
    )
    description_si = models.TextField(
        blank=True,
        default="ශ්‍රී ලංකාව පුරා ධීවර පුවත්, සංවර්ධන තොරතුරු, ප්‍රජා සුබසාධන වැඩසටහන් සහ නිල නිවේදන පිළිබඳව දැනුවත් වන්න.",
        verbose_name="Description (සිංහල)",
    )
    featured_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="විශේෂ ප්‍රමුඛ පුවත",
        verbose_name="Featured Section Badge (සිංහල)",
    )
    catalogue_badge_si = models.CharField(
        max_length=150,
        blank=True,
        default="නිල පුවත් එකතුව",
        verbose_name="Library Section Badge (සිංහල)",
    )
    library_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="සියලු පුවත් සහ මාධ්‍ය නිවේදන",
        verbose_name="Library Section Title (සිංහල)",
    )

    # 🇱🇰 Tamil (தமிழ்)
    badge_text_ta = models.CharField(
        max_length=100,
        blank=True,
        default="அமைச்சு செய்திப் பிரிவு",
        verbose_name="Page Badge (தமிழ்)",
    )
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="சமீபத்திய செய்திகள் &",
        verbose_name="Title (தமிழ்)",
    )
    highlighted_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அமைச்சு புதுப்பிப்புகள்",
        verbose_name="Highlighted Title (தமிழ்)",
    )
    description_ta = models.TextField(
        blank=True,
        default="இலங்கை முழுவதும் உள்ள கடற்றொழில் செய்திகள், துறைசார் அபிவிருத்திகள், மீனவ சமூக நலத்திட்டங்கள் மற்றும் நிகழ்வுகள்.",
        verbose_name="Description (தமிழ்)",
    )
    featured_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="சிறப்பு முக்கியச் செய்தி",
        verbose_name="Featured Section Badge (தமிழ்)",
    )
    catalogue_badge_ta = models.CharField(
        max_length=150,
        blank=True,
        default="உத்தியோகபூர்வ செய்தித் தொகுப்பு",
        verbose_name="Library Section Badge (தமிழ்)",
    )
    library_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அனைத்து செய்திகள் மற்றும் ஊடக வெளியீடுகள்",
        verbose_name="Library Section Title (தமிழ்)",
    )

    class Meta:
        verbose_name = "01. News Section Titles & Badges"
        verbose_name_plural = "01. News Section Titles & Badges"

    def __str__(self) -> str:
        return f"Section Titles: {self.library_title_en}"


# ==========================================================
# 02. News Articles & Media Updates (Multilingual)
# ==========================================================
class NewsArticleItem(TimeStampedModel):
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display priority sequence",
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        help_text="🔒 Auto-generated unique URL slug (Created automatically from title upon saving)",
    )
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="ministry",
        help_text="Select article category (automatically sets English, Sinhala & Tamil badges)",
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Check to highlight in top 'Featured News' section",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display on live website",
    )

    # 🇬🇧 English Content
    title_en = models.CharField(
        max_length=255,
        verbose_name="Article Title (English)",
    )
    publisher_en = models.CharField(
        max_length=255,
        default="Ministry Media Unit",
        verbose_name="Publisher / Division (English)",
    )
    category_label_en = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (English - Auto-Synced from Category)",
    )
    summary_en = models.TextField(
        blank=True,
        default="",
        verbose_name="Short Summary (English)",
    )
    content_en = models.TextField(
        blank=True,
        default="",
        verbose_name="Main Article Overview / Paragraphs (English)",
        help_text="Introductory text or legacy content. You can also add rich Story Blocks below (Images, Videos, Tables, Subheadings, Documents) in any order!",
    )
    attachment_title_en = models.CharField(
        max_length=200,
        blank=True,
        default="",
        verbose_name="Attachment Document Title (English)",
    )

    # 🇱🇰 Sinhala Content (සිංහල)
    title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Article Title (සිංහල)",
    )
    publisher_si = models.CharField(
        max_length=255,
        blank=True,
        default="අමාත්‍යාංශ මාධ්‍ය අංශය",
        verbose_name="Publisher (සිංහල)",
    )
    category_label_si = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (සිංහල - Auto-Synced from Category)",
    )
    summary_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Short Summary (සිංහල)",
    )
    content_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Main Article Overview / Paragraphs (සිංහල)",
    )
    attachment_title_si = models.CharField(
        max_length=200,
        blank=True,
        default="",
        verbose_name="Attachment Document Title (සිංහල)",
    )

    # 🇱🇰 Tamil Content (தமிழ்)
    title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Article Title (தமிழ்)",
    )
    publisher_ta = models.CharField(
        max_length=255,
        blank=True,
        default="அமைச்சு ஊடகப் பிரிவு",
        verbose_name="Publisher (தமிழ்)",
    )
    category_label_ta = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Category Label (தமிழ் - Auto-Synced from Category)",
    )
    summary_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Short Summary (தமிழ்)",
    )
    content_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Main Article Overview / Paragraphs (தமிழ்)",
    )
    attachment_title_ta = models.CharField(
        max_length=200,
        blank=True,
        default="",
        verbose_name="Attachment Document Title (தமிழ்)",
    )

    # Dates & Metadata
    published_date = models.CharField(
        max_length=50,
        blank=True,
        default="",
        help_text="e.g. '2026-03-15' or '15 March 2026' (Auto-filled with today's date if empty)",
    )

    # Media & Downloads
    image = models.ImageField(
        upload_to=news_upload_path,
        blank=True,
        null=True,
        help_text="Upload news cover image (16:9 recommended)",
    )
    image_url_fallback = models.CharField(
        max_length=255,
        blank=True,
        default="/images/home/hero-fishing-harbour.jpg",
        help_text="Default static image path if no image uploaded",
    )
    image_alt = models.CharField(
        max_length=255,
        blank=True,
        default="Ministry news illustration",
    )

    document_file = models.FileField(
        upload_to=news_upload_path,
        blank=True,
        null=True,
        help_text="Upload optional PDF / DOCX press release or circular",
    )
    file_url = models.CharField(
        max_length=500,
        blank=True,
        default="",
        help_text="Direct link or external document URL",
    )
    file_type = models.CharField(
        max_length=10,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
    )
    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="1.2 MB",
        help_text="e.g. '1.2 MB' or '850 KB'",
    )
    attachments_data = models.TextField(
        blank=True,
        default="",
        verbose_name="Multiple Cover Attachments (JSON / List)",
        help_text="Optional multiple attachments list for main article cover",
    )

    class Meta:
        ordering = ["-created_at", "-id"]
        verbose_name = "02. News Article Item"
        verbose_name_plural = "02. News Article Items"

    def save(self, *args, **kwargs):
        # Auto-fill published_date if empty
        if not self.published_date or not str(self.published_date).strip():
            self.published_date = timezone.now().strftime("%Y-%m-%d")

        # Auto-generate unique slug if empty or ensure max_length safety
        if not self.slug or not str(self.slug).strip():
            from django.utils.text import slugify
            base_slug = slugify(self.title_en) if (self.title_en and self.title_en.strip()) else (
                slugify(self.title_si) if (self.title_si and self.title_si.strip()) else (
                    slugify(self.title_ta) if (self.title_ta and self.title_ta.strip()) else "news-article"
                )
            )
            if not base_slug:
                base_slug = "news-article"
            base_slug = base_slug[:200].rstrip('-')
            candidate_slug = f"{base_slug}-{uuid4().hex[:6]}"
            while NewsArticleItem.objects.filter(slug=candidate_slug).exclude(pk=self.pk).exists():
                candidate_slug = f"{base_slug}-{uuid4().hex[:6]}"
            self.slug = candidate_slug
        else:
            from django.utils.text import slugify
            clean_slug = slugify(self.slug)
            if clean_slug:
                self.slug = clean_slug[:255].rstrip('-')
            else:
                self.slug = str(self.slug)[:255]

        # Auto-sync multilingual category labels whenever category is selected
        if self.category in CATEGORY_LABELS_MAP:
            en_val, si_val, ta_val = CATEGORY_LABELS_MAP[self.category]
            self.category_label_en = en_val
            self.category_label_si = si_val
            self.category_label_ta = ta_val

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.title_en} [{self.get_category_display()}]"


# ==========================================================
# 03. News Content Blocks (Modular Multi-block Article Body)
# Allows inserting Text -> Image -> Table -> Video -> File -> Quote in any sequence
# ==========================================================
class NewsContentBlock(TimeStampedModel):
    article = models.ForeignKey(
        NewsArticleItem,
        on_delete=models.CASCADE,
        related_name="content_blocks",
        help_text="Parent news article",
    )
    block_type = models.CharField(
        max_length=30,
        choices=BLOCK_TYPE_CHOICES,
        default="paragraph",
        help_text="Choose the type of content block to insert into the story",
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order sequence within the article (e.g. 1, 2, 3...)",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display this block on live page",
    )

    # 1. Subheading / Section Title (Multilingual)
    heading_level = models.CharField(
        max_length=10,
        choices=HEADING_LEVEL_CHOICES,
        default="h2",
        verbose_name="Heading Level (H2 / H3 / H4)",
        help_text="Choose heading tag (H2 for main section, H3 for subsection)",
    )
    heading_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Subheading (English)",
    )
    heading_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Subheading (සිංහල)",
    )
    heading_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Subheading (தமிழ்)",
    )

    # 2. Rich Text / Body Paragraph (Multilingual)
    text_en = models.TextField(
        blank=True,
        default="",
        verbose_name="Paragraph Content (English)",
        help_text="Rich text / formatted paragraphs (supports HTML and markdown)",
    )
    text_si = models.TextField(
        blank=True,
        default="",
        verbose_name="Paragraph Content (සිංහල)",
    )
    text_ta = models.TextField(
        blank=True,
        default="",
        verbose_name="Paragraph Content (தமிழ்)",
    )

    # 3. Image Block Details
    image = models.ImageField(
        upload_to=news_upload_path,
        blank=True,
        null=True,
        help_text="Upload inline image",
    )
    image_url = models.CharField(
        max_length=500,
        blank=True,
        default="",
        help_text="Or enter direct/fallback image URL",
    )
    image_caption_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Image Caption (English)",
    )
    image_caption_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Image Caption (සිංහල)",
    )
    image_caption_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Image Caption (தமிழ்)",
    )
    image_alt = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Image Alt Text",
    )
    image_layout = models.CharField(
        max_length=20,
        choices=IMAGE_LAYOUT_CHOICES,
        default="full",
        verbose_name="Image Layout / Alignment",
        help_text="Visual layout and alignment for this image (Full width, Centered, Float Left, Float Right, 2-Col Grid, 3-Col Grid, Collage, Slider)",
    )
    image_size = models.CharField(
        max_length=20,
        choices=IMAGE_SIZE_CHOICES,
        default="full",
        verbose_name="Image Display Width / Size",
        help_text="Controls max width: Full (100%), Large (75%), Medium (50%), Small (33%)",
    )
    image_aspect_ratio = models.CharField(
        max_length=20,
        choices=IMAGE_ASPECT_CHOICES,
        default="16/9",
        verbose_name="Image Aspect Ratio / Frame",
        help_text="Landscape (16:9), Standard (4:3), Square (1:1), Panoramic (21:9), or Original Auto",
    )
    images_data = models.TextField(
        blank=True,
        default="",
        verbose_name="Multiple Images Data (JSON)",
        help_text="JSON list for multi-photo grids, side-by-side comparisons, and collages: [{'url': '...', 'caption': '...', 'alt': '...'}]",
    )

    # 4. Video Block Details
    video_url = models.CharField(
        max_length=500,
        blank=True,
        default="",
        help_text="YouTube URL, Vimeo URL, or direct MP4 video link (e.g. https://www.youtube.com/watch?v=...)",
    )
    video_file = models.FileField(
        upload_to=news_upload_path,
        blank=True,
        null=True,
        help_text="Or upload direct video file (.mp4)",
    )
    video_title_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Video Title (English)",
    )
    video_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Video Title (සිංහල)",
    )
    video_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Video Title (தமிழ்)",
    )
    video_caption_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Video Caption (English)",
    )
    video_caption_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Video Caption (සිංහල)",
    )
    video_caption_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Video Caption (தமிழ்)",
    )

    # 5. Table / Data Matrix Block Details
    table_title_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Table Title / Caption (English)",
    )
    table_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Table Title / Caption (සිංහල)",
    )
    table_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Table Title / Caption (தமிழ்)",
    )
    table_data = models.TextField(
        blank=True,
        default="",
        help_text="Enter Markdown table or comma-separated rows. e.g.:\n| Harbor Location | Modernization Scope | Budget Allocation (LKR) | Target Completion |\n| Mirissa Harbor | Deepening basin & quay wall | Rs. 450 Million | Q4 2026 |\n| Beruwala Harbor | Solar cold room & ice plant | Rs. 280 Million | Q3 2026 |",
    )

    # 6. Quote / Highlight Callout Box Details
    quote_author_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Quote Author / Speaker (English)",
    )
    quote_author_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Quote Author / Speaker (සිංහල)",
    )
    quote_author_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Quote Author / Speaker (தமிழ்)",
    )
    quote_role_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Author Role / Occasion (English)",
    )
    quote_role_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Author Role / Occasion (සිංහල)",
    )
    quote_role_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Author Role / Occasion (தமிழ்)",
    )
    callout_type = models.CharField(
        max_length=20,
        choices=CALLOUT_TYPE_CHOICES,
        default="quote",
        help_text="Style appearance of the callout box",
    )

    # 7. File Attachment Block Details (Supports Single & Multiple File Attachments)
    document_file = models.FileField(
        upload_to=news_upload_path,
        blank=True,
        null=True,
        help_text="Upload primary downloadable document (PDF, Word, Excel, ZIP)",
    )
    file_url_fallback = models.CharField(
        max_length=500,
        blank=True,
        default="",
        help_text="Direct link or external download URL",
    )
    file_title_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Document File Title (English)",
    )
    file_title_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Document File Title (සිංහල)",
    )
    file_title_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Document File Title (தமிழ்)",
    )
    file_type = models.CharField(
        max_length=20,
        choices=FILE_TYPE_CHOICES,
        default="PDF",
    )
    file_size = models.CharField(
        max_length=50,
        blank=True,
        default="1.5 MB",
        help_text="e.g. '1.5 MB' or '850 KB'",
    )
    attachments_data = models.TextField(
        blank=True,
        default="",
        verbose_name="Multiple Attachments (JSON / Structured List)",
        help_text="Allows attaching multiple downloadable files inside this attachment block.",
    )

    class Meta:
        ordering = ["article", "order", "id"]
        verbose_name = "03. News Content Block"
        verbose_name_plural = "03. News Content Blocks"

    def __str__(self) -> str:
        label = self.heading_en or self.table_title_en or self.file_title_en or self.get_block_type_display()
        return f"[{self.article.slug}] Block {self.order}: {self.get_block_type_display()} - {label[:40]}"


# ==========================================================
# 04. Inline Multi-Photo Gallery Images for Story Content Blocks
# ==========================================================
class NewsBlockImage(TimeStampedModel):
    block = models.ForeignKey(
        NewsContentBlock,
        on_delete=models.CASCADE,
        related_name="gallery_images",
        verbose_name="Content Block",
    )
    image = models.ImageField(
        upload_to="news/images/%Y/%m/",
        blank=True,
        null=True,
        verbose_name="📸 Upload Image File",
        help_text="Select and upload an image file directly from your computer",
    )
    image_url_fallback = models.CharField(
        max_length=500,
        blank=True,
        default="",
        verbose_name="Image URL (Optional Fallback)",
        help_text="Direct image URL if not uploading file above",
    )
    caption_en = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Caption (English)",
    )
    caption_si = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Caption (සිංහල)",
    )
    caption_ta = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Caption (தமிழ்)",
    )
    alt_text = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Alt Text",
    )
    order = models.PositiveIntegerField(
        default=1,
        verbose_name="Display Order",
        help_text="Order sequence (1, 2, 3...)",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Block Gallery Photo"
        verbose_name_plural = "Block Gallery Photos (Upload Files)"

    def __str__(self) -> str:
        return f"Photo #{self.order} for Block #{self.block_id}"

    @property
    def url(self) -> str:
        if self.image:
            return self.image.url
        return self.image_url_fallback