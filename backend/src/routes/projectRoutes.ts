import express from "express";
import {
  createProject,
  getMyProjects,
  getProjectById,
  addTokenomics, 
  getTokenomics ,
  trackWalletActivity,
  getTokenMarketData
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

router.get("/:projectId/trackWallet", authMiddleware, trackWalletActivity);

router.get("/:projectId/marketokendata", authMiddleware, getTokenMarketData);




export default router;
