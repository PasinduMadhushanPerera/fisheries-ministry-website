from django import forms
from django.contrib import admin
from .models import LocalTrainingPageHeader, LocalTrainingProgramme


class LocalTrainingPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = LocalTrainingPageHeader
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class LocalTrainingProgrammeAdminForm(forms.ModelForm):
    class Meta:
        model = LocalTrainingProgramme
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 4}),
            "description_si": forms.Textarea(attrs={"rows": 4}),
            "description_ta": forms.Textarea(attrs={"rows": 4}),
        }


@admin.register(LocalTrainingPageHeader)
class LocalTrainingPageHeaderAdmin(admin.ModelAdmin):
    form = LocalTrainingPageHeaderAdminForm
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
        return not LocalTrainingPageHeader.objects.exists()


@admin.register(LocalTrainingProgramme)
class LocalTrainingProgrammeAdmin(admin.ModelAdmin):
    form = LocalTrainingProgrammeAdminForm
    list_display = [
        "order",
        "year",
        "title_en",
        "provider_en",
        "category",
        "status",
        "featured",
        "is_active",
    ]
    list_display_links = ["title_en"]
    list_editable = ["order", "status", "featured", "is_active"]
    list_filter = ["year", "category", "status", "featured", "is_active"]
    search_fields = [
        "title_en",
        "title_si",
        "title_ta",
        "provider_en",
        "provider_si",
        "provider_ta",
        "slug",
    ]
    prepopulated_fields = {"slug": ("title_en",)}

    fieldsets = (
        ("Course Classification & Status", {
            "fields": (
                ("order", "slug"),
                ("year", "category", "status"),
                ("featured", "is_active"),
            ),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
                ("provider_en", "category_label_en"),
                "description_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                ("provider_si", "category_label_si"),
                "description_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                ("provider_ta", "category_label_ta"),
                "description_ta",
            ),
        }),
        ("📅 Important Dates", {
            "fields": (("published_date", "application_deadline"),),
        }),
        ("🖼️ Course Banner Image", {
            "fields": (("image", "image_fallback"),),
        }),
        ("📄 Document & Downloads", {
            "fields": (
                ("document_file", "file_url"),
                ("file_type", "file_size"),
            ),
        }),
    )
