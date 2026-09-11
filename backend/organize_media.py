import os
import shutil
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MEDIA_DIR = BASE_DIR / "media"
FRONTEND_DOCS_DIR = BASE_DIR.parent / "frontend" / "public" / "documents"
FRONTEND_IMAGES_DIR = BASE_DIR.parent / "frontend" / "public" / "images"

# Standard Centralized Media Directory Tree (Organized by Page / Feature)
CATEGORIZED_MEDIA_FOLDERS = [
    "about",
    "home",
    "news/images",
    "news/attachments",
    "press_releases",
    "events",
    "gallery",
    "videos",
    "rti",
    "downloads",
    "notices",
    "statistics/annual",
    "statistics/monthly",
    "statistics/export_import",
    "statistics/weekly_prices",
    "divisions",
    "institutions",
    "documents",
    "general",
]

def setup_media_tree():
    print(f"Creating centralized media folder structure at: {MEDIA_DIR}")
    for folder in CATEGORIZED_MEDIA_FOLDERS:
        folder_path = MEDIA_DIR / folder
        folder_path.mkdir(parents=True, exist_ok=True)
        print(f"  [OK] Folder created/verified: media/{folder}")

    # Copy files from frontend/public/documents to backend/media/documents/
    if FRONTEND_DOCS_DIR.exists():
        target_docs_dir = MEDIA_DIR / "documents"
        target_docs_dir.mkdir(parents=True, exist_ok=True)
        print(f"\nMigrating documents from {FRONTEND_DOCS_DIR} to {target_docs_dir}...")
        for item in FRONTEND_DOCS_DIR.glob("*"):
            if item.is_file():
                dest = target_docs_dir / item.name
                shutil.copy2(item, dest)
                print(f"  [COPIED] {item.name} -> media/documents/{item.name}")

    # Copy files from frontend/public/documents to backend/media/downloads/
    if FRONTEND_DOCS_DIR.exists():
        target_downloads_dir = MEDIA_DIR / "downloads"
        target_downloads_dir.mkdir(parents=True, exist_ok=True)
        for item in FRONTEND_DOCS_DIR.glob("*"):
            if item.is_file():
                dest = target_downloads_dir / item.name
                if not dest.exists():
                    shutil.copy2(item, dest)
                    print(f"  [COPIED] {item.name} -> media/downloads/{item.name}")

    print("\n[SUCCESS] Centralized media directory structure initialized successfully!")

if __name__ == "__main__":
    setup_media_tree()
