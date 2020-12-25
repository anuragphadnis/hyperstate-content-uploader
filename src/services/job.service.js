import Bull from 'bull';
import path from 'path';
import processImageService from './process.image.service';
import config from '../config/config';

const formattingQueue = new Bull('formattingQueue');
const resizingQueue = new Bull('resizingQueue');

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
      path.join(config.DEFAULT_UPLOAD_DIR, job.data.fileName), [processImageService.convertToPng,
        processImageService.convertToJpeg,
        processImageService.convertToWebp,
      ],
    );
    console.log(`Image: ${job.data.fileName} has been converted to different formats`);
  } catch (error) {
    console.log(`Error occured while processing Image: ${job.data.fileName}, Error: ${error}`);
  }
});

const addToResizingQueue = async (files) => {
  files.forEach(async (file) => {
    await resizingQueue.add({
      fileName: file,
    });
  });
};

resizingQueue.process(async (job) => {
  try {
    console.log(`Started to process resizing Image: ${job.data.fileName}`);
    await processImageService.processImage(
      path.join(config.DEFAULT_UPLOAD_DIR, job.data.fileName), [processImageService.convertTo360p,
        processImageService.convertTo480p,
        processImageService.convertTo720p,
        processImageService.convertTo1080p,
      ],
    );
    console.log(`Image: ${job.data.fileName} has been resized successfully`);
  } catch (error) {
    console.log(`Error occured while processing Image: ${job.data.fileName}, Error: ${error}`);
  }
});

export default {
  formattingQueue: {
    add: addToFormattingQueue,
  },
  resizeQueue: {
    add: addToResizingQueue,
  },
};
