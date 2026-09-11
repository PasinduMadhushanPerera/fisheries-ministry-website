from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import RecruitmentPageHeader, RecruitmentVacancyItem
from .serializers import RecruitmentPageHeaderSerializer, RecruitmentVacancyItemSerializer


class RecruitmentPageDataView(APIView):
    """
    API endpoint returning all customizable sections of Recruitment & Careers in the requested language (?lang=en/si/ta).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = RecruitmentPageHeader.objects.get_or_create(id=1)
        header_data = RecruitmentPageHeaderSerializer(header, context=context).data

        vacancies = RecruitmentVacancyItem.objects.filter(is_active=True).order_by("-year", "order", "-id")
        vacancies_data = RecruitmentVacancyItemSerializer(vacancies, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "vacancies": vacancies_data,
        })
