import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './config/db';

import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes'
import tokenHolderRoutes from './routes/tokenHolderRoutes';
import fileRoutes from "./routes/fileRoutes";
import integraionRoutes from './routes/integrationsRoutes';



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

// Root
app.get('/', (_, res) => res.send('API is running...'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));