from django.db import models
from django.contrib.admin.models import LogEntry
from django.core.exceptions import PermissionDenied
from django.db.models.signals import pre_delete
from django.dispatch import receiver


class ImmutableAuditQuerySet(models.QuerySet):
    """
    QuerySet that prevents bulk deletion of audit records.
    """
    def delete(self):
        raise PermissionDenied(
            "Bulk deletion is disabled. Audit history records cannot be deleted."
        )


class AuditLogEntry(LogEntry):
    """
    Proxy model of Django's LogEntry for CMS Activity History and Audit Trail.
    Provides strictly immutable tracking of staff and admin operations.
    """
    objects = ImmutableAuditQuerySet.as_manager()

    class Meta:
        proxy = True
        app_label = "audit_log"
        verbose_name = "Activity History & Audit Record"
        verbose_name_plural = "Activity History & Audit Logs (ක්‍රියාකාරකම් ඉතිහාසය)"
        ordering = ["-action_time"]

    def delete(self, *args, **kwargs):
        raise PermissionDenied(
            "Audit history records cannot be deleted. They are permanent government audit trails."
        )


@receiver(pre_delete)
def prevent_audit_log_deletion(sender, instance, **kwargs):
    """
    Strictly prevents deletion of any LogEntry or AuditLogEntry instances
    at the ORM / database level.
    """
    if isinstance(sender, type) and issubclass(sender, LogEntry):
        raise PermissionDenied(
            "Audit history records cannot be deleted. They are permanent government audit trails."
        )
