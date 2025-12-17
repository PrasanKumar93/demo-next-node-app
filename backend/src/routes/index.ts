import { Router } from "express";
import helloRoutes from "./hello.routes.js";

const router = Router();

// Mount route modules
router.use("/", helloRoutes);

export default router;

