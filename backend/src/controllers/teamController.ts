import mongoose from "mongoose";
import type { Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.ts";
import { TeamMember } from "../models/TeamMember.ts";
import { Project } from "../models/Project.ts";


/**
 * Add a new team member to a specific project
 */
export const addTeamMember = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const { name, role, wallet, email, contribution } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Create new team member
    const newMember = new TeamMember({
      name,
      role,
      wallet,
      email,
      contribution,
      project: projectId,
    });
    await newMember.save();

    // Link member to project
    project.teamMembers.push(newMember._id as mongoose.Types.ObjectId);
    await project.save();

    res.status(201).json({
      message: "✅ Team member added successfully",
      member: newMember,
      projectId: project._id,
    });
  } catch (err: any) {
    console.error("Error adding team member:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all team members of a project
 */
export const getTeamMembers = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const members = await TeamMember.find({ projectId }).sort({ createdAt: -1 });

    res.json({ members });
  } catch (err: any) {
    console.error("Error fetching team members:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Update team member details
 */
export const updateTeamMember = async (req: AuthRequest, res: Response) => {
  try {
    const { memberId } = req.params;
    const updates = req.body;

    const updatedMember = await TeamMember.findByIdAndUpdate(memberId, updates, {
      new: true,
    });

    if (!updatedMember)
      return res.status(404).json({ message: "Team member not found" });

    res.json({
      message: "✅ Team member updated successfully",
      member: updatedMember,
    });
  } catch (err: any) {
    console.error("Error updating team member:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Remove a team member
 */
export const deleteTeamMember = async (req: AuthRequest, res: Response) => {
  try {
    const { memberId } = req.params;

    const deleted = await TeamMember.findByIdAndDelete(memberId);
    if (!deleted)
      return res.status(404).json({ message: "Team member not found" });

    res.json({ message: "🗑️ Team member removed successfully" });
  } catch (err: any) {
    console.error("Error deleting team member:", err);
    res.status(500).json({ message: err.message });
  }
};
