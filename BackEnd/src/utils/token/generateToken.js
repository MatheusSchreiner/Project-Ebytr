const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET } = process.env;
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

module.exports = ({ _id, name }) => {
  const token = jwt.sign({ _id, name }, SECRET, jwtConfig);
  return token;
};
