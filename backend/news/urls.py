from django.urls import path
from .views import NewsPageDataView, NewsDetailView

app_name = "news"

urlpatterns = [
    path("", NewsPageDataView.as_view(), name="news_page_data"),
    path("<slug:slug>/", NewsDetailView.as_view(), name="news_detail"),
]