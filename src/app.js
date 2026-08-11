import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://cybence-scheduler-system-ojt-projec.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());
app.use("/api", routes);

export default app;