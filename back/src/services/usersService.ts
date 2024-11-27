import { AppDataSource } from "../config/data-source";
import {
  IUserCredentialDTO,
  IUserDTO,
  IUserLoginDto,
  IUserRegisterDTO,
} from "../dto/userDto";
import { Credential } from "../entities/Credential.entity";
import { User } from "../entities/User.entity";
import { UserRepository } from "../repositories/User.Repository";
import { CustomError } from "../utils/customError";
import {
  checkUserCredentials,
  getCredentialsService,
} from "./credentialsService";

export const getUsersService = async (): Promise<IUserDTO[]> => {
  const users: User[] = await UserRepository.find();
  return users;
};

export const getUsersByIdService = async (id: number): Promise<IUserDTO> => {
  const userFound = await UserRepository.findOne({
    where: { id },
    relations: ["appointments"],
  });
  if (!userFound) throw new CustomError(404,`El usuario con id: ${id} no se encontro`);
  else return userFound;
};

export const registerUsersService = async (
  user: IUserRegisterDTO
): Promise<User> => {
  const result = await AppDataSource.transaction(async (entityManager) => {
    const userCredentials: Credential = await getCredentialsService(
      entityManager,
      user.username,
      user.password
    );
    const newUser: User = entityManager.create(User, {
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      nDni: user.nDni,
      credentials: userCredentials,
    });
    return await entityManager.save(newUser);
  });
  return result;
};

export const loginUsersService = async (
  userCredentials: IUserCredentialDTO
): Promise<IUserLoginDto> => {
  const credentialId: number | undefined = await checkUserCredentials(
    userCredentials.username,
    userCredentials.password
  );
  const userFound: User | null = await UserRepository.findOne({
    where: {
      credentials: {
        id: credentialId,
      },
    },
  });

  return {
    login: true,
    user: {
      ...userFound,
    },
  };
};
