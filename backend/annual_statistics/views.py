from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    AnnualStatisticsHeader,
    AnnualStatisticsYearCategory,
    AnnualStatisticsReport,
)
from .serializers import (
    AnnualStatisticsHeaderSerializer,
    AnnualStatisticsYearCategorySerializer,
    AnnualStatisticsReportSerializer,
)


class AnnualStatisticsDataView(APIView):
    """
    API endpoint returning all customizable sections of Statistics : Annual Reports in the requested language (?lang=en/si/ta).
    Returns header information, available years, category year groups, and all active reports.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = AnnualStatisticsHeader.objects.get_or_create(id=1)
        header_data = AnnualStatisticsHeaderSerializer(header, context=context).data

        categories_query = AnnualStatisticsYearCategory.objects.filter(is_active=True).order_by("-year", "order")
        categories_data = AnnualStatisticsYearCategorySerializer(categories_query, many=True, context=context).data

        reports_query = AnnualStatisticsReport.objects.filter(is_active=True).order_by("-is_featured", "-year", "order", "id")
        reports_data = AnnualStatisticsReportSerializer(reports_query, many=True, context=context).data

        # Calculate distinct years available
        years = list(
            AnnualStatisticsReport.objects.filter(is_active=True)
            .values_list("year", flat=True)
            .distinct()
            .order_by("-year")
        )

        return Response({
            "language": lang,
            "header": header_data,
            "available_years": years,
            "categories": categories_data,
            "reports": reports_data,
        })
