class AppError extends Error {
  constructor(StatusCode, Status, message) {
    super();
    this.StatusCode = StatusCode;
    this.Status = Status;
    this.message = message;
  }
}

module.exports.AppError = AppError;
