from django.urls import path
from .views import (
    InternalAffairsOfficerListView,
    InternalAffairsDocumentListView,
    InternalAffairsPageSettingsView,
)

urlpatterns = [
    path("settings/", InternalAffairsPageSettingsView.as_view(), name="internal-affairs-settings"),
    path("officers/", InternalAffairsOfficerListView.as_view(), name="internal-affairs-officer-list"),
    path("documents/", InternalAffairsDocumentListView.as_view(), name="internal-affairs-document-list"),
]
