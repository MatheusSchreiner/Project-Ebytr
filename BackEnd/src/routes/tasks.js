const route = require('express').Router();
const rescue = require('express-rescue');
const controller = require('../controllers/usersController');
const validationToken = require('../utils/validation/validationToken');

route.get('/', rescue(validationToken), rescue(controller.getAll));
route.post('/', rescue(validationToken), rescue(controller.create));
route.put('/:id', rescue(validationToken), rescue(controller.updateById));
route.delete('/:id', rescue(validationToken), rescue(controller.deteleById));

module.exports = route;
