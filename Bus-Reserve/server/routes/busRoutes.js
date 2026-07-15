const express = require("express");

console.log("✅ busRoutes.js Loaded");

const router = express.Router();

const {
  addBus,
  getAllBuses,
  searchBus,
  getBusById,
  updateBus,
  deleteBus,
  getPassengers,
  getBookedSeats,
} = require("../controllers/busController");

// Add Bus
router.post("/add", addBus);

// Search Bus
router.get("/search", searchBus);

// Get All Buses
router.get("/", getAllBuses);

// Booked Seats For A Specific Date
router.get("/:id/seats", getBookedSeats);

// Get Bus By ID
router.get("/:id", getBusById);

// ⭐ Update Bus
router.put("/:id", updateBus);


router.get("/:id/passengers", getPassengers);

// Delete Bus
router.delete("/:id", deleteBus);

module.exports = router;