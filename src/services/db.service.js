import redis from 'redis';

const client = redis.createClient();

client.on('error', (error) => {
  console.error(`Error occured while creating client of redis, error: ${error}`);
});

const setStatus = (key, status, cb) => {
  client.set(key, status, cb);
};

const getStatus = (key, cb) => {
  client.get(key, cb);
};

const deleteStatus = (key) => {
  client.del(key);
};

export default {
  getStatus,
  setStatus,
  deleteStatus,
};
