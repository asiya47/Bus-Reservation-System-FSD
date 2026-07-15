const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },

    passengerName: {
      type: String,
      required: true,
    },

    passengerAge: {
      type: Number,
      required: true,
    },

    seatNumber: {
      type: Number,
      required: true,
    },

    // The date of travel selected by the passenger (YYYY-MM-DD).
    // Distinct from bookingDate below, which is when the booking was made.
    journeyDate: {
      type: String,
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);