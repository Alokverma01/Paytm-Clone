import express from "express";
import { getUserData, updateUser } from "./user.controller.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserData);
userRouter.put("/", updateUser);

export default userRouter;
