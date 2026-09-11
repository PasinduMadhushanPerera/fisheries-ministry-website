from django.urls import path
from .views import GalleryPageDataView, GalleryAlbumDetailView

urlpatterns = [
    path("", GalleryPageDataView.as_view(), name="gallery-page-data"),
    path("<slug:slug>/", GalleryAlbumDetailView.as_view(), name="gallery-album-detail"),
]
