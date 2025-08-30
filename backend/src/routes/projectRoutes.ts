import express from "express";
import {
  createProject,
  getMyProjects,
  getProjectById,
} from "../controllers/projectController";
import {
  getTokenHolders,
  addTokenHolder,
  updateTokenHolder,
  removeTokenHolder,
} from "../controllers/projectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Project routes
router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getMyProjects);
router.get("/:id", authMiddleware, getProjectById);

export default router;
