import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: (process.env.PORT ? process.env.PORT : 3000),
  UPLOAD_DIR: process.env.DEFAULT_UPLOAD_DIR,
  MAX_FILE_SIZE: (process.env.MAX_FILE_SIZE ? process.env.MAX_FILE_SIZE : 104857600),
  REDIS_PORT: (process.env.REDIS_PORT ? process.env.REDIS_PORT : 6379),
  REDIS_HOST: (process.env.REDIS_HOST ? process.env.REDIS_HOST : 'localhost'),
};
