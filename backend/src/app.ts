import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { globalRateLimiter } from "./middlewares/rateLimiter.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(globalRateLimiter);
app.use("/api/v1", mainRouter);

// connect with database
connectDB();
// Test Route

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running " });
});

//  Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
