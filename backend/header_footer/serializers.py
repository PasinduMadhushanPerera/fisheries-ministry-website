from rest_framework import serializers
from .models import HeaderSetting, FooterSetting, FooterLink, FooterAward, SiteMaintenanceSetting


def resolve_lang(obj, field_base: str, context: dict = None) -> str:
    if not obj:
        return ""
    context = context or {}
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    val_en = getattr(obj, f"{field_base}_en", None)
    if val_en and str(val_en).strip():
        return str(val_en).strip()
    val_base = getattr(obj, field_base, None)
    if val_base and str(val_base).strip():
        return str(val_base).strip()
    return ""


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
    label = serializers.SerializerMethodField()

    class Meta:
        model = FooterLink
        fields = ["id", "column", "label", "url", "is_external", "order"]

    def get_label(self, obj):
        return resolve_lang(obj, "label", self.context)


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
    government_badge = serializers.SerializerMethodField()
    ministry_name = serializers.SerializerMethodField()
    about_text = serializers.SerializerMethodField()
    gov_portal_label = serializers.SerializerMethodField()
    quick_links_title = serializers.SerializerMethodField()
    info_links_title = serializers.SerializerMethodField()
    contact_title = serializers.SerializerMethodField()
    awards_title = serializers.SerializerMethodField()
    hq_address = serializers.SerializerMethodField()
    copyright_text = serializers.SerializerMethodField()
    developed_by_text = serializers.SerializerMethodField()
    last_updated_text = serializers.SerializerMethodField()
    last_updated_prefix = serializers.SerializerMethodField()
    website_views_prefix = serializers.SerializerMethodField()
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
            "quick_links_title",
            "info_links_title",
            "contact_title",
            "awards_title",
            "hq_address",
            "telephone",
            "email",
            "copyright_text",
            "copyright_year",
            "developed_by_text",
            "last_updated_text",
            "last_updated_prefix",
            "website_views_prefix",
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

    def get_government_badge(self, obj): return resolve_lang(obj, "government_badge", self.context)
    def get_ministry_name(self, obj): return resolve_lang(obj, "ministry_name", self.context)
    def get_about_text(self, obj): return resolve_lang(obj, "about_text", self.context)
    def get_gov_portal_label(self, obj): return resolve_lang(obj, "gov_portal_label", self.context)
    def get_quick_links_title(self, obj): return resolve_lang(obj, "quick_links_title", self.context)
    def get_info_links_title(self, obj): return resolve_lang(obj, "info_links_title", self.context)
    def get_contact_title(self, obj): return resolve_lang(obj, "contact_title", self.context)
    def get_awards_title(self, obj): return resolve_lang(obj, "awards_title", self.context)
    def get_hq_address(self, obj): return resolve_lang(obj, "hq_address", self.context)
    def get_copyright_text(self, obj): return resolve_lang(obj, "copyright_text", self.context)
    def get_developed_by_text(self, obj): return resolve_lang(obj, "developed_by_text", self.context)
    def get_last_updated_text(self, obj):
        val = resolve_lang(obj, "last_updated_text", self.context)
        lang = (self.context.get("lang") or "en").lower() if self.context else "en"
        stale_markers = ["2026 අගෝස්තු 25", "25 ஆகஸ்ட் 2026", "25 August 2026"]
        if lang in ["si", "ta"]:
            if not val or val in stale_markers:
                en_date = getattr(obj, "last_updated_text", "")
                if en_date and en_date not in stale_markers:
                    from .signals import get_multilingual_dates
                    parts = en_date.strip().split()
                    if len(parts) >= 3:
                        try:
                            from datetime import datetime
                            dt = datetime.strptime(f"{parts[0]} {parts[1]} {parts[2]}", "%d %B %Y")
                            _, si_str, ta_str = get_multilingual_dates(dt)
                            return si_str if lang == "si" else ta_str
                        except Exception:
                            pass
        return val
    def get_last_updated_prefix(self, obj): return resolve_lang(obj, "last_updated_prefix", self.context)
    def get_website_views_prefix(self, obj): return resolve_lang(obj, "website_views_prefix", self.context)

    def get_quick_links(self, obj):
        links = FooterLink.objects.filter(column="quick", is_active=True).order_by("order", "id")
        return FooterLinkSerializer(links, many=True, context=self.context).data

    def get_info_links(self, obj):
        links = FooterLink.objects.filter(column="info", is_active=True).order_by("order", "id")
        return FooterLinkSerializer(links, many=True, context=self.context).data

    def get_support_links(self, obj):
        links = FooterLink.objects.filter(column="support", is_active=True).order_by("order", "id")
        return FooterLinkSerializer(links, many=True, context=self.context).data

    def get_legal_links(self, obj):
        links = FooterLink.objects.filter(column="legal", is_active=True).order_by("order", "id")
        return FooterLinkSerializer(links, many=True, context=self.context).data

    def get_awards(self, obj):
        awards = FooterAward.objects.filter(is_active=True).order_by("order", "id")
        return FooterAwardSerializer(awards, many=True, context=self.context).data


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
