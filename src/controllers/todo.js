const { Todo } = require('../../config/dbConfig');

const getAll = async (req, res) => {
  const todos = await Todo.findAll();
  res.status(200).json(todos);
};

const getOne = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  res.status(200).json(todo);
};

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({
      title,
      description,
      user_id: req.user.id,
    });
    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    await todo.update({ title, description, completed });

    if (req.user.id !== todo.user_id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    res.status(200).json({ message: 'Successfully updated task', todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.destroy({ where: { id } });

    if (!todo) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.status(200).json({ message: 'Successfully deleted task' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getOne,
  createTodo,
  updateTodo,
  deleteTodo,
};
