from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import DeputyMinisterProfile, DeputyMinisterMessage, DeputyMinisterSecretariat
from .serializers import (
    DeputyMinisterProfileSerializer,
    DeputyMinisterMessageSerializer,
    DeputyMinisterSecretariatSerializer,
)


class DeputyMinisterProfileDataView(APIView):
    """
    Combined API endpoint returning all customizable sections of the Hon. Deputy Minister Profile Page in the requested language (?lang=en/si/ta).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        profile, _ = DeputyMinisterProfile.objects.get_or_create(id=1)
        profile_data = DeputyMinisterProfileSerializer(profile, context=context).data

        message, _ = DeputyMinisterMessage.objects.get_or_create(id=1)
        message_data = DeputyMinisterMessageSerializer(message, context=context).data

        secretariat, _ = DeputyMinisterSecretariat.objects.get_or_create(id=1)
        secretariat_data = DeputyMinisterSecretariatSerializer(secretariat, context=context).data

        return Response({
            "language": lang,
            "profile": profile_data,
            "message": message_data,
            "secretariat": secretariat_data,
        })


DeputyMinisterPageDataView = DeputyMinisterProfileDataView

