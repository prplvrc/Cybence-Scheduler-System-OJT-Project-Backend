import express from "express";

import auth from "../middleware/auth.js";

import {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessage,
    deleteMessage
} from "../controllers/communication.controller.js";

const router = express.Router();

// Create Message
router.post("/", auth, createMessage);

// Get All Messages
router.get("/", auth, getAllMessages);

// Get Message By ID
router.get("/:id", auth, getMessageById);

// Update Message
router.put("/:id", auth, updateMessage);

// Delete Message
router.delete("/:id", auth, deleteMessage);

export default router;