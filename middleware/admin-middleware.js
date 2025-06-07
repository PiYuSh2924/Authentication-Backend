export const adminMiddleware = (req, res, next) => {
    try {
        // Check if user object exists
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        const { role } = req.user;
        
        // Check if role exists
        if (!role) {
            return res.status(401).json({
                success: false,
                message: "User role not found."
            });
        }

        // Check if user is admin
        if (role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access Denied! You are not an admin."
            });
        }

        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}