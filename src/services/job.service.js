import Bull from 'bull';
import path from 'path';
import processImageService from './process.image.service';
import config from '../config/config';

const formattingQueue = new Bull('formattingQueue');

const addToFormattingQueue = async (files) => {
  files.forEach(async (file) => {
    await formattingQueue.add({
      fileName: file,
    });
  });
};

formattingQueue.process(async (job) => {
  try {
    console.log(`Started to process converting of Image: ${job.data.fileName}`);
    await processImageService.processImage(
      path.join(config.UPLOAD_DIR, job.data.fileName), [processImageService.convertToPng,
        processImageService.convertToJpeg,
        processImageService.convertToWebp,
      ],
    );
    console.log(`Image: ${job.data.fileName} has been converted to different formats`);
  } catch (error) {
    console.log(`Error occured while processing Image: ${job.data.fileName}, Error: ${error}`);
  }
});

export default {
  add: addToFormattingQueue,
};
