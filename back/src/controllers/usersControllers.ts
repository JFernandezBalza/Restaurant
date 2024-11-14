import { Request, Response } from "express";
import {
  getUsersByIdService,
  getUsersService,
  loginUsersService,
  registerUsersService,
} from "../services/usersService";
import { UserLoginDTO, UserRegisterDTO } from "../dto/userDto";

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: void = await getUsersService();
    res.status(200).json({
      message: "Obtener el listado de los usuarios",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en la aplicación",
      error: error,
    });
  }
};

export const getUsersByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse: string = await getUsersByIdService(id);
    res.status(200).json({
      message: "Obtener el detalle de un usuario específico",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en la aplicación",
      error: error,
    });
  }
};

export const registerUsersController = async (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: UserRegisterDTO = await registerUsersService(
      req.body
    );
    res.status(201).json({
      message: "Registro de nuevo usuario",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en la aplicación",
      error: error,
    });
  }
};

export const loginUsersController = async (
  req: Request<unknown, unknown, UserLoginDTO>,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: UserLoginDTO = await loginUsersService(req.body);
    res.status(200).json({
      message: "Login del usuario a la aplicación",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en la aplicación",
      error: error,
    });
  }
};
