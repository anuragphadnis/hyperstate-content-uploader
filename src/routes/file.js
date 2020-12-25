import express from 'express';
import FileController from '../controllers/file.controller';

const router = express.Router();

router.post('/', FileController.upload.any('files'), (req, res) => {
  try {
    if (req.error) {
      return res.status(402).send({
        error: `Error: ${req.error}`,
      });
    }
    return res.status(201).send({
      files: req.uploadedFiles,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.send('ERROR');
  }
});

export default router;
