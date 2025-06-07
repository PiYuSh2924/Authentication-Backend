import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import { uploadImageController, fetchImagesController } from '../controllers/image-controller.js';
import uploadMiddleware from '../middleware/upload-middleware.js';

const router = express.Router()

router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.image.single('image'), uploadImageController)
router.get('/fetch', authMiddleware, fetchImagesController)

export default router