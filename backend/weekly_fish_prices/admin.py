from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import (
    WeeklyFishPricesHeader,
    WeeklyPriceMonthCategory,
    WeeklyPriceReport,
)


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


@admin.register(WeeklyPriceMonthCategory)
class WeeklyPriceMonthCategoryAdmin(admin.ModelAdmin):
    list_display = [
        "month_badge",
        "title_en",
        "title_si",
        "title_ta",
        "reports_count_badge",
        "is_active",
        "order",
    ]
    list_filter = ["year", "month", "is_active"]
    list_editable = ["is_active", "order"]
    search_fields = [
        "title_en",
        "title_si",
        "title_ta",
        "description_en",
        "description_si",
        "description_ta",
        "year",
        "month",
    ]
    ordering = ["-year", "-month_number", "order"]

    fieldsets = (
        ("🗓️ Timeline Group (වසර සහ මාසය)", {
            "fields": (
                ("year", "month"),
                ("is_active", "order"),
            ),
            "description": "Select the reporting year and month for this monthly accordion group.",
        }),
        ("🇬🇧 English Details", {
            "fields": (
                "title_en",
                "description_en",
                ("badge_singular_en", "badge_plural_en"),
            ),
            "description": "Custom title and subtitle shown on the monthly accordion row in English.",
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "fields": (
                "title_si",
                "description_si",
                ("badge_singular_si", "badge_plural_si"),
            ),
            "description": "සිංහල භාෂාව තෝරාගත් විට මෙම මාසික ප්‍රවර්ගයේ පෙන්වන මාතෘකාව, උපසිරැසි විස්තරය සහ ලේබලය.",
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "fields": (
                "title_ta",
                "description_ta",
                ("badge_singular_ta", "badge_plural_ta"),
            ),
            "description": "தமிழ் மொழி தேர்ந்தெடுக்கப்பட்ட போது காட்டப்படும் தலைப்பு, விளக்கம் மற்றும் அறிக்கை லேபிள்.",
        }),
    )

    def month_badge(self, obj):
        return format_html(
            '<strong style="font-size: 13px; color: #1e3a8a;">📅 {} {}</strong>',
            obj.month,
            obj.year,
        )
    month_badge.short_description = "Period (Year / Month)"

    def reports_count_badge(self, obj):
        count = WeeklyPriceReport.objects.filter(year=obj.year, month=obj.month, is_active=True).count()
        return format_html(
            '<span style="background: #ecfdf5; color: #047857; padding: 2px 8px; border-radius: 9999px; font-weight: bold; border: 1px solid #a7f3d0;">{} Reports</span>',
            count,
        )
    reports_count_badge.short_description = "Active Reports"


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
