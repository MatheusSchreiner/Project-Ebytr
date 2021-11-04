const sinon = require('sinon');
const { expect } = require('chai');
const taskController = require('../../controllers/tasksController');
const taskService = require('../../services/tasksService');

describe('Testes no Controller', () => {
  describe('Função create()', () => {
    // const request = {
    //   taskMock = {
    //     _id: "61418aa32e836090602e61a3",
    //     task: "tarefa",
    //     status: "concluido"
    //   },
    //  userMock = {
    //     email: "sch@gmail.com",
    //     password: "seila123"
    //   },
    // };
    const response = {};
    const data = {
      _id: "61418aa32e836090602e61a3",
      task: "tarefa",
      status: "concluido",
      user: {
        email: "sch@gmail.com",
        password: "seila123"
      },
    }

    beforeEach(() => {
      request.body = {
        task: "tarefa",
        status: "concluido",
      };
      request.user = {
        email: "sch@gmail.com",
        password: "seila123"
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon,stub().returns();
      sinon.stub(taskService, 'create').resolves({ data });
    });

    afterEach(() => {
      taskService.create.restore();
    });

    it('retorna o status 201', async () => {
      await taskController.create(response);
      expect(response).to.be.equal(true);
    });

    // it('retorna o json com o produto cadastrado', async () => {
    //   await productControllers.createProduct(request, response);
    //   expect(response.json.calledWith(productMock)).to.be.equal(true);
    // });

    // it('o produto cadastrado contém as chabes "name" e "quantity"', async () => {
    //   await productControllers.createProduct(request, response);
    //   expect(request.body).to.have.all.keys('name', 'quantity');
    // });
  });
});
