const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary");
const streamifier = require("streamifier");

require("dotenv").config();
const router = express.Router();

//cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File uploaded" });
    }
    //function to handle the stream upload to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        //use streamifier to convert file buffer to stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    //call the streamUpload func
    const result = await streamUpload(req.file.buffer);

    //respond with the uploaded image url
    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
