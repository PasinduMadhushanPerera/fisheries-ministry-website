from django.urls import path
from .views import PressReleasePageDataView, PressReleaseDetailView

urlpatterns = [
    path("", PressReleasePageDataView.as_view(), name="press-releases-page-data"),
    path("<slug:slug>/", PressReleaseDetailView.as_view(), name="press-release-detail"),
]
