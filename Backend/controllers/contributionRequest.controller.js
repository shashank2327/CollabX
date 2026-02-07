import ContributionRequest from "../models/contributionRequest.model.js";
import Contributor from "../models/contributor.model.js";
import HelpPost from "../models/helpPost.model.js";

/**
 * @desc   Send request to help on a help post
 * @route  POST /api/requests/:helpPostId
 */
export const sendRequest = async (req, res) => {
  try {
    const { helpPostId } = req.params;
    const { message } = req.body;

    const helpPost = await HelpPost.findById(helpPostId);
    if (!helpPost || helpPost.status === "closed") {
      return res.status(404).json({ message: "Help post not available" });
    }

    // Prevent owner from requesting their own post
    if (helpPost.ownerId.toString() === req.user.id.toString()) {
      return res.status(400).json({ message: "Cannot request your own post" });
    }

    const request = await ContributionRequest.create({
      helpPostId,
      requesterId: req.user.id,
      message
    });

    res.status(201).json(request);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "You have already requested for this help post"
      });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Accept contribution request (help post owner only)
 * @route  PATCH /api/requests/:requestId/accept
 */
export const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await ContributionRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const helpPost = await HelpPost.findById(request.helpPostId);
    if (helpPost.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "accepted";
    await request.save();

    await Contributor.create({
      helpPostId: helpPost._id,
      userId: request.requesterId
    });

    res.json({ message: "Request accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Reject contribution request (help post owner only)
 * @route  PATCH /api/requests/:requestId/reject
 */
export const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await ContributionRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const helpPost = await HelpPost.findById(request.helpPostId);
    if (helpPost.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Request rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get all requests for a help post (owner only)
 * @route  GET /api/requests/help-post/:helpPostId
 */
export const getRequestsForHelpPost = async (req, res) => {
  try {
    const { helpPostId } = req.params;

    const helpPost = await HelpPost.findById(helpPostId);
    if (helpPost.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const requests = await ContributionRequest.find({ helpPostId })
      .populate("requesterId", "name skills githubUsername")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
