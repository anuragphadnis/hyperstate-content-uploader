import multer from 'multer';
import config from '../config/config';
import fileFormatValidator from '../validators/file.format.validator';

const storage = multer.diskStorage({
  destination(request, file, callback) {
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
  fileFilter: fileFormatValidator.validateFileFormat,
});

export default upload;
