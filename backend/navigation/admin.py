from django.contrib import admin
from .models import MenuItem


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "parent",
        "url",
        "order",
        "badge",
        "is_external",
        "is_active",
    ]
    list_filter = ["parent", "is_active", "is_external"]
    search_fields = ["title", "url", "description"]
    list_editable = ["order", "is_active"]
    ordering = ["order", "id"]

    fieldsets = (
        ("Navigation Tab Details", {
            "fields": ("title", "url", "parent", "order", "is_active"),
            "description": "Specify the menu title and URL. Leave 'Parent' empty for main navbar tabs, or select a parent tab to create a dropdown sub-menu item.",
        }),
        ("Display & Badges", {
            "fields": ("description", "badge", "is_external"),
            "description": "Optional descriptions and badges (e.g. 'New' or 'Portal') shown on the menu.",
        }),
    )
