import express from "express";

import auth from "../middleware/auth.js";

import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

// Create a new task
router.post("/", auth, createTask);

// Get all tasks
router.get("/", auth, getAllTasks);

// Get a task by ID
router.get("/:id", auth, getTaskById);

// Update a task
router.put("/:id", auth, updateTask);

// Delete a task
router.delete("/:id", auth, deleteTask);

export default router;