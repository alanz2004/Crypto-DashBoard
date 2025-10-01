import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import {
  getTokenHolders,
  addTokenHolder,
  updateTokenHolder,
  removeTokenHolder,
} from "../controllers/tokenHoldersController.ts"; // keep in same controller file

const router = express.Router();

// Routes for token holders


// Debug route
router.get("/", (req, res) => {
  console.log("TokenHolder router debug hit");
  res.json({ message: "TokenHolder router is working!" });
});

router.get("/:projectId", authMiddleware, getTokenHolders);
router.post("/:projectId", authMiddleware, addTokenHolder);
router.put("/:projectId/:holderId", authMiddleware, updateTokenHolder);
router.delete("/:projectId/:holderId", authMiddleware, removeTokenHolder);

export default router;
