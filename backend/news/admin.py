from django import forms
from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from .models import NewsPageHeader, NewsArticleItem, NewsContentBlock


# ==========================================================
# Form Definitions
# ==========================================================
class NewsPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = NewsPageHeader
        fields = "__all__"


class NewsArticleItemAdminForm(forms.ModelForm):
    class Meta:
        model = NewsArticleItem
        fields = "__all__"
        widgets = {
            "summary_en": forms.Textarea(attrs={"rows": 3, "class": "vLargeTextField"}),
            "summary_si": forms.Textarea(attrs={"rows": 3, "class": "vLargeTextField"}),
            "summary_ta": forms.Textarea(attrs={"rows": 3, "class": "vLargeTextField"}),
            "content_en": forms.Textarea(attrs={"rows": 4, "class": "vLargeTextField"}),
            "content_si": forms.Textarea(attrs={"rows": 4, "class": "vLargeTextField"}),
            "content_ta": forms.Textarea(attrs={"rows": 4, "class": "vLargeTextField"}),
        }


class NewsContentBlockAdminForm(forms.ModelForm):
    class Meta:
        model = NewsContentBlock
        fields = "__all__"
        widgets = {
            "text_en": forms.Textarea(attrs={"rows": 4, "class": "vLargeTextField"}),
            "text_si": forms.Textarea(attrs={"rows": 4, "class": "vLargeTextField"}),
            "text_ta": forms.Textarea(attrs={"rows": 4, "class": "vLargeTextField"}),
            "table_data": forms.Textarea(attrs={"rows": 6, "class": "vLargeTextField"}),
            "attachments_data": forms.Textarea(attrs={"rows": 6, "class": "vLargeTextField"}),
        }


# ==========================================================
# 01. News Page Header Admin
# ==========================================================
@admin.register(NewsPageHeader)
class NewsPageHeaderAdmin(admin.ModelAdmin):
    form = NewsPageHeaderAdminForm
    list_display = ["library_title_en", "catalogue_badge_en", "featured_badge_en", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Section Badges & Titles", {
            "fields": (
                ("featured_badge_en", "catalogue_badge_en"),
                "library_title_en",
            ),
        }),
        ("🇱🇰 Sinhala Section Badges & Titles (සිංහල)", {
            "fields": (
                ("featured_badge_si", "catalogue_badge_si"),
                "library_title_si",
            ),
        }),
        ("🇱🇰 Tamil Section Badges & Titles (தமிழ்)", {
            "fields": (
                ("featured_badge_ta", "catalogue_badge_ta"),
                "library_title_ta",
            ),
        }),
    )

    def has_add_permission(self, request):
        return not NewsPageHeader.objects.exists()


# ==========================================================
# 02. News Article Items Admin (Clean Overview & Metadata)
# ==========================================================
@admin.register(NewsArticleItem)
class NewsArticleItemAdmin(admin.ModelAdmin):
    form = NewsArticleItemAdminForm
    list_display = [
        "order",
        "title_en",
        "category_badge",
        "published_date",
        "manage_blocks_link",
        "is_featured_badge",
        "is_active_badge",
        "updated_at",
    ]
    list_display_links = ["title_en"]
    list_editable = ["order"]
    list_filter = ["category", "is_featured", "is_active"]
    search_fields = [
        "title_en",
        "title_si",
        "title_ta",
        "summary_en",
        "publisher_en",
        "slug",
    ]
    prepopulated_fields = {"slug": ("title_en",)}

    fieldsets = (
        ("🏷️ Article Classification & Category", {
            "fields": (
                ("category", "order"),
                ("is_featured", "is_active"),
                "slug",
            ),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
                "publisher_en",
                "summary_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "classes": ("collapse",),
            "fields": (
                "title_si",
                "publisher_si",
                "summary_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "classes": ("collapse",),
            "fields": (
                "title_ta",
                "publisher_ta",
                "summary_ta",
            ),
        }),
        ("📅 Publication Date", {
            "fields": ("published_date",),
        }),
        ("🖼️ Cover Image & Media", {
            "fields": (
                "image",
                ("image_url_fallback", "image_alt"),
            ),
        }),
        ("📄 Cover Attachments & Documents (Optional)", {
            "classes": ("collapse",),
            "fields": (
                ("document_file", "file_url"),
                ("file_type", "file_size"),
                "attachment_title_en",
            ),
        }),
    )

    def category_badge(self, obj):
        return format_html(
            '<span style="background: #eff6ff; color: #1d4ed8; padding: 3px 9px; border-radius: 6px; font-weight: 700; font-size: 11px;">📂 {}</span>',
            obj.get_category_display(),
        )
    category_badge.short_description = "Category"

    def manage_blocks_link(self, obj):
        count = obj.content_blocks.count()
        url = reverse("admin:news_newscontentblock_changelist") + f"?article__id__exact={obj.id}"
        add_url = reverse("admin:news_newscontentblock_add") + f"?article={obj.id}"
        return format_html(
            '<a href="{}" style="background: #f0fdf4; color: #166534; padding: 4px 10px; border-radius: 6px; font-weight: 800; text-decoration: none; border: 1px solid #bbf7d0; display: inline-flex; align-items: center; gap: 4px;">'
            '🧱 {} Story Blocks</a> '
            '<a href="{}" style="color: #059669; font-weight: bold; margin-left: 6px; font-size: 12px;" title="Add block to this article">+ Add Block</a>',
            url,
            count,
            add_url,
        )
    manage_blocks_link.short_description = "Story Content Blocks"

    def is_featured_badge(self, obj):
        if obj.is_featured:
            return format_html('<span style="color: #d97706; font-weight: bold; background: #fef3c7; padding: 2px 6px; border-radius: 4px; font-size: 11px;">⭐ Featured</span>')
        return format_html('<span style="color: #94a3b8;">—</span>')
    is_featured_badge.short_description = "Featured"

    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="color: #15803d; font-weight: bold;">● Active</span>')
        return format_html('<span style="color: #dc2626; font-weight: bold;">○ Inactive</span>')
    is_active_badge.short_description = "Status"

    def save_model(self, request, obj, form, change):
        if obj.is_featured:
            NewsArticleItem.objects.filter(is_featured=True).exclude(pk=obj.pk).update(is_featured=False)
        super().save_model(request, obj, form, change)


# ==========================================================
# 03. Standalone News Content Blocks Admin (Dedicated Page)
# ==========================================================
@admin.register(NewsContentBlock)
class NewsContentBlockAdmin(admin.ModelAdmin):
    form = NewsContentBlockAdminForm
    list_display = [
        "order",
        "article",
        "block_type_badge",
        "block_label",
        "is_active_badge",
        "updated_at",
    ]
    list_display_links = ["block_label"]
    list_editable = ["order"]
    list_filter = ["article", "block_type", "is_active"]
    search_fields = [
        "heading_en",
        "text_en",
        "table_title_en",
        "video_title_en",
        "file_title_en",
        "article__title_en",
    ]
    ordering = ["article", "order", "id"]

    fieldsets = (
        ("🧱 1. Target Article & Block Type", {
            "fields": (
                ("article", "block_type"),
                ("order", "is_active"),
            ),
        }),
        ("📝 2. Text Paragraph & Section Heading Details", {
            "fields": (
                ("heading_level", "heading_en"),
                "text_en",
                ("heading_si", "text_si"),
                ("heading_ta", "text_ta"),
            ),
        }),
        ("🖼️ 3. Inline Image Details", {
            "fields": (
                ("image", "image_url"),
                ("image_caption_en", "image_layout"),
                ("image_caption_si", "image_caption_ta"),
                "image_alt",
            ),
        }),
        ("🎬 4. Video Details (Embed / Upload)", {
            "fields": (
                ("video_url", "video_file"),
                ("video_title_en", "video_caption_en"),
                ("video_title_si", "video_caption_si"),
                ("video_title_ta", "video_caption_ta"),
            ),
        }),
        ("📊 5. Interactive Data Table Details", {
            "fields": (
                ("table_title_en", "table_title_si", "table_title_ta"),
                "table_data",
            ),
        }),
        ("💬 6. Quote & Callout Box Details", {
            "fields": (
                ("callout_type", "quote_author_en", "quote_role_en"),
                ("quote_author_si", "quote_role_si"),
                ("quote_author_ta", "quote_role_ta"),
            ),
        }),
        ("📄 7. Multiple File Attachments Details", {
            "fields": (
                "attachments_data",
                ("document_file", "file_url_fallback"),
                ("file_title_en", "file_type", "file_size"),
                ("file_title_si", "file_title_ta"),
            ),
        }),
    )

    def block_type_badge(self, obj):
        color_map = {
            "text": ("#eff6ff", "#1d4ed8", "📝 Text"),
            "paragraph": ("#eff6ff", "#1d4ed8", "📝 Text"),
            "heading": ("#f5f3ff", "#6d28d9", "📌 Heading"),
            "image": ("#fdf2f8", "#be185d", "🖼️ Image"),
            "video": ("#faf5ff", "#7e22ce", "🎬 Video"),
            "table": ("#f0fdf4", "#15803d", "📊 Table"),
            "quote": ("#fffbeb", "#b45309", "💬 Quote"),
            "attachment": ("#f1f5f9", "#334155", "📄 Attachment"),
            "file": ("#f1f5f9", "#334155", "📄 Attachment"),
        }
        bg, color, label = color_map.get(obj.block_type, ("#f1f5f9", "#475569", obj.block_type))
        return format_html(
            '<span style="background: {}; color: {}; padding: 3px 9px; border-radius: 6px; font-weight: 800; font-size: 11px;">{}</span>',
            bg,
            color,
            label,
        )
    block_type_badge.short_description = "Type"

    def block_label(self, obj):
        label = obj.heading_en or obj.table_title_en or obj.video_title_en or obj.file_title_en or (obj.text_en[:55] + "..." if obj.text_en else f"Block #{obj.order}")
        return label
    block_label.short_description = "Block Content Summary / Title"

    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="color: #15803d; font-weight: bold;">● Active</span>')
        return format_html('<span style="color: #dc2626; font-weight: bold;">○ Inactive</span>')
    is_active_badge.short_description = "Status"