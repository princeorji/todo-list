const express = require('express');
const controller = require('../controllers/auth');

const routes = express.Router();

routes.post('/register', controller.register);

routes.post('/login', controller.login);

routes.get('/logout', controller.logout);

module.exports = routes;
