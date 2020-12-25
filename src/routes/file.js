import express from 'express';
import * as FileController from '../controllers/file.controller';

const router = express.Router();

router.post('/', FileController.upload.any('files'), (req, res) => {
  try {
    console.log(FileController);
    res.send('done');
  } catch (error) {
    console.log(`Error: ${error}`);
    res.send('ERROR');
  }
});

export default router;
