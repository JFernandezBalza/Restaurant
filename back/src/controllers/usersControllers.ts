import { Request, Response } from "express";
import {
  getUsersByIdService,
  getUsersService,
  loginUsersService,
  registerUsersService,
} from "../services/usersService";
import { IUserDTO, IUserLoginDTO, IUserRegisterDTO } from "../dto/UserDTO";
import { handleErrorResponse } from "./appointmentsControllers";
import {IUser} from "../interface/IUsers";


export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: IUserDTO[] = await getUsersService();
    res.status(200).json({
      message: "Obtener el listado de los usuarios",
      data: serviceResponse,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al obtener todos los usuarios"); 
        }
    };

export const getUsersByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse: IUserDTO = await getUsersByIdService(id);
    res.status(200).json({
      message: "Obtener el detalle de un usuario específico",
      data: serviceResponse,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al obtener el usuario especifico"); 
        }
    };

export const registerUsersController = async (
  req: Request<unknown, unknown, IUserRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: IUser = await registerUsersService(
      req.body
    );
    res.status(201).json({
      message: "Registro de nuevo usuario",
      data: serviceResponse,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al registrar el nuevo usuario"); 
        }
    };

export const loginUsersController = async (
  req: Request<unknown, unknown, IUserLoginDTO>,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: IUserLoginDTO = await loginUsersService(req.body);
    res.status(200).json({
      message: "Login del usuario a la aplicación",
      data: serviceResponse,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al loguear al usuario"); 
        }
    };
