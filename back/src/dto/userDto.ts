export interface UserRegisterDTO {
  name: string;
  password: string;
  email: string;
  birthDate: number;
  address: string;
  DNI: number;
  active: boolean;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}
