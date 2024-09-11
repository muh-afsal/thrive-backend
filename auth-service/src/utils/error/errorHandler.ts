import { Request, Response, NextFunction } from "express";
import ErrorResponse from "./errorResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
 

  const statusCode = err.status || 500;

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Internal Server Error"
  });
};
