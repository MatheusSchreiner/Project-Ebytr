const models = require('../models/usersModel');
const validatorUser = require('../utils/validation/usersValidation');

const create = async ({ name, email, password, role }) => {
  await validatorUser(name, email, password, role);

  return models.create(name, email, password, role)
      .then((data) => {
        const user = { ...data.ops[0] };
        delete user.password;
        return ({ status: 201, user });
      });
};

module.exports = { create };
