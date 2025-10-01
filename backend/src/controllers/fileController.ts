// controllers/fileController.ts
import type { Response } from "express";
import mongoose from "mongoose";
import type { AuthRequest } from "../middlewares/authMiddleware.ts";
import { Project } from "../models/Project.ts";

// 📌 Add a new file to a project
export const addFile = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const { fileName, content, language } = req.body;

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.files.push({
      _id: new mongoose.Types.ObjectId(),
      fileName,
      content,
      language,
    });

    await project.save();
    res.status(201).json(project.files);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Get all files of a project
export const getAllFiles = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project.files);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Get a single file by ID
export const getFile = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, fileId } = req.params;

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const file = project.files.find(f => f._id?.toString() === fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json(file);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Update a file by ID
export const updateFile = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, fileId } = req.params;
    const { fileName, content, language } = req.body;

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const file = project.files.find(f => f._id?.toString() === fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    if (fileName) file.fileName = fileName;
    if (content) file.content = content;
    if (language) file.language = language;

    await project.save();
    res.json(file);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Delete a file by ID
export const deleteFile = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, fileId } = req.params;

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.files = project.files.filter(f => f._id?.toString() !== fileId);
    await project.save();

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Insert section to landing page
export const addSectionToLandingPage = async (req: AuthRequest, res: Response) => {
   try {
    const { projectId } = req.params;
    const { htmlContent } = req.body;

    

    

    if (!htmlContent) {
      return res.status(400).json({ error: "htmlContent is required" });
    }

    const project = await Project.findOne({ _id: projectId, projectAdmin: req.user?.id });
    if (!project) {
      
      return res.status(404).json({ error: "Project not found" });
    }

   
 

    const landingFile = project.files.find(f => f.fileName === "index.html");
    if (!landingFile) {
      return res.status(404).json({ error: "Landing page file not found" });
    }


    const insertIndex = landingFile.content.lastIndexOf("</footer>");
    if (insertIndex === -1) {
      return res.status(400).json({ error: "Landing page file is missing a <footer> element" });
    }

    const sectionHtml = `<section class="landing-section">\n${htmlContent}\n</section>\n`;

    const updatedHtml =
      landingFile.content.slice(0, insertIndex) +
      `\n  ${sectionHtml}` +
      landingFile.content.slice(insertIndex);

    landingFile.content = updatedHtml;

    await project.save();

    res.status(200).json({ message: "Section added successfully", updatedHtml });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create Landing Page
export const createLandingPage = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const { projectName, projectDescription, teamMembers } = req.body;

    if (!projectName || !projectDescription || !teamMembers) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const project = await Project.findOne({
      _id: projectId,
      projectAdmin: req.user?.id,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Build HTML content
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName} - Landing Page</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <!-- Header -->
  <header class="header">
    <h1 class="header-title">${projectName}</h1>
    <p class="header-subtitle">${projectDescription}</p>
  </header>

  <!-- Features Section -->
  <section class="features">
    <div class="feature">
      <h2>🚀 Innovation</h2>
      <p>Cutting-edge solutions powered by blockchain technology.</p>
    </div>
    <div class="feature">
      <h2>🌐 Community</h2>
      <p>Building a strong and engaged ecosystem around ${projectName}.</p>
    </div>
    <div class="feature">
      <h2>🔒 Security</h2>
      <p>Smart, secure, and transparent tokenomics for startups.</p>
    </div>
  </section>

  <!-- Team Section -->
  <section class="team">
    <h2>Meet the Team</h2>
    <div class="team-members">
      ${teamMembers
        .map(
          (member: string) => `
        <div class="team-member">
          <div class="avatar"></div>
          <p>${member}</p>
        </div>`
        )
        .join("")}
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p>© ${new Date().getFullYear()} ${projectName}. All rights reserved.</p>
  </footer>

</body>
</html>`;

    // Build CSS content
    const cssContent = `
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #0b0f19; /* space black */
  color: #f1f5f9; /* cool white */
}

.header {
  text-align: center;
  padding: 50px 20px;
}

.header-title {
  font-size: 2.5rem;
  color: #6c5ce7; /* cosmic purple */
}

.header-subtitle {
  font-size: 1.2rem;
  color: #00bcd4; /* electric blue */
}

.features {
  display: flex;
  justify-content: space-around;
  padding: 40px 20px;
  gap: 20px;
  flex-wrap: wrap;
}

.feature {
  background: #2d3748; /* steel grey */
  padding: 20px;
  border-radius: 12px;
  flex: 1;
  min-width: 250px;
  text-align: center;
  box-shadow: 0 0 12px rgba(108,92,231, 0.4); /* purple glow */
}

.team {
  padding: 40px 20px;
  text-align: center;
}

.team-members {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.team-member {
  background: #2d3748;
  padding: 15px;
  border-radius: 12px;
  width: 150px;
  box-shadow: 0 0 12px rgba(0,188,212, 0.4); /* electric blue glow */
}

.team-member .avatar {
  width: 80px;
  height: 80px;
  background: #6c5ce7;
  border-radius: 50%;
  margin: 0 auto 10px;
}

.footer {
  text-align: center;
  padding: 20px;
  background: #0b0f19;
  border-top: 1px solid #2d3748;
}
`;

    // Push landing page files into project.files
    project.files.push(
      {
        _id: new mongoose.Types.ObjectId(),
        fileName: "index.html",
        language: "html",
        content: htmlContent,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        fileName: "styles.css",
        language: "css",
        content: cssContent,
      }
    );

    await project.save();

    res.status(201).json({ message: "Landing page created successfully", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const createRaisingSection = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const { fundraisingRounds } = req.body; // already generated on frontend

    if (!Array.isArray(fundraisingRounds) || fundraisingRounds.length === 0) {
      return res.status(400).json({ error: "fundraisingRounds array is required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // === Step 1: Build Raising Section HTML ===
    const htmlContent = `
  <h2 class="raising-title">🚀 Fundraising Rounds</h2>
  <div class="raising-container">
    ${fundraisingRounds
      .map(
        (round, index) => `
      <div class="raising-card">
        <h3>${round.name}</h3>
        <p><strong>Raise:</strong> $${round.raise.toLocaleString()}</p>
        <p><strong>Token %:</strong> ${round.tokenPercent}%</p>
        <p><strong>Price (USD/token):</strong> $${round.price}</p>
        <p><strong>Cliff:</strong> ${round.cliff}</p>
        <p><strong>Vesting:</strong> ${round.vesting}</p>

        <label>ETH to invest:</label>
        <input type="number" min="0" step="0.01" class="eth-input" data-price="${round.price}" placeholder="0.0" />

        <p>Tokens you will receive: <span class="token-amount">0</span></p>

        <button class="wallet-btn" data-round-index="${index}">💰 Invest with MetaMask</button>
      </div>`
      )
      .join("\n")}
  </div>

  <script>
    // Update token amount as user types
    document.querySelectorAll('.eth-input').forEach(input => {
      input.addEventListener('input', e => {
        const ethAmount = parseFloat(e.target.value) || 0;
        const tokenPrice = parseFloat(e.target.dataset.price);
        const tokenAmount = (ethAmount * 3000 / tokenPrice).toFixed(2); 
        // Assume ETH price = $3000 for example, you can fetch dynamically later
        e.target.closest('.raising-card').querySelector('.token-amount').textContent = tokenAmount;
      });
    });

    // MetaMask Invest button
    document.querySelectorAll('.wallet-btn').forEach(btn => {
      btn.addEventListener('click', async e => {
        if (!window.ethereum) {
          alert('MetaMask is not installed!');
          return;
        }
        const card = e.target.closest('.raising-card');
        const ethInput = card.querySelector('.eth-input');
        const ethValue = parseFloat(ethInput.value);
        if (!ethValue || ethValue <= 0) {
          alert('Enter a valid ETH amount');
          return;
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const from = accounts[0];

        try {
          const tx = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
              from,
              to: ${project.wallet}, // replace with project wallet
              value: (ethValue * 1e18).toString(16), // convert ETH to wei in hex
            }],
          });
          alert('Transaction sent! Tx hash: ' + tx);
        } catch (err) {
          console.error(err);
          alert('Transaction failed: ' + err.message);
        }
      });
    });
  </script>
`;

 // === Step 2: Add CSS for the section ===
    const cssContent = `
      <style>
      .raising-container { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 20px; }
      .raising-card { background: linear-gradient(135deg, #0f172a, #071129); border-radius: 16px; padding: 20px; flex: 1 1 300px; max-width: 400px; box-shadow: 0 8px 20px rgba(0,0,0,0.5); color: #fff; display: flex; flex-direction: column; gap: 12px; transition: transform 0.2s ease; }
      .raising-card:hover { transform: translateY(-5px); }
      .raising-card h3 { font-size: 20px; font-weight: 700; margin-bottom: 5px; }
      .raising-card p { font-size: 14px; line-height: 1.4; }
      .raising-card .eth-input { padding: 8px 10px; border-radius: 8px; border: 1px solid #4a4a4a; background-color: #0b0f1e; color: #fff; width: 100%; box-sizing: border-box; }
      .raising-card .token-amount { font-weight: 600; color: #ff8c42; }
      .raising-card .wallet-btn { margin-top: 10px; padding: 10px 15px; font-size: 16px; font-weight: 600; border-radius: 10px; border: none; cursor: pointer; background: linear-gradient(90deg, #4a00e0, #8e2de2); color: #fff; transition: all 0.2s ease; }
      .raising-card .wallet-btn:hover { transform: scale(1.05); opacity: 0.9; }
      @media (max-width: 768px) { .raising-container { flex-direction: column; gap: 15px; align-items: center; } .raising-card { max-width: 90%; } }
      .raising-title { font-size: 28px; font-weight: 800; text-align: center; background: linear-gradient(90deg, #8e2de2, #4a00e0, #ff4e50, #ff758c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px; }
      </style>
    `;

    // === Step 2: Insert into landing page ===
    const landingFile = project.files.find((f: any) => f.fileName === "index.html");
    if (!landingFile) {
      return res.status(404).json({ error: "Landing page file not found" });
    }

    const insertIndex = landingFile.content.lastIndexOf("</footer>");
    if (insertIndex === -1) {
      return res.status(400).json({ error: "Landing page file is missing a <footer> element" });
    }

    const sectionHtml = `${cssContent}\n<section class="landing-section">\n${htmlContent}\n</section>\n`;

    const updatedHtml =
      landingFile.content.slice(0, insertIndex) +
      `\n  ${sectionHtml}` +
      landingFile.content.slice(insertIndex);

    landingFile.content = updatedHtml;

    await project.save();

    res.status(200).json({ message: "Raising section created successfully" });
  } catch (error) {
    console.error("Error creating raising section:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};