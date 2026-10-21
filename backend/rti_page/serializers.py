from rest_framework import serializers
from .models import (
    RtiPageSettings,
    RtiOfficer,
    RtiLegalDocument,
    RtiCategory,
    RtiDocumentItem,
)


class RtiPageSettingsSerializer(serializers.ModelSerializer):
    legislation_title = serializers.SerializerMethodField()
    legislation_description = serializers.SerializerMethodField()
    library_title = serializers.SerializerMethodField()
    library_description = serializers.SerializerMethodField()
    officers_title = serializers.SerializerMethodField()
    officers_description = serializers.SerializerMethodField()

    class Meta:
        model = RtiPageSettings
        fields = [
            "legislation_title",
            "legislation_description",
            "library_title",
            "library_description",
            "officers_title",
            "officers_description",
        ]

    def _get_lang(self):
        return self.context.get("language", "en")

    def get_legislation_title(self, obj):
        return obj.get_field_lang("legislation_title", self._get_lang())

    def get_legislation_description(self, obj):
        return obj.get_field_lang("legislation_description", self._get_lang())

    def get_library_title(self, obj):
        return obj.get_field_lang("library_title", self._get_lang())

    def get_library_description(self, obj):
        return obj.get_field_lang("library_description", self._get_lang())

    def get_officers_title(self, obj):
        return obj.get_field_lang("officers_title", self._get_lang())

    def get_officers_description(self, obj):
        return obj.get_field_lang("officers_description", self._get_lang())


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
    fileUrlEn = serializers.SerializerMethodField()
    fileUrlSi = serializers.SerializerMethodField()
    fileUrlTa = serializers.SerializerMethodField()
    availableLanguages = serializers.SerializerMethodField()
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
            "fileUrlEn",
            "fileUrlSi",
            "fileUrlTa",
            "availableLanguages",
            "publishedDate",
            "order",
        ]

    def _get_lang(self):
        return self.context.get("language", "en")

    def _build_url(self, file_field):
        if not file_field:
            return None
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(file_field.url)
        return file_field.url

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
        lang = self._get_lang()
        target_file = obj.get_file_for_lang(lang)
        if target_file:
            return self._build_url(target_file)
        return obj.file_url_fallback or "#"

    def get_downloadUrl(self, obj):
        return self.get_fileUrl(obj)

    def get_fileUrlEn(self, obj):
        target = obj.document_file_en or obj.document_file
        return self._build_url(target)

    def get_fileUrlSi(self, obj):
        return self._build_url(obj.document_file_si)

    def get_fileUrlTa(self, obj):
        return self._build_url(obj.document_file_ta)

    def get_availableLanguages(self, obj):
        langs = []
        if obj.document_file_en or obj.document_file:
            langs.append("en")
        if obj.document_file_si:
            langs.append("si")
        if obj.document_file_ta:
            langs.append("ta")
        if not langs:
            langs.append("en")
        return langs

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
    subheading = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    fileType = serializers.CharField(source="file_type")
    fileSize = serializers.CharField(source="file_size")
    fileUrl = serializers.SerializerMethodField()
    downloadUrl = serializers.SerializerMethodField()
    fileUrlEn = serializers.SerializerMethodField()
    fileUrlSi = serializers.SerializerMethodField()
    fileUrlTa = serializers.SerializerMethodField()
    availableLanguages = serializers.SerializerMethodField()
    publishedDate = serializers.SerializerMethodField()
    featured = serializers.BooleanField(source="is_featured")

    class Meta:
        model = RtiDocumentItem
        fields = [
            "id",
            "category",
            "title",
            "subheading",
            "description",
            "year",
            "fileType",
            "fileSize",
            "fileUrl",
            "downloadUrl",
            "fileUrlEn",
            "fileUrlSi",
            "fileUrlTa",
            "availableLanguages",
            "publishedDate",
            "featured",
            "order",
        ]

    def _get_lang(self):
        return self.context.get("language", "en")

    def _build_url(self, file_field):
        if not file_field:
            return None
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(file_field.url)
        return file_field.url

    def get_title(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.title_si:
            return obj.title_si
        if lang == "ta" and obj.title_ta:
            return obj.title_ta
        return obj.title_en

    def get_subheading(self, obj):
        lang = self._get_lang()
        return obj.get_subheading_for_lang(lang)

    def get_description(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.description_si:
            return obj.description_si
        if lang == "ta" and obj.description_ta:
            return obj.description_ta
        return obj.description_en

    def get_fileUrl(self, obj):
        lang = self._get_lang()
        target_file = obj.get_file_for_lang(lang)
        if target_file:
            return self._build_url(target_file)
        return obj.file_url_fallback or "#"

    def get_downloadUrl(self, obj):
        return self.get_fileUrl(obj)

    def get_fileUrlEn(self, obj):
        target = obj.document_file_en or obj.document_file
        return self._build_url(target)

    def get_fileUrlSi(self, obj):
        return self._build_url(obj.document_file_si)

    def get_fileUrlTa(self, obj):
        return self._build_url(obj.document_file_ta)

    def get_availableLanguages(self, obj):
        langs = []
        if obj.document_file_en or obj.document_file:
            langs.append("en")
        if obj.document_file_si:
            langs.append("si")
        if obj.document_file_ta:
            langs.append("ta")
        if not langs:
            langs.append("en")
        return langs

    def get_publishedDate(self, obj):
        if obj.display_date:
            return obj.display_date
        if obj.published_date:
            return obj.published_date.strftime("%d %B %Y")
        return ""
