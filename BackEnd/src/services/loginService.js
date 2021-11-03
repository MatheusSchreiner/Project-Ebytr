const models = require('../models/usersModel');
const generateToken = require('../utils/token/generateToken');
const { loginValidation, confirmUser } = require('../utils/validation/loginValidation');

const login = async ({ email, password }) => {
  loginValidation(email, password);

  const user = await models.getByEmail(email);
  confirmUser(user, password);

  const token = generateToken(user);
  
  return ({ status: 200, token });
};

module.exports = { login };
