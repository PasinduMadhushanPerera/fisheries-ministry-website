from rest_framework import serializers
from .models import (
    ForeignTrainingPageHeader,
    ForeignTrainingCategory,
    ForeignTrainingProgramme,
)


def resolve_lang(obj, field_base: str, context: dict) -> str:
    if not obj:
        return ""
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class ForeignTrainingPageHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    featured_badge = serializers.SerializerMethodField()
    catalogue_badge = serializers.SerializerMethodField()
    library_title = serializers.SerializerMethodField()

    class Meta:
        model = ForeignTrainingPageHeader
        fields = [
            "badge_text",
            "title",
            "description",
            "featured_badge",
            "catalogue_badge",
            "library_title",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_featured_badge(self, obj): return resolve_lang(obj, "featured_badge", self.context)
    def get_catalogue_badge(self, obj): return resolve_lang(obj, "catalogue_badge", self.context)
    def get_library_title(self, obj): return resolve_lang(obj, "library_title", self.context)


class ForeignTrainingCategorySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="category_id")
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = ForeignTrainingCategory
        fields = ["id", "title", "description", "icon_type", "order"]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)


class ForeignTrainingProgrammeSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    subheading = serializers.SerializerMethodField()
    country = serializers.SerializerMethodField()
    institution = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    category_label = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = ForeignTrainingProgramme
        fields = [
            "id",
            "slug",
            "order",
            "year",
            "country",
            "category",
            "category_label",
            "subheading",
            "status",
            "featured",
            "title",
            "institution",
            "description",
            "published_date",
            "application_deadline",
            "image_url",
            "download_url",
            "file_type",
            "file_size",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_subheading(self, obj): return resolve_lang(obj, "subheading", self.context)
    def get_country(self, obj): return resolve_lang(obj, "country", self.context)
    def get_institution(self, obj): return resolve_lang(obj, "institution", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)

    def get_category(self, obj):
        if obj.category:
            return obj.category.category_id
        return "other"

    def get_category_label(self, obj):
        if obj.category:
            cat_title = resolve_lang(obj.category, "title", self.context)
            if cat_title:
                return cat_title

        lang = self.context.get("lang", "en")
        if lang in ["si", "ta"]:
            val = getattr(obj, f"category_label_{lang}", None)
            if val and str(val).strip():
                return str(val).strip()

        val_en = getattr(obj, "category_label_en", None)
        if val_en and str(val_en).strip():
            return str(val_en).strip()

        return "Overseas Fellowships"

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_fallback or "/images/services/foreign-training.jpg"

    def get_download_url(self, obj):
        request = self.context.get("request")
        lang = self.context.get("lang", "en")

        doc_file = None
        if lang == "si" and obj.document_file_si:
            doc_file = obj.document_file_si
        elif lang == "ta" and obj.document_file_ta:
            doc_file = obj.document_file_ta
        elif obj.document_file_en:
            doc_file = obj.document_file_en
        elif obj.document_file:
            doc_file = obj.document_file
        elif obj.document_file_si:
            doc_file = obj.document_file_si
        elif obj.document_file_ta:
            doc_file = obj.document_file_ta

        if doc_file:
            return request.build_absolute_uri(doc_file.url) if request else doc_file.url

        return obj.file_url or "#"
