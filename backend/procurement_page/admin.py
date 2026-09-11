from django import forms
from django.contrib import admin
from .models import ProcurementPageHeader, ProcurementTenderItem


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
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
            "detailed_scope_en": forms.Textarea(attrs={"rows": 4}),
            "detailed_scope_si": forms.Textarea(attrs={"rows": 4}),
            "detailed_scope_ta": forms.Textarea(attrs={"rows": 4}),
            "submission_address_en": forms.Textarea(attrs={"rows": 2}),
            "submission_address_si": forms.Textarea(attrs={"rows": 2}),
            "submission_address_ta": forms.Textarea(attrs={"rows": 2}),
            "eligibility_en": forms.Textarea(attrs={"rows": 2}),
            "eligibility_si": forms.Textarea(attrs={"rows": 2}),
            "eligibility_ta": forms.Textarea(attrs={"rows": 2}),
        }


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
    list_display = [
        "order",
        "ref_number",
        "year",
        "title_en",
        "publisher_en",
        "category",
        "status",
        "closing_date",
        "featured",
        "is_active",
    ]
    list_display_links = ["ref_number", "title_en"]
    list_editable = ["order", "status", "featured", "is_active"]
    list_filter = ["year", "category", "status", "featured", "is_active"]
    search_fields = [
        "ref_number",
        "title_en",
        "title_si",
        "title_ta",
        "publisher_en",
        "publisher_si",
        "publisher_ta",
        "slug",
    ]
    prepopulated_fields = {"slug": ("ref_number", "title_en")}

    fieldsets = (
        ("Tender Classification & Status", {
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
                "submission_address_en",
                ("tender_fee_en", "bid_security_en"),
                "eligibility_en",
                "contact_info_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                ("publisher_si", "category_label_si"),
                "description_si",
                "detailed_scope_si",
                "submission_address_si",
                ("tender_fee_si", "bid_security_si"),
                "eligibility_si",
                "contact_info_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                ("publisher_ta", "category_label_ta"),
                "description_ta",
                "detailed_scope_ta",
                "submission_address_ta",
                ("tender_fee_ta", "bid_security_ta"),
                "eligibility_ta",
                "contact_info_ta",
            ),
        }),
        ("📅 Important Dates", {
            "fields": (("published_date", "closing_date"),),
        }),
        ("📄 Bidding Document & Downloads", {
            "fields": (
                ("document_file", "file_url"),
                ("file_type", "file_size"),
            ),
        }),
    )
