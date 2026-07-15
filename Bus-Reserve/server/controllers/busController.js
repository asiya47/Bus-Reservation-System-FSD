const Bus = require("../models/Bus");

// =========================
// Add New Bus
// =========================
const addBus = async (req, res) => {
  try {
    const {
        busName,
        busNumber,
        from,
        to,
        departureTime,
        arrivalTime,
        price,
        totalSeats,
        busType,
        rating,
        amenities,
      } = req.body;

    // Check required fields
    if (
      !busName ||
      !busNumber ||
      !from ||
      !to ||
      !departureTime ||
      !arrivalTime ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check if bus already exists
    const existingBus = await Bus.findOne({ busNumber });

    if (existingBus) {
      return res.status(400).json({
        success: false,
        message: "Bus already exists",
      });
    }

    // Create Bus
    const bus = await Bus.create({
      busName,
      busNumber,
      from,
      to,
      departureTime,
      arrivalTime,
      price,
      totalSeats: totalSeats || 40,
      availableSeats: totalSeats || 40,
      busType,
rating,
amenities: amenities
  ? amenities.split(",").map((a) => a.trim())
  : [],
    });

    res.status(201).json({
      success: true,
      message: "Bus Added Successfully",
      bus,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get All Buses
// =========================
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();

    res.status(200).json({
      success: true,
      count: buses.length,
      buses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Search Bus
// =========================
const searchBus = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Please provide From and To locations",
      });
    }

    const buses = await Bus.find({
      from: { $regex: from, $options: "i" },
      to: { $regex: to, $options: "i" },
    });

    // If a travel date was given, report seats available for that
    // specific date rather than the bus's lifetime seat count.
    const busesWithAvailability = buses.map((bus) => {
      const busObj = bus.toObject();

      if (date) {
        const bookedForDate = bus.bookedSeats.filter(
          (seat) => seat.journeyDate === date
        ).length;

        busObj.availableSeats = bus.totalSeats - bookedForDate;
      } else {
        busObj.availableSeats = bus.totalSeats;
      }

      return busObj;
    });

    res.status(200).json({
      success: true,
      count: busesWithAvailability.length,
      buses: busesWithAvailability,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Booked Seats For A Date
// =========================
const getBookedSeats = async (req, res) => {
  try {
    const { date } = req.query;

    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    const bookedSeatNumbers = date
      ? bus.bookedSeats
          .filter((seat) => seat.journeyDate === date)
          .map((seat) => seat.seatNumber)
      : [];

    res.status(200).json({
      success: true,
      bookedSeats: bookedSeatNumbers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Bus By ID
// =========================
const getBusById = async (req, res) => {
  try {

    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.status(200).json({
      success: true,
      bus,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Update Bus
// =======================
const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bus Updated Successfully",
      bus,
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
// Delete Bus
// =========================
const deleteBus = async (req, res) => {
  try {

    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    await Bus.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Bus Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =========================
// Get Passengers of a Bus
// =========================
const getPassengers = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.status(200).json({
      success: true,
      passengers: bus.bookedSeats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  addBus,
  getAllBuses,
  searchBus,
  getBusById,
  updateBus,
  deleteBus,
  getPassengers,
  getBookedSeats,
};