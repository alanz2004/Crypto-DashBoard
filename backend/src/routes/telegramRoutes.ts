import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { getTelegramBotInfo, registerTelegramChat } from "../controllers/telegramController.ts";

const router = Router();

router.get("/bot-info", authMiddleware, getTelegramBotInfo);
router.post("/register/:projectId", authMiddleware, registerTelegramChat);

export default router;