import { Router } from "express";
import {
  addFile,
  getFile,
  getAllFiles,
  updateFile,
  deleteFile,
  addSectionToLandingPage,
  createLandingPage
} from "../controllers/fileController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// 📌 Add a new file to a project
router.post("/:projectId/files", authMiddleware, addFile);

// 📌 Get all files of a project
router.get("/:projectId", authMiddleware, getAllFiles);

// 📌 Get a single file by ID
router.get("/:projectId/:fileId", authMiddleware, getFile);

// 📌 Update a file by ID
router.put("/:projectId/:fileId", authMiddleware, updateFile);

// 📌 Delete a file by ID
router.delete("/:projectId/:fileId", authMiddleware, deleteFile);

router.post("/:projectId/landing/add-section", authMiddleware, addSectionToLandingPage);

router.post("/:projectId/createLandingPage", authMiddleware, createLandingPage);



export default router;