from django.conf import settings
from django.db import models
from django.utils.text import slugify


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class UserTrackingModel(models.Model):
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="%(class)s_created",
    )

    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="%(class)s_updated",
    )

    class Meta:
        abstract = True


class SlugModel(models.Model):
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
    )

    class Meta:
        abstract = True

    def get_slug_source(self):
        raise NotImplementedError(
            "Child model must implement get_slug_source()."
        )

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.get_slug_source())
            slug = base_slug
            counter = 1

            while (
                self.__class__.objects.filter(slug=slug)
                .exclude(pk=self.pk)
                .exists()
            ):
                counter += 1
                slug = f"{base_slug}-{counter}"

            self.slug = slug

        super().save(*args, **kwargs)