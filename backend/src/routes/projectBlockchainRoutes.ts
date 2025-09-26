import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createProjectOnChain,addMember,getMembers,addFile,getFiles } from "../controllers/projectBlockChainController";

const router = Router();

router.post(
  "/deploy/:projectId",
  authMiddleware,
  createProjectOnChain
);

// Add a member to a project
router.post("/projects/:projectId/members", authMiddleware, addMember);

// Get members of a project
router.get("/projects/:projectId/members", authMiddleware, getMembers);

// Add a file to a project
router.post("/projects/:projectId/files", authMiddleware, addFile);

// Get files of a project
router.get("/projects/:projectId/files", authMiddleware, getFiles);

export default router;