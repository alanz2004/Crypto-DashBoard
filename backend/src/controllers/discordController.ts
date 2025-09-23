// controllers/discordController.ts
import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";

import { discordClient } from "../services/discordClient"; // see bot service below
import Integration from "../models/Integration";


import axios from "axios";

export const discordCallback = async (req: AuthRequest, res: Response) => {
  try {
    const { code, state: projectId } = req.query as { code?: string; state?: string };
    if (!code || !projectId) return res.status(400).send("Missing code or state");

    const params = new URLSearchParams();
    params.append("client_id", process.env.DISCORD_CLIENT_ID!);
    params.append("client_secret", process.env.DISCORD_CLIENT_SECRET!);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.DISCORD_REDIRECT_URI!);

    const tokenRes = await axios.post("https://discord.com/api/oauth2/token", params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const accessToken = tokenRes.data.access_token;

    // Fetch guilds user manages
    const guildsRes = await axios.get("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // Return guilds to frontend so user selects which to connect (or auto-select if only one)
    // Each guild object contains id, name, owner (bool), permissions
    return res.json({ projectId, guilds: guildsRes.data });
  } catch (err) {
    console.error("Discord callback error", err);
    return res.status(500).json({ error: "Discord callback failed" });
  }
};

export const registerGuild = async (req: AuthRequest, res: Response) => {
  const { projectId, guildId, guildName } = req.body;
  if (!projectId || !guildId) return res.status(400).json({ error: "Missing fields" });

  // verify bot is in guild
  try {
    const guild = await discordClient.guilds.fetch(guildId); // will throw if not found
    if (!guild) return res.status(400).json({ error: "Bot not in guild. Ask to invite the bot." });

    const integration = await Integration.create({
      projectId,
      guildId,
      guildName: guildName || guild.name,
      connectedAt: new Date(),
    });

    return res.status(201).json({ integration });
  } catch (err) {
    console.error("Register guild error", err);
    return res.status(500).json({ error: "Failed to register guild" });
  }
};