const express = require('express');
const controller = require('../controllers/users');

const routes = express.Router();

routes.get('/:id', controller.userProfile);

module.exports = routes;
