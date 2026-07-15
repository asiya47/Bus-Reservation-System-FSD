const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

// ======================
// Routes
// ======================
const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes"); // NEW

dotenv.config();

const app = express();

console.log("✅ server.js is running");

// ======================
// Connect Database
// ======================
connectDB();

// ======================
// Middlewares
// ======================
app.use(cors());
app.use(express.json());

console.log("✅ Loading Routes");

// ======================
// API Routes
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin", adminRoutes); // NEW

// ======================
// Test Route
// ======================
app.get("/", (req, res) => {
  res.send("🚍 Smart Bus Reservation Backend is Running...");
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});