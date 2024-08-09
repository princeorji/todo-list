const { User } = require('../../config/dbConfig');

const userProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  userProfile,
};
