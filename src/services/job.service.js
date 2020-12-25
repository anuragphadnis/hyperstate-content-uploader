import Bull from 'bull';
import path from 'path';
import processImageService from './process.image.service';
import config from '../config/config';

const processQueue = new Bull('processQueue');

const add = async (files) => {
  files.forEach(async (file) => {
    await processQueue.add({
      fileName: file,
    });
  });
};

processQueue.process(async (job) => {
  try {
    console.log(`Started to process Image: ${job.data.fileName}`);
    await processImageService.processImage(
      path.join(config.DEFAULT_UPLOAD_DIR, job.data.fileName), [processImageService.convertToPng,
        processImageService.convertToJpeg,
        processImageService.convertToWebp,
      ],
    );
    console.log(`Image: ${job.data.fileName} finished processing`);
  } catch (error) {
    console.log(`Error occured while processing Image: ${job.data.fileName}, Error: ${error}`);
  }
});

export default {
  add,
};
