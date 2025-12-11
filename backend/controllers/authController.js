import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed
    });

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};