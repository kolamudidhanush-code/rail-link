# 🚆 RAIL LINK
### Railway Reservation & Passenger Assistance System

A full-stack web application demo designed to simplify the railway reservation experience through train search, seat selection, passenger information, simulated payments, and booking management.

**Built with React, Vite, Node.js, Express.js, and SQLite.**

---

## 📌 About the Project

**RAIL LINK** is an educational web development project that demonstrates the core workflow of a railway reservation system.

The application provides a user-friendly interface for exploring train journeys, selecting seats, entering passenger details, completing a simulated payment process, and viewing booking information.

The project demonstrates frontend development, backend API integration, database operations, and the foundations of full-stack application deployment.

> **Project Type:** Full-Stack Web Development  
> **Purpose:** College Project and Educational Demonstration  
> **Status:** Development and Deployment in Progress

---

## ✨ Features

- 🔍 **Train Search** — Enter journey details to explore available trains.
- 💺 **Seat Selection** — Select seats through an interactive interface.
- 👤 **Passenger Information** — Enter passenger details during booking.
- 💳 **Simulated Payment** — Demonstrate a payment workflow without processing real transactions.
- 🎫 **Booking Confirmation** — Display booking details and a PNR-style reference.
- 📋 **My Bookings** — View booking information.
- ❌ **Booking Cancellation** — Demonstrate cancellation functionality where supported.
- 🆘 **Passenger Assistance** — Access passenger assistance options.
- 👤 **Profile Section** — View the user profile interface.
- 🗄️ **Database Integration** — Save and retrieve booking information through the backend API.

*Feature availability depends on the current application implementation and configuration.*

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development server and build tool |
| JavaScript | Application logic |
| Node.js | Backend runtime |
| Express.js | Backend API framework |
| SQLite | Database |
| better-sqlite3 | SQLite integration for Node.js |
| CORS | Cross-origin request handling |
| GitHub | Source code hosting and version control |
| Vercel | Planned frontend deployment |

---

## 🏗️ Application Architecture

```text
          USER
           |
           v
    REACT FRONTEND
       (Vite)
           |
           | HTTP / JSON
           v
    EXPRESS BACKEND
      (Node.js)
           |
           v
      SQLITE DATABASE
```

The frontend provides the user interface, the backend processes API requests, and SQLite stores booking records.

For online deployment, the frontend and backend must be configured to communicate through the deployed API URL.

---

## 📂 Project Structure

```text
rail-link/
│
├── src/
│   └── App.jsx
│
├── server/
│   └── index.js
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── start.bat
└── README.md
```

*The exact structure may vary as the project develops.*

---

## 🚀 Getting Started

Follow these steps to run the application locally.

### Prerequisites

Install:

- [Node.js](https://nodejs.org/)
- A modern web browser
- Git (optional, for cloning the repository)

### 1. Clone the Repository

```bash
git clone https://github.com/kolamudidhanush-code/rail-link.git
```

### 2. Navigate to the Project Folder

```bash
cd rail-link
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Backend

Open a terminal in the project root and run:

```bash
node server/index.js
```

The backend should start at:

```text
http://localhost:3000
```

Keep this terminal open.

### 5. Start the Frontend

Open a second terminal in the project root and run:

```bash
npm run dev
```

Open the local URL displayed by Vite. It is typically:

```text
http://localhost:5173
```

If that port is occupied, Vite may select another port.

---

## 🔌 Backend API

The backend currently defines these endpoints:

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check backend status |
| GET | `/api/bookings` | Retrieve booking records |
| POST | `/api/bookings` | Save a booking |
| PATCH | `/api/bookings/:pnr/cancel` | Cancel a booking |

### Health Check

Open the following URL while the backend is running:

```text
http://localhost:3000/api/health
```

A successful response indicates that the backend is running.

### Retrieve Bookings

```text
http://localhost:3000/api/bookings
```

The response contains booking information in JSON format.

---

## ☁️ Deployment Plan

The project is being prepared for online deployment.

Planned deployment workflow:

1. Maintain the source code in GitHub.
2. Import the GitHub repository into Vercel.
3. Configure and deploy the React frontend.
4. Deploy the Express backend to a compatible hosting service.
5. Configure the frontend to use the deployed backend API.
6. Configure persistent database storage.
7. Test the complete application using the public website URL.

**Important:** Deploying the frontend alone does not deploy the backend. The API and database must also be configured for online booking functionality.

---

## 🔐 Security and Data Handling

- Keep passwords, API keys, and secret credentials out of the repository.
- Exclude `.env` files and local database files from GitHub.
- Use environment variables for deployment-specific configuration.
- Configure appropriate CORS rules for the deployed frontend.
- Use a suitable persistent database solution for production hosting.
- Do not store real payment credentials or sensitive identity documents in this demonstration project.

---

## ⚠️ Limitations

- This project is intended for educational and demonstration purposes.
- Train schedules and availability may use sample or simulated data.
- The payment workflow is simulated and does not process real payments.
- Online booking functionality depends on the deployment and database configuration.
- Official railway system integration is not implied.

---

## 🔮 Future Enhancements

- Secure user authentication and authorization.
- Integration with authorized train information APIs.
- Legitimate payment gateway integration.
- Improved booking history and cancellation workflows.
- Email or SMS booking notifications.
- Responsive design improvements.
- Automated testing and error handling.
- Production-ready database hosting and monitoring.

---

## 🎓 Learning Outcomes

This project demonstrates practical concepts in:

- React component development.
- Frontend and backend integration.
- REST API design.
- Database operations using SQLite.
- JavaScript application development.
- Source code management using GitHub.
- Web application deployment.

---

## 👨‍💻 Project Information

| Field | Details |
|---|---|
| Project Name | RAIL LINK |
| Category | Full-Stack Web Development |
| Frontend | React + Vite |
| Backend | Node.js + Express.js |
| Database | SQLite |
| Repository | GitHub |
| Deployment | In Progress |

---

## ⚖️ Disclaimer

RAIL LINK is an independent educational project. It is not affiliated with Indian Railways or IRCTC and is not intended for actual railway reservations or real financial transactions.

---

### ⭐ Thank You

Thank you for visiting the RAIL LINK project repository!
