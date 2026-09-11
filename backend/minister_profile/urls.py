from django.urls import path
from .views import MinisterPageDataView

urlpatterns = [
    path("", MinisterPageDataView.as_view(), name="minister-page-data"),
]
