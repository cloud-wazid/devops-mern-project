
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "devops-mern-backend"
  });
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await mongoose.connection.db
      .collection("tasks")
      .find({})
      .toArray();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const result = await mongoose.connection.db
      .collection("tasks")
      .insertOne({
        title: req.body.title,
        status: "In Progress"
      });

    res.status(201).json({
      message: "Task created successfully",
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: "Could not create task" });
  }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
