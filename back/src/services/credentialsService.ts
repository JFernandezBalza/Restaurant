import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credential.entity";
import { CredentialRepository } from "../repositories/Credential.Repository";

const crypPassword = async (pass: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(pass);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hash));
  const hasHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hasHex;
};

const checkUserExist = async (username: string): Promise<void> => {
  const credentialsFound: Credential | null =
    await CredentialRepository.findOne({ where: { username } });
  if (credentialsFound)
    throw new Error(
      `El usuario con username: ${username} ya existe, intente con un nuevo username`
    );
};

export const getCredentialsService = async (
  entityManager: EntityManager,
  username: string,
  password: string
): Promise<Credential> => {
  await checkUserExist(username);
  const passwordEncrypted = await crypPassword(password);
  const objectCredentials: Credential = entityManager.create(Credential, {
    username,
    password: passwordEncrypted,
  });
  return await entityManager.save(objectCredentials);
};

export const checkUserCredentials = async (
  username: string,
  password: string
): Promise<number | undefined> => {
  const credentialsFound: Credential | null =
    await CredentialRepository.findOne({ where: { username } });
  if (!credentialsFound) throw new Error("Usuario o contraseña incorrectos");
  else {
    const passwordEncrypted = await crypPassword(password);
    if (credentialsFound?.password != passwordEncrypted)
      throw new Error("Usuario o contrase incorrectos");
    else {
      return credentialsFound.id;
    }
  }
};
