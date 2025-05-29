require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("./models/Task");
const User = require("./models/User");

const demoTasks = [
  {
    title: "Design Homepage UI",
    description: "Create a modern homepage layout using Figma.",
    date: "2025-05-02",
    category: "Design",
    assigneeEmail: "employee1@example.com",
    active: true,
    newTask: false,
    completed: false,
    failed: false,
  },
];

(async function seedTasks() {
  await mongoose.connect(process.env.MONGODB_URI);

  for (const t of demoTasks) {
    const user = await User.findOne({ email: t.assigneeEmail });
    if (!user) {
      console.log(`User not found: ${t.assigneeEmail}`);
      continue;
    }
    await Task.create({
      ...t,
      assignee: user._id,
    });
    console.log(`Seeded task "${t.title}" for ${t.assigneeEmail}`);
  }

  await mongoose.disconnect();
  console.log("Task seed complete!");
})();
