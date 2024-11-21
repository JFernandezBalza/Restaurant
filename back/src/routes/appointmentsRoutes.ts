import { NextFunction, Request, Response, Router } from "express";
import { IAppointmentRegisterDTO } from "../dto/AppointmentDTO";
import appointmentController from "../controllers/appointmentsControllers";

const appointmentRouter: Router = Router();

appointmentRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
  appointmentController.getAppointmentsController(req, res, next)
);
appointmentRouter.get(
  "/:id",
  (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    appointmentController.getAppointmentsByIdController(req, res, next)
);
appointmentRouter.post(
  "/schedule",
  (
    req: Request<unknown, unknown, IAppointmentRegisterDTO>,
    res: Response,
    next: NextFunction
  ) => appointmentController.registerAppointmentsController(req, res, next)
);
appointmentRouter.put(
  "/cancel/:id",
  (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    appointmentController.cancelStatusAppointmentsController(req, res, next)
);

export default appointmentRouter;
