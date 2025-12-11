import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// POST /api/admin/create
router.post("/create", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "admin", // force role as admin
    });

    res.status(201).json({ message: "Admin created successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
