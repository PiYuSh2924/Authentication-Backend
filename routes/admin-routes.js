import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";

const router = express.Router()

router.get('/welcome',authMiddleware, adminMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Admin Page!"
    })
})

export default router