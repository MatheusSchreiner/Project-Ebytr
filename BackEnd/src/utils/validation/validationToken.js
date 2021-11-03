const jwt = require('jsonwebtoken');
const modelLogin = require('../../models/');

const {
  INVALID_ENTRIES,
  JWT_MALFORMED,
  MISSING_TOKEN,
} = require('../err/messageErr');

const { SECRET } = process.env.SECRET;

const err = (statusCode) => ({ statusCode });

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (erro) {
    throw err(JWT_MALFORMED);
  }
};

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw err(MISSING_TOKEN);

  const payload = await verifyToken(token);
  
  const { _id } = await modelLogin.getByEmail(payload.email);
  if (!_id) throw err(INVALID_ENTRIES);

  req.user = _id;
  next();
};
