import express from "express";
import { discordCallback, registerGuild } from "../controllers/discordController";
import { authMiddleware } from "../middlewares/authMiddleware";



const router = express.Router();

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const DISCORD_REDIRECT = encodeURIComponent(process.env.DISCORD_REDIRECT_URI!); // must be registered in dev portal
const PERMISSIONS = "268446720"; // example permission int (send/read messages, view channels, manage messages optional). We'll explain later.

router.get("/discord/invite/:projectId",authMiddleware, (req, res) => {
  const { projectId } = req.params;
  // include identify + guilds so we can fetch user's guilds after oauth
  const url = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_REDIRECT}&response_type=code&scope=bot%20identify%20guilds&permissions=${PERMISSIONS}&state=${projectId}`;
  res.json({ url });
});

// Discord OAuth callback
router.get("/discord/callback", authMiddleware,discordCallback);

// Register a guild after the bot is invited
router.post("/discord/register", authMiddleware, registerGuild);

export default router;
