const messageErr = require('../err/messageErr');

const err = (statusCode) => ({ statusCode });

const loginEmail = (email) => {
  if (!email || typeof email !== 'string') throw err(messageErr.LOGIN_NOT_FILLED);
};

const loginPassword = (password) => {
  if (!password || typeof password !== 'string') throw err(messageErr.LOGIN_NOT_FILLED);
};

const confirmUser = async (user, password) => {
  if (!user) throw err(messageErr.LOGIN_INCORRECT);

  const confirm = user.password === password;
  if (!confirm) throw err(messageErr.LOGIN_INCORRECT);
};

const validatorLogin = (email, password) => {
  loginEmail(email);
  loginPassword(password);
};

module.exports = { validatorLogin, confirmUser };
