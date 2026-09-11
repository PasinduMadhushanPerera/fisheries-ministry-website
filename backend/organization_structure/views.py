from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import OrganizationStructureChart
from .serializers import OrganizationStructureChartSerializer


class OrganizationStructureDataView(APIView):
    """
    Combined API endpoint returning all customizable data for the Organization Structure Page in the requested language (?lang=en/si/ta).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        chart, _ = OrganizationStructureChart.objects.get_or_create(id=1)
        chart_data = OrganizationStructureChartSerializer(chart, context=context).data

        return Response({
            "language": lang,
            "chart": chart_data,
            "structure": chart_data,
        })


OrganizationStructurePageDataView = OrganizationStructureDataView

