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
const Credential_entity_1 = require("../entities/Credential.entity");
const Credential_Repository_1 = require("../repositories/Credential.Repository");
const crypPassword = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    const encoder = new TextEncoder();
    const data = encoder.encode(pass);
    const hash = yield crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hasHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hasHex;
});
const checkUserExists = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialsFound = yield Credential_Repository_1.CredentialRepository.findOne({ where: { username } });
    if (credentialsFound)
        throw new Error(`El usuario con username: ${username} ya existe, intente con un nuevo username`);
});
const getCredentialsService = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkUserExists(username);
    const passwordEncrypted = yield crypPassword(password);
    const objectCredentials = entityManager.create(Credential_entity_1.Credential, {
        username,
        password: passwordEncrypted,
    });
    return yield entityManager.save(objectCredentials);
});
exports.getCredentialsService = getCredentialsService;
const checkUserCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialsFound = yield Credential_Repository_1.CredentialRepository.findOne({ where: { username } });
    if (!credentialsFound)
        throw new Error("Usuario o contraseña incorrectos");
    else {
        const passwordEncrypted = yield crypPassword(password);
        if ((credentialsFound === null || credentialsFound === void 0 ? void 0 : credentialsFound.password) != passwordEncrypted)
            throw new Error("Usuario o contrase incorrectos");
        else {
            return credentialsFound.id;
        }
    }
});
exports.checkUserCredentials = checkUserCredentials;
