const { ObjectId } = require('mongodb');
const models = require('../../models/tasksModel');
const messageErr = require('../err/messageErr');

const err = (statusCode) => ({ statusCode });

const confirmTask = (task) => {
  if (!task || typeof task !== 'string') throw err(messageErr.INVALID_ENTRIES);
};

const confirmStatus = (status) => {
  if (!status || typeof status !== 'string') throw err(messageErr.INVALID_ENTRIES);
};

const confirmIdTask = (idTask) => {
  if (!idTask) throw err(messageErr.INVALID_ENTRIES);
  if (!ObjectId.isValid(idTask)) throw err(messageErr.ID_NOT_VALID);
};

const confirmIdUser = (idUser) => {
  if (!idUser) throw err(messageErr.INVALID_ENTRIES);
  if (!ObjectId.isValid(idUser)) throw err(messageErr.ID_NOT_VALID);
};

const confirmTaskUser = async (idTask, idUser) => {
  const { user: { _id } } = await models.getById(idTask);
  if (_id !== idUser) throw err(messageErr.USER_NOT_PERMISSION);
};

const taskValidation = (task, status) => {
  confirmTask(task);
  confirmStatus(status);
};

const taskUserValidation = async (idTask, { _id }) => {
  confirmIdTask(idTask);
  confirmIdUser(_id);
  await confirmTaskUser(idTask, _id);
};

module.exports = { taskValidation, taskUserValidation };
