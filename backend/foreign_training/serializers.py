from rest_framework import serializers
from .models import ForeignTrainingPageHeader, ForeignTrainingProgramme


def resolve_lang(obj, field_base: str, context: dict) -> str:
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


class ForeignTrainingProgrammeSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    country = serializers.SerializerMethodField()
    institution = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
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
    def get_country(self, obj): return resolve_lang(obj, "country", self.context)
    def get_institution(self, obj): return resolve_lang(obj, "institution", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_category_label(self, obj):
        display_name = obj.get_category_display()
        clean_display = display_name.split(" ", 1)[1] if (" " in display_name and not display_name[0].isalnum()) else display_name

        lang = self.context.get("lang", "en")
        if lang in ["si", "ta"]:
            val = getattr(obj, f"category_label_{lang}", None)
            if val and str(val).strip():
                return str(val).strip()

        val_en = getattr(obj, "category_label_en", None)
        if val_en and str(val_en).strip():
            from .models import CATEGORY_CHOICES
            standard_labels = {choice[1] for choice in CATEGORY_CHOICES}
            standard_labels_clean = {c.split(" ", 1)[1] if (" " in c and not c[0].isalnum()) else c for c in standard_labels}
            all_standard = standard_labels | standard_labels_clean

            if val_en not in all_standard or val_en in [display_name, clean_display]:
                return str(val_en).strip()

        return clean_display

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_fallback or "/images/services/foreign-training.jpg"

    def get_download_url(self, obj):
        if obj.document_file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.document_file.url) if request else obj.document_file.url
        return obj.file_url or "#"
