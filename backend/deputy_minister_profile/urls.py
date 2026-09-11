from django.urls import path
from .views import DeputyMinisterPageDataView

urlpatterns = [
    path("", DeputyMinisterPageDataView.as_view(), name="deputy-minister-page-data"),
]
