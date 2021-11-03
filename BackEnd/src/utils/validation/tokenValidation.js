const jwt = require('jsonwebtoken');
const messageErr = require('../err/messageErr');

const SECRET = process.env.SECRET || 'segredojwt';

const err = (statusCode) => ({ statusCode });

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (erro) {
    throw err(messageErr.JWT_MALFORMED);
  }
};

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw err(messageErr.MISSING_TOKEN);

  const { _id, name, role } = await verifyToken(token);
  
  req.user = { _id, name, role };
  next();
};