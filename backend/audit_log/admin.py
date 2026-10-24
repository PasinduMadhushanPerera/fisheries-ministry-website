import json
from collections import OrderedDict
from django.contrib import admin
from django.contrib.admin.models import ADDITION, CHANGE, DELETION
from django.utils import timezone
from django.utils.html import format_html, escape
from .models import AuditLogEntry


@admin.register(AuditLogEntry)
class AuditLogEntryAdmin(admin.ModelAdmin):
    """
    Dedicated, read-only Admin interface for Activity History & Audit Logs.
    Strictly prevents editing, adding, or deleting any history entries.
    Allows filtering by staff user, action type, date, and content section.
    """
    list_display = [
        "action_time_formatted",
        "user_badge",
        "action_badge",
        "module_badge",
        "target_object",
        "change_summary",
    ]
    list_filter = [
        ("user", admin.RelatedOnlyFieldListFilter),
        "action_flag",
        ("content_type", admin.RelatedOnlyFieldListFilter),
        ("action_time", admin.DateFieldListFilter),
    ]
    search_fields = [
        "user__username",
        "user__first_name",
        "user__last_name",
        "object_repr",
        "change_message",
    ]
    ordering = ["-action_time"]
    list_per_page = 40

    readonly_fields = [
        "action_time_display",
        "user_display",
        "action_flag_display",
        "content_type_display",
        "object_id",
        "object_repr",
        "detailed_change_message",
    ]
    fields = readonly_fields

    # Complete protection against deletion or modification
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False  # Opens change_form in read-only view

    def has_delete_permission(self, request, obj=None):
        return False  # Absolutely NO delete option

    def has_view_permission(self, request, obj=None):
        return True

    # Disable bulk actions dropdown completely (no delete selected)
    actions = None

    def get_actions(self, request):
        return OrderedDict()

    # Custom column formatters
    @admin.display(description="Timestamp (වේලාව)", ordering="action_time")
    def action_time_formatted(self, obj):
        local_time = timezone.localtime(obj.action_time)
        return format_html(
            '<span style="font-family: monospace; font-size: 0.85rem; font-weight: 700; color: #334155;">{}</span>',
            local_time.strftime("%Y-%m-%d %H:%M:%S")
        )

    @admin.display(description="Staff User (නිලධාරියා)", ordering="user__username")
    def user_badge(self, obj):
        if not obj.user:
            return format_html('<span style="color: #94a3b8; font-style: italic;">System</span>')
        
        full_name = obj.user.get_full_name()
        display_text = f"{full_name} ({obj.user.username})" if full_name else obj.user.username
        role_indicator = "👑 Superuser" if obj.user.is_superuser else "👤 Staff"

        return format_html(
            '<div style="display: flex; flex-direction: column; gap: 2px;">'
            '  <span style="font-weight: 800; color: #0f172a; font-size: 0.88rem;">👤 {}</span>'
            '  <span style="font-size: 0.72rem; color: #64748b; font-weight: 600;">{}</span>'
            '</div>',
            display_text,
            role_indicator
        )

    @admin.display(description="Action (ක්‍රියාව)", ordering="action_flag")
    def action_badge(self, obj):
        if obj.action_flag == ADDITION:
            return format_html(
                '<span style="display: inline-flex; align-items: center; gap: 5px; '
                'background: #dcfce7; color: #15803d; border: 1px solid #86efac; '
                'padding: 3px 9px; border-radius: 9999px; font-weight: 800; font-size: 0.75rem;">'
                '➕ Added (එක් කළා)</span>'
            )
        elif obj.action_flag == CHANGE:
            return format_html(
                '<span style="display: inline-flex; align-items: center; gap: 5px; '
                'background: #fef3c7; color: #b45309; border: 1px solid #fde68a; '
                'padding: 3px 9px; border-radius: 9999px; font-weight: 800; font-size: 0.75rem;">'
                '✏️ Modified (වෙනස් කළා)</span>'
            )
        elif obj.action_flag == DELETION:
            return format_html(
                '<span style="display: inline-flex; align-items: center; gap: 5px; '
                'background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; '
                'padding: 3px 9px; border-radius: 9999px; font-weight: 800; font-size: 0.75rem;">'
                '🗑️ Deleted (ඉවත් කළා)</span>'
            )
        return str(obj.action_flag)

    @admin.display(description="Section / Module (අංශය)", ordering="content_type__model")
    def module_badge(self, obj):
        if not obj.content_type:
            return "—"
        model_name = obj.content_type.name.title()
        app_label = obj.content_type.app_label
        return format_html(
            '<span style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; '
            'padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 0.78rem;">'
            '📁 {} <span style="font-size: 0.70rem; color: #0284c7;">({})</span></span>',
            model_name,
            app_label
        )

    @admin.display(description="Target Item / Record (ඉලක්ක අයිතමය)", ordering="object_repr")
    def target_object(self, obj):
        title = obj.object_repr or "—"
        if len(title) > 65:
            title = title[:62] + "..."
        return format_html('<span style="font-weight: 600; color: #1e293b;" title="{}">{}</span>', escape(obj.object_repr), escape(title))

    @admin.display(description="Change Details (වෙනස් කළ විස්තර)")
    def change_summary(self, obj):
        msg = obj.change_message or ""
        if not msg:
            return format_html('<span style="color: #94a3b8; font-style: italic;">No specific fields logged</span>')

        # Try parsing standard Django admin JSON change message
        try:
            parsed = json.loads(msg)
            if isinstance(parsed, list):
                parts = []
                for item in parsed:
                    if "added" in item:
                        parts.append("✅ New item created")
                    elif "changed" in item:
                        fields = item.get("changed", {}).get("fields", [])
                        if fields:
                            fields_str = ", ".join(fields[:4])
                            if len(fields) > 4:
                                fields_str += f" (+{len(fields)-4} more)"
                            parts.append(f"Fields: <strong>{fields_str}</strong>")
                        else:
                            parts.append("Updated details")
                    elif "deleted" in item:
                        name = item.get("deleted", {}).get("name", "item")
                        parts.append(f"Deleted {name}")
                if parts:
                    return format_html('<span style="font-size: 0.82rem; color: #475569;">{}</span>', format_html("; ".join(parts)))
        except Exception:
            pass

        # Fallback to plain text truncated
        display_msg = msg[:75] + "..." if len(msg) > 75 else msg
        return format_html('<span style="font-size: 0.82rem; color: #475569;">{}</span>', escape(display_msg))

    # Readonly detail view helpers
    @admin.display(description="Timestamp (දිනය සහ වේලාව)")
    def action_time_display(self, obj):
        local_time = timezone.localtime(obj.action_time)
        return local_time.strftime("%Y-%m-%d %H:%M:%S (%Z)")

    @admin.display(description="Staff Officer / User (නිලධාරියා)")
    def user_display(self, obj):
        if not obj.user:
            return "System / Unknown"
        return f"{obj.user.get_full_name()} (Username: {obj.user.username}, Email: {obj.user.email})"

    @admin.display(description="Action Performed (සිදු කළ ක්‍රියාව)")
    def action_flag_display(self, obj):
        return self.action_badge(obj)

    @admin.display(description="Content Type / Model")
    def content_type_display(self, obj):
        if not obj.content_type:
            return "—"
        return f"{obj.content_type.name} (App: {obj.content_type.app_label}, Model: {obj.content_type.model})"

    @admin.display(description="Detailed Change Description (සවිස්තරාත්මක සටහන)")
    def detailed_change_message(self, obj):
        msg = obj.change_message or ""
        if not msg:
            return "No change message recorded."
        try:
            parsed = json.loads(msg)
            formatted_json = json.dumps(parsed, indent=2, ensure_ascii=False)
            return format_html(
                '<pre style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; '
                'border-radius: 8px; font-family: monospace; font-size: 0.88rem; max-width: 700px; '
                'white-space: pre-wrap; word-break: break-all;">{}</pre>',
                formatted_json
            )
        except Exception:
            return format_html('<div style="font-size: 0.9rem; line-height: 1.6;">{}</div>', escape(msg))


from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from django.contrib.auth.models import Group

User = get_user_model()


class CustomUserAdmin(DefaultUserAdmin):
    """
    Enhanced UserAdmin that automatically assigns 'CMS Content Managers' group
    when superadmin creates or updates a staff user (is_staff=True) without groups.
    Ensures newly added users immediately have full website management permissions.
    """
    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        obj = form.instance
        if obj.is_staff and not obj.is_superuser and not obj.groups.exists():
            group = Group.objects.filter(name="CMS Content Managers").first()
            if group:
                obj.groups.add(group)


try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass
admin.site.register(User, CustomUserAdmin)

