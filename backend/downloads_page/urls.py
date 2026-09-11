from django.urls import path
from .views import DownloadsPageDataView

urlpatterns = [
    path("", DownloadsPageDataView.as_view(), name="downloads_page_data"),
    path("page-data/", DownloadsPageDataView.as_view(), name="downloads_page_data_alt"),
]
