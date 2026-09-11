from django.urls import path
from .views import WeeklyFishPricesDataView

urlpatterns = [
    path("weekly-fish-prices/", WeeklyFishPricesDataView.as_view(), name="weekly-fish-prices-data"),
]
