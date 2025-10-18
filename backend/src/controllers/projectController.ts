import type { Response } from "express";
import { Project} from "../models/Project.ts";
import type {ITokenHolder} from "../models/Project.ts"
import type { AuthRequest } from "../middlewares/authMiddleware.ts";
import mongoose from "mongoose";


export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { projectName, projectDescription, wallet } = req.body;

    if (!projectName || !projectDescription || !wallet) {
      return res.status(400).json({ error: "All fields are required" });
    }

   
    const project = await Project.create({
      projectName,
      projectDescription,
      wallet,
      projectAdmin: req.user?.id,
      files: []
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all projects by logged-in user
export const getMyProjects = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await Project.find({ projectAdmin: req.user?.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get single project
export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ error: "Project not found" });

    if (project.projectAdmin.toString() !== req.user?.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// 📜 Get all token holders for a project
export const getTokenHolders = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project.tokenHolders || []);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Add a token holder
export const addTokenHolder = async (req: AuthRequest, res: Response) => {
  try {
    const { name, wallet, tokensHeld } = req.body;
    const project = await Project.findOne({
      _id: req.params.projectId,
      projectAdmin: req.user!.id,
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    const newHolder: ITokenHolder = { name, wallet, tokensHeld };
    project.tokenHolders.push(newHolder);
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a token holder
export const updateTokenHolder = async (req: AuthRequest, res: Response) => {
  try {
    const { name, wallet, tokensHeld } = req.body;
    const { holderId, projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      projectAdmin: req.user!.id,
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    const holder = project.tokenHolders.id(holderId);
    if (!holder) return res.status(404).json({ error: "Token holder not found" });

    if (name) holder.name = name;
    if (wallet) holder.wallet = wallet;
    if (tokensHeld !== undefined) holder.tokensHeld = tokensHeld;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Remove a token holder
export const removeTokenHolder = async (req: AuthRequest, res: Response) => {
  try {
    const { holderId, projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      projectAdmin: req.user!.id,
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    // Find index of token holder
    const index = project.tokenHolders.findIndex(
      (h) => h._id?.toString() === holderId
    );

    if (index === -1) return res.status(404).json({ error: "Token holder not found" });

    // Remove the subdocument in-place
    project.tokenHolders.splice(index, 1);

    await project.save();

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Add or update tokenomics
export const addTokenomics = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const tokenomics = req.body.tokenomics; // expect array of { name, value }

    if (!Array.isArray(tokenomics)) {
      return res.status(400).json({ message: "Tokenomics must be an array" });
    }

    // Optional validation: values must add up to 100
    const total = tokenomics.reduce((sum, t) => sum + t.value, 0);
    if (total !== 100) {
      return res.status(400).json({ message: "Tokenomics values must add up to 100" });
    }

    // ✅ Find project and check ownership
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.projectAdmin.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this project" });
    }

    project.tokenomics = tokenomics;
    await project.save();

    return res.status(200).json({
      message: "Tokenomics updated successfully",
      tokenomics: project.tokenomics,
    });
  } catch (error) {
    console.error("Add Tokenomics Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get tokenomics
export const getTokenomics = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(projectId).select("tokenomics");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({ tokenomics: project.tokenomics });
  } catch (error) {
    console.error("Get Tokenomics Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Controller: Get wallet analytics (static demo data)
export const trackWalletActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    // 🧩 Find the project and get its wallet address
    const project = await Project.findById(projectId).select("wallet");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const walletAddress = project.wallet;
    if (!walletAddress) {
      return res
        .status(400)
        .json({ message: "Project does not have a connected wallet" });
    }

    // 🚀 Mocked analytics data for now
    const walletData = {
      wallet: walletAddress,
      transactionCount: 842, // demo number
      totalValueUSD: 157_300.42, // demo total USD value
      avgTransactionValueUSD: 186.86,
      activeDays: 42,
      adoptionScore: 87, // custom metric 0–100
      growth: {
        transactionGrowth: 14.8, // percentage
        valueGrowth: 9.6,
        trend: "up", // "up", "down", or "neutral"
      },
      lastUpdated: new Date().toISOString(),
    };

    // ✅ Return the static data to frontend
    return res.status(200).json(walletData);
  } catch (error) {
    console.error("Track Wallet Activity Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Mock data for now
export const getTokenMarketData = async (req: AuthRequest, res: Response) => {
  try {
    const  tokenName = 'mytoken';

    // Mock example data (you’ll later replace this with real API fetch)
    const mockData = {
      tokenName,
      currentPrice: 0.0023,
      priceChange24h: 12.5,
      marketCap: 14500000,
      liquidity: 320000,
      volume24h: 450000,
      sources: [
        { name: "Raydium", url: "https://raydium.io" },
        { name: "Birdeye", url: "https://birdeye.so" },
        { name: "Meteora", url: "https://meteora.ag" },
      ],
      lastUpdated: new Date().toISOString(),
    };

    return res.status(200).json(mockData);
  } catch (error) {
    console.error("Get Token Market Data Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
