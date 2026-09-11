from django import forms
from django.contrib import admin
from .models import EventPageHeader, EventItem


class EventPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = EventPageHeader
        fields = "__all__"


class EventItemAdminForm(forms.ModelForm):
    class Meta:
        model = EventItem
        fields = "__all__"
        widgets = {
            "summary_en": forms.Textarea(attrs={"rows": 3}),
            "summary_si": forms.Textarea(attrs={"rows": 3}),
            "summary_ta": forms.Textarea(attrs={"rows": 3}),
            "description_en": forms.Textarea(attrs={"rows": 5}),
            "description_si": forms.Textarea(attrs={"rows": 5}),
            "description_ta": forms.Textarea(attrs={"rows": 5}),
        }


@admin.register(EventPageHeader)
class EventPageHeaderAdmin(admin.ModelAdmin):
    form = EventPageHeaderAdminForm
    list_display = ["library_title_en", "catalogue_badge_en", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Section Titles & Badges", {
            "fields": (
                "badge_text_en",
                ("title_en", "highlighted_title_en"),
                "description_en",
                ("catalogue_badge_en", "library_title_en"),
            ),
        }),
        ("🇱🇰 Sinhala Section Titles & Badges (සිංහල)", {
            "fields": (
                "badge_text_si",
                ("title_si", "highlighted_title_si"),
                "description_si",
                ("catalogue_badge_si", "library_title_si"),
            ),
        }),
        ("🇱🇰 Tamil Section Titles & Badges (தமிழ்)", {
            "fields": (
                "badge_text_ta",
                ("title_ta", "highlighted_title_ta"),
                "description_ta",
                ("catalogue_badge_ta", "library_title_ta"),
            ),
        }),
    )

    def has_add_permission(self, request):
        return not EventPageHeader.objects.exists()


@admin.register(EventItem)
class EventItemAdmin(admin.ModelAdmin):
    form = EventItemAdminForm
    list_display = [
        "reference_number",
        "title_en",
        "category",
        "status",
        "location_en",
        "display_date",
        "is_featured",
        "is_active",
        "updated_at",
    ]
    list_display_links = ["title_en"]
    list_editable = ["category", "status", "is_featured", "is_active"]
    list_filter = ["category", "status", "is_featured", "is_active"]
    search_fields = [
        "reference_number",
        "title_en",
        "title_si",
        "title_ta",
        "summary_en",
        "venue_en",
        "location_en",
        "organizer_en",
        "slug",
    ]
    prepopulated_fields = {"slug": ("title_en",)}

    fieldsets = (
        ("🏷️ Event Classification & Status", {
            "fields": (
                ("reference_number", "order"),
                ("category", "status"),
                ("is_featured", "is_active"),
                "slug",
            ),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
                "summary_en",
                "description_en",
                ("venue_en", "location_en"),
                "organizer_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                "summary_si",
                "description_si",
                ("venue_si", "location_si"),
                "organizer_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                "summary_ta",
                "description_ta",
                ("venue_ta", "location_ta"),
                "organizer_ta",
            ),
        }),
        ("📅 Date, Time & Contact Details", {
            "fields": (
                ("date", "display_date"),
                "time",
                ("contact_email", "contact_phone"),
            ),
        }),
        ("⏱️ Program Schedule & Timings (JSON Agenda)", {
            "fields": ("agenda",),
            "description": "JSON array of agenda sessions, e.g. [{\"time\": \"09:00 AM\", \"topic\": \"Registration & Welcome\"}, {\"time\": \"09:30 AM\", \"topic\": \"Keynote Address\"}]",
        }),
        ("🖼️ Cover Photo & Banner (Optional)", {
            "fields": (
                "image",
                ("image_url_fallback", "image_alt"),
            ),
        }),
    )
