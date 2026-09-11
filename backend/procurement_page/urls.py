from django.urls import path
from .views import ProcurementPageDataView

urlpatterns = [
    path("", ProcurementPageDataView.as_view(), name="procurement-page-data"),
]
