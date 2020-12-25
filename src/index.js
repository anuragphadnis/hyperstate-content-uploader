import express from 'express';
import config from './config/config';

const app = express();

app.listen(config.PORT, () => {
  /* eslint no-console: off */
  console.log(`Listening to port ${config.PORT}`);
});
