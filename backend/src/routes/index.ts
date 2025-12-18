import { Router, type Request, type Response } from "express";
import { getHello, getHealth } from "../controllers/hello.controller.js";
import { sendSuccess, sendError } from "../utils/response.js";

const router = Router();

/**
 * Route handler wrapper with try-catch
 * Calls the controller function and sends success/error response
 */
function handleRoute<T>(controllerFn: (req: Request) => T | Promise<T>) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await controllerFn(req);
      sendSuccess(res, result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      sendError(res, message);
    }
  };
}

// GET /api/hello
router.get(
  "/hello",
  handleRoute(() => getHello())
);

// GET /api/health
router.get(
  "/health",
  handleRoute(() => getHealth())
);

export default router;
