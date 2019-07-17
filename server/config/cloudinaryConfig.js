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
const { uploader } = cloudinary;
class Cloudinary {
  static imageupload(req, res, next) {
    const file = req.files.photo;
    // const file2 = req.files.photo;
    uploader.upload(file.tempFilePath, (err, result) => {
      console.log(err);
      if (result) {
        req.body.image_url = result.secure_url;
        console.log(result.secure_url);
        res.send({
          status: 'success',
          result,
        });
      } else {
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
      }
    });
    // next();
  }
}

//
// const file = req.files.image_url;
//     console.log(file);
//     uploader.upload(file.tempFilePath, (err, result) => {
//       if (result) {
//         req.body.image_url = result.secure_url;
//         console.log(result.secure_url);
//       } else {
//         res.status(500).json({ status: 'error', error: 'Internal Server Error' });
//       }
//       // console.log(result);
//       // res.send({
//       //   status: 'success',
//       //   result,
//       // });
//       next();
//     });
//
// const storage = cloudinaryStorage({
//   cloudinary, folder: 'propertypro', allowedFormats: ['jpg', 'png', 'gif'], transformation: [{ width: 500, height: 500, crop: 'limit' }],
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1020 * 5,
//   },
//   fileFilter,

// }).array('images', 10);

export default Cloudinary;
