from django.urls import path
from .views import FisheriesAtAGlanceDataView

urlpatterns = [
    path("at-a-glance/", FisheriesAtAGlanceDataView.as_view(), name="fisheries-at-a-glance-data"),
]
