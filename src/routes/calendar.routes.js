import express from "express";

import auth from "../middleware/auth.js";

import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} from "../controllers/calendar.controller.js";

const router = express.Router();

// Create Calendar Event
router.post("/", auth, createEvent);

// Get All Calendar Events
router.get("/", auth, getAllEvents);

// Get One Calendar Event
router.get("/:id", auth, getEventById);

// Update Calendar Event
router.put("/:id", auth, updateEvent);

// Delete Calendar Event
router.delete("/:id", auth, deleteEvent);

export default router;