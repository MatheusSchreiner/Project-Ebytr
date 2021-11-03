const models = require('../models/usersModel');
const validatorLogin = require('../utils/validation/validationLogin');
const generateToken = require('../utils/token/generateToken');

const login = async ({ email, password }) => {
  await validatorLogin(email, password);

  const user = await models.getByEmail(email);

  const token = generateToken(user);
  
  return ({ status: 200, token });
};

module.exports = { login };
