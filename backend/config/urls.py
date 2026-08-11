from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

admin.site.site_header = "Ministry of Fisheries — CMS Administration"
admin.site.site_title = "Fisheries Ministry Admin"
admin.site.index_title = "Website Content & Management Dashboard"

# Filter Admin App List to show only active functional sections:
# 1. 00. Common Header & Footer Settings (header_footer)
# 2. 01. Home Page Management (home_page)
_original_get_app_list = admin.site.get_app_list


def custom_get_app_list(request, app_label=None):
    app_list = _original_get_app_list(request, app_label=app_label)
    allowed_apps = {"header_footer", "home_page"}
    filtered = [app for app in app_list if app.get("app_label") in allowed_apps]
    return sorted(
        filtered,
        key=lambda a: 0 if a.get("app_label") == "header_footer" else 1,
    )


admin.site.get_app_list = custom_get_app_list

urlpatterns = [
    path("admin/", admin.site.urls),

    # Global Header & Footer, Home Page & Core Content APIs
    path("api/v1/header-footer/", include("header_footer.urls")),
    path("api/v1/home/", include("home_page.urls")),
    path("api/v1/pages/", include("pages.urls")),
    path("api/v1/navigation/", include("navigation.urls")),
    path("api/v1/content/", include("core_content.urls")),

    # Existing APIs
    path("api/v1/notices/", include("notices.urls")),
    path("api/v1/news/", include("news.urls")),
    path("api/v1/about/", include("about.urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )