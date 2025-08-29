import mongoose, { Document, Schema,Types } from "mongoose";

export interface ITokenHolder {
  name: string;
  wallet: string;
  tokensHeld: number;
  _id?: Types.ObjectId;
}

export interface IProject extends Document {
  projectName: string;
  projectDescription: string;
  wallet: string;
  projectAdmin: mongoose.Types.ObjectId;
  tokenHolders: mongoose.Types.DocumentArray<ITokenHolder & Document>;
}

const tokenHolderSchema = new Schema<ITokenHolder>(
  {
    name: { type: String, required: true, trim: true },
    wallet: { type: String, required: true, trim: true },
    tokensHeld: { type: Number, required: true, default: 0 },
  },
  { _id: true } // no separate _id for each holder unless you want it
);

const projectSchema = new Schema<IProject>(
  {
    projectName: { type: String, required: true, trim: true },
    projectDescription: { type: String, required: true },
    wallet: { type: String, required: true },
    projectAdmin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tokenHolders: { type: [tokenHolderSchema], default: [] },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
