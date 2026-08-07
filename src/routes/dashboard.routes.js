import express from "express";

import auth from "../middleware/auth.js";

import {
    getDashboardStats,
    getRecentTasks,
    getUpcomingEvents,
    getRecentRequests,
    getRecentMessages
} from "../controllers/dashboard.controller.js";

const router = express.Router();

// Dashboard Statistics
router.get("/stats", auth, getDashboardStats);

// Recent Tasks
router.get("/recent-tasks", auth, getRecentTasks);

// Upcoming Events
router.get("/upcoming-events", auth, getUpcomingEvents);

// Recent Requests
router.get("/recent-requests", auth, getRecentRequests);

// Recent Messages
router.get("/recent-messages", auth, getRecentMessages);

export default router;