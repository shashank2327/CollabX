import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createHelpPost,
  getMyOpenHelpPosts,
  getMyClosedHelpPosts,
  getHelpPostById,
  closeHelpPost,
} from "../controllers/helpPost.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createHelpPost);
router.get("/my/open", authMiddleware, getMyOpenHelpPosts);
router.get("/my/closed", authMiddleware, getMyClosedHelpPosts);
router.get("/:id", getHelpPostById);
router.patch("/:id/close", authMiddleware, closeHelpPost);

export default router;
