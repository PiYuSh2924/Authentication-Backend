import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        // All these are equivalent:
        // const authHeader = req.headers.authorization;
        // const authHeader = req.headers["authorization"];
        const authHeader = req.get("authorization");
        
        console.log("Auth header:", authHeader);
        
        // Check if authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No authorization header."
            });
        }

        // Check if token exists and is in correct format
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Invalid token format."
            });
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('Decoded token:', decodedToken);

        // Check if decoded token has required fields
        if (!decodedToken || !decodedToken.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload."
            });
        }

        // Attach user data to request
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token has expired."
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token."
            });
        }

        // Handle other errors
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}
