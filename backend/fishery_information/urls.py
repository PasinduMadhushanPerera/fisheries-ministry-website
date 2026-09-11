from django.urls import path
from .views import FisheryInformationDataView

urlpatterns = [
    path("related-information/", FisheryInformationDataView.as_view(), name="fishery-related-information-data"),
    path("fishery-related-information/", FisheryInformationDataView.as_view(), name="fishery-related-information-alias"),
    path("fishery-information/", FisheryInformationDataView.as_view(), name="fishery-information-data-alias"),
]
