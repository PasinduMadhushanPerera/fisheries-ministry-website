# AGY Internal Codebase Guidance & Architecture Guide

> **Note for AI Assistant (Antigravity / AGY)**: This document serves strictly as internal architectural and technical reference guidance for AI coding turns. It outlines codebase structure, domain models, multilingual resolution patterns, API contracts, dynamic table schemas, and administrative workflows.

---

## 1. System Architecture Overview

- **Frontend**: Next.js 15 (App Router, Server Components & Client Components), Tailwind CSS, Lucide React Icons.
  - **Location**: `/frontend`
  - **Port**: `http://localhost:3000`
- **Backend**: Django 5.x REST Framework (DRF), Django Admin, MySQL database (`fisheries_ministry_db`).
  - **Location**: `/backend`
  - **Port**: `http://127.0.0.1:8000`
- **Authentication & Permissions**: Django Session Authentication / IsAuthenticatedOrReadOnly.

---

## 2. Core Domain Models & Django Apps Summary

### A. Contact Page & Department Directory (`contact_page`)
- **`DepartmentCategory`**: Dynamic department/division categories (e.g. *Ministry Secretariat*, *Administration & HR*, *Fisheries Development*, *Ocean Resources*). Supports dynamic table custom column names stored as a JSON array (`custom_table_columns`, e.g., `["Designation", "Officer Name", "Telephone", "Mobile", "Fax", "Email", "Location", "Notes1"]`).
- **`ContactOfficer`**: Individual contact rows assigned to a `DepartmentCategory`. Stores dynamic/custom column cell values inside the `extra_data` JSON field (`{"Notes1": "Value", "Extension": "402"}`).
- **`ContactPageSettings`**: Singleton model holding customizable frontend section headers, HQ details, address, telephone, office hours, Google Maps embed URL, directions link, contact form guidance items, and target receiver email.
- **`ContactSubmission`**: Citizen contact form inquiries. Stored in DB and dispatched via SMTP email to `CONTACT_RECEIVER_EMAIL` (`minfishit@gmail.com`).
  - *Admin Directive*: Read-only log workflow (`readonly_fields`, `has_add_permission = False`). Admins cannot edit submitted citizen content.
- **`ContactFaq`**: Public contact FAQs supporting multilingual questions and answers in English (`_en`), Sinhala (`_si`), and Tamil (`_ta`).

### B. Header & Footer Management (`header_footer`)
- **`HeaderSetting`**: Singleton model for top utility bar phone/email/links, ministry title, tagline, logo image/fallback, and search box placeholder.
- **`FooterSetting`**: Singleton model for footer column 1 branding text, Sri Lanka Gov portal link, HQ address, support email/phone, copyright notice, and `last_updated_text`.
- **`FooterLink`**: Dynamic navigation links assigned to footer columns (`quick`, `info`, `support`, `legal`).
- **`FooterAward`**: Dynamic award badges, accolades, or certification images editable via Django Admin.
- **`WebsiteViewsCounter`**: Singleton model tracking live total website views (`total_views`). Atomically incremented via API on new session visits and displayed as a live badge in the footer.

### C. Statistics, Publications & Media Apps
- **`downloads_page`**: Categorized downloadable documents, policies, plans, and reports with view modals and file attachments.
- **`news` & `press_releases` & `notices` & `events`**: Multilingual announcements, news articles, official gazette notices, and event schedules.
- **`annual_statistics` & `monthly_fish_production` & `weekly_fish_prices` & `fisheries_statistics` & `export_import_statistics`**: Data tables for fisheries economics, market prices, and marine statistics.
- ** Profiles (`minister_profile`, `deputy_minister_profile`, `secretary_profile`)**: Official biography pages, speeches, and vision statements.

---

## 3. Key Design Patterns & Technical Workflows

### A. Multilingual Translation Pattern (`resolve_lang`)
- Django DRF serializers resolve localized fields automatically based on the request query parameter (`?lang=en`, `?lang=si`, `?lang=ta`).
- **Pattern**: If `lang=si` is requested, the serializer looks for field `title_si`. If empty, it falls back gracefully to English `title_en`.
- **Frontend Sync**: `LanguageContext` maintains active site language state (`en`, `si`, `ta`), syncs with `localStorage`, cookies, and URL `?lang=...` query parameters, triggering real-time re-fetches from backend DRF endpoints.

### B. Email Dispatch Workflow (`SubmitContactFormView`)
- **Technology**: Django SMTP Backend (`django.core.mail.EmailMessage`) via Google SMTP (`smtp.gmail.com:587`, TLS).
- **Sender Account**: `DEFAULT_FROM_EMAIL` (`stayfinderuwu@gmail.com`).
- **App Password**: Configured in `backend/.env` under `EMAIL_HOST_PASSWORD`.
- **Recipient**: Configured in `CONTACT_RECEIVER_EMAIL` / `ContactPageSettings.receiver_email` (`minfishit@gmail.com`).
- **Header Contract**: Email `reply_to` is dynamically set to `submission.email` so clicking "Reply" in Gmail responds directly to the citizen inquiry.

### C. Dynamic Custom Table Columns
- Admins can add or remove table columns dynamically per department category in Django Admin by specifying a JSON list of column names in `DepartmentCategory.custom_table_columns`.
- `DepartmentDirectory` frontend component renders standard table headers dynamically based on `custom_table_columns` and fetches cell data from `officer.extra_data`.
- Dynamic cells are styled as standard body text (`text-slate-700 font-normal align-top`) matching default columns.

### D. Footer Layout & Styling Specifications
- **Background Color**: Lighter rich forest-teal `#0d332c`.
- **Topic Titles**: Light Yellow (`text-yellow-300`) for the 4 topic headings (*Ministry Title*, *Quick Links*, *Information & Portals*, *Contact & Support*).
- **Accents**: Original green indicator dots (`bg-emerald-400`) and green underline dividers (`border-emerald-500/30`).
- **"Visit Sri Lanka Gov.lk"**: Button text turns pure black on hover (`hover:text-black hover:bg-white`).
- **Right-Aligned Social Media**: Facebook, YouTube, and LinkedIn icon buttons right-aligned in the bottom bar.
- **Website Views Counter**: Live updatable badge (`Website Views: 1,422`) linked to `WebsiteViewsCounter` model.
- **FAQ Navigation**: Clicking "Frequently Asked Questions" anywhere on the site navigates to `/contact#contact-faq` and triggers smooth anchor scrolling directly to the FAQ accordion section.

---

## 4. Environment Variables Checklist (`backend/.env`)

```env
DJANGO_SECRET_KEY=grn3vz&g#3)mx7067(ql-$)cnv0i^74pfjw2_4ereuh34cdxm#
DJANGO_DEBUG=True

# MySQL Database
DB_NAME=fisheries_ministry_db
DB_USER=root
DB_PASSWORD=abcd1234
DB_HOST=127.0.0.1
DB_PORT=3306

DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000
FRONTEND_URL=http://localhost:3000

# Email Delivery Configuration (Gmail SMTP)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=stayfinderuwu@gmail.com
EMAIL_HOST_PASSWORD=xytmbrwqshhgwjwl
CONTACT_RECEIVER_EMAIL=minfishit@gmail.com
```
