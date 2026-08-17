from django import forms
from django.contrib import admin
from .models import NewsPageHeader, NewsArticleItem


class NewsPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = NewsPageHeader
        fields = "__all__"


class NewsArticleItemAdminForm(forms.ModelForm):
    class Meta:
        model = NewsArticleItem
        fields = "__all__"
        widgets = {
            "summary_en": forms.Textarea(attrs={"rows": 3}),
            "summary_si": forms.Textarea(attrs={"rows": 3}),
            "summary_ta": forms.Textarea(attrs={"rows": 3}),
            "content_en": forms.Textarea(attrs={"rows": 6}),
            "content_si": forms.Textarea(attrs={"rows": 6}),
            "content_ta": forms.Textarea(attrs={"rows": 6}),
        }


@admin.register(NewsPageHeader)
class NewsPageHeaderAdmin(admin.ModelAdmin):
    form = NewsPageHeaderAdminForm
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
        return not NewsPageHeader.objects.exists()


@admin.register(NewsArticleItem)
class NewsArticleItemAdmin(admin.ModelAdmin):
    form = NewsArticleItemAdminForm
    list_display = [
        "order",
        "title_en",
        "category",
        "published_date",
        "is_featured",
        "is_active",
        "updated_at",
    ]
    list_display_links = ["title_en"]
    list_editable = ["order", "category", "is_featured", "is_active"]
    list_filter = ["category", "is_featured", "is_active"]
    search_fields = [
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
        ("🏷️ Article Classification & Category (Auto-sets multilingual badges)", {
            "fields": (
                ("category", "order"),
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
        ("📅 Publication Date", {
            "fields": ("published_date",),
        }),
        ("🖼️ Cover Image & Media", {
            "fields": (
                "image",
                ("image_url_fallback", "image_alt"),
            ),
        }),
        ("📄 Attachment Document & Downloads (Optional)", {
            "fields": (
                ("document_file", "file_url"),
                ("file_type", "file_size"),
            ),
        }),
    )

    def save_model(self, request, obj, form, change):
        if obj.is_featured:
            # When an article is marked featured, unmark any previous featured items
            NewsArticleItem.objects.filter(is_featured=True).exclude(pk=obj.pk).update(is_featured=False)
        super().save_model(request, obj, form, change)

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        featured_set = [inst for inst in instances if getattr(inst, "is_featured", False)]
        if featured_set:
            last_featured = featured_set[-1]
            NewsArticleItem.objects.filter(is_featured=True).exclude(pk=last_featured.pk).update(is_featured=False)
        super().save_formset(request, form, formset, change)