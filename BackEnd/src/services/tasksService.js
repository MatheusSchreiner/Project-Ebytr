const models = require('../models/tasksModel');
const { taskValidation, taskUserValidation } = require('../utils/validation/taskValidation');

const getAll = async () => {
  const data = await models.getAll();
  
  return ({ status: 200, data });
};

const create = async ({ task, status }, user) => {
  taskValidation(task, status);

  return models.create(task, status, user)
    .then((response) => {
      const data = { ...response.ops[0] };
      return ({ status: 201, data });
    });
};

const updateById = async ({ _id, task, status }, user) => {
  taskValidation(task, status);

  await taskUserValidation(_id, user);

  return models.updateById(_id, task, status, user)
    .then(() => {
      const data = {_id, task, status, timestamps: Date(), user };
      return ({ status: 200, data });
  });
};

const deleteById = async ({ id }, user) => {
  const TASK_APAGADA = 'Task Apagada';

  await taskUserValidation(id, user);

  return models.deleteById(id)
    .then(() => ({ status: 200, data: { message: TASK_APAGADA } }));
};

module.exports = {
  create,
  getAll,
  updateById,
  deleteById,
};
