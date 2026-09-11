from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ProcurementPageHeader, ProcurementTenderItem
from .serializers import ProcurementPageHeaderSerializer, ProcurementTenderItemSerializer


class ProcurementPageDataView(APIView):
    """
    API endpoint returning all customizable sections of Procurement & Tenders in the requested language (?lang=en/si/ta).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = ProcurementPageHeader.objects.get_or_create(id=1)
        header_data = ProcurementPageHeaderSerializer(header, context=context).data

        tenders = ProcurementTenderItem.objects.filter(is_active=True).order_by("-year", "order", "-id")
        tenders_data = ProcurementTenderItemSerializer(tenders, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "tenders": tenders_data,
        })
