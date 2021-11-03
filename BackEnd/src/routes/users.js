const route = require('express').Router();
const rescue = require('express-rescue');
const controllers = require('../controllers/usersController');

route.post('/', rescue(controllers.create));

module.exports = route;
