from rest_framework import generics, permissions
from .models import (
    InstitutionEntity,
    ProcurementTender,
    CareerRecruitment,
    TrainingProgramme,
    PressRelease,
    SiteSetting,
)
from .serializers import (
    InstitutionEntitySerializer,
    ProcurementTenderSerializer,
    CareerRecruitmentSerializer,
    TrainingProgrammeSerializer,
    PressReleaseSerializer,
    SiteSettingSerializer,
)


class InstitutionListView(generics.ListAPIView):
    serializer_class = InstitutionEntitySerializer
    permission_classes = [permissions.AllowAny]
    queryset = InstitutionEntity.objects.filter(is_active=True).order_by("order", "id")


class ProcurementTenderListView(generics.ListAPIView):
    serializer_class = ProcurementTenderSerializer
    permission_classes = [permissions.AllowAny]
    queryset = ProcurementTender.objects.filter(is_active=True).order_by("-closing_date", "-created_at")


class CareerRecruitmentListView(generics.ListAPIView):
    serializer_class = CareerRecruitmentSerializer
    permission_classes = [permissions.AllowAny]
    queryset = CareerRecruitment.objects.filter(is_active=True).order_by("-closing_date", "-created_at")


class TrainingProgrammeListView(generics.ListAPIView):
    serializer_class = TrainingProgrammeSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = TrainingProgramme.objects.filter(is_active=True).order_by("-deadline", "-created_at")
        training_type = self.request.query_params.get("type")
        if training_type:
            queryset = queryset.filter(training_type=training_type)
        return queryset


class PressReleaseListView(generics.ListAPIView):
    serializer_class = PressReleaseSerializer
    permission_classes = [permissions.AllowAny]
    queryset = PressRelease.objects.filter(is_published=True).order_by("-published_date", "-created_at")


class PressReleaseDetailView(generics.RetrieveAPIView):
    serializer_class = PressReleaseSerializer
    permission_classes = [permissions.AllowAny]
    queryset = PressRelease.objects.filter(is_published=True)
    lookup_field = "slug"


class SiteSettingView(generics.RetrieveAPIView):
    serializer_class = SiteSettingSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        setting, _ = SiteSetting.objects.get_or_create(id=1)
        return setting
