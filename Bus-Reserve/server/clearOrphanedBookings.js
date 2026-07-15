// Run this if you ever reseed buses (node seedBuses.js) after
// bookings already exist — reseeding creates brand new bus IDs,
// so any old bookings will point to buses that no longer exist.
//
// This script removes exactly those orphaned bookings, leaving
// any valid ones (that reference a bus which still exists) intact.
//
// Usage:  node clearOrphanedBookings.js

require("dotenv").config();
const mongoose = require("mongoose");
const Booking = require("./models/Booking");
const Bus = require("./models/Bus");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const bookings = await Booking.find({});
  let removed = 0;

  for (const booking of bookings) {
    const busExists = await Bus.exists({ _id: booking.bus });

    if (!busExists) {
      await Booking.findByIdAndDelete(booking._id);
      removed++;
    }
  }

  console.log(`✅ Removed ${removed} orphaned booking(s) out of ${bookings.length} total.`);

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
