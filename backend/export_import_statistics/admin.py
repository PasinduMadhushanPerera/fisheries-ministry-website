from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import (
    ExportImportHeader,
    ExportImportSummaryMetric,
    ExportImportYearCategory,
    ExportImportReport,
)


class ExportImportHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = ExportImportHeader
        fields = "__all__"


class ExportImportSummaryMetricAdminForm(forms.ModelForm):
    class Meta:
        model = ExportImportSummaryMetric
        fields = "__all__"


class ExportImportReportAdminForm(forms.ModelForm):
    class Meta:
        model = ExportImportReport
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 2}),
            "description_si": forms.Textarea(attrs={"rows": 2}),
            "description_ta": forms.Textarea(attrs={"rows": 2}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if "report_id" in self.fields:
            self.fields["report_id"].required = False
            self.fields["report_id"].disabled = True
            self.fields["report_id"].widget.attrs["placeholder"] = "✨ Auto-generated from Year & Month upon save"
            self.fields["report_id"].help_text = "🔒 Report ID is disabled & will be auto-generated automatically from Year & Month upon saving."


@admin.register(ExportImportHeader)
class ExportImportHeaderAdmin(admin.ModelAdmin):
    form = ExportImportHeaderAdminForm
    list_display = ["title_en", "badge_text_en", "summary_heading_en", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Page Headings", {
            "fields": (
                "badge_text_en",
                "title_en",
                "description_en",
                "summary_heading_en",
            ),
        }),
        ("🇱🇰 Sinhala Page Headings (සිංහල)", {
            "fields": (
                "badge_text_si",
                "title_si",
                "description_si",
                "summary_heading_si",
            ),
        }),
        ("🇱🇰 Tamil Page Headings (தமிழ்)", {
            "fields": (
                "badge_text_ta",
                "title_ta",
                "description_ta",
                "summary_heading_ta",
            ),
        }),
    )

    def has_add_permission(self, request):
        return not ExportImportHeader.objects.exists()


@admin.register(ExportImportSummaryMetric)
class ExportImportSummaryMetricAdmin(admin.ModelAdmin):
    form = ExportImportSummaryMetricAdminForm
    list_display = [
        "metric_preview",
        "title_en",
        "value_en",
        "unit_en",
        "period_en",
        "trend_en",
        "order",
        "is_active",
    ]
    list_display_links = ["title_en"]
    list_editable = ["order", "is_active"]
    search_fields = ["metric_id", "title_en", "value_en", "period_en"]

    fieldsets = (
        ("⚙️ Metric Configuration", {
            "fields": (
                ("metric_id", "icon_type"),
                ("order", "is_active"),
            ),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                ("title_en", "value_en", "unit_en"),
                ("period_en", "trend_en"),
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                ("title_si", "value_si", "unit_si"),
                ("period_si", "trend_si"),
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                ("title_ta", "value_ta", "unit_ta"),
                ("period_ta", "trend_ta"),
            ),
        }),
    )

    def metric_preview(self, obj):
        colors = {
            "export-val": ("#166534", "#dcfce7"),
            "import-val": ("#92400e", "#fef3c7"),
            "balance": ("#115e59", "#ccfbf1"),
            "export-qty": ("#1e40af", "#dbeafe"),
            "import-qty": ("#3730a3", "#e0e7ff"),
            "latest-month": ("#1e293b", "#f1f5f9"),
        }
        fg, bg = colors.get(obj.icon_type, ("#1b4d1d", "#e8f5e9"))
        return format_html(
            '<span style="font-weight: 700; color: {}; background: {}; padding: 3px 8px; border-radius: 6px; font-size: 11px;">{}</span>',
            fg, bg, obj.metric_id
        )
    metric_preview.short_description = "Key"



@admin.register(ExportImportYearCategory)
class ExportImportYearCategoryAdmin(admin.ModelAdmin):
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
            "description": "Specify the trade report year for this annual accordion group.",
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
        count = ExportImportReport.objects.filter(year=obj.year, is_active=True).count()
        return format_html(
            '<span style="background: #ecfdf5; color: #047857; padding: 2px 8px; border-radius: 9999px; font-weight: bold; border: 1px solid #a7f3d0;">{} Reports</span>',
            count,
        )
    reports_count_badge.short_description = "Total Reports"


@admin.register(ExportImportReport)
class ExportImportReportAdmin(admin.ModelAdmin):
    form = ExportImportReportAdminForm
    list_display = [
        "report_tag",
        "year",
        "month",
        "title_en",
        "file_type_badge",
        "file_download_link",
        "file_size",
        "published_date",
        "is_active",
    ]
    list_display_links = ["report_tag", "title_en"]
    list_filter = ["year", "month", "file_type", "is_active"]
    list_editable = ["is_active"]
    search_fields = ["report_id", "title_en", "title_si", "title_ta", "month", "description_en"]
    date_hierarchy = "published_date"

    fieldsets = (
        ("🗓️ Timeline & Identification", {
            "fields": (
                ("report_id", "is_active", "order"),
                ("year", "month"),
                ("published_date", "display_date"),
            ),
        }),
        ("📄 Document File & Format", {
            "fields": (
                "file_type",
                "document_file",
                ("file_url_fallback", "file_size"),
            ),
            "description": "Upload a PDF, Excel (.xlsx/.xls), or CSV document. File size is automatically computed on save.",
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
            '<span style="font-weight: 700; color: #1e3a8a; background: #dbeafe; padding: 2px 8px; border-radius: 6px; font-size: 11px;">{} {}</span>',
            obj.year,
            obj.month[:3],
        )
    report_tag.short_description = "Period"

    def file_type_badge(self, obj):
        colors = {
            "PDF": ("#991b1b", "#fee2e2"),
            "XLSX": ("#166534", "#dcfce7"),
            "XLS": ("#166534", "#dcfce7"),
            "CSV": ("#0e7490", "#cffafe"),
            "DOCX": ("#1e40af", "#dbeafe"),
            "ZIP": ("#6b21a8", "#f3e8ff"),
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
