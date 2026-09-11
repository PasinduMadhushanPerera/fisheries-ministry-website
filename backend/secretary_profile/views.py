from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SecretaryProfile, SecretaryMessage, SecretarySecretariat
from .serializers import (
    SecretaryProfileSerializer,
    SecretaryMessageSerializer,
    SecretarySecretariatSerializer,
)


class SecretaryProfileDataView(APIView):
    """
    Combined API endpoint returning all customizable sections of the Ministry Secretary Profile Page in the requested language (?lang=en/si/ta).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        profile, _ = SecretaryProfile.objects.get_or_create(id=1)
        profile_data = SecretaryProfileSerializer(profile, context=context).data

        message, _ = SecretaryMessage.objects.get_or_create(id=1)
        message_data = SecretaryMessageSerializer(message, context=context).data

        secretariat, _ = SecretarySecretariat.objects.get_or_create(id=1)
        secretariat_data = SecretarySecretariatSerializer(secretariat, context=context).data

        return Response({
            "language": lang,
            "profile": profile_data,
            "message": message_data,
            "secretariat": secretariat_data,
        })


SecretaryPageDataView = SecretaryProfileDataView

