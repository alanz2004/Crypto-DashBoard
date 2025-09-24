import mongoose, { Document, Schema,Types } from "mongoose";

export interface ITokenHolder {
  name: string;
  wallet: string;
  tokensHeld: number;
  _id?: Types.ObjectId;
}

export interface IFile {
  _id?: mongoose.Types.ObjectId;
  fileName: string;
  content: string;
  language: string; // e.g., "javascript", "typescript", "solidity"
}

export interface ITokenomic {
  name: string;
  value: number;
}



export interface IProject extends Document {
  projectName: string;
  projectDescription: string;
  wallet: string;
  projectAdmin: mongoose.Types.ObjectId;
  tokenHolders: mongoose.Types.DocumentArray<ITokenHolder & Document>;
  files: IFile[];
  tokenomics: ITokenomic[];

}

const tokenHolderSchema = new Schema<ITokenHolder>(
  {
    name: { type: String, required: true, trim: true },
    wallet: { type: String, required: true, trim: true },
    tokensHeld: { type: Number, required: true, default: 0 },
  },
  { _id: true } // no separate _id for each holder unless you want it
);

const fileSchema = new Schema<IFile>(
  {
    fileName: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    language: { type: String, required: true },
  },
  { timestamps: true, _id: true }

);

const TokenomicSchema = new Schema<ITokenomic>({
  name: { type: String, required: true },
  value: { type: Number, required: true },
});


const projectSchema = new Schema<IProject>(
  {
    projectName: { type: String, required: true, trim: true },
    projectDescription: { type: String, required: true },
    wallet: { type: String, required: true },
    projectAdmin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tokenHolders: { type: [tokenHolderSchema], default: [] },
    files: [fileSchema],
    tokenomics: [TokenomicSchema],

  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
