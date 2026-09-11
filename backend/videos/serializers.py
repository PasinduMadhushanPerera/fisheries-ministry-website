from rest_framework import serializers
from .models import VideoPageHeader, VideoItem, CATEGORY_LABELS_MAP


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class VideoPageHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    highlighted_title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    featured_badge = serializers.SerializerMethodField()
    catalogue_badge = serializers.SerializerMethodField()
    library_title = serializers.SerializerMethodField()

    class Meta:
        model = VideoPageHeader
        fields = [
            "badge_text",
            "title",
            "highlighted_title",
            "description",
            "featured_badge",
            "catalogue_badge",
            "library_title",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_highlighted_title(self, obj): return resolve_lang(obj, "highlighted_title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_featured_badge(self, obj): return resolve_lang(obj, "featured_badge", self.context)
    def get_catalogue_badge(self, obj): return resolve_lang(obj, "catalogue_badge", self.context)
    def get_library_title(self, obj): return resolve_lang(obj, "library_title", self.context)


class VideoItemSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    category_label = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    video_file_url = serializers.SerializerMethodField()
    is_direct_upload = serializers.SerializerMethodField()

    class Meta:
        model = VideoItem
        fields = [
            "id",
            "slug",
            "order",
            "category",
            "category_label",
            "is_featured",
            "title",
            "description",
            "location",
            "duration",
            "published_date",
            "display_date",
            "video_file_url",
            "is_direct_upload",
            "video_url",
            "youtube_id",
            "thumbnail_url",
            "thumbnail_alt",
            "created_at",
            "updated_at",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_location(self, obj): return resolve_lang(obj, "location", self.context)

    def get_category_label(self, obj):
        custom = resolve_lang(obj, "category_label", self.context)
        if custom:
            return custom
        lang = self.context.get("lang", "en")
        cat_tuple = CATEGORY_LABELS_MAP.get(obj.category)
        if cat_tuple:
            if lang == "si": return cat_tuple[1]
            if lang == "ta": return cat_tuple[2]
            return cat_tuple[0]
        return obj.get_category_display()

    def get_thumbnail_url(self, obj):
        if obj.thumbnail:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url
        return obj.thumbnail_url_fallback or "/images/home/hero-fishing-harbour.jpg"

    def get_video_file_url(self, obj):
        if obj.video_file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.video_file.url) if request else obj.video_file.url
        return None

    def get_is_direct_upload(self, obj):
        return bool(obj.video_file)
