import dotenv from 'dotenv';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';

const cloudinary = require('cloudinary').v2;

dotenv.config();
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
// const { uploader } = cloudinary;
// class Cloudinary {
//   static imageupload(req, res, next) {
//     const file = req.files.photo;
//     uploader.upload(file.tempFilePath, (err, result) => {
//       res.send({
//         status: 'success',
//         result,
//       });
//     });
//   }
// }
const storage = cloudinaryStorage({
  cloudinary, folder: 'propertypro', allowedFormats: ['jpg', 'png', 'gif'], transformation: [{ width: 500, height: 500, crop: 'limit' }],
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1020 * 5,
  },
  fileFilter,

}).array('images', 10);

export default { upload };

