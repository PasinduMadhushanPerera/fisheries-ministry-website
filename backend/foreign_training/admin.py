from django import forms
from django.contrib import admin
from .models import (
    ForeignTrainingPageHeader,
    ForeignTrainingCategory,
    ForeignTrainingProgramme,
)


class ForeignTrainingPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = ForeignTrainingPageHeader
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class ForeignTrainingCategoryAdminForm(forms.ModelForm):
    class Meta:
        model = ForeignTrainingCategory
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


@admin.register(ForeignTrainingCategory)
class ForeignTrainingCategoryAdmin(admin.ModelAdmin):
    form = ForeignTrainingCategoryAdminForm
    list_display = ["order", "title_en", "category_id", "icon_type", "is_active"]
    list_display_links = ["title_en"]
    list_editable = ["order", "icon_type", "is_active"]
    search_fields = ["title_en", "title_si", "title_ta", "category_id"]
    prepopulated_fields = {"category_id": ("title_en",)}

    fieldsets = (
        ("Category Classification", {
            "fields": (("order", "category_id"), ("icon_type", "is_active")),
        }),
        ("🇬🇧 English Title & Description", {
            "fields": ("title_en", "description_en"),
        }),
        ("🇱🇰 Sinhala Title & Description (සිංහල)", {
            "fields": ("title_si", "description_si"),
        }),
        ("🇱🇰 Tamil Title & Description (தமிழ்)", {
            "fields": ("title_ta", "description_ta"),
        }),
    )


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
    list_filter = ["category", "year", "country_en", "status", "featured", "is_active"]
    search_fields = [
        "title_en",
        "title_si",
        "title_ta",
        "subheading_en",
        "subheading_si",
        "subheading_ta",
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
                ("category", "order", "slug"),
                ("year", "status"),
                ("featured", "is_active"),
            ),
        }),
        ("🏷️ Topic / Sub-heading Grouping (Multilingual)", {
            "fields": (
                "subheading_en",
                "subheading_si",
                "subheading_ta",
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
        ("📄 Document & Downloads (Multilingual Uploads)", {
            "fields": (
                "document_file_en",
                "document_file_si",
                "document_file_ta",
                "document_file",
                "file_url",
                ("file_type", "file_size"),
            ),
        }),
    )
