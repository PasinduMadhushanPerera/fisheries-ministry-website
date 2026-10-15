from rest_framework import serializers
from .models import (
    WeeklyFishPricesHeader,
    WeeklyPriceMonthCategory,
    WeeklyPriceReport,
)


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class WeeklyFishPricesHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = WeeklyFishPricesHeader
        fields = [
            "badge_text",
            "title",
            "description",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)


class WeeklyPriceMonthCategorySerializer(serializers.ModelSerializer):
    groupKey = serializers.SerializerMethodField()
    monthNumber = serializers.IntegerField(source="month_number")
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    badgeSingular = serializers.SerializerMethodField()
    badgePlural = serializers.SerializerMethodField()

    class Meta:
        model = WeeklyPriceMonthCategory
        fields = [
            "id",
            "groupKey",
            "year",
            "month",
            "monthNumber",
            "title",
            "description",
            "badgeSingular",
            "badgePlural",
        ]

    def get_groupKey(self, obj):
        return f"{obj.month}-{obj.year}"

    def get_title(self, obj):
        return resolve_lang(obj, "title", self.context)

    def get_description(self, obj):
        return resolve_lang(obj, "description", self.context)

    def get_badgeSingular(self, obj):
        return resolve_lang(obj, "badge_singular", self.context)

    def get_badgePlural(self, obj):
        return resolve_lang(obj, "badge_plural", self.context)


class WeeklyPriceReportSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="report_id")
    title = serializers.SerializerMethodField()
    publishedDate = serializers.SerializerMethodField()
    fileSize = serializers.CharField(source="file_size")
    pdfUrl = serializers.SerializerMethodField()
    monthNumber = serializers.IntegerField(source="month_number")

    class Meta:
        model = WeeklyPriceReport
        fields = [
            "id",
            "year",
            "month",
            "monthNumber",
            "week",
            "title",
            "publishedDate",
            "fileSize",
            "pdfUrl",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)

    def get_publishedDate(self, obj):
        return obj.display_date or (obj.published_date.strftime("%d %B %Y") if obj.published_date else "")

    def get_pdfUrl(self, obj):
        request = self.context.get("request")
        if obj.pdf_file:
            if request:
                return request.build_absolute_uri(obj.pdf_file.url)
            return obj.pdf_file.url
        return obj.pdf_url_fallback or ""
