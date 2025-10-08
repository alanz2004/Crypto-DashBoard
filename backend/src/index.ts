import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './config/db.ts';

import userRoutes from './routes/userRoutes.ts';
import projectRoutes from './routes/projectRoutes.ts'
import tokenHolderRoutes from './routes/tokenHolderRoutes.ts';
import fileRoutes from "./routes/fileRoutes.ts";
import integraionRoutes from './routes/integrationsRoutes.ts';
import projectBlockchainRoutes from './routes/projectBlockchainRoutes.ts';
import teamRoutes from './routes/teamRoutes.ts';

import { initBlockchain } from './services/blockchainService.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true,               // allow cookies/authorization headers
}));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tokenholders', tokenHolderRoutes);
app.use("/api/files", fileRoutes);
app.use('/api/integrations', integraionRoutes)
app.use('/api/blockchain', projectBlockchainRoutes);
app.use('/api/team', teamRoutes);

// Root
app.get('/', (_, res) => res.send('API is running...'));

// Initialize blockchain BEFORE handling any requests
initBlockchain()
  .then(() => console.log("Blockchain ready!"))
  .catch(err => {
    console.error("Failed to initialize blockchain:", err);
    process.exit(1);
  });

// Your middleware, routes, etc.

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));