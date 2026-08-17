from django.urls import path
from .views import NoticePageDataView, NoticeDetailView

urlpatterns = [
    path("", NoticePageDataView.as_view(), name="notices-page-data"),
    path("<slug:slug>/", NoticeDetailView.as_view(), name="notice-detail"),
]