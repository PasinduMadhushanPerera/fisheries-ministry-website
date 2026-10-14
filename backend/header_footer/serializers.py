from rest_framework import serializers
from .models import HeaderSetting, FooterSetting, FooterLink, FooterAward, SiteMaintenanceSetting


class HeaderSettingSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = HeaderSetting
        fields = [
            "government_name",
            "ministry_name",
            "tagline",
            "logo_url",
            "logo_alt",
            "hotline_phone",
            "email",
            "help_link_text",
            "help_link_url",
            "gov_link_text",
            "gov_link_url",
            "search_placeholder",
            "enable_emergency_banner",
            "emergency_banner_text",
            "emergency_banner_link",
        ]

    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.logo.url) if request else obj.logo.url
        return obj.logo_url_fallback


class FooterLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLink
        fields = ["id", "column", "label", "url", "is_external", "order"]


class FooterAwardSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = FooterAward
        fields = ["id", "title", "image_url", "url", "order"]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return ""


class FooterSettingSerializer(serializers.ModelSerializer):
    quick_links = serializers.SerializerMethodField()
    info_links = serializers.SerializerMethodField()
    support_links = serializers.SerializerMethodField()
    legal_links = serializers.SerializerMethodField()
    awards = serializers.SerializerMethodField()

    class Meta:
        model = FooterSetting
        fields = [
            "government_badge",
            "ministry_name",
            "about_text",
            "gov_portal_label",
            "gov_portal_url",
            "hq_address",
            "telephone",
            "email",
            "copyright_text",
            "copyright_year",
            "developed_by_text",
            "last_updated_text",
            "enable_social_media",
            "facebook_url",
            "youtube_url",
            "linkedin_url",
            "twitter_url",
            "instagram_url",
            "quick_links",
            "info_links",
            "support_links",
            "legal_links",
            "awards",
        ]

    def get_quick_links(self, obj):
        links = FooterLink.objects.filter(column="quick", is_active=True).order_by("order", "id")
        return FooterLinkSerializer(links, many=True).data

    def get_info_links(self, obj):
        links = FooterLink.objects.filter(column="info", is_active=True).order_by("order", "id")
        return FooterLinkSerializer(links, many=True).data

    def get_support_links(self, obj):
        links = FooterLink.objects.filter(column="support", is_active=True).order_by("order", "id")
        return FooterLinkSerializer(links, many=True).data

    def get_legal_links(self, obj):
        links = FooterLink.objects.filter(column="legal", is_active=True).order_by("order", "id")
        return FooterLinkSerializer(links, many=True).data

    def get_awards(self, obj):
        awards = FooterAward.objects.filter(is_active=True).order_by("order", "id")
        return FooterAwardSerializer(awards, many=True, context=self.context).data


def resolve_lang(obj, field_base: str, context: dict) -> str:
    if not obj:
        return ""
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class SiteMaintenanceSettingSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    message = serializers.SerializerMethodField()
    estimated_restoration = serializers.SerializerMethodField()

    class Meta:
        model = SiteMaintenanceSetting
        fields = [
            "is_maintenance_mode",
            "title",
            "message",
            "estimated_restoration",
            "contact_phone",
            "contact_email",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_message(self, obj): return resolve_lang(obj, "message", self.context)
    def get_estimated_restoration(self, obj): return resolve_lang(obj, "estimated_restoration", self.context)

