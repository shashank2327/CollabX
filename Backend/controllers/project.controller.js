import Project from "../models/project.model.js";

/**
 * @desc   Create a new project
 * @route  POST /api/projects
 */
export const createProject = async (req, res) => {
  try {
    const { projectName, description, githubRepoUrl, techStack } = req.body;

    if (!projectName || !githubRepoUrl) {
      return res
        .status(400)
        .json({ message: "Project name and GitHub URL are required" });
    }

    const project = await Project.create({
      ownerId: req.user.id,
      projectName,
      description,
      githubRepoUrl,
      techStack
    });

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get all projects (college-wide)
 * @route  GET /api/projects
 */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("ownerId", "name githubUsername")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get single project by ID
 * @route  GET /api/projects/:id
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "ownerId",
      "name githubUsername bio skills"
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Delete project (owner only)
 * @route  DELETE /api/projects/:id
 */
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    console.log(project)
    console.log(req.user.id)

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
