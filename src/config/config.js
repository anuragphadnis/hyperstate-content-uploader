import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: (process.env.PORT ? process.env.PORT : 3000),
  DEFAULT_UPLOAD_DIR: process.env.DEFAULT_UPLOAD_DIR,
  MAX_FILE_SIZE: (process.env.MAX_FILE_SIZE ? process.env.MAX_FILE_SIZE : 100000000),
};
