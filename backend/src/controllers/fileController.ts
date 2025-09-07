// controllers/fileController.ts
import { Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Project } from "../models/Project";

// 📌 Add a new file to a project
export const addFile = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const { fileName, content, language } = req.body;

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.files.push({
      _id: new mongoose.Types.ObjectId(),
      fileName,
      content,
      language,
    });

    await project.save();
    res.status(201).json(project.files);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Get all files of a project
export const getAllFiles = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project.files);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Get a single file by ID
export const getFile = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, fileId } = req.params;

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const file = project.files.find(f => f._id?.toString() === fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json(file);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Update a file by ID
export const updateFile = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, fileId } = req.params;
    const { fileName, content, language } = req.body;

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const file = project.files.find(f => f._id?.toString() === fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    if (fileName) file.fileName = fileName;
    if (content) file.content = content;
    if (language) file.language = language;

    await project.save();
    res.json(file);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Delete a file by ID
export const deleteFile = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, fileId } = req.params;

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.files = project.files.filter(f => f._id?.toString() !== fileId);
    await project.save();

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};