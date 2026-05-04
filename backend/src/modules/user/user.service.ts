import { StatusCodes } from "../../constants/statusCodes.js";
import { AppError } from "../../utils/appError.js";
import userModel from "../auth/auth.model.js";

interface IUpdateUser {
  name?: string;
  mobile?: string;
}

export const getUserDataService = async (id: string) => {
  const user = await userModel.findById(id);
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }
  const userObj = user.toObject();

  const { password, ...rest } = userObj;

  return rest;
};
export const updateUserService = async (id: string, payload: IUpdateUser) => {
  const existingUser = await userModel.findById(id);

  if (!existingUser) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const updateUser = await userModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updateUser;
};
