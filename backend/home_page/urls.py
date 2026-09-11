from django.urls import path
from .views import HomePageDataView

app_name = "home_page"

urlpatterns = [
    path("", HomePageDataView.as_view(), name="home-data"),
]
