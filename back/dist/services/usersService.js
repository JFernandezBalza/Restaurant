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
// import { getCredentialsService } from "./credentialsService";
const users = [];
let id = 1;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    });
});
exports.getUsersService = getUsersService;
const getUsersByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = users.find((user) => user.id === parseInt(id, 10));
    if (!userFound)
        throw new Error(`El usuario con id: ${id} no se encontro`);
    else
        return {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
        };
});
exports.getUsersByIdService = getUsersByIdService;
const registerUsersService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // const idCredentialsUser = await getCredentialsService(  
    //   user.username,
    //   user.password
    // );  
    const newUser = {
        id: id++,
        name: user.name,
        email: user.email,
        birthdate: new Date(user.birthdate),
        nDni: user.DNI
        // credentialsId: idCredentialsUser,
    };
    users.push(newUser);
    return newUser;
});
exports.registerUsersService = registerUsersService;
const loginUsersService = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    return userCredentials;
});
exports.loginUsersService = loginUsersService;
