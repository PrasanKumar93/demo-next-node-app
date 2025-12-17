import type { Request, Response } from "express";
import { sendSuccess } from "../utils/response.js";
import { isConnected } from "../utils/db.js";
import type { HelloResponse, HealthCheckResponse } from "../types/index.js";

/**
 * GET /api/hello
 * Returns a Hello World message
 */
export function getHello(_req: Request, res: Response): void {
  const data: HelloResponse = {
    message: "Hello World",
  };
  sendSuccess(res, data);
}

/**
 * GET /api/health
 * Returns server health status
 */
export function getHealth(_req: Request, res: Response): void {
  const data: HealthCheckResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: isConnected() ? "connected" : "disconnected",
  };
  sendSuccess(res, data);
}

