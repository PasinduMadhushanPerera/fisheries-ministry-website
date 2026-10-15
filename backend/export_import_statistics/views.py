from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    ExportImportHeader,
    ExportImportSummaryMetric,
    ExportImportYearCategory,
    ExportImportReport,
)
from .serializers import (
    ExportImportHeaderSerializer,
    ExportImportSummaryMetricSerializer,
    ExportImportYearCategorySerializer,
    ExportImportReportSerializer,
)


class ExportImportStatisticsDataView(APIView):
    """
    API endpoint returning all customizable sections of Statistics : Export and Import in the requested language (?lang=en/si/ta).
    Returns header information, trade summary KPI metrics, available years, category year groups, and active monthly trade reports.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = ExportImportHeader.objects.get_or_create(id=1)
        header_data = ExportImportHeaderSerializer(header, context=context).data

        metrics_query = ExportImportSummaryMetric.objects.filter(is_active=True).order_by("order", "id")
        metrics_data = ExportImportSummaryMetricSerializer(metrics_query, many=True, context=context).data

        categories_query = ExportImportYearCategory.objects.filter(is_active=True).order_by("-year", "order")
        categories_data = ExportImportYearCategorySerializer(categories_query, many=True, context=context).data

        reports_query = ExportImportReport.objects.filter(is_active=True).order_by("-year", "-month_number", "order")
        reports_data = ExportImportReportSerializer(reports_query, many=True, context=context).data

        # Calculate distinct years available
        years = list(
            ExportImportReport.objects.filter(is_active=True)
            .values_list("year", flat=True)
            .distinct()
            .order_by("-year")
        )

        return Response({
            "language": lang,
            "header": header_data,
            "summary_metrics": metrics_data,
            "available_years": years,
            "categories": categories_data,
            "reports": reports_data,
        })
