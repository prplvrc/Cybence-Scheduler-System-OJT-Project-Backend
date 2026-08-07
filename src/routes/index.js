import express from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import taskRoutes from "./task.routes.js";
import calendarRoutes from "./calendar.routes.js";
import requestRoutes from "./request.routes.js";
import communicationRoutes from "./communication.routes.js";
import dashboardRoutes from "./dashboard.routes.js";


const router = express.Router();


router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/calendar", calendarRoutes);
router.use("/requests", requestRoutes);
router.use("/messages", communicationRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;                                                                                                                                                                                                                                                                                                                                      