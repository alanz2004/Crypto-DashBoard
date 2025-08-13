import { Response } from "express";
import { Project } from "../models/Project";
import { AuthRequest } from "../middlewares/authMiddleware";

// Create Project
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { projectName, projectDescription, wallet } = req.body;

    if (!projectName || !projectDescription || !wallet) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const project = await Project.create({
      projectName,
      projectDescription,
      wallet,
      projectAdmin: req.user?.id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all projects by logged-in user
export const getMyProjects = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await Project.find({ projectAdmin: req.user?.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get single project
export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ error: "Project not found" });

    if (project.projectAdmin.toString() !== req.user?.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
