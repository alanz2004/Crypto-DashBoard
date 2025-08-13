import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  projectName: string;
  projectDescription: string;
  wallet: string;
  projectAdmin: mongoose.Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    projectName: { type: String, required: true, trim: true },
    projectDescription: { type: String, required: true },
    wallet: { type: String, required: true },
    projectAdmin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
