import express from "express";
import authRouter from "../modules/auth/auth.route.js";
import userRouter from "../modules/user/user.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", authMiddleware, userRouter);

export default mainRouter;
