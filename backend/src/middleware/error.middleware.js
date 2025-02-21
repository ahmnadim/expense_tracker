const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "PrismaClientKnownRequestError") {
    return res.status(400).json({
      message: "Database operation failed",
      error: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      error: err.message,
    });
  }

  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
};

module.exports = {
  errorHandler,
};
