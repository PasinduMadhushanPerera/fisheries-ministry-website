from rest_framework import serializers
from .models import ProcurementPageHeader, ProcurementCategory, ProcurementTenderItem, ProcurementTenderDocument


def resolve_lang(obj, field_base: str, context: dict) -> str:
    if not obj:
        return ""
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


class ProcurementTenderDocumentSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = ProcurementTenderDocument
        fields = [
            "id",
            "label",
            "download_url",
            "file_type",
            "file_size",
        ]

    def get_label(self, obj):
        label = resolve_lang(obj, "label", self.context)
        return label or "Document can be downloaded from here"

    def get_download_url(self, obj):
        if obj.document_file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.document_file.url) if request else obj.document_file.url
        return obj.file_url or "#"


class ProcurementCategorySerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = ProcurementCategory
        fields = [
            "id",
            "category_id",
            "title",
            "description",
            "icon_type",
            "order",
        ]

    def get_title(self, obj):
        return resolve_lang(obj, "title", self.context)

    def get_description(self, obj):
        return resolve_lang(obj, "description", self.context)


class ProcurementTenderItemSerializer(serializers.ModelSerializer):
    ref_number = serializers.CharField()
    category = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    subheading = serializers.SerializerMethodField()
    publisher = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    category_label = serializers.SerializerMethodField()
    detailed_scope = serializers.SerializerMethodField()
    additional_info = serializers.SerializerMethodField()
    doc_button_label = serializers.SerializerMethodField()
    submission_address = serializers.SerializerMethodField()
    tender_fee = serializers.SerializerMethodField()
    bid_security = serializers.SerializerMethodField()
    eligibility = serializers.SerializerMethodField()
    contact_info = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

    second_document_label = serializers.SerializerMethodField()
    second_download_url = serializers.SerializerMethodField()
    additional_documents = ProcurementTenderDocumentSerializer(many=True, read_only=True)

    class Meta:
        model = ProcurementTenderItem
        fields = [
            "id",
            "slug",
            "order",
            "year",
            "ref_number",
            "category",
            "category_label",
            "status",
            "featured",
            "title",
            "subheading",
            "publisher",
            "description",
            "detailed_scope",
            "additional_info",
            "doc_button_label",
            "submission_address",
            "tender_fee",
            "bid_security",
            "eligibility",
            "contact_info",
            "published_date",
            "closing_date",
            "download_url",
            "file_type",
            "file_size",
            "second_document_label",
            "second_download_url",
            "second_file_type",
            "second_file_size",
            "additional_documents",
        ]

    def get_category(self, obj):
        if obj.category_ref:
            return obj.category_ref.category_id
        return obj.category or ""

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_subheading(self, obj): return resolve_lang(obj, "subheading", self.context)
    def get_publisher(self, obj): return resolve_lang(obj, "publisher", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_additional_info(self, obj): return resolve_lang(obj, "additional_info", self.context)
    def get_doc_button_label(self, obj):
        label = resolve_lang(obj, "doc_button_label", self.context)
        return label or "Document can be downloaded from here"

    def get_submission_address(self, obj): return resolve_lang(obj, "submission_address", self.context)
    def get_tender_fee(self, obj): return resolve_lang(obj, "tender_fee", self.context)
    def get_bid_security(self, obj): return resolve_lang(obj, "bid_security", self.context)
    def get_eligibility(self, obj): return resolve_lang(obj, "eligibility", self.context)
    def get_contact_info(self, obj): return resolve_lang(obj, "contact_info", self.context)

    def get_category_label(self, obj):
        if obj.category_ref:
            return resolve_lang(obj.category_ref, "title", self.context)
        if not obj.category:
            return ""
        lang = self.context.get("lang", "en")
        if lang in ["si", "ta"]:
            val = getattr(obj, f"category_label_{lang}", None)
            if val and str(val).strip():
                return str(val).strip()

        val_en = getattr(obj, "category_label_en", None)
        if val_en and str(val_en).strip():
            return str(val_en).strip()

        display_name = obj.get_category_display()
        if not display_name:
            return ""
        return display_name.split(" ", 1)[1] if (" " in display_name and not display_name[0].isalnum()) else display_name

    def get_detailed_scope(self, obj):
        scope_str = resolve_lang(obj, "detailed_scope", self.context)
        if not scope_str or not scope_str.strip():
            desc = self.get_description(obj)
            return [desc] if desc else []
        return [line.strip() for line in scope_str.split("\n") if line.strip()]

    def get_download_url(self, obj):
        if obj.document_file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.document_file.url) if request else obj.document_file.url
        return obj.file_url or "#"

    def get_second_document_label(self, obj):
        return resolve_lang(obj, "second_document_label", self.context)

    def get_second_download_url(self, obj):
        if obj.second_document_file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.second_document_file.url) if request else obj.second_document_file.url
        return obj.second_file_url or ""

