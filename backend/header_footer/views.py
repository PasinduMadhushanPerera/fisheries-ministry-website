from django.db.models import F
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HeaderSetting, FooterSetting, WebsiteViewsCounter
from .serializers import HeaderSettingSerializer, FooterSettingSerializer


class HeaderFooterDataView(APIView):
    """
    Returns global settings for Common Header & Footer.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        header_setting, _ = HeaderSetting.objects.get_or_create(id=1)
        footer_setting, _ = FooterSetting.objects.get_or_create(id=1)
        views_counter, _ = WebsiteViewsCounter.objects.get_or_create(id=1)

        header_data = HeaderSettingSerializer(header_setting, context={"request": request}).data
        footer_data = FooterSettingSerializer(footer_setting, context={"request": request}).data

        return Response({
            "header": header_data,
            "footer": footer_data,
            "total_views": views_counter.total_views,
        })


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
