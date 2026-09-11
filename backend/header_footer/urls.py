from django.urls import path
from .views import HeaderFooterDataView, WebsiteViewsCounterView

urlpatterns = [
    path("", HeaderFooterDataView.as_view(), name="header-footer-data"),
    path("visitor-count/", WebsiteViewsCounterView.as_view(), name="visitor-count"),
]
