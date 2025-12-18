import { Router, type Request, type Response } from "express";
import { getHello, getHealth } from "../controllers/hello.controller.js";
import type { ApiResponse } from "../types/index.js";

const router = Router();

/**
 * Route handler wrapper with try-catch
 * Reads POST body and passes as input to controller function
 */
const handleRoute = <TInput, TOutput>(
  controllerFn: (input: TInput) => TOutput | Promise<TOutput>
) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await controllerFn(req.body as TInput);
      const response: ApiResponse<TOutput> = {
        success: true,
        data: result,
      };
      res.status(200).json(response);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      const response: ApiResponse = {
        success: false,
        error: message,
      };
      res.status(500).json(response);
    }
  };
};

// POST /api/hello
router.post("/hello", handleRoute(getHello));

// POST /api/health
router.post("/health", handleRoute(getHealth));

export default router;
