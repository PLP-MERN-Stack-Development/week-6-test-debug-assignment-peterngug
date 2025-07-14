const errorHandler = (err, req, res, next) => {
  // Debugging: Log error stack trace
  console.error('Error:', err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ 
    message: err.message, 
    stack: process.env.NODE_ENV === 'development' ? err.stack : null 
  });
};

module.exports = errorHandler;