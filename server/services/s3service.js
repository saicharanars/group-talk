const AWS = require('aws-sdk');
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require('multer-s3');
const path = require('path');

const s3 = new S3Client({
    credentials: {
        accessKeyId: "AKIA3ATJAGI6FR3NQE53",
        secretAccessKey: "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",
         // this is the region that you select in AWS account
    },
    region: "ap-south-1",
})

const s3Storage = multerS3({
  s3: s3,
  bucket: "group-talk",
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      Date.now() + "_" + file.fieldname + "_" + file.originalname;
    cb(null, fileName);
  },
});

function sanitizeFile(file, cb) {
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );
  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb("Error: File type not allowed!");
  }
}

const upload = multer({
  dest: "uploads/",
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2mb file size
  },
});

module.exports = {
  uploadToS3: upload,
};
