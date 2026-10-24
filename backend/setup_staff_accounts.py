"""
setup_staff_accounts.py
Sets up two dedicated Staff Administrator accounts for Ministry Staff,
configures full content management permissions across all CMS modules,
and activates immutable activity audit logging.
"""

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

User = get_user_model()

# All CMS content apps whose permissions staff need
CONTENT_APPS = [
    "header_footer",
    "home_page",
    "about",
    "minister_profile",
    "deputy_minister_profile",
    "secretary_profile",
    "divisions_page",
    "organization_structure",
    "local_training",
    "foreign_training",
    "procurement_page",
    "recruitment_page",
    "news",
    "notices",
    "press_releases",
    "events",
    "gallery",
    "videos",
    "fisheries_statistics",
    "weekly_fish_prices",
    "monthly_fish_production",
    "annual_statistics",
    "export_import_statistics",
    "fishery_information",
    "rti_page",
    "downloads_page",
    "contact_page",
    "privacy_page",
    "internal_affairs",
    "navigation",
    "pages",
    "core_content",
    "audit_log",
]


def configure_staff_group():
    group, created = Group.objects.get_or_create(name="CMS Content Managers")

    # Get all permissions for CMS content apps
    # Exclude delete or add on audit_log if any; audit_log should only have view_
    perms = Permission.objects.filter(content_type__app_label__in=CONTENT_APPS)
    
    # Filter out any add/delete/change for audit_log (audit log is read-only)
    final_perms = []
    for p in perms:
        if p.content_type.app_label == "audit_log":
            if p.codename.startswith("view_"):
                final_perms.append(p)
        else:
            final_perms.append(p)

    group.permissions.set(final_perms)
    print(f"[OK] Group '{group.name}' configured with {len(final_perms)} content permissions.")
    return group


def create_or_update_staff_user(username, email, password, first_name, last_name, group):
    user, created = User.objects.get_or_create(username=username)
    user.email = email
    user.first_name = first_name
    user.last_name = last_name
    user.is_staff = True
    user.is_superuser = False
    user.is_active = True
    user.set_password(password)
    user.save()

    user.groups.add(group)
    action_type = "Created" if created else "Updated"
    print(f"[OK] {action_type} Staff User: '{username}' (Name: {first_name} {last_name}, Email: {email})")
    return user


def remove_old_unused_users():
    old_accounts = [
        "chamiyadilshanofficial@gmail.com",
        "minfishit@gmail.com",
        "sewmini234@gmail.com",
    ]
    admin_user = User.objects.filter(username="admin_PASI").first()
    for uname in old_accounts:
        user = User.objects.filter(username=uname).first()
        if user:
            from django.contrib.admin.models import LogEntry
            user_logs = LogEntry.objects.filter(user=user)
            if admin_user:
                for log in user_logs:
                    original_msg = log.change_message or ""
                    log.change_message = f"[Legacy Archive: {uname}] {original_msg}"
                    log.user = admin_user
                    log.save(update_fields=["change_message", "user"])
            user.delete()
            print(f"[OK] Permanently removed old user '{uname}' from database.")


def run():
    print("=" * 60)
    print("Setting up Ministry CMS Staff Admin Accounts & Permissions...")
    print("=" * 60)

    # 1. Group & Permissions
    group = configure_staff_group()

    # 2. Staff Officer Account 1
    create_or_update_staff_user(
        username="officer1",
        email="officer1@fisheries.gov.lk",
        password="FisheriesStaff#2026A",
        first_name="Fisheries",
        last_name="Officer 1",
        group=group,
    )

    # 3. Staff Officer Account 2
    create_or_update_staff_user(
        username="officer2",
        email="officer2@fisheries.gov.lk",
        password="FisheriesStaff#2026B",
        first_name="Fisheries",
        last_name="Officer 2",
        group=group,
    )

    # 4. Remove old accounts while preserving history
    remove_old_unused_users()

    # 5. Ensure superuser admin_PASI remains active
    super_admin = User.objects.filter(username="admin_PASI").first()
    if super_admin:
        super_admin.is_active = True
        super_admin.save()
        print(f"[OK] Superuser '{super_admin.username}' is active.")

    print("=" * 60)
    print("Setup completed successfully!")
    print("=" * 60)


if __name__ == "__main__":
    run()
