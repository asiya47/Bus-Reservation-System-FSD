const express = require("express");

const router = express.Router();

const {
  bookSeat,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

// =======================
// Book Ticket
// =======================
router.post("/book", bookSeat);

// =======================
// My Bookings
// =======================
router.get("/my-bookings", getMyBookings);

// =======================
// Cancel Booking
// =======================
router.delete("/cancel/:id", cancelBooking);

module.exports = router;