import express from "express";
import Task from "../models/Task";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Create Task (Admin only)
router.post("/", authMiddleware, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  if (req.user.role !== "Admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Task creation failed" });
  }
});

// Get All Tasks (Admin or Employee)
router.get("/", authMiddleware, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const tasks =
      req.user.role === "Admin"
        ? await Task.find({ createdBy: req.user.userId }).populate(
            "assignedTo",
            "fullName"
          )
        : await Task.find({ assignedTo: req.user.userId });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Update Task Status (Employee only)
router.put("/:id", authMiddleware, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  if (req.user.role !== "Employee") {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Task update failed" });
  }
});

export default router;
