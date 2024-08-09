const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('./config/dbConfig');
const passport = require('passport');
const session = require('express-session');
const isAuthenticated = require('./src/middlewares/auth');
const errorHandler = require('./src/middlewares/errorHandler');
require('dotenv').config();
require('./config/passport');

const authRoute = require('./src/routes/auth.routes');
const userRoute = require('./src/routes/users.routes');

const app = express();
const port = 3000;

// Connect to Sequelize Database
connect();

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('', authRoute);
app.use('/users', isAuthenticated, userRoute);

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
