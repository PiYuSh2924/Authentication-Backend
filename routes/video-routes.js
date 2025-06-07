import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import { uploadVideoController } from '../controllers/video-controller.js';
import uploadMiddleware from '../middleware/upload-middleware.js';

const router = express.Router()

// 
router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.video.single('video'), uploadVideoController)


export default router