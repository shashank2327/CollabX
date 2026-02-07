import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import helpPostRoutes from "./routes/helpPost.routes.js";
import requestRoutes from "./routes/request.routes.js";
import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());

app.use(cors(
    {
        origin: "http://localhost:5173"
    }
));

// =======================
// API Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/help-posts", helpPostRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB();

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
