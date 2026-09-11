from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from common.models import TimeStampedModel


def page_banner_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"pages/banners/{timezone.now():%Y/%m}/{safe_filename}"


class DynamicPage(TimeStampedModel):
    """
    Allows administrators to create and customize dynamic pages with rich content
    and publish them instantly to the live website.
    """
    title = models.CharField(
        max_length=255,
        help_text="Page title displayed at the top of the page.",
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        db_index=True,
        help_text="URL path for this page (e.g., 'marine-safety' creates http://.../marine-safety).",
    )
    hero_title = models.CharField(
        max_length=255,
        blank=True,
        help_text="Custom hero banner title (optional, defaults to Page Title).",
    )
    hero_subtitle = models.TextField(
        blank=True,
        help_text="Introductory text displayed inside the hero banner.",
    )
    badge_text = models.CharField(
        max_length=100,
        default="Ministry Portal",
        help_text="Small pill badge displayed above hero title (e.g. 'Public Notice', 'Official Guidelines').",
    )
    banner_image = models.ImageField(
        upload_to=page_banner_upload_path,
        blank=True,
        null=True,
        help_text="Optional banner image for hero header.",
    )
    content = models.TextField(
        help_text="Rich HTML content formatted via editor (supports headings, tables, bullet points, images, quotes).",
    )
    
    # Optional Sidebar / Callout Card
    show_sidebar = models.BooleanField(
        default=False,
        help_text="Enable a contact/action card in the right sidebar of the page.",
    )
    sidebar_title = models.CharField(
        max_length=150,
        blank=True,
        default="Contact & Inquiries",
    )
    sidebar_content = models.TextField(
        blank=True,
        help_text="Optional contact details, phone, email, or instructions for sidebar card.",
    )
    
    # SEO & Publishing
    is_published = models.BooleanField(
        default=True,
        db_index=True,
        help_text="If checked, this page will be publicly accessible on the website.",
    )
    meta_title = models.CharField(
        max_length=150,
        blank=True,
        help_text="SEO Page Title for search engines and social sharing.",
    )
    meta_description = models.TextField(
        max_length=300,
        blank=True,
        help_text="SEO Meta Description for search engines.",
    )
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Order in internal page listings.",
    )

    class Meta:
        ordering = ["display_order", "-created_at"]
        verbose_name = "Dynamic Page"
        verbose_name_plural = "Dynamic Pages"

    def __str__(self) -> str:
        return f"{self.title} (/{self.slug})"

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.hero_title:
            self.hero_title = self.title
        super().save(*args, **kwargs)
