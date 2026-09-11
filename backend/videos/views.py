from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import VideoPageHeader, VideoItem
from .serializers import VideoPageHeaderSerializer, VideoItemSerializer


class VideoPageDataView(APIView):
    """
    API endpoint returning all customizable sections of Media Centre : Videos in the requested language (?lang=en/si/ta).
    Returns all active videos ordered by featured status and newly added date/time.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = VideoPageHeader.objects.get_or_create(id=1)
        header_data = VideoPageHeaderSerializer(header, context=context).data

        videos_query = VideoItem.objects.filter(is_active=True).order_by(
            "-is_featured", "-created_at", "-id"
        )

        limit_param = request.GET.get("limit")
        if limit_param:
            try:
                limit_val = int(limit_param)
                if limit_val > 0:
                    videos_query = videos_query[:limit_val]
            except (ValueError, TypeError):
                pass

        videos_data = VideoItemSerializer(videos_query, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "videos": videos_data,
        })


class VideoDetailView(APIView):
    """
    API endpoint returning a single video item by slug in the requested language.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        try:
            item = VideoItem.objects.get(slug=slug, is_active=True)
            item_data = VideoItemSerializer(item, context=context).data
            return Response(item_data)
        except VideoItem.DoesNotExist:
            return Response({"error": "Video not found"}, status=status.HTTP_404_NOT_FOUND)
