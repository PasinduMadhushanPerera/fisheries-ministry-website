# 🇱🇰 ශ්‍රී ලංකා ධීවර, ජලජ හා සාගර සම්පත් අමාත්‍යාංශය
## නිල වෙබ් අඩවිය සහ අන්තර්ගත කළමනාකරණ පද්ධතිය (Web Portal & Staff CMS)
### ලංකා රාජ්‍ය ජාලය (LGN / LGC - Lanka Government Cloud) සත්කාරක සම්පත් අවශ්‍යතා ලේඛනය
**Hosting Resource Requirements & Server Specifications Document**

---

* **ලේඛන අංකය (Doc Ref)**: MOF/IT/LGN/HOST-2026/01
* **දිනය (Date)**: 2026 ඔක්තෝබර් 13
* **සකස් කළේ (Prepared by)**: තොරතුරු තාක්ෂණ ඒකකය (IT Unit), ධීවර, ජලජ හා සාගර සම්පත් අමාත්‍යාංශය
* **ඉදිරිපත් කරන්නේ (Submitted to)**: ලංකා රාජ්‍ය ජාලය (LGN) / ලංකා රාජ්‍ය ක්ලවුඩ් මෙහෙයුම් ඒකකය (LGC) / ICTA

---

## 1. විධායක සාරාංශය සහ පද්ධති හැඳින්වීම (Executive Summary & Overview)

ශ්‍රී ලංකා ධීවර, ජලජ හා සාගර සම්පත් අමාත්‍යාංශයේ (Ministry of Fisheries, Aquatic and Ocean Resources) නිල වෙබ් අඩවිය සහ අමාත්‍යාංශ කාර්ය මණ්ඩල අන්තර්ගත කළමනාකරණ පද්ධතිය (CMS) **Sri Lanka Digital Development Standards (SLDDS)** සහ e-Government මාර්ගෝපදේශයන්ට අනුකූලව නිර්මාණය කර ඇති නවීන, ත්‍රෛභාෂා (සිංහල, දෙමළ, ඉංග්‍රීසි) ඩිජිටල් වේදිකාවකි.

අමාත්‍යාංශයේ මහජන සේවාවන්, නිල නිවේදන, සංඛ්‍යාලේඛන වාර්තා, ටෙන්ඩර් සහ බඳවාගැනීම්, තොරතුරු දැනගැනීමේ අයිතිය (RTI), පුවත් සහ මාධ්‍ය ලේඛනාගාරය මහජනතාවට සහ අදාළ පාර්ශ්වයන්ට 24/7 බාධාවකින් තොරව, අධිවේගීව සහ ආරක්ෂිතව ලබා දීම සඳහා **Lanka Government Cloud (LGC / LGN)** යටිතල පහසුකම් මත සත්කාරකත්වය (Hosting) ලබා ගැනීම මෙම ලේඛනයේ මූලික අරමුණ වේ.

---

## 2. පද්ධති ගෘහ නිර්මාණ ශිල්පය (System Architecture & Technology Stack)

පද්ධතිය ස්ථර තුනකින් (3-Tier Decoupled Architecture) සමන්විත වන අතර, ඉහළ කාර්යක්ෂමතාවයකින් සහ ආරක්ෂාවකින් යුක්ත වේ:

```
                          [ අන්තර්ජාලය / මහජන පරිශීලකයින් ]
                                         │
                                         ▼ (HTTPS - Port 443)
                         [ LGN Perimeter WAF & DDoS Shield ]
                                         │
                                         ▼
        ┌─────────────────────────────────────────────────────────────────┐
        │                 Nginx Reverse Proxy & SSL Engine                │
        └────────────────┬───────────────────────────────┬────────────────┘
                         │                               │
        (Port 3000 / Local Socket)                       │ (Port 8000 / Local Socket)
                         ▼                               ▼
        ┌────────────────────────────────┐   ┌────────────────────────────┐
        │     Frontend Application       │   │    Backend REST API & CMS  │
        │   Next.js 15 (Node.js 20 LTS)  │   │  Python 3.11+ / Django 5.x │
        │   React 19 / SSR Engine        │   │  Django REST Framework     │
        └────────────────────────────────┘   └─────────────┬──────────────┘
                                                           │
                                                   (MySQL Connection)
                                                           ▼
                                             ┌────────────────────────────┐
                                             │   MySQL Database Server    │
                                             │    MySQL 8.0 (UTF8mb4)     │
                                             └────────────────────────────┘
```

### භාවිතා වන මෘදුකාංග තාක්ෂණයන් (Core Stack):
1. **Frontend**: Next.js 15 (App Router, Server-Side Rendering & Client Components), React 19, TypeScript, Tailwind CSS.
2. **Backend**: Python 3.11+, Django 5.x, Django REST Framework (DRF), Gunicorn WSGI Application Server.
3. **Database**: MySQL 8.0+ Enterprise / Community Server (`utf8mb4_unicode_ci` Trilingual Collation).
4. **Web Server & Reverse Proxy**: Nginx (HTTP/2, SSL Termination, Gzip/Brotli Compression, Micro-caching).
5. **Process Manager**: PM2 (Node.js process supervision) සහ Systemd (Gunicorn service supervision).

---

## 3. නිර්දේශිත සර්වර් සම්පත් අවශ්‍යතා (Recommended VM Specifications)

අමාත්‍යාංශයේ වෙබ් අඩවිය සඳහා LGN විසින් පහත දැක්වෙන **විකල්ප දෙකෙන් එකක්** තෝරා ලබා දිය හැක. රාජ්‍ය මට්ටමේ උපරිම ආරක්ෂාව සඳහා **විකල්ප 1 (Dual VM Architecture)** වඩාත් නිර්දේශ කෙරේ.

### 🌟 විකල්ප 1: නිර්දේශිත ද්විත්ව සර්වර් සැකසුම (Dual VM - App Server + DB Server)
*(Recommended for High Security, Isolation & SLDDS Compliance)*

| පරාමිතිය (Specification) | Web & Application Server (VM 1) | Database Server (VM 2) |
| :--- | :--- | :--- |
| **කාර්යභාරය (Role)** | Next.js 15 + Django 5 REST API + Nginx | MySQL 8.0 Database Server |
| **මෙහෙයුම් පද්ධතිය (OS)** | Ubuntu Server 24.04 LTS හෝ 22.04 LTS (64-bit) | Ubuntu Server 22.04 LTS හෝ Rocky Linux 9 (64-bit) |
| **ප්‍රොසෙසර ධාරිතාව (vCPU)** | **4 Cores** (අවම) / **8 Cores** (Peak Loads) | **4 Cores** |
| **මතක ධාරිතාව (RAM)** | **8 GB** (අවම) / **16 GB** (නිර්දේශිත) | **8 GB** (InnoDB Buffer Pool සඳහා) |
| **පද්ධති ගබඩාව (System Storage)** | **100 GB SSD / NVMe** | **100 GB SSD / NVMe** |
| **මාධ්‍ය ගබඩාව (Attached Media Storage)** | **150 GB - 200 GB SSD** (PDFs, Images, Reports) | - |
| **අභ්‍යන්තර ජාලය (Internal Network)** | Private VLAN (1 Gbps Virtual NIC) | Private VLAN (1 Gbps Virtual NIC) |

---

### 🔹 විකල්ප 2: තනි සර්වර් සැකසුම (Single All-in-One High-Performance VM)
*(Cost-effective / Simplified Management Single Node)*

සියලුම සේවාවන් (Web Server, Node.js, Python/Django, MySQL DB සහ Media Files) තනි Virtual Machine එකක් තුළ ක්‍රියාත්මක වන පරිදි සැකසීම:

| පරාමිතිය (Specification) | අවශ්‍ය ධාරිතාව (Required Capacity) |
| :--- | :--- |
| **මෙහෙයුම් පද්ධතිය (OS)** | Ubuntu Server 24.04 LTS හෝ 22.04 LTS (64-bit Minimal) |
| **ප්‍රොසෙසරය (vCPU)** | **8 vCPU Cores** |
| **මතකය (RAM)** | **16 GB RAM** |
| **ගබඩා ධාරිතාව (Storage)** | **250 GB - 300 GB High-Speed NVMe / SSD Storage** |
| **I/O කාර්යක්ෂමතාව (IOPS)** | 3,000+ IOPS (Database & Next.js builds සඳහා) |
| **ජාල අතුරුමුහුණත (NIC)** | 1 Gbps Virtual NIC |

---

## 4. ගබඩා ධාරිතා විස්තරය (Storage Breakdown & Growth Estimation)

අමාත්‍යාංශ වෙබ් අඩවිය තුළ විශාල ගැසට් පත්‍ර, වාර්ෂික සංඛ්‍යාලේඛන වාර්තා (Annual Bulletins), පුවත් ඡායාරූප ඇල්බම සහ ටෙන්ඩර් ලේඛන ගබඩා වන බැවින් වසර 3 ක වර්ධනය සැලකිල්ලට ගෙන පහත පරිදි ගබඩා ඉඩ වෙන් කිරීම අවශ්‍ය වේ:

1. **OS & System Runtime Packages**: ~20 GB
2. **Next.js Caching & Node Modules**: ~15 GB
3. **Python Environment & Dependencies**: ~5 GB
4. **MySQL Database Data Files & Logs**: ~30 GB (3-Year growth)
5. **Media Storage (Uploaded Documents, Images, Bulletins)**: ~150 GB - 200 GB
6. **Local Daily Backup / Log Buffer**: ~30 GB
* 👉 **මුළු ඇස්තමේන්තුගත ගබඩා ඉඩ (Total Recommended Storage)**: **250 GB - 300 GB SSD**

---

## 5. ජාලකරණ, ඩොමේන් සහ ෆයර්වෝල් අවශ්‍යතා (Networking, DNS & Firewall Rules)

### A. ඩොමේන් සහ IP ලිපින (Domain & IP Address):
* **මහජන ඩොමේනය (Public FQDN)**: `fisheries.gov.lk` සහ `www.fisheries.gov.lk`
* **Public IP**: 1 x Dedicated Public IPv4 Address (LGN මඟින් වෙන් කෙරෙන).
* **කලාප පළල (Bandwidth)**: 50 Mbps - 100 Mbps Burstable Internet Bandwidth.

### B. ෆයර්වෝල් ඇතුළත රීති (Inbound Ports - LGN Firewall Rules):

| Port | ප්‍රොටෝකෝලය | කාර්යය (Purpose) | ප්‍රවේශ සීමාව (Access Level) |
| :--- | :--- | :--- | :--- |
| **443** | TCP | HTTPS (Web Portal Traffic) | **Public (විවෘතයි)** |
| **80** | TCP | HTTP (Redirect to HTTPS) | **Public (විවෘතයි)** |
| **22** | TCP | SSH (System Administration) | **Restricted / Whitelisted Only** (අමාත්‍යාංශ IT ඒකකයේ IP ලිපින සහ LGN VPN සඳහා පමණි) |

### C. ෆයර්වෝල් පිටතට යන රීති (Outbound Ports):

| Port | ප්‍රොටෝකෝලය | කාර්යය (Purpose) |
| :--- | :--- | :--- |
| **587 / 465** | TCP | SMTP (Gmail TLS / LGN Mail Relay - Citizen Inquiries & System Notifications) |
| **80 / 443** | TCP | OS Security Updates, Node/Python Packages, Google Maps & Gov APIs |
| **123** | UDP | NTP (Network Time Protocol - නිවැරදි වේලාව ලබා ගැනීම) |

---

## 6. මෘදුකාංග පරිසරය සහ ස්ථාපනය (Software Prerequisites)

LGN Cloud VM එක තුළ පහත මෘදුකාංග පැකේජ ස්ථාපනය කර තිබිය යුතුය:

```bash
# 1. System Core
sudo apt update && sudo apt install -y curl wget git build-essential ufw fail2ban

# 2. Web Server & Proxy
sudo apt install -y nginx

# 3. Node.js Environment (Next.js Frontend)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# 4. Python Environment (Django Backend API)
sudo apt install -y python3.11 python3.11-venv python3.11-dev python3-pip libmysqlclient-dev

# 5. Database (Single VM එකක් නම්)
sudo apt install -y mysql-server
```

---

## 7. ආරක්ෂාව සහ අනුකූලතා පියවර (Security & Compliance)

1. **SSL / TLS සහතිකය**: LGN Government SSL Certificate හෝ Let's Encrypt Wildcard SSL සහතිකය යෙදවීම (TLS 1.2 සහ TLS 1.3 පමණක් Enable කිරීම).
2. **LGN WAF & DDoS Shield**: රජයේ සේවාදායකයන්ට එල්ල වන DDoS ප්‍රහාර, SQL Injection සහ XSS ප්‍රහාර ස්වයංක්‍රීයව අවහිර කිරීම.
3. **Fail2Ban ආරක්ෂාව**: SSH Port එකට සහ Django Admin login පිටුවට එල්ල වන Brute-force ප්‍රහාර අවහිර කිරීම.
4. **Nginx Security Headers**: HSTS, Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options නියමිත පරිදි සක්‍රීය කිරීම.
5. **Database User Security**: Root login අවහිර කර, සීමිත වරප්‍රසාද සහිත သီးခြား database user කෙනෙකු පමණක් API වෙත ලබා දීම.

---

## 8. උපස්ථ සහ ආපදා කළමනාකරණ සැලැස්ම (Backup & Disaster Recovery - BCP)

* **ස්වයංක්‍රීය Database Snapshots**: දිනපතා රාත්‍රී 12:00 ට සම්පූර්ණ MySQL Database Dump එකක් ලබා ගැනීම.
* **දත්ත රඳවා ගැනීමේ ප්‍රතිපත්තිය (Retention Policy)**:
  - දිනපතා උපස්ථ (Daily Backups): දින 7 ක්
  - සතිපතා උපස්ථ (Weekly Backups): සති 4 ක්
  - මාසික උපස්ථ (Monthly Backups): මාස 12 ක්
* **මාධ්‍ය ගබඩා උපස්ථය (Media Storage Backup)**: සතිපතා අමාත්‍යාංශයේ Secure Cloud Storage එකට rsync හරහා පිටපත් කිරීම.
* **RTO (Recovery Time Objective)**: පැය 2 ක් ඇතුළත පද්ධතිය යථා තත්ත්වයට පත් කිරීම.
* **RPO (Recovery Point Objective)**: පැය 24 ක උපරිම දත්ත අහිමිවීමේ සීමාව (පෙර දින රාත්‍රී උපස්ථය දක්වා).

---

## 9. අමාත්‍යාංශයේ තාක්ෂණික සම්බන්ධීකරණ තොරතුරු (Ministry Technical Contact)

* **ආයතනය**: ධීවර, ජලජ හා සාගර සම්පත් අමාත්‍යාංශය (Ministry of Fisheries, Aquatic and Ocean Resources)
* **ලිපිනය**: නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව.
* **ව්‍යාපෘති ඒකකය**: තොරතුරු තාක්ෂණ අංශය (IT Unit)
* **විද්‍යුත් තැපෑල (Email)**: `minfishit@gmail.com` / `info@fisheries.gov.lk`
* **දුරකථන (Telephone)**: `+94 112 327 060` / `+94 112 446 183`
* **නිල වෙබ් අඩවිය**: `http://www.fisheries.gov.lk`

---
*මෙම ලේඛනය ශ්‍රී ලංකා ධීවර, ජලජ හා සාගර සම්පත් අමාත්‍යාංශයේ තොරතුරු තාක්ෂණ ඒකකය මඟින් ලංකා රාජ්‍ය ජාලය (LGN / LGC) වෙත ඉදිරිපත් කිරීම පිණිස සම්පාදනය කරන ලදී.*
