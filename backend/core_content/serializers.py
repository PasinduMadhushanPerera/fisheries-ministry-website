from rest_framework import serializers
from .models import (
    InstitutionEntity,
    ProcurementTender,
    CareerRecruitment,
    TrainingProgramme,
    PressRelease,
    SiteSetting,
)


class InstitutionEntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitutionEntity
        fields = ["id", "title", "acronym", "description", "logo", "website_url", "order"]


class ProcurementTenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcurementTender
        fields = ["id", "title", "tender_number", "description", "closing_date", "document"]


class CareerRecruitmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerRecruitment
        fields = ["id", "job_title", "department", "description", "closing_date", "circular_document"]


class TrainingProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingProgramme
        fields = ["id", "title", "training_type", "target_audience", "description", "deadline", "application_form"]


class PressReleaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PressRelease
        fields = ["id", "title", "slug", "category", "published_date", "summary", "content", "cover_image", "pdf_document", "is_featured"]


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = ["ministry_name", "hotline_number", "general_email", "address", "working_hours", "emergency_alert"]
