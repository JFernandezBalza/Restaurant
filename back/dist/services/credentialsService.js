"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserCredentials = exports.getCredentialsService = void 0;
const Credential_entity_1 = require("../entities/Credential.entity");
const Credential_Repository_1 = require("../repositories/Credential.Repository");
const crypPassword = async (pass) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pass);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hasHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hasHex;
};
const checkUserExist = async (username) => {
    const credentialsFound = await Credential_Repository_1.CredentialRepository.findOne({ where: { username } });
    if (credentialsFound)
        throw new Error(`El usuario con username: ${username} ya existe, intente con un nuevo username`);
};
const getCredentialsService = async (entityManager, username, password) => {
    await checkUserExist(username);
    const passwordEncrypted = await crypPassword(password);
    const objectCredentials = entityManager.create(Credential_entity_1.Credential, {
        username,
        password: passwordEncrypted,
    });
    return await entityManager.save(objectCredentials);
};
exports.getCredentialsService = getCredentialsService;
const checkUserCredentials = async (username, password) => {
    const credentialsFound = await Credential_Repository_1.CredentialRepository.findOne({ where: { username } });
    if (!credentialsFound)
        throw new Error("Usuario o contraseña incorrectos");
    else {
        const passwordEncrypted = await crypPassword(password);
        if (credentialsFound?.password != passwordEncrypted)
            throw new Error("Usuario o contrase incorrectos");
        else {
            return credentialsFound.id;
        }
    }
};
exports.checkUserCredentials = checkUserCredentials;
//# sourceMappingURL=credentialsService.js.map