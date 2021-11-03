const codeErr = require('../utils/err/codeErr');

module.exports = (err, _req, res, _next) => {
  if (err.statusCode) {
    const { status, message } = codeErr[err.statusCode];
    return res.status(status).json({ message });
  }
  console.error(err);
  return res.status(500).json({ message: 'Internal Error' });
};
