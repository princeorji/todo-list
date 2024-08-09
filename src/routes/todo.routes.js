const express = require('express');
const controller = require('../controllers/todo');

const routes = express.Router();

routes.get('/', controller.getAll);

routes.get('/:id', controller.getOne);

routes.post('/', controller.createTodo);

routes.patch('/:id', controller.updateTodo);

routes.delete('/:id', controller.deleteTodo);

module.exports = routes;
