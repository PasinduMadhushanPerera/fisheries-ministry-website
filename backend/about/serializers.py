from rest_framework import serializers
from .models import (
    AboutOverview,
    AboutVisionMission,
    AboutObjectiveHeader,
    AboutObjective,
    AboutLeadershipHeader,
    AboutLeader,
    AboutOrganizationStructure,
    AboutTimelineHeader,
    AboutTimelineEvent,
)


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class AboutOverviewSerializer(serializers.ModelSerializer):
    eyebrow = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    legacy_title = serializers.SerializerMethodField()
    legacy_content = serializers.SerializerMethodField()
    economic_title = serializers.SerializerMethodField()
    economic_content = serializers.SerializerMethodField()
    economic_subcontent = serializers.SerializerMethodField()
    stat_1_label = serializers.SerializerMethodField()
    stat_2_label = serializers.SerializerMethodField()
    stat_3_label = serializers.SerializerMethodField()
    stat_4_label = serializers.SerializerMethodField()
    cta_button_text = serializers.SerializerMethodField()
    pillar_mandate_badge = serializers.SerializerMethodField()
    pillar_mandate_title = serializers.SerializerMethodField()
    pillar_1_title = serializers.SerializerMethodField()
    pillar_1_description = serializers.SerializerMethodField()
    pillar_2_title = serializers.SerializerMethodField()
    pillar_2_description = serializers.SerializerMethodField()
    pillar_3_title = serializers.SerializerMethodField()
    pillar_3_description = serializers.SerializerMethodField()
    benefit_banner_title = serializers.SerializerMethodField()
    benefit_banner_text = serializers.SerializerMethodField()

    class Meta:
        model = AboutOverview
        fields = [
            "eyebrow",
            "title",
            "description",
            "legacy_title",
            "legacy_content",
            "economic_title",
            "economic_content",
            "economic_subcontent",
            "stat_1_value",
            "stat_1_label",
            "stat_2_value",
            "stat_2_label",
            "stat_3_value",
            "stat_3_label",
            "stat_4_value",
            "stat_4_label",
            "cta_button_text",
            "cta_button_url",
            "pillar_mandate_badge",
            "pillar_mandate_title",
            "pillar_1_title",
            "pillar_1_description",
            "pillar_2_title",
            "pillar_2_description",
            "pillar_3_title",
            "pillar_3_description",
            "benefit_banner_title",
            "benefit_banner_text",
        ]

    def get_eyebrow(self, obj): return resolve_lang(obj, "eyebrow", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_legacy_title(self, obj): return resolve_lang(obj, "legacy_title", self.context)
    def get_legacy_content(self, obj): return resolve_lang(obj, "legacy_content", self.context)
    def get_economic_title(self, obj): return resolve_lang(obj, "economic_title", self.context)
    def get_economic_content(self, obj): return resolve_lang(obj, "economic_content", self.context)
    def get_economic_subcontent(self, obj): return resolve_lang(obj, "economic_subcontent", self.context)
    def get_stat_1_label(self, obj): return resolve_lang(obj, "stat_1_label", self.context)
    def get_stat_2_label(self, obj): return resolve_lang(obj, "stat_2_label", self.context)
    def get_stat_3_label(self, obj): return resolve_lang(obj, "stat_3_label", self.context)
    def get_stat_4_label(self, obj): return resolve_lang(obj, "stat_4_label", self.context)
    def get_cta_button_text(self, obj): return resolve_lang(obj, "cta_button_text", self.context)
    def get_pillar_mandate_badge(self, obj): return resolve_lang(obj, "pillar_mandate_badge", self.context)
    def get_pillar_mandate_title(self, obj): return resolve_lang(obj, "pillar_mandate_title", self.context)
    def get_pillar_1_title(self, obj): return resolve_lang(obj, "pillar_1_title", self.context)
    def get_pillar_1_description(self, obj): return resolve_lang(obj, "pillar_1_description", self.context)
    def get_pillar_2_title(self, obj): return resolve_lang(obj, "pillar_2_title", self.context)
    def get_pillar_2_description(self, obj): return resolve_lang(obj, "pillar_2_description", self.context)
    def get_pillar_3_title(self, obj): return resolve_lang(obj, "pillar_3_title", self.context)
    def get_pillar_3_description(self, obj): return resolve_lang(obj, "pillar_3_description", self.context)
    def get_benefit_banner_title(self, obj): return resolve_lang(obj, "benefit_banner_title", self.context)
    def get_benefit_banner_text(self, obj): return resolve_lang(obj, "benefit_banner_text", self.context)


class AboutVisionMissionSerializer(serializers.ModelSerializer):
    eyebrow = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    vision_badge = serializers.SerializerMethodField()
    vision_heading = serializers.SerializerMethodField()
    vision_description = serializers.SerializerMethodField()
    vision_footer = serializers.SerializerMethodField()
    mission_badge = serializers.SerializerMethodField()
    mission_heading = serializers.SerializerMethodField()
    mission_description = serializers.SerializerMethodField()
    mission_footer = serializers.SerializerMethodField()

    class Meta:
        model = AboutVisionMission
        fields = [
            "eyebrow",
            "title",
            "description",
            "vision_badge",
            "vision_heading",
            "vision_description",
            "vision_footer",
            "mission_badge",
            "mission_heading",
            "mission_description",
            "mission_footer",
        ]

    def get_eyebrow(self, obj): return resolve_lang(obj, "eyebrow", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_vision_badge(self, obj): return resolve_lang(obj, "vision_badge", self.context)
    def get_vision_heading(self, obj): return resolve_lang(obj, "vision_heading", self.context)
    def get_vision_description(self, obj): return resolve_lang(obj, "vision_description", self.context)
    def get_vision_footer(self, obj): return resolve_lang(obj, "vision_footer", self.context)
    def get_mission_badge(self, obj): return resolve_lang(obj, "mission_badge", self.context)
    def get_mission_heading(self, obj): return resolve_lang(obj, "mission_heading", self.context)
    def get_mission_description(self, obj): return resolve_lang(obj, "mission_description", self.context)
    def get_mission_footer(self, obj): return resolve_lang(obj, "mission_footer", self.context)


class AboutObjectiveHeaderSerializer(serializers.ModelSerializer):
    eyebrow = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = AboutObjectiveHeader
        fields = ["eyebrow", "title", "description"]

    def get_eyebrow(self, obj): return resolve_lang(obj, "eyebrow", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)


class AboutObjectiveSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = AboutObjective
        fields = ["id", "order", "number_badge", "title", "description", "icon_name"]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)


class AboutLeadershipHeaderSerializer(serializers.ModelSerializer):
    eyebrow = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = AboutLeadershipHeader
        fields = ["eyebrow", "title", "description"]

    def get_eyebrow(self, obj): return resolve_lang(obj, "eyebrow", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)


class AboutLeaderSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    role_title = serializers.SerializerMethodField()
    ministry_badge = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    message_title = serializers.SerializerMethodField()
    message_content = serializers.SerializerMethodField()
    office_address = serializers.SerializerMethodField()
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = AboutLeader
        fields = [
            "id",
            "role_type",
            "order",
            "name",
            "role_title",
            "ministry_badge",
            "short_description",
            "message_title",
            "message_content",
            "photo_url",
            "photo_alt",
            "office_address",
            "office_phone",
            "office_email",
            "office_hours",
            "page_url",
        ]

    def get_name(self, obj): return resolve_lang(obj, "name", self.context)
    def get_role_title(self, obj): return resolve_lang(obj, "role_title", self.context)
    def get_ministry_badge(self, obj): return resolve_lang(obj, "ministry_badge", self.context)
    def get_short_description(self, obj): return resolve_lang(obj, "short_description", self.context)
    def get_message_title(self, obj): return resolve_lang(obj, "message_title", self.context)
    def get_message_content(self, obj): return resolve_lang(obj, "message_content", self.context)
    def get_office_address(self, obj): return resolve_lang(obj, "office_address", self.context)

    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.photo.url) if request else obj.photo.url
        return obj.photo_fallback


class AboutOrganizationStructureSerializer(serializers.ModelSerializer):
    eyebrow = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    chart_box_title = serializers.SerializerMethodField()
    chart_box_subtitle = serializers.SerializerMethodField()
    executive_notes = serializers.SerializerMethodField()
    chart_image_url = serializers.SerializerMethodField()
    chart_pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = AboutOrganizationStructure
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


class AboutTimelineHeaderSerializer(serializers.ModelSerializer):
    eyebrow = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = AboutTimelineHeader
        fields = ["eyebrow", "title", "description"]

    def get_eyebrow(self, obj): return resolve_lang(obj, "eyebrow", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)


class AboutTimelineEventSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    status_badge = serializers.SerializerMethodField()

    class Meta:
        model = AboutTimelineEvent
        fields = ["id", "order", "year", "title", "description", "status_badge"]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_status_badge(self, obj): return resolve_lang(obj, "status_badge", self.context)