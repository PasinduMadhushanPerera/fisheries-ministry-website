from django.urls import path
from .views import PrivacyPageView

urlpatterns = [
    path("", PrivacyPageView.as_view(), name="privacy-page"),
]
