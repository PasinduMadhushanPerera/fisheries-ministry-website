from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import DivisionsPageIntro, MinistryDivision
from .serializers import DivisionsPageIntroSerializer, MinistryDivisionSerializer


class DivisionsPageDataView(APIView):
    """
    Combined API endpoint returning all customizable sections of the Ministry Divisions Page in the requested language (?lang=en/si/ta).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        intro, _ = DivisionsPageIntro.objects.get_or_create(id=1)
        intro_data = DivisionsPageIntroSerializer(intro, context=context).data

        divisions = MinistryDivision.objects.filter(is_active=True).order_by("order", "id")
        divisions_data = MinistryDivisionSerializer(divisions, many=True, context=context).data

        return Response({
            "language": lang,
            "intro": intro_data,
            "divisions": divisions_data,
        })
