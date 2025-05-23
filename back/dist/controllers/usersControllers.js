"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersService_1 = require("../services/usersService");
const errorCatch_1 = require("../utils/errorCatch");
const getUsersController = async (req, res) => {
    const serviceResponse = await (0, usersService_1.getUsersService)();
    res.status(200).json({
        message: "Obtener el listado de los usuarios",
        data: serviceResponse,
    });
};
const getUsersByIdController = async (req, res) => {
    const { id } = req.params;
    const serviceResponse = await (0, usersService_1.getUsersByIdService)(parseInt(id, 10));
    res.status(200).json(serviceResponse);
};
const registerUsersController = async (req, res) => {
    const serviceResponse = await (0, usersService_1.registerUsersService)(req.body);
    res.status(201).json({
        message: "Registro de nuevo usuario",
        data: serviceResponse,
    });
};
const loginUsersController = async (req, res) => {
    const serviceResponse = await (0, usersService_1.loginUsersService)(req.body);
    res.status(200).json(serviceResponse);
};
const userController = {
    getUsersController: (0, errorCatch_1.errorCatch)(getUsersController),
    getUsersByIdController: (0, errorCatch_1.errorCatch)(getUsersByIdController),
    registerUsersController: (0, errorCatch_1.errorCatch)(registerUsersController),
    loginUsersController: (0, errorCatch_1.errorCatch)(loginUsersController),
};
exports.default = userController;
//# sourceMappingURL=usersControllers.js.map