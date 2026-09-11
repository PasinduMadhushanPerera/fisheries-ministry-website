from rest_framework import serializers
from .models import (
    RtiOfficer,
    RtiLegalDocument,
    RtiCategory,
    RtiDocumentItem,
)


class RtiOfficerSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="officer_id")
    officerType = serializers.CharField(source="officer_type")
    name = serializers.SerializerMethodField()
    designation = serializers.SerializerMethodField()
    organization = serializers.SerializerMethodField()
    emails = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    imageAlt = serializers.SerializerMethodField()

    class Meta:
        model = RtiOfficer
        fields = [
            "id",
            "officerType",
            "name",
            "designation",
            "organization",
            "telephone",
            "fax",
            "emails",
            "image",
            "imageAlt",
            "order",
        ]

    def _get_lang(self):
        return self.context.get("language", "en")

    def get_name(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.name_si:
            return obj.name_si
        if lang == "ta" and obj.name_ta:
            return obj.name_ta
        return obj.name_en

    def get_designation(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.designation_si:
            return obj.designation_si
        if lang == "ta" and obj.designation_ta:
            return obj.designation_ta
        return obj.designation_en

    def get_organization(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.organization_si:
            return obj.organization_si
        if lang == "ta" and obj.organization_ta:
            return obj.organization_ta
        return obj.organization_en

    def get_emails(self, obj):
        if not obj.emails:
            return []
        return [e.strip() for e in obj.emails.split(",") if e.strip()]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_fallback or "/images/leadership/secretary.jpg"

    def get_imageAlt(self, obj):
        name = self.get_name(obj)
        return f"{name} - {obj.officer_type}"


class RtiLegalDocumentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="document_id")
    category = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    fileType = serializers.CharField(source="file_type")
    fileSize = serializers.CharField(source="file_size")
    fileUrl = serializers.SerializerMethodField()
    downloadUrl = serializers.SerializerMethodField()
    publishedDate = serializers.SerializerMethodField()

    class Meta:
        model = RtiLegalDocument
        fields = [
            "id",
            "category",
            "title",
            "description",
            "fileType",
            "fileSize",
            "fileUrl",
            "downloadUrl",
            "publishedDate",
            "order",
        ]

    def _get_lang(self):
        return self.context.get("language", "en")

    def get_category(self, obj):
        return "legal"

    def get_title(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.title_si:
            return obj.title_si
        if lang == "ta" and obj.title_ta:
            return obj.title_ta
        return obj.title_en

    def get_description(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.description_si:
            return obj.description_si
        if lang == "ta" and obj.description_ta:
            return obj.description_ta
        return obj.description_en

    def get_fileUrl(self, obj):
        if obj.document_file:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.document_file.url)
            return obj.document_file.url
        return obj.file_url_fallback or "#"

    def get_downloadUrl(self, obj):
        return self.get_fileUrl(obj)

    def get_publishedDate(self, obj):
        if obj.display_date:
            return obj.display_date
        if obj.published_date:
            return obj.published_date.strftime("%d %B %Y")
        return ""


class RtiCategorySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="category_id")
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    icon = serializers.CharField(source="icon_type")

    class Meta:
        model = RtiCategory
        fields = [
            "id",
            "title",
            "description",
            "icon",
            "order",
        ]

    def _get_lang(self):
        return self.context.get("language", "en")

    def get_title(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.title_si:
            return obj.title_si
        if lang == "ta" and obj.title_ta:
            return obj.title_ta
        return obj.title_en

    def get_description(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.description_si:
            return obj.description_si
        if lang == "ta" and obj.description_ta:
            return obj.description_ta
        return obj.description_en


class RtiDocumentItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="item_id")
    category = serializers.CharField(source="category.category_id")
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    fileType = serializers.CharField(source="file_type")
    fileSize = serializers.CharField(source="file_size")
    fileUrl = serializers.SerializerMethodField()
    downloadUrl = serializers.SerializerMethodField()
    publishedDate = serializers.SerializerMethodField()
    featured = serializers.BooleanField(source="is_featured")

    class Meta:
        model = RtiDocumentItem
        fields = [
            "id",
            "category",
            "title",
            "description",
            "year",
            "fileType",
            "fileSize",
            "fileUrl",
            "downloadUrl",
            "publishedDate",
            "featured",
            "order",
        ]

    def _get_lang(self):
        return self.context.get("language", "en")

    def get_title(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.title_si:
            return obj.title_si
        if lang == "ta" and obj.title_ta:
            return obj.title_ta
        return obj.title_en

    def get_description(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.description_si:
            return obj.description_si
        if lang == "ta" and obj.description_ta:
            return obj.description_ta
        return obj.description_en

    def get_fileUrl(self, obj):
        if obj.document_file:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.document_file.url)
            return obj.document_file.url
        return obj.file_url_fallback or "#"

    def get_downloadUrl(self, obj):
        return self.get_fileUrl(obj)

    def get_publishedDate(self, obj):
        if obj.display_date:
            return obj.display_date
        if obj.published_date:
            return obj.published_date.strftime("%d %B %Y")
        return ""
