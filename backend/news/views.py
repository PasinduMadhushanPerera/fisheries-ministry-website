from django.db.models import Prefetch, Q
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import (
    News,
    NewsAttachment,
    NewsTranslation,
)
from .serializers import (
    NewsDetailSerializer,
    NewsListSerializer,
)


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public read-only News API.
    """

    permission_classes = [AllowAny]
    lookup_field = "id"

    def get_queryset(self):
        now = timezone.now()

        queryset = (
            News.objects.filter(
                status="published",
                published_at__lte=now,
            )
            .filter(
                Q(expires_at__isnull=True)
                | Q(expires_at__gte=now)
            )
            .select_related("category")
            .prefetch_related(
                Prefetch(
                    "translations",
                    queryset=NewsTranslation.objects.all(),
                    to_attr="prefetched_translations",
                ),
                Prefetch(
                    "attachments",
                    queryset=NewsAttachment.objects.filter(
                        is_public=True,
                    ).order_by(
                        "sort_order",
                        "created_at",
                    ),
                ),
            )
        )

        category = self.request.query_params.get(
            "category"
        )
        search = self.request.query_params.get("search")
        featured = self.request.query_params.get(
            "featured"
        )

        if category and category != "all":
            queryset = queryset.filter(
                category__slug=category,
            )

        if featured in {"true", "1"}:
            queryset = queryset.filter(
                is_featured=True,
            )

        if search:
            queryset = queryset.filter(
                Q(translations__title__icontains=search)
                | Q(
                    translations__summary__icontains=search
                )
                | Q(
                    translations__content__icontains=search
                )
                | Q(category__name__icontains=search)
            ).distinct()

        return queryset.order_by(
            "-is_featured",
            "-published_at",
            "-created_at",
        )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return NewsDetailSerializer

        return NewsListSerializer