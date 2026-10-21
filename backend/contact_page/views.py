import logging
from django.core.mail import EmailMessage
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from .models import (
    ContactPageSettings,
    ContactDepartment,
    ContactFaq,
    ContactSubmission,
)
from .serializers import (
    ContactPageSettingsSerializer,
    ContactDepartmentSerializer,
    ContactFaqSerializer,
    ContactSubmissionSerializer,
)

logger = logging.getLogger(__name__)


class ContactPageView(APIView):
    """
    Returns complete Contact Us Page configuration, HQ details, map embed URL,
    departmental contact directories with dynamic table columns, and public FAQs.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        lang = request.query_params.get("lang", "en")
        context = {"lang": lang}

        settings_obj = ContactPageSettings.objects.first()
        if not settings_obj:
            settings_obj = ContactPageSettings.objects.create()

        settings_data = ContactPageSettingsSerializer(settings_obj, context=context).data

        departments = ContactDepartment.objects.filter(is_active=True).prefetch_related("officers")
        departments_data = ContactDepartmentSerializer(departments, many=True, context=context).data

        faqs = ContactFaq.objects.filter(is_active=True)
        faqs_data = ContactFaqSerializer(faqs, many=True, context=context).data

        return Response({
            "settings": settings_data,
            "departments": departments_data,
            "faqs": faqs_data,
        })


class SubmitContactFormView(APIView):
    """
    Handles user contact form submission.
    Saves the submission record to the database and emails the message to minfishit@gmail.com.
    """
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            submission = serializer.save()

            # Retrieve recipient email from ContactPageSettings or default
            settings_obj = ContactPageSettings.objects.first()
            receiver_email = (
                settings_obj.receiver_email
                if settings_obj and settings_obj.receiver_email
                else "minfishit@gmail.com"
            )
            sender_email = getattr(settings, "DEFAULT_FROM_EMAIL", "stayfinderuwu@gmail.com")

            # Compose Email Notification
            email_subject = f"[Website Inquiry] {submission.subject}"
            email_body = (
                f"You have received a new inquiry from the Ministry of Fisheries Website Contact Form:\n\n"
                f"Name: {submission.name}\n"
                f"Email: {submission.email}\n"
                f"Phone: {submission.phone or 'Not provided'}\n"
                f"Department Concerned: {submission.department_name or 'General Inquiry'}\n"
                f"Subject: {submission.subject}\n"
                f"Submitted At: {submission.submitted_at.strftime('%Y-%m-%d %H:%M:%S')}\n\n"
                f"Message Content:\n"
                f"----------------------------------------\n"
                f"{submission.message}\n"
                f"----------------------------------------\n\n"
                f"Reply directly to this email to contact the citizen."
            )

            try:
                email = EmailMessage(
                    subject=email_subject,
                    body=email_body,
                    from_email=sender_email,
                    to=[receiver_email],
                    reply_to=[submission.email],
                )
                email.send(fail_silently=False)
                logger.info(f"Successfully sent contact form email to {receiver_email} from {sender_email}")
            except Exception as e:
                logger.warning(f"Contact submission saved to DB (ID #{submission.id}), but email sending failed: {e}")

            return Response({
                "success": True,
                "message": "Thank you! Your message has been sent successfully to the Ministry.",
                "submission_id": submission.id,
            }, status=status.HTTP_201_CREATED)

        return Response({
            "success": False,
            "errors": serializer.errors,
        }, status=status.HTTP_400_BAD_REQUEST)
