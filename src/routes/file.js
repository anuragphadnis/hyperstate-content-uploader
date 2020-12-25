import express from 'express';
import FileController from '../controllers/file.controller';
import jobService from '../services/job.service';

const router = express.Router();

router.post('/', FileController.upload.any('files'), async (req, res) => {
  try {
    if (req.error) {
      return res.status(402).send({
        error: `Error: ${req.error}`,
      });
    }

    await jobService.add(req.uploadedFiles);

    return res.status(201).send({
      files: req.uploadedFiles,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.send('ERROR');
  }
});

export default router;
