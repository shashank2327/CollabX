import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject
} from "../controllers/project.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getAllProjects);
router.get("/:id", authMiddleware, getProjectById);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
