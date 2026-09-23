from rest_framework import serializers
from .models import (
    DownloadCategory,
    DownloadDocumentItem,
)


class DownloadCategorySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="category_id")
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    icon = serializers.CharField(source="icon_type")

    class Meta:
        model = DownloadCategory
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


class DownloadDocumentItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="item_id")
    category = serializers.CharField(source="category.category_id")
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
    featured = serializers.BooleanField(source="is_featured")

    class Meta:
        model = DownloadDocumentItem
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
            "fileUrlEn",
            "fileUrlSi",
            "fileUrlTa",
            "availableLanguages",
            "publishedDate",
            "language",
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
