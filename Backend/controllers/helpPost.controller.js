import HelpPost from "../models/helpPost.model.js";

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

