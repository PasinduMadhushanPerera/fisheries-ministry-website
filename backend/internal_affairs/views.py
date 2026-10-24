from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import InternalAffairsOfficer, InternalAffairsDocument, InternalAffairsPageSettings
from .serializers import (
    InternalAffairsOfficerSerializer,
    InternalAffairsDocumentSerializer,
    InternalAffairsPageSettingsSerializer,
)


class InternalAffairsPageSettingsView(generics.RetrieveAPIView):
    serializer_class = InternalAffairsPageSettingsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        obj = InternalAffairsPageSettings.objects.first()
        if not obj:
            obj = InternalAffairsPageSettings.objects.create()
        return obj


class InternalAffairsOfficerListView(generics.ListAPIView):
    queryset = InternalAffairsOfficer.objects.filter(is_active=True).order_by("order", "id")
    serializer_class = InternalAffairsOfficerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class InternalAffairsDocumentListView(generics.ListAPIView):
    queryset = InternalAffairsDocument.objects.filter(is_active=True).order_by("order", "id")
    serializer_class = InternalAffairsDocumentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
