from django import forms
from django.contrib import admin
from .models import DivisionsPageIntro, MinistryDivision


class DivisionsPageIntroAdminForm(forms.ModelForm):
    class Meta:
        model = DivisionsPageIntro
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class MinistryDivisionAdminForm(forms.ModelForm):
    class Meta:
        model = MinistryDivision
        fields = "__all__"
        widgets = {
            "short_description_en": forms.Textarea(attrs={"rows": 2}),
            "short_description_si": forms.Textarea(attrs={"rows": 2}),
            "short_description_ta": forms.Textarea(attrs={"rows": 2}),
            "full_description_en": forms.Textarea(attrs={"rows": 5}),
            "full_description_si": forms.Textarea(attrs={"rows": 5}),
            "full_description_ta": forms.Textarea(attrs={"rows": 5}),
            "bullet_points_en": forms.Textarea(attrs={"rows": 5}),
            "bullet_points_si": forms.Textarea(attrs={"rows": 5}),
            "bullet_points_ta": forms.Textarea(attrs={"rows": 5}),
        }


@admin.register(DivisionsPageIntro)
class DivisionsPageIntroAdmin(admin.ModelAdmin):
    form = DivisionsPageIntroAdminForm
    list_display = ["title_en", "title_si", "title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("badge_text_en", "title_en", "description_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("badge_text_si", "title_si", "description_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("badge_text_ta", "title_ta", "description_ta"),
        }),
    )

    def has_add_permission(self, request):
        return not DivisionsPageIntro.objects.exists()


@admin.register(MinistryDivision)
class MinistryDivisionAdmin(admin.ModelAdmin):
    form = MinistryDivisionAdminForm
    list_display = ["order", "slug", "title_en", "title_si", "title_ta", "icon_name", "is_active"]
    list_display_links = ["title_en"]
    list_editable = ["order", "is_active"]
    search_fields = ["title_en", "title_si", "title_ta", "slug"]
    fieldsets = (
        ("Division Identity", {
            "fields": ("order", "slug", "icon_name", "is_active"),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
                "short_description_en",
                "full_description_en",
                "bullet_points_en",
                "head_of_division_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                "short_description_si",
                "full_description_si",
                "bullet_points_si",
                "head_of_division_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                "short_description_ta",
                "full_description_ta",
                "bullet_points_ta",
                "head_of_division_ta",
            ),
        }),
        ("⚙️ Division Direct Contacts", {
            "fields": (("contact_email", "contact_phone"),),
        }),
    )
