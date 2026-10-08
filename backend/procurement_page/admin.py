from django import forms
from django.contrib import admin
from .models import ProcurementPageHeader, ProcurementTenderItem, ProcurementTenderDocument


class ProcurementPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = ProcurementPageHeader
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
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


class ProcurementTenderDocumentInline(admin.StackedInline):
    model = ProcurementTenderDocument
    extra = 0
    verbose_name = "Additional Document"
    verbose_name_plural = "📂 Additional Tender Documents (Click 'Add Document' below to add more documents)"
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


@admin.register(ProcurementTenderItem)
class ProcurementTenderItemAdmin(admin.ModelAdmin):
    form = ProcurementTenderItemAdminForm
    inlines = [ProcurementTenderDocumentInline]
    list_display = [
        "order",
        "year",
        "title_en",
        "ref_number",
        "category",
        "status",
        "featured",
        "is_active",
    ]
    list_display_links = ["title_en"]
    list_editable = ["order", "status", "featured", "is_active"]
    list_filter = ["year", "category", "status", "featured", "is_active"]
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
        ("Classification & Status", {
            "fields": (
                ("order", "slug"),
                ("ref_number", "year"),
                ("category", "status"),
                ("featured", "is_active"),
            ),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
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
