from rest_framework import serializers
from .models import (
    HomeHeroSlide,
    HomeQuickAccessItem,
    HomeNewsSection,
    HomeNewsCard,
    HomeServicesSection,
    HomeServiceCard,
    HomeQuickInfoSection,
    HomeQuickInfoCard,
    HomeInstitutionsSection,
    HomeInstitutionCard,
)


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


# ==========================================================
# 01. Hero Banner Slides Serializer
# ==========================================================
class HomeHeroSlideSerializer(serializers.ModelSerializer):
    eyebrow = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    highlighted_title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeHeroSlide
        fields = [
            "id",
            "order",
            "eyebrow",
            "title",
            "highlighted_title",
            "description",
            "eyebrow_en",
            "eyebrow_si",
            "eyebrow_ta",
            "title_en",
            "title_si",
            "title_ta",
            "highlighted_title_en",
            "highlighted_title_si",
            "highlighted_title_ta",
            "description_en",
            "description_si",
            "description_ta",
            "image_url",
            "image_alt",
        ]

    def get_eyebrow(self, obj):
        return resolve_lang(obj, "eyebrow", self.context)

    def get_title(self, obj):
        return resolve_lang(obj, "title", self.context)

    def get_highlighted_title(self, obj):
        return resolve_lang(obj, "highlighted_title", self.context)

    def get_description(self, obj):
        return resolve_lang(obj, "description", self.context)

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url_fallback


# ==========================================================
# 02. Quick Access Items Serializer
# ==========================================================
class HomeQuickAccessItemSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    aria_label = serializers.SerializerMethodField()

    class Meta:
        model = HomeQuickAccessItem
        fields = [
            "id",
            "title",
            "title_en",
            "title_si",
            "title_ta",
            "url",
            "icon_name",
            "aria_label",
            "aria_label_en",
            "aria_label_si",
            "aria_label_ta",
            "order",
        ]

    def get_title(self, obj):
        return resolve_lang(obj, "title", self.context)

    def get_aria_label(self, obj):
        return resolve_lang(obj, "aria_label", self.context)


# ==========================================================
# 03. News Card Serializer
# ==========================================================
class HomeNewsCardSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeNewsCard
        fields = [
            "id",
            "title",
            "category",
            "summary",
            "content",
            "title_en",
            "title_si",
            "title_ta",
            "category_en",
            "category_si",
            "category_ta",
            "summary_en",
            "summary_si",
            "summary_ta",
            "content_en",
            "content_si",
            "content_ta",
            "published_date",
            "image_url",
            "image_alt",
            "is_featured",
            "order",
        ]

    def get_title(self, obj):
        return resolve_lang(obj, "title", self.context)

    def get_category(self, obj):
        val = resolve_lang(obj, "category", self.context)
        if not val:
            val = resolve_lang(obj, "category_label", self.context)
        if not val and hasattr(obj, "get_category_display"):
            val = obj.get_category_display()
        return val or "Ministry News"

    def get_summary(self, obj):
        return resolve_lang(obj, "summary", self.context)

    def get_content(self, obj):
        return resolve_lang(obj, "content", self.context)

    def get_image_url(self, obj):
        if hasattr(obj, "image") and obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return getattr(obj, "image_url_fallback", "") or "/images/home/hero-fishing-harbour.jpg"


# ==========================================================
# 04. News Section Header Serializer
# ==========================================================
class HomeNewsSectionSerializer(serializers.ModelSerializer):
    eyebrow = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    button_text = serializers.SerializerMethodField()
    cards = serializers.SerializerMethodField()

    class Meta:
        model = HomeNewsSection
        fields = [
            "eyebrow",
            "title",
            "description",
            "button_text",
            "eyebrow_en",
            "eyebrow_si",
            "eyebrow_ta",
            "title_en",
            "title_si",
            "title_ta",
            "description_en",
            "description_si",
            "description_ta",
            "button_text_en",
            "button_text_si",
            "button_text_ta",
            "button_url",
            "max_articles",
            "cards",
        ]

    def get_eyebrow(self, obj):
        return resolve_lang(obj, "eyebrow", self.context)

    def get_title(self, obj):
        return resolve_lang(obj, "title", self.context)

    def get_description(self, obj):
        return resolve_lang(obj, "description", self.context)

    def get_button_text(self, obj):
        return resolve_lang(obj, "button_text", self.context)

    def get_cards(self, obj):
        limit = 5
        try:
            from news.models import NewsArticleItem
            from news.serializers import NewsArticleItemSerializer
            news_items = NewsArticleItem.objects.filter(is_active=True).order_by("-created_at", "-id")[:limit]
            if news_items.exists():
                return NewsArticleItemSerializer(news_items, many=True, context=self.context).data
        except Exception:
            pass

        return []


# ==========================================================
# 05. Service Card Serializer
# ==========================================================
class HomeServiceCardSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    button_text = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeServiceCard
        fields = [
            "id",
            "title",
            "category",
            "description",
            "button_text",
            "title_en",
            "title_si",
            "title_ta",
            "category_en",
            "category_si",
            "category_ta",
            "description_en",
            "description_si",
            "description_ta",
            "button_text_en",
            "button_text_si",
            "button_text_ta",
            "url",
            "image_url",
            "image_alt",
            "order",
        ]

    def get_title(self, obj):
        return resolve_lang(obj, "title", self.context)

    def get_category(self, obj):
        return resolve_lang(obj, "category", self.context)

    def get_description(self, obj):
        return resolve_lang(obj, "description", self.context)

    def get_button_text(self, obj):
        return resolve_lang(obj, "button_text", self.context)

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url_fallback


# ==========================================================
# 06. Services Section Header Serializer
# ==========================================================
class HomeServicesSectionSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    section_title = serializers.SerializerMethodField()
    section_description = serializers.SerializerMethodField()
    cards = serializers.SerializerMethodField()

    class Meta:
        model = HomeServicesSection
        fields = [
            "badge_text",
            "section_title",
            "section_description",
            "badge_text_en",
            "badge_text_si",
            "badge_text_ta",
            "section_title_en",
            "section_title_si",
            "section_title_ta",
            "section_description_en",
            "section_description_si",
            "section_description_ta",
            "cards",
        ]

    def get_badge_text(self, obj):
        return resolve_lang(obj, "badge_text", self.context)

    def get_section_title(self, obj):
        return resolve_lang(obj, "section_title", self.context)

    def get_section_description(self, obj):
        return resolve_lang(obj, "section_description", self.context)

    def get_cards(self, obj):
        cards = HomeServiceCard.objects.filter(is_active=True).order_by("order", "id")
        return HomeServiceCardSerializer(cards, many=True, context=self.context).data


# ==========================================================
# 07. Quick Info Card Serializer
# ==========================================================
class HomeQuickInfoCardSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    primary_button_label = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeQuickInfoCard
        fields = [
            "id",
            "title",
            "card_type",
            "description",
            "primary_button_label",
            "title_en",
            "title_si",
            "title_ta",
            "description_en",
            "description_si",
            "description_ta",
            "primary_button_label_en",
            "primary_button_label_si",
            "primary_button_label_ta",
            "url",
            "is_external",
            "image_url",
            "image_alt",
            "order",
        ]

    def get_title(self, obj):
        return resolve_lang(obj, "title", self.context)

    def get_description(self, obj):
        return resolve_lang(obj, "description", self.context)

    def get_primary_button_label(self, obj):
        return resolve_lang(obj, "primary_button_label", self.context)

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url_fallback


# ==========================================================
# 08. Quick Info Section Header Serializer
# ==========================================================
class HomeQuickInfoSectionSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    section_title = serializers.SerializerMethodField()
    section_description = serializers.SerializerMethodField()
    cards = serializers.SerializerMethodField()

    class Meta:
        model = HomeQuickInfoSection
        fields = [
            "badge_text",
            "section_title",
            "section_description",
            "badge_text_en",
            "badge_text_si",
            "badge_text_ta",
            "section_title_en",
            "section_title_si",
            "section_title_ta",
            "section_description_en",
            "section_description_si",
            "section_description_ta",
            "cards",
        ]

    def get_badge_text(self, obj):
        return resolve_lang(obj, "badge_text", self.context)

    def get_section_title(self, obj):
        return resolve_lang(obj, "section_title", self.context)

    def get_section_description(self, obj):
        return resolve_lang(obj, "section_description", self.context)

    def get_cards(self, obj):
        cards = HomeQuickInfoCard.objects.filter(is_active=True).order_by("order", "id")
        return HomeQuickInfoCardSerializer(cards, many=True, context=self.context).data


# ==========================================================
# 09. Institution Card Serializer
# ==========================================================
class HomeInstitutionCardSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeInstitutionCard
        fields = [
            "id",
            "acronym",
            "title",
            "description",
            "title_en",
            "title_si",
            "title_ta",
            "description_en",
            "description_si",
            "description_ta",
            "url",
            "is_external",
            "image_url",
            "image_alt",
            "order",
        ]

    def get_title(self, obj):
        return resolve_lang(obj, "title", self.context)

    def get_description(self, obj):
        return resolve_lang(obj, "description", self.context)

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url_fallback


# ==========================================================
# 10. Institutions Section Header Serializer
# ==========================================================
class HomeInstitutionsSectionSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    section_title = serializers.SerializerMethodField()
    section_description = serializers.SerializerMethodField()
    cards = serializers.SerializerMethodField()

    class Meta:
        model = HomeInstitutionsSection
        fields = [
            "badge_text",
            "section_title",
            "section_description",
            "badge_text_en",
            "badge_text_si",
            "badge_text_ta",
            "section_title_en",
            "section_title_si",
            "section_title_ta",
            "section_description_en",
            "section_description_si",
            "section_description_ta",
            "cards",
        ]

    def get_badge_text(self, obj):
        return resolve_lang(obj, "badge_text", self.context)

    def get_section_title(self, obj):
        return resolve_lang(obj, "section_title", self.context)

    def get_section_description(self, obj):
        return resolve_lang(obj, "section_description", self.context)

    def get_cards(self, obj):
        cards = HomeInstitutionCard.objects.filter(is_active=True).order_by("order", "id")
        return HomeInstitutionCardSerializer(cards, many=True, context=self.context).data
