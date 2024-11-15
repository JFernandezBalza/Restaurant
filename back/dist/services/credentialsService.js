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
exports.checkUserCredentials = exports.getCredentialsService = void 0;
const credentialsList = [];
let id = 1;
const crypPassword = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    const encoder = new TextEncoder();
    const data = encoder.encode(pass);
    const hash = yield crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hasHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hasHex;
});
const checkUserExists = (username) => {
    const credentialsFound = credentialsList.find((credential) => credential.username === username);
    if (!credentialsFound)
        throw new Error(`El usuario con username: ${username} ya existe, intente con un nuevo username`);
};
const getCredentialsService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    checkUserExists(username);
    const passwordEncrypted = yield crypPassword(password);
    const objectCredentials = {
        id,
        username,
        password: passwordEncrypted,
    };
    credentialsList.push(objectCredentials);
    return id++;
});
exports.getCredentialsService = getCredentialsService;
const checkUserCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialsFound = credentialsList.find((credential) => credential.username === username);
    const passwordEncrypted = yield crypPassword(password);
    return (credentialsFound === null || credentialsFound === void 0 ? void 0 : credentialsFound.password) === passwordEncrypted
        ? credentialsFound.id
        : undefined;
});
exports.checkUserCredentials = checkUserCredentials;
