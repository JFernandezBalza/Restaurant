import { Request, Response, Router } from "express";
import {
  getUsersByIdController,
  getUsersController,
  loginUsersController,
  registerUsersController,
} from "../controllers/usersControllers";
import { IUserLoginDTO, IUserRegisterDTO } from "../dto/UserDTO";

const usersRouter: Router = Router();

usersRouter.get("/", (req: Request, res: Response) =>
  getUsersController(req, res)
);
usersRouter.get("/:id", (req: Request<{ id: string }>, res: Response) =>
  getUsersByIdController(req, res)
);
usersRouter.post("/register", (req: Request<unknown, unknown, IUserRegisterDTO>, res: Response) =>
  registerUsersController(req, res)
);

usersRouter.post("/login", (req: Request<unknown, unknown, IUserLoginDTO>, res: Response) =>
  loginUsersController(req, res)
);

export default usersRouter;
