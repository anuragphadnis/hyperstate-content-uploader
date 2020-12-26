import Bull from 'bull';
import resizeImageService from './resize.image.service';
import fileUtils from '../utils/file.utils';
import dbService from './db.service';

const resizingQueue = new Bull('resizingQueue');

const add = async (data) => {
  await resizingQueue.add({
    data,
  });
};

resizingQueue.process(async (job) => {
  try {
    console.log(`Started to process resizing Image: ${job.data.data.fileName}`);
    dbService.setStatus(fileUtils.getFileNameWithFormat(job.data.data.originalFileName), 'Resizing image');
    await resizeImageService.processImage(
      job.data.data.fileName, [resizeImageService.convertTo360p,
        resizeImageService.convertTo480p,
        resizeImageService.convertTo720p,
        resizeImageService.convertTo1080p,
      ],
    );
    dbService.setStatus(fileUtils.getFileNameWithFormat(job.data.data.originalFileName), 'Processing completed');
    console.log(`Image: ${job.data.data.fileName} has been resized successfully`);
  } catch (error) {
    console.log(`Error occured while processing Image: ${job.data.data.fileName}, Error: ${error}`);
  }
});

export default {
  add,
};
