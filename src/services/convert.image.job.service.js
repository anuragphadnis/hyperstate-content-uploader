import Bull from 'bull';
import path from 'path';
import processImageService from './convert.image.service';
import config from '../config/config';
import dbService from './db.service';
import fileUtils from '../utils/file.utils';
import fileFormatValidator from '../validators/file.format.validator';

const formattingQueue = new Bull('formattingQueue');

const addToFormattingQueue = async (files) => {
  files.forEach(async (file) => {
    if (fileFormatValidator.isValidImageFormat(file)) {
      await formattingQueue.add({
        fileName: file,
      });
    }
  });
};

formattingQueue.process(async (job) => {
  try {
    console.log(`Started to process converting of Image: ${job.data.fileName}`);
    dbService.setStatus(fileUtils.getFileNameWithFormat(job.data.fileName), 'converting formats');
    await processImageService.processImage(
      path.join(config.UPLOAD_DIR, job.data.fileName), [processImageService.convertToPng,
        processImageService.convertToJpeg,
        processImageService.convertToWebp,
      ],
    );
    dbService.setStatus(fileUtils.getFileNameWithFormat(job.data.fileName), 'converted formats');
    console.log(`Image: ${job.data.fileName} has been converted to different formats`);
  } catch (error) {
    console.log(`Error occured while processing Image: ${job.data.fileName}, Error: ${error}`);
  }
});

export default {
  add: addToFormattingQueue,
};
