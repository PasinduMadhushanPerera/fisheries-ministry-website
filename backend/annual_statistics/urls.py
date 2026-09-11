from django.urls import path
from .views import AnnualStatisticsDataView

urlpatterns = [
    path("annual-reports/", AnnualStatisticsDataView.as_view(), name="annual-statistics-data"),
]
