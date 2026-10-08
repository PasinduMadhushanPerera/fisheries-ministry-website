from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import (
    ProcurementPageHeader,
    ProcurementCategory,
    ProcurementTenderItem,
    ProcurementTenderDocument,
)


class ProcurementPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = ProcurementPageHeader
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class ProcurementCategoryAdminForm(forms.ModelForm):
    class Meta:
        model = ProcurementCategory
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 2}),
            "description_si": forms.Textarea(attrs={"rows": 2}),
            "description_ta": forms.Textarea(attrs={"rows": 2}),
        }


class ProcurementTenderItemAdminForm(forms.ModelForm):
    class Meta:
        model = ProcurementTenderItem
        fields = "__all__"
        widgets = {
            "title_en": forms.Textarea(attrs={"rows": 2}),
            "title_si": forms.Textarea(attrs={"rows": 2}),
            "title_ta": forms.Textarea(attrs={"rows": 2}),
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
            "additional_info_en": forms.Textarea(attrs={"rows": 4}),
            "additional_info_si": forms.Textarea(attrs={"rows": 4}),
            "additional_info_ta": forms.Textarea(attrs={"rows": 4}),
        }


class ProcurementTenderItemInline(admin.StackedInline):
    model = ProcurementTenderItem
    form = ProcurementTenderItemAdminForm
    extra = 0
    ordering = ["order", "-id"]
    verbose_name = "Procurement Tender Notice"
    verbose_name_plural = "Attached Procurement Tender Notices"

    fields = (
        ("order", "is_active", "featured"),
        ("ref_number", "year", "status"),
        ("title_en", "publisher_en", "document_file"),
        ("file_type", "file_size", "published_date", "closing_date"),
    )


class ProcurementTenderDocumentInline(admin.StackedInline):
    model = ProcurementTenderDocument
    extra = 0
    verbose_name = "Additional Document"
    verbose_name_plural = "📂 Additional Attached Documents (Click 'Add Document' below to add more files)"
    fields = (
        "order",
        ("label_en", "label_si", "label_ta"),
        ("document_file", "file_url"),
        ("file_type", "file_size"),
    )


@admin.register(ProcurementPageHeader)
class ProcurementPageHeaderAdmin(admin.ModelAdmin):
    form = ProcurementPageHeaderAdminForm
    list_display = ["title_en", "title_si", "title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content & Section Titles", {
            "fields": (
                "badge_text_en",
                "title_en",
                "description_en",
                ("featured_badge_en", "catalogue_badge_en"),
                "library_title_en",
            ),
        }),
        ("🇱🇰 Sinhala Content & Section Titles (සිංහල)", {
            "fields": (
                "badge_text_si",
                "title_si",
                "description_si",
                ("featured_badge_si", "catalogue_badge_si"),
                "library_title_si",
            ),
        }),
        ("🇱🇰 Tamil Content & Section Titles (தமிழ்)", {
            "fields": (
                "badge_text_ta",
                "title_ta",
                "description_ta",
                ("featured_badge_ta", "catalogue_badge_ta"),
                "library_title_ta",
            ),
        }),
    )

    def has_add_permission(self, request):
        return not ProcurementPageHeader.objects.exists()


@admin.register(ProcurementCategory)
class ProcurementCategoryAdmin(admin.ModelAdmin):
    form = ProcurementCategoryAdminForm
    list_display = [
        "order",
        "title_en",
        "category_id",
        "icon_type",
        "attached_doc_count",
        "is_active_badge",
        "updated_at",
    ]
    list_display_links = ["title_en"]
    list_filter = ["icon_type", "is_active"]
    search_fields = ["title_en", "title_si", "title_ta", "category_id"]
    ordering = ["order", "id"]
    inlines = [ProcurementTenderItemInline]

    fieldsets = (
        ("📁 Category Identification & Settings", {
            "fields": (
                ("order", "is_active", "icon_type"),
                ("category_id",),
            ),
        }),
        ("🇬🇧 English Details", {
            "fields": (
                "title_en",
                "description_en",
            ),
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "classes": ("collapse",),
            "fields": (
                "title_si",
                "description_si",
            ),
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "classes": ("collapse",),
            "fields": (
                "title_ta",
                "description_ta",
            ),
        }),
    )

    def attached_doc_count(self, obj):
        count = obj.tenders.count()
        return format_html(
            '<span style="background: #f0fdf4; color: #16a34a; padding: 2px 8px; border-radius: 6px; font-weight: bold; border: 1px solid #bbf7d0;">📄 {} tenders</span>',
            count,
        )
    attached_doc_count.short_description = "Attached Notices"

    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="color: #15803d; font-weight: bold;">● Active</span>')
        return format_html('<span style="color: #dc2626; font-weight: bold;">○ Inactive</span>')
    is_active_badge.short_description = "Status"


@admin.register(ProcurementTenderItem)
class ProcurementTenderItemAdmin(admin.ModelAdmin):
    form = ProcurementTenderItemAdminForm
    inlines = [ProcurementTenderDocumentInline]
    list_display = [
        "order",
        "year",
        "title_en",
        "ref_number",
        "category_ref",
        "status",
        "featured",
        "is_active",
    ]
    list_display_links = ["title_en"]
    list_editable = ["order", "status", "featured", "is_active"]
    list_filter = ["category_ref", "year", "category", "status", "featured", "is_active"]
    search_fields = [
        "title_en",
        "title_si",
        "title_ta",
        "ref_number",
        "publisher_en",
        "slug",
    ]
    prepopulated_fields = {"slug": ("title_en",)}

    fieldsets = (
        ("Classification & Parent Category", {
            "fields": (
                ("category_ref", "order", "slug"),
                ("ref_number", "year"),
                ("category", "status"),
                ("featured", "is_active"),
            ),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
                "subheading_en",
                ("publisher_en", "category_label_en"),
                "description_en",
                "detailed_scope_en",
                "additional_info_en",
                "doc_button_label_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                "subheading_si",
                ("publisher_si", "category_label_si"),
                "description_si",
                "detailed_scope_si",
                "additional_info_si",
                "doc_button_label_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                "subheading_ta",
                ("publisher_ta", "category_label_ta"),
                "description_ta",
                "detailed_scope_ta",
                "additional_info_ta",
                "doc_button_label_ta",
            ),
        }),
        ("📅 Important Dates", {
            "fields": (("published_date", "closing_date"),),
        }),
        ("📄 Primary Bidding Document & Downloads", {
            "fields": (
                ("document_file", "file_url"),
                ("file_type", "file_size"),
            ),
        }),
        ("📎 Secondary Document & Downloads (e.g. SOR Document)", {
            "fields": (
                ("second_document_label_en", "second_document_label_si", "second_document_label_ta"),
                ("second_document_file", "second_file_url"),
                ("second_file_type", "second_file_size"),
            ),
        }),
    )
