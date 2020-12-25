import sharpService from './sharp.service';

const processImage = async (fileName, processes) => {
  try {
    processes.forEach(async (process) => {
      await process(fileName);
    });
  } catch (error) {
    console.error(`Error occured while processing image: ${fileName}`);
  }
};

const convertToPng = async (file) => { await sharpService.convertToPng(file); };

const convertToJpeg = async (file) => { await sharpService.convertToJpeg(file); };

const convertToWebp = async (file) => { await sharpService.convertToWebp(file); };

const convertTo360p = async (file) => { await sharpService.convertTo360p(file); };

const convertTo480p = async (file) => { await sharpService.convertTo480p(file); };

const convertTo720p = async (file) => { await sharpService.convertTo720p(file); };

const convertTo1080p = async (file) => { await sharpService.convertTo1080p(file); };

export default {
  processImage,
  convertToPng,
  convertToJpeg,
  convertToWebp,
  convertTo360p,
  convertTo480p,
  convertTo720p,
  convertTo1080p,
};
