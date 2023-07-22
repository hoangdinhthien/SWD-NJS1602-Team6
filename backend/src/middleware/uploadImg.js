// const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dghv44pzx",
  api_key: "875599112748833",
  api_secret: "957FOEbUqG1HEIe333k_2c2aTYc",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "swd",
  },
});

const uploadImage = multer({ storage });

// module.exports = uploadImage;
export default uploadImage;
