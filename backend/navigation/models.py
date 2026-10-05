from django.db import models
from common.models import TimeStampedModel


class MenuItem(TimeStampedModel):
    """
    Hierarchical navigation menu item allowing administrators to customize
    main navigation bar tabs, dropdown menus, and sub-items dynamically.
    """
    title = models.CharField(
        max_length=120,
        help_text="Navigation tab title (e.g. 'About Us', 'Services', 'Opportunities').",
    )
    url = models.CharField(
        max_length=255,
        help_text="Target URL route (e.g. '/about/overview', '/marine-safety', or 'https://...').",
    )
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children",
        help_text="Leave blank for top-level navbar tabs. Select a parent to make this a dropdown child item.",
    )
    description = models.CharField(
        max_length=255,
        blank=True,
        help_text="Optional subtitle/description displayed under dropdown item title.",
    )
    badge = models.CharField(
        max_length=40,
        blank=True,
        help_text="Optional badge tag (e.g. 'Portal', 'New', 'Live').",
    )
    order = models.PositiveIntegerField(
        default=0,
        db_index=True,
        help_text="Sort order from left to right (e.g. 1, 2, 3...).",
    )
    is_external = models.BooleanField(
        default=False,
        help_text="Check if this links to an external website (opens in a new tab).",
    )
    is_active = models.BooleanField(
        default=True,
        db_index=True,
        help_text="Toggle visibility in the navigation bar.",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Navigation Menu Item"
        verbose_name_plural = "Navigation Menu Items"

    def __str__(self) -> str:
        if self.parent:
            return f"  ↳ Sub-item under '{self.parent.title}': {self.title} ({self.url})"
        return f"⭐ TOP-LEVEL TAB: {self.title} ({self.url})"
