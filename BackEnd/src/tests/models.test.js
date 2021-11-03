/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
// const { getConnectionMock } = require('./mongoConnectionMock');

const todoModel = require('../models/tasksModels');

describe('Testes no todoModels', () => {
  before(async () => {
    const DBServer = await MongoMemoryServer.create();
    const URLMock = await DBServer.getUri();
    const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

    const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    sinon.restore();
  });

  // before(async () => {
  //   const connectionMock = await getConnectionMock();
  //   sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  // });

  // after(() => {
  //   MongoClient.connect.restore();
  // })

  describe('Função create(), insere uma nova tarefa no banco de dados', () => {
    const tarefa1 = {
      task: 'tarefa',
      status: 'concluido',
    };

    const tarefa2 = {
      task: 'tarefa',
      status: 'concluido',
    };

    it('retorna um objeto', async () => {
      const response = await todoModel.create(tarefa1);
      console.log(response);
      expect(response).to.be.an('object');
    });

    // it('objeto tem propriedades: "acknowledged, insertedId"', async () => {
    //   const response = await todoModel.create(tarefa2);
    //   expect(response).to.have.all.keys('acknowledged', 'insertedId');
    // });

    it('objeto acknowledged é true', async () => {
      const response = await todoModel.create(tarefa2);
      expect(response.acknowledged).to.be(true);
    });

  });
});
