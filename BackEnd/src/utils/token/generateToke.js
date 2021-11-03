const jwt = require('jsonwebtoken');

const { SECRET } = process.env.SECRET;
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

module.exports = ({ _id, email }) => {
  const token = jwt.sign({ _id, email }, SECRET, jwtConfig);
  return token;
};
