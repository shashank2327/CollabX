import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import multer from "multer";
import { updateProfile } from "../controllers/user.controller.js";

const upload = multer({storage: multer.memoryStorage()});


const router = express.Router();

router.patch("/me", authMiddleware, upload.single("image"), updateProfile);

export default router;