from django.urls import path
from .views import AboutPageDataView, AboutLeaderDetailView

app_name = "about"

urlpatterns = [
    path("", AboutPageDataView.as_view(), name="about-page-data"),
    path("leaders/<str:role_type>/", AboutLeaderDetailView.as_view(), name="about-leader-detail"),
]