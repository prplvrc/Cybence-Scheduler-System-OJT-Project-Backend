import express from "express";

import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";

const router = express.Router();

// Get all users
router.get("/", auth, getAllUsers);

// Get one user by ID
router.get("/:id", auth, getUserById);

// Update user
router.put("/:id", auth, updateUser);

// Delete user (Admin only)
router.delete("/:id", auth, admin, deleteUser);

export default router;