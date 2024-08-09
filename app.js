const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('./config/dbConfig');

const app = express();
const port = 3000;

// Connect to Sequelize Database
connect();

app.use(bodyParser.json());

// Error handler middleware
app.get('*', (req, res) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
