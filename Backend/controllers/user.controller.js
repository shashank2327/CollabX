import User from "../models/user.model.js";
import { uploadFile } from "../services/storage.service.js";

/**
 * @route   PATCH /api/users/me
 * @access  Private
 * @desc    Update logged-in user's profile (with avatar upload)
 */
export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "bio",
      "skills",
      "githubUsername",
      "githubProfileUrl",
    ];

    const updates = {};

    // Handle normal fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Handle avatar upload (if present)
    if (req.file) {
      const uploadResult = await uploadFile(req.file.buffer);

      updates.avatarUrl = uploadResult.url;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

