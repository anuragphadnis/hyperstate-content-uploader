import express from 'express';
import config from './config/config';
import FileRoute from './routes/file';

const app = express();

app.use('/file', FileRoute);

app.listen(config.PORT, () => {
  /* eslint no-console: off */
  console.log(`Listening to port ${config.PORT}`);
});
