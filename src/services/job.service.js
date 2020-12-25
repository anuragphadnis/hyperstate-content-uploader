import Bull from 'bull';

const processQueue = new Bull('processQueue');

const add = async (files) => {
  files.forEach(async (file) => {
    await processQueue.add({
      fileName: file,
    });
  });
};

processQueue.process(async (job) => {
  // TODO process images
  console.log(`Image: ${job.data.fileName} is being processed`);
});

export default {
  add,
};
