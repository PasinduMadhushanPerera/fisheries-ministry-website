from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import GalleryPageHeader, GalleryAlbum, GalleryImage


class GalleryPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = GalleryPageHeader
        fields = "__all__"


class GalleryAlbumAdminForm(forms.ModelForm):
    class Meta:
        model = GalleryAlbum
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class GalleryImageInline(admin.StackedInline):
    model = GalleryImage
    extra = 1
    fields = (
        ("order", "image", "image_url_fallback"),
        "alt_text",
        ("caption_en", "caption_si", "caption_ta"),
    )


@admin.register(GalleryPageHeader)
class GalleryPageHeaderAdmin(admin.ModelAdmin):
    form = GalleryPageHeaderAdminForm
    list_display = ["library_title_en", "catalogue_badge_en", "featured_badge_en", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Section Titles & Badges", {
            "fields": (
                "badge_text_en",
                ("title_en", "highlighted_title_en"),
                "description_en",
                ("featured_badge_en", "catalogue_badge_en"),
                "library_title_en",
            ),
        }),
        ("🇱🇰 Sinhala Section Titles & Badges (සිංහල)", {
            "fields": (
                "badge_text_si",
                ("title_si", "highlighted_title_si"),
                "description_si",
                ("featured_badge_si", "catalogue_badge_si"),
                "library_title_si",
            ),
        }),
        ("🇱🇰 Tamil Section Titles & Badges (தமிழ்)", {
            "fields": (
                "badge_text_ta",
                ("title_ta", "highlighted_title_ta"),
                "description_ta",
                ("featured_badge_ta", "catalogue_badge_ta"),
                "library_title_ta",
            ),
        }),
    )

    def has_add_permission(self, request):
        return not GalleryPageHeader.objects.exists()


@admin.register(GalleryAlbum)
class GalleryAlbumAdmin(admin.ModelAdmin):
    form = GalleryAlbumAdminForm
    inlines = [GalleryImageInline]
    list_display = [
        "title_en",
        "category",
        "location_en",
        "display_date",
        "image_count_display",
        "is_featured",
        "is_active",
        "updated_at",
    ]
    list_display_links = ["title_en"]
    list_editable = ["category", "is_featured", "is_active"]
    list_filter = ["category", "is_featured", "is_active"]
    search_fields = [
        "title_en",
        "title_si",
        "title_ta",
        "description_en",
        "location_en",
        "slug",
    ]
    prepopulated_fields = {"slug": ("title_en",)}

    fieldsets = (
        ("🏷️ Photo Album Classification", {
            "fields": (
                ("order", "category"),
                ("is_featured", "is_active"),
                "slug",
            ),
        }),
        ("🇬🇧 English Details", {
            "fields": (
                "title_en",
                "description_en",
                "location_en",
            ),
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "fields": (
                "title_si",
                "description_si",
                "location_si",
            ),
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "fields": (
                "title_ta",
                "description_ta",
                "location_ta",
            ),
        }),
        ("📅 Event / Photo Date", {
            "fields": (
                ("event_date", "display_date"),
            ),
        }),
        ("🖼️ Cover Photo", {
            "fields": (
                "cover_image",
                ("cover_image_url_fallback", "cover_image_alt"),
            ),
        }),
    )

    def image_count_display(self, obj):
        count = obj.images.count()
        return format_html(
            '<span style="font-weight: bold; color: #256B29; background: #e8f5e9; padding: 2px 8px; border-radius: 6px;">{} Photos</span>',
            count,
        )
    image_count_display.short_description = "Photos"

    def save_model(self, request, obj, form, change):
        if obj.is_featured:
            GalleryAlbum.objects.filter(is_featured=True).exclude(pk=obj.pk).update(is_featured=False)
        super().save_model(request, obj, form, change)


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ["album", "order", "caption_en", "alt_text", "updated_at"]
    list_filter = ["album"]
    search_fields = ["caption_en", "caption_si", "caption_ta", "alt_text", "album__title_en"]
