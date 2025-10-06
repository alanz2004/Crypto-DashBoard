import mongoose, { Schema, Document } from "mongoose";

export interface ITeamMember extends Document {
  projectId: mongoose.Types.ObjectId;
  name: string;
  role: string;
  walletAddress?: string;
  tokenOwnership?: number; // percentage 0–100
  socials?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  joinedAt?: Date;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    name: { type: String, required: true },
    role: { type: String, required: true },
    walletAddress: { type: String },
    tokenOwnership: { type: Number, min: 0, max: 100, default: 0 },
    socials: {
      linkedin: { type: String },
      twitter: { type: String },
      website: { type: String },
    },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const TeamMember = mongoose.model<ITeamMember>("TeamMember", teamMemberSchema);
