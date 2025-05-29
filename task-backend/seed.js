require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "users");

async function seedUsers() {
  await mongoose.connect(process.env.MONGODB_URI || "<YOUR_MONGODB_URI>");

  const users = [
    {
      fullName: "Gol D. Rogers",
      email: "admin@example.com",
      password: "adminpass",
      role: "admin",
    },
    {
      fullName: "Monkey D Luffy",
      email: "employee1@example.com",
      password: "password123",
      role: "employee",
    },
    {
      fullName: "Roronoa Zoro",
      email: "employee2@example.com",
      password: "password234",
      role: "employee",
    },
    {
      fullName: "Nami",
      email: "employee3@example.com",
      password: "password345",
      role: "employee",
    },
    {
      fullName: "Vinsmoke Sanji",
      email: "employee4@example.com",
      password: "password456",
      role: "employee",
    },
    {
      fullName: "Tony tony Chopper",
      email: "employee5@example.com",
      password: "password567",
      role: "employee",
    },
  ];

  for (const user of users) {
    user.password = await bcrypt.hash(user.password, 10);
    await User.findOneAndUpdate({ email: user.email }, user, {
      upsert: true,
      new: true,
    });
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
}

seedUsers().catch((err) => {
  console.error(err);
  process.exit(1);
});
