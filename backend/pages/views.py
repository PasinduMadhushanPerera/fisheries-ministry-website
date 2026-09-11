from rest_framework import generics, permissions
from .models import DynamicPage
from .serializers import DynamicPageSerializer


class DynamicPageListView(generics.ListAPIView):
    """
    List all published dynamic pages.
    """
    serializer_class = DynamicPageSerializer
    permission_classes = [permissions.AllowAny]
    queryset = DynamicPage.objects.filter(is_published=True)


class DynamicPageDetailView(generics.RetrieveAPIView):
    """
    Retrieve single published dynamic page by its URL slug.
    """
    serializer_class = DynamicPageSerializer
    permission_classes = [permissions.AllowAny]
    queryset = DynamicPage.objects.filter(is_published=True)
    lookup_field = "slug"
