import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { StatusCodes } from "../../constants/statusCodes.js";
import { createUserService, loginUserService } from "./auth.service.js";
import { createUserSchema } from "./auth.validate.js";
import { AppError } from "../../utils/appError.js";

export const signup: RequestHandler = catchAsync(async (req, res) => {
  await createUserService(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User Created Successfully",
  });
});

export const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Login Successfully",
    data: result.user,
  });
});
