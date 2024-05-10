const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/events/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadEventImages = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      console.log(
        "File uploaded not supported. Please upload file with .png or .jpg format only"
      );
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 2,000,000 bytes = 5MB
  },
});

module.exports = uploadEventImages;
