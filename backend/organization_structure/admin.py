from django import forms
from django.contrib import admin
from .models import OrganizationStructureChart


class OrganizationStructureChartAdminForm(forms.ModelForm):
    class Meta:
        model = OrganizationStructureChart
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 2}),
            "description_si": forms.Textarea(attrs={"rows": 2}),
            "description_ta": forms.Textarea(attrs={"rows": 2}),
            "executive_notes_en": forms.Textarea(attrs={"rows": 3}),
            "executive_notes_si": forms.Textarea(attrs={"rows": 3}),
            "executive_notes_ta": forms.Textarea(attrs={"rows": 3}),
        }


@admin.register(OrganizationStructureChart)
class OrganizationStructureChartAdmin(admin.ModelAdmin):
    form = OrganizationStructureChartAdminForm
    list_display = ["title_en", "title_si", "title_ta", "chart_box_title_en", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": (
                ("eyebrow_en", "title_en"),
                "description_en",
                ("chart_box_title_en", "chart_box_subtitle_en"),
                "executive_notes_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                ("eyebrow_si", "title_si"),
                "description_si",
                ("chart_box_title_si", "chart_box_subtitle_si"),
                "executive_notes_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                ("eyebrow_ta", "title_ta"),
                "description_ta",
                ("chart_box_title_ta", "chart_box_subtitle_ta"),
                "executive_notes_ta",
            ),
        }),
        ("⚙️ Chart Media & Downloads", {
            "fields": (("chart_image", "chart_fallback"), "chart_pdf"),
        }),
    )

    def has_add_permission(self, request):
        return not OrganizationStructureChart.objects.exists()
