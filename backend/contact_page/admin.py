from django.contrib import admin
from .models import (
    ContactPageSettings,
    ContactDepartment,
    ContactOfficer,
    ContactFaq,
    ContactSubmission,
)


class ContactOfficerInline(admin.StackedInline):
    model = ContactOfficer
    extra = 1
    verbose_name = "Contact Officer Row"
    verbose_name_plural = "Department Officers / Contact Rows"
    fieldsets = (
        (
            "Officer Basic Information",
            {
                "fields": (
                    ("order", "designation_en", "name_en"),
                )
            },
        ),
        (
            "Contact & Location Details",
            {
                "fields": (
                    ("telephone", "mobile", "fax"),
                    ("email", "location_en"),
                )
            },
        ),
        (
            "Multilingual Names & Extra Notes (Optional)",
            {
                "classes": ("collapse",),
                "fields": (
                    ("designation_si", "name_si", "location_si"),
                    ("designation_ta", "name_ta", "location_ta"),
                    "notes_en",
                ),
            },
        ),
        (
            "Newly Added Custom Column Values (e.g. Notes1, Notes2, Extension)",
            {
                "fields": ("extra_data",),
                "description": (
                    "If you added new custom columns under 'Custom Table Columns' above (e.g. Notes1, Notes2, Extension), "
                    "enter their data as a JSON dictionary here. "
                    'Example: {"Notes1": "Priority Desk", "Notes2": "Shift A", "Extension": "402"}'
                ),
            },
        ),
    )
    ordering = ("order", "id")


@admin.register(ContactDepartment)
class ContactDepartmentAdmin(admin.ModelAdmin):
    list_display = (
        "name_en",
        "location_en",
        "get_officers_count",
        "order",
        "is_active",
        "updated_at",
    )
    list_editable = ("order", "is_active")
    search_fields = ("name_en", "name_si", "name_ta", "description_en")
    list_filter = ("is_active",)
    inlines = [ContactOfficerInline]
    fieldsets = (
        (
            "Department Details (English)",
            {
                "fields": (
                    "name_en",
                    "description_en",
                    "location_en",
                )
            },
        ),
        (
            "Department Details (සිංහල)",
            {
                "classes": ("collapse",),
                "fields": (
                    "name_si",
                    "description_si",
                    "location_si",
                ),
            },
        ),
        (
            "Department Details (தமிழ்)",
            {
                "classes": ("collapse",),
                "fields": (
                    "name_ta",
                    "description_ta",
                    "location_ta",
                ),
            },
        ),
        (
            "Table Customization & Settings",
            {
                "fields": (
                    "custom_columns",
                    "order",
                    "is_active",
                ),
                "description": (
                    "Define custom column names for this department contact table as a JSON array, "
                    "e.g. ['Designation', 'Officer Name', 'Telephone', 'Mobile', 'Fax', 'Email', 'Location']. "
                    "You can add or remove columns here to customize the table structure."
                ),
            },
        ),
    )

    def get_officers_count(self, obj):
        return obj.officers.count()

    get_officers_count.short_description = "Officer Rows"


@admin.register(ContactOfficer)
class ContactOfficerAdmin(admin.ModelAdmin):
    list_display = (
        "name_en",
        "designation_en",
        "department",
        "telephone",
        "mobile",
        "fax",
        "email",
        "order",
    )
    list_filter = ("department",)
    search_fields = ("name_en", "designation_en", "telephone", "mobile", "email")
    list_editable = ("order",)
    fieldsets = (
        (
            "Department Assignment & Display Order",
            {"fields": (("department", "order"),)},
        ),
        (
            "Officer Information (English)",
            {
                "fields": (
                    ("designation_en", "name_en"),
                    ("location_en", "notes_en"),
                )
            },
        ),
        (
            "Contact Numbers & Email",
            {
                "fields": (
                    ("telephone", "mobile", "fax"),
                    "email",
                )
            },
        ),
        (
            "Newly Added Custom Column Values (e.g. Notes1, Notes2, Extension)",
            {
                "fields": ("extra_data",),
                "description": (
                    "If you added new custom columns under 'Custom Table Columns' in Department & Division Categories "
                    "(e.g. Notes1, Notes2, Extension), enter their data as a JSON dictionary here. "
                    'Example: {"Notes1": "Priority Desk", "Notes2": "Shift A", "Extension": "402"}'
                ),
            },
        ),
        (
            "Multilingual Officer Details (සිංහල & தமிழ்)",
            {
                "classes": ("collapse",),
                "fields": (
                    ("designation_si", "name_si", "location_si"),
                    ("designation_ta", "name_ta", "location_ta"),
                    ("notes_si", "notes_ta"),
                ),
            },
        ),
    )


@admin.register(ContactFaq)
class ContactFaqAdmin(admin.ModelAdmin):
    list_display = (
        "question_en",
        "order",
        "is_active",
        "updated_at",
    )
    list_editable = ("order", "is_active")
    search_fields = ("question_en", "question_si", "question_ta", "answer_en")
    list_filter = ("is_active",)
    fieldsets = (
        (
            "FAQ Content (English)",
            {
                "fields": (
                    "question_en",
                    "answer_en",
                )
            },
        ),
        (
            "FAQ Content (සිංහල)",
            {
                "fields": (
                    "question_si",
                    "answer_si",
                )
            },
        ),
        (
            "FAQ Content (தமிழ்)",
            {
                "fields": (
                    "question_ta",
                    "answer_ta",
                )
            },
        ),
        (
            "Settings & Ordering",
            {
                "fields": (
                    "order",
                    "is_active",
                )
            },
        ),
    )


@admin.register(ContactPageSettings)
class ContactPageSettingsAdmin(admin.ModelAdmin):
    list_display = (
        "__str__",
        "hq_email",
        "receiver_email",
        "updated_at",
    )
    fieldsets = (
        (
            "Page Title & Introduction",
            {
                "fields": (
                    ("page_title_en", "page_title_si", "page_title_ta"),
                    "page_description_en",
                    "page_description_si",
                    "page_description_ta",
                )
            },
        ),
        (
            "Department Directory Section Header",
            {
                "fields": (
                    ("directory_badge_en", "directory_badge_si", "directory_badge_ta"),
                    ("directory_title_en", "directory_title_si", "directory_title_ta"),
                    "directory_subtitle_en",
                    "directory_subtitle_si",
                    "directory_subtitle_ta",
                )
            },
        ),
        (
            "Ministry Headquarters & Map Section",
            {
                "fields": (
                    ("hq_badge_en", "hq_badge_si", "hq_badge_ta"),
                    ("hq_title_en", "hq_title_si", "hq_title_ta"),
                    "hq_description_en",
                    "hq_description_si",
                    "hq_description_ta",
                    "hq_address_en",
                    "hq_address_si",
                    "hq_address_ta",
                    ("hq_telephone", "hq_email", "hq_secretary_email"),
                    "office_hours_en",
                    "office_hours_si",
                    "office_hours_ta",
                    "map_embed_url",
                    "directions_url",
                ),
                "description": "Customize Ministry Headquarters titles, address, telephone numbers, emails, office hours, and Google Map embed URL in English, Sinhala, and Tamil.",
            },
        ),
        (
            "Inquiry Message Form Section Customization",
            {
                "fields": (
                    ("form_badge_en", "form_badge_si", "form_badge_ta"),
                    ("form_title_en", "form_title_si", "form_title_ta"),
                    "form_subtitle_en",
                    "form_subtitle_si",
                    "form_subtitle_ta",
                    ("form_guidance_title_en", "form_guidance_title_si", "form_guidance_title_ta"),
                    "form_guidance_items_en",
                    "form_guidance_items_si",
                    "form_guidance_items_ta",
                ),
                "description": "Customize the titles, subtitles, and guidance list items for the frontend Send Us a Message form.",
            },
        ),
        (
            "Public FAQ Section Header",
            {
                "fields": (
                    ("faq_badge_en", "faq_badge_si", "faq_badge_ta"),
                    ("faq_title_en", "faq_title_si", "faq_title_ta"),
                    "faq_subtitle_en",
                    "faq_subtitle_si",
                    "faq_subtitle_ta",
                )
            },
        ),
        (
            "Contact Form Notification Email Settings",
            {
                "fields": ("receiver_email",),
                "description": "Specify the email address that receives submitted messages from the website contact form (Default: minfishit@gmail.com).",
            },
        ),
    )

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "subject",
        "name",
        "email",
        "phone",
        "department_name",
        "submitted_at",
        "is_read",
    )
    list_filter = ("is_read", "submitted_at", "department_name")
    search_fields = ("name", "email", "phone", "subject", "message")
    readonly_fields = (
        "name",
        "email",
        "phone",
        "subject",
        "department_name",
        "message",
        "submitted_at",
    )
    list_editable = ("is_read",)
    actions = ["mark_as_read", "mark_as_unread"]

    fieldsets = (
        (
            "Submitted Citizen Inquiry (Read-Only)",
            {
                "fields": (
                    ("name", "email"),
                    ("phone", "subject"),
                    "department_name",
                    "submitted_at",
                    "message",
                ),
                "description": "Notice: Messages submitted by citizens are sent directly to minfishit@gmail.com. Submitted message fields cannot be modified.",
            },
        ),
        (
            "Admin Status & Action Notes",
            {
                "fields": (
                    "is_read",
                    "admin_notes",
                )
            },
        ),
    )

    def has_add_permission(self, request):
        return False

    @admin.action(description="Mark selected messages as Read")
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)

    @admin.action(description="Mark selected messages as Unread")
    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
