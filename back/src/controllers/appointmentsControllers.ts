import { Request, Response } from "express";
import { IAppointmentRegisterDTO } from "../dto/AppointmentDTO";
import {
  cancelStatusAppointmentsService,
  getAppointmentsByIdService,
  getAppointmentsService,
  registerAppointmentsService,
} from "../services/appointmentsService";
import { Appointment } from "../entities/Appointments.entity";
import { errorCatch } from "../utils/errorCatch";

const getAppointmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const serviceResponse = await getAppointmentsService();
  res.status(200).json({
    message: "Obtener el listado de todos los turnos de todos los usuarios",
    data: serviceResponse,
  });
};

const getAppointmentsByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const serviceResponse = await getAppointmentsByIdService(id);
  res.status(200).json({
    message: "Obtener el detalle de un turno especifico",
    data: serviceResponse,
  });
};

const registerAppointmentsController = async (
  req: Request<unknown, unknown, IAppointmentRegisterDTO>,
  res: Response
): Promise<void> => {
  const serviceResponse: Appointment = await registerAppointmentsService(
    req.body
  );
  res.status(201).json({
    message: "Agendar un nuevo turno",
    data: serviceResponse,
  });
};

const cancelStatusAppointmentsController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const serviceResponse = await cancelStatusAppointmentsService(id);
  res.status(200).json({
    message: "Se cancelo con exito",
    data: serviceResponse,
  });
};

const appointmentController = {
  getAppointmentsController: errorCatch(getAppointmentsController),
  getAppointmentsByIdController: errorCatch(getAppointmentsByIdController),
  registerAppointmentsController: errorCatch(registerAppointmentsController),
  cancelStatusAppointmentsController: errorCatch(
    cancelStatusAppointmentsController
  ),
};

export default appointmentController;
