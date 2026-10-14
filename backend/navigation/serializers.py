from rest_framework import serializers
from .models import MenuItem


class MenuItemChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = [
            "id",
            "title",
            "title_si",
            "title_ta",
            "url",
            "description",
            "description_si",
            "description_ta",
            "badge",
            "order",
            "is_external",
        ]


class MenuItemTreeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = [
            "id",
            "title",
            "title_si",
            "title_ta",
            "url",
            "description",
            "description_si",
            "description_ta",
            "badge",
            "order",
            "is_external",
            "children",
        ]

    def get_children(self, obj):
        direct_children = obj.children.filter(is_active=True)
        sub_children = MenuItem.objects.filter(parent__parent=obj, is_active=True)
        all_children = (direct_children | sub_children).distinct().order_by("order", "id")
        return MenuItemChildSerializer(all_children, many=True).data
