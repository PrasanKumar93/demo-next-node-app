import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Hello Controller", () => {
  describe("GET /api/hello", () => {
    it("should return Hello World message", async () => {
      const response = await request(app).get("/api/hello");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: {
          message: "Hello World",
        },
      });
    });

    it("should have correct content type", async () => {
      const response = await request(app).get("/api/hello");

      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
  });

  describe("GET /api/health", () => {
    it("should return health check status", async () => {
      const response = await request(app).get("/api/health");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("status", "ok");
      expect(response.body.data).toHaveProperty("timestamp");
      expect(response.body.data).toHaveProperty("uptime");
      expect(response.body.data).toHaveProperty("mongodb");
    });

    it("should have valid timestamp format", async () => {
      const response = await request(app).get("/api/health");

      const timestamp = response.body.data.timestamp;
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });

    it("should have numeric uptime", async () => {
      const response = await request(app).get("/api/health");

      expect(typeof response.body.data.uptime).toBe("number");
      expect(response.body.data.uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe("404 Handler", () => {
    it("should return 404 for unknown routes", async () => {
      const response = await request(app).get("/api/unknown-route");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        error: "Route not found",
      });
    });
  });
});

