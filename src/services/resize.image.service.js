import path from 'path';
import sharpService from './sharp.service';
import config from '../config/config';
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

const convertTo360p = async (file) => {
  await sharpService.convertTo360p(file,
    path.join(config.UPLOAD_DIR, fileUtils.findFileFormat(file), '360p'));
};

const convertTo480p = async (file) => {
  await sharpService.convertTo480p(file,
    path.join(config.UPLOAD_DIR, fileUtils.findFileFormat(file), '480p'));
};

const convertTo720p = async (file) => {
  await sharpService.convertTo720p(file,
    path.join(config.UPLOAD_DIR, fileUtils.findFileFormat(file), '720p'));
};

const convertTo1080p = async (file) => {
  await sharpService.convertTo1080p(file,
    path.join(config.UPLOAD_DIR, fileUtils.findFileFormat(file), '1080p'));
};

export default {
  processImage,
  convertTo360p,
  convertTo480p,
  convertTo720p,
  convertTo1080p,
};
