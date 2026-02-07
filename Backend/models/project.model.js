import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    projectName: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    githubRepoUrl: {
      type: String,
      required: true
    },
    techStack: {
      type: [String]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
