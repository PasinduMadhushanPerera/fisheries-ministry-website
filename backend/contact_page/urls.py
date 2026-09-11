from django.urls import path
from .views import ContactPageView, SubmitContactFormView

urlpatterns = [
    path("", ContactPageView.as_view(), name="contact-page"),
    path("submit/", SubmitContactFormView.as_view(), name="contact-submit"),
]
