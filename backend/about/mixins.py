from common.choices import Language


class TranslationMixin:
    """
    Reusable translation helper.
    """

    def get_requested_language(self):
        request = self.context.get("request")

        if not request:
            return Language.ENGLISH

        language = request.query_params.get(
            "lang",
            Language.ENGLISH,
        )

        supported = {
            choice[0]
            for choice in Language.choices
        }

        if language not in supported:
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

            for translation in translations:
                if translation.language == Language.ENGLISH:
                    return translation

            return (
                translations[0]
                if translations
                else None
            )

        translation = obj.translations.filter(
            language=language,
        ).first()

        if translation:
            return translation

        return obj.translations.filter(
            language=Language.ENGLISH,
        ).first()