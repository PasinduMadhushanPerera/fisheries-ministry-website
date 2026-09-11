from django.urls import path
from .views import RtiPageDataView

urlpatterns = [
    path("", RtiPageDataView.as_view(), name="rti_page_data"),
    path("page-data/", RtiPageDataView.as_view(), name="rti_page_data_alt"),
]
