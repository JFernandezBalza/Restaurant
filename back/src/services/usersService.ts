import { UserLoginDTO, UserRegisterDTO } from "../dto/userDto";

export const getUsersService = async (): Promise<void> => {};

export const getUsersByIdService = async (id: string): Promise<string> => {
  return id;
};

export const registerUsersService = async (
  user: UserRegisterDTO
): Promise<UserRegisterDTO> => {
  return user;
};

export const loginUsersService = async (
  userCredentials: UserLoginDTO
): Promise<UserLoginDTO> => {
  return userCredentials;
};
