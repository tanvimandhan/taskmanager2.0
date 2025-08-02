const express = require("express");
const authMiddleware = require("../middleware/auth");
const Task = require("../models/Task");

const router = express.Router();

// POST /api/tasks - Create a task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      assignedTo: req.body.assignedTo || req.user.id // default to logged-in user
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
});

// GET /api/tasks - Get all tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id }).populate("assignedTo", "name email");
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

module.exports = router;
