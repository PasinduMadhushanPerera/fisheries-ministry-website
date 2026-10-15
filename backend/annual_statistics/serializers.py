from rest_framework import serializers
from .models import (
    AnnualStatisticsHeader,
    AnnualStatisticsYearCategory,
    AnnualStatisticsReport,
)


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


class AnnualStatisticsYearCategorySerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    badgeSingular = serializers.SerializerMethodField()
    badgePlural = serializers.SerializerMethodField()

    class Meta:
        model = AnnualStatisticsYearCategory
        fields = [
            "id",
            "year",
            "title",
            "description",
            "badgeSingular",
            "badgePlural",
            "order",
        ]

    def get_title(self, obj):
        val = resolve_lang(obj, "title", self.context)
        if not val or not val.strip():
            lang = self.context.get("lang", "en")
            if lang == "si":
                return f"{obj.year} වාර්ෂික සංඛ්‍යාලේඛන වාර්තා සහ දත්ත කට්ටල"
            elif lang == "ta":
                return f"{obj.year} வருடாந்த புள்ளிவிவர அறிக்கைகள் மற்றும் தரவுத் தொகுப்புகள்"
            return f"{obj.year} Annual Statistics Reports & Datasets"
        return val

    def get_description(self, obj):
        val = resolve_lang(obj, "description", self.context)
        if not val or not val.strip():
            lang = self.context.get("lang", "en")
            if lang == "si":
                return f"{obj.year} වසර සඳහා සකස් කරන ලද නිල වාර්ෂික සංඛ්‍යාලේඛන ප්‍රකාශන සහ ක්ෂේත්‍ර වාර්තා"
            elif lang == "ta":
                return f"{obj.year} ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ வருடாந்த புள்ளிவிவர அறிக்கைகள் மற்றும் துறைசார் வெளியீடுகள்"
            return f"Official annual statistical bulletins and sector publications compiled for {obj.year}"
        return val

    def get_badgeSingular(self, obj):
        val = resolve_lang(obj, "badge_singular", self.context)
        if not val or not val.strip():
            lang = self.context.get("lang", "en")
            if lang == "si": return "වාර්තාව"
            if lang == "ta": return "அறிக்கை"
            return "Report"
        return val

    def get_badgePlural(self, obj):
        val = resolve_lang(obj, "badge_plural", self.context)
        if not val or not val.strip():
            lang = self.context.get("lang", "en")
            if lang == "si": return "වාර්ෂික වාර්තා"
            if lang == "ta": return "வருடாந்த அறிக்கைகள்"
            return "Annual Reports"
        return val


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
