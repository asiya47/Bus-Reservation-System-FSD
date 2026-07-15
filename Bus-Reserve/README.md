# SmartBus — Online Bus Reservation System

A full-stack MERN application for searching, booking, and managing intercity
bus tickets in India, with a passenger-facing app and an admin panel for
managing the bus fleet.

## Features

- User registration/login with JWT auth and hashed passwords (bcrypt)
- Search buses by From / To / Date, with date-aware seat availability
- Interactive seat map (available / selected / booked)
- Passenger details, seat selection, and a mock payment flow
- Auto-generated e-ticket with QR code, downloadable as a PDF
- "My Bookings" — view and cancel bookings
- Admin panel — add / edit / delete buses, view passenger lists per bus

## Tech Stack

**Frontend:** React (Vite), React Router, Tailwind CSS v4, Axios,
react-hot-toast, jsPDF + html2canvas, react-qr-code, lucide-react

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs

## Project Structure

```
Bus-Reserve/
├── client/     React frontend (Vite)
└── server/     Express + MongoDB backend
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A running MongoDB instance (local or Atlas)

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# edit .env with your own MONGO_URI and JWT_SECRET
node seedBuses.js   # populates sample bus routes
npm run dev
```

The API runs on `http://localhost:5000` by default.

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

### 3. Admin Account

An admin account can be created via `server/createAdmin.js`:

```bash
cd server
node createAdmin.js
```

## Notes / Known Limitations

- Payment is simulated (no real payment gateway is integrated).
- Backend routes currently trust the `userId` sent from the client rather
  than verifying the JWT on the server — fine for a learning project, but
  should be hardened with proper auth middleware before any real deployment.
- Seat inventory is date-specific per bus, but there is no seat "locking"
  during checkout, so two users booking the same seat/date at the exact
  same moment could race.

## License

This project is for educational purposes.
