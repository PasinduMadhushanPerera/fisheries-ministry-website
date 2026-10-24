from rest_framework import serializers
from .models import InternalAffairsOfficer, OfficerContactLine, InternalAffairsDocument, InternalAffairsPageSettings


class InternalAffairsPageSettingsSerializer(serializers.ModelSerializer):
    officersHeader = serializers.SerializerMethodField()
    documentsHeader = serializers.SerializerMethodField()

    class Meta:
        model = InternalAffairsPageSettings
        fields = [
            "officersHeader",
            "documentsHeader",
        ]

    def _get_lang(self):
        request = self.context.get("request")
        if request:
            return request.query_params.get("lang", "en").lower()
        return "en"

    def get_officersHeader(self, obj):
        lang = self._get_lang()
        if lang == "si":
            return {
                "badge": obj.officers_badge_si or obj.officers_badge_en,
                "title": obj.officers_title_si or obj.officers_title_en,
                "description": obj.officers_description_si or obj.officers_description_en,
            }
        if lang == "ta":
            return {
                "badge": obj.officers_badge_ta or obj.officers_badge_en,
                "title": obj.officers_title_ta or obj.officers_title_en,
                "description": obj.officers_description_ta or obj.officers_description_en,
            }
        return {
            "badge": obj.officers_badge_en,
            "title": obj.officers_title_en,
            "description": obj.officers_description_en,
        }

    def get_documentsHeader(self, obj):
        lang = self._get_lang()
        if lang == "si":
            return {
                "badge": obj.documents_badge_si or obj.documents_badge_en,
                "title": obj.documents_title_si or obj.documents_title_en,
                "description": obj.documents_description_si or obj.documents_description_en,
            }
        if lang == "ta":
            return {
                "badge": obj.documents_badge_ta or obj.documents_badge_en,
                "title": obj.documents_title_ta or obj.documents_title_en,
                "description": obj.documents_description_ta or obj.documents_description_en,
            }
        return {
            "badge": obj.documents_badge_en,
            "title": obj.documents_title_en,
            "description": obj.documents_description_en,
        }


class OfficerContactLineSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()
    linkUrl = serializers.SerializerMethodField()

    class Meta:
        model = OfficerContactLine
        fields = [
            "id",
            "label",
            "value",
            "icon_type",
            "link_type",
            "linkUrl",
            "order",
        ]

    def _get_lang(self):
        request = self.context.get("request")
        if request:
            return request.query_params.get("lang", "en").lower()
        return "en"

    def get_label(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.label_si:
            return obj.label_si
        if lang == "ta" and obj.label_ta:
            return obj.label_ta
        return obj.label_en

    def get_linkUrl(self, obj):
        val = (obj.value or "").strip()
        if not val:
            return "#"

        lt = obj.link_type
        if lt == "tel" or (lt == "auto" and (val.startswith("+") or val.replace(" ", "").replace("-", "").isdigit())):
            clean_num = val.replace(" ", "")
            return f"tel:{clean_num}"
        if lt == "whatsapp" or (lt == "auto" and "whatsapp" in obj.label_en.lower()):
            clean_num = val.replace("+", "").replace(" ", "").replace("-", "")
            return f"https://wa.me/{clean_num}"
        if lt == "mailto" or (lt == "auto" and ("@" in val or "[at]" in val.lower() or "mail" in obj.label_en.lower())):
            clean_email = val.replace("[at]", "@").replace("(at)", "@").strip()
            return f"mailto:{clean_email}"
        if lt == "url" or (lt == "auto" and val.startswith("http")):
            return val

        return "#"


class InternalAffairsOfficerSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="officer_id")
    name = serializers.SerializerMethodField()
    designation = serializers.SerializerMethodField()
    roleBadge = serializers.SerializerMethodField()
    officeAddress = serializers.SerializerMethodField()
    phoneLabel = serializers.SerializerMethodField()
    mobileLabel = serializers.SerializerMethodField()
    emailLabel = serializers.SerializerMethodField()
    mobileWhatsapp = serializers.CharField(source="mobile_whatsapp")
    photo = serializers.SerializerMethodField()
    customContactLines = serializers.SerializerMethodField()

    class Meta:
        model = InternalAffairsOfficer
        fields = [
            "id",
            "name",
            "designation",
            "roleBadge",
            "phone",
            "phoneLabel",
            "mobileWhatsapp",
            "mobileLabel",
            "email",
            "emailLabel",
            "officeAddress",
            "photo",
            "customContactLines",
            "order",
        ]

    def _get_lang(self):
        request = self.context.get("request")
        if request:
            return request.query_params.get("lang", "en").lower()
        return "en"

    def get_name(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.name_si:
            return obj.name_si
        if lang == "ta" and obj.name_ta:
            return obj.name_ta
        return obj.name_en

    def get_designation(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.designation_si:
            return obj.designation_si
        if lang == "ta" and obj.designation_ta:
            return obj.designation_ta
        return obj.designation_en

    def get_roleBadge(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.role_badge_si:
            return obj.role_badge_si
        if lang == "ta" and obj.role_badge_ta:
            return obj.role_badge_ta
        return obj.role_badge_en

    def get_officeAddress(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.office_address_si:
            return obj.office_address_si
        if lang == "ta" and obj.office_address_ta:
            return obj.office_address_ta
        return obj.office_address_en

    def get_phoneLabel(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.phone_label_si:
            return obj.phone_label_si
        if lang == "ta" and obj.phone_label_ta:
            return obj.phone_label_ta
        return obj.phone_label_en or "Telephone"

    def get_mobileLabel(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.mobile_label_si:
            return obj.mobile_label_si
        if lang == "ta" and obj.mobile_label_ta:
            return obj.mobile_label_ta
        return obj.mobile_label_en or "Mobile / WhatsApp"

    def get_emailLabel(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.email_label_si:
            return obj.email_label_si
        if lang == "ta" and obj.email_label_ta:
            return obj.email_label_ta
        return obj.email_label_en or "Email"

    def get_photo(self, obj):
        if obj.photo:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return obj.photo_fallback or "/images/leadership/secretary.jpg"

    def get_customContactLines(self, obj):
        lines = obj.custom_contact_lines.filter(is_active=True).order_by("order", "id")
        return OfficerContactLineSerializer(lines, many=True, context=self.context).data


class InternalAffairsDocumentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="document_id")
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    fileUrl = serializers.SerializerMethodField()
    downloadUrl = serializers.SerializerMethodField()
    fileType = serializers.CharField(source="file_type")
    fileSize = serializers.CharField(source="file_size")
    publishedDate = serializers.CharField(source="display_date")

    class Meta:
        model = InternalAffairsDocument
        fields = [
            "id",
            "title",
            "description",
            "fileType",
            "fileSize",
            "fileUrl",
            "downloadUrl",
            "publishedDate",
            "order",
        ]

    def _get_lang(self):
        request = self.context.get("request")
        if request:
            return request.query_params.get("lang", "en").lower()
        return "en"

    def get_title(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.title_si:
            return obj.title_si
        if lang == "ta" and obj.title_ta:
            return obj.title_ta
        return obj.title_en

    def get_description(self, obj):
        lang = self._get_lang()
        if lang == "si" and obj.description_si:
            return obj.description_si
        if lang == "ta" and obj.description_ta:
            return obj.description_ta
        return obj.description_en

    def get_fileUrl(self, obj):
        lang = self._get_lang()
        f = obj.get_file_for_lang(lang)
        if f:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(f.url)
            return f.url
        return "#"

    def get_downloadUrl(self, obj):
        return self.get_fileUrl(obj)
