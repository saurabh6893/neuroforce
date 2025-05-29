const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/employees - Return all employees
router.get("/", async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }, "fullName email"); // Only need fullName/email
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

module.exports = router;
