import express from "express";
import {
  createPoll,
  getPolls,
  getPoll,
  deletePoll,
  votePoll,
  updatePoll,
  closePoll 
} from "../controllers/pollController.js";

import { protect, admin } from "../middleware/auth.js"; // <-- import auth middleware

const router = express.Router();

// Admin only
router.post("/", protect, admin, createPoll);
router.put("/:id", protect, admin, updatePoll);
router.put("/:id/close", protect, admin, closePoll);
router.delete("/:id", protect, admin, deletePoll);

// Users
router.get("/", protect, getPolls);
router.get("/:id", protect, getPoll);
router.post("/:id/vote", protect, votePoll);

export default router;
