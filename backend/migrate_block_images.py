import os
import sys
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from news.models import NewsContentBlock, NewsBlockImage

def migrate_existing_images():
    print("Migrating JSON image data to NewsBlockImage upload model records...")
    blocks = NewsContentBlock.objects.all()
    created_count = 0

    for block in blocks:
        if block.images_data and str(block.images_data).strip():
            raw = str(block.images_data).strip()
            try:
                data = json.loads(raw)
                if isinstance(data, list):
                    for idx, item in enumerate(data):
                        if isinstance(item, dict) and (item.get("url") or item.get("image")):
                            url_val = item.get("url") or item.get("image") or ""
                            caption = item.get("caption") or item.get("caption_en") or ""
                            alt = item.get("alt") or caption or f"Photo #{idx + 1}"

                            # Create NewsBlockImage record if not already created
                            if not NewsBlockImage.objects.filter(block=block, image_url_fallback=url_val).exists():
                                NewsBlockImage.objects.create(
                                    block=block,
                                    image_url_fallback=url_val,
                                    caption_en=caption,
                                    alt_text=alt,
                                    order=idx + 1,
                                )
                                created_count += 1
                                print(f"  [CREATED] Block #{block.id} Photo #{idx + 1}: {url_val}")
            except Exception as e:
                print(f"  [ERROR] Block #{block.id} JSON parse error: {e}")

    print(f"\n[SUCCESS] Migrated {created_count} inline block photos to NewsBlockImage model!")

if __name__ == "__main__":
    migrate_existing_images()
