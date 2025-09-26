import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getTelegramBotInfo, registerTelegramChat } from "../controllers/telegramController";

const router = Router();

router.get("/bot-info", authMiddleware, getTelegramBotInfo);
router.post("/register/:projectId", authMiddleware, registerTelegramChat);

export default router;