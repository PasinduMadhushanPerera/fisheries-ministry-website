from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PressReleasePageHeader, PressReleaseItem
from .serializers import PressReleasePageHeaderSerializer, PressReleaseItemSerializer


class PressReleasePageDataView(APIView):
    """
    API endpoint returning all customizable sections of Media Centre : Press Releases in the requested language (?lang=en/si/ta).
    Returns all active press releases ordered by featured status and newly added date/time.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = PressReleasePageHeader.objects.get_or_create(id=1)
        header_data = PressReleasePageHeaderSerializer(header, context=context).data

        releases_query = PressReleaseItem.objects.filter(is_active=True).order_by(
            "-is_featured", "-created_at", "-id"
        )

        limit_param = request.GET.get("limit")
        if limit_param:
            try:
                limit_val = int(limit_param)
                if limit_val > 0:
                    releases_query = releases_query[:limit_val]
            except (ValueError, TypeError):
                pass

        releases_data = PressReleaseItemSerializer(releases_query, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "press_releases": releases_data,
        })


class PressReleaseDetailView(APIView):
    """
    API endpoint returning a single press release by slug in the requested language.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        try:
            item = PressReleaseItem.objects.get(slug=slug, is_active=True)
            item_data = PressReleaseItemSerializer(item, context=context).data
            return Response(item_data)
        except PressReleaseItem.DoesNotExist:
            return Response({"error": "Press release not found"}, status=status.HTTP_404_NOT_FOUND)
