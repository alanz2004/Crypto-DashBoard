import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';

import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes'
import tokenHolderRoutes from './routes/tokenHolderRoutes';
import fileRoutes from "./routes/fileRoutes";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tokenholders', tokenHolderRoutes);
app.use("/api/files", fileRoutes);


// Root
app.get('/', (_, res) => res.send('API is running...'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));