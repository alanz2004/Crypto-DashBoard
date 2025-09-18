import { Response } from "express";
import { Project,ITokenHolder  } from "../models/Project";
import { AuthRequest } from "../middlewares/authMiddleware";
import mongoose from "mongoose";


export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { projectName, projectDescription, wallet } = req.body;

    if (!projectName || !projectDescription || !wallet) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const starterFiles = [
      {
        _id: new mongoose.Types.ObjectId(),
        fileName: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landing Page Blueprint</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <!-- Header -->
  <header class="header">
    <h1 class="header-title">Project Title Goes Here</h1>
    <p class="header-subtitle">A short subtitle or slogan goes here</p>
  </header>

  <!-- Features Section -->
  <section class="features">
    <div class="feature">
      <h2>Feature One</h2>
      <p>Brief description of this feature goes here.</p>
    </div>
    <div class="feature">
      <h2>Feature Two</h2>
      <p>Brief description of this feature goes here.</p>
    </div>
    <div class="feature">
      <h2>Feature Three</h2>
      <p>Brief description of this feature goes here.</p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p>© 2025 Your Company. All rights reserved.</p>
  </footer>

</body>
</html>`
      },
      {
        _id: new mongoose.Types.ObjectId(),
        fileName: "styles.css",
        language: "css",
        content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f8f9fc;
  line-height: 1.6;
}
.header {
  text-align: center;
  padding: 80px 20px 60px;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: #fff;
}
.header-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}
.header-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}
.features {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  padding: 60px 20px;
  background: #ffffff;
}
.feature {
  background: #f1f3f9;
  border-radius: 12px;
  padding: 30px;
  flex: 1 1 250px;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.feature h2 {
  margin-bottom: 10px;
  color: #4f46e5;
}
.footer {
  text-align: center;
  padding: 30px 20px;
  background: #111827;
  color: #9ca3af;
  font-size: 0.9rem;
}`
      }
    ];

    const project = await Project.create({
      projectName,
      projectDescription,
      wallet,
      projectAdmin: req.user?.id,
      files: starterFiles
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
