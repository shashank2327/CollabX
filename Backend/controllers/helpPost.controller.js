import HelpPost from "../models/helpPost.model.js";
import ContributionRequest from "../models/contributionRequest.model.js";
import Contributor from "../models/contributor.model.js";

/**
 * 1️⃣ Create a help post
 * POST /api/help-posts
 */
export const createHelpPost = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      githubRepoUrl,
      expectedContribution,
    } = req.body;

    if (!title || !description || !techStack || techStack.length === 0) {
      return res.status(400).json({
        message: "Title, description and tech stack are required",
      });
    }

    const helpPost = await HelpPost.create({
      ownerId: req.user.id,
      title,
      description,
      techStack,
      githubRepoUrl,
      expectedContribution,
    });

    return res.status(201).json({
      message: "Help post created successfully",
      helpPost,
    });
  } catch (error) {
    console.error("Create help post error:", error);
    return res.status(500).json({
      message: "Failed to create help post",
    });
  }
};

/**
 * 2️⃣ Get all OPEN help posts created by logged-in user
 * GET /api/help-posts/my/open
 */
export const getMyOpenHelpPosts = async (req, res) => {
  try {
    const posts = await HelpPost.find({
      ownerId: req.user.id,
      status: "OPEN",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Get open help posts error:", error);
    return res.status(500).json({
      message: "Failed to fetch open help posts",
    });
  }
};

/**
 * 3️⃣ Get all CLOSED help posts created by logged-in user
 * GET /api/help-posts/my/closed
 */
export const getMyClosedHelpPosts = async (req, res) => {
  try {
    const posts = await HelpPost.find({
      ownerId: req.user.id,
      status: "CLOSED",
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Get closed help posts error:", error);
    return res.status(500).json({
      message: "Failed to fetch closed help posts",
    });
  }
};

/**
 * 4️⃣ Get a single help post by ID
 * GET /api/help-posts/:id
 */
export const getHelpPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const helpPost = await HelpPost.findById(id)
      .populate("ownerId", "name email githubUsername avatarUrl")
      .populate({
        path: "contributors",
        populate: {
          path: "userId",
          select: "name email githubUsername avatarUrl",
        },
      });

    if (!helpPost) {
      return res.status(404).json({
        message: "Help post not found",
      });
    }

    return res.status(200).json({
      helpPost,
    });
  } catch (error) {
    console.error("Get help post by id error:", error);
    return res.status(500).json({
      message: "Failed to fetch help post",
    });
  }
};

/**
 * 5️⃣ Close a help post
 * PATCH /api/help-posts/:id/close
 */
export const closeHelpPost = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the help post
    const helpPost = await HelpPost.findById(id);

    if (!helpPost) {
      return res.status(404).json({
        message: "Help post not found",
      });
    }

    // Only owner can close the help post
    if (helpPost.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to close this help post",
      });
    }

    // If already closed
    if (helpPost.status === "CLOSED") {
      return res.status(400).json({
        message: "Help post is already closed",
      });
    }

    // Close the post
    helpPost.status = "CLOSED";
    await helpPost.save();

    return res.status(200).json({
      message: "Help post closed successfully",
      helpPost,
    });
  } catch (error) {
    console.error("Close help post error:", error);
    return res.status(500).json({
      message: "Failed to close help post",
    });
  }
};

/**
 * 6️⃣ Get feed of all OPEN help posts (excluding user's own posts)
 * GET /api/help-posts/feed
 */
export const getOpenHelpPostsFeed = async (req, res) => {
  try {
    const posts = await HelpPost.find({
      status: "OPEN",
      ownerId: { $ne: req.user.id }, // exclude my posts
    })
      .populate("ownerId", "name githubUsername avatarUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Get help post feed error:", error);
    return res.status(500).json({
      message: "Failed to fetch help posts feed",
    });
  }
};


/**
 * 7️⃣ Delete a help post
 * DELETE /api/help-posts/:id
 */
export const deleteHelpPost = async (req, res) => {
  try {
    const { id } = req.params;

    const helpPost = await HelpPost.findById(id);

    if (!helpPost) {
      return res.status(404).json({
        message: "Help post not found",
      });
    }

    // Only owner can delete
    if (helpPost.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this help post",
      });
    }

    // Delete related contribution requests
    await ContributionRequest.deleteMany({
      helpPostId: id,
    });

    // Delete related contributors
    await Contributor.deleteMany({
      helpPostId: id,
    });

    // Delete help post
    await HelpPost.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Help post deleted successfully",
    });
  } catch (error) {
    console.error("Delete help post error:", error);
    return res.status(500).json({
      message: "Failed to delete help post",
    });
  }
};

/**
 * 8️⃣ Get posts where the logged-in user is a contributor
 * GET /api/help-posts/my/contributions
 */
export const getMyContributedPosts = async (req, res) => {
  try {
    // 1. Find all contributor entries for this user
    const contributions = await Contributor.find({ userId: req.user.id })
      .populate({
        path: "helpPostId", // Populate the HelpPost details
        populate: {
          path: "ownerId", // Inside the post, populate the Owner details
          select: "name email avatarUrl githubUsername"
        }
      })
      .sort({ createdAt: -1 });

    // 2. Extract the actual post objects from the contribution wrapper
    // Filter out nulls (in case a post was deleted but contributor record remained)
    const posts = contributions
      .map((c) => c.helpPostId)
      .filter((post) => post !== null);

    return res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Get contributed posts error:", error);
    return res.status(500).json({
      message: "Failed to fetch contributed posts",
    });
  }
};