import UserDto from "../dto/userDto";
import IUser from "../interface/iUsers";

let users: IUser[] = [];

let id: number = 1;

export const createUsersService = async (userData: UserDto): Promise<IUser> => {
  const newUser: IUser = {
    id,
    name: userData.name,
    email: userData.email,
    active: userData.active,
  };
  users.push(newUser);
  id++;
  return newUser;
};
//recibir datos del usuario
//crear nuevo usuario
//incluir el nuevo usuario dentro del arreglo
//retornar el obj creado

export const getUsersService = async (): Promise<IUser[]> => {
  return users;
};

export const deleteUsersService = async (id: number): Promise<void> => {
  users = users.filter((user: IUser) => {
    return user.id !== id;
  });
};
