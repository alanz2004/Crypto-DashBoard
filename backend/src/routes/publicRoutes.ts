import express from "express";
import { getPublicProjects } from "../controllers/publicController.ts";

const router = express.Router();

router.get("/projects", getPublicProjects);

export default router;
