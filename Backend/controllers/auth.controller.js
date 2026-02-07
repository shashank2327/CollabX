import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// ================== SIGNUP ==================
export const signup = async (req, res) => {
  try {
    const { name, email, password, collegeEmail } = req.body;

    if (!name || !email || !password || !collegeEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      collegeEmail
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Signup successful",
      id: user._id,
      name: user.name,
      email: user.email,
      collegeEmail: user.collegeEmail,
      githubUsername: user.githubUsername,
      githubProfileUrl: user.githubProfileUrl,
      bio: user.bio,
      skills: user.skills,
      avatarUrl: user.avatarUrl,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================== LOGIN ==================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Signup successful",
      id: user._id,
      name: user.name,
      email: user.email,
      collegeEmail: user.collegeEmail,
      githubUsername: user.githubUsername,
      githubProfileUrl: user.githubProfileUrl,
      bio: user.bio,
      skills: user.skills,
      avatarUrl: user.avatarUrl,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================== LOGOUT ==================
export const logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};

// ================== GET LOGGED-IN USER ==================
export const getMe = async (req, res) => {
  console.log(req.user)
  res.json({ user: req.user });
};
