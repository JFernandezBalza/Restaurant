"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=customError.js.map