import express from "express";
import { createUserService, loginUserService } from "./auth.service.js";
import { loginUser, signup } from "./auth.controller.js";
import { createUserSchema } from "./auth.validate.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", validateRequest(createUserSchema), signup);
authRouter.post("/login", loginUser);

export default authRouter;
