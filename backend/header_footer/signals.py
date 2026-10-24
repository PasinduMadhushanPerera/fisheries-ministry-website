from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.utils import timezone

SINHALA_MONTHS = {
    1: "ජනවාරි", 2: "පෙබරවාරි", 3: "මාර්තු", 4: "අප්‍රේල්",
    5: "මැයි", 6: "ජූනි", 7: "ජූලි", 8: "අගෝස්තු",
    9: "සැප්තැම්බර්", 10: "ඔක්තෝබර්", 11: "නොවැම්බර්", 12: "දෙසැම්බර්"
}

TAMIL_MONTHS = {
    1: "ஜனவரி", 2: "பிப்ரவரி", 3: "மார்ச்", 4: "ஏப்ரல்",
    5: "மே", 6: "ஜூன்", 7: "ஜூலை", 8: "ஆகஸ்ட்",
    9: "செப்டம்பர்", 10: "அக்டோபர்", 11: "நவம்பர்", 12: "டிசம்பர்"
}


def get_multilingual_dates(dt=None):
    if dt is None:
        dt = timezone.now()
    day = dt.day
    month = dt.month
    year = dt.year
    month_name = dt.strftime("%B")

    today_en = f"{day} {month_name} {year}"
    today_si = f"{year} {SINHALA_MONTHS.get(month, month_name)} {day}"
    today_ta = f"{day} {TAMIL_MONTHS.get(month, month_name)} {year}"
    return today_en, today_si, today_ta


@receiver(post_save)
@receiver(post_delete)
def auto_update_last_updated_date(sender, instance, **kwargs):
    """
    Automatically updates FooterSetting last_updated_text in all 3 languages (EN, SI, TA)
    whenever ANY model in the CMS is created, updated, or deleted.
    Does NOT fire when editing FooterSetting itself (allowing manual override).
    """
    model_name = getattr(sender, "__name__", "")
    module_name = getattr(sender, "__module__", "")

    # Exclude FooterSetting itself (so manual edits in Admin are preserved)
    # Exclude internal Django system models
    if model_name in [
        "FooterSetting",
        "LogEntry",
        "Session",
        "ContentType",
        "Migration",
        "Permission",
        "Group",
        "User",
    ]:
        return

    if module_name.startswith("django.contrib.") or module_name.startswith("django.core."):
        return

    try:
        from .models import FooterSetting

        footer = FooterSetting.objects.first()
        if not footer:
            footer = FooterSetting.objects.create()

        today_en, today_si, today_ta = get_multilingual_dates(timezone.now())

        updates = {}
        if footer.last_updated_text != today_en:
            updates["last_updated_text"] = today_en
        if footer.last_updated_text_si != today_si:
            updates["last_updated_text_si"] = today_si
        if footer.last_updated_text_ta != today_ta:
            updates["last_updated_text_ta"] = today_ta

        if updates:
            FooterSetting.objects.filter(pk=footer.pk).update(**updates)
    except Exception:
        pass
