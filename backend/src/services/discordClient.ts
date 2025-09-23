import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

export const discordClient = new Client({
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.GuildMembers,    // privileged: enable in dev portal
                    GatewayIntentBits.MessageContent,  // privileged: read message content if needed
                ],
                partials: [Partials.Message, Partials.Channel, Partials.Reaction],
                });

                discordClient.once("ready", () => {
                console.log(`Discord bot ready: ${discordClient.user?.tag}`);
                });

                // When the bot is added to a new server
                discordClient.on("guildCreate", async (guild) => {
                console.log("Bot added to guild:", guild.id, guild.name);
                // optional: notify admin or create default integration record if you stored state via `state` earlier
                });

                // Track messages (example: increment counter in DB for project)
                discordClient.on("messageCreate", async (message) => {
                if (message.author.bot) return;
                const guildId = message.guild?.id;
                if (!guildId) return;

                // map guildId -> projectId (query Integration)
                // increment a "messages" counter for that guild in your DB
                });

                // Track member joins/leaves:
                discordClient.on("guildMemberAdd", (member) => {
                const guildId = member.guild.id;
                // update DB: members++
                });
                discordClient.on("guildMemberRemove", (member) => {
                const guildId = member.guild.id;
                // update DB: members--
});

discordClient.login(process.env.DISCORD_BOT_TOKEN);
