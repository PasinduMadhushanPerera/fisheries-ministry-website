from django import forms
from django.contrib import admin
from .models import VideoPageHeader, VideoItem


class VideoPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = VideoPageHeader
        fields = "__all__"


class VideoItemAdminForm(forms.ModelForm):
    class Meta:
        model = VideoItem
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


@admin.register(VideoPageHeader)
class VideoPageHeaderAdmin(admin.ModelAdmin):
    form = VideoPageHeaderAdminForm
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
        return not VideoPageHeader.objects.exists()


@admin.register(VideoItem)
class VideoItemAdmin(admin.ModelAdmin):
    form = VideoItemAdminForm
    list_display = [
        "title_en",
        "category",
        "duration",
        "has_video_file_display",
        "location_en",
        "display_date",
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
        ("🏷️ Video Classification", {
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
        ("🎥 Video Upload or YouTube / External Stream", {
            "description": "Upload a direct video file (MP4/WebM) OR paste a YouTube video URL.",
            "fields": (
                "video_file",
                ("video_url", "youtube_id"),
                "duration",
                ("published_date", "display_date"),
            ),
        }),
        ("🖼️ Video Cover Thumbnail", {
            "fields": (
                "thumbnail",
                ("thumbnail_url_fallback", "thumbnail_alt"),
            ),
        }),
    )

    def has_video_file_display(self, obj):
        if obj.video_file:
            return "📁 Uploaded File"
        if obj.youtube_id or obj.video_url:
            return "▶️ YouTube / Link"
        return "—"
    has_video_file_display.short_description = "Source"

    def save_model(self, request, obj, form, change):
        if obj.is_featured:
            VideoItem.objects.filter(is_featured=True).exclude(pk=obj.pk).update(is_featured=False)
        super().save_model(request, obj, form, change)
