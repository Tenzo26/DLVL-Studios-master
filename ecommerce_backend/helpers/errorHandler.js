//Error handler class
class ErrorHandler extends Error{
    constructor(message, errorCode){
        super(message) // represents error class
        this.statusCode = this.statusCode
        // create .stack property on the object m
        Error.captureStackTrace(this, this.constructor) 
    }
}

module.exports = ErrorHandler;