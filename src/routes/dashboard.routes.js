import express from "express";
import auth from "../middleware/auth.js";
import {
    getDashboardStats,
    getRecentTasks,
    getUpcomingEvents,
    getRecentRequests,
    getRecentMessages,
    getWeeklyActivity,
    getTeamOverview
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", auth, getDashboardStats);
router.get("/recent-tasks", auth, getRecentTasks);
router.get("/upcoming-events", auth, getUpcomingEvents);
router.get("/recent-requests", auth, getRecentRequests);
router.get("/recent-messages", auth, getRecentMessages);

// New dynamic chart & team endpoints
router.get("/weekly-activity", auth, getWeeklyActivity);
router.get("/team-overview", auth, getTeamOverview);

export default router;