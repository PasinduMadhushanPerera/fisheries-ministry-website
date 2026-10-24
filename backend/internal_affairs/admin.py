from django.contrib import admin
from django.utils.html import format_html
from .models import InternalAffairsOfficer, OfficerContactLine, InternalAffairsDocument, InternalAffairsPageSettings


@admin.register(InternalAffairsPageSettings)
class InternalAffairsPageSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("👥 Officers Section Headers & Titles", {
            "description": "Customize the header badge, title, and overview text for the Officers section on /internal-affairs page.",
            "fields": (
                ("officers_badge_en", "officers_title_en"),
                "officers_description_en",
                ("officers_badge_si", "officers_title_si"),
                "officers_description_si",
                ("officers_badge_ta", "officers_title_ta"),
                "officers_description_ta",
            )
        }),
        ("📄 Documents Section Headers & Titles", {
            "description": "Customize the header badge, title, and overview text for the Documents section on /internal-affairs page.",
            "fields": (
                ("documents_badge_en", "documents_title_en"),
                "documents_description_en",
                ("documents_badge_si", "documents_title_si"),
                "documents_description_si",
                ("documents_badge_ta", "documents_title_ta"),
                "documents_description_ta",
            )
        }),
    )

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False


class OfficerContactLineInline(admin.StackedInline):
    model = OfficerContactLine
    extra = 1
    verbose_name = "Custom Contact Line"
    verbose_name_plural = "Custom Contact Lines (Add extra phone, WhatsApp, email, or fax lines below)"
    fieldsets = (
        ("Contact Line Details", {
            "fields": (
                ("order", "is_active"),
                ("label_en", "value"),
                ("label_si", "label_ta"),
                ("icon_type", "link_type"),
            )
        }),
    )
    ordering = ("order", "id")


@admin.register(InternalAffairsOfficer)
class InternalAffairsOfficerAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "photo_preview",
        "name_en",
        "designation_en",
        "role_badge_en",
        "phone",
        "email",
        "is_active",
    )
    list_display_links = ("name_en",)
    list_editable = ("order", "is_active")
    search_fields = ("name_en", "name_si", "name_ta", "designation_en", "email", "phone")
    list_filter = ("is_active",)
    ordering = ("order", "id")
    inlines = [OfficerContactLineInline]
    fieldsets = (
        ("General & Display Sequence", {
            "fields": ("officer_id", "order", "is_active")
        }),
        ("🇬🇧 English Details", {
            "fields": ("name_en", "designation_en", "role_badge_en", "office_address_en")
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "fields": ("name_si", "designation_si", "role_badge_si", "office_address_si"),
            "classes": ("collapse",)
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "fields": ("name_ta", "designation_ta", "role_badge_ta", "office_address_ta"),
            "classes": ("collapse",)
        }),
        ("📞 Standard Primary Contacts (Optional & Editable Labels)", {
            "description": "Leave any value blank if not applicable. You can also customize the label text (e.g. 'Hotline', 'Direct Line').",
            "fields": (
                ("phone_label_en", "phone"),
                ("mobile_label_en", "mobile_whatsapp"),
                ("email_label_en", "email"),
            )
        }),
        ("🇱🇰 Primary Contact Labels (සිංහල / தமிழ் Overrides)", {
            "fields": (
                ("phone_label_si", "phone_label_ta"),
                ("mobile_label_si", "mobile_label_ta"),
                ("email_label_si", "email_label_ta"),
            ),
            "classes": ("collapse",)
        }),
        ("🖼 Portrait Photograph", {
            "fields": ("photo", "photo_fallback")
        }),
    )

    def photo_preview(self, obj):
        url = obj.photo.url if obj.photo else obj.photo_fallback
        if url:
            return format_html(
                '<img src="{}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 8px; border: 1px solid #cbd5e1;" />',
                url
            )
        return "-"
    photo_preview.short_description = "Photo"


@admin.register(OfficerContactLine)
class OfficerContactLineAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "officer",
        "label_en",
        "value",
        "icon_type",
        "link_type",
        "is_active",
    )
    list_display_links = ("label_en", "value")
    list_editable = ("order", "is_active")
    list_filter = ("icon_type", "link_type", "is_active", "officer")
    search_fields = ("label_en", "label_si", "label_ta", "value", "officer__name_en")
    ordering = ("officer__order", "order", "id")


@admin.register(InternalAffairsDocument)
class InternalAffairsDocumentAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "title_en",
        "file_type",
        "file_size",
        "published_date",
        "is_active",
    )
    list_display_links = ("title_en",)
    list_editable = ("order", "is_active")
    list_filter = ("file_type", "is_active")
    search_fields = ("title_en", "title_si", "title_ta", "description_en")
    ordering = ("order", "id")

    fieldsets = (
        ("General & Display Sequence", {
            "fields": ("document_id", "order", "is_active", "file_type", "published_date", "display_date", "file_size")
        }),
        ("🇬🇧 English Details", {
            "fields": ("title_en", "description_en", "document_file_en")
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "fields": ("title_si", "description_si", "document_file_si"),
            "classes": ("collapse",)
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "fields": ("title_ta", "description_ta", "document_file_ta"),
            "classes": ("collapse",)
        }),
        ("📁 General Fallback File Upload", {
            "fields": ("document_file",),
            "classes": ("collapse",)
        }),
    )
