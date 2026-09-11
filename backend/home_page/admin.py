from django import forms
from django.contrib import admin
from .models import (
    HomeHeroSlide,
    HomeQuickAccessItem,
    HomeNewsSection,
    HomeNewsCard,
    HomeServicesSection,
    HomeServiceCard,
    HomeQuickInfoSection,
    HomeQuickInfoCard,
    HomeInstitutionsSection,
    HomeInstitutionCard,
)


class HomeHeroSlideAdminForm(forms.ModelForm):
    class Meta:
        model = HomeHeroSlide
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class HomeNewsSectionAdminForm(forms.ModelForm):
    class Meta:
        model = HomeNewsSection
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class HomeNewsCardAdminForm(forms.ModelForm):
    class Meta:
        model = HomeNewsCard
        fields = "__all__"
        widgets = {
            "summary_en": forms.Textarea(attrs={"rows": 3}),
            "summary_si": forms.Textarea(attrs={"rows": 3}),
            "summary_ta": forms.Textarea(attrs={"rows": 3}),
            "content_en": forms.Textarea(attrs={"rows": 6}),
            "content_si": forms.Textarea(attrs={"rows": 6}),
            "content_ta": forms.Textarea(attrs={"rows": 6}),
        }


class HomeServicesSectionAdminForm(forms.ModelForm):
    class Meta:
        model = HomeServicesSection
        fields = "__all__"
        widgets = {
            "section_description_en": forms.Textarea(attrs={"rows": 3}),
            "section_description_si": forms.Textarea(attrs={"rows": 3}),
            "section_description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class HomeServiceCardAdminForm(forms.ModelForm):
    class Meta:
        model = HomeServiceCard
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class HomeQuickInfoSectionAdminForm(forms.ModelForm):
    class Meta:
        model = HomeQuickInfoSection
        fields = "__all__"
        widgets = {
            "section_description_en": forms.Textarea(attrs={"rows": 3}),
            "section_description_si": forms.Textarea(attrs={"rows": 3}),
            "section_description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class HomeQuickInfoCardAdminForm(forms.ModelForm):
    class Meta:
        model = HomeQuickInfoCard
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class HomeInstitutionsSectionAdminForm(forms.ModelForm):
    class Meta:
        model = HomeInstitutionsSection
        fields = "__all__"
        widgets = {
            "section_description_en": forms.Textarea(attrs={"rows": 3}),
            "section_description_si": forms.Textarea(attrs={"rows": 3}),
            "section_description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class HomeInstitutionCardAdminForm(forms.ModelForm):
    class Meta:
        model = HomeInstitutionCard
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


# ==========================================================
# Admin Model Registrations
# ==========================================================
@admin.register(HomeHeroSlide)
class HomeHeroSlideAdmin(admin.ModelAdmin):
    form = HomeHeroSlideAdminForm
    list_display = ["order", "title_en", "highlighted_title_en", "is_active", "updated_at"]
    list_display_links = ["title_en"]
    list_editable = ["order", "is_active"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("eyebrow_en", "title_en", "highlighted_title_en", "description_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("eyebrow_si", "title_si", "highlighted_title_si", "description_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("eyebrow_ta", "title_ta", "highlighted_title_ta", "description_ta"),
        }),
        ("⚙️ Slide Media & Settings", {
            "fields": (("order", "is_active"), ("image", "image_url_fallback"), "image_alt"),
        }),
    )


@admin.register(HomeQuickAccessItem)
class HomeQuickAccessItemAdmin(admin.ModelAdmin):
    list_display = ["order", "title_en", "title_si", "title_ta", "icon_name", "url", "is_active"]
    list_display_links = ["title_en"]
    list_editable = ["order", "is_active"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("title_en", "aria_label_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("title_si", "aria_label_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("title_ta", "aria_label_ta"),
        }),
        ("⚙️ Link Settings", {
            "fields": ("url", "icon_name", "order", "is_active"),
        }),
    )


@admin.register(HomeNewsSection)
class HomeNewsSectionAdmin(admin.ModelAdmin):
    form = HomeNewsSectionAdminForm
    list_display = ["title_en", "title_si", "title_ta", "max_articles", "updated_at"]
    readonly_fields = ["news_sync_banner"]
    fieldsets = (
        ("📰 Live News Sync Notice", {
            "fields": ("news_sync_banner",),
        }),
        ("🇬🇧 English Content", {
            "fields": ("eyebrow_en", "title_en", "description_en", "button_text_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("eyebrow_si", "title_si", "description_si", "button_text_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("eyebrow_ta", "title_ta", "description_ta", "button_text_ta"),
        }),
        ("⚙️ Section Settings", {
            "fields": ("button_url", "max_articles"),
        }),
    )

    def news_sync_banner(self, obj=None):
        from django.utils.safestring import mark_safe
        return mark_safe(
            '<div style="padding: 16px 20px; background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; color: #14532d; font-size: 13px; line-height: 1.6;">'
            '📢 <strong>AUTOMATIC 5 LATEST NEWS SYNC ACTIVE:</strong><br>'
            'The Homepage "Media Centre : Latest News" section automatically fetches the <strong>latest 5 published news articles</strong> directly from the central News database.<br><br>'
            '👉 <strong>To add, edit, translate, or delete news articles:</strong><br>'
            'Please go to <a href="/admin/news/newsarticleitem/" style="color: #15803d; font-weight: 800; text-decoration: underline; background: #dcfce7; padding: 4px 10px; border-radius: 6px; display: inline-block; margin-top: 4px;">'
            '📰 12. Media Centre : News Articles Management</a>.'
            '</div>'
        )
    news_sync_banner.short_description = "Live News Sync Information"

    def has_add_permission(self, request):
        return not HomeNewsSection.objects.exists()


# Note: HomeNewsCard is deactivated because news is dynamically fetched from NewsArticleItem in the news app.



@admin.register(HomeServicesSection)
class HomeServicesSectionAdmin(admin.ModelAdmin):
    form = HomeServicesSectionAdminForm
    list_display = ["section_title_en", "section_title_si", "section_title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("badge_text_en", "section_title_en", "section_description_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("badge_text_si", "section_title_si", "section_description_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("badge_text_ta", "section_title_ta", "section_description_ta"),
        }),
    )

    def has_add_permission(self, request):
        return not HomeServicesSection.objects.exists()


@admin.register(HomeServiceCard)
class HomeServiceCardAdmin(admin.ModelAdmin):
    form = HomeServiceCardAdminForm
    list_display = ["order", "title_en", "category_en", "button_text_en", "url", "is_active"]
    list_display_links = ["title_en"]
    list_editable = ["order", "is_active"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("title_en", "category_en", "description_en", "button_text_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("title_si", "category_si", "description_si", "button_text_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("title_ta", "category_ta", "description_ta", "button_text_ta"),
        }),
        ("⚙️ Link & Image Settings", {
            "fields": (
                "url",
                ("order", "is_active"),
                ("image", "image_url_fallback"),
                "image_alt",
            ),
        }),
    )


@admin.register(HomeQuickInfoSection)
class HomeQuickInfoSectionAdmin(admin.ModelAdmin):
    form = HomeQuickInfoSectionAdminForm
    list_display = ["section_title_en", "section_title_si", "section_title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("badge_text_en", "section_title_en", "section_description_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("badge_text_si", "section_title_si", "section_description_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("badge_text_ta", "section_title_ta", "section_description_ta"),
        }),
    )

    def has_add_permission(self, request):
        return not HomeQuickInfoSection.objects.exists()


@admin.register(HomeQuickInfoCard)
class HomeQuickInfoCardAdmin(admin.ModelAdmin):
    form = HomeQuickInfoCardAdminForm
    list_display = ["order", "title_en", "card_type", "url", "is_external", "is_active"]
    list_display_links = ["title_en"]
    list_editable = ["order", "is_active"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("title_en", "description_en", "primary_button_label_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("title_si", "description_si", "primary_button_label_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("title_ta", "description_ta", "primary_button_label_ta"),
        }),
        ("⚙️ Card Type & Link Settings", {
            "fields": (
                "card_type",
                "url",
                "is_external",
                ("order", "is_active"),
                ("image", "image_url_fallback"),
                "image_alt",
            ),
        }),
    )


@admin.register(HomeInstitutionsSection)
class HomeInstitutionsSectionAdmin(admin.ModelAdmin):
    form = HomeInstitutionsSectionAdminForm
    list_display = ["section_title_en", "section_title_si", "section_title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("badge_text_en", "section_title_en", "section_description_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("badge_text_si", "section_title_si", "section_description_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("badge_text_ta", "section_title_ta", "section_description_ta"),
        }),
    )

    def has_add_permission(self, request):
        return not HomeInstitutionsSection.objects.exists()


@admin.register(HomeInstitutionCard)
class HomeInstitutionCardAdmin(admin.ModelAdmin):
    form = HomeInstitutionCardAdminForm
    list_display = ["order", "acronym", "title_en", "url", "is_external", "is_active"]
    list_display_links = ["title_en"]
    list_editable = ["order", "is_active"]
    search_fields = ["acronym", "title_en", "title_si", "title_ta"]
    fieldsets = (
        ("Institution Acronym & Identity", {
            "fields": ("acronym",),
        }),
        ("🇬🇧 English Content", {
            "fields": ("title_en", "description_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("title_si", "description_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("title_ta", "description_ta"),
        }),
        ("⚙️ Website Link & Logo Settings", {
            "fields": (
                "url",
                "is_external",
                ("order", "is_active"),
                ("image", "image_url_fallback"),
                "image_alt",
            ),
        }),
    )
