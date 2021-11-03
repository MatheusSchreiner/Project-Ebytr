const models = require('../models/usersModel');
const usersValidation = require('../utils/validation/usersValidation');

const create = async ({ name, email, password, role }) => {
  await usersValidation(name, email, password, role);

  return models.create(name, email, password, role)
      .then((data) => {
        const user = { ...data.ops[0] };
        delete user.password;
        return ({ status: 201, user });
      });
};

module.exports = { create };
