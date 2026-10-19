from django.db.models import F
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HeaderSetting, FooterSetting, WebsiteViewsCounter, SiteMaintenanceSetting
from .serializers import HeaderSettingSerializer, FooterSettingSerializer, SiteMaintenanceSettingSerializer


class HeaderFooterDataView(APIView):
    """
    Returns global settings for Common Header & Footer.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.query_params.get("lang", "en")
        header_setting, _ = HeaderSetting.objects.get_or_create(id=1)
        footer_setting, _ = FooterSetting.objects.get_or_create(id=1)
        views_counter, _ = WebsiteViewsCounter.objects.get_or_create(id=1)
        maintenance_setting, _ = SiteMaintenanceSetting.objects.get_or_create(id=1)

        header_data = HeaderSettingSerializer(header_setting, context={"request": request, "lang": lang}).data
        footer_data = FooterSettingSerializer(footer_setting, context={"request": request, "lang": lang}).data
        maintenance_data = SiteMaintenanceSettingSerializer(maintenance_setting, context={"request": request, "lang": lang}).data

        return Response({
            "header": header_data,
            "footer": footer_data,
            "maintenance": maintenance_data,
            "total_views": views_counter.total_views,
        })


class SiteMaintenanceView(APIView):
    """
    Returns live site maintenance mode status and details.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.query_params.get("lang", "en")
        setting, _ = SiteMaintenanceSetting.objects.get_or_create(id=1)
        return Response(SiteMaintenanceSettingSerializer(setting, context={"request": request, "lang": lang}).data)


class WebsiteViewsCounterView(APIView):
    """
    Retrieves and increments live website total page views count.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        counter, _ = WebsiteViewsCounter.objects.get_or_create(id=1)
        return Response({"total_views": counter.total_views})

    def post(self, request):
        counter, _ = WebsiteViewsCounter.objects.get_or_create(id=1)
        WebsiteViewsCounter.objects.filter(id=counter.id).update(total_views=F("total_views") + 1)
        counter.refresh_from_db()
        return Response({"total_views": counter.total_views})


from django.contrib import admin, messages
from django.contrib.auth import update_session_auth_hash, get_user_model
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse

User = get_user_model()


@login_required(login_url="/admin/login/")
def custom_admin_password_change_view(request):
    """
    Allows logged-in admins to edit both their Username and Password on the same page.
    """
    errors = []
    current_username = request.user.username

    if request.method == "POST":
        new_username = request.POST.get("username", "").strip()
        old_password = request.POST.get("old_password", "")
        new_password1 = request.POST.get("new_password1", "")
        new_password2 = request.POST.get("new_password2", "")

        # 1. Verify old password
        if not request.user.check_password(old_password):
            errors.append("❌ Incorrect current password. Please enter your correct current password.")

        # 2. Validate username
        if not new_username:
            errors.append("❌ Username cannot be empty.")
        elif new_username != request.user.username:
            if User.objects.filter(username=new_username).exclude(pk=request.user.pk).exists():
                errors.append(f"❌ Username '{new_username}' is already taken by another account. Please choose a different username.")

        # 3. Validate new password (if provided)
        if new_password1 or new_password2:
            if new_password1 != new_password2:
                errors.append("❌ New passwords do not match.")
            elif len(new_password1) < 6:
                errors.append("❌ New password must be at least 6 characters long for security.")

        if not errors:
            username_changed = new_username != request.user.username
            password_changed = bool(new_password1)

            request.user.username = new_username
            if password_changed:
                request.user.set_password(new_password1)
            request.user.save()

            # Maintain session login state
            update_session_auth_hash(request, request.user)

            # Record in Audit History
            try:
                from django.contrib.admin.models import LogEntry, CHANGE
                from django.contrib.contenttypes.models import ContentType
                log_details = []
                if username_changed:
                    log_details.append(f"Username changed to '{new_username}'")
                if password_changed:
                    log_details.append("Password updated")
                if log_details:
                    LogEntry.objects.log_action(
                        user_id=request.user.pk,
                        content_type_id=ContentType.objects.get_for_model(request.user).pk,
                        object_id=str(request.user.pk),
                        object_repr=str(request.user.username),
                        action_flag=CHANGE,
                        change_message=f"Account settings updated: {', '.join(log_details)}",
                    )
            except Exception as log_err:
                print("Failed to log account change:", log_err)

            if username_changed and password_changed:
                messages.success(request, f"🎉 Account settings updated successfully! Your username is now '{new_username}' and your password has been changed.")
            elif username_changed:
                messages.success(request, f"🎉 Username updated successfully! Your new username is '{new_username}'.")
            elif password_changed:
                messages.success(request, "🎉 Password changed successfully!")
            else:
                messages.info(request, "No changes were made to your account.")

            return redirect(reverse("admin:index"))

        current_username = new_username

    context = {
        **admin.site.each_context(request),
        "title": "Account Settings & Password Change",
        "errors": errors,
        "current_username": current_username,
        "has_permission": request.user.is_staff,
    }
    return render(request, "registration/password_change_form.html", context)


