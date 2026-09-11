from django.contrib import admin
from django.db import models
from common.widgets import RichTextAdminWidget
from .models import (
    InstitutionEntity,
    ProcurementTender,
    CareerRecruitment,
    TrainingProgramme,
    PressRelease,
    SiteSetting,
)


@admin.register(InstitutionEntity)
class InstitutionEntityAdmin(admin.ModelAdmin):
    list_display = ["acronym", "title", "website_url", "order", "is_active"]
    list_editable = ["order", "is_active"]
    search_fields = ["title", "acronym", "description"]


@admin.register(ProcurementTender)
class ProcurementTenderAdmin(admin.ModelAdmin):
    list_display = ["tender_number", "title", "closing_date", "is_active"]
    list_filter = ["is_active", "closing_date"]
    search_fields = ["title", "tender_number", "description"]


@admin.register(CareerRecruitment)
class CareerRecruitmentAdmin(admin.ModelAdmin):
    list_display = ["job_title", "department", "closing_date", "is_active"]
    list_filter = ["is_active", "department"]
    search_fields = ["job_title", "department", "description"]


@admin.register(TrainingProgramme)
class TrainingProgrammeAdmin(admin.ModelAdmin):
    list_display = ["title", "training_type", "target_audience", "deadline", "is_active"]
    list_filter = ["training_type", "is_active"]
    search_fields = ["title", "target_audience", "description"]


@admin.register(PressRelease)
class PressReleaseAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "published_date", "is_featured", "is_published"]
    list_filter = ["category", "is_featured", "is_published", "published_date"]
    search_fields = ["title", "summary", "content"]
    list_editable = ["is_featured", "is_published"]
    prepopulated_fields = {"slug": ("title",)}
    formfield_overrides = {
        models.TextField: {"widget": RichTextAdminWidget},
    }


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ["ministry_name", "hotline_number", "general_email", "updated_at"]

    def has_add_permission(self, request):
        # Only allow 1 instance
        return not SiteSetting.objects.exists()
