import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import {
  addTeamMember,
  getTeamMembers,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.ts";

const router = express.Router();

// ✅ Add a new team member
router.post("/:projectId", authMiddleware, addTeamMember);

// ✅ Get all team members of a project
router.get("/:projectId", authMiddleware, getTeamMembers);

// ✅ Update a specific team member
router.put("/member/:memberId", authMiddleware, updateTeamMember);

// ✅ Delete a specific team member
router.delete("/member/:memberId", authMiddleware, deleteTeamMember);

export default router;
