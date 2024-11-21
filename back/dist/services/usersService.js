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
exports.loginUsersService = exports.registerUsersService = exports.getUsersByIdService = exports.getUsersService = void 0;
const data_source_1 = require("../config/data-source");
const User_entity_1 = require("../entities/User.entity");
const User_Repository_1 = require("../repositories/User.Repository");
const credentialsService_1 = require("./credentialsService");
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_Repository_1.UserRepository.find();
    return users;
});
exports.getUsersService = getUsersService;
const getUsersByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield User_Repository_1.UserRepository.findOne({
        where: { id },
        relations: ["credentials"],
    });
    if (!userFound)
        throw new Error(`El usuario con id: ${id} no se encontro`);
    else
        return userFound;
});
exports.getUsersByIdService = getUsersByIdService;
const registerUsersService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const userCredentials = yield (0, credentialsService_1.getCredentialsService)(entityManager, user.username, user.password);
        const newUser = entityManager.create(User_entity_1.User, {
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
            credentials: userCredentials,
        });
        return yield entityManager.save(newUser);
    }));
    return result;
});
exports.registerUsersService = registerUsersService;
const loginUsersService = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialId = yield (0, credentialsService_1.checkUserCredentials)(userCredentials.username, userCredentials.password);
    const userFound = yield User_Repository_1.UserRepository.findOne({ where: {
            credentials: {
                id: credentialId
            }
        }
    });
    return {
        login: true,
        user: Object.assign({}, userFound)
    };
});
exports.loginUsersService = loginUsersService;
