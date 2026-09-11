from rest_framework import serializers
from .models import DivisionsPageIntro, MinistryDivision


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class DivisionsPageIntroSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = DivisionsPageIntro
        fields = [
            "badge_text",
            "title",
            "description",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)


class MinistryDivisionSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    full_description = serializers.SerializerMethodField()
    bullet_points = serializers.SerializerMethodField()
    head_of_division = serializers.SerializerMethodField()
    bullet_list = serializers.SerializerMethodField()

    class Meta:
        model = MinistryDivision
        fields = [
            "id",
            "order",
            "slug",
            "title",
            "icon_name",
            "short_description",
            "full_description",
            "bullet_points",
            "bullet_list",
            "head_of_division",
            "contact_email",
            "contact_phone",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_short_description(self, obj): return resolve_lang(obj, "short_description", self.context)
    def get_full_description(self, obj): return resolve_lang(obj, "full_description", self.context)
    def get_bullet_points(self, obj): return resolve_lang(obj, "bullet_points", self.context)
    def get_head_of_division(self, obj): return resolve_lang(obj, "head_of_division", self.context)

    def get_bullet_list(self, obj):
        text = resolve_lang(obj, "bullet_points", self.context)
        if not text:
            return []
        return [line.strip().lstrip("•-* ").strip() for line in text.splitlines() if line.strip()]
