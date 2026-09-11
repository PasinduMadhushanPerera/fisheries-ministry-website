from django.urls import path
from .views import ExportImportStatisticsDataView

urlpatterns = [
    path("export-and-import/", ExportImportStatisticsDataView.as_view(), name="export-and-import-statistics-data"),
    path("export-import/", ExportImportStatisticsDataView.as_view(), name="export-import-statistics-data-alias"),
]
