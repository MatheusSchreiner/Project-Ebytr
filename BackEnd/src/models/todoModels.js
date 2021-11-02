const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = async () => connection()
  .then((db) => db.collection('todo'));

const create = async (todo) => collection()
  .then((col) => col.insertOne(todo));

const getAll = async () => collection()
  .then((col) => col.find().toArray());

const getById = async (id) => collection()
  .then((col) => col.findOne(ObjectId(id)));

const updateById = async (id, todo) => collection()
  .then((col) => col.updateOne({ _id: ObjectId(id) },
    { $set: { todo } }));

const deleteById = async (id) => collection()
  .then((col) => col.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
