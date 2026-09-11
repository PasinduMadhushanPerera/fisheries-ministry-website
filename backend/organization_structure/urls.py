from django.urls import path
from .views import OrganizationStructurePageDataView

urlpatterns = [
    path("", OrganizationStructurePageDataView.as_view(), name="organization-structure-page-data"),
]
