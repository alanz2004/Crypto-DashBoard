import express from "express";
import telegramRoutes from "./telegramRoutes";
import discordRoutes from './discordRoutes';



const router = express.Router();

router.use('/discord', discordRoutes);

router.use("/telegram", telegramRoutes);


export default router;
