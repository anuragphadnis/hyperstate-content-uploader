import multer from 'multer';
import config from '../config/config';

const storage = multer.diskStorage({
  destination(request, file, callback) {
    console.log(config.DEFAULT_UPLOAD_DIR);
    callback(null, config.DEFAULT_UPLOAD_DIR);
  },

  filename(request, file, callback) {
    const fileFormat = `${file.originalname.slice(file.originalname.lastIndexOf('.'))}`;
    let filename = `${Date.now()}`;
    filename += fileFormat;
    request.filename = filename;
    callback(null, filename);
  },
});

const upload = multer({
  storage,
});

/* eslint import/prefer-default-export: off */
export {
  upload,
};
