const services = require('../services/usersService');

const create = async (req, res) => services.create(req.body)
  .then(({ status, user }) => res.status(status).json({ user }));

module.exports = { create };
