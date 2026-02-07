import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    collegeEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    githubUsername: String,
    githubProfileUrl: String,
    avatarUrl: String,
    bio: String,
    skills: [String]
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
