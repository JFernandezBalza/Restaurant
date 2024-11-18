import { IUserDTO, IUserLoginDTO, IUserRegisterDTO } from "../dto/UserDTO";
import {IUser} from "../interface/IUsers";
import { getCredentialsService } from "./credentialsService";


const users: IUser[] = [];
let id: number = 1;

export const getUsersService = async (): Promise<IUserDTO[]> => {
  return users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
};

export const getUsersByIdService = async (id: string): Promise<IUserDTO> => {
  const userFound = users.find((user) => user.id === parseInt(id, 10));
  if (!userFound) throw new Error(`El usuario con id: ${id} no se encontro`);
  else
    return {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    };
};

export const registerUsersService = async (  
  user: IUserRegisterDTO  
): Promise<IUser> => {   
  const idCredentialsUser = await getCredentialsService(  
    user.username,
    user.password
  );  
  
  const newUser: IUser = {  
    id: id++,  
    name: user.name,  
    email: user.email,  
    birthdate: new Date(user.birthdate),  
    nDni: user.DNI,
    credentialsId: idCredentialsUser,
  };  
  users.push(newUser);  
  return newUser;  
};





export const loginUsersService = async (
  userCredentials: IUserLoginDTO
): Promise<IUserLoginDTO> => {
  return userCredentials;
};
