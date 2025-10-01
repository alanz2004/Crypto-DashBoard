import { Router } from "express";
import { createProjectOnChain } from "../controllers/projectBlockchainController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";


const router = Router();

// POST /api/projects/:projectId/deploy
router.post("/deploy/:projectId", authMiddleware, createProjectOnChain);

export default router;