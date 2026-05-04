import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import { StatusCodes } from "../constants/statusCodes.js";

interface JwtPayload {
  userId: string;
  email: string;
}

export const authMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
      throw new AppError("Unauthorized - No token", StatusCodes.UNAUTHORIZED);
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    (req as any).user = decoded;

    next();
  },
);
