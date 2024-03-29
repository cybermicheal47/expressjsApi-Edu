const ErrorResponse = require("../utils/errorResponse");

const ErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log console for the dev
  console.log(err);

  //Mongoose bad ObjectID
  if (err.name === "CastError") {
    const message = `Course Not found with the id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //  Mongoose duplicate key/ duplicate post
  if (err.code === 11000) {
    const message = "Duplicate Field Entered";
    error = new ErrorResponse(message, 400);
  }

  //  Mongoose validation error

  if (err.name === "ValidatorError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = ErrorHandler;
