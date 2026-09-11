from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from common.models import TimeStampedModel


class InstitutionEntity(TimeStampedModel):
    """
    Statutory bodies, research institutes, and service organizations
    under the Ministry (e.g. DFAR, NARA, NAQDA, CFHC, CFC, CNFL, NSL).
    """
    title = models.CharField(max_length=255)
    acronym = models.CharField(max_length=50)
    description = models.TextField()
    logo = models.ImageField(upload_to="institutions/logos/", blank=True, null=True)
    website_url = models.URLField(help_text="Official website link (e.g. 'https://fisheriesdept.gov.lk/').")
    order = models.PositiveIntegerField(default=0, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Institution / Organization"
        verbose_name_plural = "Institutions & Organizations"

    def __str__(self) -> str:
        return f"{self.acronym} - {self.title}"


class ProcurementTender(TimeStampedModel):
    """
    Procurement notices, bids, and tender document publications.
    """
    title = models.CharField(max_length=255)
    tender_number = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    closing_date = models.DateTimeField(null=True, blank=True)
    document = models.FileField(upload_to="procurement/documents/", blank=True, null=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["-closing_date", "-created_at"]
        verbose_name = "Procurement Tender"
        verbose_name_plural = "Procurement & Tenders"

    def __str__(self) -> str:
        return f"{self.tender_number} - {self.title}" if self.tender_number else self.title


class CareerRecruitment(TimeStampedModel):
    """
    Job vacancies, recruitment circulars, and application downloads.
    """
    job_title = models.CharField(max_length=255)
    department = models.CharField(max_length=150, blank=True, default="Ministry of Fisheries")
    description = models.TextField(blank=True)
    closing_date = models.DateField(null=True, blank=True)
    circular_document = models.FileField(upload_to="recruitment/circulars/", blank=True, null=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["-closing_date", "-created_at"]
        verbose_name = "Career Vacancy"
        verbose_name_plural = "Careers & Recruitment"

    def __str__(self) -> str:
        return self.job_title


class TrainingProgramme(TimeStampedModel):
    """
    Local training programmes and foreign technical exchange opportunities.
    """
    TRAINING_TYPES = [
        ("local", "Local Training Programme"),
        ("foreign", "Foreign Technical Exchange"),
    ]

    title = models.CharField(max_length=255)
    training_type = models.CharField(max_length=20, choices=TRAINING_TYPES, default="local")
    target_audience = models.CharField(max_length=150, blank=True, help_text="e.g. 'Artisanal Fishers', 'Youth', 'Aquaculturists'")
    description = models.TextField(blank=True)
    deadline = models.DateField(null=True, blank=True)
    application_form = models.FileField(upload_to="training/forms/", blank=True, null=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["-deadline", "-created_at"]
        verbose_name = "Training Programme"
        verbose_name_plural = "Training & Exchange Programmes"

    def __str__(self) -> str:
        return f"[{self.get_training_type_display()}] {self.title}"


class PressRelease(TimeStampedModel):
    """
    Official ministerial press releases, media statements, and announcements.
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    category = models.CharField(max_length=100, default="Media Statement")
    published_date = models.DateField(default=timezone.now, db_index=True)
    summary = models.TextField(max_length=500, blank=True)
    content = models.TextField(help_text="Full press release article text.")
    cover_image = models.ImageField(upload_to="press_releases/covers/", blank=True, null=True)
    pdf_document = models.FileField(upload_to="press_releases/documents/", blank=True, null=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    is_published = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["-published_date", "-created_at"]
        verbose_name = "Press Release"
        verbose_name_plural = "Press Releases"

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class SiteSetting(TimeStampedModel):
    """
    Global site settings, hotlines, and contact details (Singleton).
    """
    ministry_name = models.CharField(max_length=255, default="Ministry of Fisheries, Aquatic and Ocean Resources")
    hotline_number = models.CharField(max_length=50, default="+94 11 244 6183")
    general_email = models.EmailField(default="info@fisheries.gov.lk")
    address = models.TextField(default="Ministry of Fisheries, New Secretariat, Maligawatta, Colombo 10, Sri Lanka")
    working_hours = models.CharField(max_length=100, default="Monday – Friday: 8:30 AM – 4:15 PM")
    emergency_alert = models.CharField(max_length=255, blank=True, help_text="Emergency banner displayed on homepage if filled.")

    class Meta:
        verbose_name = "Global Site Setting"
        verbose_name_plural = "Global Site Settings"

    def __str__(self) -> str:
        return "Global Site Settings"
