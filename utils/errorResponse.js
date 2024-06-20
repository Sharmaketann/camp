class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }

  send(res) {
    res.status(this.statusCode).json({
      success: false,
      error: this.message,
    })
  }

  static badRequest(message) {
    return new ErrorResponse(message, 400)
  }
}

module.exports = ErrorResponse
