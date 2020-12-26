import express from 'express';
import path from 'path';
import FileController from '../controllers/file.controller';
import convertImageJob from '../services/convert.image.job.service';
import dbService from '../services/db.service';
import config from '../config/config';

const router = express.Router();

router.use(express.json());

router.post('/', FileController.upload.any('files'), async (req, res) => {
  try {
    if (req.error) {
      return res.status(402).send({
        error: `Error: ${req.error}`,
      });
    }

    req.uploadedFiles.forEach((file) => {
      console.log(file);
      dbService.setStatus(file, 'uploaded');
    });

    await convertImageJob.add(req.uploadedFiles);

    return res.status(201).send({
      files: req.uploadedFiles,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.send('ERROR');
  }
});

router.get('/', (req, res) => {
  if (!req.body.fileName) {
    return res.status(402).send({ error: 'No image name given' });
  }
  return dbService.getStatus(req.body.fileName, (error, processingStatus) => {
    if (processingStatus == null || error) {
      return res.status(402).send({ error: `No image with name ${req.body.fileName} exists` });
    }
    if (error != null) {
      return res.status(500).send({ error: `Generic error occured: ${error}` });
    }

    return res.sendFile(`${path.join(config.UPLOAD_DIR, req.body.fileName)}`);
  });
});

router.get('/status', (req, res) => {
  if (!req.body.fileName) {
    return res.status(402).send({ error: 'No image name given' });
  }
  return dbService.getStatus(req.body.fileName, (error, processingStatus) => {
    if (processingStatus == null || error) {
      return res.status(402).send({ error: `No image with name ${req.body.fileName} exists` });
    }
    if (error != null) {
      return res.status(500).send({ error: `Generic error occured: ${error}` });
    }

    return res.status(200).send({ status: processingStatus });
  });
});

export default router;
