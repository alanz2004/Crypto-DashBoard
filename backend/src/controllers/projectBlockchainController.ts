import type { Request, Response } from "express";
import { Project } from "../models/Project.ts";
import { getSigner, deployProjectContract } from "../services/blockchainService.ts";

export const createProjectOnChain = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const signer = getSigner();
    const adminAddress = await signer.getAddress();

    console.log("Deploying contract for project:", project.projectName);
    const contract = await deployProjectContract(project.projectName, adminAddress);

    // ✅ In ethers v6, use contract.target instead of contract.address
    return res.json({
      message: "✅ Project deployed on Hardhat",
      contractAddress: contract.target,
      admin: adminAddress,
    });
  } catch (err: any) {
    console.error("Error deploying project:", err);
    res.status(500).json({ message: err.message });
  }
};