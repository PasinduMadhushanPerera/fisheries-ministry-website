from django.urls import path
from .views import LocalTrainingPageDataView

urlpatterns = [
    path("", LocalTrainingPageDataView.as_view(), name="local-training-page-data"),
]
