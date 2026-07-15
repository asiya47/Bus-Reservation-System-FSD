require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  try {
    const existingAdmin = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      name: "Administrator",
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    console.log("✅ Admin Created Successfully");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

createAdmin();