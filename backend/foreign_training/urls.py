from django.urls import path
from .views import ForeignTrainingPageDataView

urlpatterns = [
    path("", ForeignTrainingPageDataView.as_view(), name="foreign-training-page-data"),
]
