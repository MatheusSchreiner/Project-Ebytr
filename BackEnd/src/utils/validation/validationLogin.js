const modelUser = require('../../models/usersModel');
const messageErr = require('../err/messageErr');

const err = (statusCode) => ({ statusCode });

const loginEmail = (email) => {
  if (!email || typeof email !== 'string') throw err(messageErr.LOGIN_NOT_FILLED);
};

const loginPassword = (password) => {
  if (!password || typeof password !== 'string') throw err(messageErr.LOGIN_NOT_FILLED);
};

const loginConfirmUser = async (email, password) => {
  const response = await modelUser.getByEmail(email);
  if (!response) throw err(messageErr.LOGIN_INCORRECT);

  const confirm = response.password === password;
  if (!confirm) throw err(messageErr.LOGIN_INCORRECT);
};

const validator = async (email, password) => {
  loginEmail(email);
  loginPassword(password);
  await loginConfirmUser(email, password);
};

module.exports = validator;
