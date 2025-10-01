import express from "express";
import {
  createUser,
  loginUser,
  getUsers,
  getMe,
  deleteUser,
} from "../controllers/userController.ts";

import { authMiddleware } from '../middlewares/authMiddleware.ts';


const router = express.Router();

router.post("/", createUser);         // Create user
router.post("/login", loginUser);       // Login user
router.get("/", getUsers);              // Get all users
router.delete("/:id", deleteUser);      // Delete user
router.get('/me', authMiddleware, getMe);


export default router;
