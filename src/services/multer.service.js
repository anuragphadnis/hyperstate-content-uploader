import multer from 'multer';
import config from '../config/config';
import fileFormatValidator from '../validators/file.format.validator';
import fileUtils from '../utils/file.utils';

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, config.UPLOAD_DIR);
  },

  filename(request, file, callback) {
    const fileFormat = fileUtils.findFileFormat(file.originalname);
    const filename = `${Date.now()}.${fileFormat}`;
    if (!request.uploadedFiles) {
      request.uploadedFiles = [];
    }
    request.uploadedFiles.push(filename);
    callback(null, filename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: config.MAX_FILE_SIZE,
  },
  fileFilter: fileFormatValidator.validateFileFormat,
});

export default upload;
