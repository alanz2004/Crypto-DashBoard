import mongoose, { Schema, Document } from "mongoose";

export interface IContract extends Document {
  projectId: mongoose.Types.ObjectId;
  name: string;
  address: string;
  deployer: string;
  network: string;
  abi: any;
  bytecode?: string;
  status: "active" | "inactive";
  transactionCount: number;
  deploymentDate: Date;
}

const ContractSchema: Schema = new Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    deployer: { type: String, required: true },
    network: { type: String, default: "Hardhat" },
    abi: { type: Array, required: true },
    bytecode: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    transactionCount: { type: Number, default: 0 },
    deploymentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Contract = mongoose.model<IContract>("Contract", ContractSchema);
