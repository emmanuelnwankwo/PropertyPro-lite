import dotenv from 'dotenv';

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
    uploader.upload(file.tempFilePath, (err, result) => {
      res.send({
        status: 'success',
        result,
      });
    });
  }
}


export default Cloudinary;
