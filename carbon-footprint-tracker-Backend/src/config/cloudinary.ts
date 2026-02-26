import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (
  filePath: string
): Promise<string | null> => {

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!filePath) {
      return null;
    }

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image", // ✅ changed from video to image
    });

    // safe delete
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return uploadResult.secure_url;

  } catch (error: any) {

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.log(error);
    return null;
  }
};

export default uploadOnCloudinary;