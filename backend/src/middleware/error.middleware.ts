import type { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env.js";
import { sendError } from "../utils/response.js";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  console.error(`[ERROR] ${err.name}: ${err.message}`, {
    stack: err.stack,
    statusCode,
  });

  const message = ENV.IS_PRODUCTION ? "Internal server error" : err.message;
  sendError(res, message, statusCode);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (_req: Request, res: Response): void => {
  sendError(res, "Route not found", 404);
};
