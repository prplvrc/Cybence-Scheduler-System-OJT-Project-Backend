import express from "express";
import * as taskController from "../controllers/task.controller.js";
// Changed 'middlewares' to 'middleware'
import auth from "../middleware/auth.js"; 

const router = express.Router();

router.use(auth);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;