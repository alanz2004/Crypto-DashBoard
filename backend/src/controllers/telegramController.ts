import type { Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.ts";
import { Project} from "../models/Project.ts";


import axios from "axios";

const TELEGRAM_API = "https://api.telegram.org";



export const getTelegramBotInfo = async (req: AuthRequest, res: Response) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN!;
    const response = await axios.get(`${TELEGRAM_API}/bot${token}/getMe`);
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Telegram Bot Info Error:", err);
    res.status(500).json({ error: "Failed to get bot info" });
  }
};

// Register Telegram chat (for project)
export const registerTelegramChat = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const { chatId } = req.body;

    if (!chatId) return res.status(400).json({ error: "chatId is required" });

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) return res.status(404).json({ error: "Project not found" });

    project.telegramChatId = chatId; // Add field to project model
    await project.save();

    res.status(200).json({ message: "Telegram chat registered successfully" });
  } catch (err) {
    console.error("Register Telegram Chat Error:", err);
    res.status(500).json({ error: "Failed to register Telegram chat" });
  }
};