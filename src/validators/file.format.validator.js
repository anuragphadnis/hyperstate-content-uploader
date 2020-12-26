/* eslint import/prefer-default-export: off */
import fileUtils from '../utils/file.utils';

const validImageFormats = ['png', 'jpg', 'jpeg', 'tiff', 'gif', 'bmp', 'svg'];
const validVideoFormats = ['mkv', 'mp4', '3gp', 'avi'];

const isValidImageFormat = (file) => {
  if (validImageFormats.indexOf(fileUtils.findFileFormat(file)) > -1) {
    return true;
  }
  return false;
};

const isValidVideoFormat = (file) => {
  if (validVideoFormats.indexOf(fileUtils.findFileFormat(file)) > -1) {
    return true;
  }
  return false;
};

const validateFileFormat = (req, file, cb) => {
  if (isValidImageFormat(file.originalname) || isValidVideoFormat(file.originalname)) {
    return cb(null, true);
  }
  req.error = 'Not a valid file';
  return cb(new Error('Invalid file'));
};

export default {
  validateFileFormat,
  isValidImageFormat,
  isValidVideoFormat,
};
