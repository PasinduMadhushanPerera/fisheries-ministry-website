from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import NewsPageHeader, NewsArticleItem
from .serializers import NewsPageHeaderSerializer, NewsArticleItemSerializer


class NewsPageDataView(APIView):
    """
    API endpoint returning all customizable sections of Media Centre : News in the requested language (?lang=en/si/ta).
    Returns all active news articles ordered by featured status and newly added date/time.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        header, _ = NewsPageHeader.objects.get_or_create(id=1)
        header_data = NewsPageHeaderSerializer(header, context=context).data

        articles_query = NewsArticleItem.objects.filter(is_active=True).order_by(
            "-is_featured", "-created_at", "-id"
        )

        limit_param = request.GET.get("limit")
        if limit_param:
            try:
                limit_val = int(limit_param)
                if limit_val > 0:
                    articles_query = articles_query[:limit_val]
            except (ValueError, TypeError):
                pass

        articles_data = NewsArticleItemSerializer(articles_query, many=True, context=context).data

        return Response({
            "language": lang,
            "header": header_data,
            "articles": articles_data,
        })


class NewsDetailView(APIView):
    """
    API endpoint returning a single news article by slug in the requested language.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        lang = request.GET.get("lang", "en").lower().strip()
        if lang not in ["en", "si", "ta"]:
            lang = "en"

        context = {"request": request, "lang": lang}

        try:
            article = NewsArticleItem.objects.get(slug=slug, is_active=True)
            article_data = NewsArticleItemSerializer(article, context=context).data
            return Response(article_data)
        except NewsArticleItem.DoesNotExist:
            return Response({"error": "News article not found"}, status=status.HTTP_404_NOT_FOUND)