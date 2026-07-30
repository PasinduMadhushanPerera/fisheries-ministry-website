from django.contrib import admin

from .models import (
    News,
    NewsAttachment,
    NewsCategory,
    NewsTranslation,
)


class NewsTranslationInline(admin.StackedInline):
    model = NewsTranslation
    extra = 1
    fields = [
        "language",
        "title",
        "slug",
        "summary",
        "content",
        "image_alt_text",
        "seo_title",
        "seo_description",
    ]


class NewsAttachmentInline(admin.TabularInline):
    model = NewsAttachment
    extra = 0
    fields = [
        "title",
        "file",
        "is_public",
        "sort_order",
        "uploaded_by",
    ]


@admin.register(NewsCategory)
class NewsCategoryAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "slug",
        "is_active",
        "created_at",
    ]

    list_filter = [
        "is_active",
    ]

    search_fields = [
        "name",
        "slug",
        "description",
    ]

    prepopulated_fields = {
        "slug": ("name",),
    }


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "display_title",
        "category",
        "status",
        "priority",
        "is_featured",
        "published_at",
        "expires_at",
    ]

    list_filter = [
        "status",
        "priority",
        "is_featured",
        "category",
        "published_at",
    ]

    search_fields = [
        "translations__title",
        "translations__summary",
        "category__name",
    ]

    autocomplete_fields = [
        "category",
        "created_by",
        "updated_by",
    ]

    date_hierarchy = "published_at"

    inlines = [
        NewsTranslationInline,
        NewsAttachmentInline,
    ]

    fieldsets = [
        (
            "Classification",
            {
                "fields": [
                    "category",
                    "status",
                    "priority",
                    "is_featured",
                ]
            },
        ),
        (
            "News image",
            {
                "fields": [
                    "hero_image",
                ]
            },
        ),
        (
            "Publication",
            {
                "fields": [
                    "published_at",
                    "expires_at",
                ]
            },
        ),
        (
            "Administration",
            {
                "fields": [
                    "created_by",
                    "updated_by",
                ]
            },
        ),
    ]

    def display_title(self, obj):
        translation = obj.translations.filter(
            language="en",
        ).first()

        return (
            translation.title
            if translation
            else f"News #{obj.pk}"
        )

    display_title.short_description = "Title"