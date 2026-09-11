from django.urls import path
from .views import EventPageDataView, EventDetailView

urlpatterns = [
    path("", EventPageDataView.as_view(), name="events-page-data"),
    path("<slug:slug>/", EventDetailView.as_view(), name="event-detail"),
]
