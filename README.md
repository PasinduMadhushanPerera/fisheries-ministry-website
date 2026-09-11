# 🇱🇰 Ministry of Fisheries Website & Content Management System

Official Web Portal and Content Management System (CMS) for the **Ministry of Fisheries, Aquatic and Ocean Resources of Sri Lanka**.

This project is a modern, accessible, trilingual public web platform and staff CMS built in compliance with the **Sri Lanka Digital Development Standards (SLDDS)**.

---

## 📐 System Architecture & Technology Stack

```
        ┌─────────────────────────────────────────────────────────┐
        │                    Frontend (Next.js)                   │
        │   Port: 3000 | Next.js 15 | React 19 | Tailwind CSS     │
        └──────────────────────────┬──────────────────────────────┘
                                   │ Trilingual REST API (?lang=en|si|ta)
                                   ▼
        ┌─────────────────────────────────────────────────────────┐
        │               Backend (Django REST Framework)           │
        │      Port: 8000 | Django 5.x | Custom Django Admin      │
        └──────────────────────────┬──────────────────────────────┘
                                   │ ORM Queries
                                   ▼
        ┌─────────────────────────────────────────────────────────┐
        │              Database & Media Infrastructure            │
        │          MySQL (fisheries_ministry_db) | Media Storage  │
        └──────────────────────────┬──────────────────────────────┘
```

### 1. Frontend (`/frontend`)
- **Framework**: Next.js 15 (App Router, Server Components & Client Components, React 19)
- **Language**: TypeScript
- **Styling & UI**: Tailwind CSS, Lucide React Icons, Radix UI primitives
- **State & Localization**: Custom `LanguageContext` supporting English (`en`), Sinhala (`si`), and Tamil (`ta`).
- **Port**: `http://localhost:3000`

### 2. Backend (`/backend`)
- **Framework**: Python 3, Django 5.x, Django REST Framework (DRF)
- **CMS Panel**: Tailored Django Admin Dashboard with custom app ordering, custom widgets, and security controls.
- **Database**: MySQL (`fisheries_ministry_db`)
- **Email System**: Django Email Engine via Gmail SMTP with dynamic citizen `Reply-To` routing.
- **Port**: `http://127.0.0.1:8000` (CMS Admin: `http://127.0.0.1:8000/admin/`)

---

## 📁 Repository Structure

```text
fisheries-ministry-website/
├── frontend/                     # Next.js 15 Web Application
│   ├── app/                      # App Router pages & API routes
│   │   ├── about/                # About Ministry & Division pages
│   │   ├── contact/              # Department directory & citizen form
│   │   ├── downloads/            # Publications & downloadable files
│   │   ├── media-centre/         # News, Press Releases, Notices & Events
│   │   ├── rti/                  # Right to Information (RTI) portal
│   │   └── statistics/           # Fisheries statistics & market reports
│   ├── components/               # Reusable UI components & page views
│   ├── context/                  # Trilingual LanguageContext provider
│   ├── data/                     # Local fallback datasets
│   ├── lib/                      # REST API client helpers & utilities
│   └── public/                   # Static assets, branding logos & media
├── backend/                      # Python Django REST API & Staff CMS
│   ├── config/                   # Django settings, root URLs & WSGI/ASGI
│   ├── header_footer/            # Global site header, footer & live view counter
│   ├── home_page/                # Hero slides, banners & home announcements
│   ├── contact_page/             # Directory, dynamic JSON tables & citizen inquiries
│   ├── news/                     # News articles, modular story blocks & photo gallery
│   ├── annual_statistics/        # Annual statistical bulletins & featured reports
│   ├── monthly_fish_production/  # Monthly production reports & featured banners
│   ├── weekly_fish_prices/       # Weekly market price indices
│   ├── export_import_statistics/ # Export/import economics & marine trade data
│   ├── rti_page/                 # RTI officers, regulations & application forms
│   ├── downloads_page/           # Categorized downloads & preview modals
│   ├── seed_*.py                 # Automated DB seeding & bootstrapping scripts
│   └── media/                    # Uploaded images, documents & press files
├── docs/                         # Project documentation
├── AGY_README.md                 # Technical architecture reference guide
└── README.md                     # Project overview & operational manual
```

---

## ✨ Key System Features & Highlights

### 🌐 Trilingual Localization Engine (`resolve_lang`)
- DRF serializers resolve localized fields automatically based on query parameters (`?lang=en`, `?lang=si`, `?lang=ta`).
- Graceful Fallback: If a field translation (e.g., `title_si`) is empty, the system automatically falls back to English (`title_en`).

### 🖼️ Dynamic News Story Builder & Multi-Photo Gallery
- News articles support modular story blocks (Paragraphs, Headings, Video embeds, Data tables, Quotes, and Image grids).
- Custom `MultiPhotoUploadWidget` in Django Admin for adding, previewing, captioning, and deleting multiple photos.
- Responsive frontend image renderer with uniform frame heights, pixel-perfect alignment, and 100% uncropped (`object-contain`) photo displays.

### 📊 Featured Statistical Reports
- **Annual Statistics & Monthly Fish Production**: Admins can mark key reports as **Featured**.
- Dedicated Featured Banners dynamically highlight latest bulletins at the top of the library with direct download options.

### 🏢 Dynamic Department Directory & Custom Tables
- Department categories support dynamic JSON table columns (`custom_table_columns`).
- Officer rows store extra custom fields in JSON (`extra_data`), rendered cleanly on the frontend.

### ✉️ Citizen Inquiries & SMTP Email Workflow
- Citizen inquiries submitted via `/contact` are saved as read-only audit records in Django DB.
- Dispatches SMTP notifications to Ministry administrators (`minfishit@gmail.com`) with dynamic citizen `Reply-To` headers.

### 👁️ Live Website Views Counter
- Real-time `WebsiteViewsCounter` atomically tracks unique session visits and displays a live badge in the site footer.

---

## 🚀 Getting Started & Local Installation

### Prerequisites
- **Node.js** (v18.x or later) & **npm**
- **Python** (v3.10 or later)
- **MySQL Database Server**

---

### 1. Backend Setup (Django API & CMS)

```bash
# Navigate to backend directory
cd backend

# Create & activate Python virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Install required dependencies
pip install -r requirements.txt

# Configure environment variables in backend/.env
# DB_NAME=fisheries_ministry_db
# DB_USER=root
# DB_PASSWORD=your_password

# Run database migrations
python manage.py migrate

# Seed database with initial trilingual content & statistics
python seed_data.py
python seed_news_data.py
python seed_annual_statistics_data.py
python seed_monthly_fish_production_data.py

# Start Django development server
python manage.py runserver 127.0.0.1:8000
```

- **Django Admin Panel**: `http://127.0.0.1:8000/admin/`
- **API Base URL**: `http://127.0.0.1:8000/api/v1/`

---

### 2. Frontend Setup (Next.js Public Portal)

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Next.js development server
npm run dev
```

- **Public Website Portal**: `http://localhost:3000`

---

## 🛡️ License & Project Governance

Developed for the **Ministry of Fisheries, Aquatic and Ocean Resources of Sri Lanka**.  
All official content, gazettes, statistics, and media assets published on this platform must be verified and authorized by the Ministry before publication.