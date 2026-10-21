from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    RtiPageSettings,
    RtiOfficer,
    RtiLegalDocument,
    RtiCategory,
    RtiDocumentItem,
)
from .serializers import (
    RtiPageSettingsSerializer,
    RtiOfficerSerializer,
    RtiLegalDocumentSerializer,
    RtiCategorySerializer,
    RtiDocumentItemSerializer,
)


class RtiPageDataView(APIView):
    """
    Public API endpoint returning localized RTI Portal data:
    - 00. Page Settings & Section Headers
    - 01. Designated & Information Officers
    - 02. Legal Framework & Acts
    - 03. RTI Information Categories (7 core sections)
    - 04. RTI Library Documents, Forms & Proactive Disclosures
    """

    def get(self, request, *args, **kwargs):
        lang = request.query_params.get("lang", "en")
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        serializer_context = {
            "request": request,
            "language": lang,
        }

        # 0. Page Settings & Headers
        settings_obj, _ = RtiPageSettings.objects.get_or_create(id=1)
        settings_data = RtiPageSettingsSerializer(settings_obj, context=serializer_context).data

        # 1. Officers
        officers_qs = RtiOfficer.objects.filter(is_active=True).order_by("order", "id")
        officers_data = RtiOfficerSerializer(officers_qs, many=True, context=serializer_context).data

        # 2. Legal Documents
        legal_qs = RtiLegalDocument.objects.filter(is_active=True).order_by("order", "id")
        legal_data = RtiLegalDocumentSerializer(legal_qs, many=True, context=serializer_context).data

        # 3. Categories
        categories_qs = RtiCategory.objects.filter(is_active=True).order_by("order", "id")
        categories_data = RtiCategorySerializer(categories_qs, many=True, context=serializer_context).data

        # 4. Document Items
        docs_qs = RtiDocumentItem.objects.filter(is_active=True, category__is_active=True).order_by(
            "category__order", "order", "id"
        )
        docs_data = RtiDocumentItemSerializer(docs_qs, many=True, context=serializer_context).data

        return Response(
            {
                "settings": settings_data,
                "header": settings_data,
                "officers": officers_data,
                "legalDocuments": legal_data,
                "categories": categories_data,
                "documents": docs_data,
            },
            status=status.HTTP_200_OK,
        )
