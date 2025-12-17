import type { Response } from "express";
import type { ApiResponse } from "../types/index.js";

/**
 * Send a success response
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200
): void {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  res.status(statusCode).json(response);
}

/**
 * Send an error response
 */
export function sendError(
  res: Response,
  error: string,
  statusCode = 500
): void {
  const response: ApiResponse = {
    success: false,
    error,
  };
  res.status(statusCode).json(response);
}

/**
 * Send a created response (201)
 */
export function sendCreated<T>(res: Response, data: T, message?: string): void {
  sendSuccess(res, data, message, 201);
}

/**
 * Send a not found response (404)
 */
export function sendNotFound(
  res: Response,
  message = "Resource not found"
): void {
  sendError(res, message, 404);
}

/**
 * Send a bad request response (400)
 */
export function sendBadRequest(res: Response, message = "Bad request"): void {
  sendError(res, message, 400);
}

/**
 * Send an unauthorized response (401)
 */
export function sendUnauthorized(
  res: Response,
  message = "Unauthorized"
): void {
  sendError(res, message, 401);
}
