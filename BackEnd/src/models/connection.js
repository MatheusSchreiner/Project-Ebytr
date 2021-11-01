const { MongoClient } = require('mongodb');

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const MONGO_DB_URL = `mongodb://${process.env.HOST}:27017/TodoEbytr`;
const DB_NAME = 'TodoEbytr';

module.exports = () =>
  MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
