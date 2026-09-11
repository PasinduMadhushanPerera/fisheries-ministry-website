from django.urls import path
from .views import NavigationMenuView

app_name = "navigation"

urlpatterns = [
    path("", NavigationMenuView.as_view(), name="navigation-tree"),
]
