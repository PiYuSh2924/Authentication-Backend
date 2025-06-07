import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

router.get('/welcome', authMiddleware, (req, res) => {
    const {username, userId, role} = req.user;
    res.json({
        message: "Welcome to the Home page.",
        user : {
            userId,
            username,
            role
        }
    })
})

export default router