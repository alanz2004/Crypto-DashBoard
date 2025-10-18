import type { Request, Response } from "express";
import { Project } from "../models/Project.ts";

export const getPublicProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({})
      .select("projectName projectDescription contractAddress createdAt") // only safe fields
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (err: any) {
    console.error("Error fetching public projects:", err);
    res.status(500).json({ message: err.message });
  }
};
