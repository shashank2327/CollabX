import ContributionRequest from "../models/contributionRequest.model.js";
import HelpPost from "../models/helpPost.model.js";
import Contributor from "../models/contributor.model.js";

/**
 * 1️⃣ Create a contribution request
 * POST /api/requests/:helpPostId
 */
export const createContributionRequest = async (req, res) => {
  try {
    const { helpPostId } = req.params;
    const { message } = req.body;

    const helpPost = await HelpPost.findById(helpPostId);

    if (!helpPost || helpPost.status === "CLOSED") {
      return res.status(404).json({
        message: "Help post not found or already closed",
      });
    }

    // ❌ Owner cannot request their own help post
    if (helpPost.ownerId.toString() === req.user.id.toString()) {
      return res.status(400).json({
        message: "You cannot request your own help post",
      });
    }

    const existingRequest = await ContributionRequest.findOne({
      helpPostId,
      requesterId: req.user.id,
    });

    // ⛔ Already accepted → block
    if (existingRequest && existingRequest.status === "accepted") {
      return res.status(400).json({
        message: "You are already a contributor for this help post",
      });
    }

    // ⏳ Already pending → block
    if (existingRequest && existingRequest.status === "pending") {
      return res.status(400).json({
        message: "You already have a pending request for this help post",
      });
    }

    // 🔁 Re-request if rejected
    if (existingRequest && existingRequest.status === "rejected") {
      existingRequest.status = "pending";
      existingRequest.message = message;
      await existingRequest.save();

      return res.status(200).json({
        message: "Contribution request sent again",
        request: existingRequest,
      });
    }

    // ✅ Create new request
    const request = await ContributionRequest.create({
      helpPostId,
      requesterId: req.user.id,
      message,
    });

    return res.status(201).json({
      message: "Contribution request sent",
      request,
    });
  } catch (error) {
    console.error("Create contribution request error:", error);
    return res.status(500).json({
      message: "Failed to send contribution request",
    });
  }
};


/**
 * 2️⃣ Accept a contribution request
 * PATCH /api/requests/:requestId/accept
 */
export const acceptContributionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await ContributionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const helpPost = await HelpPost.findById(request.helpPostId);

    // Only owner can accept
    if (helpPost.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to accept this request",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Request is not pending",
      });
    }

    // Mark request as accepted
    request.status = "accepted";
    await request.save();

    // Create contributor
    const contributor = await Contributor.create({
      helpPostId: helpPost._id,
      userId: request.requesterId,
    });

    // Add contributor to help post
    helpPost.contributors.push(contributor._id);
    await helpPost.save();

    return res.status(200).json({
      message: "Request accepted",
      contributor,
    });
  } catch (error) {
    console.error("Accept request error:", error);
    return res.status(500).json({
      message: "Failed to accept request",
    });
  }
};

/**
 * 3️⃣ Reject a contribution request
 * PATCH /api/requests/:requestId/reject
 */
export const rejectContributionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await ContributionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const helpPost = await HelpPost.findById(request.helpPostId);

    // Only owner can reject
    if (helpPost.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to reject this request",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Request is not pending",
      });
    }

    request.status = "rejected";
    await request.save();

    return res.status(200).json({
      message: "Request rejected",
    });
  } catch (error) {
    console.error("Reject request error:", error);
    return res.status(500).json({
      message: "Failed to reject request",
    });
  }
};


/**
 * 4️⃣ Get all PENDING contribution requests for a help post
 * GET /api/requests/help-post/:helpPostId
 */
export const getRequestsForHelpPost = async (req, res) => {
  try {
    const { helpPostId } = req.params;

    const helpPost = await HelpPost.findById(helpPostId);

    if (!helpPost) {
      return res.status(404).json({
        message: "Help post not found",
      });
    }

    // Only owner can view requests
    if (helpPost.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to view requests for this help post",
      });
    }

    const requests = await ContributionRequest.find({
      helpPostId,
      status: "pending", // ✅ ONLY pending requests
    })
      .populate("requesterId", "name email githubUsername avatarUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Get requests for help post error:", error);
    return res.status(500).json({
      message: "Failed to fetch contribution requests",
    });
  }
};
