const services = require('../services/tasksService');

const create = async (req, res) => services.create(req.body, req.user)
  .then(({ status, data }) => res.status(status).json({ data }));

const getAll = async (_req, res) => services.getAll()
  .then(({ status, data }) => res.status(status).json({ data }));

const updateById = async (req, res) => services.updateById(req.params, req.body, req.user)
  .then(({ status, data }) => res.status(status).json({ data }));

const deleteById = async (req, res) => services.deleteById(req.params, req.user)
  .then(({ status, data }) => res.status(status).json({ data }));

module.exports = { create, getAll, updateById, deleteById };
