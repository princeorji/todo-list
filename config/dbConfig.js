const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const User = require('../src/models/users')(sequelize, DataTypes);
const Todo = require('../src/models/todos')(sequelize, DataTypes);

// Set up associations
User.hasMany(Todo, { foreignKey: 'user_id' });
Todo.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { connect, User, Todo };
