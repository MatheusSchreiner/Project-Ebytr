const route = require('express').Router();
const rescue = require('express-rescue');
const controller = require('../controllers/tasksController');
const tokenValidation = require('../utils/validation/tokenValidation');

route.get('/', rescue(tokenValidation), rescue(controller.getAll));
route.post('/', rescue(tokenValidation), rescue(controller.create));
route.put('/', rescue(tokenValidation), rescue(controller.updateById));
route.delete('/:id', rescue(tokenValidation), rescue(controller.deleteById));

module.exports = route;
