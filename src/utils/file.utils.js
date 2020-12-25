import path from 'path';

const findFileFormat = (file) => {
  const fileFormat = file.originalname.slice(file.originalname.lastIndexOf('.') + 1);
  return fileFormat.toLowerCase();
};

const findFileName = (file) => {
  const filePath = file.split(path.sep);
  const fileName = filePath[filePath.length - 1];
  return fileName.substr(0, fileName.lastIndexOf('.'));
};

export default {
  findFileFormat,
  findFileName,
};
