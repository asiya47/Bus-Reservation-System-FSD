const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busName: {
      type: String,
      required: true,
    },

    busNumber: {
      type: String,
      required: true,
      unique: true,
    },

    from: {
      type: String,
      required: true,
    },

    to: {
      type: String,
      required: true,
    },

    departureTime: {
      type: String,
      required: true,
    },

    arrivalTime: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    // Total Bus Capacity
    totalSeats: {
      type: Number,
      default: 36,
    },

    // Remaining Seats
    availableSeats: {
      type: Number,
      default: 36,
    },

    // Booked Seats
    bookedSeats: [
      {
        seatNumber: {
          type: Number,
          required: true,
        },

        // The travel date this seat is held for. A seat is only
        // considered taken for a specific date, so the same seat
        // number can be booked again on a different day.
        journeyDate: {
          type: String,
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

        // Phone is OPTIONAL
        phone: {
          type: String,
          default: "",
        },

        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        busType: {
          type: String,
          default: "AC Sleeper",
        },

        rating: {
          type: Number,
          default: 4.5,
        },

        amenities: {
          type: [String],
          default: ["WiFi", "Charging Point", "Water Bottle"],
},
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bus", busSchema);