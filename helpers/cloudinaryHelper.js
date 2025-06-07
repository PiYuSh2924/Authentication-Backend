import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (filePath, resourceType = 'image') => {
  try {
    // For videos, we need to explicitly set resource_type and other options
    const options = {
      resource_type: "auto", // Let Cloudinary auto-detect the resource type
      chunk_size: 6000000, // 6MB chunks
      eager: [
        { format: "mp4", quality: "auto" }
      ],
      eager_async: true
    };

    console.log("Uploading to Cloudinary with options:", options);
    const result = await cloudinary.uploader.upload(filePath, options);
    console.log("Cloudinary upload result:", result);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

