const multer = require("multer");
const path = require("path");
const ENV = require("../config/env");
const s3 = require("../config/s3");
const multerS3 = require("multer-s3");

let upload;

if (ENV.NODE_ENV === "production") {
  // Upload to AWS S3
  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: ENV.AWS_BUCKET_NAME,
      acl: "public-read",
      key: (req, file, cb) => {
        cb(null, `uploads/${Date.now()}_${file.originalname}`);
      },
    }),
  });
} else {
  // Local uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  });
  upload = multer({ storage });
}

module.exports = upload.single("photo");
