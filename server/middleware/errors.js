const ErrorHandler = require("../utils/errorHandling")

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"

    if (process.env.NODE_ENV === "DEVELOPMENT") {

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message)
            err = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === "PRODUCTION") {
        let error = {...err}
        error.message = err.message

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode).json({
            success: false,
            errMessage: error.message || "Internal Server error"
        })

    }

}