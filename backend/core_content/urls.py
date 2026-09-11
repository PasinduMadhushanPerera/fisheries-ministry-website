from django.urls import path
from .views import (
    InstitutionListView,
    ProcurementTenderListView,
    CareerRecruitmentListView,
    TrainingProgrammeListView,
    PressReleaseListView,
    PressReleaseDetailView,
    SiteSettingView,
)

app_name = "core_content"

urlpatterns = [
    path("institutions/", InstitutionListView.as_view(), name="institution-list"),
    path("tenders/", ProcurementTenderListView.as_view(), name="tender-list"),
    path("recruitment/", CareerRecruitmentListView.as_view(), name="recruitment-list"),
    path("training/", TrainingProgrammeListView.as_view(), name="training-list"),
    path("press-releases/", PressReleaseListView.as_view(), name="press-release-list"),
    path("press-releases/<slug:slug>/", PressReleaseDetailView.as_view(), name="press-release-detail"),
    path("settings/", SiteSettingView.as_view(), name="site-settings"),
]
