const findFileFormat = (file) => {
  const fileFormat = file.originalname.slice(file.originalname.lastIndexOf('.') + 1);
  return fileFormat.toLowerCase();
};

export default {
  findFileFormat,
};
