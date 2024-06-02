class StatusError extends Error {
  statusCode: Number;
  constructor(statusCode: Number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default StatusError;
