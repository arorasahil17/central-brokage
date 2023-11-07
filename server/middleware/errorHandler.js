const asyncErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  console.log(err);
  res.status(err.statusCode).send({ status: false, message: err.message });
};

export default asyncErrorHandler;
