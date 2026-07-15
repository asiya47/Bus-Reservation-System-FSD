// Quick diagnostic — tells you exactly what's in your database
// right now, so we can tell whether buses exist at all, whether
// this specific route exists, and how many bookings are stored.
//
// Usage:  node checkData.js

require("dotenv").config();
const mongoose = require("mongoose");
const Bus = require("./models/Bus");
const Booking = require("./models/Booking");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to:", process.env.MONGO_URI);

  const busCount = await Bus.countDocuments();
  const bookingCount = await Booking.countDocuments();

  console.log(`\nTotal buses in DB: ${busCount}`);
  console.log(`Total bookings in DB: ${bookingCount}\n`);

  if (busCount === 0) {
    console.log("⚠️  No buses found at all — run `node seedBuses.js` to populate them.");
  } else {
    console.log("All routes currently in the database:");
    const buses = await Bus.find({}, "busName from to");
    buses.forEach((b) =>
      console.log(`  - ${b.from} → ${b.to}  (${b.busName})`)
    );
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("Connection/query error:", err.message);
  process.exit(1);
});
