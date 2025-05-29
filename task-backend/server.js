require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const authRoutes = require("./routes/auth");
app.use(authRoutes);

const employeesRoute = require("./routes/employees");
app.use("/api/employees", employeesRoute);

const tasksRoutes = require("./routes/tasks");
app.use("/api/tasks", tasksRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", version: "1.0" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
