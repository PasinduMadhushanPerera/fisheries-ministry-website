from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import WeeklyFishPricesHeader, WeeklyPriceReport
from .serializers import (
    WeeklyFishPricesHeaderSerializer,
    WeeklyPriceReportSerializer,
)


class WeeklyFishPricesDataView(APIView):
    """
    API endpoint returning all customizable sections of Statistics : Weekly Fish Prices in the requested language (?lang=en/si/ta).
    Returns header information, available filter years, available months, and all active weekly price reports.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = WeeklyFishPricesHeader.objects.get_or_create(id=1)
        header_data = WeeklyFishPricesHeaderSerializer(header, context=context).data

        reports_query = WeeklyPriceReport.objects.filter(is_active=True).order_by("-year", "-month_number", "-week", "order")
        reports_data = WeeklyPriceReportSerializer(reports_query, many=True, context=context).data

        # Calculate distinct years available
        years = list(
            WeeklyPriceReport.objects.filter(is_active=True)
            .values_list("year", flat=True)
            .distinct()
            .order_by("-year")
        )

        return Response({
            "language": lang,
            "header": header_data,
            "available_years": years,
            "reports": reports_data,
        })
