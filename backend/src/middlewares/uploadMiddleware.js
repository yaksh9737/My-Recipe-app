const multer = require("multer");
const path = require("path");

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // Save files in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename for each upload
  },
});

// Initialize Multer with storage
const upload = multer({
  storage,
});

module.exports = upload;
