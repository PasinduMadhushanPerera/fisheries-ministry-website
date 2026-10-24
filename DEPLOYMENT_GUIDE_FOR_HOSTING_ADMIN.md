# 🇱🇰 Ministry of Fisheries, Sri Lanka — Production Deployment & Hosting Guide
## නිල වෙබ් අඩවිය සහ අන්තර්ගත කළමනාකරණ පද්ධතිය (Web Portal & Staff CMS)
**Target Domain**: `https://www.fisheries.gov.lk/` and `https://fisheries.gov.lk/`  
**Hosting Environment**: LGN (Lanka Government Cloud) / Ubuntu Linux (22.04 LTS or 24.04 LTS)

---

## 📂 1. ව්‍යාපෘතියේ ගොනු ව්‍යුහය (Project Directory Overview)

මෙම ව්‍යාපෘති Folder එක තුළ පහත ප්‍රධාන කොටස් අන්තර්ගත වේ:
* `frontend/` — Next.js 15 (React 19, TypeScript, Tailwind CSS) මහජන වෙබ් අඩවිය.
* `backend/` — Python 3.11+ / Django 5.x REST API සහ අමාත්‍යාංශ CMS Admin Panel එක.
* `backend/media/` — වෙබ් අඩවියට upload කර ඇති සියලුම ඡායාරූප, නිල ලේඛන, ගැසට් සහ වාර්තා (Media Storage).
* `backend/staticfiles/` — WhiteNoise සහ Nginx හරහා serve වීමට පෙර-සම්පාදනය කරන ලද Admin Panel CSS/JS ගොනු.
* `database/fisheries_ministry_db_dump.sql` — සම්පූර්ණ MySQL 8.0 දත්ත ගබඩාව (Full Database Dump).

---

## ⚙️ 2. සර්වර් මූලික අවශ්‍යතා ස්ථාපනය (Server Prerequisites Installation)

Ubuntu Server එක තුළ පහත commands ක්‍රියාත්මක කරන්න:

```bash
# 1. Update System
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential nginx certbot python3-certbot-nginx fail2ban libmysqlclient-dev pkg-config

# 2. Install Node.js 20 LTS & PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# 3. Install Python 3.11 & Virtual Environment
sudo apt install -y python3 python3-pip python3-venv python3-dev

# 4. Install MySQL Server 8.0 (Single Server setup එකක් නම් පමණි)
sudo apt install -y mysql-server
```

---

## 🗄️ 3. දත්ත ගබඩාව පිහිටුවීම (Database Setup)

```bash
# MySQL වෙත Root ලෙස පිවිසෙන්න
sudo mysql -u root -p

# MySQL තුළ පහත විධාන ක්‍රියාත්මක කරන්න:
CREATE DATABASE fisheries_ministry_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'fisheries_app_user'@'localhost' IDENTIFIED BY 'StrongPassword123#';
GRANT ALL PRIVILEGES ON fisheries_ministry_db.* TO 'fisheries_app_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# සූදානම් කර ඇති Database Dump එක Import කරන්න:
mysql -u fisheries_app_user -pStrongPassword123# fisheries_ministry_db < /path/to/project/database/fisheries_ministry_db_dump.sql
```

---

## 🐍 4. Backend (Django API & CMS) පිහිටුවීම

```bash
cd /var/www/fisheries-ministry-website/backend

# 1. Python Virtual Environment එක සාදන්න
python3 -m venv venv
source venv/bin/activate

# 2. අවශ්‍ය Packages ස්ථාපනය කරන්න
pip install --upgrade pip
pip install -r requirements.txt

# 3. Production Environment File එක සකසන්න
cp .env.production.example .env
nano .env
```

`.env` ගොනුව තුළ පහත තොරතුරු තහවුරු කරන්න:
```env
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=A_SECURE_50_CHAR_RANDOM_KEY_HERE
DJANGO_ALLOWED_HOSTS=www.fisheries.gov.lk,fisheries.gov.lk,127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=https://www.fisheries.gov.lk,https://fisheries.gov.lk
CSRF_TRUSTED_ORIGINS=https://www.fisheries.gov.lk,https://fisheries.gov.lk
FRONTEND_URL=https://www.fisheries.gov.lk

DB_NAME=fisheries_ministry_db
DB_USER=fisheries_app_user
DB_PASSWORD=StrongPassword123#
DB_HOST=127.0.0.1
DB_PORT=3306

EMAIL_HOST_USER=info@fisheries.gov.lk
EMAIL_HOST_PASSWORD=YOUR_SMTP_PASSWORD
CONTACT_RECEIVER_EMAIL=info@fisheries.gov.lk
```

```bash
# 4. Static Files Collect කිරීම (WhiteNoise)
python manage.py collectstatic --noinput

# 5. Database Migrations තහවුරු කිරීම
python manage.py migrate
```

### Systemd Service එකක් ලෙස Gunicorn ධාවනය කිරීම:
ගොනුව සාදන්න: `/etc/systemd/system/fisheries-backend.service`
```ini
[Unit]
Description=Gunicorn daemon for Ministry of Fisheries Django Backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/fisheries-ministry-website/backend
ExecStart=/var/www/fisheries-ministry-website/backend/venv/bin/gunicorn \
          --workers 3 \
          --bind 127.0.0.1:8000 \
          --timeout 60 \
          config.wsgi:application

Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Service එක සක්‍රීය කර ආරම්භ කරන්න:
```bash
# Permissions ලබා දෙන්න (Nginx සහ Gunicorn හට Media Files කියවීමට සහ ලිවීමට)
sudo chown -R www-data:www-data /var/www/fisheries-ministry-website/backend
sudo chmod -R 755 /var/www/fisheries-ministry-website/backend/media

sudo systemctl daemon-reload
sudo systemctl enable fisheries-backend
sudo systemctl start fisheries-backend
sudo systemctl status fisheries-backend
```

---

## ⚛️ 5. Frontend (Next.js 15) පිහිටුවීම

```bash
cd /var/www/fisheries-ministry-website/frontend

# 1. Dependencies Install කිරීම
npm install

# 2. Production Environment File එක තහවුරු කිරීම
# .env.production ගොනුව දැනටමත් https://www.fisheries.gov.lk ලෙස සකසා ඇත.
# SSR (Server-Side Rendering) සඳහා දේශීයව API එක සම්බන්ධ වීමට අවශ්‍ය නම් .env.production තුළ:
# NEXT_PUBLIC_SITE_URL=https://www.fisheries.gov.lk
# NEXT_PUBLIC_API_URL=https://www.fisheries.gov.lk/api/v1

# 3. Production Build සකස් කිරීම
npm run build

# 4. PM2 හරහා Background Daemon එකක් ලෙස Run කිරීම
pm2 start npm --name "fisheries-frontend" -- start -- -p 3000
pm2 save
pm2 startup
```

---

## 🖼️ 6. මාධ්‍ය ගොනු (Media Files: Images, PDFs, Documents) නිවැරදිව ක්‍රියාත්මක වන ආකාරය

වෙබ් අඩවියේ ඡායාරූප, පී.ඩී.එෆ් ගැසට් සහ නිල ලේඛන Server එක තුළ ක්‍රියාත්මක වන්නේ මෙසේය:
1. **ගබඩා වන ස්ථානය**: සියලුම Upload කරන ලද ගොනු `backend/media/` folder එක තුළ සුරක්ෂිතව ගබඩා වේ.
2. **Database එකේ තැන්පත් වන ආකාරය**: Database එක තුළ කිසිදු `localhost` හෝ `192.168...` වැනි ලිපින ගබඩා නොවේ. එහි ඇත්තේ සාපේක්ෂ මාර්ග පමණි (උදා: `news/2026/08/sample.jpg`).
3. **Nginx High-Speed Direct Serving**: Nginx configuration එකේ `location /media/` කොටස මඟින් කිසිදු Python / Node.js ප්‍රමාදයකින් තොරව සෘජුවම Disk එකෙන් Microsecond ගණනකින් visitor ට ගොනු ලබා දෙයි (`30d Cache-Control` සහිතව).
4. **Failsafe Fallback**: කිසියම් හේතුවකින් Nginx මඟහැරී ගියද Django Backend එක තුළ `re_path(r"^media/...")` මඟින් fallback එකක් ලෙසද ගොනු serve කරයි.
5. **Permissions**: Nginx හට ගොනු කියවීමට හැකි බව තහවුරු කරගැනීමට `sudo chown -R www-data:www-data /var/www/fisheries-ministry-website/backend/media` ක්‍රියාත්මක කර තිබිය යුතුය.

---

## 🌐 7. Nginx Reverse Proxy සහ SSL Configuration

Nginx configuration ගොනුව සාදන්න: `/etc/nginx/sites-available/fisheries.gov.lk`

```nginx
# 1. HTTP to HTTPS Redirection
server {
    listen 80;
    listen [::]:80;
    server_name fisheries.gov.lk www.fisheries.gov.lk;
    return 301 https://www.fisheries.gov.lk$request_uri;
}

# 2. Non-www to www Redirection
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name fisheries.gov.lk;

    ssl_certificate /etc/letsencrypt/live/fisheries.gov.lk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fisheries.gov.lk/privkey.pem;

    return 301 https://www.fisheries.gov.lk$request_uri;
}

# 3. Main HTTPS Production Server Block
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.fisheries.gov.lk;

    ssl_certificate /etc/letsencrypt/live/fisheries.gov.lk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fisheries.gov.lk/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Allow large PDF gazette, tender and document uploads (Up to 50MB)
    client_max_body_size 50M;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # A. Media Files (Uploaded Documents, Images, Reports)
    location /media/ {
        alias /var/www/fisheries-ministry-website/backend/media/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # B. Static Files (Admin Panel CSS/JS)
    location /static/ {
        alias /var/www/fisheries-ministry-website/backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # C. Backend REST APIs & Admin Panel
    location ~ ^/(api|admin)/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # D. Next.js Frontend Web Portal (All Public Pages)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Nginx සක්‍රීය කර Reload කරන්න:
```bash
sudo ln -s /etc/nginx/sites-available/fisheries.gov.lk /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

SSL සහතිකය (Certbot හරහා නම්):
```bash
sudo certbot --nginx -d fisheries.gov.lk -d www.fisheries.gov.lk
```

---

## 🔒 8. සජීවීව දැමූ පසු තහවුරු කළ යුතු පරීක්ෂණ (Post-Deployment Verification)

1. **Backend Health Check**:
   ```bash
   curl -s http://127.0.0.1:8000/api/v1/health/
   # ප්‍රතිචාරය: {"status": "healthy", "database": true}
   ```
2. **වෙබ් අඩවිය පරීක්ෂා කිරීම**: `https://www.fisheries.gov.lk/` වෙත පිවිස:
   * මුල් පිටුවේ Hero Slider, පුවත්, නිවේදන සහ සංඛ්‍යාලේඛන නිවැරදිව load වේදැයි බලන්න.
   * භාෂා තුන (සිංහල, தமிழ், English) මාරු කර බැලීම.
   * `https://www.fisheries.gov.lk/rti` පිටුවට ගොස් Filters සහ Documents බාගත කිරීම පරීක්ෂා කිරීම.
3. **Admin Panel පරීක්ෂා කිරීම**: `https://www.fisheries.gov.lk/admin/` වෙත පිවිස CMS login පිටුවට `admin` හෝ `officer1` ලෙස Login විය හැකි බව තහවුරු කරගැනීම.
4. **මුරපද වෙනස් කිරීම**: `officer1` සහ `officer2` ගිණුම් සඳහා ලබා දී ඇති තාවකාලික මුරපද පළමු පිවිසුමෙන්ම ඔවුන් ලවා වෙනස් කරවා ගැනීම.
5. **පැරණි WordPress Site එක Backup කර තිබීම**: පැරණි site එකේ ගොනු සහ database එක සුරක්ෂිතව download කර තබා ගැනීම.
