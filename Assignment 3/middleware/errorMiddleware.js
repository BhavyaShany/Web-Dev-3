// 404 for unknown routes
const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

// Centralized error handler
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";
  let errors;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for ${err.path}: ${err.value}`;
  }

  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = `Duplicate value for ${field}: "${err.keyValue[field]}" already exists`;
  }

  if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON in request body";
  }

  const body = { success: false, message };
  if (errors) body.errors = errors;
  res.status(statusCode).json(body);
};

module.exports = { notFound, errorHandler };
