from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import AnnualStatisticsHeader, AnnualStatisticsReport


class AnnualStatisticsHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = AnnualStatisticsHeader
        fields = "__all__"


class AnnualStatisticsReportAdminForm(forms.ModelForm):
    class Meta:
        model = AnnualStatisticsReport
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


@admin.register(AnnualStatisticsHeader)
class AnnualStatisticsHeaderAdmin(admin.ModelAdmin):
    form = AnnualStatisticsHeaderAdminForm
    list_display = ["title_en", "badge_text_en", "featured_badge_en", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Page Headings", {
            "fields": (
                "badge_text_en",
                "title_en",
                "description_en",
                "featured_badge_en",
            ),
        }),
        ("🇱🇰 Sinhala Page Headings (සිංහල)", {
            "fields": (
                "badge_text_si",
                "title_si",
                "description_si",
                "featured_badge_si",
            ),
        }),
        ("🇱🇰 Tamil Page Headings (தமிழ்)", {
            "fields": (
                "badge_text_ta",
                "title_ta",
                "description_ta",
                "featured_badge_ta",
            ),
        }),
    )

    def has_add_permission(self, request):
        return not AnnualStatisticsHeader.objects.exists()


@admin.register(AnnualStatisticsReport)
class AnnualStatisticsReportAdmin(admin.ModelAdmin):
    form = AnnualStatisticsReportAdminForm
    list_display = [
        "title_en",
        "year",
        "file_type_badge",
        "is_featured",
        "file_download_link",
        "file_size",
        "published_date",
        "order",
        "is_active",
    ]
    list_display_links = ["title_en"]
    list_filter = ["year", "file_type", "is_featured", "is_active"]
    list_editable = ["is_featured", "order", "is_active"]
    search_fields = ["report_id", "title_en", "title_si", "title_ta", "description_en"]
    date_hierarchy = "published_date"

    fieldsets = (
        ("🗓️ Publication Details & Status", {
            "fields": (
                ("report_id", "year", "order"),
                ("is_featured", "is_active"),
                ("published_date", "display_date"),
                "languages_text",
            ),
        }),
        ("📄 Document File & Format", {
            "fields": (
                "file_type",
                "document_file",
                ("file_url_fallback", "file_size"),
            ),
            "description": "Upload a PDF, Excel (.xlsx/.xls), Word, CSV, PowerPoint, or ZIP document. File size is automatically computed on save.",
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

    def file_type_badge(self, obj):
        colors = {
            "PDF": ("#991b1b", "#fee2e2"),
            "XLSX": ("#166534", "#dcfce7"),
            "XLS": ("#166534", "#dcfce7"),
            "CSV": ("#0e7490", "#cffafe"),
            "DOCX": ("#1e40af", "#dbeafe"),
            "DOC": ("#1e40af", "#dbeafe"),
            "PPTX": ("#c2410c", "#ffedd5"),
            "PPT": ("#c2410c", "#ffedd5"),
            "ZIP": ("#6b21a8", "#f3e8ff"),
        }
        fg, bg = colors.get(obj.file_type, ("#334155", "#f1f5f9"))
        return format_html(
            '<span style="font-weight: 700; color: {}; background: {}; padding: 2px 8px; border-radius: 4px; font-size: 11px;">{}</span>',
            fg, bg, obj.file_type,
        )
    file_type_badge.short_description = "Format"

    def featured_indicator(self, obj):
        if obj.is_featured:
            return format_html(
                '<span style="font-weight: bold; color: #15803d; background: #dcfce7; padding: 2px 8px; border-radius: 6px; font-size: 11px;">⭐ Featured</span>'
            )
        return format_html('<span style="color: #94a3b8;">—</span>')
    featured_indicator.short_description = "Featured"

    def file_download_link(self, obj):
        url = obj.document_file.url if obj.document_file else obj.file_url_fallback
        if url and url != "#":
            return format_html(
                '<a href="{}" target="_blank" rel="noopener noreferrer" style="color: #256B29; font-weight: bold; text-decoration: underline;">📄 View/Download</a>',
                url,
            )
        return format_html('<span style="color: #999;">No File</span>')
    file_download_link.short_description = "File"
