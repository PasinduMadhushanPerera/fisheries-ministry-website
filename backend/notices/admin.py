from django import forms
from django.contrib import admin
from .models import NoticePageHeader, NoticeItem


class NoticePageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = NoticePageHeader
        fields = "__all__"


class NoticeItemAdminForm(forms.ModelForm):
    class Meta:
        model = NoticeItem
        fields = "__all__"
        widgets = {
            "summary_en": forms.Textarea(attrs={"rows": 3}),
            "summary_si": forms.Textarea(attrs={"rows": 3}),
            "summary_ta": forms.Textarea(attrs={"rows": 3}),
            "content_en": forms.Textarea(attrs={"rows": 6}),
            "content_si": forms.Textarea(attrs={"rows": 6}),
            "content_ta": forms.Textarea(attrs={"rows": 6}),
        }


@admin.register(NoticePageHeader)
class NoticePageHeaderAdmin(admin.ModelAdmin):
    form = NoticePageHeaderAdminForm
    list_display = ["library_title_en", "catalogue_badge_en", "featured_badge_en", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Section Badges & Titles", {
            "fields": (
                ("featured_badge_en", "catalogue_badge_en"),
                "library_title_en",
            ),
        }),
        ("🇱🇰 Sinhala Section Badges & Titles (සිංහල)", {
            "fields": (
                ("featured_badge_si", "catalogue_badge_si"),
                "library_title_si",
            ),
        }),
        ("🇱🇰 Tamil Section Badges & Titles (தமிழ்)", {
            "fields": (
                ("featured_badge_ta", "catalogue_badge_ta"),
                "library_title_ta",
            ),
        }),
    )

    def has_add_permission(self, request):
        return not NoticePageHeader.objects.exists()


@admin.register(NoticeItem)
class NoticeItemAdmin(admin.ModelAdmin):
    form = NoticeItemAdminForm
    list_display = [
        "notice_number",
        "title_en",
        "category",
        "priority",
        "published_date",
        "expiry_date",
        "is_urgent",
        "is_featured",
        "is_active",
    ]
    list_display_links = ["title_en"]
    list_editable = ["category", "priority", "is_urgent", "is_featured", "is_active"]
    list_filter = ["category", "priority", "is_urgent", "is_featured", "is_active"]
    search_fields = [
        "notice_number",
        "title_en",
        "title_si",
        "title_ta",
        "summary_en",
        "summary_si",
        "summary_ta",
        "department_en",
        "slug",
    ]
    prepopulated_fields = {"slug": ("title_en",)}

    fieldsets = (
        ("🏷️ Notice Classification & Reference", {
            "fields": (
                ("notice_number", "order"),
                ("category", "priority"),
                ("is_urgent", "is_featured", "is_active"),
                "slug",
            ),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
                "department_en",
                "summary_en",
                "content_en",
                "attachment_title_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                "department_si",
                "summary_si",
                "content_si",
                "attachment_title_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                "department_ta",
                "summary_ta",
                "content_ta",
                "attachment_title_ta",
            ),
        }),
        ("📅 Publication & Closing Dates", {
            "fields": (
                ("published_date", "expiry_date"),
            ),
        }),
        ("📄 Document Download & Circular Attachments", {
            "fields": (
                ("document_file", "file_url"),
                ("file_type", "file_size"),
            ),
        }),
    )

    def save_model(self, request, obj, form, change):
        if obj.is_featured:
            # When a notice is marked featured, unmark any previous featured notices
            NoticeItem.objects.filter(is_featured=True).exclude(pk=obj.pk).update(is_featured=False)
        super().save_model(request, obj, form, change)

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        featured_set = [inst for inst in instances if getattr(inst, "is_featured", False)]
        if featured_set:
            last_featured = featured_set[-1]
            NoticeItem.objects.filter(is_featured=True).exclude(pk=last_featured.pk).update(is_featured=False)
        super().save_formset(request, form, formset, change)