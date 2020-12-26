import fs from 'fs';
import path from 'path';
import upload from '../services/multer.service';
import config from '../config/config';
import dbService from '../services/db.service';
import fileUtils from '../utils/file.utils';

const fsPromises = fs.promises;

const deleteOriginal = async (fileName) => {
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, fileName));
};

const deletePng = async (fileName) => {
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'png', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'png', '360p', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'png', '480p', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'png', '720p', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'png', '1080p', fileName));
};

const deleteJpeg = async (fileName) => {
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'jpeg', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'jpeg', '360p', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'jpeg', '480p', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'jpeg', '720p', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'jpeg', '1080p', fileName));
};

const deleteWebp = async (fileName) => {
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'webp', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'webp', '360p', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'webp', '480p', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'webp', '720p', fileName));
  fsPromises.unlink(path.join(`${config.UPLOAD_DIR}`, 'webp', '1080p', fileName));
};

const deleteFile = async (fileName, res) => {
  try {
    await dbService.deleteStatus(fileName);
    await deleteOriginal(fileName);
    await deletePng(`${fileUtils.findFileName(fileName)}.png`);
    await deleteJpeg(`${fileUtils.findFileName(fileName)}.jpeg`);
    await deleteWebp(`${fileUtils.findFileName(fileName)}.webp`);
    res.status(200).send({ message: 'Files deleted succesfully' });
  } catch (error) {
    console.error(`Error occured while delete file: ${fileName}, error: ${error}`);
    res.status(500).send({ error: `Error occured while delete file: ${fileName}, please try again later` });
  }
};

export default {
  upload,
  deleteFile,
};
