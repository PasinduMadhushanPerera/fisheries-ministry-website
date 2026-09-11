from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    FisheriesStatisticsHeader,
    FisheriesSummaryMetric,
    StatisticsCategory,
)
from .serializers import (
    FisheriesStatisticsHeaderSerializer,
    FisheriesSummaryMetricSerializer,
    StatisticsCategorySerializer,
)


class FisheriesAtAGlanceDataView(APIView):
    """
    API endpoint returning all customizable sections of Statistics : Fisheries at a Glance in the requested language (?lang=en/si/ta).
    Returns header, top summary metric cards, and statistical category accordion sections with detailed breakdown tables.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = FisheriesStatisticsHeader.objects.get_or_create(id=1)
        header_data = FisheriesStatisticsHeaderSerializer(header, context=context).data

        summary_cards_query = FisheriesSummaryMetric.objects.filter(is_active=True).order_by("order", "id")
        summary_cards_data = FisheriesSummaryMetricSerializer(summary_cards_query, many=True, context=context).data

        categories_query = StatisticsCategory.objects.filter(is_active=True).prefetch_related("rows").order_by("order", "id")
        categories_data = StatisticsCategorySerializer(categories_query, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "summary_cards": summary_cards_data,
            "sections": categories_data,
        })
