from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import GalleryPageHeader, GalleryAlbum
from .serializers import GalleryPageHeaderSerializer, GalleryAlbumSerializer


class GalleryPageDataView(APIView):
    """
    API endpoint returning all customizable sections of Media Centre : Gallery in the requested language (?lang=en/si/ta).
    Returns all active gallery albums ordered by featured status and newly added date/time.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = GalleryPageHeader.objects.get_or_create(id=1)
        header_data = GalleryPageHeaderSerializer(header, context=context).data

        albums_query = GalleryAlbum.objects.filter(is_active=True).prefetch_related("images").order_by(
            "-is_featured", "-created_at", "-id"
        )

        limit_param = request.GET.get("limit")
        if limit_param:
            try:
                limit_val = int(limit_param)
                if limit_val > 0:
                    albums_query = albums_query[:limit_val]
            except (ValueError, TypeError):
                pass

        albums_data = GalleryAlbumSerializer(albums_query, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "albums": albums_data,
        })


class GalleryAlbumDetailView(APIView):
    """
    API endpoint returning a single gallery album by slug in the requested language.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        try:
            item = GalleryAlbum.objects.prefetch_related("images").get(slug=slug, is_active=True)
            item_data = GalleryAlbumSerializer(item, context=context).data
            return Response(item_data)
        except GalleryAlbum.DoesNotExist:
            return Response({"error": "Gallery album not found"}, status=status.HTTP_404_NOT_FOUND)
