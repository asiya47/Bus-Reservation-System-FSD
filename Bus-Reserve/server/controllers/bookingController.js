const Bus = require("../models/Bus");
const Booking = require("../models/Booking");

// =========================
// Book Seat
// =========================
const bookSeat = async (req, res) => {
  try {
    const {
      userId,
      busId,
      passengerName,
      passengerAge,
      seatNumber,
      journeyDate,
    } = req.body;

    if (
      !userId ||
      !busId ||
      !passengerName ||
      !passengerAge ||
      !seatNumber ||
      !journeyDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    // A seat is only "taken" for the specific date being booked —
    // the same seat number is free again on any other date.
    const alreadyBooked = bus.bookedSeats.find(
      (seat) =>
        seat.seatNumber == seatNumber &&
        seat.journeyDate === journeyDate
    );

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "Seat already booked for this date",
      });
    }

    bus.bookedSeats.push({
      seatNumber,
      journeyDate,
      passengerName,
      passengerAge,
    });

    await bus.save();

    const booking = await Booking.create({
      user: userId,
      bus: busId,
      passengerName,
      passengerAge,
      seatNumber,
      journeyDate,
    });

    res.status(201).json({
      success: true,
      message: "Seat Booked Successfully",
      booking,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get My Bookings
// =========================
const getMyBookings = async (req, res) => {
  try {
    const { userId } = req.query;

    const bookings = await Booking.find({
      user: userId,
    }).populate("bus");

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Cancel Booking
// =========================
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const bus = await Bus.findById(booking.bus);

    if (bus) {
      bus.bookedSeats = bus.bookedSeats.filter(
        (seat) =>
          !(
            seat.seatNumber == booking.seatNumber &&
            seat.journeyDate === booking.journeyDate
          )
      );

      await bus.save();
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking Cancelled Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Export
// =========================
module.exports = {
  bookSeat,
  getMyBookings,
  cancelBooking,
};