import path from 'path';
import sharpService from './sharp.service';
import config from '../config/config';
import resizeService from './resize.job.service';
import fileUtils from '../utils/file.utils';

const processImage = async (fileName, processes) => {
  try {
    processes.forEach(async (process) => {
      await process(fileName);
    });
  } catch (error) {
    console.error(`Error occured while processing image: ${fileName}`);
  }
};

const convertToPng = async (file) => {
  await sharpService.convertToPng(file, path.join(config.UPLOAD_DIR, 'png'));
  resizeService.add(
    `${path.join(config.UPLOAD_DIR, 'png', fileUtils.findFileName(file))}.png`,
  );
};

const convertToJpeg = async (file) => {
  await sharpService.convertToJpeg(file, path.join(config.UPLOAD_DIR, 'jpeg'));
  resizeService.add(
    `${path.join(config.UPLOAD_DIR, 'jpeg', fileUtils.findFileName(file))}.jpeg`,
  );
};

const convertToWebp = async (file) => {
  await sharpService.convertToWebp(file, path.join(config.UPLOAD_DIR, 'webp'));
  resizeService.add(
    `${path.join(config.UPLOAD_DIR, 'webp', fileUtils.findFileName(file))}.webp`,
  );
};

export default {
  processImage,
  convertToPng,
  convertToJpeg,
  convertToWebp,
};
