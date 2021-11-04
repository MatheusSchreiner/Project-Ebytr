const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = async () => connection()
  .then((db) => db.collection('tasks'));

const create = async (task, status, user, timestamp = Date()) => collection()
  .then((col) => col.insertOne({ task, status, timestamp, user }));

const getAll = async () => collection()
  .then((col) => col.find().toArray());

const getById = async (id) => collection()
  .then((col) => col.findOne(ObjectId(id)));

const updateById = async (id, task, status, user) => collection()
  .then((col) => col.updateOne({ _id: ObjectId(id) },
    { $currentDate: { timestamp: true }, $set: { task, status, user } }));

const deleteById = async (id) => collection()
  .then((col) => col.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
