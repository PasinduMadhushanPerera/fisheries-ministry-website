from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import MinisterProfile, MinisterMessage, MinisterSecretariat
from .serializers import (
    MinisterProfileSerializer,
    MinisterMessageSerializer,
    MinisterSecretariatSerializer,
)


class MinisterProfileDataView(APIView):
    """
    Combined API endpoint returning all customizable sections of the Hon. Minister Profile Page in the requested language (?lang=en/si/ta).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        profile, _ = MinisterProfile.objects.get_or_create(id=1)
        profile_data = MinisterProfileSerializer(profile, context=context).data

        message, _ = MinisterMessage.objects.get_or_create(id=1)
        message_data = MinisterMessageSerializer(message, context=context).data

        secretariat, _ = MinisterSecretariat.objects.get_or_create(id=1)
        secretariat_data = MinisterSecretariatSerializer(secretariat, context=context).data

        return Response({
            "language": lang,
            "profile": profile_data,
            "message": message_data,
            "secretariat": secretariat_data,
        })


MinisterPageDataView = MinisterProfileDataView

