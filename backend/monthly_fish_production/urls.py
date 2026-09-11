from django.urls import path
from .views import MonthlyFishProductionDataView

urlpatterns = [
    path("monthly-fish-production/", MonthlyFishProductionDataView.as_view(), name="monthly-fish-production-data"),
]
