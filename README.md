# 🚆 RAIL LINK — Railway Reservation & Passenger Assistance System

**RAIL LINK** is a web-based railway reservation demo designed to simplify the train booking experience through an intuitive interface. It provides train search, seat selection, passenger details, simulated payment, booking management, and passenger assistance features.

The project demonstrates how a modern web application can combine a React frontend, a Node.js backend, and an SQLite database.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Limitations](#-limitations)
- [Future Enhancements](#-future-enhancements)
- [Disclaimer](#-disclaimer)

---

## 🎯 Overview

RAIL LINK is a college demonstration project that showcases a railway reservation workflow.

Users can explore available trains, select seats, enter passenger information, complete a simulated payment process, and view booking information.

The application also includes passenger assistance and profile sections.

**Project goal:** To demonstrate frontend development, backend API integration, database operations, and the deployment workflow of a full-stack web application.

---

## ✨ Features

- 🔍 **Train Search** — Search for trains using journey details.
- 💺 **Seat Selection** — Select available seats through an interactive interface.
- 👤 **Passenger Details** — Enter passenger information during booking.
- 💳 **Simulated Payment** — Demonstrate the payment stage without processing real transactions.
- 🎫 **Booking Confirmation** — Display booking details and a PNR-style reference.
- 📋 **My Bookings** — Access booking information.
- ❌ **Booking Cancellation** — Demonstrate cancellation functionality where supported.
- 🆘 **Passenger Assistance** — Access passenger assistance options.
- 👤 **User Profile** — View the profile section.
- 🗄️ **Database Integration** — Store and retrieve booking information through the backend.

*Note: Feature availability depends on the current implementation and backend configuration.*

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Frontend development and build tooling |
| JavaScript | Application logic |
| Node.js | Backend runtime |
| Express.js | REST API |
| SQLite | Database |
| better-sqlite3 | SQLite database integration |
| CORS | Cross-origin request handling |
| GitHub | Source code management |
| Vercel | Planned frontend deployment |

---

## 📁 Project Structure

```text
rail-link-demo/
├── public/
├── src/
│   ├── App.jsx
│   └── ...
├── server/
│   └── index.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

*The exact files and folders may differ depending on your project configuration.*

---

## 🚀 Getting Started

### Prerequisites

Install the following software:

- Node.js and npm
- Git, if using Git commands
- A modern web browser

### 1. Clone the Repository

Replace `YOUR_USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR_USERNAME/rail-link.git
```

### 2. Open the Project Folder

```bash
cd rail-link
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Install Backend Dependencies

```bash
npm install express better-sqlite3 cors
```

---

## ▶️ Running the Application

### Start the Backend

Open a terminal in the project root directory and run:

```bash
node server/index.js
```

The backend should start at:

```text
http://localhost:3000
```

### Start the Frontend

Open a second terminal in the same project directory and run:

```bash
npm run dev
```

Open the local address displayed in your terminal, typically:

```text
http://localhost:5173
```

Vite may use another port if the default port is occupied.

### Check Backend Health

Open the following endpoint in your browser:

```text
http://localhost:3000/api/health
```

A successful response should indicate that the backend is running.

---

## 🔌 API Endpoints

The backend provides the following endpoints in the current implementation.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend status |
| GET | `/api/bookings` | Retrieve saved bookings |
| POST | `/api/bookings` | Create a booking |
| PATCH | `/api/bookings/:pnr/cancel` | Cancel a booking |

These endpoints require the backend to be running. The booking endpoints accept and return JSON data.

---

## ☁️ Deployment

The planned deployment workflow is:

1. Upload the project source code to GitHub.
2. Import the repository into Vercel.
3. Configure the frontend build settings.
4. Deploy the frontend and obtain a public URL.
5. Deploy the Node.js backend to a compatible hosting service.
6. Configure the frontend to use the deployed backend API.
7. Configure persistent database storage.
8. Test the complete booking workflow online.

**Important:** Deploying the frontend alone does not deploy the Express backend. Online booking functionality requires a reachable backend and correctly configured database storage.

---

## ⚠️ Limitations

- This is a demonstration project, not an official railway booking service.
- Train information and availability may be sample or simulated data.
- Payments are simulated; no real payment is processed.
- Booking persistence depends on the backend and database configuration.
- Authentication, production security, and official railway integrations may not be implemented.

---

## 🔮 Future Enhancements

- User registration and secure authentication.
- Live train schedules and availability through an authorized API.
- Integration with a legitimate payment gateway.
- Improved booking history and cancellation workflows.
- Email or SMS booking notifications.
- Responsive design improvements.
- Automated testing and enhanced error handling.
- Production-ready database hosting and security.

---

## ⚖️ Disclaimer

RAIL LINK is an educational project developed for learning and demonstration purposes. It is not affiliated with Indian Railways or IRCTC and must not be used for
