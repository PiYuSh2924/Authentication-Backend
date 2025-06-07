import cloudinary from "../config/cloudinary.js";
import { Readable } from 'stream';
import streamifier from 'streamifier';

export const uploadToCloudinary = async (file, resourceType = 'image') => {
  try {
    // Create a readable stream from the buffer
    const stream = streamifier.createReadStream(file.buffer);

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
    
    // Upload using stream
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.pipe(uploadStream);
    });

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

