/* eslint no-unused-vars: off */
import sharp from 'sharp';
import path from 'path';
import config from '../config/config';
import fileUtils from '../utils/file.utils';

const validFormats = ['jpeg', 'png', 'webp'];

const convertImage = async (file, toFormat) => {
  if (validFormats.indexOf(toFormat) < 0) {
    return new Error(`Unable to convert Image: ${file} to format: ${toFormat}`);
  }
  try {
    return await sharp(file)
      .toFile(`${path.resolve(config.DEFAULT_UPLOAD_DIR, toFormat, fileUtils.findFileName(file))}.${toFormat}`);
  } catch (error) {
    console.error(`Error occured while converting image ${file} to ${toFormat}, error: ${error}`);
    return new Error(`Error occured while converting image ${file} to ${toFormat}, error: ${error}`);
  }
};

const convertToPng = async (file) => { await convertImage(file, 'png'); };

const convertToJpeg = async (file) => { await convertImage(file, 'jpeg'); };

const convertToWebp = async (file) => { await convertImage(file, 'webp'); };

// TODO implement
const convertTo360p = async (file) => {
};

// TODO implement
const convertTo480p = async (file) => {
};

// TODO implement
const convertTo720p = async (file) => {
};

// TODO implement
const convertTo1080p = async (file) => {
};

export default {
  convertToPng,
  convertToJpeg,
  convertToWebp,
  convertTo360p,
  convertTo480p,
  convertTo720p,
  convertTo1080p,
};
