from rest_framework import serializers
from .models import OrganizationStructureChart


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class OrganizationStructureChartSerializer(serializers.ModelSerializer):
    eyebrow = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    chart_box_title = serializers.SerializerMethodField()
    chart_box_subtitle = serializers.SerializerMethodField()
    executive_notes = serializers.SerializerMethodField()
    chart_image_url = serializers.SerializerMethodField()
    chart_pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = OrganizationStructureChart
        fields = [
            "eyebrow",
            "title",
            "description",
            "chart_box_title",
            "chart_box_subtitle",
            "chart_image_url",
            "chart_pdf_url",
            "executive_notes",
        ]

    def get_eyebrow(self, obj): return resolve_lang(obj, "eyebrow", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_chart_box_title(self, obj): return resolve_lang(obj, "chart_box_title", self.context)
    def get_chart_box_subtitle(self, obj): return resolve_lang(obj, "chart_box_subtitle", self.context)
    def get_executive_notes(self, obj): return resolve_lang(obj, "executive_notes", self.context)

    def get_chart_image_url(self, obj):
        if obj.chart_image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.chart_image.url) if request else obj.chart_image.url
        return obj.chart_fallback

    def get_chart_pdf_url(self, obj):
        if obj.chart_pdf:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.chart_pdf.url) if request else obj.chart_pdf.url
        return None
