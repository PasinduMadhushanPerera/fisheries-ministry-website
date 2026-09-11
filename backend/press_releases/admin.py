from django import forms
from django.contrib import admin
from .models import PressReleasePageHeader, PressReleaseItem


class PressReleasePageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = PressReleasePageHeader
        fields = "__all__"


class PressReleaseItemAdminForm(forms.ModelForm):
    class Meta:
        model = PressReleaseItem
        fields = "__all__"
        widgets = {
            "summary_en": forms.Textarea(attrs={"rows": 3}),
            "summary_si": forms.Textarea(attrs={"rows": 3}),
            "summary_ta": forms.Textarea(attrs={"rows": 3}),
            "content_en": forms.Textarea(attrs={"rows": 6}),
            "content_si": forms.Textarea(attrs={"rows": 6}),
            "content_ta": forms.Textarea(attrs={"rows": 6}),
        }


@admin.register(PressReleasePageHeader)
class PressReleasePageHeaderAdmin(admin.ModelAdmin):
    form = PressReleasePageHeaderAdminForm
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
        return not PressReleasePageHeader.objects.exists()


@admin.register(PressReleaseItem)
class PressReleaseItemAdmin(admin.ModelAdmin):
    form = PressReleaseItemAdminForm
    list_display = [
        "release_number",
        "title_en",
        "category",
        "location",
        "published_date",
        "is_featured",
        "is_active",
        "updated_at",
    ]
    list_display_links = ["title_en"]
    list_editable = ["category", "is_featured", "is_active"]
    list_filter = ["category", "is_featured", "is_active"]
    search_fields = [
        "release_number",
        "title_en",
        "title_si",
        "title_ta",
        "summary_en",
        "summary_si",
        "summary_ta",
        "publisher_en",
        "slug",
    ]
    prepopulated_fields = {"slug": ("title_en",)}

    fieldsets = (
        ("🏷️ Press Release Classification & Dateline", {
            "fields": (
                ("release_number", "order"),
                ("category", "location"),
                ("is_featured", "is_active"),
                "slug",
            ),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                "title_en",
                "publisher_en",
                "summary_en",
                "content_en",
                "attachment_title_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                "title_si",
                "publisher_si",
                "summary_si",
                "content_si",
                "attachment_title_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                "title_ta",
                "publisher_ta",
                "summary_ta",
                "content_ta",
                "attachment_title_ta",
            ),
        }),
        ("📅 Release Date", {
            "fields": ("published_date",),
        }),
        ("🖼️ Cover Photo & Media (Optional)", {
            "fields": (
                "image",
                ("image_url_fallback", "image_alt"),
            ),
        }),
        ("📄 Signed Statement Document & PDF Downloads", {
            "fields": (
                ("document_file", "file_url"),
                ("file_type", "file_size"),
            ),
        }),
    )

    def save_model(self, request, obj, form, change):
        if obj.is_featured:
            # When marked featured, unmark any previous featured press releases
            PressReleaseItem.objects.filter(is_featured=True).exclude(pk=obj.pk).update(is_featured=False)
        super().save_model(request, obj, form, change)

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        featured_set = [inst for inst in instances if getattr(inst, "is_featured", False)]
        if featured_set:
            last_featured = featured_set[-1]
            PressReleaseItem.objects.filter(is_featured=True).exclude(pk=last_featured.pk).update(is_featured=False)
        super().save_formset(request, form, formset, change)
