import { Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response) => {
  console.log("Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    data: null,
    message,
  });
};

export default errorHandler;
