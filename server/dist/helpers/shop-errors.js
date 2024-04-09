"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = exports.AppErrors = void 0;
const errors_enum_1 = require("../types/errors.enum");
const DEBUG_ENV = ["production", "development"];
class AppErrors extends Error {
    constructor(code, message, statusCode) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
    }
}
exports.AppErrors = AppErrors;
const handleErrorResponse = (e, res) => {
    if (process.env.NODE_ENV && DEBUG_ENV.includes(process.env.NODE_ENV)) {
        console.log(e.message, e.stack);
    }
    return res.status(e.statusCode || 400).json({
        error: {
            code: e.code && Object.values(errors_enum_1.ERROR_CODES).includes(e.code)
                ? e.code
                : errors_enum_1.ERROR_CODES.UNKNOWN,
            message: process.env.NODE_ENV && DEBUG_ENV.includes(process.env.NODE_ENV)
                ? e.message
                : undefined,
            stack: process.env.NODE_ENV && DEBUG_ENV.includes(process.env.NODE_ENV)
                ? e.stack
                : undefined,
        },
    });
};
exports.handleErrorResponse = handleErrorResponse;
//# sourceMappingURL=shop-errors.js.map