import { Request, Response } from "express";
import {
  getUsersByIdService,
  getUsersService,
  loginUsersService,
  registerUsersService,
} from "../services/usersService";
import {
  IUserCredentialDTO,
  IUserDTO,
  IUserLoginDto,
  IUserRegisterDTO,
} from "../dto/userDto";
import { User } from "../entities/User.entity";
import { errorCatch } from "../utils/errorCatch";

const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const serviceResponse: IUserDTO[] = await getUsersService();
  res.status(200).json({
    message: "Obtener el listado de los usuarios",
    data: serviceResponse,
  });
};

const getUsersByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const serviceResponse: IUserDTO = await getUsersByIdService(parseInt(id, 10));
  res.status(200).json(serviceResponse);
};

const registerUsersController = async (
  req: Request<unknown, unknown, IUserRegisterDTO>,
  res: Response
): Promise<void> => {
  const serviceResponse: User = await registerUsersService(req.body);
  res.status(201).json({
    message: "Registro de nuevo usuario",
    data: serviceResponse,
  });
};

const loginUsersController = async (
  req: Request<unknown, unknown, IUserCredentialDTO>,
  res: Response
): Promise<void> => {
  const serviceResponse: IUserLoginDto = await loginUsersService(req.body);
  res.status(200).json(serviceResponse);
};

const userController = {
  getUsersController: errorCatch(getUsersController),
  getUsersByIdController: errorCatch(getUsersByIdController),
  registerUsersController: errorCatch(registerUsersController),
  loginUsersController: errorCatch(loginUsersController),
};

export default userController;
