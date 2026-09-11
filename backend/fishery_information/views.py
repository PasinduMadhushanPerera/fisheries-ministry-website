from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    FisheryInformationHeader,
    FisheryInformationCategory,
    FisheryInformationItem,
)
from .serializers import (
    FisheryInformationHeaderSerializer,
    FisheryInformationCategorySerializer,
    FisheryInformationItemSerializer,
)


class FisheryInformationDataView(APIView):
    """
    API endpoint returning all customizable sections of Statistics : Fishery Related Information in the requested language (?lang=en/si/ta).
    Returns header information, 5 information categories, and all active fishery information items/datasets.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = FisheryInformationHeader.objects.get_or_create(id=1)
        header_data = FisheryInformationHeaderSerializer(header, context=context).data

        categories_query = FisheryInformationCategory.objects.filter(is_active=True).order_by("order", "id")
        categories_data = FisheryInformationCategorySerializer(categories_query, many=True, context=context).data

        items_query = FisheryInformationItem.objects.filter(is_active=True).select_related("category").order_by("category__order", "order", "id")
        items_data = FisheryInformationItemSerializer(items_query, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "categories": categories_data,
            "items": items_data,
        })
