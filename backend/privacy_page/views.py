from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import PrivacyPageSettings, PrivacySection
from .serializers import PrivacyPageSettingsSerializer, PrivacySectionSerializer


class PrivacyPageView(APIView):
    """
    Returns complete Privacy & Data Protection Page configuration,
    hero banner, callout texts, ordered sections, and contact desk details.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        lang = request.query_params.get("lang", "en")
        context = {"lang": lang}

        settings_obj = PrivacyPageSettings.objects.first()
        if not settings_obj:
            settings_obj = PrivacyPageSettings.objects.create()

        settings_data = PrivacyPageSettingsSerializer(settings_obj, context=context).data

        sections = PrivacySection.objects.filter(is_active=True).order_by("order", "id")
        sections_data = PrivacySectionSerializer(sections, many=True, context=context).data

        return Response({
            "settings": settings_data,
            "sections": sections_data,
        })
