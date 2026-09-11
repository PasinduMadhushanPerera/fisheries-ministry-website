from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import MonthlyFishProductionHeader, MonthlyProductionReport
from .serializers import (
    MonthlyFishProductionHeaderSerializer,
    MonthlyProductionReportSerializer,
)


class MonthlyFishProductionDataView(APIView):
    """
    API endpoint returning all customizable sections of Statistics : Monthly Fish Production in the requested language (?lang=en/si/ta).
    Returns header information, available years, and all active monthly production reports.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = MonthlyFishProductionHeader.objects.get_or_create(id=1)
        header_data = MonthlyFishProductionHeaderSerializer(header, context=context).data

        reports_query = MonthlyProductionReport.objects.filter(is_active=True).order_by("-is_featured", "-year", "-month_number", "order")
        reports_data = MonthlyProductionReportSerializer(reports_query, many=True, context=context).data

        # Calculate distinct years available
        years = list(
            MonthlyProductionReport.objects.filter(is_active=True)
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
