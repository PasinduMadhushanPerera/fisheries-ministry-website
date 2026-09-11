from django.urls import path
from .views import RecruitmentPageDataView

urlpatterns = [
    path("", RecruitmentPageDataView.as_view(), name="recruitment-page-data"),
]
