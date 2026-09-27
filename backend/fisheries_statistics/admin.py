from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import (
    FisheriesStatisticsHeader,
    FisheriesSummaryMetric,
    StatisticsCategory,
    StatisticsTableRow,
)


class FisheriesStatisticsHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = FisheriesStatisticsHeader
        fields = "__all__"


class FisheriesSummaryMetricAdminForm(forms.ModelForm):
    class Meta:
        model = FisheriesSummaryMetric
        fields = "__all__"


from django.urls import reverse


class StatisticsCategoryAdminForm(forms.ModelForm):
    class Meta:
        model = StatisticsCategory
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 2}),
            "description_si": forms.Textarea(attrs={"rows": 2}),
            "description_ta": forms.Textarea(attrs={"rows": 2}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if "slug" in self.fields:
            self.fields["slug"].required = False
            self.fields["slug"].disabled = True
            self.fields["slug"].widget.attrs["placeholder"] = "✨ Auto-generated from title upon save"
            self.fields["slug"].help_text = "🔒 Slug is disabled & will be auto-generated automatically from the category title upon saving."


@admin.register(FisheriesStatisticsHeader)
class FisheriesStatisticsHeaderAdmin(admin.ModelAdmin):
    form = FisheriesStatisticsHeaderAdminForm
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
        return not FisheriesStatisticsHeader.objects.exists()


@admin.register(FisheriesSummaryMetric)
class FisheriesSummaryMetricAdmin(admin.ModelAdmin):
    form = FisheriesSummaryMetricAdminForm
    list_display = [
        "title_en",
        "value",
        "unit_en",
        "year",
        "icon_name",
        "order",
        "is_active",
        "updated_at",
    ]
    list_editable = ["value", "year", "order", "is_active"]
    list_filter = ["year", "icon_name", "is_active"]
    search_fields = ["title_en", "title_si", "title_ta", "value", "unit_en"]

    fieldsets = (
        ("⚙️ Metric Configuration", {
            "fields": (
                ("order", "year", "icon_name"),
                ("value", "is_active"),
            ),
        }),
        ("🇬🇧 English Details", {
            "fields": (
                "title_en",
                "unit_en",
            ),
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "fields": (
                "title_si",
                "unit_si",
            ),
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "fields": (
                "title_ta",
                "unit_ta",
            ),
        }),
    )


@admin.register(StatisticsCategory)
class StatisticsCategoryAdmin(admin.ModelAdmin):
    form = StatisticsCategoryAdminForm
    list_display = [
        "title_en",
        "slug",
        "row_count_display",
        "icon_name",
        "is_default_open",
        "order",
        "is_active",
        "updated_at",
    ]
    list_display_links = ["title_en"]
    list_editable = ["is_default_open", "order", "is_active"]
    list_filter = ["is_default_open", "is_active"]
    search_fields = ["title_en", "title_si", "title_ta", "description_en", "slug"]

    fieldsets = (
        ("🏷️ Category Configuration", {
            "fields": (
                ("order", "icon_name"),
                ("is_default_open", "is_active"),
                "slug",
            ),
        }),
        ("🇬🇧 English Category Details", {
            "fields": (
                "title_en",
                "description_en",
                "caption_en",
            ),
        }),
        ("🇱🇰 Sinhala Category Details (සිංහල)", {
            "fields": (
                "title_si",
                "description_si",
                "caption_si",
            ),
        }),
        ("🇱🇰 Tamil Category Details (தமிழ்)", {
            "fields": (
                "title_ta",
                "description_ta",
                "caption_ta",
            ),
        }),
    )

    def row_count_display(self, obj):
        count = obj.rows.count()
        url = reverse("admin:fisheries_statistics_statisticstablerow_changelist") + f"?category__id__exact={obj.id}"
        return format_html(
            '<a href="{}" style="font-weight: bold; color: #256B29; background: #e8f5e9; padding: 4px 10px; border-radius: 6px; border: 1px solid #c8e6c9; text-decoration: none;" title="Manage table rows for this category">📊 {} Rows</a>',
            url,
            count,
        )
    row_count_display.short_description = "Table Rows"


@admin.register(StatisticsTableRow)
class StatisticsTableRowAdmin(admin.ModelAdmin):
    list_display = [
        "label_en",
        "category_badge",
        "value",
        "unit",
        "is_emphasized",
        "order",
        "updated_at",
    ]
    list_filter = ["category", "is_emphasized"]
    list_editable = ["value", "unit", "is_emphasized", "order"]
    search_fields = ["label_en", "label_si", "label_ta", "value", "category__title_en"]

    fieldsets = (
        ("🏷️ Row Classification & Value", {
            "fields": (
                "category",
                ("order", "value", "unit"),
                "is_emphasized",
            ),
        }),
        ("🇬🇧 English Label", {
            "fields": ("label_en",),
        }),
        ("🇱🇰 Sinhala Label (සිංහල)", {
            "fields": ("label_si",),
        }),
        ("🇱🇰 Tamil Label (தமிழ்)", {
            "fields": ("label_ta",),
        }),
    )

    def category_badge(self, obj):
        return format_html(
            '<span style="font-weight: 600; color: #1b4d1d; background: #e8f5e9; padding: 2px 8px; border-radius: 4px;">{}</span>',
            obj.category.title_en,
        )
    category_badge.short_description = "Category"
