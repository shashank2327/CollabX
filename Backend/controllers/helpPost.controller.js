import HelpPost from "../models/helpPost.model.js";
import Project from "../models/project.model.js";

/**
 * @desc   Create a help post (project owner only)
 * @route  POST /api/help-posts
 */
export const createHelpPost = async (req, res) => {
  try {
    const { projectId, title, description, helpType } = req.body;

    if (!projectId || !title || !helpType) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only project owner can create help post
    if (project.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const helpPost = await HelpPost.create({
      projectId,
      ownerId: req.user.id,
      title,
      description,
      helpType
    });

    res.status(201).json(helpPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get all open help posts (college-wide)
 * @route  GET /api/help-posts
 */
export const getAllHelpPosts = async (req, res) => {
  try {
    const helpPosts = await HelpPost.find({ status: "open" })
      .populate("ownerId", "name skills githubUsername")
      .populate("projectId", "projectName githubRepoUrl")
      .sort({ createdAt: -1 });

    res.json(helpPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get single help post by ID
 * @route  GET /api/help-posts/:id
 */
export const getHelpPostById = async (req, res) => {
  try {
    const helpPost = await HelpPost.findById(req.params.id)
      .populate("ownerId", "name bio skills githubUsername")
      .populate("projectId", "projectName githubRepoUrl");

    if (!helpPost) {
      return res.status(404).json({ message: "Help post not found" });
    }

    res.json(helpPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Close help post (owner only)
 * @route  PATCH /api/help-posts/:id/close
 */
export const closeHelpPost = async (req, res) => {
  try {
    const helpPost = await HelpPost.findById(req.params.id);

    if (!helpPost) {
      return res.status(404).json({ message: "Help post not found" });
    }

    if (helpPost.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    helpPost.status = "closed";
    helpPost.closedAt = new Date();
    await helpPost.save();
    console.log(helpPost)
    res.json({ message: "Help post closed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
