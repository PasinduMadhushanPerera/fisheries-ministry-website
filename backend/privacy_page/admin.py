from django.contrib import admin
from .models import PrivacyPageSettings, PrivacySection


@admin.register(PrivacyPageSettings)
class PrivacyPageSettingsAdmin(admin.ModelAdmin):
    list_display = (
        "__str__",
        "desk_email",
        "desk_phone",
        "last_updated_date",
        "updated_at",
    )
    fieldsets = (
        (
            "Page Hero Header & Badges (English)",
            {
                "fields": (
                    "badge_text_en",
                    ("hero_title_en", "hero_highlight_en"),
                    "hero_description_en",
                    ("pill_text1_en", "pill_text2_en"),
                )
            },
        ),
        (
            "Page Hero Header & Badges (සිංහල)",
            {
                "classes": ("collapse",),
                "fields": (
                    "badge_text_si",
                    ("hero_title_si", "hero_highlight_si"),
                    "hero_description_si",
                    ("pill_text1_si", "pill_text2_si"),
                ),
            },
        ),
        (
            "Page Hero Header & Badges (தமிழ்)",
            {
                "classes": ("collapse",),
                "fields": (
                    "badge_text_ta",
                    ("hero_title_ta", "hero_highlight_ta"),
                    "hero_description_ta",
                    ("pill_text1_ta", "pill_text2_ta"),
                ),
            },
        ),
        (
            "Hero Right Highlight Card",
            {
                "fields": (
                    ("card_eyebrow_en", "card_eyebrow_si", "card_eyebrow_ta"),
                    ("card_title_en", "card_title_si", "card_title_ta"),
                    "card_description_en",
                    "card_description_si",
                    "card_description_ta",
                ),
                "description": "The green card shown on the right side of the hero section.",
            },
        ),
        (
            "Callout Banner (About this Policy)",
            {
                "fields": (
                    ("callout_title_en", "callout_title_si", "callout_title_ta"),
                    "callout_text_en",
                    "callout_text_si",
                    "callout_text_ta",
                ),
                "description": "The green informational banner displayed at the top of the privacy policy content.",
            },
        ),
        (
            "Privacy Assistance & Contact Desk",
            {
                "fields": (
                    ("desk_badge_en", "desk_badge_si", "desk_badge_ta"),
                    ("desk_title_en", "desk_title_si", "desk_title_ta"),
                    "desk_description_en",
                    "desk_description_si",
                    "desk_description_ta",
                    ("desk_office_name_en", "desk_office_name_si", "desk_office_name_ta"),
                    ("desk_email", "desk_phone"),
                    ("contact_btn_text_en", "contact_btn_text_si", "contact_btn_text_ta"),
                ),
                "description": "Details for contacting the Ministry Privacy & Data Protection Desk.",
            },
        ),
        (
            "Policy Version / Date",
            {
                "fields": ("last_updated_date",),
                "description": "e.g. October 2026",
            },
        ),
    )

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(PrivacySection)
class PrivacySectionAdmin(admin.ModelAdmin):
    list_display = (
        "section_key",
        "order",
        "title_en",
        "title_si",
        "is_active",
        "updated_at",
    )
    list_editable = ("order", "is_active")
    search_fields = (
        "section_key",
        "title_en",
        "title_si",
        "title_ta",
        "content_en",
        "content_si",
        "content_ta",
    )
    list_filter = ("is_active",)
    fieldsets = (
        (
            "Section Identity & Order",
            {
                "fields": (
                    ("section_key", "order", "is_active"),
                ),
                "description": "The 'Section Key' matches the anchor ID on the page (e.g. 'overview', 'information', 'usage', 'security', 'cookies', 'rights', 'contact').",
            },
        ),
        (
            "English Content",
            {
                "fields": (
                    ("nav_label_en", "title_en"),
                    "content_en",
                    "items_json_en",
                ),
                "description": "Enter the English text. 'Items' can be a JSON array of cards or bullet points: [{'title': '...', 'description': '...'}] or ['point 1', 'point 2'].",
            },
        ),
        (
            "සිංහල අන්තර්ගතය (Sinhala Content)",
            {
                "classes": ("collapse",),
                "fields": (
                    ("nav_label_si", "title_si"),
                    "content_si",
                    "items_json_si",
                ),
            },
        ),
        (
            "தமிழ் உள்ளடக்கம் (Tamil Content)",
            {
                "classes": ("collapse",),
                "fields": (
                    ("nav_label_ta", "title_ta"),
                    "content_ta",
                    "items_json_ta",
                ),
            },
        ),
    )
