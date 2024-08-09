const { User } = require('../../config/dbConfig');
const passport = require('passport');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout error' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
};

module.exports = { register, login, logout };
