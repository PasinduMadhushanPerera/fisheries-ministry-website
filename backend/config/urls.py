from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve

admin.site.site_header = "Ministry of Fisheries — CMS Administration"
admin.site.site_title = "Fisheries Ministry Admin"
admin.site.index_title = "Website Content & Management Dashboard"

# Filter Admin App List to show only active functional main pages:
# 1. 00. Common Header & Footer Settings (header_footer)
# 2. 01. Home Page Management (home_page)
# 3. 02. About Us Management (about)
# 4. 03. Hon. Minister Profile Management (minister_profile)
# 5. 04. Hon. Deputy Minister Profile Management (deputy_minister_profile)
# 6. 05. Ministry Secretary Profile Management (secretary_profile)
# 7. 06. Ministry Divisions Management (divisions_page)
# 8. 07. Organization Structure Management (organization_structure)
_original_get_app_list = admin.site.get_app_list


def custom_get_app_list(request, app_label=None):
    app_list = _original_get_app_list(request, app_label=app_label)
    allowed_apps = {
        "audit_log",
        "header_footer",
        "home_page",
        "about",
        "minister_profile",
        "deputy_minister_profile",
        "secretary_profile",
        "divisions_page",
        "organization_structure",
        "local_training",
        "foreign_training",
        "procurement_page",
        "recruitment_page",
        "news",
        "notices",
        "press_releases",
        "events",
        "gallery",
        "videos",
        "fisheries_statistics",
        "weekly_fish_prices",
        "monthly_fish_production",
        "annual_statistics",
        "export_import_statistics",
        "fishery_information",
        "rti_page",
        "downloads_page",
        "contact_page",
        "privacy_page",
        "internal_affairs",
        "navigation",
        "pages",
    }
    if request.user.is_superuser:
        allowed_apps.add("auth")

    filtered = [app for app in app_list if app.get("app_label") in allowed_apps]
    
    def app_order(a):
        label = a.get("app_label")
        if label == "audit_log":
            return -1
        if label == "header_footer":
            return 0
        if label == "home_page":
            return 1
        if label == "about":
            return 2
        if label == "minister_profile":
            return 3
        if label == "deputy_minister_profile":
            return 4
        if label == "secretary_profile":
            return 5
        if label == "divisions_page":
            return 6
        if label == "organization_structure":
            return 7
        if label == "local_training":
            return 8
        if label == "foreign_training":
            return 9
        if label == "procurement_page":
            return 10
        if label == "recruitment_page":
            return 11
        if label == "news":
            return 12
        if label == "notices":
            return 13
        if label == "press_releases":
            return 14
        if label == "events":
            return 15
        if label == "gallery":
            return 16
        if label == "videos":
            return 17
        if label == "fisheries_statistics":
            return 18
        if label == "weekly_fish_prices":
            return 19
        if label == "monthly_fish_production":
            return 20
        if label == "annual_statistics":
            return 21
        if label == "export_import_statistics":
            return 22
        if label == "fishery_information":
            return 23
        if label == "rti_page":
            return 24
        if label == "downloads_page":
            return 25
        if label == "contact_page":
            return 26
        if label == "privacy_page":
            return 27
        if label == "internal_affairs":
            return 28
        if label == "navigation":
            return 29
        if label == "pages":
            return 30
        if label == "auth":
            return 90
        return 99

    return sorted(filtered, key=app_order)


admin.site.get_app_list = custom_get_app_list

from django.views.generic.base import RedirectView
from header_footer.views import custom_admin_password_change_view

from django.http import JsonResponse
from django.db import connection

def health_check_view(request):
    try:
        connection.ensure_connection()
        db_ok = True
    except Exception:
        db_ok = False
    status_code = 200 if db_ok else 503
    return JsonResponse({"status": "healthy" if db_ok else "degraded", "database": db_ok}, status=status_code)

urlpatterns = [
    # Health Check Endpoint for Hosting & Monitoring
    path("api/v1/health/", health_check_view, name="health_check"),

    # Custom Account Settings (Username & Password) View
    path("admin/password_change/", custom_admin_password_change_view, name="admin_password_change"),

    # Graceful redirect for old / removed RTI header URL
    path("admin/rti_page/rtiheader/<path:subpath>", RedirectView.as_view(url="/admin/rti_page/rtiofficer/", permanent=False)),
    path("admin/rti_page/rtiheader/", RedirectView.as_view(url="/admin/rti_page/rtiofficer/", permanent=False)),

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
    path("api/v1/press-releases/", include("press_releases.urls")),
    path("api/v1/events/", include("events.urls")),
    path("api/v1/gallery/", include("gallery.urls")),
    path("api/v1/videos/", include("videos.urls")),
    path("api/v1/statistics/", include("fisheries_statistics.urls")),
    path("api/v1/statistics/", include("weekly_fish_prices.urls")),
    path("api/v1/statistics/", include("monthly_fish_production.urls")),
    path("api/v1/statistics/", include("annual_statistics.urls")),
    path("api/v1/statistics/", include("export_import_statistics.urls")),
    path("api/v1/statistics/", include("fishery_information.urls")),
    path("api/v1/rti/", include("rti_page.urls")),
    path("api/v1/downloads/", include("downloads_page.urls")),
    path("api/v1/contact/", include("contact_page.urls")),
    path("api/v1/privacy/", include("privacy_page.urls")),
    path("api/v1/search/", include("search_api.urls")),
    path("api/v1/about/", include("about.urls")),
    path("api/v1/minister/", include("minister_profile.urls")),
    path("api/v1/deputy-minister/", include("deputy_minister_profile.urls")),
    path("api/v1/secretary/", include("secretary_profile.urls")),
    path("api/v1/divisions/", include("divisions_page.urls")),
    path("api/v1/organization-structure/", include("organization_structure.urls")),
    path("api/v1/local-training/", include("local_training.urls")),
    path("api/v1/foreign-training/", include("foreign_training.urls")),
    path("api/v1/procurement/", include("procurement_page.urls")),
    path("api/v1/recruitment/", include("recruitment_page.urls")),
    path("api/v1/internal-affairs/", include("internal_affairs.urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
else:
    # Production fallback: ensures uploaded documents and images are served even if reverse-proxy passes to Django
    urlpatterns += [
        re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
    ]