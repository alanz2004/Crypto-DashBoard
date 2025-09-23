// models/Integration.ts (simplified)
import mongoose from "mongoose";
const IntegrationSchema = new mongoose.Schema({
  projectId: { type: mongoose.Types.ObjectId, required: true },
  platform: { type: String, default: "discord" },
  guildId: { type: String, required: true },
  guildName: String,
  connectedAt: Date,
});
export default mongoose.model("Integration", IntegrationSchema);