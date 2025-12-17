import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ENV } from "../config/env.js";
import { sendError, sendBadRequest } from "../utils/response.js";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Global error handling middleware
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Error:", err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const message = err.errors
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join(", ");
    sendBadRequest(res, `Validation error: ${message}`);
    return;
  }

  // Handle custom API errors
  if (err instanceof ApiError) {
    sendError(res, err.message, err.statusCode);
    return;
  }

  // Handle MongoDB errors
  if (err.name === "MongoError" || err.name === "MongoServerError") {
    sendError(res, "Database error occurred", 500);
    return;
  }

  // Default error response
  const message = ENV.IS_PRODUCTION ? "Internal server error" : err.message;
  sendError(res, message, 500);
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(_req: Request, res: Response): void {
  sendError(res, "Route not found", 404);
}

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

