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
    list_display = ["ministry_name", "telephone", "email", "copyright_year", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Footer Content", {
            "fields": (
                "government_badge",
                "ministry_name",
                "about_text",
                "gov_portal_label",
                "quick_links_title_en",
                "info_links_title_en",
                "contact_title_en",
                "awards_title_en",
                "hq_address",
                "copyright_text",
                "developed_by_text",
                "last_updated_text",
                "last_updated_prefix_en",
                "website_views_prefix_en",
            ),
            "description": "Primary English text content displayed throughout the footer columns and bottom bar.",
        }),
        ("🇱🇰 Sinhala Footer Content (සිංහල)", {
            "fields": (
                "government_badge_si",
                "ministry_name_si",
                "about_text_si",
                "gov_portal_label_si",
                "quick_links_title_si",
                "info_links_title_si",
                "contact_title_si",
                "awards_title_si",
                "hq_address_si",
                "copyright_text_si",
                "developed_by_text_si",
                "last_updated_text_si",
                "last_updated_prefix_si",
                "website_views_prefix_si",
            ),
            "description": "Sinhala translations for footer titles, about description, address, and bottom bar info.",
        }),
        ("🇱🇰 Tamil Footer Content (தமிழ்)", {
            "fields": (
                "government_badge_ta",
                "ministry_name_ta",
                "about_text_ta",
                "gov_portal_label_ta",
                "quick_links_title_ta",
                "info_links_title_ta",
                "contact_title_ta",
                "awards_title_ta",
                "hq_address_ta",
                "copyright_text_ta",
                "developed_by_text_ta",
                "last_updated_text_ta",
                "last_updated_prefix_ta",
                "website_views_prefix_ta",
            ),
            "description": "Tamil translations for footer titles, about description, address, and bottom bar info.",
        }),
        ("📞 Contact Numbers & Global URLs", {
            "fields": ("gov_portal_url", "telephone", "email", "copyright_year"),
        }),
        ("🌐 Official Social Media Profiles", {
            "fields": ("enable_social_media", "facebook_url", "youtube_url", "linkedin_url", "twitter_url", "instagram_url"),
            "description": "Specify official social media channel links displayed in the bottom footer bar. Leave a URL blank or uncheck master toggle to hide.",
        }),
    )

    def has_add_permission(self, request):
        return not FooterSetting.objects.exists()


@admin.register(FooterLink)
class FooterLinkAdmin(admin.ModelAdmin):
    list_display = ["label", "label_si", "label_ta", "url", "column", "order", "is_active", "is_external"]
    list_display_links = ["label"]
    list_editable = ["order", "is_active"]
    list_filter = ["column", "is_active", "is_external"]
    search_fields = ["label", "label_si", "label_ta", "url"]
    fieldsets = (
        ("Link Target & Position", {
            "fields": ("column", "url", "is_external", "order", "is_active"),
        }),
        ("Link Labels (Multilingual)", {
            "fields": ("label", "label_si", "label_ta"),
            "description": "Label in English, Sinhala (සිංහල), and Tamil (தமிழ்).",
        }),
    )


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


from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse
from django.utils.html import format_html
from .models import SiteMaintenanceSetting


@admin.register(SiteMaintenanceSetting)
class SiteMaintenanceSettingAdmin(admin.ModelAdmin):
    list_display = ["status_badge", "title_en", "estimated_restoration_en", "updated_at"]
    list_display_links = ["status_badge", "title_en"]

    fieldsets = (
        ("⚠️ MASTER MAINTENANCE MODE TOGGLE (ප්‍රධාන පාලන ස්වීචය)", {
            "description": (
                '<div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba; margin-bottom: 15px;">'
                '<strong style="font-size: 14px;">🚨 අවධානයට (IMPORTANT):</strong><br/>'
                'මෙහි ඇති Checkbox එක <strong>Check (Enable)</strong> කළ විට, සජීවී වෙබ් අඩවිය (Live Website) නැරඹීමට පැමිණෙන සියලුම පරිශීලකයින්ට වෙබ් අඩවිය නඩත්තු වෙමින් පවතින බවට පැහැදිලි පණිවුඩය (Maintenance Page) පමණක් දර්ශනය වේ.<br/>'
                'නඩත්තු කටයුතු නිම වූ පසු මෙය <strong>Uncheck (Disable)</strong> කර Save කරන්න.'
                '</div>'
            ),
            "fields": ("is_maintenance_mode",),
        }),
        ("🇬🇧 English Maintenance Page Content", {
            "fields": ("title_en", "message_en", "estimated_restoration_en"),
        }),
        ("🇱🇰 Sinhala Maintenance Page Content (සිංහල)", {
            "fields": ("title_si", "message_si", "estimated_restoration_si"),
        }),
        ("🇱🇰 Tamil Maintenance Page Content (தமிழ்)", {
            "fields": ("title_ta", "message_ta", "estimated_restoration_ta"),
        }),
        ("📞 Emergency Contact Information", {
            "fields": ("contact_phone", "contact_email"),
        }),
    )

    def status_badge(self, obj):
        if obj.is_maintenance_mode:
            return format_html('<span style="background: #fee2e2; color: #dc2626; padding: 6px 14px; border-radius: 9999px; font-weight: bold; border: 1px solid #fca5a5; font-size: 12px;">🔴 MAINTENANCE MODE ON</span>')
        return format_html('<span style="background: #dcfce7; color: #16a34a; padding: 6px 14px; border-radius: 9999px; font-weight: bold; border: 1px solid #86efac; font-size: 12px;">🟢 WEBSITE LIVE</span>')
    status_badge.short_description = "Maintenance Status"

    def has_add_permission(self, request):
        return not SiteMaintenanceSetting.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj = SiteMaintenanceSetting.objects.first()
        if obj:
            return redirect(reverse('admin:header_footer_sitemaintenancesetting_change', args=[obj.pk]))
        return super().changelist_view(request, extra_context=extra_context)

    def change_view(self, request, object_id, form_url='', extra_context=None):
        # Handle lock action if requested
        if request.GET.get('lock') == '1':
            request.session['maintenance_access_verified'] = False
            messages.info(request, "🔒 Maintenance mode access has been locked.")
            return redirect(reverse('admin:header_footer_sitemaintenancesetting_change', args=[object_id]))

        # Security password verification check
        if not request.session.get('maintenance_access_verified'):
            error_message = None
            if request.method == 'POST' and 'verify_admin_password' in request.POST:
                password = request.POST.get('admin_password', '')
                if request.user.check_password(password):
                    request.session['maintenance_access_verified'] = True
                    messages.success(request, "🔓 Admin identity verified successfully! Access granted to Maintenance Mode settings.")
                    return redirect(request.path)
                else:
                    error_message = "❌ Invalid password! Please enter your correct admin password."

            context = {
                **self.admin_site.each_context(request),
                'title': '🔒 Security Verification Required',
                'error_message': error_message,
                'opts': self.model._meta,
                'object_id': object_id,
            }
            return render(request, 'admin/header_footer/maintenance_verify.html', context)

        return super().change_view(request, object_id, form_url, extra_context=extra_context)


