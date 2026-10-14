from django.contrib import admin
from .models import MenuItem


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "title_si",
        "title_ta",
        "parent",
        "url",
        "order",
        "badge",
        "is_active",
    ]
    list_filter = ["parent", "is_active", "is_external"]
    search_fields = ["title", "title_si", "title_ta", "url", "description"]
    list_editable = ["order", "is_active"]
    ordering = ["order", "id"]

    fieldsets = (
        ("Navigation Titles (භාෂා 3න්ම නම්)", {
            "fields": ("title", "title_si", "title_ta"),
            "description": "Enter the navigation item label in English, Sinhala (සිංහල), and Tamil (தமிழ்).",
        }),
        ("Route & Hierarchy (ස්ථානය සහ සබැඳිය)", {
            "fields": ("url", "parent", "order", "is_active"),
            "description": "Specify the target route/URL and parent tab. Leave 'Parent' empty for main top-level navbar tabs.",
        }),
        ("Optional Descriptions & Badges", {
            "fields": ("description", "description_si", "description_ta", "badge", "is_external"),
            "classes": ("collapse",),
            "description": "Optional subtitles/descriptions in 3 languages and badges (e.g. 'New' or 'Portal') shown on the menu.",
        }),
    )
