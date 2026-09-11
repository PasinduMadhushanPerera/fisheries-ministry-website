from rest_framework import serializers
from .models import ProcurementPageHeader, ProcurementTenderItem


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


class ProcurementPageHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    featured_badge = serializers.SerializerMethodField()
    catalogue_badge = serializers.SerializerMethodField()
    library_title = serializers.SerializerMethodField()

    class Meta:
        model = ProcurementPageHeader
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


class ProcurementTenderItemSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    publisher = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    category_label = serializers.SerializerMethodField()
    detailed_scope = serializers.SerializerMethodField()
    submission_address = serializers.SerializerMethodField()
    tender_fee = serializers.SerializerMethodField()
    bid_security = serializers.SerializerMethodField()
    eligibility = serializers.SerializerMethodField()
    contact_info = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = ProcurementTenderItem
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
            "publisher",
            "description",
            "detailed_scope",
            "published_date",
            "closing_date",
            "submission_address",
            "tender_fee",
            "bid_security",
            "eligibility",
            "contact_info",
            "download_url",
            "file_type",
            "file_size",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_publisher(self, obj): return resolve_lang(obj, "publisher", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_category_label(self, obj):
        label = resolve_lang(obj, "category_label", self.context)
        if not label:
            return obj.get_category_display()
        return label

    def get_detailed_scope(self, obj):
        scope_text = resolve_lang(obj, "detailed_scope", self.context)
        if scope_text:
            return [line.strip() for line in scope_text.splitlines() if line.strip()]
        return []

    def get_submission_address(self, obj): return resolve_lang(obj, "submission_address", self.context)
    def get_tender_fee(self, obj): return resolve_lang(obj, "tender_fee", self.context)
    def get_bid_security(self, obj): return resolve_lang(obj, "bid_security", self.context)
    def get_eligibility(self, obj): return resolve_lang(obj, "eligibility", self.context)
    def get_contact_info(self, obj): return resolve_lang(obj, "contact_info", self.context)

    def get_download_url(self, obj):
        if obj.document_file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.document_file.url) if request else obj.document_file.url
        return obj.file_url or "#"
