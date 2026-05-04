import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { AppError } from "../utils/appError.js";
import { StatusCodes } from "../constants/statusCodes.js";

export const validateRequest = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);

      req.body = parsedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // format Zod errors
        const formattedErrors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return next(
          new AppError(
            JSON.stringify(formattedErrors),
            StatusCodes.BAD_REQUEST,
          ),
        );
      }

      next(error);
    }
  };
};
