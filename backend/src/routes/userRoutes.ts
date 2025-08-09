import express from "express";
import {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);         // Create user
router.post("/login", loginUser);       // Login user
router.get("/", getUsers);              // Get all users
router.delete("/:id", deleteUser);      // Delete user

export default router;
