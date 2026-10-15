from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import (
    AnnualStatisticsHeader,
    AnnualStatisticsYearCategory,
    AnnualStatisticsReport,
)


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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if "report_id" in self.fields:
            self.fields["report_id"].required = False
            self.fields["report_id"].disabled = True
            self.fields["report_id"].widget.attrs["placeholder"] = "✨ Auto-generated from Year & Title upon save"
            self.fields["report_id"].help_text = "🔒 Report ID is disabled & will be auto-generated automatically from Year & Title upon saving."


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


@admin.register(AnnualStatisticsYearCategory)
class AnnualStatisticsYearCategoryAdmin(admin.ModelAdmin):
    list_display = [
        "year_badge",
        "title_en",
        "title_si",
        "title_ta",
        "reports_count_badge",
        "is_active",
        "order",
    ]
    list_filter = ["year", "is_active"]
    list_editable = ["is_active", "order"]
    search_fields = [
        "title_en",
        "title_si",
        "title_ta",
        "description_en",
        "description_si",
        "description_ta",
        "year",
    ]
    ordering = ["-year", "order"]

    fieldsets = (
        ("🗓️ Timeline Year Group (වසර)", {
            "fields": (
                "year",
                ("is_active", "order"),
            ),
            "description": "Specify the statistical report year for this annual accordion group.",
        }),
        ("🇬🇧 English Details", {
            "fields": (
                "title_en",
                "description_en",
                ("badge_singular_en", "badge_plural_en"),
            ),
            "description": "Custom title and subtitle shown on the annual accordion row in English.",
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "fields": (
                "title_si",
                "description_si",
                ("badge_singular_si", "badge_plural_si"),
            ),
            "description": "සිංහල භාෂාව තෝරාගත් විට මෙම වාර්ෂික ප්‍රවර්ගයේ පෙන්වන මාතෘකාව, උපසිරැසි විස්තරය සහ ලේබලය.",
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

    def year_badge(self, obj):
        return format_html(
            '<strong style="font-size: 13px; color: #1e3a8a;">📅 Year {}</strong>',
            obj.year,
        )
    year_badge.short_description = "Year"

    def reports_count_badge(self, obj):
        count = AnnualStatisticsReport.objects.filter(year=obj.year, is_active=True).count()
        return format_html(
            '<span style="background: #ecfdf5; color: #047857; padding: 2px 8px; border-radius: 9999px; font-weight: bold; border: 1px solid #a7f3d0;">{} Reports</span>',
            count,
        )
    reports_count_badge.short_description = "Total Reports"


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
