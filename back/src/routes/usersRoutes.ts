import { NextFunction, Request, Response, Router } from "express";
import { IUserCredentialDTO, IUserRegisterDTO } from "../dto/UserDTO";
import userController from "../controllers/usersControllers";

const usersRouter: Router = Router();

usersRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
  userController.getUsersController(req, res, next)
);
usersRouter.get(
  "/:id",
  (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    userController.getUsersByIdController(req, res, next)
);
usersRouter.post(
  "/register",
  (
    req: Request<unknown, unknown, IUserRegisterDTO>,
    res: Response,
    next: NextFunction
  ) => userController.registerUsersController(req, res, next)
);

usersRouter.post(
  "/login",
  (
    req: Request<unknown, unknown, IUserCredentialDTO>,
    res: Response,
    next: NextFunction
  ) => userController.loginUsersController(req, res, next)
);

export default usersRouter;
