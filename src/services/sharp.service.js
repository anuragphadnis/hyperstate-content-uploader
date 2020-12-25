/* eslint no-unused-vars: off */
import sharp from 'sharp';
import path from 'path';
import fileUtils from '../utils/file.utils';

const validFormats = ['jpeg', 'png', 'webp'];

const convertImage = async (file, uploadDir, toFormat) => {
  if (validFormats.indexOf(toFormat) < 0) {
    return new Error(`Unable to convert Image: ${file} to format: ${toFormat}`);
  }
  try {
    return await sharp(file)
      .toFile(`${path.resolve(uploadDir, fileUtils.findFileName(file))}.${toFormat}`);
  } catch (error) {
    console.error(`Error occured while converting image ${file} to ${toFormat}, error: ${error}`);
    return new Error(`Error occured while converting image ${file} to ${toFormat}, error: ${error}`);
  }
};

const resizeImage = async (file, uploadDir, width, height) => {
  try {
    return await sharp(file)
      .resize(width, height)
      .toFile(`${path.resolve(uploadDir, fileUtils.findFileName(file))}.${fileUtils.findFileFormat(file)}`);
  } catch (error) {
    console.error(`Error occured while resizing image ${file} to ${width}*${height}, error: ${error}`);
    return new Error(`Error occured while resizing image ${file} to ${width}*${height}, error: ${error}`);
  }
};

const convertToPng = async (file, uploadDir) => {
  await convertImage(file, uploadDir, 'png');
};

const convertToJpeg = async (file, uploadDir) => {
  await convertImage(file, uploadDir, 'jpeg');
};

const convertToWebp = async (file, uploadDir) => {
  await convertImage(file, uploadDir, 'webp');
};

const convertTo360p = async (file, uploadDir) => {
  await resizeImage(file, uploadDir, 480, 360);
};

const convertTo480p = async (file, uploadDir) => {
  await resizeImage(file, uploadDir, 858, 480);
};

const convertTo720p = async (file, uploadDir) => {
  await resizeImage(file, uploadDir, 1280, 720);
};

const convertTo1080p = async (file, uploadDir) => {
  await resizeImage(file, uploadDir, 1920, 1080);
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
