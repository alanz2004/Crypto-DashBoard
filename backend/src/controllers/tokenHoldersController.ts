import type { Response } from "express";
import { Project} from "../models/Project.ts";
import type {ITokenHolder} from "../models/Project.ts"
import type { AuthRequest } from "../middlewares/authMiddleware.ts";

// 📜 Get all token holders for a project
export const getTokenHolders = async (req: AuthRequest, res: Response) => {
  try {
    console.log('fdsfsf')
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project.tokenHolders || []);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Add a token holder
export const addTokenHolder = async (req: AuthRequest, res: Response) => {
  try {
    const { name, wallet, tokensHeld } = req.body;
    const project = await Project.findOne({
      _id: req.params.projectId,
      projectAdmin: req.user!.id,
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    const newHolder: ITokenHolder = { name, wallet, tokensHeld };
    project.tokenHolders.push(newHolder);
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a token holder
export const updateTokenHolder = async (req: AuthRequest, res: Response) => {
  try {
    const { name, wallet, tokensHeld } = req.body;
    const { holderId, projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      projectAdmin: req.user!.id,
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    const holder = project.tokenHolders.id(holderId);
    if (!holder) return res.status(404).json({ error: "Token holder not found" });

    if (name) holder.name = name;
    if (wallet) holder.wallet = wallet;
    if (tokensHeld !== undefined) holder.tokensHeld = tokensHeld;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Remove a token holder
export const removeTokenHolder = async (req: AuthRequest, res: Response) => {
  try {
    const { holderId, projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      projectAdmin: req.user!.id,
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    // Find index of token holder
    const index = project.tokenHolders.findIndex(
      (h) => h._id?.toString() === holderId
    );

    if (index === -1) return res.status(404).json({ error: "Token holder not found" });

    // Remove the subdocument in-place
    project.tokenHolders.splice(index, 1);

    await project.save();

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};