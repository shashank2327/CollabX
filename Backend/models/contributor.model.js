import mongoose from "mongoose";

const contributorSchema = new mongoose.Schema(
  {
    helpPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HelpPost",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    role: {
      type: String,
      enum: ["contributor", "reviewer"],
      default: "contributor"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Contributor", contributorSchema);
