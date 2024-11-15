export interface IUserRegisterDTO {
  name: string;
  password: string;
  email: string;
  birthdate: Date;
  DNI: number;
  username: string;
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}

export interface IUserDTO {
  id: number;
  name: string;
  email: string;
}
