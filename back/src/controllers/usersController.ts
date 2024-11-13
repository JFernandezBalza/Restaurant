import { Request, Response } from "express";
import {
  getUsersService,
  createUsersService,
  deleteUsersService,
} from "../services/usersService";
import IUser from "../interface/iUsers";

export const createUsers = async (req: Request, res: Response) => {
  const { name, email, active } = req.body;
  const newUser: IUser = await createUsersService({ name, email, active });
  res.status(201).json(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const users: IUser[] = await getUsersService();
  res.status(200).json(users);
};

export const deleteUsers = async (req: Request, res: Response) => {
  const { id } = req.body;
  await deleteUsersService(id);
  res.status(200).json({ message: "Eliminado correctamente" });
};
