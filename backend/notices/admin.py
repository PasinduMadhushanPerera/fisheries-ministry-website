from django.contrib import admin
from django.core.exceptions import ValidationError

from .models import (
    Notice,
    NoticeAttachment,
    NoticeCategory,
    NoticeTranslation,
)


@admin.register(NoticeCategory)
class NoticeCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
    )

    list_filter = (
        "is_active",
    )

    prepopulated_fields = {
        "slug": ("name",),
    }


class NoticeTranslationInline(admin.StackedInline):
    model = NoticeTranslation

    extra = 3

    min_num = 3

    max_num = 3

    fields = (
        "language",
        "title",
        "slug",
        "summary",
        "content",
        "seo_title",
        "seo_description",
    )


class NoticeAttachmentInline(admin.TabularInline):
    model = NoticeAttachment

    extra = 0

    fields = (
        "title",
        "file",
        "is_public",
        "sort_order",
        "uploaded_by",
    )


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "__str__",
        "category",
        "status",
        "priority",
        "is_featured",
        "published_at",
    )

    list_filter = (
        "status",
        "priority",
        "category",
        "is_featured",
    )

    search_fields = (
        "translations__title",
        "translations__summary",
    )

    inlines = [
        NoticeTranslationInline,
        NoticeAttachmentInline,
    ]

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "General",
            {
                "fields": (
                    "category",
                    "status",
                    "priority",
                    "is_featured",
                )
            },
        ),
        (
            "Publishing",
            {
                "fields": (
                    "published_at",
                    "expires_at",
                )
            },
        ),
        (
            "Audit",
            {
                "fields": (
                    "created_by",
                    "updated_by",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    def save_model(
        self,
        request,
        obj,
        form,
        change,
    ):
        if not change:
            obj.created_by = request.user

        obj.updated_by = request.user

        super().save_model(
            request,
            obj,
            form,
            change,
        )

    def save_related(
        self,
        request,
        form,
        formsets,
        change,
    ):
        super().save_related(
            request,
            form,
            formsets,
            change,
        )

        notice = form.instance

        if (
            notice.status == "published"
            and not notice.has_all_translations
        ):
            raise ValidationError(
                "English, Sinhala and Tamil translations are required before publishing."
            )


@admin.register(NoticeTranslation)
class NoticeTranslationAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "language",
        "notice",
    )

    list_filter = (
        "language",
    )

    search_fields = (
        "title",
        "summary",
    )


@admin.register(NoticeAttachment)
class NoticeAttachmentAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "notice",
        "is_public",
    )

    list_filter = (
        "is_public",
    )