import mongoose from "mongoose";

const contributionRequestSchema = new mongoose.Schema(
  {
    helpPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HelpPost",
      required: true
    },
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: {
      type: String
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// Prevent duplicate requests from same user
contributionRequestSchema.index(
  { helpPostId: 1, requesterId: 1 },
  { unique: true }
);

export default mongoose.model(
  "ContributionRequest",
  contributionRequestSchema
);
