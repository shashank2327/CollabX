import mongoose from "mongoose";

const contributorSchema = new mongoose.Schema(
  {
    helpPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HelpPost",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contributor", contributorSchema);
