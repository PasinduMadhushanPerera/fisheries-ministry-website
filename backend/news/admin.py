import os
import uuid
import json
from django import forms
from django.conf import settings
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.urls import reverse
from .models import NewsPageHeader, NewsArticleItem, NewsContentBlock


# ==========================================================
# Custom Multi-Photo Upload Widget for Section 3
# ==========================================================
class MultiPhotoUploadWidget(forms.Widget):
    def render(self, name, value, attrs=None, renderer=None):
        photos = []
        if value:
            if isinstance(value, str):
                try:
                    photos = json.loads(value)
                except Exception:
                    photos = []
            elif isinstance(value, list):
                photos = value

        html = [
            '<div class="multi-photo-uploader-box" style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; margin-top: 6px;">',
            '<div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 6px; display: flex; items-center; justify-between;">',
            f'  <span>🖼️ Gallery Photos in this Block (<span id="photo-count-badge">{len(photos)}</span>)</span>',
            '</div>',
            '<p style="font-size: 11px; color: #64748b; margin-top: 0; margin-bottom: 14px;">',
            '  💡 <strong>Multi-Photo Builder:</strong> Click <strong>"+ Add Another Photo"</strong> to select and upload image files directly from your computer for 2-Column Grid, 3-Column Grid, 4-Photo Collage, or Mini Carousel layouts.',
            '</p>',
            '<div id="photo-cards-container" style="display: flex; flex-direction: column; gap: 10px;">',
        ]

        if not photos:
            html.append('<div id="no-photos-msg" style="font-size: 11px; color: #94a3b8; font-style: italic; padding: 8px 0;">No extra multiple photos added yet. (The single image uploaded below will be used by default, or click "+ Add Another Photo" to create a 2-col, 3-col grid, or collage).</div>')

        for i, photo in enumerate(photos):
            url = photo.get("url") or photo.get("image") or ""
            caption = photo.get("caption") or photo.get("caption_en") or ""
            
            thumb_html = ""
            if url:
                display_url = url if (url.startswith("http://") or url.startswith("https://")) else f"http://127.0.0.1:8000{url if url.startswith('/') else '/' + url}"
                thumb_html = f'<img src="{display_url}" style="height: 52px; width: 78px; object-fit: contain; background: #020617; border-radius: 6px; border: 1px solid #cbd5e1; shrink: 0;" />'

            html.append(f'''
            <div class="photo-card-item" id="photo-card-{i}" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
                <input type="hidden" name="gallery_photo_existing_url_{i}" value="{url}" />
                <input type="hidden" name="gallery_photo_deleted_{i}" id="photo-deleted-{i}" value="0" />
                
                {thumb_html}
                
                <div style="flex: 1; min-width: 200px;">
                    <label style="display: block; font-size: 11px; font-weight: 700; color: #334155; margin-bottom: 3px;">📸 Upload Image File:</label>
                    <input type="file" name="gallery_photo_file_{i}" accept="image/*" style="font-size: 11px; padding: 2px;" />
                    {f'<div style="font-size: 10px; color: #475569; margin-top: 2px; font-family: monospace;">Current: {url}</div>' if url else ''}
                </div>
                
                <div style="flex: 1; min-width: 200px;">
                    <label style="display: block; font-size: 11px; font-weight: 700; color: #334155; margin-bottom: 3px;">📝 Image Caption:</label>
                    <input type="text" name="gallery_photo_caption_{i}" value="{caption}" placeholder="Enter photo caption..." style="width: 100%; font-size: 12px; padding: 5px 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
                </div>
                
                <div>
                    <button type="button" onclick="removePhotoCard({i})" style="background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; border-radius: 6px; padding: 6px 12px; font-size: 11px; font-weight: 700; cursor: pointer;">❌ Remove</button>
                </div>
            </div>
            ''')

        html.append(f'<input type="hidden" name="gallery_photo_count" id="gallery_photo_count" value="{len(photos)}" />')
        html.append('</div>')

        # Add Photo Button & JS script
        html.append('''
        <div style="margin-top: 14px;">
            <button type="button" onclick="addPhotoCard()" style="background: #256B29; color: #ffffff; border: none; border-radius: 8px; padding: 8px 16px; font-size: 12px; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                ➕ Add Another Photo
            </button>
        </div>
        
        <script>
        function removePhotoCard(idx) {
            var card = document.getElementById('photo-card-' + idx);
            var delInput = document.getElementById('photo-deleted-' + idx);
            if (card && delInput) {
                delInput.value = "1";
                card.style.display = "none";
            }
        }

        function addPhotoCard() {
            var msg = document.getElementById('no-photos-msg');
            if (msg) msg.style.display = 'none';

            var container = document.getElementById('photo-cards-container');
            var countInput = document.getElementById('gallery_photo_count');
            var currentCount = parseInt(countInput.value) || 0;
            var newIdx = currentCount;
            
            var newCard = document.createElement('div');
            newCard.className = 'photo-card-item';
            newCard.id = 'photo-card-' + newIdx;
            newCard.style.cssText = 'background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);';
            
            newCard.innerHTML = `
                <input type="hidden" name="gallery_photo_existing_url_${newIdx}" value="" />
                <input type="hidden" name="gallery_photo_deleted_${newIdx}" id="photo-deleted-${newIdx}" value="0" />
                
                <div style="flex: 1; min-width: 200px;">
                    <label style="display: block; font-size: 11px; font-weight: 700; color: #334155; margin-bottom: 3px;">📸 Upload Image File:</label>
                    <input type="file" name="gallery_photo_file_${newIdx}" accept="image/*" style="font-size: 11px; padding: 2px;" required />
                </div>
                
                <div style="flex: 1; min-width: 200px;">
                    <label style="display: block; font-size: 11px; font-weight: 700; color: #334155; margin-bottom: 3px;">📝 Image Caption:</label>
                    <input type="text" name="gallery_photo_caption_${newIdx}" value="" placeholder="Enter photo caption..." style="width: 100%; font-size: 12px; padding: 5px 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
                </div>
                
                <div>
                    <button type="button" onclick="removePhotoCard(${newIdx})" style="background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; border-radius: 6px; padding: 6px 12px; font-size: 11px; font-weight: 700; cursor: pointer;">❌ Remove</button>
                </div>
            `;
            
            container.appendChild(newCard);
            countInput.value = currentCount + 1;
            
            var badge = document.getElementById('photo-count-badge');
            if (badge) badge.innerText = currentCount + 1;
        }
        </script>
        </div>
        ''')

        return mark_safe("".join(html))


# ==========================================================
# Form Definitions
# ==========================================================
class NewsPageHeaderAdminForm(forms.ModelForm):
    class Meta:
        model = NewsPageHeader
        fields = "__all__"


class NewsArticleItemAdminForm(forms.ModelForm):
    class Meta:
        model = NewsArticleItem
        fields = "__all__"


class NewsContentBlockAdminForm(forms.ModelForm):
    class Meta:
        model = NewsContentBlock
        fields = "__all__"
        widgets = {
            "text_en": forms.Textarea(attrs={"rows": 6, "style": "width: 98%;"}),
            "text_si": forms.Textarea(attrs={"rows": 4, "style": "width: 98%;"}),
            "text_ta": forms.Textarea(attrs={"rows": 4, "style": "width: 98%;"}),
            "table_data": forms.Textarea(attrs={"rows": 6, "style": "width: 98%; font-family: monospace;"}),
            "images_data": MultiPhotoUploadWidget(),
            "attachments_data": forms.Textarea(attrs={"rows": 3, "style": "width: 98%; font-family: monospace;"}),
        }


# ==========================================================
# 01. News Page Header Admin
# ==========================================================
@admin.register(NewsPageHeader)
class NewsPageHeaderAdmin(admin.ModelAdmin):
    form = NewsPageHeaderAdminForm
    list_display = [
        "badge_text_en",
        "title_en",
        "featured_badge_en",
        "updated_at",
    ]

    fieldsets = (
        ("🇬🇧 English Main Page Header", {
            "fields": (
                ("badge_text_en", "featured_badge_en"),
                "title_en",
                "highlighted_title_en",
                "description_en",
                ("catalogue_badge_en", "library_title_en"),
            ),
        }),
        ("🇱🇰 Sinhala Main Page Header (සිංහල)", {
            "classes": ("collapse",),
            "fields": (
                ("badge_text_si", "featured_badge_si"),
                "title_si",
                "highlighted_title_si",
                "description_si",
                ("catalogue_badge_si", "library_title_si"),
            ),
        }),
        ("🇱🇰 Tamil Main Page Header (தமிழ்)", {
            "classes": ("collapse",),
            "fields": (
                ("badge_text_ta", "featured_badge_ta"),
                "title_ta",
                "highlighted_title_ta",
                "description_ta",
                ("catalogue_badge_ta", "library_title_ta"),
            ),
        }),
    )

    def has_add_permission(self, request):
        return not NewsPageHeader.objects.exists()


# ==========================================================
# 02. Main News Article Items Admin
# ==========================================================
@admin.register(NewsArticleItem)
class NewsArticleItemAdmin(admin.ModelAdmin):
    form = NewsArticleItemAdminForm
    list_display = [
        "order",
        "title_en",
        "category_badge",
        "published_date",
        "manage_blocks_link",
        "is_featured_badge",
        "is_active_badge",
    ]
    list_display_links = ["title_en"]
    list_editable = ["order"]
    list_filter = ["category", "is_featured", "is_active", "published_date"]
    search_fields = ["title_en", "summary_en", "content_en", "publisher_en"]
    ordering = ["order", "-published_date", "-id"]

    fieldsets = (
        ("📌 Basic Article Info & Category", {
            "fields": (
                ("slug", "category"),
                ("order", "is_featured", "is_active"),
            ),
        }),
        ("🇬🇧 English Article Details", {
            "fields": (
                "title_en",
                ("publisher_en", "summary_en"),
                "content_en",
            ),
        }),
        ("🇱🇰 Sinhala Details (සිංහල)", {
            "classes": ("collapse",),
            "fields": (
                "title_si",
                "publisher_si",
                "summary_si",
            ),
        }),
        ("🇱🇰 Tamil Details (தமிழ்)", {
            "classes": ("collapse",),
            "fields": (
                "title_ta",
                "publisher_ta",
                "summary_ta",
            ),
        }),
        ("📅 Publication Date", {
            "fields": ("published_date",),
        }),
        ("🖼️ Cover Image & Media", {
            "fields": (
                "image",
                ("image_url_fallback", "image_alt"),
            ),
        }),
        ("📄 Cover Attachments & Documents (Optional)", {
            "classes": ("collapse",),
            "fields": (
                ("document_file", "file_url"),
                ("file_type", "file_size"),
                "attachment_title_en",
            ),
        }),
    )

    def category_badge(self, obj):
        return format_html(
            '<span style="background: #eff6ff; color: #1d4ed8; padding: 3px 9px; border-radius: 6px; font-weight: 700; font-size: 11px;">📂 {}</span>',
            obj.get_category_display(),
        )
    category_badge.short_description = "Category"

    def manage_blocks_link(self, obj):
        count = obj.content_blocks.count()
        url = reverse("admin:news_newscontentblock_changelist") + f"?article__id__exact={obj.id}"
        add_url = reverse("admin:news_newscontentblock_add") + f"?article={obj.id}"
        return format_html(
            '<a href="{}" style="background: #f0fdf4; color: #166534; padding: 4px 10px; border-radius: 6px; font-weight: 800; text-decoration: none; border: 1px solid #bbf7d0; display: inline-flex; align-items: center; gap: 4px;">'
            '🧱 {} Story Blocks</a> '
            '<a href="{}" style="color: #059669; font-weight: bold; margin-left: 6px; font-size: 12px;" title="Add block to this article">+ Add Block</a>',
            url,
            count,
            add_url,
        )
    manage_blocks_link.short_description = "Story Content Blocks"

    def is_featured_badge(self, obj):
        if obj.is_featured:
            return format_html('<span style="color: #d97706; font-weight: bold; background: #fef3c7; padding: 2px 6px; border-radius: 4px; font-size: 11px;">⭐ Featured</span>')
        return format_html('<span style="color: #94a3b8;">—</span>')
    is_featured_badge.short_description = "Featured"

    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="color: #15803d; font-weight: bold;">● Active</span>')
        return format_html('<span style="color: #dc2626; font-weight: bold;">○ Inactive</span>')
    is_active_badge.short_description = "Status"

    def save_model(self, request, obj, form, change):
        if obj.is_featured:
            NewsArticleItem.objects.filter(is_featured=True).exclude(pk=obj.pk).update(is_featured=False)
        super().save_model(request, obj, form, change)


# ==========================================================
# 03. Standalone News Content Blocks Admin (Dedicated Page)
# ==========================================================
@admin.register(NewsContentBlock)
class NewsContentBlockAdmin(admin.ModelAdmin):
    form = NewsContentBlockAdminForm
    list_display = [
        "order",
        "article",
        "block_type_badge",
        "block_label",
        "is_active_badge",
        "updated_at",
    ]
    list_display_links = ["block_label"]
    list_editable = ["order"]
    list_filter = ["article", "block_type", "is_active"]
    search_fields = [
        "heading_en",
        "text_en",
        "table_title_en",
        "video_title_en",
        "file_title_en",
        "article__title_en",
    ]
    ordering = ["article", "order", "id"]

    fieldsets = (
        ("🧱 1. Target Article & Block Type", {
            "fields": (
                ("article", "block_type"),
                ("order", "is_active"),
            ),
        }),
        ("📝 2. Text Paragraph & Section Heading Details", {
            "fields": (
                ("heading_level", "heading_en"),
                "text_en",
                ("heading_si", "text_si"),
                ("heading_ta", "text_ta"),
            ),
        }),
        ("🖼️ 3. Image Layout, Sizing & Multi-Photo Details", {
            "fields": (
                ("image_layout", "image_size", "image_aspect_ratio"),
                "images_data",
                ("image", "image_url"),
                ("image_caption_en", "image_alt"),
                ("image_caption_si", "image_caption_ta"),
            ),
        }),
        ("🎬 4. Video Details (Embed / Upload)", {
            "fields": (
                ("video_url", "video_file"),
                ("video_title_en", "video_caption_en"),
                ("video_title_si", "video_caption_si"),
                ("video_title_ta", "video_caption_ta"),
            ),
        }),
        ("📊 5. Interactive Data Table Details", {
            "fields": (
                ("table_title_en", "table_title_si", "table_title_ta"),
                "table_data",
            ),
        }),
        ("💬 6. Quote & Callout Box Details", {
            "fields": (
                ("quote_author_en", "quote_role_en"),
                ("quote_author_si", "quote_role_si"),
                ("quote_author_ta", "quote_role_ta"),
            ),
        }),
        ("📄 7. Single Downloadable File / Attachment Details", {
            "fields": (
                ("file_title_en", "document_file"),
                ("file_url_fallback", "file_type", "file_size"),
                ("file_title_si", "file_title_ta"),
                "attachments_data",
            ),
        }),
    )

    def save_model(self, request, obj, form, change):
        # Process multi-photo uploader files & captions from request.FILES and request.POST
        images_list = []
        try:
            count = int(request.POST.get("gallery_photo_count", 0))
        except (ValueError, TypeError):
            count = 0

        for i in range(count):
            is_deleted = request.POST.get(f"gallery_photo_deleted_{i}", "0") == "1"
            if is_deleted:
                continue

            file_obj = request.FILES.get(f"gallery_photo_file_{i}")
            existing_url = request.POST.get(f"gallery_photo_existing_url_{i}", "").strip()
            caption = request.POST.get(f"gallery_photo_caption_{i}", "").strip()

            final_url = existing_url
            if file_obj:
                ext = os.path.splitext(file_obj.name)[1].lower() or ".jpg"
                filename = f"block_photo_{uuid.uuid4().hex[:10]}{ext}"
                rel_dir = os.path.join("news", "images")
                abs_dir = os.path.join(settings.MEDIA_ROOT, rel_dir)
                os.makedirs(abs_dir, exist_ok=True)
                abs_path = os.path.join(abs_dir, filename)

                with open(abs_path, "wb+") as destination:
                    for chunk in file_obj.chunks():
                        destination.write(chunk)

                final_url = f"/media/news/images/{filename}"

            if final_url:
                images_list.append({
                    "id": len(images_list) + 1,
                    "url": final_url,
                    "caption": caption,
                    "alt": caption or f"Photo #{len(images_list) + 1}",
                })

        if images_list:
            obj.images_data = json.dumps(images_list)

        super().save_model(request, obj, form, change)

    def block_type_badge(self, obj):
        return format_html(
            '<span style="background: #f1f5f9; color: #0f172a; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 11px;">{}</span>',
            obj.get_block_type_display(),
        )
    block_type_badge.short_description = "Block Type"

    def block_label(self, obj):
        label = obj.heading_en or obj.table_title_en or obj.file_title_en or obj.get_block_type_display()
        return label[:50]
    block_label.short_description = "Block Identifier"

    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="color: #15803d; font-weight: bold;">● Active</span>')
        return format_html('<span style="color: #dc2626; font-weight: bold;">○ Inactive</span>')
    is_active_badge.short_description = "Status"