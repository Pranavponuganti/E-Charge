# ⚡ E-CHARGE — Smart EV Charging Slot Booking Platform

An intelligent, range-aware full-stack web application designed for Electric Vehicle (EV) drivers to discover reachable charging stations based on their vehicle's live remaining range, match charger connector types, and reserve charging bay slots in advance.

![E-CHARGE UI](frontend/public/logo.png)

---

## 🌟 Highlights & Features

### 1. 🔐 Authentication & Smart Onboarding
- **Login View**: Email & Password login with direct hyperlink for new users (*"Don't have an account? Sign Up here"*).
- **Signup View**: Collects Driver Name, Email, Phone, Password, and Password Confirmation (with instant match validation).
- **EV Specs Registration**: Select car make (**Tata, Mahindra, MG, Hyundai, BYD, Kia, Citroën, BMW, Tesla**, or Custom), specific model, battery capacity (kWh), and connector type (**CCS2, Type 2, CHAdeMO, GB/T, Tesla / NACS**).
- Hyperlink under signup (*"Already have an account? Log In here"*).

### 2. 🎯 Dynamic Range-Aware Station Radar
- **Remaining Vehicle Range Input**: Asks the driver to enter remaining vehicle range (km) with a slider + numeric input + quick presets (25 km, 50 km, 75 km, 120 km, 180 km, 250 km).
- **Interactive Radar Map**: Visualizes current vehicle GPS location, real-time glowing range radius circle, and color-coded reachable station markers.
- **Prominent Booking Action**: CTA button placed directly beneath the map for instant slot reservation.

### 3. ⚡ Charging Hub Discovery & Bay Reservation
- **Points Available Counter**: Real-time display of open charging bays (e.g. `6 / 10 Points Available`).
- **Network Providers**: Pre-seeded with Indian EV networks (Tata Power EZ Charge, Jio-bp pulse, Statiq, Zeon Charging, ChargeZone, Kazam EV, Shell Recharge).
- **2-Step Booking Drawer**:
  - Step 1: Select Date, Time Slot, and Speed Plan (Eco 22kW, Fast DC 60kW, SuperFast 150kW, HyperCharge 240kW).
  - Step 2: Set target battery percentage (e.g., 80%), calculate energy needed (kWh), charge time (mins), and transparent tariff in INR (**₹**).
- **Digital Boarding Pass**: Live countdown timer, Bay allocation (`Bay #X`), reference code (`BK-XXXXXX`), and QR Code.
- **My Bookings Manager**: View, track, and cancel active reservations.

### 4. 📞 Contact Us & Support
- Dedicated Contact Us modal and footer banner with direct contact details:
  - **Name**: Pranav
  - **Contact Number**: `+91 9392843511`
  - **Email**: `pranavponuganti0504@gmail.com`

---

## 🏗️ Project Architecture & Tech Stack

```
E-Charge/
├── backend/                  # Spring Boot 3.3.5 Backend (Java 21)
│   ├── src/main/java/com/echarge/backend/
│   │   ├── config/           # CORS & Data Seeding Initializer
│   │   ├── controller/       # REST Endpoints (/api/auth, /api/stations, /api/bookings)
│   │   ├── dto/              # Request / Response Transfer Objects
│   │   ├── model/            # JPA Entities (User, Station, Point, Booking)
│   │   ├── repository/       # Spring Data JPA Repositories
│   │   └── service/          # Range & Booking Business Logic
│   └── pom.xml
│
├── frontend/                 # React 18 + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/       # UI Components (Navbar, Map, StationList, Modals, Footer)
│   │   ├── context/          # Auth & Vehicle Context
│   │   ├── services/         # REST API Client (Axios / Fetch)
│   │   └── data/             # Mock & Preset Specifications
│   ├── public/               # Brand Assets & Logo
│   ├── tailwind.config.js    # Amber & Orange Color System
│   └── package.json
│
├── .gitignore
└── README.md
```

---


- Web Application: `http://localhost:5173`

---

## 👤 Author & Support
- **Name**: Pranav
- **Phone**: +91 9392843511
- **Email**: pranavponuganti0504@gmail.com
- **Repository**: [https://github.com/Pranavponuganti/E-Charge](https://github.com/Pranavponuganti/E-Charge)
