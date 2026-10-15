from rest_framework import serializers
from .models import (
    FisheryInformationHeader,
    FisheryInformationCategory,
    FisheryInformationItem,
)


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class FisheryInformationHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = FisheryInformationHeader
        fields = [
            "badge_text",
            "title",
            "description",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)


class FisheryInformationCategorySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="category_id")
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    badgeSingular = serializers.SerializerMethodField()
    badgePlural = serializers.SerializerMethodField()

    class Meta:
        model = FisheryInformationCategory
        fields = [
            "id",
            "title",
            "description",
            "icon_type",
            "badgeSingular",
            "badgePlural",
            "order",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)

    def get_badgeSingular(self, obj):
        val = resolve_lang(obj, "badge_singular", self.context)
        if not val or not val.strip():
            lang = self.context.get("lang", "en")
            if lang == "si": return "ගොනුව"
            if lang == "ta": return "கோப்பு"
            return "file"
        return val

    def get_badgePlural(self, obj):
        val = resolve_lang(obj, "badge_plural", self.context)
        if not val or not val.strip():
            lang = self.context.get("lang", "en")
            if lang == "si": return "ගොනු"
            if lang == "ta": return "கோப்புகள்"
            return "files"
        return val


class FisheryInformationItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="item_id")
    category = serializers.CharField(source="category.category_id")
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    publishedDate = serializers.SerializerMethodField()
    fileType = serializers.CharField(source="file_type")
    fileSize = serializers.CharField(source="file_size")
    fileUrl = serializers.SerializerMethodField()
    downloadUrl = serializers.SerializerMethodField()
    featured = serializers.BooleanField(source="is_featured")

    class Meta:
        model = FisheryInformationItem
        fields = [
            "id",
            "category",
            "title",
            "description",
            "location",
            "year",
            "fileType",
            "fileSize",
            "fileUrl",
            "downloadUrl",
            "publishedDate",
            "featured",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_location(self, obj): return resolve_lang(obj, "location", self.context)

    def get_publishedDate(self, obj):
        return obj.display_date or (obj.published_date.strftime("%d %B %Y") if obj.published_date else "")

    def get_fileUrl(self, obj):
        request = self.context.get("request")
        if obj.document_file:
            if request:
                return request.build_absolute_uri(obj.document_file.url)
            return obj.document_file.url
        return obj.file_url_fallback or "#"

    def get_downloadUrl(self, obj):
        return self.get_fileUrl(obj)
