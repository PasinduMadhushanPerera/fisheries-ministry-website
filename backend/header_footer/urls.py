from django.urls import path
from .views import HeaderFooterDataView, WebsiteViewsCounterView, SiteMaintenanceView

urlpatterns = [
    path("", HeaderFooterDataView.as_view(), name="header-footer-data"),
    path("maintenance/", SiteMaintenanceView.as_view(), name="site-maintenance"),
    path("visitor-count/", WebsiteViewsCounterView.as_view(), name="visitor-count"),
]
