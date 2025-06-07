import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

// Define allowed file types
const allowedTypes = {
    image: {
        mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        maxSize: 5 * 1024 * 1024, // 5MB
        errorMessage: 'Please upload only images (JPEG, PNG, GIF, WebP)'
    },
    video: {
        mimeTypes: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/x-flv', 'video/webm'],
        maxSize: 100 * 1024 * 1024, // 100MB
        errorMessage: 'Please upload only videos (MP4, MOV, AVI, WMV, FLV, WebM)'
    }
};

// File filter factory
const createFileFilter = (resourceType) => (req, file, cb) => {
    const { mimeTypes, errorMessage } = allowedTypes[resourceType];
    
    if (mimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(errorMessage), false);
    }
};

// Create multer instance with dynamic configuration
const createUploadMiddleware = (resourceType = 'image') => {
    const { maxSize } = allowedTypes[resourceType];
    
    return multer({
        storage: storage,
        fileFilter: createFileFilter(resourceType),
        limits: {
            fileSize: maxSize
        }
    });
};

// Export middleware factory
const uploadMiddleware = {
    image: createUploadMiddleware('image'),
    video: createUploadMiddleware('video')
};

export default uploadMiddleware;