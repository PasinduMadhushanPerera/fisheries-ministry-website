from django import forms
from django.contrib import admin
from .models import SecretaryProfile, SecretaryMessage, SecretarySecretariat


class SecretaryMessageAdminForm(forms.ModelForm):
    class Meta:
        model = SecretaryMessage
        fields = "__all__"
        widgets = {
            "message_content_en": forms.Textarea(attrs={"rows": 5}),
            "message_content_si": forms.Textarea(attrs={"rows": 5}),
            "message_content_ta": forms.Textarea(attrs={"rows": 5}),
        }


@admin.register(SecretaryProfile)
class SecretaryProfileAdmin(admin.ModelAdmin):
    list_display = ["name_en", "name_si", "name_ta", "role_title_en", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("badge_en", "name_en", "role_title_en", "ministry_badge_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("badge_si", "name_si", "role_title_si", "ministry_badge_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("badge_ta", "name_ta", "role_title_ta", "ministry_badge_ta"),
        }),
        ("⚙️ Official Portrait Photo", {
            "fields": (("photo", "photo_fallback"), "photo_alt"),
        }),
    )

    def has_add_permission(self, request):
        return not SecretaryProfile.objects.exists()


@admin.register(SecretaryMessage)
class SecretaryMessageAdmin(admin.ModelAdmin):
    form = SecretaryMessageAdminForm
    list_display = ["message_title_en", "message_title_si", "message_title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("eyebrow_en", "message_title_en", "message_content_en", ("quote_author_en", "quote_designation_en")),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("eyebrow_si", "message_title_si", "message_content_si", ("quote_author_si", "quote_designation_si")),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("eyebrow_ta", "message_title_ta", "message_content_ta", ("quote_author_ta", "quote_designation_ta")),
        }),
    )

    def has_add_permission(self, request):
        return not SecretaryMessage.objects.exists()


@admin.register(SecretarySecretariat)
class SecretarySecretariatAdmin(admin.ModelAdmin):
    list_display = ["box_title_en", "box_title_si", "box_title_ta", "office_phone", "office_email", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("box_title_en", "box_subtitle_en", "office_address_en", "cta_contact_button_text_en", "secondary_link_text_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("box_title_si", "box_subtitle_si", "office_address_si", "cta_contact_button_text_si", "secondary_link_text_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("box_title_ta", "box_subtitle_ta", "office_address_ta", "cta_contact_button_text_ta", "secondary_link_text_ta"),
        }),
        ("⚙️ Contact Desk & Link Settings", {
            "fields": (
                ("office_phone", "office_email", "office_hours"),
                ("cta_contact_button_url", "secondary_link_url"),
            ),
        }),
    )

    def has_add_permission(self, request):
        return not SecretarySecretariat.objects.exists()
