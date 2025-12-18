import { describe, it, expect, vi } from "vitest";
import type { Response } from "express";
import {
  sendSuccess,
  sendError,
  sendCreated,
  sendNotFound,
  sendBadRequest,
  sendUnauthorized,
} from "./response.js";

// Mock Express Response
const createMockResponse = (): Response => {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;
  return res;
};

describe("Response Utils", () => {
  describe("sendSuccess", () => {
    it("should send success response with data", () => {
      const res = createMockResponse();
      const data = { message: "Hello" };

      sendSuccess(res, data);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { message: "Hello" },
        message: undefined,
      });
    });

    it("should send success response with custom status code", () => {
      const res = createMockResponse();

      sendSuccess(res, { id: 1 }, "Created", 201);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { id: 1 },
        message: "Created",
      });
    });
  });

  describe("sendError", () => {
    it("should send error response", () => {
      const res = createMockResponse();

      sendError(res, "Something went wrong", 500);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Something went wrong",
      });
    });

    it("should default to 500 status code", () => {
      const res = createMockResponse();

      sendError(res, "Error");

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("sendCreated", () => {
    it("should send 201 response", () => {
      const res = createMockResponse();

      sendCreated(res, { id: 123 }, "Resource created");

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { id: 123 },
        message: "Resource created",
      });
    });
  });

  describe("sendNotFound", () => {
    it("should send 404 response with default message", () => {
      const res = createMockResponse();

      sendNotFound(res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Resource not found",
      });
    });

    it("should send 404 response with custom message", () => {
      const res = createMockResponse();

      sendNotFound(res, "User not found");

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "User not found",
      });
    });
  });

  describe("sendBadRequest", () => {
    it("should send 400 response", () => {
      const res = createMockResponse();

      sendBadRequest(res, "Invalid input");

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Invalid input",
      });
    });
  });

  describe("sendUnauthorized", () => {
    it("should send 401 response", () => {
      const res = createMockResponse();

      sendUnauthorized(res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Unauthorized",
      });
    });
  });
});
