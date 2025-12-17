import { Router } from "express";
import { getHello, getHealth } from "../controllers/hello.controller.js";

const router = Router();

// GET /api/hello - Hello World endpoint
router.get("/hello", getHello);

// GET /api/health - Health check endpoint
router.get("/health", getHealth);

export default router;

