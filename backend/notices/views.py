from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.utils import timezone
from django.db.models import Q, Prefetch

from .models import Notice, NoticeTranslation
from .serializers import (
    NoticeDetailSerializer,
    NoticeListSerializer,
)


class NoticeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public Notice API
    """

    permission_classes = [AllowAny]
    lookup_field = "id"

    def get_queryset(self):
        now = timezone.now()

        return (
        Notice.objects.filter(
            status="published",
            published_at__lte=now,
        )
        .filter(
            Q(expires_at__isnull=True) |
            Q(expires_at__gte=now)
        )
        .select_related("category")
        .prefetch_related(
            Prefetch(
                "translations",
                queryset=NoticeTranslation.objects.all(),
                to_attr="prefetched_translations",
            ),
            "attachments",
        )
        .order_by("-published_at", "-created_at")
    )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return NoticeDetailSerializer

        return NoticeListSerializer