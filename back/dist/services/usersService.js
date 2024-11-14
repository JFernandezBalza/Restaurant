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
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getUsersService = getUsersService;
const getUsersByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return id;
});
exports.getUsersByIdService = getUsersByIdService;
const registerUsersService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return user;
});
exports.registerUsersService = registerUsersService;
const loginUsersService = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    return userCredentials;
});
exports.loginUsersService = loginUsersService;
// let users: IUser[] = [];
// let id: number = 1;
// export const createUsersService = async (userData: UserDto): Promise<IUser> => {
//   const newUser: IUser = {
//     id,
//     name: userData.name,
//     email: userData.email,
//     active: userData.active,
//   };
//   users.push(newUser);
//   id++;
//   return newUser;
// };
// export const getUsersService = async (): Promise<IUser[]> => {
//   return users;
// };
// export const deleteUsersService = async (id: number): Promise<void> => {
//   users = users.filter((user: IUser) => {
//     return user.id !== id;
//   });
// };
