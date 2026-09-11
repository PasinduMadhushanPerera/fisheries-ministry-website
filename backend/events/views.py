from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import EventPageHeader, EventItem
from .serializers import EventPageHeaderSerializer, EventItemSerializer


class EventPageDataView(APIView):
    """
    API endpoint returning all customizable sections of Media Centre : Events & Programmes in the requested language (?lang=en/si/ta).
    Returns all active events ordered by featured status and newly added date/time.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = EventPageHeader.objects.get_or_create(id=1)
        header_data = EventPageHeaderSerializer(header, context=context).data

        events_query = EventItem.objects.filter(is_active=True).order_by(
            "-is_featured", "-created_at", "-id"
        )

        limit_param = request.GET.get("limit")
        if limit_param:
            try:
                limit_val = int(limit_param)
                if limit_val > 0:
                    events_query = events_query[:limit_val]
            except (ValueError, TypeError):
                pass

        events_data = EventItemSerializer(events_query, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "events": events_data,
        })


class EventDetailView(APIView):
    """
    API endpoint returning a single event item by slug in the requested language.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        try:
            item = EventItem.objects.get(slug=slug, is_active=True)
            item_data = EventItemSerializer(item, context=context).data
            return Response(item_data)
        except EventItem.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
