from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import NoticePageHeader, NoticeItem
from .serializers import NoticePageHeaderSerializer, NoticeItemSerializer


class NoticePageDataView(APIView):
    """
    API endpoint returning all customizable sections of Media Centre : Notices in the requested language (?lang=en/si/ta).
    Returns all active notices ordered by featured status and newly added date/time.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = NoticePageHeader.objects.get_or_create(id=1)
        header_data = NoticePageHeaderSerializer(header, context=context).data

        notices_query = NoticeItem.objects.filter(is_active=True).order_by(
            "-is_featured", "-created_at", "-id"
        )

        limit_param = request.GET.get("limit")
        if limit_param:
            try:
                limit_val = int(limit_param)
                if limit_val > 0:
                    notices_query = notices_query[:limit_val]
            except (ValueError, TypeError):
                pass

        notices_data = NoticeItemSerializer(notices_query, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "notices": notices_data,
        })


class NoticeDetailView(APIView):
    """
    API endpoint returning a single notice by slug in the requested language.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        try:
            notice = NoticeItem.objects.get(slug=slug, is_active=True)
            notice_data = NoticeItemSerializer(notice, context=context).data
            return Response(notice_data)
        except NoticeItem.DoesNotExist:
            return Response({"error": "Notice not found"}, status=status.HTTP_404_NOT_FOUND)