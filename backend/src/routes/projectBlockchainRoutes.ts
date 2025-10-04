import { Router } from "express";
import { createProjectOnChain, getContractsByProject,getContractById,updateContractStatus} from "../controllers/projectBlockchainController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";


const router = Router();

// POST /api/projects/:projectId/deploy
router.post("/deploy/:projectId", authMiddleware, createProjectOnChain);

router.get("/project/:projectId",authMiddleware, getContractsByProject);

// GET - Single contract by ID
router.get("/:id", authMiddleware, getContractById);

// PATCH - Update contract status
router.patch("/:id/status", authMiddleware, updateContractStatus);

export default router;