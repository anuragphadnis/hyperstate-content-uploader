import process from 'process';

export default {
  PORT: (process.env.PORT ? process.env.PORT : 3000),
};
