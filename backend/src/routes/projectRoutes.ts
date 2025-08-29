import express from "express";
import { createProject, getMyProjects, getProjectById,
    getTokenHolders,
    addTokenHolder,
  updateTokenHolder,
  removeTokenHolder, } from "../controllers/projectController";
import { authMiddleware  } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware , createProject);
router.get("/", authMiddleware , getMyProjects);
router.get("/:id", authMiddleware , getProjectById);
router.get("/:projectId/token-holders", authMiddleware, getTokenHolders);
router.post("/:projectId/token-holders", authMiddleware, addTokenHolder);
router.put("/:projectId/token-holders/:holderId", authMiddleware, updateTokenHolder);
router.delete("/:projectId/token-holders/:holderId", authMiddleware, removeTokenHolder);


export default router;
