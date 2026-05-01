import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// connect with database
connectDB();
// Test Route

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running " });
});

export default app;
