from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    ForeignTrainingPageHeader,
    ForeignTrainingCategory,
    ForeignTrainingProgramme,
)
from .serializers import (
    ForeignTrainingPageHeaderSerializer,
    ForeignTrainingCategorySerializer,
    ForeignTrainingProgrammeSerializer,
)


class ForeignTrainingPageDataView(APIView):
    """
    API endpoint returning all customizable sections of Foreign Training in the requested language (?lang=en/si/ta).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = ForeignTrainingPageHeader.objects.get_or_create(id=1)
        header_data = ForeignTrainingPageHeaderSerializer(header, context=context).data

        categories = ForeignTrainingCategory.objects.filter(is_active=True).order_by("order", "id")
        categories_data = ForeignTrainingCategorySerializer(categories, many=True, context=context).data

        programmes = ForeignTrainingProgramme.objects.filter(is_active=True).order_by("-year", "order", "-id")
        programmes_data = ForeignTrainingProgrammeSerializer(programmes, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "categories": categories_data,
            "programmes": programmes_data,
        })
