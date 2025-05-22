"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCatch = void 0;
const errorCatch = (controller) => {
    return (req, res, next) => {
        controller(req, res, next).catch((error) => next(error));
    };
};
exports.errorCatch = errorCatch;
//# sourceMappingURL=errorCatch.js.map