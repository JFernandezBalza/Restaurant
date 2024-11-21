import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/indexRoutes";
import { IErrorResponse, IPostgresError } from "./interface/IErrorInterface";

const server: Application = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
server.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const error = err as IPostgresError;

  const errorMessage: IErrorResponse = {
    message: "Error en el servidor",
    detail:
      err instanceof Error
        ? error.detail
          ? error.detail
          : err.message
        : "Error desconocido",
    code: error.code,
  };

  if (error.code === 404)
    res
      .status(404)
      .json({ message: errorMessage.message, detail: errorMessage.detail });
  else res.status(400).json(errorMessage);
});

export default server;
