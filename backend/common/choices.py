from django.db import models


class Language(models.TextChoices):
    ENGLISH = "en", "English"
    SINHALA = "si", "Sinhala"
    TAMIL = "ta", "Tamil"


class PublishStatus(models.TextChoices):
    DRAFT = "draft", "Draft"
    PENDING_REVIEW = "pending_review", "Pending Review"
    APPROVED = "approved", "Approved"
    PUBLISHED = "published", "Published"
    ARCHIVED = "archived", "Archived"


class Priority(models.TextChoices):
    NORMAL = "normal", "Normal"
    IMPORTANT = "important", "Important"
    URGENT = "urgent", "Urgent"