const router = require("express").Router();
const Task = require("../models/Task");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid/expired token" });
    req.user = decoded;
    next();
  });
}

router.post("/", verifyToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Only admin" });
  const { title, description, date, category, assignee, ...statusFlags } =
    req.body;

  // Find the actual User object for assignee
  const assignedUser = await User.findOne({ email: assignee });
  if (!assignedUser)
    return res.status(404).json({ error: "No such user to assign" });

  const task = new Task({
    title,
    description,
    date,
    category,
    assignee: assignedUser._id,
    createdBy: req.user.userId,
    ...statusFlags,
  });
  await task.save();
  res.status(201).json(task);
});

// 2. Get all tasks (admin: everyone, employee: just their own)
router.get("/", verifyToken, async (req, res) => {
  let tasks;
  if (req.user.role === "admin") {
    tasks = await Task.find().populate("assignee", "fullName email");
  } else {
    tasks = await Task.find({ assignee: req.user.userId });
  }
  res.json(tasks);
});

// 3. Get tasks assigned to logged in employee (shortcut for FE)
router.get("/my", verifyToken, async (req, res) => {
  if (req.user.role !== "employee")
    return res.status(403).json({ error: "Only employees" });
  const tasks = await Task.find({ assignee: req.user.userId }).sort({
    date: 1,
  });
  res.json(tasks);
});

// 4. Update task status (admin or assigned user)
router.patch("/:id", verifyToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  // Only admin or the user themselves can update
  if (
    !(req.user.role === "admin" || req.user.userId === String(task.assignee))
  ) {
    return res.status(403).json({ error: "Not allowed" });
  }

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});

// 5. Delete a task (admin only)
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Only admin" });
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

module.exports = router;
