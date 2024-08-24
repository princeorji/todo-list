const { User } = require('../../config/dbConfig');
const { Todo } = require('../../config/dbConfig');

const userProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const todos = await Todo.findAll({
      where: { user_id: user.id },
      attributes: { exclude: ['user_id'] },
    });

    res.status(200).json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        todos,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  userProfile,
};
