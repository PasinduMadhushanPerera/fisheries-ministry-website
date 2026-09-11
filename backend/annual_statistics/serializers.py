from rest_framework import serializers
from .models import AnnualStatisticsHeader, AnnualStatisticsReport


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class AnnualStatisticsHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    featured_badge = serializers.SerializerMethodField()

    class Meta:
        model = AnnualStatisticsHeader
        fields = [
            "badge_text",
            "title",
            "description",
            "featured_badge",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_featured_badge(self, obj): return resolve_lang(obj, "featured_badge", self.context)


class AnnualStatisticsReportSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="report_id")
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    publishedDate = serializers.SerializerMethodField()
    fileType = serializers.CharField(source="file_type")
    fileSize = serializers.CharField(source="file_size")
    fileUrl = serializers.SerializerMethodField()
    downloadUrl = serializers.SerializerMethodField()
    language = serializers.CharField(source="languages_text")
    featured = serializers.BooleanField(source="is_featured")

    class Meta:
        model = AnnualStatisticsReport
        fields = [
            "id",
            "year",
            "title",
            "description",
            "publishedDate",
            "fileType",
            "fileSize",
            "fileUrl",
            "downloadUrl",
            "language",
            "featured",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)

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
