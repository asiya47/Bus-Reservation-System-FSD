const User = require("../models/User");
const Bus = require("../models/Bus");
const Booking = require("../models/Booking");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBuses = await Bus.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const bookings = await Booking.find().populate("bus");

    let totalRevenue = 0;

    bookings.forEach((booking) => {
      if (booking.bus) {
        totalRevenue += booking.bus.price;
      }
    });

    res.status(200).json({
      success: true,
      totalUsers,
      totalBuses,
      totalBookings,
      totalPassengers: totalBookings,
      totalRevenue,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};