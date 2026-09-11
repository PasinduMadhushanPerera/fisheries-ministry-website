from django.urls import path
from .views import VideoPageDataView, VideoDetailView

urlpatterns = [
    path("", VideoPageDataView.as_view(), name="videos-page-data"),
    path("<slug:slug>/", VideoDetailView.as_view(), name="video-detail"),
]
