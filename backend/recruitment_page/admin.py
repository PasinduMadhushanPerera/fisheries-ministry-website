from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import (
    RecruitmentPageHeader,
    RecruitmentCategory,
    RecruitmentVacancyItem,
    RecruitmentVacancyDocument,
)


class RecruitmentPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = RecruitmentPageHeader
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class RecruitmentCategoryAdminForm(forms.ModelForm):
    class Meta:
        model = RecruitmentCategory
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 2}),
            "description_si": forms.Textarea(attrs={"rows": 2}),
            "description_ta": forms.Textarea(attrs={"rows": 2}),
        }


class RecruitmentVacancyItemAdminForm(forms.ModelForm):
    class Meta:
        model = RecruitmentVacancyItem
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
            "qualifications_en": forms.Textarea(attrs={"rows": 4}),
            "qualifications_si": forms.Textarea(attrs={"rows": 4}),
            "qualifications_ta": forms.Textarea(attrs={"rows": 4}),
        }


class RecruitmentVacancyItemInline(admin.StackedInline):
    model = RecruitmentVacancyItem
    form = RecruitmentVacancyItemAdminForm
    extra = 0
    ordering = ["order", "-id"]
    verbose_name = "Attached Vacancy Notice"
    verbose_name_plural = "Attached Vacancy Notices & Documents"

    fields = (
        ("order", "is_active", "featured"),
        ("ref_number", "year", "status"),
        ("title_en", "subheading_en", "institution_en"),
        ("file_type", "file_size", "published_date", "closing_date"),
        ("document_file_en", "document_file_si", "document_file_ta", "document_file"),
    )


class RecruitmentVacancyDocumentInline(admin.StackedInline):
    model = RecruitmentVacancyDocument
    extra = 0
    verbose_name = "Additional Vacancy Document"
    verbose_name_plural = "📂 Additional Attached Files (Click 'Add Document' below to attach extra files)"

    fields = (
        "order",
        ("label_en", "label_si", "label_ta"),
        ("document_file", "file_url"),
        ("file_type", "file_size"),
    )


@admin.register(RecruitmentPageHeader)
class RecruitmentPageHeaderAdmin(admin.ModelAdmin):
    form = RecruitmentPageHeaderAdminForm
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
        return not RecruitmentPageHeader.objects.exists()


@admin.register(RecruitmentCategory)
class RecruitmentCategoryAdmin(admin.ModelAdmin):
    form = RecruitmentCategoryAdminForm
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
    inlines = [RecruitmentVacancyItemInline]

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
        count = obj.vacancies.count()
        return format_html(
            '<span style="background: #f0fdf4; color: #16a34a; padding: 2px 8px; border-radius: 6px; font-weight: bold; border: 1px solid #bbf7d0;">📄 {} vacancies</span>',
            count,
        )
    attached_doc_count.short_description = "Attached Vacancies"

    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="color: #15803d; font-weight: bold;">● Active</span>')
        return format_html('<span style="color: #dc2626; font-weight: bold;">○ Inactive</span>')
    is_active_badge.short_description = "Status"


@admin.register(RecruitmentVacancyItem)
class RecruitmentVacancyItemAdmin(admin.ModelAdmin):
    form = RecruitmentVacancyItemAdminForm
    inlines = [RecruitmentVacancyDocumentInline]
    list_display = [
        "order",
        "ref_number",
        "year",
        "title_en",
        "subheading_en",
        "institution_en",
        "category_ref",
        "status",
        "closing_date",
        "featured",
        "is_active",
    ]
    list_display_links = ["ref_number", "title_en"]
    list_editable = ["order", "status", "featured", "is_active"]
    list_filter = ["category_ref", "year", "category", "status", "featured", "is_active"]
    search_fields = [
        "ref_number",
        "title_en",
        "subheading_en",
        "title_si",
        "title_ta",
        "institution_en",
        "institution_si",
        "institution_ta",
        "slug",
    ]
    prepopulated_fields = {"slug": ("title_en",)}

    fieldsets = (
        ("Vacancy Classification & Status", {
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
                ("institution_en", "department_en"),
                "description_en",
                "category_label_en",
                "qualifications_en",
                ("salary_scale_en", "age_limit_en"),
                "doc_button_label_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                "subheading_si",
                ("institution_si", "department_si"),
                "description_si",
                "category_label_si",
                "qualifications_si",
                ("salary_scale_si", "age_limit_si"),
                "doc_button_label_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                "subheading_ta",
                ("institution_ta", "department_ta"),
                "description_ta",
                "category_label_ta",
                "qualifications_ta",
                ("salary_scale_ta", "age_limit_ta"),
                "doc_button_label_ta",
            ),
        }),
        ("📅 Important Dates", {
            "fields": (("published_date", "closing_date"),),
        }),
        ("📄 Primary Application Document & Uploads", {
            "fields": (
                ("document_file_en", "document_file_si", "document_file_ta"),
                ("document_file", "file_url"),
                ("file_type", "file_size"),
            ),
        }),
        ("📎 Secondary Document & Downloads", {
            "fields": (
                ("second_document_label_en", "second_document_label_si", "second_document_label_ta"),
                ("second_document_file", "second_file_url"),
                ("second_file_type", "second_file_size"),
            ),
        }),
    )
