class validationError extends Error {
  constructor(message,statusCode = 400) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = statusCode;
    // this.message = message;
  }
}

module.exports = { validationError };
