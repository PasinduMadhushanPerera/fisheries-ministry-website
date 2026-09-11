from rest_framework import serializers
from .models import MinisterProfile, MinisterMessage, MinisterSecretariat


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class MinisterProfileSerializer(serializers.ModelSerializer):
    badge = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    role_title = serializers.SerializerMethodField()
    ministry_badge = serializers.SerializerMethodField()
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = MinisterProfile
        fields = [
            "badge",
            "name",
            "role_title",
            "ministry_badge",
            "photo_url",
            "photo_alt",
        ]

    def get_badge(self, obj): return resolve_lang(obj, "badge", self.context)
    def get_name(self, obj): return resolve_lang(obj, "name", self.context)
    def get_role_title(self, obj): return resolve_lang(obj, "role_title", self.context)
    def get_ministry_badge(self, obj): return resolve_lang(obj, "ministry_badge", self.context)

    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.photo.url) if request else obj.photo.url
        return obj.photo_fallback


class MinisterMessageSerializer(serializers.ModelSerializer):
    eyebrow = serializers.SerializerMethodField()
    message_title = serializers.SerializerMethodField()
    message_content = serializers.SerializerMethodField()
    quote_author = serializers.SerializerMethodField()
    quote_designation = serializers.SerializerMethodField()

    class Meta:
        model = MinisterMessage
        fields = [
            "eyebrow",
            "message_title",
            "message_content",
            "quote_author",
            "quote_designation",
        ]

    def get_eyebrow(self, obj): return resolve_lang(obj, "eyebrow", self.context)
    def get_message_title(self, obj): return resolve_lang(obj, "message_title", self.context)
    def get_message_content(self, obj): return resolve_lang(obj, "message_content", self.context)
    def get_quote_author(self, obj): return resolve_lang(obj, "quote_author", self.context)
    def get_quote_designation(self, obj): return resolve_lang(obj, "quote_designation", self.context)


class MinisterSecretariatSerializer(serializers.ModelSerializer):
    box_title = serializers.SerializerMethodField()
    box_subtitle = serializers.SerializerMethodField()
    office_address = serializers.SerializerMethodField()
    cta_contact_button_text = serializers.SerializerMethodField()
    secondary_link_text = serializers.SerializerMethodField()

    class Meta:
        model = MinisterSecretariat
        fields = [
            "box_title",
            "box_subtitle",
            "office_hours",
            "office_address",
            "office_phone",
            "office_email",
            "cta_contact_button_text",
            "cta_contact_button_url",
            "secondary_link_text",
            "secondary_link_url",
        ]

    def get_box_title(self, obj): return resolve_lang(obj, "box_title", self.context)
    def get_box_subtitle(self, obj): return resolve_lang(obj, "box_subtitle", self.context)
    def get_office_address(self, obj): return resolve_lang(obj, "office_address", self.context)
    def get_cta_contact_button_text(self, obj): return resolve_lang(obj, "cta_contact_button_text", self.context)
    def get_secondary_link_text(self, obj): return resolve_lang(obj, "secondary_link_text", self.context)
