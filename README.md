# The Mbuya VaRaphy Talk Show — Web Application

> **"Health & Wellness Matters"**  
> A broadcast-grade, modern African luxury talk show platform hosted by **Melody Magengezha (Mbuya Va Raphy)**, dedicated to mental health, neurodiversity guidance, family counseling, culture, and diaspora conversations.

---

## 🌟 Overview & Key Features

- **Modern African Luxury Aesthetic**: Curated color palette featuring Warm Stone (`#FDFBF7`), Rich Charcoal (`#1F1D1D`), Terracotta (`#C85A32`), Muted Gold (`#D4AF37`), and Deep Forest Sage (`#2C3E35`).
- **Cinematic Broadcast Hero**: Showcasing the landmark Season 2 premiere — *"Parenting Neurodiversity: Lived Experience & Professional Insights (Session 1: Pre-Natal Stage)"*, featuring guest clinician **Rachael Masiboy**. Includes multi-timezone schedule (Melbourne, Zimbabwe, UK).
- **Interactive Episode Hub**:
  - Filterable by categories (*Mental Health & Wellness*, *Marriage & Family Dynamics*, *Culture, Faith & Heritage*, *Diaspora Lived Experience*, *Youth & Neurodiversity*).
  - Real-time search by keywords, topics, or guest names.
  - Interactive Episode Cards with thumbnail zoom, duration, guest chips, and **Watchlist** bookmarking persisted in `localStorage`.
- **Broadcast Media Player Modal**:
  - Embedded YouTube video stream player.
  - Toggle between **Video Broadcast** and **Audio Podcast Stream** modes.
  - Tabbed drawers for *Broadcast Synopsis*, *Key Clinical Takeaways (5 Action Points)*, and *Featured Experts*.
- **"Ask Mbuya Va Raphy" Confidential Advice Corner**:
  - Empathetic sanctuary form for viewers to submit questions for upcoming Q&A broadcast sessions.
  - Interactive anonymity toggle switch (*"Keep me completely anonymous"*).
  - Real-time validation and celebratory confirmation state with confetti.
- **Host Spotlight ("Meet Melody Magengezha")**:
  - Authentic high-resolution portrait in regal African attire.
  - Comprehensive clinical and advocacy biography with impact metrics (*50+ Broadcast Sessions*, *3+ Continents Reached*, *10,000+ Diaspora Families*).
- **Distinguished Guest Faculty Carousel**:
  - Featuring clinicians including Rachael Masiboy, Dr. Tinashe Gumbo, Amai Fungai Matarutse, Farai Sibanda, and Tsitsi Chifamba.
- **Corporate Sponsorship & Media Kit**:
  - Tiers (*Title Presenting Partner*, *Episode Segment Partner*, *Community & Institutional Ally*).
  - One-click interactive partnership inquiry modal submitting to the backend.
- **24/7 Crisis Helplines & Broadcast Footer**:
  - Immediate emergency contact numbers for Zimbabwe (*The Friendship Bench*), Australia (*Lifeline*), UK (*Samaritans / NHS*), USA & Canada (*988*), and South Africa (*SADAG*).
  - Newsletter signup (*The Mbuya Va Raphy Circle*) and streaming links (*YouTube*, *Facebook*, *Spotify*).

---

## 🛠️ Tech Stack

### Backend
- **Django 5.2 & Django REST Framework (DRF)**
- **django-cors-headers** (CORS configuration)
- **drf-spectacular** (OpenAPI 3.0 schema & Swagger UI)
- **SQLite / PostgreSQL** support
- Custom `seed_data` management command with 7 authentic broadcast episodes and guest specialists.

### Frontend
- **React 18 & Vite**
- **Tailwind CSS** (curated African luxury design system)
- **Lucide React** (modern iconography)
- **Sonner** (toast notifications)
- **Canvas-Confetti** (micro-interactions)
- **Axios** (API client with resilient local fallback)

---

## 🚀 Getting Started

### 1. Backend Setup & Run

```bash
cd backend

# Apply database migrations
python manage.py migrate

# Seed authentic broadcast episodes and guests
python manage.py seed_data

# Start the development server
python manage.py runserver 127.0.0.1:8000
```

- **Backend API Root**: `http://127.0.0.1:8000/api/`
- **Swagger Documentation**: `http://127.0.0.1:8000/api/docs/`
- **Redoc Documentation**: `http://127.0.0.1:8000/api/redoc/`
- **Django Admin Portal**: `http://127.0.0.1:8000/admin/`
  - *Username*: `admin`
  - *Password*: `adminpassword123`

### 2. Frontend Setup & Run

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

- **Frontend App**: `http://127.0.0.1:5173/`

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/episodes/` | List all episodes (supports `?category=`, `?is_featured=`, `?search=`) |
| `GET` | `/api/episodes/<slug>/` | Retrieve full episode details with guests and synopsis |
| `GET` | `/api/episodes/featured/` | Retrieve current headline featured episode |
| `GET` | `/api/guests/` | List guest clinicians and cultural speakers |
| `POST` | `/api/viewer-questions/` | Submit question to the Advice Corner (throttled & validated) |
| `POST` | `/api/newsletter/subscribe/` | Subscribe to broadcast newsletter |
| `POST` | `/api/booking-inquiries/` | Submit corporate sponsorship / media inquiry |
| `GET` | `/api/schema/` | Raw OpenAPI 3.0 YAML/JSON Schema |
| `GET` | `/api/docs/` | Interactive Swagger UI |
