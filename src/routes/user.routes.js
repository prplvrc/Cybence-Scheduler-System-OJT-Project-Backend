import express from "express";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", userController.getUserProfile);
router.put("/:id/profile", userController.updateProfile);
router.patch("/:id/password", userController.updatePassword);
router.patch("/:id/notifications", userController.updateNotifications);

export default router;