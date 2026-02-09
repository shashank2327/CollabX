import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createHelpPost,
  getMyOpenHelpPosts,
  getMyClosedHelpPosts,
  getHelpPostById,
  closeHelpPost,
  getOpenHelpPostsFeed,
  deleteHelpPost,
  getMyContributedPosts
} from "../controllers/helpPost.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createHelpPost);

router.get("/feed", authMiddleware, getOpenHelpPostsFeed);
router.get("/my/open", authMiddleware, getMyOpenHelpPosts);
router.get("/my/closed", authMiddleware, getMyClosedHelpPosts);
router.get("/my/contributions", authMiddleware, getMyContributedPosts);

router.get("/:id", getHelpPostById);
router.patch("/:id/close", authMiddleware, closeHelpPost);
router.delete("/:id", authMiddleware, deleteHelpPost);

export default router;
