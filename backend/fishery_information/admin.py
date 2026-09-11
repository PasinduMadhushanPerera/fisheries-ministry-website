from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import (
    FisheryInformationHeader,
    FisheryInformationCategory,
    FisheryInformationItem,
)


class FisheryInformationHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = FisheryInformationHeader
        fields = "__all__"


class FisheryInformationCategoryAdminForm(forms.ModelForm):
    class Meta:
        model = FisheryInformationCategory
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 2}),
            "description_si": forms.Textarea(attrs={"rows": 2}),
            "description_ta": forms.Textarea(attrs={"rows": 2}),
        }


class FisheryInformationItemAdminForm(forms.ModelForm):
    class Meta:
        model = FisheryInformationItem
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 2}),
            "description_si": forms.Textarea(attrs={"rows": 2}),
            "description_ta": forms.Textarea(attrs={"rows": 2}),
        }


@admin.register(FisheryInformationHeader)
class FisheryInformationHeaderAdmin(admin.ModelAdmin):
    form = FisheryInformationHeaderAdminForm
    list_display = ["title_en", "badge_text_en", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Page Headings", {
            "fields": (
                "badge_text_en",
                "title_en",
                "description_en",
            ),
        }),
        ("🇱🇰 Sinhala Page Headings (සිංහල)", {
            "fields": (
                "badge_text_si",
                "title_si",
                "description_si",
            ),
        }),
        ("🇱🇰 Tamil Page Headings (தமிழ்)", {
            "fields": (
                "badge_text_ta",
                "title_ta",
                "description_ta",
            ),
        }),
    )

    def has_add_permission(self, request):
        return not FisheryInformationHeader.objects.exists()


class FisheryInformationItemInline(admin.StackedInline):
    model = FisheryInformationItem
    form = FisheryInformationItemAdminForm
    extra = 0
    show_change_link = True
    verbose_name = "Attached File / Dataset"
    verbose_name_plural = "03. Fishery Information Items (Attached Landing Maps, Species Catalogs & Datasets)"
    
    fields = (
        ("item_id", "file_type", "order", "is_active", "is_featured"),
        ("title_en", "location_en", "file_size"),
        "description_en",
        ("title_si", "location_si"),
        "description_si",
        ("title_ta", "location_ta"),
        "description_ta",
        ("document_file", "file_url_fallback"),
        ("year", "published_date", "display_date"),
    )


@admin.register(FisheryInformationCategory)
class FisheryInformationCategoryAdmin(admin.ModelAdmin):
    form = FisheryInformationCategoryAdminForm
    list_display = [
        "order",
        "category_id",
        "title_en",
        "icon_type",
        "items_count",
        "is_active",
    ]
    list_display_links = ["category_id", "title_en"]
    list_editable = ["order", "is_active"]
    search_fields = ["category_id", "title_en", "title_si", "title_ta", "description_en"]
    inlines = [FisheryInformationItemInline]

    fieldsets = (
        ("⚙️ Category Setup", {
            "fields": (
                ("category_id", "icon_type"),
                ("order", "is_active"),
            ),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
                "description_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                "description_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                "description_ta",
            ),
        }),
    )

    def items_count(self, obj):
        count = obj.items.count()
        return format_html(
            '<span style="font-weight: 700; color: #15803d; background: #dcfce7; padding: 2px 8px; border-radius: 6px; font-size: 11px;">{} files</span>',
            count,
        )
    items_count.short_description = "Attached Files"


@admin.register(FisheryInformationItem)
class FisheryInformationItemAdmin(admin.ModelAdmin):
    form = FisheryInformationItemAdminForm
    list_display = [
        "title_en",
        "category_badge",
        "location_en",
        "year",
        "file_type_badge",
        "file_download_link",
        "file_size",
        "order",
        "is_active",
    ]
    list_display_links = ["title_en"]
    list_filter = ["category", "file_type", "year", "is_active"]
    list_editable = ["order", "is_active"]
    search_fields = ["item_id", "title_en", "title_si", "title_ta", "location_en", "description_en"]

    fieldsets = (
        ("📁 Category & Identification", {
            "fields": (
                ("item_id", "category"),
                ("order", "is_active", "is_featured"),
                ("year", "published_date", "display_date"),
            ),
        }),
        ("📄 Document File & Format", {
            "fields": (
                "file_type",
                "document_file",
                ("file_url_fallback", "file_size"),
            ),
            "description": "Upload a PDF, Excel, Word, CSV, Image (.png/.jpg), or ZIP file. File size is automatically calculated on save.",
        }),
        ("🇬🇧 English Details", {
            "fields": (
                "title_en",
                "location_en",
                "description_en",
            ),
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "fields": (
                "title_si",
                "location_si",
                "description_si",
            ),
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "fields": (
                "title_ta",
                "location_ta",
                "description_ta",
            ),
        }),
    )

    def category_badge(self, obj):
        return format_html(
            '<span style="font-weight: 700; color: #1e3a8a; background: #dbeafe; padding: 2px 8px; border-radius: 6px; font-size: 11px;">{}</span>',
            obj.category.title_en,
        )
    category_badge.short_description = "Category"

    def file_type_badge(self, obj):
        colors = {
            "PDF": ("#991b1b", "#fee2e2"),
            "XLSX": ("#166534", "#dcfce7"),
            "XLS": ("#166534", "#dcfce7"),
            "CSV": ("#0e7490", "#cffafe"),
            "DOCX": ("#1e40af", "#dbeafe"),
            "DOC": ("#1e40af", "#dbeafe"),
            "PPTX": ("#c2410c", "#ffedd5"),
            "ZIP": ("#6b21a8", "#f3e8ff"),
            "PNG": ("#475569", "#f1f5f9"),
            "JPG": ("#475569", "#f1f5f9"),
        }
        fg, bg = colors.get(obj.file_type, ("#334155", "#f1f5f9"))
        return format_html(
            '<span style="font-weight: 700; color: {}; background: {}; padding: 2px 6px; border-radius: 4px; font-size: 11px;">{}</span>',
            fg, bg, obj.file_type,
        )
    file_type_badge.short_description = "Type"

    def file_download_link(self, obj):
        url = obj.document_file.url if obj.document_file else obj.file_url_fallback
        if url and url != "#":
            return format_html(
                '<a href="{}" target="_blank" rel="noopener noreferrer" style="color: #256B29; font-weight: bold; text-decoration: underline;">📄 View/Download</a>',
                url,
            )
        return format_html('<span style="color: #999;">No File</span>')
    file_download_link.short_description = "Document"
