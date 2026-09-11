from rest_framework import serializers
from .models import RecruitmentPageHeader, RecruitmentVacancyItem


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class RecruitmentPageHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    featured_badge = serializers.SerializerMethodField()
    catalogue_badge = serializers.SerializerMethodField()
    library_title = serializers.SerializerMethodField()

    class Meta:
        model = RecruitmentPageHeader
        fields = [
            "badge_text",
            "title",
            "description",
            "featured_badge",
            "catalogue_badge",
            "library_title",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_featured_badge(self, obj): return resolve_lang(obj, "featured_badge", self.context)
    def get_catalogue_badge(self, obj): return resolve_lang(obj, "catalogue_badge", self.context)
    def get_library_title(self, obj): return resolve_lang(obj, "library_title", self.context)


class RecruitmentVacancyItemSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    institution = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    category_label = serializers.SerializerMethodField()
    qualifications = serializers.SerializerMethodField()
    salary_scale = serializers.SerializerMethodField()
    age_limit = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = RecruitmentVacancyItem
        fields = [
            "id",
            "slug",
            "order",
            "ref_number",
            "year",
            "category",
            "category_label",
            "status",
            "featured",
            "title",
            "institution",
            "department",
            "description",
            "qualifications",
            "published_date",
            "closing_date",
            "salary_scale",
            "age_limit",
            "download_url",
            "file_type",
            "file_size",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_institution(self, obj): return resolve_lang(obj, "institution", self.context)
    def get_department(self, obj): return resolve_lang(obj, "department", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_category_label(self, obj):
        label = resolve_lang(obj, "category_label", self.context)
        if not label:
            return obj.get_category_display()
        return label

    def get_qualifications(self, obj):
        text = resolve_lang(obj, "qualifications", self.context)
        if text:
            return [line.strip() for line in text.splitlines() if line.strip()]
        return []

    def get_salary_scale(self, obj): return resolve_lang(obj, "salary_scale", self.context)
    def get_age_limit(self, obj): return resolve_lang(obj, "age_limit", self.context)

    def get_download_url(self, obj):
        if obj.document_file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.document_file.url) if request else obj.document_file.url
        return obj.file_url or "#"
