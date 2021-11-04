const modelUser = require('../../models/usersModel');

const messageErr = require('../err/messageErr');

const err = (statusCode) => ({ statusCode });

const userName = (name) => {
  if (!name || typeof name !== 'string') throw err(messageErr.INVALID_ENTRIES);
};

const userPassword = (password) => {
  if (!password || typeof password !== 'string') throw err(messageErr.INVALID_ENTRIES);
};

const userEmail = (email) => {
  if (!email || typeof email !== 'string') throw err(messageErr.INVALID_ENTRIES);
};

const userRole = (role) => {
  if (!role || typeof role !== 'string') throw err(messageErr.INVALID_ENTRIES);
};

const userEmailIsValid = (email) => {
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!validEmail) throw err(messageErr.INVALID_ENTRIES);
};

const userEmailAlreadyExist = async (email) => {
  const response = await modelUser.getByEmail(email);
  if (response) throw err(messageErr.EMAIL_REGISTRED);
};

const usersValidation = async (name, email, password, role) => {
  userName(name);
  userRole(role);
  userEmail(email);
  userEmailIsValid(email);
  userPassword(password);
  await userEmailAlreadyExist(email);
};

module.exports = usersValidation;
