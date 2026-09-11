from rest_framework import serializers
from .models import MenuItem


class MenuItemChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = [
            "id",
            "title",
            "url",
            "description",
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
            "url",
            "description",
            "badge",
            "order",
            "is_external",
            "children",
        ]

    def get_children(self, obj):
        children = obj.children.filter(is_active=True).order_by("order", "id")
        return MenuItemChildSerializer(children, many=True).data
