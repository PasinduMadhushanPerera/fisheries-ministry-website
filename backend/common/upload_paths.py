import os
from django.utils.text import slugify

def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext.lower()

def upload_to_news_images(instance, filename):
    name, ext = get_filename_ext(filename)
    clean_name = slugify(name) or "news_photo"
    return f"news/images/{clean_name}{ext}"

def upload_to_news_attachments(instance, filename):
    name, ext = get_filename_ext(filename)
    clean_name = slugify(name) or "news_attachment"
    return f"news/attachments/{clean_name}{ext}"

def upload_to_documents(instance, filename):
    return f"documents/{filename}"

def upload_to_downloads(instance, filename):
    return f"downloads/{filename}"

def upload_to_rti(instance, filename):
    return f"rti/{filename}"

def upload_to_press_releases(instance, filename):
    return f"press_releases/{filename}"

def upload_to_events(instance, filename):
    return f"events/{filename}"

def upload_to_gallery(instance, filename):
    return f"gallery/{filename}"

def upload_to_videos(instance, filename):
    return f"videos/{filename}"

def upload_to_about(instance, filename):
    return f"about/{filename}"

def upload_to_home(instance, filename):
    return f"home/{filename}"

def upload_to_divisions(instance, filename):
    return f"divisions/{filename}"

def upload_to_institutions(instance, filename):
    return f"institutions/{filename}"

def upload_to_notices(instance, filename):
    return f"notices/{filename}"

def upload_to_statistics(instance, filename):
    return f"statistics/{filename}"
