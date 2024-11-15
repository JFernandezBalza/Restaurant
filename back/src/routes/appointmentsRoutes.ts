import { Request, Response, Router } from "express";
import { IAppointmentRegisterDTO } from "../dto/AppointmentDTO";
import {
  cancelStatusAppointmentsController,
  getAppointmentsByIdController,
  getAppointmentsController,
  registerAppointmentsController,
} from "../controllers/appointmentsControllers";

const appointmentRouter: Router = Router();

appointmentRouter.get("/", (req: Request, res: Response) =>
  getAppointmentsController(req, res)
);
appointmentRouter.get("/:id", (req: Request<{ id: string }>, res: Response) =>
  getAppointmentsByIdController(req, res)
);
appointmentRouter.post(
  "/schedule",
  (req: Request<unknown, unknown, IAppointmentRegisterDTO>, res: Response) =>
    registerAppointmentsController(req, res)
);
appointmentRouter.put(
  "/cancel/:id",
  (req: Request<{ id: string }>, res: Response) =>
    cancelStatusAppointmentsController(req, res)
);

export default appointmentRouter;
