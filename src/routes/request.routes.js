import express from "express";
import * as requestController from "../controllers/request.controller.js";

const router = express.Router();

router.get("/", requestController.getRequests);
router.get("/:id", requestController.getRequestById);
router.post("/", requestController.createRequest);
router.put("/:id", requestController.updateRequest);
router.delete("/:id", requestController.deleteRequest);

router.patch("/:id/approve", requestController.approveRequest);
router.patch("/:id/reject", requestController.rejectRequest);

export default router;