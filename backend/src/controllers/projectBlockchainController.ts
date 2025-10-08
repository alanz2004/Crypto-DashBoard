import type {Response } from "express";
import { Project } from "../models/Project.ts";
import { Contract } from "../models/Contract.ts";
import { getSigner, deployProjectContract } from "../services/blockchainService.ts";

import type { AuthRequest } from "../middlewares/authMiddleware.ts";


export const createProjectOnChain = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const signer = getSigner();
    const adminAddress = await signer.getAddress();

    console.log("Deploying contract for project:", project.projectName);
    const contract = await deployProjectContract(project.projectName, adminAddress);

    // ⚙️ Save all details to DB
    const savedContract = await Contract.create({
      projectId,
      name: project.projectName,
      address: contract.target, // ethers v6 uses .target instead of .address
      deployer: adminAddress,
      network: "Hardhat",
      abi: contract.interface.fragments,
      bytecode: contract.deploymentTransaction()?.data || "",
      status: "active",
      transactionCount: 0,
      deploymentDate: new Date(),
    });

    await savedContract.save();

    return res.json({
      message: "✅ Project deployed on Hardhat",
      contract: savedContract,
    });
  } catch (err: any) {
    console.error("Error deploying project:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get contracts by project
export const getContractsByProject = async (req: AuthRequest, res: Response) => {
  try {
    const contracts = await Contract.find({
      projectId: req.params.projectId,
    }).sort({ createdAt: -1 });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contracts" });
  }
};

// Get a single contract
export const getContractById = async (req: AuthRequest, res: Response) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ message: "Contract not found" });
    res.json(contract);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contract" });
  }
};

// Update contract status (for example, mark as inactive)
export const updateContractStatus = async (req: AuthRequest, res: Response) => {
  try {
    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(contract);
  } catch (error) {
    res.status(500).json({ message: "Failed to update contract status" });
  }
};

