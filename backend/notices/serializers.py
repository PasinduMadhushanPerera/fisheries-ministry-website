from rest_framework import serializers

from common.choices import Language

from .models import Notice, NoticeAttachment, NoticeCategory


class NoticeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeCategory
        fields = [
            "id",
            "name",
            "slug",
        ]


class NoticeAttachmentSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = NoticeAttachment
        fields = [
            "id",
            "title",
            "file",
            "file_url",
        ]

    def get_file_url(self, obj):
        if not obj.file:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(obj.file.url)

        return obj.file.url


class NoticeSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    seo_title = serializers.SerializerMethodField()
    seo_description = serializers.SerializerMethodField()

    category = NoticeCategorySerializer(read_only=True)
    attachments = NoticeAttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = Notice
        fields = [
            "id",
            "category",
            "status",
            "priority",
            "published_at",
            "expires_at",
            "title",
            "slug",
            "summary",
            "content",
            "seo_title",
            "seo_description",
            "attachments",
            "created_at",
            "updated_at",
        ]

    def get_requested_language(self):
        request = self.context.get("request")

        if not request:
            return Language.ENGLISH

        language = request.query_params.get(
            "lang",
            Language.ENGLISH,
        )

        supported_languages = {
            choice[0] for choice in Language.choices
        }

        if language not in supported_languages:
            return Language.ENGLISH

        return language

    def get_translation(self, obj):
        language = self.get_requested_language()

        translations = getattr(
            obj,
            "prefetched_translations",
            None,
        )

        if translations is not None:
            for translation in translations:
                if translation.language == language:
                    return translation

            return None

        return obj.translations.filter(
            language=language,
        ).first()

    def get_title(self, obj):
        translation = self.get_translation(obj)
        return translation.title if translation else None

    def get_slug(self, obj):
        translation = self.get_translation(obj)
        return translation.slug if translation else None

    def get_summary(self, obj):
        translation = self.get_translation(obj)
        return translation.summary if translation else None

    def get_content(self, obj):
        translation = self.get_translation(obj)
        return translation.content if translation else None

    def get_seo_title(self, obj):
        translation = self.get_translation(obj)
        return translation.seo_title if translation else None

    def get_seo_description(self, obj):
        translation = self.get_translation(obj)
        return (
            translation.seo_description
            if translation
            else None
        )

class NoticeListSerializer(NoticeSerializer):
    """Serializer used for the notice list endpoint."""

    pass


class NoticeDetailSerializer(NoticeSerializer):
    """Serializer used for the notice detail endpoint."""

    pass