from rest_framework import generics, permissions
from .models import MenuItem
from .serializers import MenuItemTreeSerializer


class NavigationMenuView(generics.ListAPIView):
    """
    Public API endpoint returning the full dynamic navigation menu tree
    (top-level tabs and nested dropdown child items).
    """
    serializer_class = MenuItemTreeSerializer
    permission_classes = [permissions.AllowAny]
    queryset = (
        MenuItem.objects.filter(parent__isnull=True, is_active=True)
        .prefetch_related("children")
        .order_by("order", "id")
    )
