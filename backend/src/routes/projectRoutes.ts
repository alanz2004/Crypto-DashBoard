import express from "express";
import {
  createProject,
  getMyProjects,
  getProjectById,
  addTokenomics, 
  getTokenomics 
} from "../controllers/projectController.ts";

import { authMiddleware } from "../middlewares/authMiddleware.ts";

const router = express.Router();

// Project routes
router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getMyProjects);
router.get("/:id", authMiddleware, getProjectById);

// Add or update tokenomics
router.post("/:projectId/tokenomics", authMiddleware, addTokenomics);

// Get tokenomics
router.get("/:projectId/tokenomics", authMiddleware, getTokenomics);


export default router;
