import type { Request, Response, NextFunction } from "express";

// Standard API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Express middleware type
export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

// MongoDB document with _id
export interface WithId {
  _id?: string;
}

// Health check response
export interface HealthCheckResponse {
  status: "ok" | "error";
  timestamp: string;
  uptime: number;
  mongodb?: "connected" | "disconnected";
}

// Hello response
export interface HelloResponse {
  message: string;
}

