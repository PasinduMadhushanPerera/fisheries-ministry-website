from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import WeeklyFishPricesHeader, WeeklyPriceReport


class WeeklyFishPricesHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = WeeklyFishPricesHeader
        fields = "__all__"


class WeeklyPriceReportAdminForm(forms.ModelForm):
    class Meta:
        model = WeeklyPriceReport
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if "report_id" in self.fields:
            self.fields["report_id"].required = False
            self.fields["report_id"].disabled = True
            self.fields["report_id"].widget.attrs["placeholder"] = "✨ Auto-generated from Year, Month & Week upon save"
            self.fields["report_id"].help_text = "🔒 Report ID is disabled & will be auto-generated automatically from Year, Month & Week upon saving."


@admin.register(WeeklyFishPricesHeader)
class WeeklyFishPricesHeaderAdmin(admin.ModelAdmin):
    form = WeeklyFishPricesHeaderAdminForm
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
        return not WeeklyFishPricesHeader.objects.exists()


@admin.register(WeeklyPriceReport)
class WeeklyPriceReportAdmin(admin.ModelAdmin):
    form = WeeklyPriceReportAdminForm
    list_display = [
        "report_tag",
        "year",
        "month",
        "week",
        "title_en",
        "published_date",
        "pdf_download_link",
        "file_size",
        "is_active",
    ]
    list_display_links = ["report_tag", "title_en"]
    list_filter = ["year", "month", "week", "is_active"]
    list_editable = ["is_active"]
    search_fields = ["report_id", "title_en", "title_si", "title_ta", "month", "published_date"]
    date_hierarchy = "published_date"

    fieldsets = (
        ("🗓️ Timeline & Period Classification", {
            "fields": (
                ("report_id", "is_active", "order"),
                ("year", "month", "week"),
                ("published_date", "display_date"),
            ),
        }),
        ("📄 Report Document & File", {
            "fields": (
                "pdf_file",
                ("pdf_url_fallback", "file_size"),
            ),
            "description": "Upload a direct PDF document or provide an existing PDF path. File size will be automatically calculated on save.",
        }),
        ("🇬🇧 English Details", {
            "fields": ("title_en",),
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "fields": ("title_si",),
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "fields": ("title_ta",),
        }),
    )

    def report_tag(self, obj):
        return format_html(
            '<span style="font-weight: 700; color: #1b4d1d; background: #e8f5e9; padding: 2px 8px; border-radius: 6px; font-size: 11px;">{} {} W{}</span>',
            obj.year,
            obj.month[:3],
            obj.week,
        )
    report_tag.short_description = "Period"

    def pdf_download_link(self, obj):
        url = obj.pdf_file.url if obj.pdf_file else obj.pdf_url_fallback
        if url:
            return format_html(
                '<a href="{}" target="_blank" rel="noopener noreferrer" style="color: #256B29; font-weight: bold; text-decoration: underline;">📄 Download PDF</a>',
                url,
            )
        return format_html('<span style="color: #999;">No PDF</span>')
    pdf_download_link.short_description = "Document"
