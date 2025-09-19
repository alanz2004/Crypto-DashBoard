import { Router } from "express";
import {
  addFile,
  getFile,
  getAllFiles,
  updateFile,
  deleteFile,
  addSectionToLandingPage
} from "../controllers/fileController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// 📌 Add a new file to a project
router.post("/:projectId/files", authMiddleware, addFile);

// 📌 Get all files of a project
router.get("/:projectId/files", authMiddleware, getAllFiles);

// 📌 Get a single file by ID
router.get("/:projectId/files/:fileId", authMiddleware, getFile);

// 📌 Update a file by ID
router.put("/:projectId/files/:fileId", authMiddleware, updateFile);

// 📌 Delete a file by ID
router.delete("/:projectId/files/:fileId", authMiddleware, deleteFile);

router.post("/:projectId/files/landing/add-section", authMiddleware, addSectionToLandingPage);


export default router;