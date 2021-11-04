const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnectionMock } = require('./mongoConnectionMock');

const model = require('../../models/tasksModel');

describe('Testes no models', () => {

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
      const { ops: [newTask] } = await model.create(task);
      expect(newTask).to.be.an('object');
    });

    it('objeto tem as chaves: "_id, task, status, timestamp e user"', async () => {
      const { ops: [newTask] } = await model.create(task);
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
      await connectionMock.db('TodoEbytr').collection('tasks').insertOne(task);
    });
    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um array', async () => {
      const response = await model.getAll();
      expect(response).to.be.an('array');
    });

    it('o array contém um objeto', async () => {
      const [response] = await model.getAll();
      expect(response).to.be.an('object');
    });

    it('o objeto contém as chaves "_id, task, status, timestamp e user"', async () => {
      const [response] = await model.getAll();
      expect(response).to.have.all.keys('_id', 'task', 'status', 'timestamp', 'user');
    });
  });

  describe('Função getById() retorna a task do id passado', () => {
    const task = {
      task: 'tarefa',
      status: 'concluido',
      timestamp: Date(),
    };

    let response;

    before(async () => {
      const connectionMock = await getConnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      response = await connectionMock.db('TodoEbytr').collection('tasks').insertOne(task);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto', async () => {
      const result = await model.getById(response.insertedId);
      expect(result).to.be.an('object');
    });

    it('o objeto contém as chaves "_id, task, status, timestamp"', async () => {
      const result = await model.getById(response.insertedId);
      expect(result).to.have.all.keys('_id', 'task', 'status', 'timestamp');
    });
  });

  describe('Função updateById() retorna a task atualizada passado por id', async () => {
    const task = {
      task: 'tarefa',
      status: 'concluido',
      timestamp: Date(),
    };

    const task2 = 'tarefa2';
    const status = 'pendente';
    const user = {};
    let response;

    before(async () => {
      const connectionMock = await getConnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      response = await connectionMock.db('TodoEbytr').collection('tasks').insertOne(task);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto', async () => {
      const result = await model.updateById(response.insertedId, task2, status, user);
      expect(result).to.be.an('object');
    });

    it('retorna modifiedCount = 1 confirmando a atualização', async () => {
      const result = await model.updateById(response.insertedId, task2, status, user);
      expect(result.modifiedCount).to.equal(1);
    });
  });

  describe('Função deleteById() apaga task passando o id', () => {
    const task = {
      task: 'tarefa',
      status: 'concluido',
      timestamp: Date(),
    };

    let response;

    before(async () => {
      const connectionMock = await getConnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      response = await connectionMock.db('TodoEbytr').collection('tasks').insertOne(task);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna modifiedCount = 1 confirmando a remoção', async () => {
      const result = await model.deleteById(response.insertedId);
      expect(result.deletedCount).to.equal(1);
    });
  });
});
