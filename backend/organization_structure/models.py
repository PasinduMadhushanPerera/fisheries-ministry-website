from pathlib import Path
from uuid import uuid4
from django.db import models
from django.utils import timezone
from common.models import TimeStampedModel


def org_structure_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    safe_filename = f"{uuid4().hex}{extension}"
    return f"organization_structure/{timezone.now():%Y/%m}/{safe_filename}"


# ==========================================================
# 01. Organization Structure Chart & Details (Multilingual)
# ==========================================================
class OrganizationStructureChart(TimeStampedModel):
    # 🇬🇧 English
    eyebrow_en = models.CharField(max_length=100, default="Administration", verbose_name="Eyebrow (English)")
    title_en = models.CharField(max_length=255, default="Organizational structure", verbose_name="Title (English)")
    description_en = models.TextField(
        default="View the official administrative and institutional structure of the Ministry.",
        verbose_name="Description (English)"
    )
    chart_box_title_en = models.CharField(max_length=255, default="Ministry organizational chart", verbose_name="Chart Box Title (English)")
    chart_box_subtitle_en = models.CharField(max_length=255, default="Official administrative reporting structure", verbose_name="Chart Box Subtitle (English)")
    executive_notes_en = models.TextField(
        default="On smaller screens, scroll horizontally to examine the complete organizational chart or select 'View full size'.",
        verbose_name="Executive Notes (English)"
    )

    # 🇱🇰 Sinhala (සිංහල)
    eyebrow_si = models.CharField(max_length=100, blank=True, default="පරිපාලනය", verbose_name="Eyebrow (සිංහල)")
    title_si = models.CharField(max_length=255, blank=True, default="සංවිධාන ව්‍යුහය", verbose_name="Title (සිංහල)")
    description_si = models.TextField(
        blank=True,
        default="අමාත්‍යාංශයේ නිල පරිපාලන සහ ආයතනික ව්‍යුහය නිරීක්ෂණය කරන්න.",
        verbose_name="Description (සිංහල)"
    )
    chart_box_title_si = models.CharField(max_length=255, blank=True, default="අමාත්‍යාංශ සංවිධාන සටහන", verbose_name="Chart Box Title (සිංහල)")
    chart_box_subtitle_si = models.CharField(max_length=255, blank=True, default="නිල පරිපාලන වාර්තාකරණ ව්‍යුහය", verbose_name="Chart Box Subtitle (සිංහල)")
    executive_notes_si = models.TextField(
        blank=True,
        default="කුඩා තිර සඳහා, සම්පූර්ණ සංවිධාන සටහන පරීක්ෂා කිරීමට තිරස් අතට අනුචලනය කරන්න හෝ 'සම්පූර්ණ ප්‍රමාණය බලන්න' තෝරන්න.",
        verbose_name="Executive Notes (සිංහල)"
    )

    # 🇱🇰 Tamil (தமிழ்)
    eyebrow_ta = models.CharField(max_length=100, blank=True, default="நிர்வாகம்", verbose_name="Eyebrow (தமிழ்)")
    title_ta = models.CharField(max_length=255, blank=True, default="நிறுவனக் கட்டமைப்பு", verbose_name="Title (தமிழ்)")
    description_ta = models.TextField(
        blank=True,
        default="அமைச்சின் உத்தியோகபூர்வ நிர்வாக மற்றும் நிறுவன கட்டமைப்பைப் பார்வையிடவும்.",
        verbose_name="Description (தமிழ்)"
    )
    chart_box_title_ta = models.CharField(max_length=255, blank=True, default="அமைச்சு நிறுவன வரைபடம்", verbose_name="Chart Box Title (தமிழ்)")
    chart_box_subtitle_ta = models.CharField(max_length=255, blank=True, default="உத்தியோகபூர்வ நிர்வாக அறிக்கை கட்டமைப்பு", verbose_name="Chart Box Subtitle (தமிழ்)")
    executive_notes_ta = models.TextField(
        blank=True,
        default="சிறிய திரைகளில் முழு வரைபடத்தைப் பார்க்க கிடைமட்டமாக உருட்டவும் அல்லது 'முழு அளவில் பார்க்க' என்பதைத் தேர்ந்தெடுக்கவும்.",
        verbose_name="Executive Notes (தமிழ்)"
    )

    # Media & Downloads
    chart_image = models.ImageField(upload_to=org_structure_upload_path, blank=True, null=True)
    chart_fallback = models.CharField(max_length=255, blank=True, default="/images/about/organizational-structure.jpg")
    chart_pdf = models.FileField(upload_to=org_structure_upload_path, blank=True, null=True)

    class Meta:
        verbose_name = "01. Organization Structure Chart & Details"
        verbose_name_plural = "01. Organization Structure Chart & Details"

    def __str__(self) -> str:
        return f"Organization Structure: {self.title_en}"
