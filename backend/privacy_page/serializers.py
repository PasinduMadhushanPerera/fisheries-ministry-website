from rest_framework import serializers
from .models import PrivacyPageSettings, PrivacySection


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en") if context else "en"
    if lang == "si":
        val = getattr(obj, f"{field_base}_si", "")
        if val:
            return val
    elif lang == "ta":
        val = getattr(obj, f"{field_base}_ta", "")
        if val:
            return val
    return getattr(obj, f"{field_base}_en", "") or ""


def resolve_lang_json(obj, field_base: str, context: dict) -> list:
    lang = context.get("lang", "en") if context else "en"
    if lang == "si":
        val = getattr(obj, f"{field_base}_si", [])
        if val:
            return val
    elif lang == "ta":
        val = getattr(obj, f"{field_base}_ta", [])
        if val:
            return val
    return getattr(obj, f"{field_base}_en", []) or []


class PrivacyPageSettingsSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    hero_title = serializers.SerializerMethodField()
    hero_highlight = serializers.SerializerMethodField()
    hero_description = serializers.SerializerMethodField()
    pill_text1 = serializers.SerializerMethodField()
    pill_text2 = serializers.SerializerMethodField()

    card_eyebrow = serializers.SerializerMethodField()
    card_title = serializers.SerializerMethodField()
    card_description = serializers.SerializerMethodField()

    callout_title = serializers.SerializerMethodField()
    callout_text = serializers.SerializerMethodField()

    desk_badge = serializers.SerializerMethodField()
    desk_title = serializers.SerializerMethodField()
    desk_description = serializers.SerializerMethodField()
    desk_office_name = serializers.SerializerMethodField()
    contact_btn_text = serializers.SerializerMethodField()

    class Meta:
        model = PrivacyPageSettings
        fields = [
            "badge_text",
            "hero_title",
            "hero_highlight",
            "hero_description",
            "pill_text1",
            "pill_text2",
            "card_eyebrow",
            "card_title",
            "card_description",
            "callout_title",
            "callout_text",
            "desk_badge",
            "desk_title",
            "desk_description",
            "desk_office_name",
            "desk_email",
            "desk_phone",
            "contact_btn_text",
            "last_updated_date",
        ]

    def get_badge_text(self, obj):
        return resolve_lang(obj, "badge_text", self.context)

    def get_hero_title(self, obj):
        return resolve_lang(obj, "hero_title", self.context)

    def get_hero_highlight(self, obj):
        return resolve_lang(obj, "hero_highlight", self.context)

    def get_hero_description(self, obj):
        return resolve_lang(obj, "hero_description", self.context)

    def get_pill_text1(self, obj):
        return resolve_lang(obj, "pill_text1", self.context)

    def get_pill_text2(self, obj):
        return resolve_lang(obj, "pill_text2", self.context)

    def get_card_eyebrow(self, obj):
        return resolve_lang(obj, "card_eyebrow", self.context)

    def get_card_title(self, obj):
        return resolve_lang(obj, "card_title", self.context)

    def get_card_description(self, obj):
        return resolve_lang(obj, "card_description", self.context)

    def get_callout_title(self, obj):
        return resolve_lang(obj, "callout_title", self.context)

    def get_callout_text(self, obj):
        return resolve_lang(obj, "callout_text", self.context)

    def get_desk_badge(self, obj):
        return resolve_lang(obj, "desk_badge", self.context)

    def get_desk_title(self, obj):
        return resolve_lang(obj, "desk_title", self.context)

    def get_desk_description(self, obj):
        return resolve_lang(obj, "desk_description", self.context)

    def get_desk_office_name(self, obj):
        return resolve_lang(obj, "desk_office_name", self.context)

    def get_contact_btn_text(self, obj):
        return resolve_lang(obj, "contact_btn_text", self.context)


class PrivacySectionSerializer(serializers.ModelSerializer):
    nav_label = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()

    class Meta:
        model = PrivacySection
        fields = [
            "id",
            "section_key",
            "order",
            "nav_label",
            "title",
            "content",
            "items",
        ]

    def get_nav_label(self, obj):
        return resolve_lang(obj, "nav_label", self.context)

    def get_title(self, obj):
        return resolve_lang(obj, "title", self.context)

    def get_content(self, obj):
        return resolve_lang(obj, "content", self.context)

    def get_items(self, obj):
        return resolve_lang_json(obj, "items_json", self.context)
