from rest_framework import serializers
from .models import EventPageHeader, EventItem, CATEGORY_LABELS_MAP


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class EventPageHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    highlighted_title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    catalogue_badge = serializers.SerializerMethodField()
    library_title = serializers.SerializerMethodField()

    class Meta:
        model = EventPageHeader
        fields = [
            "badge_text",
            "title",
            "highlighted_title",
            "description",
            "catalogue_badge",
            "library_title",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_highlighted_title(self, obj): return resolve_lang(obj, "highlighted_title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_catalogue_badge(self, obj): return resolve_lang(obj, "catalogue_badge", self.context)
    def get_library_title(self, obj): return resolve_lang(obj, "library_title", self.context)


class EventItemSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    description_paragraphs = serializers.SerializerMethodField()
    venue = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    organizer = serializers.SerializerMethodField()
    category_label = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = EventItem
        fields = [
            "id",
            "slug",
            "order",
            "reference_number",
            "category",
            "category_label",
            "status",
            "is_featured",
            "title",
            "summary",
            "description",
            "description_paragraphs",
            "venue",
            "location",
            "organizer",
            "date",
            "display_date",
            "time",
            "contact_email",
            "contact_phone",
            "agenda",
            "image_url",
            "image_alt",
            "created_at",
            "updated_at",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_summary(self, obj): return resolve_lang(obj, "summary", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_venue(self, obj): return resolve_lang(obj, "venue", self.context)
    def get_location(self, obj): return resolve_lang(obj, "location", self.context)
    def get_organizer(self, obj): return resolve_lang(obj, "organizer", self.context)

    def get_description_paragraphs(self, obj):
        desc = resolve_lang(obj, "description", self.context)
        if not desc:
            return []
        paragraphs = [p.strip() for p in desc.split("\n\n") if p.strip()]
        if not paragraphs:
            paragraphs = [p.strip() for p in desc.split("\n") if p.strip()]
        return paragraphs if paragraphs else [desc]

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

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url_fallback or "/images/home/hero-fishing-harbour.jpg"
