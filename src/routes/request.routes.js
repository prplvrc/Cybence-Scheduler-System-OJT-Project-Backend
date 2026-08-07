import { Router } from "express";
import mysql from "mysql2/promise";

const router = Router();
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "cybencescheduler",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM Request ORDER BY createdAt DESC");
    res.json(rows); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, status, type, requester, reviewer, deadline } = req.body || {};
    const [result] = await pool.execute(
      "INSERT INTO Request (title, description, status, type, requester, reviewer, deadline, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [title, description, status || "Pending", type, requester, reviewer, deadline]
    );
    const [rows] = await pool.execute("SELECT * FROM Request WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create request" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Request id is required" });
    }

    const allowedFields = ["title", "description", "status", "type", "requester", "reviewer", "deadline"];
    const updates = [];
    const values = [];

    for (const field of allowedFields) {
      if (req.body && Object.prototype.hasOwnProperty.call(req.body, field) && req.body[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(req.body[field]);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    values.push(id);
    await pool.execute(`UPDATE Request SET ${updates.join(", ")}, updatedAt = NOW() WHERE id = ?`, values);
    const [rows] = await pool.execute("SELECT * FROM Request WHERE id = ?", [id]);
    return res.json(rows[0]);
  } catch (error) {
    console.error("Request update error", error);
    return res.status(500).json({ message: "Failed to update request", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Request id is required" });
    }

    const [result] = await pool.execute("DELETE FROM Request WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    return res.json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete request" });
  }
});

export default router;
