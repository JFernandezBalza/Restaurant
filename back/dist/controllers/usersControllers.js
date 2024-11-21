"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsersController = exports.registerUsersController = exports.getUsersByIdController = exports.getUsersController = void 0;
const usersService_1 = require("../services/usersService");
const appointmentsControllers_1 = require("./appointmentsControllers");
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResponse = yield (0, usersService_1.getUsersService)();
        res.status(200).json({
            message: "Obtener el listado de los usuarios",
            data: serviceResponse,
        });
    }
    catch (error) {
        (0, appointmentsControllers_1.handleErrorResponse)(error, res, "Error al obtener todos los usuarios");
    }
});
exports.getUsersController = getUsersController;
const getUsersByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const serviceResponse = yield (0, usersService_1.getUsersByIdService)(parseInt(id, 10));
        res.status(200).json({
            message: "Obtener el detalle de un usuario específico",
            data: serviceResponse,
        });
    }
    catch (error) {
        (0, appointmentsControllers_1.handleErrorResponse)(error, res, "Error al obtener el usuario especifico");
    }
});
exports.getUsersByIdController = getUsersByIdController;
const registerUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResponse = yield (0, usersService_1.registerUsersService)(req.body);
        res.status(201).json({
            message: "Registro de nuevo usuario",
            data: serviceResponse,
        });
    }
    catch (error) {
        (0, appointmentsControllers_1.handleErrorResponse)(error, res, "Error al registrar el nuevo usuario");
    }
});
exports.registerUsersController = registerUsersController;
const loginUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResponse = yield (0, usersService_1.loginUsersService)(req.body);
        res.status(200).json(serviceResponse);
    }
    catch (error) {
        (0, appointmentsControllers_1.handleErrorResponse)(error, res, "Error al loguear al usuario");
    }
});
exports.loginUsersController = loginUsersController;
