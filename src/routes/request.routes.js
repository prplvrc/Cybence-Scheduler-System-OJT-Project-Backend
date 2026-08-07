import express from "express";

import auth from "../middleware/auth.js";

import {
    createRequest,
    getAllRequests,
    getRequestById,
    updateRequest,
    deleteRequest,
    approveRequest,
    rejectRequest
} from "../controllers/request.controller.js";


const router = express.Router();


// Create request
router.post("/", auth, createRequest);


// Get all requests
router.get("/", auth, getAllRequests);


// Get request by ID
router.get("/:id", auth, getRequestById);


// Update request
router.put("/:id", auth, updateRequest);


// Delete request
router.delete("/:id", auth, deleteRequest);


// Approve request
router.patch("/:id/approve", auth, approveRequest);


// Reject request
router.patch("/:id/reject", auth, rejectRequest);


export default router;