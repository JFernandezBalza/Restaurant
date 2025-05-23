"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsersService = exports.registerUsersService = exports.getUsersByIdService = exports.getUsersService = void 0;
const data_source_1 = require("../config/data-source");
const User_entity_1 = require("../entities/User.entity");
const User_Repository_1 = require("../repositories/User.Repository");
const customError_1 = require("../utils/customError");
const credentialsService_1 = require("./credentialsService");
const getUsersService = async () => {
    const users = await User_Repository_1.UserRepository.find();
    return users;
};
exports.getUsersService = getUsersService;
const getUsersByIdService = async (id) => {
    const userFound = await User_Repository_1.UserRepository.findOne({
        where: { id },
        relations: ["appointments"],
    });
    if (!userFound)
        throw new customError_1.CustomError(404, `El usuario con id: ${id} no se encontro`);
    else
        return userFound;
};
exports.getUsersByIdService = getUsersByIdService;
const registerUsersService = async (user) => {
    const result = await data_source_1.AppDataSource.transaction(async (entityManager) => {
        const userCredentials = await (0, credentialsService_1.getCredentialsService)(entityManager, user.username, user.password);
        const newUser = entityManager.create(User_entity_1.User, {
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
            credentials: userCredentials,
        });
        return await entityManager.save(newUser);
    });
    return result;
};
exports.registerUsersService = registerUsersService;
const loginUsersService = async (userCredentials) => {
    const credentialId = await (0, credentialsService_1.checkUserCredentials)(userCredentials.username, userCredentials.password);
    const userFound = await User_Repository_1.UserRepository.findOne({
        where: {
            credentials: {
                id: credentialId,
            },
        },
    });
    return {
        login: true,
        user: {
            ...userFound,
        },
    };
};
exports.loginUsersService = loginUsersService;
//# sourceMappingURL=usersService.js.map