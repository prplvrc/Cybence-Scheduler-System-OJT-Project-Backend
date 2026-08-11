import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(
  cors(corsOptions)
);

app.use(express.json());

app.use("/api", routes);

export default app;