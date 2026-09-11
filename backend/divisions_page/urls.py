from django.urls import path
from .views import DivisionsPageDataView

urlpatterns = [
    path("", DivisionsPageDataView.as_view(), name="divisions-page-data"),
]
