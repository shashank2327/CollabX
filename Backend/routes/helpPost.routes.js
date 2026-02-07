import express from "express";
import {
  createHelpPost,
  getAllHelpPosts,
  getHelpPostById,
  closeHelpPost
} from "../controllers/helpPost.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createHelpPost);
router.get("/", authMiddleware, getAllHelpPosts);
router.get("/:id", authMiddleware, getHelpPostById);
router.patch("/:id/close", authMiddleware, closeHelpPost);

export default router;
