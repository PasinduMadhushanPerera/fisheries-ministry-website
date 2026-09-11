import os
import django
from django.core.management import call_command

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

def export_backup():
    out_file = "backup_data.json"
    print(f"[*] Exporting database models to {out_file} (UTF-8)...")
    
    with open(out_file, "w", encoding="utf-8") as f:
        call_command(
            "dumpdata",
            stdout=f,
            natural_foreign=True,
            natural_primary=True,
            exclude=["contenttypes", "auth.permission"],
            indent=2,
        )
    
    size = os.path.getsize(out_file)
    print(f"[SUCCESS] Database backup saved successfully! File size: {size / 1024:.2f} KB")

if __name__ == "__main__":
    export_backup()
