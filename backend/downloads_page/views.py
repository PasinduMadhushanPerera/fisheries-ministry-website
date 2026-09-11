from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    DownloadCategory,
    DownloadDocumentItem,
)
from .serializers import (
    DownloadCategorySerializer,
    DownloadDocumentItemSerializer,
)


class DownloadsPageDataView(APIView):
    """
    Public API endpoint returning full localized Downloads Centre data:
    - 01. Download Categories (12 core categories)
    - 02. Featured Publications & Strategic Disclosures
    - 03. Full Download Library Documents & Files
    """

    def get(self, request, *args, **kwargs):
        lang = request.query_params.get("lang", "en")
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        serializer_context = {
            "request": request,
            "language": lang,
        }

        # 1. Categories
        categories_qs = DownloadCategory.objects.filter(is_active=True).order_by("order", "id")
        categories_data = DownloadCategorySerializer(categories_qs, many=True, context=serializer_context).data

        # 2. Featured Documents
        featured_qs = DownloadDocumentItem.objects.filter(
            is_active=True,
            is_featured=True,
            category__is_active=True,
        ).order_by("order", "id")
        featured_data = DownloadDocumentItemSerializer(featured_qs, many=True, context=serializer_context).data

        # 3. All Documents
        docs_qs = DownloadDocumentItem.objects.filter(
            is_active=True,
            category__is_active=True,
        ).order_by("category__order", "order", "id")
        docs_data = DownloadDocumentItemSerializer(docs_qs, many=True, context=serializer_context).data

        return Response(
            {
                "categories": categories_data,
                "featuredDocuments": featured_data,
                "documents": docs_data,
            },
            status=status.HTTP_200_OK,
        )
