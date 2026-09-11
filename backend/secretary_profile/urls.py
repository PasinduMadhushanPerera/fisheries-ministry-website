from django.urls import path
from .views import SecretaryPageDataView

urlpatterns = [
    path("", SecretaryPageDataView.as_view(), name="secretary-page-data"),
]
