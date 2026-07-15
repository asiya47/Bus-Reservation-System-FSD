const mongoose = require("mongoose");
require("dotenv").config();

const Bus = require("./models/Bus");

mongoose.connect(process.env.MONGO_URI);

const buses = [
  {
    busName: "APSRTC Super Luxury",
    busNumber: "APS101",
    from: "Hyderabad",
    to: "Bangalore",
    departureTime: "07:00 AM",
    arrivalTime: "03:00 PM",
    price: 850,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "TSRTC Express",
    busNumber: "TS102",
    from: "Hyderabad",
    to: "Chennai",
    departureTime: "08:00 AM",
    arrivalTime: "06:00 PM",
    price: 950,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "Orange Travels",
    busNumber: "OT103",
    from: "Chennai",
    to: "Coimbatore",
    departureTime: "06:00 AM",
    arrivalTime: "02:00 PM",
    price: 650,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "VRL Travels",
    busNumber: "VR104",
    from: "Bangalore",
    to: "Mysore",
    departureTime: "09:00 AM",
    arrivalTime: "12:30 PM",
    price: 400,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "SRS Travels",
    busNumber: "SR105",
    from: "Hyderabad",
    to: "Vijayawada",
    departureTime: "05:30 AM",
    arrivalTime: "11:00 AM",
    price: 500,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "APSRTC Deluxe",
    busNumber: "APS106",
    from: "Vijayawada",
    to: "Visakhapatnam",
    departureTime: "08:30 AM",
    arrivalTime: "03:30 PM",
    price: 700,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "KPN Travels",
    busNumber: "KP107",
    from: "Chennai",
    to: "Madurai",
    departureTime: "09:00 PM",
    arrivalTime: "06:00 AM",
    price: 900,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "Orange Travels",
    busNumber: "OT108",
    from: "Hyderabad",
    to: "Tirupati",
    departureTime: "10:00 PM",
    arrivalTime: "07:00 AM",
    price: 850,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "VRL Sleeper",
    busNumber: "VR109",
    from: "Bangalore",
    to: "Chennai",
    departureTime: "11:00 PM",
    arrivalTime: "05:00 AM",
    price: 750,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "APSRTC Garuda",
    busNumber: "APS110",
    from: "Hyderabad",
    to: "Visakhapatnam",
    departureTime: "06:30 PM",
    arrivalTime: "06:00 AM",
    price: 1200,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "Neeta Travels",
    busNumber: "NT111",
    from: "Mumbai",
    to: "Pune",
    departureTime: "06:00 AM",
    arrivalTime: "10:00 AM",
    price: 400,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "RSRTC Volvo",
    busNumber: "RS112",
    from: "Delhi",
    to: "Jaipur",
    departureTime: "07:30 AM",
    arrivalTime: "01:30 PM",
    price: 600,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "VRL Multi-Axle",
    busNumber: "VR113",
    from: "Bangalore",
    to: "Goa",
    departureTime: "08:00 PM",
    arrivalTime: "06:00 AM",
    price: 1100,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "Paulo Travels",
    busNumber: "PT114",
    from: "Mumbai",
    to: "Goa",
    departureTime: "09:00 PM",
    arrivalTime: "09:00 AM",
    price: 900,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "Uttar Pradesh Roadways",
    busNumber: "UP115",
    from: "Delhi",
    to: "Agra",
    departureTime: "06:00 AM",
    arrivalTime: "11:00 AM",
    price: 450,
    totalSeats: 40,
    availableSeats: 40,
  },
  {
    busName: "Green Line Travels",
    busNumber: "GL116",
    from: "Kolkata",
    to: "Bhubaneswar",
    departureTime: "10:00 PM",
    arrivalTime: "06:00 AM",
    price: 700,
    totalSeats: 40,
    availableSeats: 40,
  }
];

async function seed() {
  try {
    await Bus.deleteMany();

    await Bus.insertMany(buses);

    console.log("✅ Bus data inserted successfully");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seed();