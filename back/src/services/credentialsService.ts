import { ICredentials } from "../interface/ICredentials";

const credentialsList: ICredentials[] = [];
let id: number = 1;

const crypPassword = async (pass: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(pass);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hash));
  const hasHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hasHex;
};


const checkUserExists = (username: string): void=> {
    const credentialsFound: ICredentials | undefined = credentialsList.find(
        (credential) => credential.username === username)

        if(!credentialsFound) throw new Error(`El usuario con username: ${username} ya existe, intente con un nuevo username`)
}


export const getCredentialsService = async (
  username: string,
  password: string
): Promise<number> => {

    checkUserExists(username)

  const passwordEncrypted = await crypPassword(password);
  const objectCredentials = {
    id,
    username,
    password: passwordEncrypted,
  };

  credentialsList.push(objectCredentials);
  return id++;
};

export const checkUserCredentials = async (
  username: string,
  password: string
): Promise<number | undefined> => {
  const credentialsFound: ICredentials | undefined = credentialsList.find(
    (credential) => credential.username === username
  );

  const passwordEncrypted = await crypPassword(password);

  return credentialsFound?.password === passwordEncrypted
    ? credentialsFound.id
    : undefined
};
