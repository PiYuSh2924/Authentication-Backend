import multer from "multer";

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
        storage: multer.memoryStorage(),
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