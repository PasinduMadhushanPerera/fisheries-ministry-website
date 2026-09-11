from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import MonthlyFishProductionHeader, MonthlyProductionReport


class MonthlyFishProductionHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = MonthlyFishProductionHeader
        fields = "__all__"


class MonthlyProductionReportAdminForm(forms.ModelForm):
    class Meta:
        model = MonthlyProductionReport
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 2}),
            "description_si": forms.Textarea(attrs={"rows": 2}),
            "description_ta": forms.Textarea(attrs={"rows": 2}),
        }


@admin.register(MonthlyFishProductionHeader)
class MonthlyFishProductionHeaderAdmin(admin.ModelAdmin):
    form = MonthlyFishProductionHeaderAdminForm
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
        return not MonthlyFishProductionHeader.objects.exists()


@admin.register(MonthlyProductionReport)
class MonthlyProductionReportAdmin(admin.ModelAdmin):
    form = MonthlyProductionReportAdminForm
    list_display = [
        "report_tag",
        "year",
        "month",
        "title_en",
        "is_featured",
        "file_type_badge",
        "file_download_link",
        "file_size",
        "published_date",
        "is_active",
    ]
    list_display_links = ["report_tag", "title_en"]
    list_filter = ["year", "month", "file_type", "is_featured", "is_active"]
    list_editable = ["is_featured", "is_active"]
    search_fields = ["report_id", "title_en", "title_si", "title_ta", "month", "description_en"]
    date_hierarchy = "published_date"

    fieldsets = (
        ("🗓️ Timeline & Classification", {
            "fields": (
                ("report_id", "is_featured", "is_active", "order"),
                ("year", "month"),
                ("published_date", "display_date"),
            ),
        }),
        ("📊 Document File & Format", {
            "fields": (
                "file_type",
                "document_file",
                ("file_url_fallback", "file_size"),
            ),
            "description": "Upload an Excel (.xlsx / .xls) spreadsheet or document file. File size is automatically computed on save.",
        }),
        ("🇬🇧 English Details", {
            "fields": (
                "title_en",
                "description_en",
            ),
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "fields": (
                "title_si",
                "description_si",
            ),
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "fields": (
                "title_ta",
                "description_ta",
            ),
        }),
    )

    def report_tag(self, obj):
        return format_html(
            '<span style="font-weight: 700; color: #1b4d1d; background: #e8f5e9; padding: 2px 8px; border-radius: 6px; font-size: 11px;">{} {}</span>',
            obj.year,
            obj.month[:3],
        )
    report_tag.short_description = "Period"

    def file_type_badge(self, obj):
        return format_html(
            '<span style="font-weight: 700; color: #0c4a6e; background: #e0f2fe; padding: 2px 6px; border-radius: 4px; font-size: 11px;">{}</span>',
            obj.file_type,
        )
    file_type_badge.short_description = "Type"

    def file_download_link(self, obj):
        url = obj.document_file.url if obj.document_file else obj.file_url_fallback
        if url and url != "#":
            return format_html(
                '<a href="{}" target="_blank" rel="noopener noreferrer" style="color: #256B29; font-weight: bold; text-decoration: underline;">📊 Download</a>',
                url,
            )
        return format_html('<span style="color: #999;">No File</span>')
    file_download_link.short_description = "Document"
