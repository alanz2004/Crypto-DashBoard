import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { deployProjectContract,compileContract,provider,signer } from "../services/blockchainService";
import { Contract, ContractFactory } from "ethers";
import { Project } from "../models/Project";

export const createProjectOnChain = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Deploy contract for this project
    const deployed = await deployProjectContract(project.projectName, req.user!.id);

    // Save contract address to DB
    project.contractAddress = deployed.address;
    await project.save();

    return res.json({
      message: "Project blockchain deployed",
      contractAddress: deployed.address,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to deploy contract" });
  }
};

// Add a member to the project contract
export const addMember = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, member } = req.body;
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    const { abi } = compileContract();
    const contract = new Contract(project.contractAddress, abi, signer);

    const tx = await contract.addMember(member);
    await tx.wait();

    res.json({ message: "Member added successfully", txHash: tx.hash });
  } catch (err: any) {
    console.error("Error adding member:", err);
    res.status(500).json({ error: err.message });
  }
};



// Add a file to the project contract
export const addFile = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, fileHash } = req.body;
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    const { abi } = compileContract();
    const contract = new Contract(project.contractAddress, abi, signer);

    const tx = await contract.addFile(fileHash);
    await tx.wait();

    res.json({ message: "File added successfully", txHash: tx.hash });
  } catch (err: any) {
    console.error("Error adding file:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get files from the project contract
export const getFiles = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    const { abi } = compileContract();
    const contract = new Contract(project.contractAddress, abi, provider);

    const files = await contract.getFiles();
    res.json({ files });
  } catch (err: any) {
    console.error("Error reading files:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ New: Get members from the project contract
export const getMembers = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    const { abi } = compileContract();
    const contract = new Contract(project.contractAddress, abi, provider);

    const members = await contract.getMembers();
    res.json({ members });
  } catch (err: any) {
    console.error("Error reading members:", err);
    res.status(500).json({ error: err.message });
  }
};