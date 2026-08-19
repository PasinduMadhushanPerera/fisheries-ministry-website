from rest_framework import serializers
from .models import NewsPageHeader, NewsArticleItem, NewsContentBlock


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en")
    if lang in ["si", "ta"]:
        val = getattr(obj, f"{field_base}_{lang}", None)
        if val and str(val).strip():
            return str(val).strip()
    return getattr(obj, f"{field_base}_en", "")


CATEGORY_LABELS = {
    "ministry": {
        "en": "Ministry News",
        "si": "අමාත්‍යාංශ පුවත්",
        "ta": "அமைச்சுச் செய்திகள்",
    },
    "development": {
        "en": "Sector Development",
        "si": "ක්ෂේත්‍ර සංවර්ධනය",
        "ta": "துறைசார் அபிவிருத்தி",
    },
    "community": {
        "en": "Fisher Community & Welfare",
        "si": "ධීවර ප්‍රජාව සහ සුබසාධනය",
        "ta": "மீனவ சமூகம் & நலன்புரி",
    },
    "aquaculture": {
        "en": "Aquaculture & Inland",
        "si": "ජලජීවී සහ මිරිදිය වගාව",
        "ta": "நீரியல் மற்றும் நன்னீர் வளர்ப்பு",
    },
    "ocean": {
        "en": "Ocean Resources & Marine",
        "si": "සාගර සම්පත් සහ සංරක්ෂණය",
        "ta": "கடல்சார் வளங்கள் & பாதுகாப்பு",
    },
    "events": {
        "en": "Events & Ceremonies",
        "si": "විශේෂ සිදුවීම් සහ උත්සව",
        "ta": "நிகழ்வுகள் & வைபவங்கள்",
    },
    "other": {
        "en": "General News",
        "si": "පොදු පුවත්",
        "ta": "பொதுச் செய்திகள்",
    },
}


class NewsPageHeaderSerializer(serializers.ModelSerializer):
    badge_text = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    highlighted_title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    featured_badge = serializers.SerializerMethodField()
    catalogue_badge = serializers.SerializerMethodField()
    library_title = serializers.SerializerMethodField()

    class Meta:
        model = NewsPageHeader
        fields = [
            "badge_text",
            "title",
            "highlighted_title",
            "description",
            "featured_badge",
            "catalogue_badge",
            "library_title",
        ]

    def get_badge_text(self, obj): return resolve_lang(obj, "badge_text", self.context)
    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_highlighted_title(self, obj): return resolve_lang(obj, "highlighted_title", self.context)
    def get_description(self, obj): return resolve_lang(obj, "description", self.context)
    def get_featured_badge(self, obj): return resolve_lang(obj, "featured_badge", self.context)
    def get_catalogue_badge(self, obj): return resolve_lang(obj, "catalogue_badge", self.context)
    def get_library_title(self, obj): return resolve_lang(obj, "library_title", self.context)


import json

class NewsContentBlockSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source="block_type")
    display_order = serializers.IntegerField(source="order")
    level = serializers.CharField(source="heading_level")
    content = serializers.SerializerMethodField()
    heading = serializers.SerializerMethodField()
    text = serializers.SerializerMethodField()
    media_url = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    image_caption = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()
    video_title = serializers.SerializerMethodField()
    video_caption = serializers.SerializerMethodField()
    table_title = serializers.SerializerMethodField()
    quote_author = serializers.SerializerMethodField()
    quote_role = serializers.SerializerMethodField()
    file_title = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()
    files = serializers.SerializerMethodField()

    class Meta:
        model = NewsContentBlock
        fields = [
            "id",
            "type",
            "block_type",
            "order",
            "display_order",
            "level",
            "heading_level",
            "heading",
            "content",
            "text",
            # Image & Media fields
            "media_url",
            "image_url",
            "image_caption",
            "image_alt",
            "image_layout",
            # Video fields
            "video_url",
            "video_title",
            "video_caption",
            # Table fields
            "table_title",
            "table_data",
            # Quote fields
            "quote_author",
            "quote_role",
            "callout_type",
            # File fields
            "file_title",
            "download_url",
            "file_type",
            "file_size",
            "files",
        ]

    def get_content(self, obj):
        # Universal content accessor based on block type
        if obj.block_type in ["text", "paragraph", "quote"]:
            return resolve_lang(obj, "text", self.context)
        if obj.block_type == "heading":
            return resolve_lang(obj, "heading", self.context)
        if obj.block_type == "table":
            return obj.table_data
        return resolve_lang(obj, "text", self.context)

    def get_heading(self, obj): return resolve_lang(obj, "heading", self.context)
    def get_text(self, obj): return resolve_lang(obj, "text", self.context)
    def get_image_caption(self, obj): return resolve_lang(obj, "image_caption", self.context)
    def get_video_title(self, obj): return resolve_lang(obj, "video_title", self.context)
    def get_video_caption(self, obj): return resolve_lang(obj, "video_caption", self.context)
    def get_table_title(self, obj): return resolve_lang(obj, "table_title", self.context)
    def get_quote_author(self, obj): return resolve_lang(obj, "quote_author", self.context)
    def get_quote_role(self, obj): return resolve_lang(obj, "quote_role", self.context)
    def get_file_title(self, obj): return resolve_lang(obj, "file_title", self.context)

    def get_media_url(self, obj):
        if obj.block_type == "image":
            return self.get_image_url(obj)
        if obj.block_type == "video":
            return self.get_video_url(obj)
        if obj.block_type in ["file", "attachment"]:
            return self.get_download_url(obj)
        return ""

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url or ""

    def get_video_url(self, obj):
        if obj.video_file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.video_file.url) if request else obj.video_file.url
        return obj.video_url or ""

    def get_download_url(self, obj):
        if obj.document_file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.document_file.url) if request else obj.document_file.url
        return obj.file_url_fallback or ""

    def get_files(self, obj):
        files_list = []
        request = self.context.get("request")

        # Parse attachments_data if filled
        if getattr(obj, "attachments_data", None) and str(obj.attachments_data).strip():
            raw = str(obj.attachments_data).strip()
            try:
                data = json.loads(raw)
                if isinstance(data, list):
                    for idx, item in enumerate(data):
                        if isinstance(item, dict) and (item.get("title") or item.get("url")):
                            url_val = item.get("url") or item.get("download_url") or ""
                            if url_val.startswith("/media/") and request:
                                url_val = request.build_absolute_uri(url_val)
                            files_list.append({
                                "id": idx + 1,
                                "title": item.get("title") or f"Document #{idx + 1}",
                                "download_url": url_val,
                                "file_type": item.get("file_type") or item.get("type") or "PDF",
                                "file_size": item.get("file_size") or item.get("size") or "Document",
                            })
            except Exception:
                for idx, line in enumerate(raw.splitlines()):
                    if line.strip():
                        parts = line.strip().split("|")
                        title = parts[0].strip()
                        url = parts[1].strip() if len(parts) > 1 else ""
                        ftype = parts[2].strip() if len(parts) > 2 else "PDF"
                        fsize = parts[3].strip() if len(parts) > 3 else "1.5 MB"
                        files_list.append({
                            "id": idx + 1,
                            "title": title,
                            "download_url": url,
                            "file_type": ftype,
                            "file_size": fsize,
                        })

        # Include single primary document if present and not duplicated
        if obj.document_file or obj.file_url_fallback:
            primary_url = self.get_download_url(obj)
            primary_title = self.get_file_title(obj) or "Official Attachment Document"
            if not any(f["download_url"] == primary_url for f in files_list):
                files_list.insert(0, {
                    "id": 0,
                    "title": primary_title,
                    "download_url": primary_url,
                    "file_type": obj.file_type or "PDF",
                    "file_size": obj.file_size or "1.5 MB",
                })

        return files_list


class NewsArticleItemSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    publisher = serializers.SerializerMethodField()
    category_label = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    attachment_title = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()
    content_blocks = serializers.SerializerMethodField()
    files = serializers.SerializerMethodField()

    class Meta:
        model = NewsArticleItem
        fields = [
            "id",
            "slug",
            "order",
            "category",
            "category_label",
            "is_featured",
            "title",
            "publisher",
            "summary",
            "content",
            "published_date",
            "image_url",
            "image_alt",
            "attachment_title",
            "download_url",
            "file_type",
            "file_size",
            "files",
            "content_blocks",
            "created_at",
            "updated_at",
        ]

    def get_title(self, obj): return resolve_lang(obj, "title", self.context)
    def get_publisher(self, obj): return resolve_lang(obj, "publisher", self.context)
    def get_summary(self, obj): return resolve_lang(obj, "summary", self.context)
    def get_content(self, obj): return resolve_lang(obj, "content", self.context)
    def get_attachment_title(self, obj): return resolve_lang(obj, "attachment_title", self.context)

    def get_category_label(self, obj):
        custom = resolve_lang(obj, "category_label", self.context)
        if custom:
            return custom
        lang = self.context.get("lang", "en")
        cat_map = CATEGORY_LABELS.get(obj.category, {})
        return cat_map.get(lang) or cat_map.get("en") or obj.get_category_display()

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url_fallback or "/images/home/hero-fishing-harbour.jpg"

    def get_download_url(self, obj):
        if obj.document_file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.document_file.url) if request else obj.document_file.url
        return obj.file_url or ""

    def get_content_blocks(self, obj):
        blocks = obj.content_blocks.filter(is_active=True).order_by("order", "id")
        return NewsContentBlockSerializer(blocks, many=True, context=self.context).data

    def get_files(self, obj):
        files_list = []
        request = self.context.get("request")

        if getattr(obj, "attachments_data", None) and str(obj.attachments_data).strip():
            raw = str(obj.attachments_data).strip()
            try:
                data = json.loads(raw)
                if isinstance(data, list):
                    for idx, item in enumerate(data):
                        if isinstance(item, dict) and (item.get("title") or item.get("url")):
                            url_val = item.get("url") or item.get("download_url") or ""
                            if url_val.startswith("/media/") and request:
                                url_val = request.build_absolute_uri(url_val)
                            files_list.append({
                                "id": idx + 1,
                                "title": item.get("title") or f"Document #{idx + 1}",
                                "download_url": url_val,
                                "file_type": item.get("file_type") or item.get("type") or "PDF",
                                "file_size": item.get("file_size") or item.get("size") or "Document",
                            })
            except Exception:
                pass

        if obj.document_file or obj.file_url:
            primary_url = self.get_download_url(obj)
            primary_title = self.get_attachment_title(obj) or "Official Attachment Document"
            if not any(f["download_url"] == primary_url for f in files_list):
                files_list.insert(0, {
                    "id": 0,
                    "title": primary_title,
                    "download_url": primary_url,
                    "file_type": obj.file_type or "PDF",
                    "file_size": obj.file_size or "1.5 MB",
                })

        return files_list