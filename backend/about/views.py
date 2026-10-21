from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    AboutOverview,
    AboutVisionMission,
    AboutObjectiveHeader,
    AboutObjective,
    AboutLeadershipHeader,
    AboutLeader,
    AboutOrganizationStructure,
    AboutTimelineHeader,
    AboutTimelineEvent,
)
from .serializers import (
    AboutOverviewSerializer,
    AboutVisionMissionSerializer,
    AboutObjectiveHeaderSerializer,
    AboutObjectiveSerializer,
    AboutLeadershipHeaderSerializer,
    AboutLeaderSerializer,
    AboutOrganizationStructureSerializer,
    AboutTimelineHeaderSerializer,
    AboutTimelineEventSerializer,
)


class AboutPageDataView(APIView):
    """
    Combined API endpoint returning all customizable sections of the About Us Page in the requested language (?lang=en/si/ta).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        # 1. Overview
        overview, _ = AboutOverview.objects.get_or_create(id=1)
        overview_data = AboutOverviewSerializer(overview, context=context).data

        # 2. Vision & Mission
        vision_mission, _ = AboutVisionMission.objects.get_or_create(id=1)
        vision_mission_data = AboutVisionMissionSerializer(vision_mission, context=context).data

        # 3. Policy Objectives
        obj_header, _ = AboutObjectiveHeader.objects.get_or_create(id=1)
        obj_header_data = AboutObjectiveHeaderSerializer(obj_header, context=context).data

        objectives = AboutObjective.objects.filter(is_active=True).order_by("order", "id")
        objectives_data = AboutObjectiveSerializer(objectives, many=True, context=context).data

        # 4. Leadership Section
        leadership_header, _ = AboutLeadershipHeader.objects.get_or_create(id=1)
        leadership_header_data = AboutLeadershipHeaderSerializer(leadership_header, context=context).data

        leaders = AboutLeader.objects.filter(is_active=True).order_by("order", "id")
        leaders_data = AboutLeaderSerializer(leaders, many=True, context=context).data

        # 5. Organization Structure
        org_structure, _ = AboutOrganizationStructure.objects.get_or_create(id=1)
        org_structure_data = AboutOrganizationStructureSerializer(org_structure, context=context).data

        # 6. Timeline History
        timeline_header, _ = AboutTimelineHeader.objects.get_or_create(id=1)
        timeline_header_data = AboutTimelineHeaderSerializer(timeline_header, context=context).data

        timeline_events = AboutTimelineEvent.objects.filter(is_active=True).order_by("order", "id")
        timeline_events_data = AboutTimelineEventSerializer(timeline_events, many=True, context=context).data

        return Response({
            "language": lang,
            "overview": overview_data,
            "vision_mission": vision_mission_data,
            "objectives_header": obj_header_data,
            "objective_header": obj_header_data,
            "objectives": objectives_data,
            "leadership_header": leadership_header_data,
            "leadership": leaders_data,
            "leaders": leaders_data,
            "organization_structure": org_structure_data,
            "structure": org_structure_data,
            "timeline_header": timeline_header_data,
            "timeline_events": timeline_events_data,
            "timeline": timeline_events_data,
        })


class AboutLeaderDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, role_type):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}
        leader = get_object_or_404(AboutLeader, role_type=role_type, is_active=True)
        return Response(AboutLeaderSerializer(leader, context=context).data)