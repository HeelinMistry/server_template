// middlewares/errorHandler.js
const { validationResult } = require('express-validator');

const validationErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(e => ({
                field: e.param,
                message: e.msg,
            })),
        });
    }
    next();
};

const generalErrorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace

    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = {
    validationErrorHandler,
    generalErrorHandler,
};
