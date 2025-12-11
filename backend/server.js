import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRoutes from "./routes/pollRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/polls", pollRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Start Server
app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
