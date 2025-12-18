import { Router, type Request, type Response } from "express";
import { getHello, getHealth } from "../controllers/hello.controller.js";
import { sendSuccess, sendError } from "../utils/response.js";

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
      sendSuccess(res, result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      sendError(res, message);
    }
  };
};

// POST /api/hello
router.post("/hello", handleRoute(getHello));

// POST /api/health
router.post("/health", handleRoute(getHealth));

export default router;
