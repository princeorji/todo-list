const errorHandler = (req, res, next) => {
  res.status(404).send('Page Not Found');
};

module.exports = errorHandler;
