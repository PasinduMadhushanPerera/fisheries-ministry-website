from rest_framework import serializers
from .models import GalleryPageHeader, GalleryAlbum, GalleryImage, CATEGORY_LABELS_MAP


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class GalleryPageHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    highlighted_title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    featured_badge = serializers.SerializerMethodField()
    catalogue_badge = serializers.SerializerMethodField()
    library_title = serializers.SerializerMethodField()

    class Meta:
        model = GalleryPageHeader
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


class GalleryImageSerializer(serializers.ModelSerializer):
    caption = serializers.SerializerMethodField()
    src = serializers.SerializerMethodField()
    alt = serializers.CharField(source="alt_text")

    class Meta:
        model = GalleryImage
        fields = [
            "id",
            "order",
            "src",
            "alt",
            "caption",
        ]

    def get_caption(self, obj):
        return resolve_lang(obj, "caption", self.context)

    def get_src(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url_fallback or "/images/home/hero-fishing-harbour.jpg"


class GalleryAlbumSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    category_label = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    image_count = serializers.SerializerMethodField()

    class Meta:
        model = GalleryAlbum
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
            "event_date",
            "display_date",
            "cover_image_url",
            "cover_image_alt",
            "image_count",
            "images",
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

    def get_cover_image_url(self, obj):
        if obj.cover_image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.cover_image.url) if request else obj.cover_image.url
        return obj.cover_image_url_fallback or "/images/home/hero-fishing-harbour.jpg"

    def get_image_count(self, obj):
        return obj.images.count()

    def get_images(self, obj):
        images_queryset = obj.images.all().order_by("order", "id")
        return GalleryImageSerializer(images_queryset, many=True, context=self.context).data
