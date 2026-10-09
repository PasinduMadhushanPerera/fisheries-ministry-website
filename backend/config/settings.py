import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


def get_required_env(name: str) -> str:
    value = os.getenv(name)

    if not value:
        raise RuntimeError(f"Required environment variable '{name}' is missing.")

    return value


def get_boolean_env(
    name: str,
    default: bool = False,
) -> bool:
    value = os.getenv(name)

    if value is None:
        return default

    return value.strip().lower() in {
        "1",
        "true",
        "yes",
        "on",
    }


def get_list_env(
    name: str,
    default: str = "",
) -> list[str]:
    value = os.getenv(name, default)

    return [item.strip() for item in value.split(",") if item.strip()]


SECRET_KEY = get_required_env("DJANGO_SECRET_KEY")

DEBUG = get_boolean_env(
    "DJANGO_DEBUG",
    default=False,
)

ALLOWED_HOSTS = get_list_env(
    "DJANGO_ALLOWED_HOSTS",
    "*",
)
FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:3000",
)


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "common",
    "notices",
    "news",
    "about",
    "minister_profile",
    "deputy_minister_profile",
    "secretary_profile",
    "divisions_page",
    "organization_structure",
    "local_training",
    "foreign_training",
    "procurement_page",
    "recruitment_page",
    "press_releases",
    "events",
    "gallery",
    "videos",
    "fisheries_statistics",
    "weekly_fish_prices",
    "monthly_fish_production",
    "annual_statistics",
    "export_import_statistics",
    "fishery_information",
    "rti_page",
    "downloads_page",
    "contact_page",
    "internal_affairs",
    "header_footer",
    "home_page",
    "pages",
    "navigation",
    "core_content",
]

# Email Backend Configuration for Contact Form
EMAIL_BACKEND = os.getenv("EMAIL_BACKEND", "django.core.mail.backends.smtp.EmailBackend")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "True") == "True"
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "stayfinderuwu@gmail.com")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "stayfinderuwu@gmail.com")
CONTACT_RECEIVER_EMAIL = os.getenv("CONTACT_RECEIVER_EMAIL", "minfishit@gmail.com")


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "config.urls"


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                ("django.template.context_processors." "request"),
                ("django.contrib.auth." "context_processors.auth"),
                ("django.contrib.messages." "context_processors.messages"),
            ],
        },
    },
]


WSGI_APPLICATION = "config.wsgi.application"

ASGI_APPLICATION = "config.asgi.application"


# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "NAME": get_required_env("DB_NAME"),
#         "USER": get_required_env("DB_USER"),
#         "PASSWORD": get_required_env("DB_PASSWORD"),
#         "HOST": os.getenv(
#             "DB_HOST",
#             "127.0.0.1",
#         ),
#         "PORT": os.getenv(
#             "DB_PORT",
#             "5432",
#         ),
#         "CONN_MAX_AGE": 60,
#         "OPTIONS": {
#             "connect_timeout": 10,
#         },
#     },
# }

DB_ENGINE = os.getenv("DB_ENGINE", "django.db.backends.mysql")

if DB_ENGINE == "django.db.backends.sqlite3":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": DB_ENGINE,
            "NAME": os.getenv("DB_NAME", "ministry_db"),
            "USER": os.getenv("DB_USER", "root"),
            "PASSWORD": os.getenv("DB_PASSWORD", ""),
            "HOST": os.getenv("DB_HOST", "127.0.0.1"),
            "PORT": os.getenv("DB_PORT", "3306"),
            "CONN_MAX_AGE": 60,
            "OPTIONS": {
                "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
                "charset": "utf8mb4",
            } if "mysql" in DB_ENGINE else {},
        }
    }



AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "UserAttributeSimilarityValidator"
        ),
    },
    {
        "NAME": ("django.contrib.auth.password_validation." "MinimumLengthValidator"),
        "OPTIONS": {
            "min_length": 12,
        },
    },
    {
        "NAME": ("django.contrib.auth.password_validation." "CommonPasswordValidator"),
    },
    {
        "NAME": ("django.contrib.auth.password_validation." "NumericPasswordValidator"),
    },
]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Colombo"

USE_I18N = True

USE_TZ = True


STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"


MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


CORS_ALLOWED_ORIGINS = get_list_env(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000,http://localhost:8000,http://127.0.0.1:8000",
)

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True

from corsheaders.defaults import default_headers

CORS_ALLOW_HEADERS = list(default_headers) + [
    "cache-control",
    "pragma",
    "expires",
]

CSRF_TRUSTED_ORIGINS = get_list_env(
    "CSRF_TRUSTED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
)

CORS_ALLOW_CREDENTIALS = True


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        ("rest_framework.permissions." "IsAuthenticatedOrReadOnly"),
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        ("rest_framework.authentication." "SessionAuthentication"),
    ],
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PAGINATION_CLASS": ("rest_framework.pagination." "PageNumberPagination"),
    "PAGE_SIZE": 10,
    "DEFAULT_THROTTLE_CLASSES": [
        ("rest_framework.throttling." "AnonRateThrottle"),
        ("rest_framework.throttling." "UserRateThrottle"),
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "120/minute",
        "user": "600/minute",
    },
}


# Security & Cookie Protections
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = "Lax"
CSRF_COOKIE_SAMESITE = "Lax"

X_FRAME_OPTIONS = "DENY"
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"
SECURE_CROSS_ORIGIN_OPENER_POLICY = "same-origin"

if not DEBUG:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 31536000  # 1 Year HSTS
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True


# ==========================================================
# Email Configuration (SMTP / Gmail Delivery)
# ==========================================================
EMAIL_BACKEND = os.getenv("EMAIL_BACKEND", "django.core.mail.backends.smtp.EmailBackend")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "True").lower() == "true"
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "stayfinderuwu@gmail.com")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")  # Set Google 16-character App Password here or in .env

DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", EMAIL_HOST_USER)
CONTACT_RECEIVER_EMAIL = os.getenv("CONTACT_RECEIVER_EMAIL", "minfishit@gmail.com")

# Admin Login & Logout Redirect Defaults
LOGIN_URL = "/admin/login/"
LOGIN_REDIRECT_URL = "/admin/"
LOGOUT_REDIRECT_URL = "/admin/login/"

# Allow Login via Email OR Username
AUTHENTICATION_BACKENDS = [
    "header_footer.backends.EmailOrUsernameModelBackend",
    "django.contrib.auth.backends.ModelBackend",
]




