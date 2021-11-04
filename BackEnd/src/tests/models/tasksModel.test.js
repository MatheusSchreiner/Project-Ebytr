const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnectionMock } = require('./mongoConnectionMock');

const todoModel = require('../../models/tasksModel');

describe('Testes no todoModels', () => {

  describe('Função create(), insere uma nova tarefa no banco de dados', () => {
    const task = {
      task: 'tarefa',
      status: 'concluido',
    };

    before(async () => {
      const connectionMock = await getConnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });
  
    after(() => {
      MongoClient.connect.restore();
    });
  
    it('retorna um objeto', async () => {
      const { ops: [newTask] } = await todoModel.create(task);
      expect(newTask).to.be.an('object');
    });

    it('objeto tem as chaves: "_id, task, status e timestamp"', async () => {
      const { ops: [newTask] } = await todoModel.create(task);
      expect(newTask).to.have.all.keys('_id','task', 'status', 'timestamp', 'user');
    });
  });

  describe('Função getAll() exibe um array das tarefas', () => {
    const task = {
      task: 'tarefa',
      status: 'concluido',
      timestamp: Date(),
    };

    before(async () => {
      const connectionMock = await getConnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      await connectionMock.db('modelExample').collection('tasks').insertOne(task);
    });
    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um array', async () => {
      const response = await todoModel.getAll();
      expect(response).to.be.an('array');
    });

    it('o array contém um objeto', async () => {
      const [response] = await todoModel.getAll();
      expect(response).to.be.an('object');
    });

    it('o objeto contém as chaves "_id, task, status e timestamp"', async () => {
      const [response] = await todoModel.getAll();
      expect(response).to.have.all.keys('_id', 'task', 'status', 'timestamp', 'user');
    });
  });
});
