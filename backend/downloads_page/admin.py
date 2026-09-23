from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import (
    DownloadCategory,
    DownloadDocumentItem,
)


# ==========================================================
# Form Definitions
# ==========================================================
class DownloadCategoryAdminForm(forms.ModelForm):
    class Meta:
        model = DownloadCategory
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 2, "class": "vLargeTextField"}),
            "description_si": forms.Textarea(attrs={"rows": 2, "class": "vLargeTextField"}),
            "description_ta": forms.Textarea(attrs={"rows": 2, "class": "vLargeTextField"}),
        }


class DownloadDocumentItemAdminForm(forms.ModelForm):
    class Meta:
        model = DownloadDocumentItem
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 2, "class": "vLargeTextField"}),
            "description_si": forms.Textarea(attrs={"rows": 2, "class": "vLargeTextField"}),
            "description_ta": forms.Textarea(attrs={"rows": 2, "class": "vLargeTextField"}),
        }


# ==========================================================
# 01. Inline Documents for Category Admin
# ==========================================================
class DownloadDocumentItemInline(admin.StackedInline):
    model = DownloadDocumentItem
    form = DownloadDocumentItemAdminForm
    extra = 0
    ordering = ["order", "id"]
    verbose_name = "Attached Document / File"
    verbose_name_plural = "Attached Documents, Reports & Files"

    fields = (
        ("order", "is_active", "is_featured"),
        ("item_id", "year", "language"),
        ("title_en", "description_en", "document_file_en"),
        ("title_si", "description_si", "document_file_si"),
        ("title_ta", "description_ta", "document_file_ta"),
        ("file_type", "file_size"),
        ("document_file", "file_url_fallback"),
        ("published_date", "display_date"),
    )


# ==========================================================
# 01. Download Categories Admin
# ==========================================================
@admin.register(DownloadCategory)
class DownloadCategoryAdmin(admin.ModelAdmin):
    form = DownloadCategoryAdminForm
    list_display = [
        "order",
        "title_en",
        "category_id",
        "icon_type",
        "attached_doc_count",
        "is_active_badge",
        "updated_at",
    ]
    list_display_links = ["title_en"]
    list_filter = ["icon_type", "is_active"]
    search_fields = ["title_en", "title_si", "title_ta", "category_id"]
    ordering = ["order", "id"]
    inlines = [DownloadDocumentItemInline]

    fieldsets = (
        ("📁 Category Identification & Settings", {
            "fields": (
                ("order", "is_active", "icon_type"),
                ("category_id",),
            ),
        }),
        ("🇬🇧 English Details", {
            "fields": (
                "title_en",
                "description_en",
            ),
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "classes": ("collapse",),
            "fields": (
                "title_si",
                "description_si",
            ),
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "classes": ("collapse",),
            "fields": (
                "title_ta",
                "description_ta",
            ),
        }),
    )

    def attached_doc_count(self, obj):
        count = obj.documents.count()
        return format_html(
            '<span style="background: #f0fdf4; color: #16a34a; padding: 2px 8px; border-radius: 6px; font-weight: bold; border: 1px solid #bbf7d0;">📄 {} files</span>',
            count,
        )
    attached_doc_count.short_description = "Attached Files"

    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="color: #15803d; font-weight: bold;">● Active</span>')
        return format_html('<span style="color: #dc2626; font-weight: bold;">○ Inactive</span>')
    is_active_badge.short_description = "Status"


# ==========================================================
# 02. Standalone Download Document Items Admin
# ==========================================================
@admin.register(DownloadDocumentItem)
class DownloadDocumentItemAdmin(admin.ModelAdmin):
    form = DownloadDocumentItemAdminForm
    list_display = [
        "order",
        "title_en",
        "category_badge",
        "format_badge",
        "uploaded_files_badge",
        "year",
        "file_size",
        "is_featured_badge",
        "is_active_badge",
        "updated_at",
    ]
    list_display_links = ["title_en"]
    list_filter = ["category", "file_type", "language", "year", "is_featured", "is_active"]
    search_fields = ["title_en", "title_si", "title_ta", "description_en", "item_id"]
    ordering = ["category__order", "order", "id"]

    fieldsets = (
        ("📁 File Identification & Parent Category", {
            "fields": (
                ("category", "order", "is_active", "is_featured"),
                ("item_id", "year", "language"),
            ),
        }),
        ("🇬🇧 English Details & File Upload", {
            "fields": (
                "title_en",
                "description_en",
                "document_file_en",
            ),
        }),
        ("🇱🇰 Sinhala Details & File Upload (සිංහල)", {
            "classes": ("collapse",),
            "fields": (
                "title_si",
                "description_si",
                "document_file_si",
            ),
        }),
        ("🇱🇰 Tamil Details & File Upload (தமிழ்)", {
            "classes": ("collapse",),
            "fields": (
                "title_ta",
                "description_ta",
                "document_file_ta",
            ),
        }),
        ("📂 General File & Publication Date Settings", {
            "fields": (
                ("file_type", "file_size"),
                ("document_file", "file_url_fallback"),
                ("published_date", "display_date"),
            ),
            "description": "Optional: Upload a default general file or external fallback URL if language-specific files are not uploaded separately.",
        }),
    )

    def category_badge(self, obj):
        return format_html(
            '<span style="background: #eff6ff; color: #1d4ed8; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 11px;">📂 {}</span>',
            obj.category.title_en,
        )
    category_badge.short_description = "Category"

    def format_badge(self, obj):
        bg = "#fef2f2" if obj.file_type == "PDF" else "#f0fdf4" if "XLS" in obj.file_type or obj.file_type == "CSV" else "#fef3c7" if "PPT" in obj.file_type else "#eff6ff"
        color = "#dc2626" if obj.file_type == "PDF" else "#16a34a" if "XLS" in obj.file_type or obj.file_type == "CSV" else "#d97706" if "PPT" in obj.file_type else "#2563eb"
        return format_html(
            '<span style="background: {}; color: {}; padding: 2px 6px; border-radius: 4px; font-weight: 800; font-size: 11px;">{}</span>',
            bg,
            color,
            obj.file_type,
        )
    format_badge.short_description = "Format"

    def uploaded_files_badge(self, obj):
        badges = []
        if obj.document_file_en or obj.document_file:
            badges.append('<span style="background: #e0f2fe; color: #0369a1; padding: 1px 4px; border-radius: 4px; font-weight: 700; font-size: 10px;">🇬🇧 EN</span>')
        if obj.document_file_si:
            badges.append('<span style="background: #fef3c7; color: #b45309; padding: 1px 4px; border-radius: 4px; font-weight: 700; font-size: 10px;">🇱🇰 SI</span>')
        if obj.document_file_ta:
            badges.append('<span style="background: #fce7f3; color: #be185d; padding: 1px 4px; border-radius: 4px; font-weight: 700; font-size: 10px;">🇱🇰 TA</span>')
        if not badges:
            return format_html('<span style="color: #94a3b8; font-size: 11px;">(Default / Fallback)</span>')
        return format_html(" ".join(badges))
    uploaded_files_badge.short_description = "Uploaded Files"

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
