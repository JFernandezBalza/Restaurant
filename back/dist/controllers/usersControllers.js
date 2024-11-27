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
const usersService_1 = require("../services/usersService");
const errorCatch_1 = require("../utils/errorCatch");
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceResponse = yield (0, usersService_1.getUsersService)();
    res.status(200).json({
        message: "Obtener el listado de los usuarios",
        data: serviceResponse,
    });
});
const getUsersByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const serviceResponse = yield (0, usersService_1.getUsersByIdService)(parseInt(id, 10));
    res.status(200).json(serviceResponse);
});
const registerUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceResponse = yield (0, usersService_1.registerUsersService)(req.body);
    res.status(201).json({
        message: "Registro de nuevo usuario",
        data: serviceResponse,
    });
});
const loginUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceResponse = yield (0, usersService_1.loginUsersService)(req.body);
    res.status(200).json(serviceResponse);
});
const userController = {
    getUsersController: (0, errorCatch_1.errorCatch)(getUsersController),
    getUsersByIdController: (0, errorCatch_1.errorCatch)(getUsersByIdController),
    registerUsersController: (0, errorCatch_1.errorCatch)(registerUsersController),
    loginUsersController: (0, errorCatch_1.errorCatch)(loginUsersController),
};
exports.default = userController;
