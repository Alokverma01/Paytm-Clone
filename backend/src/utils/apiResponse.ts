export const sendResponse = (
  res: any,
  {
    statusCode = 200,
    success = true,
    message = "Success",
    data = null,
  }: {
    statusCode?: number;
    success?: boolean;
    message?: string;
    data?: any;
  },
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
