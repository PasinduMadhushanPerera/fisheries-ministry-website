from django.contrib import admin
from django.db import models
from common.widgets import RichTextAdminWidget
from .models import DynamicPage


@admin.register(DynamicPage)
class DynamicPageAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "slug",
        "badge_text",
        "is_published",
        "display_order",
        "updated_at",
    ]
    list_filter = ["is_published", "created_at"]
    search_fields = ["title", "slug", "content", "hero_subtitle"]
    list_editable = ["is_published", "display_order"]
    prepopulated_fields = {"slug": ("title",)}

    formfield_overrides = {
        models.TextField: {"widget": RichTextAdminWidget},
    }

    fieldsets = (
        ("Basic Page Information", {
            "fields": ("title", "slug", "badge_text", "display_order", "is_published"),
            "description": "Enter the primary page title and URL slug.",
        }),
        ("Hero Banner Header", {
            "fields": ("hero_title", "hero_subtitle", "banner_image"),
            "description": "Customize the header section displayed at the top of the page.",
        }),
        ("Page Content (Rich Text)", {
            "fields": ("content",),
            "description": "Use the visual editor below to format headings, bullet lists, tables, links, and media.",
        }),
        ("Optional Sidebar / Contact Card", {
            "classes": ("collapse",),
            "fields": ("show_sidebar", "sidebar_title", "sidebar_content"),
            "description": "Display a right-side contact/inquiry box alongside the page content.",
        }),
        ("Search Engine Optimization (SEO)", {
            "classes": ("collapse",),
            "fields": ("meta_title", "meta_description"),
        }),
    )
