import express from "express";
import {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getRequestsForHelpPost
} from "../controllers/contributionRequest.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:helpPostId", authMiddleware, sendRequest);
router.patch("/:requestId/accept", authMiddleware, acceptRequest);
router.patch("/:requestId/reject", authMiddleware, rejectRequest);
router.get(
  "/help-post/:helpPostId",
  authMiddleware,
  getRequestsForHelpPost
);

export default router;
