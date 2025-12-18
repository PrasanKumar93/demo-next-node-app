import { isConnected } from "../utils/mongodb/index.js";
import type { HelloResponse, HealthCheckResponse } from "../types/index.js";

/**
 * Returns a Hello World message
 */
export function getHello(): HelloResponse {
  return {
    message: "Hello World",
  };
}

/**
 * Returns server health status
 */
export function getHealth(): HealthCheckResponse {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: isConnected() ? "connected" : "disconnected",
  };
}
