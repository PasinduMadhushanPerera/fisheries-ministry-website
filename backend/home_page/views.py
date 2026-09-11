from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    HomeHeroSlide,
    HomeQuickAccessItem,
    HomeNewsSection,
    HomeServicesSection,
    HomeQuickInfoSection,
    HomeInstitutionsSection,
)
from .serializers import (
    HomeHeroSlideSerializer,
    HomeQuickAccessItemSerializer,
    HomeNewsSectionSerializer,
    HomeServicesSectionSerializer,
    HomeQuickInfoSectionSerializer,
    HomeInstitutionsSectionSerializer,
)


class HomePageDataView(APIView):
    """
    Combined API endpoint returning all customizable sections of the Home Page in the requested language (?lang=en/si/ta):
    - 1. Hero slides
    - 2. Quick access bar links
    - 3. Media centre: Latest News section header & cards
    - 4. Ministry Portals: Services & opportunities header & cards
    - 5. Public Portals: Quick information header & cards
    - 6. Government Network: Institutions section header & cards
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        # 1. Hero Slides
        slides = HomeHeroSlide.objects.filter(is_active=True).order_by("order", "id")
        slides_data = HomeHeroSlideSerializer(slides, many=True, context=context).data

        # 2. Quick Access
        quick_access = HomeQuickAccessItem.objects.filter(is_active=True).order_by("order", "id")
        quick_access_data = HomeQuickAccessItemSerializer(quick_access, many=True, context=context).data

        # 3. News Section Header & Cards
        news_sec, _ = HomeNewsSection.objects.get_or_create(id=1)
        news_data = HomeNewsSectionSerializer(news_sec, context=context).data

        # 4. Services Section & Cards
        services_sec, _ = HomeServicesSection.objects.get_or_create(id=1)
        services_data = HomeServicesSectionSerializer(services_sec, context=context).data

        # 5. Quick Info Section & Cards
        quick_info_sec, _ = HomeQuickInfoSection.objects.get_or_create(id=1)
        quick_info_data = HomeQuickInfoSectionSerializer(quick_info_sec, context=context).data

        # 6. Institutions Header & Cards
        inst_sec, _ = HomeInstitutionsSection.objects.get_or_create(id=1)
        institutions_data = HomeInstitutionsSectionSerializer(inst_sec, context=context).data

        return Response({
            "language": lang,
            "hero_slides": slides_data,
            "quick_access": quick_access_data,
            "news_section": news_data,
            "services_section": services_data,
            "quick_info_section": quick_info_data,
            "institutions_section": institutions_data,
        })
