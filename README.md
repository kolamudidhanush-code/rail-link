# Rail Link — Segment Booking Demo

A responsive React/Vite frontend recreation inspired by the supplied Rail Link screenshots. It demonstrates a rail journey search, segment-seat concept, seat selection, passenger details, simulated payment, a demo ticket/PNR, booking history, assistance requests, profile, and a demo login page.

> **Important:** This is a portfolio/demo application. Train schedules, fares, availability, ticket numbers, and payment are illustrative only. It is not connected to Indian Railways or a live reservation system, and no real payment is taken. Do not enter real identity document numbers. Login and Google sign-in are local demo interactions, not production authentication.

## Requirements

- Node.js LTS (includes npm)
- Git (optional, for pushing to GitHub)

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints in your terminal, typically `http://localhost:5173`. On Windows, you can also double-click `start.bat`; it installs dependencies on the first run and starts the dev server.

## Build for deployment

```bash
npm run build
npm run preview
```

The production build is created in `dist/`.

## Features

- Responsive dark navy and cyan interface
- Station, date, passenger count, and class selection
- Demo train results and segment occupancy illustration
- Seat map with coach tabs, filters, manual selection, and auto-allocation
- Passenger manifest and validation
- Simulated UPI, card, and net-banking payment states (no transaction)
- Ticket with demo PNR and print-friendly layout
- Local booking history, cancellation, and ticket view
- Assistance request form and local request history
- Profile statistics and mobile number saved locally
- Demo login/create-account/forgot-password interface
- `localStorage` persistence in the same browser

## Project structure

```text
rail-link-demo/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── start.bat
├── .gitignore
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## Upload to GitHub

1. Create a new **empty** repository on https://github.com/new (for example, `rail-link-demo`). Do not add a README there if you already intend to push this project as-is.
2. Open Command Prompt/PowerShell in this project folder.
3. Run:

```bash
git init
git add .
git commit -m "Build Rail Link segment booking demo"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rail-link-demo.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. GitHub may prompt you to sign in through your browser or a credential manager. Never put passwords or tokens into source code.

If Git says the remote already exists, inspect it with `git remote -v`; update it with `git remote set-url origin https://github.com/YOUR-USERNAME/rail-link-demo.git`.

## Deploy (optional)

You can import the GitHub repository into Vercel or another static hosting provider. Use `npm run build` as the build command and `dist` as the output directory. This frontend-only demo does not require environment variables.

## Limitations and next steps

The demo uses seeded client-side train information and local browser storage. A production railway product would require a secure backend, database, authentication, live train/seat data from an authorized source, a real payment provider, booking concurrency protection, and suitable privacy/security controls.
