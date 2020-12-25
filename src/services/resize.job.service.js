import Bull from 'bull';
import resizeImageService from './resize.image.service';

const resizingQueue = new Bull('resizingQueue');

const add = async (file) => {
  await resizingQueue.add({
    fileName: file,
  });
};

resizingQueue.process(async (job) => {
  try {
    console.log(`Started to process resizing Image: ${job.data.fileName}`);
    await resizeImageService.processImage(
      job.data.fileName, [resizeImageService.convertTo360p,
        resizeImageService.convertTo480p,
        resizeImageService.convertTo720p,
        resizeImageService.convertTo1080p,
      ],
    );
    console.log(`Image: ${job.data.fileName} has been resized successfully`);
  } catch (error) {
    console.log(`Error occured while processing Image: ${job.data.fileName}, Error: ${error}`);
  }
});

export default {
  add,
};
