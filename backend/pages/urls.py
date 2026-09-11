from django.urls import path
from .views import DynamicPageListView, DynamicPageDetailView

app_name = "pages"

urlpatterns = [
    path("", DynamicPageListView.as_view(), name="page-list"),
    path("<slug:slug>/", DynamicPageDetailView.as_view(), name="page-detail"),
]
