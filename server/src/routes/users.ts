import express from "express";
import User from "../models/User";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Get all employees (Admin only)
router.get("/employees", authMiddleware, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  if (req.user.role !== "Admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const employees = await User.find({ role: "Employee" }, "email fullName");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

export default router;
