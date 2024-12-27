class validationError extends Error {
  constructor(message,statusCode = 400) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = statusCode;
    // this.message = message;
  }
}

class NotFoundError extends Error{
  constructor(message,statusCode =404){
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = statusCode;
  }
}

module.exports = { validationError ,NotFoundError };
