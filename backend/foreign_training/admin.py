from django import forms
from django.contrib import admin
from .models import ForeignTrainingPageHeader, ForeignTrainingProgramme


class ForeignTrainingPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = ForeignTrainingPageHeader
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class ForeignTrainingProgrammeAdminForm(forms.ModelForm):
    class Meta:
        model = ForeignTrainingProgramme
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 4}),
            "description_si": forms.Textarea(attrs={"rows": 4}),
            "description_ta": forms.Textarea(attrs={"rows": 4}),
        }


@admin.register(ForeignTrainingPageHeader)
class ForeignTrainingPageHeaderAdmin(admin.ModelAdmin):
    form = ForeignTrainingPageHeaderAdminForm
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
        return not ForeignTrainingPageHeader.objects.exists()


@admin.register(ForeignTrainingProgramme)
class ForeignTrainingProgrammeAdmin(admin.ModelAdmin):
    form = ForeignTrainingProgrammeAdminForm
    list_display = [
        "order",
        "year",
        "country_en",
        "title_en",
        "institution_en",
        "category",
        "status",
        "featured",
        "is_active",
    ]
    list_display_links = ["title_en"]
    list_editable = ["order", "status", "featured", "is_active"]
    list_filter = ["year", "country_en", "category", "status", "featured", "is_active"]
    search_fields = [
        "title_en",
        "title_si",
        "title_ta",
        "country_en",
        "country_si",
        "country_ta",
        "institution_en",
        "institution_si",
        "institution_ta",
        "slug",
    ]
    prepopulated_fields = {"slug": ("title_en",)}

    fieldsets = (
        ("Classification & Status", {
            "fields": (
                ("order", "slug"),
                ("year", "category", "status"),
                ("featured", "is_active"),
            ),
        }),
        ("🌍 Host Country (Multilingual)", {
            "fields": (("country_en", "country_si", "country_ta"),),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
                ("institution_en", "category_label_en"),
                "description_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                ("institution_si", "category_label_si"),
                "description_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                ("institution_ta", "category_label_ta"),
                "description_ta",
            ),
        }),
        ("📅 Important Dates", {
            "fields": (("published_date", "application_deadline"),),
        }),
        ("🖼️ Programme Banner Image", {
            "fields": (("image", "image_fallback"),),
        }),
        ("📄 Document & Downloads", {
            "fields": (
                ("document_file", "file_url"),
                ("file_type", "file_size"),
            ),
        }),
    )
