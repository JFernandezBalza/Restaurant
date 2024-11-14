import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dto/AppointmentDTO";
import {
  cancelStatusAppointmentsService,
  getAppointmentsByIdService,
  getAppointmentsService,
  registerAppointmentsService,
} from "../services/appointmentsService";

export const getAppointmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse = await getAppointmentsService();
    res.status(200).json({
      message: "Obtener el listado de todos los turnos de todos los usuarios",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el listado de turnos",
      error: error,
    });
  }
};

export const getAppointmentsByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse = await getAppointmentsByIdService(id);
    res.status(200).json({
      message: "Obtener el detalle de un turno especifico",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el turno",
      error: error,
    });
  }
};

export const registerAppointmentsController = async (
  req: Request<unknown, unknown, AppointmentRegisterDTO>,
  res: Response
): Promise<void> => {
  const appointmentData: AppointmentRegisterDTO = {
    date: new Date(req.body.date),
    time: req.body.time,
    status: "active",
  };
  try {
    const serviceResponse: AppointmentRegisterDTO =
      await registerAppointmentsService(appointmentData);
    res.status(200).json({
      message: "Agendar un nuevo turno",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agendar el nuevo turno",
      error: error,
    });
  }
};

export const cancelStatusAppointmentsController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse = await cancelStatusAppointmentsService(id);
    res.status(200).json({
      message: "Cambiar status del turno a cancelled",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el listado de turnos",
      error: error,
    });
  }
};
