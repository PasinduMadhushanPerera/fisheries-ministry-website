from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import LocalTrainingPageHeader, LocalTrainingProgramme
from .serializers import LocalTrainingPageHeaderSerializer, LocalTrainingProgrammeSerializer


class LocalTrainingPageDataView(APIView):
    """
    API endpoint returning all customizable sections of Local Training in the requested language (?lang=en/si/ta).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = LocalTrainingPageHeader.objects.get_or_create(id=1)
        header_data = LocalTrainingPageHeaderSerializer(header, context=context).data

        programmes = LocalTrainingProgramme.objects.filter(is_active=True).order_by("-year", "order", "-id")
        programmes_data = LocalTrainingProgrammeSerializer(programmes, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "programmes": programmes_data,
        })
