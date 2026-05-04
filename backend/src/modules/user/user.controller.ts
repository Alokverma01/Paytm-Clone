import { StatusCodes } from "../../constants/statusCodes.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { getUserDataService, updateUserService } from "./user.service.js";

export const getUserData = catchAsync(async (req, res) => {
  const result = await getUserDataService(String(req.params.id));

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Data fetched successfully ",
    data: result,
  });
});

export const updateUser = catchAsync(async (req, res) => {
  const result = await updateUserService(String(req.params.id), req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});
