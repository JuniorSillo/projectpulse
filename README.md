# 🚀 ProjectPulse — AI-Powered Project Management Platform

> **"Engineering the Future, One Byte at a Time."**

ProjectPulse is a full-stack, production-ready SaaS platform designed to help teams, developers, managers, and clients **track projects, tasks, milestones, and performance in real time**.

Built with modern technologies and scalable architecture, this system demonstrates enterprise-level software engineering skills.

---

## 🌟 Overview

ProjectPulse provides:
- 📊 Role-based dashboards (Admin, Manager, Developer, Client)
- 📁 Project and task management
- 📈 Real-time insights & analytics
- 🔐 Secure authentication with JWT
- 🧠 AI-style insights engine (backend-driven)
- 🌗 Dark & Light mode support

---

## 🏗️ Tech Stack

### 🟦 Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- Context API (Auth)

### 🟥 Backend
- ASP.NET Core 8 Web API
- Entity Framework Core
- PostgreSQL
- JWT Authentication + Refresh Tokens

### 🐳 DevOps
- Docker (PostgreSQL)
- GitHub (Version Control)

---

## 📂 Project Structure

```bash
projectpulse/
│
├── frontend/              # Next.js Application
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── context/
│
├── backend/
│   ├── src/
│   │   └── ProjectPulse.Api/
│   │       ├── Controllers/
│   │       ├── Services/
│   │       ├── Models/
│   │       ├── Data/
│   │       └── Contracts/
│   └── docker-compose.yml
│
├── .gitignore
└── README.md
````

---

## 🔐 Features

### 👤 Authentication & Authorization

* JWT-based authentication
* Role-based access control:

  * Admin
  * Manager
  * Developer
  * Client

---

### 📊 Dashboards

Each role has a unique dashboard:

* **Admin** → system overview, risk, users
* **Manager** → project tracking & workload
* **Developer** → tasks, deadlines, blockers
* **Client** → project progress & milestones

---

### 📁 Core Modules

* Projects (CRUD)
* Tasks (CRUD)
* Milestones (tracking & risk)
* Files (attachments system)
* Comments (activity feed)

---

### 🧠 Insights Engine

Backend service that detects:

* High-risk projects
* Blocked tasks
* Upcoming milestones

---

## ⚙️ Getting Started

---

### 🟢 1. Clone the Repository

```bash
git clone https://github.com/JuniorSillo/projectpulse.git
cd projectpulse
```

---

## 🟥 Backend Setup (ASP.NET Core)

### 1. Navigate to backend

```bash
cd backend
```

### 2. Start PostgreSQL (Docker)

```bash
docker compose up -d
```

### 3. Run API

```bash
dotnet restore src/ProjectPulse.Api/ProjectPulse.Api.csproj
dotnet run --project src/ProjectPulse.Api/ProjectPulse.Api.csproj
```

### 4. Swagger

```bash
http://localhost:xxxx/swagger
```

---

## 🟦 Frontend Setup (Next.js)

### 1. Navigate to frontend

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run app

```bash
npm run dev
```

### 4. Open

```bash
http://localhost:3000
```

---

## 🔑 Demo Accounts

```txt
admin@projectpulse.io      / Password123!
manager@projectpulse.io    / Password123!
developer@projectpulse.io  / Password123!
client@projectpulse.io     / Password123!
```

---

## 🌐 API Endpoints

### Auth

* `POST /api/auth/login`
* `POST /api/auth/refresh`

### Dashboard

* `GET /api/dashboard/admin`
* `GET /api/dashboard/manager`
* `GET /api/dashboard/developer`
* `GET /api/dashboard/client`

### Projects / Tasks / Milestones

* Full CRUD support

---

## 🚀 Deployment

Recommended free hosting:

* Backend → Render
* Database → Neon (PostgreSQL)
* Frontend → Vercel

---

## 🧠 Key Engineering Highlights

* Clean Architecture (Controllers → Services → Data)
* DTO-based API design
* Role-based authorization
* Scalable EF Core configuration
* Real-world domain modeling
* Production-ready structure

---

## ⚠️ Important Notes

* `.env` files are not committed
* Use environment variables for:

  * JWT secrets
  * Database connections

---

## 📈 Future Improvements

* Real-time updates (SignalR)
* File uploads (Cloud storage)
* Notifications system
* AI-powered predictions
* CI/CD pipelines

---

## 👨‍💻 Author

**Max (Binary Wizard)**
Software Developer | Future Tech Entrepreneur

> Building systems that scale.
> Creating software that matters.

---

## ⭐ Final Note

This project was built MOEKETSI JUNIOR SILLO during leanership @Bitcube, to demonstrate **real-world, production-level full-stack development skills**.


