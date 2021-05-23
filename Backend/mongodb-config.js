const MONGO_PORT = 27017;
const MONGO_URL = 'mongodb://localhost:' + MONGO_PORT;
const DB_NAME = 'DApp';
const DB_URL = MONGO_URL + '/' + DB_NAME;

module.exports = { DB_URL };