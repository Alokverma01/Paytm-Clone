import { StatusCodes } from "../../constants/statusCodes.js";
import { AppError } from "../../utils/appError.js";
import userModel, { IUser } from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface ILoginPayload {
  email: string;
  password: string;
}

export const createUserService = async (payload: IUser) => {
  const existingUser = await userModel.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new AppError("User already exists", StatusCodes.BAD_REQUEST);
  }

  await userModel.create(payload);
};

export const loginUserService = async (payload: ILoginPayload) => {
  const user = await userModel.findOne({
    email: payload.email,
  });

  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const match = await bcrypt.compare(payload.password, user.password);

  if (!match) {
    throw new AppError("Invalid email and password", StatusCodes.BAD_REQUEST);
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    },
  );

  return {
    token,
    user: {
      name: user.name,
      mobile: user.mobile,
      email: user.email,
    },
  };
};
