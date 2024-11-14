import { Request, Response, Router } from "express";
import {
  getUsersByIdController,
  getUsersController,
  loginUsersController,
  registerUsersController,
} from "../controllers/usersControllers";
import { UserLoginDTO, UserRegisterDTO } from "../dto/userDto";

const usersRouter: Router = Router();

usersRouter.get("/", (req: Request, res: Response) =>
  getUsersController(req, res)
);
usersRouter.get("/:id", (req: Request<{ id: string }>, res: Response) =>
  getUsersByIdController(req, res)
);
usersRouter.post(
  "/register",
  (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) =>
    registerUsersController(req, res)
);

usersRouter.post(
  "/login",
  (req: Request<unknown, unknown, UserLoginDTO>, res: Response) =>
    loginUsersController(req, res)
);

export default usersRouter;
