from django import forms
from django.contrib import admin
from .models import (
    AboutOverview,
    AboutVisionMission,
    AboutObjectiveHeader,
    AboutObjective,
    AboutLeadershipHeader,
    AboutLeader,
    AboutOrganizationStructure,
    AboutTimelineHeader,
    AboutTimelineEvent,
)


# Form classes with custom textarea sizes
class AboutOverviewAdminForm(forms.ModelForm):
    class Meta:
        model = AboutOverview
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
            "legacy_content_en": forms.Textarea(attrs={"rows": 3}),
            "legacy_content_si": forms.Textarea(attrs={"rows": 3}),
            "legacy_content_ta": forms.Textarea(attrs={"rows": 3}),
            "economic_content_en": forms.Textarea(attrs={"rows": 3}),
            "economic_content_si": forms.Textarea(attrs={"rows": 3}),
            "economic_content_ta": forms.Textarea(attrs={"rows": 3}),
            "economic_subcontent_en": forms.Textarea(attrs={"rows": 2}),
            "economic_subcontent_si": forms.Textarea(attrs={"rows": 2}),
            "economic_subcontent_ta": forms.Textarea(attrs={"rows": 2}),
            "pillar_1_description_en": forms.Textarea(attrs={"rows": 2}),
            "pillar_1_description_si": forms.Textarea(attrs={"rows": 2}),
            "pillar_1_description_ta": forms.Textarea(attrs={"rows": 2}),
            "pillar_2_description_en": forms.Textarea(attrs={"rows": 2}),
            "pillar_2_description_si": forms.Textarea(attrs={"rows": 2}),
            "pillar_2_description_ta": forms.Textarea(attrs={"rows": 2}),
            "pillar_3_description_en": forms.Textarea(attrs={"rows": 2}),
            "pillar_3_description_si": forms.Textarea(attrs={"rows": 2}),
            "pillar_3_description_ta": forms.Textarea(attrs={"rows": 2}),
            "benefit_banner_text_en": forms.Textarea(attrs={"rows": 2}),
            "benefit_banner_text_si": forms.Textarea(attrs={"rows": 2}),
            "benefit_banner_text_ta": forms.Textarea(attrs={"rows": 2}),
        }


class AboutVisionMissionAdminForm(forms.ModelForm):
    class Meta:
        model = AboutVisionMission
        fields = "__all__"
        widgets = {
            "vision_description_en": forms.Textarea(attrs={"rows": 3}),
            "vision_description_si": forms.Textarea(attrs={"rows": 3}),
            "vision_description_ta": forms.Textarea(attrs={"rows": 3}),
            "mission_description_en": forms.Textarea(attrs={"rows": 3}),
            "mission_description_si": forms.Textarea(attrs={"rows": 3}),
            "mission_description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class AboutObjectiveAdminForm(forms.ModelForm):
    class Meta:
        model = AboutObjective
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


class AboutLeaderAdminForm(forms.ModelForm):
    class Meta:
        model = AboutLeader
        fields = "__all__"
        widgets = {
            "short_description_en": forms.Textarea(attrs={"rows": 3}),
            "short_description_si": forms.Textarea(attrs={"rows": 3}),
            "short_description_ta": forms.Textarea(attrs={"rows": 3}),
            "message_content_en": forms.Textarea(attrs={"rows": 4}),
            "message_content_si": forms.Textarea(attrs={"rows": 4}),
            "message_content_ta": forms.Textarea(attrs={"rows": 4}),
        }


class AboutTimelineEventAdminForm(forms.ModelForm):
    class Meta:
        model = AboutTimelineEvent
        fields = "__all__"
        widgets = {
            "description_en": forms.Textarea(attrs={"rows": 3}),
            "description_si": forms.Textarea(attrs={"rows": 3}),
            "description_ta": forms.Textarea(attrs={"rows": 3}),
        }


# ==========================================================
# Admin Model Registrations
# ==========================================================
@admin.register(AboutOverview)
class AboutOverviewAdmin(admin.ModelAdmin):
    form = AboutOverviewAdminForm
    list_display = ["title_en", "title_si", "title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": (
                ("eyebrow_en", "title_en"),
                "description_en",
                ("legacy_title_en", "legacy_content_en"),
                ("economic_title_en", "economic_content_en", "economic_subcontent_en"),
                ("stat_1_label_en", "stat_2_label_en", "stat_3_label_en", "stat_4_label_en"),
                "cta_button_text_en",
                ("pillar_mandate_badge_en", "pillar_mandate_title_en"),
                ("pillar_1_title_en", "pillar_1_description_en"),
                ("pillar_2_title_en", "pillar_2_description_en"),
                ("pillar_3_title_en", "pillar_3_description_en"),
                ("benefit_banner_title_en", "benefit_banner_text_en"),
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                ("eyebrow_si", "title_si"),
                "description_si",
                ("legacy_title_si", "legacy_content_si"),
                ("economic_title_si", "economic_content_si", "economic_subcontent_si"),
                ("stat_1_label_si", "stat_2_label_si", "stat_3_label_si", "stat_4_label_si"),
                "cta_button_text_si",
                ("pillar_mandate_badge_si", "pillar_mandate_title_si"),
                ("pillar_1_title_si", "pillar_1_description_si"),
                ("pillar_2_title_si", "pillar_2_description_si"),
                ("pillar_3_title_si", "pillar_3_description_si"),
                ("benefit_banner_title_si", "benefit_banner_text_si"),
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                ("eyebrow_ta", "title_ta"),
                "description_ta",
                ("legacy_title_ta", "legacy_content_ta"),
                ("economic_title_ta", "economic_content_ta", "economic_subcontent_ta"),
                ("stat_1_label_ta", "stat_2_label_ta", "stat_3_label_ta", "stat_4_label_ta"),
                "cta_button_text_ta",
                ("pillar_mandate_badge_ta", "pillar_mandate_title_ta"),
                ("pillar_1_title_ta", "pillar_1_description_ta"),
                ("pillar_2_title_ta", "pillar_2_description_ta"),
                ("pillar_3_title_ta", "pillar_3_description_ta"),
                ("benefit_banner_title_ta", "benefit_banner_text_ta"),
            ),
        }),
        ("⚙️ Statistical Numbers & Links", {
            "fields": (
                ("stat_1_value", "stat_2_value", "stat_3_value", "stat_4_value"),
                "cta_button_url",
            ),
        }),
    )

    def has_add_permission(self, request):
        return not AboutOverview.objects.exists()


@admin.register(AboutVisionMission)
class AboutVisionMissionAdmin(admin.ModelAdmin):
    form = AboutVisionMissionAdminForm
    list_display = ["title_en", "title_si", "title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": (
                ("eyebrow_en", "title_en"),
                "description_en",
                ("vision_badge_en", "vision_heading_en", "vision_description_en", "vision_footer_en"),
                ("mission_badge_en", "mission_heading_en", "mission_description_en", "mission_footer_en"),
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                ("eyebrow_si", "title_si"),
                "description_si",
                ("vision_badge_si", "vision_heading_si", "vision_description_si", "vision_footer_si"),
                ("mission_badge_si", "mission_heading_si", "mission_description_si", "mission_footer_si"),
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                ("eyebrow_ta", "title_ta"),
                "description_ta",
                ("vision_badge_ta", "vision_heading_ta", "vision_description_ta", "vision_footer_ta"),
                ("mission_badge_ta", "mission_heading_ta", "mission_description_ta", "mission_footer_ta"),
            ),
        }),
    )

    def has_add_permission(self, request):
        return not AboutVisionMission.objects.exists()


@admin.register(AboutObjectiveHeader)
class AboutObjectiveHeaderAdmin(admin.ModelAdmin):
    list_display = ["title_en", "title_si", "title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("eyebrow_en", "title_en", "description_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("eyebrow_si", "title_si", "description_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("eyebrow_ta", "title_ta", "description_ta"),
        }),
    )

    def has_add_permission(self, request):
        return not AboutObjectiveHeader.objects.exists()


@admin.register(AboutObjective)
class AboutObjectiveAdmin(admin.ModelAdmin):
    form = AboutObjectiveAdminForm
    list_display = ["order", "number_badge", "title_en", "icon_name", "is_active"]
    list_display_links = ["title_en"]
    list_editable = ["order", "is_active"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("title_en", "description_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("title_si", "description_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("title_ta", "description_ta"),
        }),
        ("⚙️ Display Settings", {
            "fields": (("number_badge", "icon_name"), ("order", "is_active")),
        }),
    )


@admin.register(AboutLeadershipHeader)
class AboutLeadershipHeaderAdmin(admin.ModelAdmin):
    list_display = ["title_en", "title_si", "title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("eyebrow_en", "title_en", "description_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("eyebrow_si", "title_si", "description_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("eyebrow_ta", "title_ta", "description_ta"),
        }),
    )

    def has_add_permission(self, request):
        return not AboutLeadershipHeader.objects.exists()


@admin.register(AboutLeader)
class AboutLeaderAdmin(admin.ModelAdmin):
    form = AboutLeaderAdminForm
    list_display = ["role_type", "name_en", "role_title_en", "is_active"]
    list_display_links = ["name_en"]
    fieldsets = (
        ("Executive Role & Identity", {
            "fields": ("role_type", "order", "is_active"),
        }),
        ("🇬🇧 English Content", {
            "fields": (
                ("name_en", "role_title_en"),
                "ministry_badge_en",
                "short_description_en",
                ("message_title_en", "message_content_en"),
                "office_address_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                ("name_si", "role_title_si"),
                "ministry_badge_si",
                "short_description_si",
                ("message_title_si", "message_content_si"),
                "office_address_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                ("name_ta", "role_title_ta"),
                "ministry_badge_ta",
                "short_description_ta",
                ("message_title_ta", "message_content_ta"),
                "office_address_ta",
            ),
        }),
        ("⚙️ Portrait, Contact Desk & Links", {
            "fields": (
                ("photo", "photo_fallback"),
                "photo_alt",
                ("office_phone", "office_email", "office_hours"),
                "page_url",
            ),
        }),
    )


@admin.register(AboutOrganizationStructure)
class AboutOrganizationStructureAdmin(admin.ModelAdmin):
    list_display = ["title_en", "title_si", "title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": (
                ("eyebrow_en", "title_en"),
                "description_en",
                ("chart_box_title_en", "chart_box_subtitle_en"),
                "executive_notes_en",
            ),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": (
                ("eyebrow_si", "title_si"),
                "description_si",
                ("chart_box_title_si", "chart_box_subtitle_si"),
                "executive_notes_si",
            ),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": (
                ("eyebrow_ta", "title_ta"),
                "description_ta",
                ("chart_box_title_ta", "chart_box_subtitle_ta"),
                "executive_notes_ta",
            ),
        }),
        ("⚙️ Chart Media & Downloads", {
            "fields": (("chart_image", "chart_fallback"), "chart_pdf"),
        }),
    )

    def has_add_permission(self, request):
        return not AboutOrganizationStructure.objects.exists()


@admin.register(AboutTimelineHeader)
class AboutTimelineHeaderAdmin(admin.ModelAdmin):
    list_display = ["title_en", "title_si", "title_ta", "updated_at"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("eyebrow_en", "title_en", "description_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("eyebrow_si", "title_si", "description_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("eyebrow_ta", "title_ta", "description_ta"),
        }),
    )

    def has_add_permission(self, request):
        return not AboutTimelineHeader.objects.exists()


@admin.register(AboutTimelineEvent)
class AboutTimelineEventAdmin(admin.ModelAdmin):
    form = AboutTimelineEventAdminForm
    list_display = ["order", "year", "title_en", "status_badge_en", "is_active"]
    list_display_links = ["title_en"]
    list_editable = ["order", "is_active"]
    fieldsets = (
        ("🇬🇧 English Content", {
            "fields": ("title_en", "description_en", "status_badge_en"),
        }),
        ("🇱🇰 Sinhala Content (සිංහල)", {
            "fields": ("title_si", "description_si", "status_badge_si"),
        }),
        ("🇱🇰 Tamil Content (தமிழ்)", {
            "fields": ("title_ta", "description_ta", "status_badge_ta"),
        }),
        ("⚙️ Year & Ordering", {
            "fields": ("year", "order", "is_active"),
        }),
    )