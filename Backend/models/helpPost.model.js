import mongoose from "mongoose";

const helpPostSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    helpType: {
      type: String,
      enum: ["bug", "feature", "guidance"],
      required: true
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },
    
    
  },
  { timestamps: true }
);

export default mongoose.model("HelpPost", helpPostSchema);
