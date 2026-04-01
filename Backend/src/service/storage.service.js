import fs from "fs";
import path from "path";

// 📁 Upload file (handled by multer)
export const uploadFile = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Return file path or URL
    return {
      fileName: file.filename,
      filePath: file.path,
      url: `${process.env.BASE_URL}/uploads/${file.filename}`,
    };

  } catch (error) {
    throw error;
  }
};


export const deleteFile = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path is required");
    }

    // Check if file exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { message: "File deleted successfully" };
    } else {
      throw new Error("File not found");
    }

  } catch (error) {
    throw error;
  }
};


// 🔗 Get file URL
export const getFileUrl = (fileName) => {
  if (!fileName) {
    throw new Error("File name is required");
  }

  return `${process.env.BASE_URL}/uploads/${fileName}`;
};