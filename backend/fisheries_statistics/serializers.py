from rest_framework import serializers
from .models import (
    FisheriesStatisticsHeader,
    FisheriesSummaryMetric,
    StatisticsCategory,
    StatisticsTableRow,
)


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class FisheriesStatisticsHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = FisheriesStatisticsHeader
        fields = [
            "badge_text",
            "title",
            "description",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)


class FisheriesSummaryMetricSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    unit = serializers.SerializerMethodField()

    class Meta:
        model = FisheriesSummaryMetric
        fields = [
            "id",
            "order",
            "title",
            "value",
            "unit",
            "year",
            "icon_name",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_unit(self, obj): return resolve_lang(obj, "unit", self.context)


class StatisticsTableRowSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()
    emphasized = serializers.BooleanField(source="is_emphasized")

    class Meta:
        model = StatisticsTableRow
        fields = [
            "id",
            "order",
            "label",
            "value",
            "unit",
            "emphasized",
        ]

    def get_label(self, obj): return resolve_lang(obj, "label", self.context)


class StatisticsCategorySerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    caption = serializers.SerializerMethodField()
    rows = serializers.SerializerMethodField()

    class Meta:
        model = StatisticsCategory
        fields = [
            "id",
            "slug",
            "order",
            "icon_name",
            "is_default_open",
            "title",
            "description",
            "caption",
            "rows",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_caption(self, obj): return resolve_lang(obj, "caption", self.context)

    def get_rows(self, obj):
        rows_queryset = obj.rows.all().order_by("order", "id")
        return StatisticsTableRowSerializer(rows_queryset, many=True, context=self.context).data
