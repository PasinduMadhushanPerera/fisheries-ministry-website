from django.contrib import admin
from .models import HeaderSetting, FooterSetting, FooterLink, WebsiteViewsCounter, FooterAward


@admin.register(HeaderSetting)
class HeaderSettingAdmin(admin.ModelAdmin):
    list_display = ["ministry_name", "government_name", "hotline_phone", "email", "updated_at"]
    fieldsets = (
        ("Ministry Branding & Titles", {
            "fields": ("government_name", "ministry_name", "tagline"),
            "description": "Main titles appearing next to the national emblem in the header.",
        }),
        ("Logo & Emblem", {
            "fields": ("logo", "logo_url_fallback", "logo_alt"),
        }),
        ("Top Utility Bar Info", {
            "fields": ("hotline_phone", "email", "help_link_text", "help_link_url", "gov_link_text", "gov_link_url"),
        }),
        ("Search Box", {
            "fields": ("search_placeholder",),
        }),
        ("Emergency Announcement Banner", {
            "fields": ("enable_emergency_banner", "emergency_banner_text", "emergency_banner_link"),
            "description": "Enable to show a prominent emergency announcement banner at the very top of the website.",
        }),
    )

    def has_add_permission(self, request):
        return not HeaderSetting.objects.exists()


@admin.register(FooterSetting)
class FooterSettingAdmin(admin.ModelAdmin):
    list_display = ["ministry_name", "telephone", "email", "copyright_year", "copyright_text", "last_updated_text", "updated_at"]
    fieldsets = (
        ("Column 1: Ministry Branding", {
            "fields": ("government_badge", "ministry_name", "about_text", "gov_portal_label", "gov_portal_url"),
        }),
        ("Column 4: Head Office Contact Details", {
            "fields": ("hq_address", "telephone", "email"),
        }),
        ("Official Social Media Profiles", {
            "fields": ("enable_social_media", "facebook_url", "youtube_url", "linkedin_url", "twitter_url", "instagram_url"),
            "description": "Specify official social media channel links displayed in the bottom footer bar. Leave a URL blank or uncheck master toggle to hide.",
        }),
        ("Bottom Bar Copyright & Information", {
            "fields": ("copyright_year", "copyright_text", "last_updated_text"),
            "description": "Customize copyright year, copyright notice, and last updated text.",
        }),
    )

    def has_add_permission(self, request):
        return not FooterSetting.objects.exists()


@admin.register(FooterLink)
class FooterLinkAdmin(admin.ModelAdmin):
    list_display = ["label", "url", "column", "order", "is_active", "is_external"]
    list_display_links = ["label"]
    list_editable = ["order", "is_active"]
    list_filter = ["column", "is_active", "is_external"]
    search_fields = ["label", "url"]


@admin.register(FooterAward)
class FooterAwardAdmin(admin.ModelAdmin):
    list_display = ["title", "image", "url", "order", "is_active", "updated_at"]
    list_display_links = ["title"]
    list_editable = ["order", "is_active"]
    search_fields = ["title", "url"]


@admin.register(WebsiteViewsCounter)
class WebsiteViewsCounterAdmin(admin.ModelAdmin):
    list_display = ["total_views", "updated_at"]
    readonly_fields = ["updated_at"]

    def has_add_permission(self, request):
        return not WebsiteViewsCounter.objects.exists()
