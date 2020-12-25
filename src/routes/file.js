import express from 'express';
import FileController from '../controllers/file.controller';

const router = express.Router();

router.post('/', FileController.upload.any('files'), (req, res) => {
  try {
    res.send('done');
  } catch (error) {
    console.log(`Error: ${error}`);
    res.send('ERROR');
  }
});

export default router;
