"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, morgan_1.default)("dev"));
server.use((0, cors_1.default)());
server.use(indexRoutes_1.default);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err, req, res, next) => {
    const error = err;
    const errorMessage = {
        message: "Error en el servidor",
        detail: err instanceof Error
            ? error.detail
                ? error.detail
                : err.message
            : "Error desconocido",
        code: error.code,
    };
    if (error.code === 404)
        res
            .status(404)
            .json({ message: errorMessage.message, detail: errorMessage.detail });
    else
        res.status(400).json(errorMessage);
});
exports.default = server;
//# sourceMappingURL=server.js.map