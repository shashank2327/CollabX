import mongoose from "mongoose";

const helpPostSchema = new mongoose.Schema(
  {
    // User who created the help post
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Main content
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Tech stack required for help
    techStack: {
      type: [String],
      required: true,
    },

    // Optional GitHub repository
    githubRepoUrl: {
      type: String,
      trim: true,
    },

    // What kind of help is needed
    expectedContribution: {
      type: String, // e.g. "Fix bug", "Add feature", "Refactor", "Review code"
      trim: true,
    },

    // Current status of help post
    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
    },

    // Accepted contributors (NOT requests)
    contributors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contributor",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("HelpPost", helpPostSchema);
