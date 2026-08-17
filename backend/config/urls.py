from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

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
    }
    filtered = [app for app in app_list if app.get("app_label") in allowed_apps]
    
    def app_order(a):
        label = a.get("app_label")
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
        return 99

    return sorted(filtered, key=app_order)


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
    path("api/v1/minister/", include("minister_profile.urls")),
    path("api/v1/deputy-minister/", include("deputy_minister_profile.urls")),
    path("api/v1/secretary/", include("secretary_profile.urls")),
    path("api/v1/divisions/", include("divisions_page.urls")),
    path("api/v1/organization-structure/", include("organization_structure.urls")),
    path("api/v1/local-training/", include("local_training.urls")),
    path("api/v1/foreign-training/", include("foreign_training.urls")),
    path("api/v1/procurement/", include("procurement_page.urls")),
    path("api/v1/recruitment/", include("recruitment_page.urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )