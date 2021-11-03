const models = require('../models/usersModel');
const { validatorLogin, confirmUser } = require('../utils/validation/validationLogin');
const generateToken = require('../utils/token/generateToken');

const login = async ({ email, password }) => {
  validatorLogin(email, password);

  const user = await models.getByEmail(email);
  confirmUser(user, password);

  const token = generateToken(user);
  
  return ({ status: 200, token });
};

module.exports = { login };
