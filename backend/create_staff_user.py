import os
import sys
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth.models import User, Group, Permission
from django.contrib.contenttypes.models import ContentType
from news.models import NewsArticleItem, NewsContentBlock

def setup_news_editor_group():
    group, _ = Group.objects.get_or_create(name="News Data Entry Team")
    
    # Target permissions for NewsArticleItem & NewsContentBlock
    ct_article = ContentType.objects.get_for_model(NewsArticleItem)
    ct_block = ContentType.objects.get_for_model(NewsContentBlock)
    
    perms = Permission.objects.filter(
        content_type__in=[ct_article, ct_block],
        codename__in=[
            "add_newsarticleitem",
            "change_newsarticleitem",
            "view_newsarticleitem",
            "add_newscontentblock",
            "change_newscontentblock",
            "delete_newscontentblock",
            "view_newscontentblock",
        ]
    )
    group.permissions.set(perms)
    print(f"[*] Group 'News Data Entry Team' updated with {perms.count()} permissions.")
    return group

def create_staff_user(username, email, password):
    if User.objects.filter(username=username).exists():
        print(f"[!] User '{username}' already exists.")
        user = User.objects.get(username=username)
    else:
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_staff=True,
            is_superuser=False,
        )
        print(f"[SUCCESS] Created Staff User: '{username}'")

    group = setup_news_editor_group()
    user.groups.add(group)
    user.is_staff = True
    user.save()
    print(f"[SUCCESS] User '{username}' assigned to 'News Data Entry Team' Group with restricted permissions!")

if __name__ == "__main__":
    if len(sys.argv) >= 4:
        uname = sys.argv[1]
        uemail = sys.argv[2]
        upass = sys.argv[3]
        create_staff_user(uname, uemail, upass)
    else:
        print("Usage: python create_staff_user.py <username> <email> <password>")
        print("Example: python create_staff_user.py kasun kasun@fisheries.gov.lk SecurePass123!")
