export interface IUserRegisterDTO {
  name: string;
  password: string;
  email: string;
  birthdate: Date;
  nDni: number;
  username: string;
}

export interface IUserCredentialDTO {
  username: string;
  password: string;
}

export interface IUserLoginDTO {
  login: boolean;
  user: IUserDataLoginDTO;
}

interface IUserDataLoginDTO {
  id?: number;
  name?: string;
  nDni?: number;
  email?: string;
  birthdate?: Date;
}

export interface IUserDTO {
  id: number;
  name: string;
  email: string;
}
