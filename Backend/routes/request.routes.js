import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createContributionRequest,
  acceptContributionRequest,
  rejectContributionRequest,
  getRequestsForHelpPost,
} from "../controllers/contributionRequest.controller.js";

const router = express.Router();

router.post("/:helpPostId", authMiddleware, createContributionRequest);
router.get("/help-post/:helpPostId", authMiddleware, getRequestsForHelpPost);
router.patch("/:requestId/accept", authMiddleware, acceptContributionRequest);
router.patch("/:requestId/reject", authMiddleware, rejectContributionRequest);

export default router;
