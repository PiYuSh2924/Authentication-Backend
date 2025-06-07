import Video from "../models/Video.js";
import { uploadToCloudinary } from "../helpers/cloudinaryHelper.js";

export const uploadVideoController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload a video",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newlyUploadedVideo = new Video({
      title: req.body.title || req.file.originalname,
      videoUrl: url,
      uploadedBy: req.user.userId,
    });

    await newlyUploadedVideo.save();

    res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video: newlyUploadedVideo,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}; 