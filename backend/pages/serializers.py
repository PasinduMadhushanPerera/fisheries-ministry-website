from rest_framework import serializers
from .models import DynamicPage


class DynamicPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DynamicPage
        fields = [
            "id",
            "title",
            "slug",
            "hero_title",
            "hero_subtitle",
            "badge_text",
            "banner_image",
            "content",
            "show_sidebar",
            "sidebar_title",
            "sidebar_content",
            "meta_title",
            "meta_description",
            "updated_at",
        ]
