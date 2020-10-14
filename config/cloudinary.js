const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// https://github.com/expressjs/multer
const multer = require("multer"); // Convert uploaded files et make them available in req.file

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: "user-pictures"
});

const fileUploader = multer({ storage });

module.exports = fileUploader;
