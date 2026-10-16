from django.db import models


class ContactPageSettings(models.Model):
    """
    Singleton model for Contact Us Page Header, Main Office, Map & Form settings.
    """
    page_title_en = models.CharField(max_length=255, default="Contact Us", verbose_name="Page Title (English)")
    page_title_si = models.CharField(max_length=255, blank=True, default="අප හා සම්බන්ධ වන්න", verbose_name="Page Title (සිංහල)")
    page_title_ta = models.CharField(max_length=255, blank=True, default="எங்களைத் தொடர்பு கொள்ளவும்", verbose_name="Page Title (தமிழ்)")

    page_description_en = models.TextField(
        default="Official contact portal of the Ministry of Fisheries. Access departmental directories, headquarters address, office map, inquiry submission form, and public FAQs.",
        verbose_name="Page Description (English)"
    )
    page_description_si = models.TextField(blank=True, default="", verbose_name="Page Description (සිංහල)")
    page_description_ta = models.TextField(blank=True, default="", verbose_name="Page Description (தமிழ்)")

    # Section 1: Department Directory Header
    directory_badge_en = models.CharField(max_length=255, default="Primary Contact Directory", verbose_name="Directory Badge (English)")
    directory_badge_si = models.CharField(max_length=255, blank=True, default="ප්‍රාථමික සම්බන්ධතා නාමාවලිය", verbose_name="Directory Badge (සිංහල)")
    directory_badge_ta = models.CharField(max_length=255, blank=True, default="முதன்மை தொடர்பு கோப்பகம்", verbose_name="Directory Badge (தமிழ்)")

    directory_title_en = models.CharField(max_length=255, default="Departmental & Division Contacts", verbose_name="Directory Title (English)")
    directory_title_si = models.CharField(max_length=255, blank=True, default="අමාත්‍යාංශ අංශ සහ දෙපාර්තමේන්තු සම්බන්ධතා", verbose_name="Directory Title (සිංහල)")
    directory_title_ta = models.CharField(max_length=255, blank=True, default="திணைக்கள & பிரிவு தொடர்புகள்", verbose_name="Directory Title (தமிழ்)")

    directory_subtitle_en = models.TextField(
        default="Access direct telephone numbers, extensions, location details, and officer emails for each division and affiliated department.",
        verbose_name="Directory Subtitle (English)"
    )
    directory_subtitle_si = models.TextField(blank=True, default="", verbose_name="Directory Subtitle (සිංහල)")
    directory_subtitle_ta = models.TextField(blank=True, default="", verbose_name="Directory Subtitle (தமிழ்)")

    # Section 2: Main Headquarters & Map Section Details
    hq_badge_en = models.CharField(max_length=255, default="Ministry Headquarters", verbose_name="HQ Badge (English)")
    hq_badge_si = models.CharField(max_length=255, blank=True, default="අමාත්‍යාංශ ප්‍රධාන කාර්යාලය", verbose_name="HQ Badge (සිංහල)")
    hq_badge_ta = models.CharField(max_length=255, blank=True, default="அமைச்சின் தலைமை அலுவலகம்", verbose_name="HQ Badge (தமிழ்)")

    hq_title_en = models.CharField(max_length=255, default="Visit Our Main Office", verbose_name="HQ Title (English)")
    hq_title_si = models.CharField(max_length=255, blank=True, default="ප්‍රධාන කාර්යාලය", verbose_name="HQ Title (සිංහල)")
    hq_title_ta = models.CharField(max_length=255, blank=True, default="தலைமை அலுவலகம்", verbose_name="HQ Title (தமிழ்)")

    hq_description_en = models.TextField(
        default="Official Headquarters of the Ministry of Fisheries, Aquatic and Ocean Resources.",
        verbose_name="HQ Description (English)"
    )
    hq_description_si = models.TextField(blank=True, default="", verbose_name="HQ Description (සිංහල)")
    hq_description_ta = models.TextField(blank=True, default="", verbose_name="HQ Description (தமிழ்)")

    hq_address_en = models.CharField(max_length=500, default="New Secretariat, Maligawatta, Colombo 10, Sri Lanka", verbose_name="Address (English)")
    hq_address_si = models.CharField(max_length=500, blank=True, default="නවලේකම් කාර්යාලය, මාලිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව", verbose_name="Address (සිංහල)")
    hq_address_ta = models.CharField(max_length=500, blank=True, default="புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை", verbose_name="Address (தமிழ்)")

    hq_telephone = models.CharField(max_length=255, default="+94 112 327 060 / +94 112 436 665", verbose_name="Headquarters Telephone")
    hq_email = models.EmailField(default="info@fisheries.gov.lk", verbose_name="Headquarters Email")
    hq_secretary_email = models.EmailField(default="secretary@fisheries.gov.lk", verbose_name="Secretary Email")

    office_hours_en = models.CharField(max_length=255, default="Monday – Friday: 8:30 AM – 4:15 PM (Closed on weekends & Poya Days)", verbose_name="Office Hours (English)")
    office_hours_si = models.CharField(max_length=255, blank=True, default="සඳුදා – සිකුරාදා: පෙ.ව. 8:30 – ප.ව. 4:15 (සති අන්ත සහ පෝය දිනවල වසා ඇත)", verbose_name="Office Hours (සිංහල)")
    office_hours_ta = models.CharField(max_length=255, blank=True, default="திங்கள் – வெள்ளி: காலை 8:30 – மாலை 4:15 (வார இறுதி நாட்கள் & பௌர்ணமி தினங்களில் மூடப்படும்)", verbose_name="Office Hours (தமிழ்)")

    map_embed_url = models.TextField(
        default="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.660212325883!2d79.8648980749966!3d6.931154593068715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259071d2f5389%3A0x986c02d39d63bae0!2sMinistry%20of%20Fisheries%20and%20Aquatic%20Resources%20Development%20New%20Secretariat%2C%20Maligawatta%2C%20Colombo!5e0!3m2!1sen!2slk!4v1785832315813!5m2!1sen!2slk",
        verbose_name="Google Maps Embed URL"
    )
    directions_url = models.URLField(
        default="https://maps.google.com/?q=Ministry+of+Fisheries+Maligawatta+Colombo",
        max_length=500,
        verbose_name="Google Maps Directions Link"
    )

    # Section 3: Contact Form Customization
    form_badge_en = models.CharField(max_length=255, default="Public Inquiry Form", verbose_name="Form Badge (English)")
    form_badge_si = models.CharField(max_length=255, blank=True, default="මහජන විමසීම් පෝරමය", verbose_name="Form Badge (සිංහල)")
    form_badge_ta = models.CharField(max_length=255, blank=True, default="பொது விசாரணை படிவம்", verbose_name="Form Badge (தமிழ்)")

    form_title_en = models.CharField(max_length=255, default="Send Us a Message", verbose_name="Form Title (English)")
    form_title_si = models.CharField(max_length=255, blank=True, default="අප වෙත පණිවුඩයක් යොමු කරන්න", verbose_name="Form Title (සිංහල)")
    form_title_ta = models.CharField(max_length=255, blank=True, default="எங்களுக்கு ஒரு செய்தியை அனுப்புங்கள்", verbose_name="Form Title (தமிழ்)")

    form_subtitle_en = models.TextField(
        default="Submit your question, feedback or public inquiry directly to the Ministry staff. All inquiries are delivered directly to minfishit@gmail.com and logged in our system.",
        verbose_name="Form Subtitle (English)"
    )
    form_subtitle_si = models.TextField(blank=True, default="", verbose_name="Form Subtitle (සිංහල)")
    form_subtitle_ta = models.TextField(blank=True, default="", verbose_name="Form Subtitle (தமிழ்)")

    form_guidance_title_en = models.CharField(max_length=255, default="Before you submit", verbose_name="Guidance Box Title (English)")
    form_guidance_title_si = models.CharField(max_length=255, blank=True, default="යොමු කිරීමට පෙර", verbose_name="Guidance Box Title (සිංහල)")
    form_guidance_title_ta = models.CharField(max_length=255, blank=True, default="சமர்ப்பிப்பதற்கு முன்", verbose_name="Guidance Box Title (தமிழ்)")

    form_guidance_items_en = models.JSONField(
        default=list,
        blank=True,
        verbose_name="Guidance Bullet Points (English)"
    )
    form_guidance_items_si = models.JSONField(
        default=list,
        blank=True,
        verbose_name="Guidance Bullet Points (සිංහල)"
    )
    form_guidance_items_ta = models.JSONField(
        default=list,
        blank=True,
        verbose_name="Guidance Bullet Points (தமிழ்)"
    )

    # Section 4: Public FAQ Section Header
    faq_badge_en = models.CharField(max_length=255, default="Public FAQ", verbose_name="FAQ Badge (English)")
    faq_badge_si = models.CharField(max_length=255, blank=True, default="පොදු නිතර අසන ප්‍රශ්න", verbose_name="FAQ Badge (සිංහල)")
    faq_badge_ta = models.CharField(max_length=255, blank=True, default="பொது FAQ", verbose_name="FAQ Badge (தமிழ்)")

    faq_title_en = models.CharField(max_length=255, default="Frequently Asked Questions", verbose_name="FAQ Section Title (English)")
    faq_title_si = models.CharField(max_length=255, blank=True, default="නිතර අසන ප්‍රශ්න", verbose_name="FAQ Section Title (සිංහල)")
    faq_title_ta = models.CharField(max_length=255, blank=True, default="அடிக்கடி கேட்கப்படும் கேள்விகள்", verbose_name="FAQ Section Title (தமிழ்)")

    faq_subtitle_en = models.TextField(
        default="Quick answers to common questions regarding department contacts, office hours, and public service inquiries.",
        verbose_name="FAQ Subtitle (English)"
    )
    faq_subtitle_si = models.TextField(blank=True, default="", verbose_name="FAQ Subtitle (සිංහල)")
    faq_subtitle_ta = models.TextField(blank=True, default="", verbose_name="FAQ Subtitle (தமிழ்)")

    # Email Settings for Contact Form Submissions
    receiver_email = models.EmailField(
        default="minfishit@gmail.com",
        help_text="Recipient email address where submitted contact form inquiries will be sent.",
        verbose_name="Form Recipient Email"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Contact Page Settings"
        verbose_name_plural = "Contact Page Settings"

    def __str__(self):
        return "Contact Page Header, Map, Form & Section Settings"


class ContactDepartment(models.Model):
    """
    Department / Division category under Departmental & Division Contacts section.
    Allows customizing column headers and table rows dynamically.
    """
    name_en = models.CharField(max_length=255, verbose_name="Department Name (English)")
    name_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Department Name (සිංහල)")
    name_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Department Name (தமிழ்)")

    description_en = models.TextField(blank=True, default="", verbose_name="Description (English)")
    description_si = models.TextField(blank=True, default="", verbose_name="Description (සිංහල)")
    description_ta = models.TextField(blank=True, default="", verbose_name="Description (தமிழ்)")

    location_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Location / Floor (English)")
    location_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Location / Floor (සිංහල)")
    location_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Location / Floor (தமிழ்)")

    # Dynamic Column Headers configuration for the table
    custom_columns = models.JSONField(
        default=list,
        blank=True,
        help_text="Custom list of column names for this department table. Admin can add, edit, or remove columns (e.g. ['Designation', 'Officer Name', 'Telephone', 'Mobile', 'Fax', 'Email', 'Location', 'Notes'])",
        verbose_name="Custom Table Columns"
    )

    # Dynamic Multilingual Custom Columns (Up to 5 custom columns per department table)
    custom_col_1_name_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 1 Header (English)")
    custom_col_1_name_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 1 Header (සිංහල)")
    custom_col_1_name_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 1 Header (தமிழ்)")

    custom_col_2_name_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 2 Header (English)")
    custom_col_2_name_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 2 Header (සිංහල)")
    custom_col_2_name_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 2 Header (தமிழ்)")

    custom_col_3_name_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 3 Header (English)")
    custom_col_3_name_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 3 Header (සිංහල)")
    custom_col_3_name_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 3 Header (தமிழ்)")

    custom_col_4_name_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 4 Header (English)")
    custom_col_4_name_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 4 Header (සිංහල)")
    custom_col_4_name_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 4 Header (தமிழ்)")

    custom_col_5_name_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 5 Header (English)")
    custom_col_5_name_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 5 Header (සිංහල)")
    custom_col_5_name_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Custom Column 5 Header (தமிழ்)")

    order = models.PositiveIntegerField(default=0, verbose_name="Display Order")
    is_active = models.BooleanField(default=True, verbose_name="Is Active")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Department / Division Category"
        verbose_name_plural = "Department & Division Categories"

    def __str__(self):
        return self.name_en

    def get_columns_for_lang(self, lang="en"):
        """
        Returns the resolved list of table column names for the given language.
        Combines base custom_columns (or defaults) with any defined custom_col_1..5.
        """
        STANDARD_COL_MAP = {
            "designation": {"en": "Designation", "si": "තනතුර", "ta": "பதவி"},
            "officer name": {"en": "Officer Name", "si": "නිලධාරියාගේ නම", "ta": "அதிகாரியின் பெயர்"},
            "name": {"en": "Name", "si": "නම", "ta": "பெயர்"},
            "telephone": {"en": "Telephone", "si": "ස්ථාවර දුරකථන", "ta": "தொலைபேசி"},
            "mobile": {"en": "Mobile", "si": "ජංගම දුරකථන", "ta": "கைபேசி"},
            "telephone / mobile": {"en": "Telephone / Mobile", "si": "දුරකථන / ජංගම", "ta": "தொலைபேசி / கைபேசி"},
            "fax": {"en": "Fax", "si": "ෆැක්ස්", "ta": "தொலைநகல்"},
            "email": {"en": "Email", "si": "විද්‍යුත් තැපෑල", "ta": "மின்னஞ்சல்"},
            "email address": {"en": "Email Address", "si": "විද්‍යුත් තැපැල් ලිපිනය", "ta": "மின்னஞ்சல் முகவரி"},
            "room / location": {"en": "Room / Location", "si": "කාමරය / ස්ථානය", "ta": "அறை / இடம்"},
            "location": {"en": "Location", "si": "ස්ථානය", "ta": "இடம்"},
            "notes": {"en": "Notes", "si": "සටහන්", "ta": "குறிப்புகள்"},
        }

        # Base columns
        base_cols = list(self.custom_columns) if (self.custom_columns and len(self.custom_columns) > 0) else [
            "Designation", "Officer Name", "Telephone", "Mobile", "Fax", "Email"
        ]

        result = []
        for col in base_cols:
            col_norm = col.strip().lower()
            if col_norm in STANDARD_COL_MAP and lang in ("si", "ta"):
                result.append(STANDARD_COL_MAP[col_norm].get(lang, col))
            else:
                result.append(col)

        # Append defined custom columns 1..5
        for i in range(1, 6):
            c_en = getattr(self, f"custom_col_{i}_name_en", "").strip()
            c_si = getattr(self, f"custom_col_{i}_name_si", "").strip() or c_en
            c_ta = getattr(self, f"custom_col_{i}_name_ta", "").strip() or c_en
            if c_en:
                if lang == "si":
                    val = c_si
                elif lang == "ta":
                    val = c_ta
                else:
                    val = c_en
                if val not in result:
                    result.append(val)

        return result


class ContactOfficer(models.Model):
    """
    Individual officer row inside a Department contact table.
    Supports structured fields, multilingual custom column values, and flexible JSON values.
    """
    department = models.ForeignKey(
        ContactDepartment,
        on_delete=models.CASCADE,
        related_name="officers",
        verbose_name="Department / Division"
    )

    designation_en = models.CharField(max_length=255, verbose_name="Designation (English)")
    designation_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Designation (සිංහල)")
    designation_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Designation (தமிழ்)")

    name_en = models.CharField(max_length=255, verbose_name="Officer Name (English)")
    name_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Officer Name (සිංහල)")
    name_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Officer Name (தமிழ்)")

    telephone = models.CharField(max_length=100, blank=True, default="", verbose_name="Telephone")
    mobile = models.CharField(max_length=100, blank=True, default="", verbose_name="Mobile")
    fax = models.CharField(max_length=100, blank=True, default="", verbose_name="Fax")
    email = models.CharField(max_length=255, blank=True, default="", verbose_name="Email Address")

    location_en = models.CharField(max_length=255, blank=True, default="", verbose_name="Room / Location (English)")
    location_si = models.CharField(max_length=255, blank=True, default="", verbose_name="Room / Location (සිංහල)")
    location_ta = models.CharField(max_length=255, blank=True, default="", verbose_name="Room / Location (தமிழ்)")

    notes_en = models.TextField(blank=True, default="", verbose_name="Notes / Remarks (English)")
    notes_si = models.TextField(blank=True, default="", verbose_name="Notes / Remarks (සිංහල)")
    notes_ta = models.TextField(blank=True, default="", verbose_name="Notes / Remarks (தமிழ்)")

    # Dynamic Multilingual Custom Column Values (Values for custom_col_1..5)
    custom_col_1_val_en = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 1 Value (English)")
    custom_col_1_val_si = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 1 Value (සිංහල)")
    custom_col_1_val_ta = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 1 Value (தமிழ்)")

    custom_col_2_val_en = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 2 Value (English)")
    custom_col_2_val_si = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 2 Value (සිංහල)")
    custom_col_2_val_ta = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 2 Value (தமிழ்)")

    custom_col_3_val_en = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 3 Value (English)")
    custom_col_3_val_si = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 3 Value (සිංහල)")
    custom_col_3_val_ta = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 3 Value (தமிழ்)")

    custom_col_4_val_en = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 4 Value (English)")
    custom_col_4_val_si = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 4 Value (සිංහල)")
    custom_col_4_val_ta = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 4 Value (தமிழ்)")

    custom_col_5_val_en = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 5 Value (English)")
    custom_col_5_val_si = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 5 Value (සිංහල)")
    custom_col_5_val_ta = models.CharField(max_length=500, blank=True, default="", verbose_name="Custom Column 5 Value (தமிழ்)")

    # Flexible key-value pairs for additional admin-defined dynamic table columns
    extra_data = models.JSONField(
        default=dict,
        blank=True,
        help_text="Additional custom column data as key-value dictionary (e.g. {'Extension': '402', 'Duty': 'Harbor Permits'})",
        verbose_name="Extra Column Values"
    )

    order = models.PositiveIntegerField(default=0, verbose_name="Display Order")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Department Officer / Contact Row"
        verbose_name_plural = "Department Officers / Contact Rows"

    def __str__(self):
        return f"{self.designation_en} - {self.name_en} ({self.department.name_en})"

    def save(self, *args, **kwargs):
        if not isinstance(self.extra_data, dict):
            self.extra_data = {}

        # Auto-sync custom column values into extra_data dictionary
        if self.department_id:
            try:
                dept = self.department
                for i in range(1, 6):
                    c_en = getattr(dept, f"custom_col_{i}_name_en", "").strip()
                    c_si = getattr(dept, f"custom_col_{i}_name_si", "").strip() or c_en
                    c_ta = getattr(dept, f"custom_col_{i}_name_ta", "").strip() or c_en

                    v_en = getattr(self, f"custom_col_{i}_val_en", "").strip()
                    v_si = getattr(self, f"custom_col_{i}_val_si", "").strip()
                    v_ta = getattr(self, f"custom_col_{i}_val_ta", "").strip()

                    if c_en:
                        if v_en:
                            self.extra_data[c_en] = v_en
                        if v_si and c_si:
                            self.extra_data[c_si] = v_si
                        if v_ta and c_ta:
                            self.extra_data[c_ta] = v_ta
            except Exception:
                pass

        super().save(*args, **kwargs)


class ContactFaq(models.Model):
    """
    Multilingual Public Contact FAQs editable by Admin.
    """
    question_en = models.CharField(max_length=500, verbose_name="Question (English)")
    question_si = models.CharField(max_length=500, blank=True, default="", verbose_name="Question (සිංහල)")
    question_ta = models.CharField(max_length=500, blank=True, default="", verbose_name="Question (தமிழ்)")

    answer_en = models.TextField(verbose_name="Answer (English)")
    answer_si = models.TextField(blank=True, default="", verbose_name="Answer (සිංහල)")
    answer_ta = models.TextField(blank=True, default="", verbose_name="Answer (தமிழ்)")

    order = models.PositiveIntegerField(default=0, verbose_name="Display Order")
    is_active = models.BooleanField(default=True, verbose_name="Is Active")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Public Contact FAQ"
        verbose_name_plural = "Public Contact FAQs"

    def __str__(self):
        return self.question_en


class ContactSubmission(models.Model):
    """
    Messages submitted by citizens/users via the contact form on the website.
    Read-only view for Admin reference.
    """
    name = models.CharField(max_length=255, verbose_name="Full Name")
    email = models.EmailField(verbose_name="Email Address")
    phone = models.CharField(max_length=100, blank=True, default="", verbose_name="Phone Number")
    subject = models.CharField(max_length=255, blank=True, default="General Inquiry", verbose_name="Subject")
    department_name = models.CharField(max_length=255, blank=True, default="", verbose_name="Department Concerned")
    message = models.TextField(verbose_name="Message Content")

    submitted_at = models.DateTimeField(auto_now_add=True, verbose_name="Submitted At")
    is_read = models.BooleanField(default=False, verbose_name="Is Read / Reviewed")
    admin_notes = models.TextField(blank=True, default="", verbose_name="Admin Notes / Response Action")

    class Meta:
        ordering = ["-submitted_at"]
        verbose_name = "Received Contact Message"
        verbose_name_plural = "Received Contact Messages"

    def __str__(self):
        return f"{self.subject} - {self.name} ({self.submitted_at.strftime('%Y-%m-%d %H:%M')})"
