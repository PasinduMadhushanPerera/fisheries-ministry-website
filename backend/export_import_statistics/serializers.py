from rest_framework import serializers
from .models import (
    ExportImportHeader,
    ExportImportSummaryMetric,
    ExportImportYearCategory,
    ExportImportReport,
)


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class ExportImportHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    summary_heading = serializers.SerializerMethodField()

    class Meta:
        model = ExportImportHeader
        fields = [
            "badge_text",
            "title",
            "description",
            "summary_heading",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_summary_heading(self, obj): return resolve_lang(obj, "summary_heading", self.context)


class ExportImportYearCategorySerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    badgeSingular = serializers.SerializerMethodField()
    badgePlural = serializers.SerializerMethodField()

    class Meta:
        model = ExportImportYearCategory
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
                return f"{obj.year} මත්ස්‍ය අපනයන සහ ආනයන වෙළඳ වාර්තා"
            elif lang == "ta":
                return f"{obj.year} மீன் ஏற்றுமதி மற்றும் இறக்குமதி வர்த்தக அறிக்கைகள்"
            return f"{obj.year} Export & Import Trade Reports"
        return val

    def get_description(self, obj):
        val = resolve_lang(obj, "description", self.context)
        if not val or not val.strip():
            lang = self.context.get("lang", "en")
            if lang == "si":
                return f"{obj.year} වසර සඳහා සකස් කරන ලද නිල මාසික මත්ස්‍ය අපනයන සහ ආනයන රේගු වෙළඳ දත්ත වාර්තා"
            elif lang == "ta":
                return f"{obj.year} ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ மாதாந்த மீன் ஏற்றுமதி மற்றும் இறக்குமதி சுங்க வர்த்தக தரவுத்தொகுப்புகள்"
            return f"Official monthly fish export and import customs trade datasets compiled for {obj.year}"
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
            if lang == "si": return "මාසික වාර්තා"
            if lang == "ta": return "மாதாந்த அறிக்கைகள்"
            return "Monthly Reports"
        return val


class ExportImportSummaryMetricSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="metric_id")
    title = serializers.SerializerMethodField()
    value = serializers.SerializerMethodField()
    unit = serializers.SerializerMethodField()
    period = serializers.SerializerMethodField()
    trend = serializers.SerializerMethodField()
    iconType = serializers.CharField(source="icon_type")

    class Meta:
        model = ExportImportSummaryMetric
        fields = [
            "id",
            "title",
            "value",
            "unit",
            "period",
            "trend",
            "iconType",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_value(self, obj): return resolve_lang(obj, "value", self.context)
    def get_unit(self, obj): return resolve_lang(obj, "unit", self.context)
    def get_period(self, obj): return resolve_lang(obj, "period", self.context)
    def get_trend(self, obj): return resolve_lang(obj, "trend", self.context)


class ExportImportReportSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="report_id")
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    publishedDate = serializers.SerializerMethodField()
    fileType = serializers.CharField(source="file_type")
    fileSize = serializers.CharField(source="file_size")
    fileUrl = serializers.SerializerMethodField()
    downloadUrl = serializers.SerializerMethodField()
    monthNumber = serializers.IntegerField(source="month_number")

    class Meta:
        model = ExportImportReport
        fields = [
            "id",
            "year",
            "month",
            "monthNumber",
            "title",
            "description",
            "fileType",
            "fileSize",
            "fileUrl",
            "downloadUrl",
            "publishedDate",
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
