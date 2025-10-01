import express from "express";
import telegramRoutes from "./telegramRoutes.ts";
import discordRoutes from './discordRoutes.ts';



const router = express.Router();

router.use('/discord', discordRoutes);

router.use("/telegram", telegramRoutes);


export default router;
