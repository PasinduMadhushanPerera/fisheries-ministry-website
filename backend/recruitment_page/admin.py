from django import forms
from django.contrib import admin
from .models import RecruitmentPageHeader, RecruitmentVacancyItem


class RecruitmentPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = RecruitmentPageHeader
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class RecruitmentVacancyItemAdminForm(forms.ModelForm):
    class Meta:
        model = RecruitmentVacancyItem
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
            "qualifications_en": forms.Textarea(attrs={"rows": 4}),
            "qualifications_si": forms.Textarea(attrs={"rows": 4}),
            "qualifications_ta": forms.Textarea(attrs={"rows": 4}),
        }


@admin.register(RecruitmentPageHeader)
class RecruitmentPageHeaderAdmin(admin.ModelAdmin):
    form = RecruitmentPageHeaderAdminForm
    list_display = ["title_en", "title_si", "title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content & Section Titles", {
            "fields": (
                "badge_text_en",
                "title_en",
                "description_en",
                ("featured_badge_en", "catalogue_badge_en"),
                "library_title_en",
            ),
        }),
        ("🇱🇰 Sinhala Content & Section Titles (සිංහල)", {
            "fields": (
                "badge_text_si",
                "title_si",
                "description_si",
                ("featured_badge_si", "catalogue_badge_si"),
                "library_title_si",
            ),
        }),
        ("🇱🇰 Tamil Content & Section Titles (தமிழ்)", {
            "fields": (
                "badge_text_ta",
                "title_ta",
                "description_ta",
                ("featured_badge_ta", "catalogue_badge_ta"),
                "library_title_ta",
            ),
        }),
    )

    def has_add_permission(self, request):
        return not RecruitmentPageHeader.objects.exists()


@admin.register(RecruitmentVacancyItem)
class RecruitmentVacancyItemAdmin(admin.ModelAdmin):
    form = RecruitmentVacancyItemAdminForm
    list_display = [
        "order",
        "ref_number",
        "year",
        "title_en",
        "institution_en",
        "category",
        "status",
        "closing_date",
        "featured",
        "is_active",
    ]
    list_display_links = ["ref_number", "title_en"]
    list_editable = ["order", "status", "featured", "is_active"]
    list_filter = ["year", "category", "status", "featured", "is_active"]
    search_fields = [
        "ref_number",
        "title_en",
        "title_si",
        "title_ta",
        "institution_en",
        "institution_si",
        "institution_ta",
        "slug",
    ]
    prepopulated_fields = {"slug": ("ref_number", "title_en")}

    fieldsets = (
        ("Vacancy Classification & Status", {
            "fields": (
                ("order", "slug"),
                ("ref_number", "year"),
                ("category", "status"),
                ("featured", "is_active"),
            ),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
                ("institution_en", "department_en"),
                "category_label_en",
                "description_en",
                "qualifications_en",
                ("salary_scale_en", "age_limit_en"),
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                ("institution_si", "department_si"),
                "category_label_si",
                "description_si",
                "qualifications_si",
                ("salary_scale_si", "age_limit_si"),
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                ("institution_ta", "department_ta"),
                "category_label_ta",
                "description_ta",
                "qualifications_ta",
                ("salary_scale_ta", "age_limit_ta"),
            ),
        }),
        ("📅 Important Dates", {
            "fields": (("published_date", "closing_date"),),
        }),
        ("📄 Application Form & Downloads", {
            "fields": (
                ("document_file", "file_url"),
                ("file_type", "file_size"),
            ),
        }),
    )
