from rest_framework import serializers
from .models import (
    ContactPageSettings,
    ContactDepartment,
    ContactOfficer,
    ContactFaq,
    ContactSubmission,
)


def resolve_lang(obj, field_base: str, context: dict) -> str:
    lang = context.get("lang", "en") if context else "en"
    if lang == "si":
        val = getattr(obj, f"{field_base}_si", "")
        if val:
            return val
    elif lang == "ta":
        val = getattr(obj, f"{field_base}_ta", "")
        if val:
            return val
    return getattr(obj, f"{field_base}_en", "") or ""


def resolve_lang_list(obj, field_base: str, context: dict) -> list:
    lang = context.get("lang", "en") if context else "en"
    if lang == "si":
        val = getattr(obj, f"{field_base}_si", [])
        if val:
            return val
    elif lang == "ta":
        val = getattr(obj, f"{field_base}_ta", [])
        if val:
            return val
    return getattr(obj, f"{field_base}_en", []) or []


class ContactOfficerSerializer(serializers.ModelSerializer):
    designation = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    notes = serializers.SerializerMethodField()
    extra_data = serializers.SerializerMethodField()

    class Meta:
        model = ContactOfficer
        fields = [
            "id",
            "designation",
            "name",
            "telephone",
            "mobile",
            "fax",
            "email",
            "location",
            "notes",
            "extra_data",
            "order",
        ]

    def get_designation(self, obj):
        return resolve_lang(obj, "designation", self.context)

    def get_name(self, obj):
        return resolve_lang(obj, "name", self.context)

    def get_location(self, obj):
        return resolve_lang(obj, "location", self.context)

    def get_notes(self, obj):
        return resolve_lang(obj, "notes", self.context)

    def get_extra_data(self, obj):
        lang = self.context.get("lang", "en") if self.context else "en"
        data = dict(obj.extra_data) if isinstance(obj.extra_data, dict) else {}

        # Merge dynamic custom columns 1..5
        dept = obj.department
        if dept:
            for i in range(1, 6):
                c_en = getattr(dept, f"custom_col_{i}_name_en", "").strip()
                c_si = getattr(dept, f"custom_col_{i}_name_si", "").strip() or c_en
                c_ta = getattr(dept, f"custom_col_{i}_name_ta", "").strip() or c_en

                v_en = getattr(obj, f"custom_col_{i}_val_en", "").strip()
                v_si = getattr(obj, f"custom_col_{i}_val_si", "").strip() or v_en
                v_ta = getattr(obj, f"custom_col_{i}_val_ta", "").strip() or v_en

                if c_en:
                    # Select localized value
                    if lang == "si":
                        val = v_si or v_en
                    elif lang == "ta":
                        val = v_ta or v_en
                    else:
                        val = v_en

                    if val:
                        # Key by localized column name
                        if lang == "si" and c_si:
                            data[c_si] = val
                        elif lang == "ta" and c_ta:
                            data[c_ta] = val
                        else:
                            data[c_en] = val

                        # Also key by English name as fallback
                        data[c_en] = val
                        data[f"custom_{i}"] = val

        return data


class ContactDepartmentSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    custom_columns = serializers.SerializerMethodField()
    officers = serializers.SerializerMethodField()
    officers_count = serializers.SerializerMethodField()

    class Meta:
        model = ContactDepartment
        fields = [
            "id",
            "name",
            "description",
            "location",
            "custom_columns",
            "officers_count",
            "officers",
            "order",
        ]

    def get_name(self, obj):
        return resolve_lang(obj, "name", self.context)

    def get_description(self, obj):
        return resolve_lang(obj, "description", self.context)

    def get_location(self, obj):
        return resolve_lang(obj, "location", self.context)

    def get_custom_columns(self, obj):
        lang = self.context.get("lang", "en") if self.context else "en"
        return obj.get_columns_for_lang(lang)

    def get_officers(self, obj):
        active_officers = obj.officers.all()
        return ContactOfficerSerializer(active_officers, many=True, context=self.context).data

    def get_officers_count(self, obj):
        return obj.officers.count()


class ContactFaqSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    answer = serializers.SerializerMethodField()

    class Meta:
        model = ContactFaq
        fields = [
            "id",
            "question",
            "answer",
            "order",
        ]

    def get_question(self, obj):
        return resolve_lang(obj, "question", self.context)

    def get_answer(self, obj):
        return resolve_lang(obj, "answer", self.context)


class ContactPageSettingsSerializer(serializers.ModelSerializer):
    page_title = serializers.SerializerMethodField()
    page_description = serializers.SerializerMethodField()
    
    directory_badge = serializers.SerializerMethodField()
    directory_title = serializers.SerializerMethodField()
    directory_subtitle = serializers.SerializerMethodField()
    
    hq_badge = serializers.SerializerMethodField()
    hq_title = serializers.SerializerMethodField()
    hq_description = serializers.SerializerMethodField()
    hq_address = serializers.SerializerMethodField()
    office_hours = serializers.SerializerMethodField()
    
    form_badge = serializers.SerializerMethodField()
    form_title = serializers.SerializerMethodField()
    form_subtitle = serializers.SerializerMethodField()
    form_guidance_title = serializers.SerializerMethodField()
    form_guidance_items = serializers.SerializerMethodField()

    faq_badge = serializers.SerializerMethodField()
    faq_title = serializers.SerializerMethodField()
    faq_subtitle = serializers.SerializerMethodField()

    class Meta:
        model = ContactPageSettings
        fields = [
            "page_title",
            "page_description",
            "directory_badge",
            "directory_title",
            "directory_subtitle",
            "hq_badge",
            "hq_title",
            "hq_description",
            "hq_address",
            "hq_telephone",
            "hq_email",
            "hq_secretary_email",
            "office_hours",
            "map_embed_url",
            "directions_url",
            "form_badge",
            "form_title",
            "form_subtitle",
            "form_guidance_title",
            "form_guidance_items",
            "faq_badge",
            "faq_title",
            "faq_subtitle",
            "receiver_email",
        ]

    def get_page_title(self, obj):
        return resolve_lang(obj, "page_title", self.context)

    def get_page_description(self, obj):
        return resolve_lang(obj, "page_description", self.context)

    def get_directory_badge(self, obj):
        return resolve_lang(obj, "directory_badge", self.context)

    def get_directory_title(self, obj):
        return resolve_lang(obj, "directory_title", self.context)

    def get_directory_subtitle(self, obj):
        return resolve_lang(obj, "directory_subtitle", self.context)

    def get_hq_badge(self, obj):
        return resolve_lang(obj, "hq_badge", self.context)

    def get_hq_title(self, obj):
        return resolve_lang(obj, "hq_title", self.context)

    def get_hq_description(self, obj):
        return resolve_lang(obj, "hq_description", self.context)

    def get_hq_address(self, obj):
        return resolve_lang(obj, "hq_address", self.context)

    def get_office_hours(self, obj):
        return resolve_lang(obj, "office_hours", self.context)

    def get_form_badge(self, obj):
        return resolve_lang(obj, "form_badge", self.context)

    def get_form_title(self, obj):
        return resolve_lang(obj, "form_title", self.context)

    def get_form_subtitle(self, obj):
        return resolve_lang(obj, "form_subtitle", self.context)

    def get_form_guidance_title(self, obj):
        return resolve_lang(obj, "form_guidance_title", self.context)

    def get_form_guidance_items(self, obj):
        return resolve_lang_list(obj, "form_guidance_items", self.context)

    def get_faq_badge(self, obj):
        return resolve_lang(obj, "faq_badge", self.context)

    def get_faq_title(self, obj):
        return resolve_lang(obj, "faq_title", self.context)

    def get_faq_subtitle(self, obj):
        return resolve_lang(obj, "faq_subtitle", self.context)


class ContactSubmissionSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(
        max_length=255,
        required=False,
        allow_blank=True,
        default="General Inquiry",
    )

    class Meta:
        model = ContactSubmission
        fields = ["id", "name", "email", "phone", "subject", "department_name", "message", "submitted_at"]
        read_only_fields = ["id", "submitted_at"]

    def validate_subject(self, value):
        if not value or not str(value).strip():
            return "General Inquiry"
        return str(value).strip()
